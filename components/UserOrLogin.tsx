import Link from "next/link";

import { Session } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import UserDropdown from "./UserDropdown";

const UserOrLogin = async () => {
  const session = (await auth()) as Session;
  return (
    <>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>{session.user.email}</Button>
          </DropdownMenuTrigger>
          <UserDropdown />
        </DropdownMenu>
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
