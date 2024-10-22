export type User = {
  id: string;
  email: string;
  password: string;
  salt: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  content: string;
  userid: string;
  created_at: string;
  chat: string;
  role: "user" | "assistant";
};

export type Chat = {
  id: string;
  title: string;
  created_at: string;
  userid: string;
};

export interface Session {
  user: {
    id: string;
    email: string;
  };
}
