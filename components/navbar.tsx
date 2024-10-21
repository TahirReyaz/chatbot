import Link from "next/link";
import { Menu } from "lucide-react";
import { Suspense } from "react";

import { SheetTrigger } from "./ui/sheet";
import UserOrLogin from "./UserOrLogin";

const Navbar = () => {
  return (
    <nav className="p-2 text-sm flex justify-between">
      {/* Sidebar and Hero */}
      <div className="flex gap-2 items-center">
        <SheetTrigger className="items-center">
          <div className="p-1 rounded border border-1">
            <Menu size={20} />
          </div>
        </SheetTrigger>
        <Link href="/">LLM Connect</Link>
      </div>
      {/* Buttons */}
      <Suspense fallback={<div className="flex-1 overflow-auto" />}>
        <UserOrLogin />
      </Suspense>
    </nav>
  );
};

export default Navbar;
