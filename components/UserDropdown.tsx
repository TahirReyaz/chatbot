import { signOut } from "@/auth";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { redirect } from "next/navigation";
import ToggleThemeButton from "./ToggleThemeButton";

const UserDropdown = () => {
  return (
    <DropdownMenuContent className="border border-santasGray">
      <ToggleThemeButton />
      <DropdownMenuItem className="text-red-500">
        <form
          action={async () => {
            "use server";
            await signOut();
            redirect("/");
          }}
          className="w-full"
        >
          <button className="w-full">Sign out</button>
        </form>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default UserDropdown;
