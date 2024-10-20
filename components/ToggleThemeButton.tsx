"use client";

import { useTheme } from "next-themes";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const ToggleThemeButton = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenuItem
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {`Toggle ${resolvedTheme === "light" ? "dark" : "light"} mode`}
    </DropdownMenuItem>
  );
};

export default ToggleThemeButton;
