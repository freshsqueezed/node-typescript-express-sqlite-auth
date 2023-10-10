declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type User = {
  id: number;
  username: string;
  email: string;
  role?: Role;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
};
