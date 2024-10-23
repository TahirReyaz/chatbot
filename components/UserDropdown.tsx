import { DropdownMenuContent } from "./ui/dropdown-menu";
import ToggleThemeButton from "./ToggleThemeButton";
import LogoutButton from "./LogoutButton";

const UserDropdown = () => {
  return (
    <DropdownMenuContent className="border border-santasGray">
      <ToggleThemeButton />
      <LogoutButton />
    </DropdownMenuContent>
  );
};

export default UserDropdown;
