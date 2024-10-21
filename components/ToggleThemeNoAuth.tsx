"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const ToggleThemeButton = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="cursor-pointer"
      variant={"secondary"}
    >
      {`Toggle ${resolvedTheme === "light" ? "dark" : "light"} mode`}
    </Button>
  );
};

export default ToggleThemeButton;
