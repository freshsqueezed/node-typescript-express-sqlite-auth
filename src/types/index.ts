export type User = {
  id: number;
  username: string;
  email: string;
  roles?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
};
