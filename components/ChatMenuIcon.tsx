import { Ellipsis } from "lucide-react";
import { useTheme } from "next-themes";

import { DropdownMenuTrigger } from "./ui/dropdown-menu";

const ChatMenuIcon = () => {
  const { resolvedTheme } = useTheme();

  return (
    <DropdownMenuTrigger>
      <div
        className={`col-span-2 flex items-center cursor-pointer text-santasGray ${
          resolvedTheme === "light"
            ? "hover:text-black"
            : "hover:text-alabaster"
        }`}
      >
        <Ellipsis size={16} />
      </div>
    </DropdownMenuTrigger>
  );
};

export default ChatMenuIcon;
