import { signOut } from "@/auth";
import { Button } from "./ui/button";

const UserDropdown = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button>Log out</Button>
    </form>
  );
};

export default UserDropdown;
