import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm";
import { Session } from "../lib/definitions";

export const metadata: Metadata = {
  title: "LLM Connect · Login",
  description: "Chatgpt-like AI Chatbot",
};

const Login = async () => {
  const session = (await auth()) as Session;

  if (session) {
    redirect("/");
  }

  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default Login;
