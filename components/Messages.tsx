import { notFound } from "next/navigation";

import { getMessageList } from "@/lib/actions/chat";
import Message from "./Message";
import { Message as MessageType } from "@/lib/definitions";
import ScrollToBottom from "./ScrollToBottom";

interface Props {
  chatId?: string;
}

const Messages = async ({ chatId }: Props) => {
  let messages: MessageType[] = [];
  if (chatId) {
    try {
      const fetchedMsgs = await getMessageList(chatId);
      messages = fetchedMsgs;
      if (messages.length === 0) {
        throw new Error(`No messages found in the chat with id ${chatId}`);
      }
    } catch (error) {
      console.error(error);
      notFound();
    }
  }

  return (
    <div className="text-gray-50 h-[70vh] overflow-y-auto">
      {/* Render your messages here */}
      {messages?.map((message, index) => (
        <Message key={index} {...{ ...message }} />
      ))}
      <ScrollToBottom />
    </div>
  );
};

export default Messages;
