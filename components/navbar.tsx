import Link from "next/link";
import { Button } from "./ui/button";
import { SheetTrigger } from "./ui/sheet";

const Navbar = () => {
  return (
    <nav className="text-iron p-2 text-sm flex justify-between">
      {/* Sidebad and Hero */}
      <div className="flex gap-2">
        <SheetTrigger className="items-center">Menu</SheetTrigger>
        <Link href="/">AI Chat</Link>
      </div>
      {/* Buttons */}
      <Link href="/login">
        <Button
          {...{
            size: "sm",
          }}
        >
          Login
        </Button>
      </Link>
    </nav>
  );
};

export default Navbar;
