import API_CONFIG from '../config/common';
import { useAuthStore } from '../store/auth.store';

const BASE_URL = API_CONFIG.BASE_URL;
const DEFAULT_TIMEOUT = 15000;

// State for token refresh logic
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

// Helper to trigger session logout
export function performGlobalLogout() {
  useAuthStore.getState().logout();
  // Here we would also typically clear MMKV storage if needed
}

function triggerLogout(message = 'Session expired. Please login again.') {
  performGlobalLogout();
  throw new Error(message);
}

// Helper to parse backend error responses
async function parseError(res: Response): Promise<Error> {
  try {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const errorData = await res.json();
      const detail = errorData.detail;
      if (Array.isArray(detail)) {
        return new Error(detail.map((e: { msg: string }) => e.msg).join(', '));
      }

      const errorMessage = detail || errorData.message || errorData.error || `Error ${res.status}`;
      return new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    }
    return new Error(`Server returned ${res.status}: ${res.statusText}`);
  } catch {
    return new Error(`Network error (${res.status})`);
  }
}

// Helper to fetch the current active auth token
function getAuthToken(providedToken: string | null): string | null {
  if (providedToken) return providedToken;
  try {
    return useAuthStore.getState().accessToken;
  } catch {
    console.warn('Could not auto-detect auth token');
  }
  return null;
}

// Helper to perform the actual refresh token network request
async function refreshSessionToken(currentRefreshToken: string): Promise<void> {
  if (isRefreshing) return;
  isRefreshing = true;

  try {
    // TODO: update path to our real auth refresh endpoint
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Skip-Refresh': 'true',
      },
      body: JSON.stringify({ refresh_token: currentRefreshToken }),
    });

    if (!refreshRes.ok) throw new Error('Failed to refresh token');

    const data = await refreshRes.json();
    const { access_token: newAccess, refresh_token: newRefresh } = data;

    const store = useAuthStore.getState();
    store.setTokens(newAccess, newRefresh || currentRefreshToken);

    onRefreshed(newAccess);
  } catch {
    triggerLogout();
  } finally {
    isRefreshing = false;
  }
}

// Helper to handle 401 Unauthorized errors
async function handleUnauthorized<T>(
  path: string,
  options: RequestInit,
  authToken: string | null,
  timeout: number
): Promise<T> {
  console.error('API returned 401 Unauthorized for path:', path);

  const skipRefresh = (options.headers as Record<string, string>)?.['X-Skip-Refresh'] === 'true';

  if (authToken && !skipRefresh) {
    const currentRefreshToken = useAuthStore.getState().refreshToken;

    if (!currentRefreshToken) {
      return triggerLogout() as never;
    }

    refreshSessionToken(currentRefreshToken);

    return new Promise<T>((resolve, reject) => {
      addRefreshSubscriber((newToken) => {
        const newOptions = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          },
        };
        apiFetch<T>(path, newOptions, newToken, timeout).then(resolve).catch(reject);
      });
    });
  }

  if (authToken) {
    return triggerLogout() as never;
  }

  if (!path.includes('/auth/login')) {
    performGlobalLogout();
  }

  throw new Error('Unauthorized');
}

// Main apiFetch wrapper
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token: string | null = null,
  timeout = DEFAULT_TIMEOUT
): Promise<T> {
  const authToken = getAuthToken(token);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options.headers,
    };

    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers,
    });

    clearTimeout(timeoutId);

    if (res.status === 401) {
      try {
        return await handleUnauthorized<T>(path, options, authToken, timeout);
      } catch (err: unknown) {
        if (err instanceof Error && err.message === 'Unauthorized') {
          throw await parseError(res);
        }
        throw err;
      }
    }

    if (!res.ok) {
      throw await parseError(res);
    }

    const contentType = res.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const text = await res.text();
      return text ? JSON.parse(text) : ({} as T);
    }

    return {} as T;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      return Promise.reject(new Error('Request timeout'));
    }
    return Promise.reject(error);
  }
}

const apiService = {
  get: <T>(p: string, t: string | null = null, o?: RequestInit) => apiFetch<T>(p, { ...o, method: 'GET' }, t),
  post: <T>(p: string, d?: unknown, t: string | null = null, o?: RequestInit) =>
    apiFetch<T>(p, { ...o, method: 'POST', body: d ? JSON.stringify(d) : undefined }, t),
  postForm: <T>(p: string, d: Record<string, string>, t: string | null = null, o?: RequestInit) => {
    const formData = new URLSearchParams();
    Object.keys(d).forEach(key => formData.append(key, d[key]));
    
    return apiFetch<T>(p, { 
      ...o, 
      method: 'POST', 
      headers: { ...o?.headers, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString() 
    }, t);
  },
  put: <T>(p: string, d?: unknown, t: string | null = null, o?: RequestInit) =>
    apiFetch<T>(p, { ...o, method: 'PUT', body: d ? JSON.stringify(d) : undefined }, t),
  patch: <T>(p: string, d?: unknown, t: string | null = null, o?: RequestInit) =>
    apiFetch<T>(p, { ...o, method: 'PATCH', body: d ? JSON.stringify(d) : undefined }, t),
  delete: <T>(p: string, t: string | null = null, o?: RequestInit) => apiFetch<T>(p, { ...o, method: 'DELETE' }, t),
};

export default apiService;
