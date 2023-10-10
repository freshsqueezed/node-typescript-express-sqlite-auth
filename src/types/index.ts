export type User = {
  id: number;
  username: string;
  email: string;
  role?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
};
