export interface Preference {
  theme: string | null;
  notification_enabled: boolean;
  preferred_categories: Record<string, any> | null;
  preferred_exams: Record<string, any> | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  preference?: Preference | null;
}
