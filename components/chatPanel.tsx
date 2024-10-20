import { Suspense } from "react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

interface Props {
  id?: string;
  userid?: string;
}

const ChatPanel = ({ id, userid }: Props) => {
  return (
    <div className="w-full md:w-[70vw] mx-auto flex flex-col gap-8">
      <Suspense fallback={<p>Loading...</p>}>
        <Messages {...{ chatId: id }} />
      </Suspense>
      <ChatInput {...{ id, userid }} />
    </div>
  );
};

export default ChatPanel;
