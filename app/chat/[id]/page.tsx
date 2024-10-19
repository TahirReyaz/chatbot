import { Session } from "@/app/lib/definitions";
import { auth } from "@/auth";
import ChatPanel from "@/components/chatPanel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Screen: any = async ({ params }: { params: { id: string } }) => {
  const session = (await auth()) as Session;
  return <ChatPanel {...{ id: params.id, userid: session.user.id }} />;
};

export default Screen;
