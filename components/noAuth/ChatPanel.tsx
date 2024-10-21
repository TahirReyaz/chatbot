"use client";

import { Suspense, useState } from "react";

import { Message as MessageType } from "@/app/lib/definitions";
import ChatInput from "../ChatInput";
import { sendMessage } from "@/lib/actions/chat";
import Messages from "../Messages";

const ChatPanelNoAuth = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleSubmitNoAuth = async (input: string) => {
    const date = new Date();
    const newMsgObject: MessageType = {
      id: "random",
      content: input,
      userid: "userrandom",
      createdat: date.toDateString(),
      chat: "random",
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
          id: "random",
          content: botResponse,
          userid: "bot",
          createdat: "random",
          chat: "random",
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
