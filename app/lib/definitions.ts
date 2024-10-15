export type User = {
  id: string;
  email: string;
  password: string;
  salt: string;
  createdat: string;
};

export type Chat = {
  id: string;
  content: string;
  user: string;
  createdat: string;
};
