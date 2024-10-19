import ChatInput from "./ChatInput";
import Messages from "./Messages";

interface Props {
  id?: string;
  userid?: string;
}

const ChatPanel = ({ id, userid }: Props) => {
  return (
    <div>
      <Messages {...{ chatId: id }} />
      <ChatInput {...{ id, userid }} />
    </div>
  );
};

export default ChatPanel;
