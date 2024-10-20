"use client";

import { useState } from "react";

import { Input } from "./ui/input";
import { sendMessage } from "@/lib/actions/chat";
import { Button } from "./ui/button";

interface Props {
  id?: string;
  userid?: string;
}

const ChatInput = ({ id, userid }: Props) => {
  const [input, setInput] = useState<string>("");

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
      />
      <Button type="submit" className="w-full" onClick={handleSubmit}>
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
