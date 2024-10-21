import { redirect } from "next/navigation";

import { signOut } from "@/auth";
import { DropdownMenuContent } from "./ui/dropdown-menu";
import ToggleThemeButton from "./ToggleThemeButton";

const UserDropdown = () => {
  return (
    <DropdownMenuContent className="border border-santasGray">
      <ToggleThemeButton />
      <form
        action={async () => {
          "use server";
          await signOut();
          redirect("/");
        }}
        className="w-full"
      >
        <button className="w-full text-red-500">Sign out</button>
      </form>
    </DropdownMenuContent>
  );
};

export default UserDropdown;
