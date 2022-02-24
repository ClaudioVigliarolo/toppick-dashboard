import { Lang } from "./app";

export interface User {
  type: string;
  username: string;
  mail: string;
  languages: Lang[];
}

export interface UserCreated extends User {
  password: string;
  id: number;
}

export interface UserLogged extends User {
  token: string;
}
export interface UserApproved {
  username: string;
  id: number;
}
