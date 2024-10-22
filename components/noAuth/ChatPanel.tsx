"use client";

import { Suspense, useState } from "react";

import { Message as MessageType } from "@/lib/definitions";
import ChatInput from "../ChatInput";
import { sendMessage } from "@/lib/actions/chat";
import Messages from "./Messages";

const ChatPanelNoAuth = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const randomUserId = new Date().toString();

  const handleSubmitNoAuth = async (input: string) => {
    const date = new Date();
    const newMsgObject: MessageType = {
      id: new Date().toString(),
      content: input,
      userid: randomUserId,
      created_at: date.toDateString(),
      chat: randomUserId,
      role: "user",
    };

    const newMessages: MessageType[] = [...messages, newMsgObject];

    const botResponse = await sendMessage(
      input,
      undefined,
      undefined,
      newMessages
    );

    if (setMessages && botResponse) {
      setMessages([
        ...newMessages,
        {
          id: new Date().toString(),
          content: botResponse,
          userid: randomUserId,
          created_at: date.toDateString(),
          chat: randomUserId,
          role: "assistant",
        },
      ]);
    }
  };

  return (
    <main className="w-full md:w-[70vw] mx-auto flex flex-col gap-8 px-2">
      <Suspense fallback={<p>Loading...</p>}>
        <Messages {...{ messages }} />
      </Suspense>
      <ChatInput {...{ messages, handleSubmitNoAuth }} />
    </main>
  );
};

export default ChatPanelNoAuth;
