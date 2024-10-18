import { Session } from "@/app/lib/definitions";
import { auth } from "@/auth";
import ChatPanel from "@/components/chatPanel";

const Chat = async ({ params }: { params: { id: string } }) => {
  const session = (await auth()) as Session;
  return <ChatPanel {...{ id: params.id, userId: session.user.id }} />;
};

export default Chat;
