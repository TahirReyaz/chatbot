import Link from "next/link";

import { Session } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import UserDropdown from "./UserDropdown";
import ToggleThemeButton from "./ToggleThemeNoAuth";

const UserOrLogin = async () => {
  const session = (await auth()) as Session;
  return (
    <>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>{session.user.email}</DropdownMenuTrigger>
          <UserDropdown />
        </DropdownMenu>
      ) : (
        <div className="flex gap-2">
          <ToggleThemeButton />
          <Link href="/login">
            <Button
              {...{
                size: "sm",
              }}
            >
              Login
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default UserOrLogin;
