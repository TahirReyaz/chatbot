import { Message as MessageType } from "@/app/lib/definitions";
import Message from "../Message";

interface Props {
  messages?: MessageType[];
}

const Messages = ({ messages }: Props) => {
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
