import { getMessageList } from "@/lib/actions/chat";
import Message from "./Message";
import { Message as MessageType } from "@/app/lib/definitions";

interface Props {
  chatId?: string;
}

const Messages = async ({ chatId }: Props) => {
  const messages: MessageType[] = chatId ? await getMessageList(chatId) : [];

  return (
    <div className="text-gray-50 max-h-[70vh] overflow-y-auto">
      {/* Render your messages here */}
      {messages.map((message) => (
        <Message key={message.id} {...{ ...message }} />
      ))}
    </div>
  );
};

export default Messages;
