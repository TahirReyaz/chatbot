"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { ArrowUp, Loader } from "lucide-react";

import { sendMessage } from "@/lib/actions/chat";
import { Textarea } from "./ui/textarea";

interface Props {
  id?: string;
  userid?: string;
}

const ChatInput = ({ id, userid }: Props) => {
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();

  const handleSubmit = async () => {
    try {
      setInput("");
      setIsLoading(true);
      await sendMessage(input, id, userid);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <Textarea
        placeholder="Say something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={`${
          resolvedTheme === "light" ? "bg-athensGray" : "bg-shark"
        }`}
        disabled={isLoading}
      />
      <div
        className={`absolute right-4 bottom-2 z-10 p-1 rounded-full cursor-pointer ${
          resolvedTheme === "light"
            ? "bg-alabaster text-santasGray"
            : "bg-santasGray text-woodsmoke"
        }`}
        onClick={handleSubmit}
      >
        {isLoading ? <Loader size={20} /> : <ArrowUp size={20} />}
      </div>
    </div>
  );
};

export default ChatInput;
