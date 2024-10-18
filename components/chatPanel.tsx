"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { sendMessage } from "@/lib/actions/chat";
import { Button } from "./ui/button";
import Messages from "./Messages";

interface Props {
  id?: string;
  userid?: string;
}

const ChatPanel = ({ id, userid }: Props) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await sendMessage(input, id, userid);
      if (!id) {
        router.push(`/chat/${res.chatId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <Suspense fallback={<p>Loading...</p>}> */}
      <Messages {...{ chatId: id }} />
      {/* </Suspense> */}
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
