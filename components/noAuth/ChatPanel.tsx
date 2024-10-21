"use client";

import { Suspense, useState } from "react";

import { Message as MessageType } from "@/app/lib/definitions";
import ChatInput from "../ChatInput";
import { sendMessage } from "@/lib/actions/chat";
import Messages from "../Messages";

const ChatPanelNoAuth = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const randomUserId = new Date().toString();

  const handleSubmitNoAuth = async (input: string) => {
    const date = new Date();
    const newMsgObject: MessageType = {
      id: new Date().toString(),
      content: input,
      userid: randomUserId,
      createdat: date.toDateString(),
      chat: randomUserId,
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
          userid: "bot",
          createdat: date.toDateString(),
          chat: randomUserId,
        },
      ]);
    }
  };

  return (
    <main className="w-full md:w-[70vw] mx-auto flex flex-col gap-8">
      <Suspense fallback={<p>Loading...</p>}>
        <Messages {...{ messageList: messages }} />
      </Suspense>
      <ChatInput {...{ messages, handleSubmitNoAuth }} />
    </main>
  );
};

export default ChatPanelNoAuth;
