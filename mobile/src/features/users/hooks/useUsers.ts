import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMyProfile, updateMyProfile, fetchMyPreferences, updateMyPreferences } from '../api/queries';
import { useAuthStore } from '../../../store/auth.store';

export const useUser = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: fetchMyProfile,
    enabled: !!useAuthStore.getState().accessToken,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    },
  });
};

export const usePreferences = () => {
  return useQuery({
    queryKey: ['myPreferences'],
    queryFn: fetchMyPreferences,
    enabled: !!useAuthStore.getState().accessToken,
  });
};

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMyPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPreferences'] });
    },
  });
};
