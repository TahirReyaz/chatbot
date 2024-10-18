"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { sendMessage } from "@/lib/actions/chat";
import { Button } from "./ui/button";

interface Props {
  id?: string;
  userId?: string;
}

const ChatPanel = ({ id, userId }: Props) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await sendMessage(input, id, userId);
      router.push(`/chat/${res.chatId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="text-gray-50">Messages</div>
      <Input
        placeholder="Say something..."
        className="bg-shark"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        type="submit"
        className="w-full"
        variant={"secondary"}
        onClick={handleSubmit}
      >
        Send
      </Button>
    </div>
  );
};

export default ChatPanel;
