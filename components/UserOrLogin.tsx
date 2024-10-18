import Link from "next/link";

import { Session } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { Button } from "./ui/button";

const UserOrLogin = async () => {
  const session = (await auth()) as Session;
  return (
    <>
      {session.user ? (
        <Button>{session.user.email}</Button>
      ) : (
        <Link href="/login">
          <Button
            {...{
              size: "sm",
              variant: "secondary",
            }}
          >
            Login
          </Button>
        </Link>
      )}
    </>
  );
};

export default UserOrLogin;
