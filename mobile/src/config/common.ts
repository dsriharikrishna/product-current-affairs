import { Platform } from 'react-native';
import NEWS_ENDPOINTS from '../features/news/services/newsEndpoints';

// Type for API endpoints
type EndpointValue = string | ((...args: any[]) => string); // eslint-disable-line @typescript-eslint/no-explicit-any

export interface ApiEndpoints {
  [key: string]: EndpointValue;
}

export interface ApiConfig {
  BASE_URL: string;
  ENDPOINTS: Readonly<ApiEndpoints>;
}

// Use 10.0.2.2 for Android emulator to access host localhost
// Use localhost for iOS simulator
const API_BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8002/api/v1' : 'http://localhost:8002/api/v1';

const endpoints: ApiEndpoints = {
  ...NEWS_ENDPOINTS,
};

const frozenEndpoints = Object.freeze(endpoints);

const API_CONFIG: ApiConfig = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: frozenEndpoints,
};

export default API_CONFIG;
export { API_CONFIG };
