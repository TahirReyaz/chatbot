import { getMessageList } from "@/lib/actions/chat";
import Message from "./Message";
import { Message as MessageType } from "@/app/lib/definitions";

interface Props {
  chatId?: string;
  messageList?: MessageType[];
}

const Messages = async ({ chatId, messageList }: Props) => {
  const messages: MessageType[] | undefined = chatId
    ? await getMessageList(chatId)
    : messageList;

  return (
    <div className="text-gray-50 max-h-[70vh] overflow-y-auto">
      {/* Render your messages here */}
      {messages?.map((message, index) => (
        <Message key={index} {...{ ...message }} />
      ))}
    </div>
  );
};

export default Messages;
