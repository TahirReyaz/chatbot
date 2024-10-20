import { signOut } from "@/auth";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { redirect } from "next/navigation";

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
