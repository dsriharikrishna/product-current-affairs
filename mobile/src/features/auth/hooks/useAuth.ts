import { useMutation } from '@tanstack/react-query';
import apiService from '../../../services/apiService';
import AUTH_ENDPOINTS from '../services/authEndpoints';
import { useAuthStore } from '../../../store/auth.store';

export const useLogin = () => {
  const { setTokens } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: Record<string, string>) => {
      const response = await apiService.postForm<{ success: boolean; data: { access_token: string } }>(
        AUTH_ENDPOINTS.LOGIN,
        credentials
      );
      
      if (!response || !response.success || !response.data?.access_token) {
        throw new Error('Invalid response from server');
      }
      
      return response.data;
    },
    onSuccess: (data) => {
      setTokens(data.access_token, data.access_token);
    },
  });
};

export const useSignup = () => {
  const { setTokens } = useAuthStore();

  return useMutation({
    mutationFn: async (userData: Record<string, string>) => {
      const response = await apiService.post<{ success: boolean; data: { access_token: string } }>(
        AUTH_ENDPOINTS.REGISTER,
        userData
      );
      
      if (!response || !response.success || !response.data?.access_token) {
        throw new Error('Invalid response from server');
      }
      
      return response.data;
    },
    onSuccess: (data) => {
      setTokens(data.access_token, data.access_token);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await apiService.post<{ success: boolean; message: string }>(
        AUTH_ENDPOINTS.FORGOT_PASSWORD,
        { email }
      );
      
      if (!response || !response.success) {
        throw new Error('Failed to request password reset');
      }
      
      return response;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: { token: string; new_password: string }) => {
      const response = await apiService.post<{ success: boolean; message: string }>(
        AUTH_ENDPOINTS.RESET_PASSWORD,
        data
      );
      
      if (!response || !response.success) {
        throw new Error('Failed to reset password');
      }
      
      return response;
    },
  });
};
