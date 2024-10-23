"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { deleteChat } from "@/lib/actions/chat";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { toast } from "sonner";

interface Props {
  id: string;
}

const ChatDeleteButton = ({ id }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteChat(id);
      toast.success("Deleted Successfully");
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <DropdownMenuItem
      className="cursor-pointer text-red-500 hover:text-red-500"
      onSelect={(e) => {
        e.preventDefault();
        handleDelete();
      }}
    >
      Delete
      {isLoading && <Loader2 className="ms-2 h-4 w-4 animate-spin" />}
    </DropdownMenuItem>
  );
};

export default ChatDeleteButton;
