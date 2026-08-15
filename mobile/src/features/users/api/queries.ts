import apiService from '../../../services/apiService';
import USER_ENDPOINTS from '../services/userEndpoints';
import { User, Preference } from '../types';

export const fetchMyProfile = async (): Promise<User> => {
  const res = await apiService.get<any>(USER_ENDPOINTS.PROFILE);
  return res.data;
};

export const updateMyProfile = async (data: Partial<User>): Promise<User> => {
  const res = await apiService.put<any>(USER_ENDPOINTS.PROFILE, data);
  return res.data;
};

export const fetchMyPreferences = async (): Promise<Preference> => {
  const res = await apiService.get<any>(USER_ENDPOINTS.PREFERENCES);
  return res.data;
};

export const updateMyPreferences = async (data: Partial<Preference>): Promise<Preference> => {
  const res = await apiService.put<any>(USER_ENDPOINTS.PREFERENCES, data);
  return res.data;
};
