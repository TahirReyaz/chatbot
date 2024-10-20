"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { ArrowUp } from "lucide-react";

import { sendMessage } from "@/lib/actions/chat";
import { Textarea } from "./ui/textarea";

interface Props {
  id?: string;
  userid?: string;
}

const ChatInput = ({ id, userid }: Props) => {
  const [input, setInput] = useState<string>("");
  const { resolvedTheme } = useTheme();

  const handleSubmit = async () => {
    try {
      setInput("");
      await sendMessage(input, id, userid);
    } catch (error) {
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
      />
      <div
        className={`absolute right-4 bottom-2 z-10 p-1 rounded-full cursor-pointer ${
          resolvedTheme === "light"
            ? "bg-alabaster text-santasGray"
            : "bg-santasGray text-woodsmoke"
        }`}
        onClick={handleSubmit}
      >
        <ArrowUp size={20} />
      </div>
    </div>
  );
};

export default ChatInput;
