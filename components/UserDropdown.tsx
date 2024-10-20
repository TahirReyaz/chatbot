import { signOut } from "@/auth";
import { Button } from "./ui/button";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";

const UserDropdown = () => {
  return (
    <DropdownMenuContent className="border border-santasGray bg-woodsmoke">
      <DropdownMenuItem className="text-iron">
        Toggle light mode
      </DropdownMenuItem>
      <DropdownMenuItem className="bg-transparent text-red-500 p-0 hover:bg-shark">
        <form
          action={async () => {
            "use server";
            await signOut();
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
