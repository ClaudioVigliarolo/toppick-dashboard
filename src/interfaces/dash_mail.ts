export enum MailTemplate {
  Registration = "registration",
  Removal = "removal",
  Update = "update",
  Message = "message",
}

export enum EmailSubject {
  Update = "Updated Credentials",
  Remove = "Account Removal",
  Registration = "Registration",
  Message = "Message",
}

export enum EmailType {
  Registration = "registration.ejs",
  Update = "update.ejs",
  Removal = "removal.ejs",
  Message = "message.ejs",
}

export interface EmailInfo {
  email: string;
  fromEmail: string;
  fromName: string;
  subject: EmailSubject;
  message?: string;
}

export interface LocalsEmail {
  username: string;
  email: string;
  password: string;
  message?: string;
}
