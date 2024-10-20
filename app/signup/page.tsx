import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { Session } from "../lib/definitions";
import SignupForm from "@/components/SignupForm";

const Signup = async () => {
  const session = (await auth()) as Session;

  if (session) {
    redirect("/");
  }

  return (
    <main>
      <SignupForm />
    </main>
  );
};

export default Signup;
