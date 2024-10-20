"use client";

import { useState } from "react";

import { Input } from "./ui/input";
import { sendMessage } from "@/lib/actions/chat";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

interface Props {
  id?: string;
  userid?: string;
}

const ChatInput = ({ id, userid }: Props) => {
  const [input, setInput] = useState<string>("");
  const { resolvedTheme } = useTheme();

  const handleSubmit = async () => {
    try {
      await sendMessage(input, id, userid);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Input
        placeholder="Say something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={`${
          resolvedTheme === "light" ? "bg-athensGray" : "bg-shark"
        }`}
      />
      <Button
        type="submit"
        className={`w-full ${
          resolvedTheme === "light" ? "bg-santasGray" : "bg-alabaster"
        }`}
        onClick={handleSubmit}
      >
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
