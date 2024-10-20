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
            <Button variant={"secondary"}>{session.user.email}</Button>
          </DropdownMenuTrigger>
          <UserDropdown />
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button
            {...{
              size: "sm",
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
