export type User = {
  id: string;
  email: string;
  password: string;
  salt: string;
  createdat: string;
};

export type Message = {
  id: string;
  content: string;
  userid: string;
  createdat: string;
  chat: string;
};

export type Chat = {
  id: string;
  title: string;
  createdAt: string;
  userid: string;
};

export interface Session {
  user: {
    id: string;
    email: string;
  };
}
