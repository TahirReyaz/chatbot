"use client";

import { useEffect, useState } from "react";
import { getMessageList } from "@/lib/actions/chat";
import Message from "./Message";

interface Props {
  chatId?: string;
}

const Messages = ({ chatId }: Props) => {
  const [messages, setMessages] = useState<any[]>([]); // Change `any` to your message type

  useEffect(() => {
    const fetchMessages = async () => {
      if (chatId) {
        const messages = await getMessageList(chatId);
        setMessages(messages);
      }
    };

    fetchMessages();
  }, [chatId]); // Re-fetch messages when `chatId` changes

  console.log({ messages });

  return (
    <div className="text-gray-50">
      {/* Render your messages here */}
      {messages.map((message) => (
        <Message key={message.id} {...{ ...message }} />
      ))}
    </div>
  );
};

export default Messages;
