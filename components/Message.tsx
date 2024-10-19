import { User, BotIcon } from "lucide-react";

interface Props {
  id: string;
  content: string;
  userid: string;
}

const Message = ({ content, userid }: Props) => {
  return (
    <div className="mb-4 flex gap-2">
      <div>{userid === "bot" ? <BotIcon /> : <User />}</div>
      <p>{content}</p>
    </div>
  );
};

export default Message;
