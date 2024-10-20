"use client";

import { useTheme } from "next-themes";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const ToggleThemeButton = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenuItem
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="cursor-pointer"
    >
      {`Toggle ${resolvedTheme === "light" ? "dark" : "light"} mode`}
    </DropdownMenuItem>
  );
};

export default ToggleThemeButton;
