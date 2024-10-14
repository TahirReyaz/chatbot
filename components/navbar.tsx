import Link from "next/link";
import { Button } from "./ui/button";
import { SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="text-iron p-2 text-sm flex justify-between">
      {/* Sidebad and Hero */}
      <div className="flex gap-2 items-center">
        <SheetTrigger className="items-center">
          <div className="p-1 rounded border border-1 border-shark">
            <Menu size={20} className="text-alabaster" />
          </div>
        </SheetTrigger>
        <Link href="/">AI Chat</Link>
      </div>
      {/* Buttons */}
      <Link href="/login">
        <Button
          {...{
            size: "sm",
            variant: "secondary",
          }}
        >
          Login
        </Button>
      </Link>
    </nav>
  );
};

export default Navbar;
