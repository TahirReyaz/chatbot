"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { deleteChat } from "@/lib/actions/chat";
import { DropdownMenuItem } from "./ui/dropdown-menu";

interface Props {
  id: string;
}

const ChatDeleteButton = ({ id }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteChat(id);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <DropdownMenuItem
      className="cursor-pointer text-red-500 hover:text-red-500"
      onClick={handleDelete}
    >
      Delete
      {isLoading && <Loader2 className="ms-2 h-4 w-4 animate-spin" />}
    </DropdownMenuItem>
  );
};

export default ChatDeleteButton;
