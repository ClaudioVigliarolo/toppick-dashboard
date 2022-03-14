export interface UserDashboard {
  role: UserRole;
  username: string;
  email: string;
  uid: string;
}

export interface UserApproved {
  username: string;
  id: string;
}

export enum UserRole {
  ADMIN = "ADMIN",
  CREATOR = "CREATOR",
  DEFAULT = "DEFAULT",
}

export interface UserAppState {
  displayName: string;
  photoURL: string;
  token: string;
  uid: string;
  isAuthenticated: boolean;
  role: UserRole;
}
