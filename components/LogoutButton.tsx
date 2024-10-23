"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOutFn } from "@/lib/actions";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOutFn();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Unable to logout");
      console.error(error);
    }
  };

  return (
    <DropdownMenuItem
      className="text-red-500 cursor-pointer"
      onClick={handleLogout}
    >
      Sign out
    </DropdownMenuItem>
  );
};

export default LogoutButton;
