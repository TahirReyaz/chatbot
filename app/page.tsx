import { auth } from "@/auth";
import ChatPanel from "@/components/chatPanel";
import { Session } from "./lib/definitions";
import ChatPanelNoAuth from "@/components/noAuth/ChatPanel";

export default async function Home() {
  const session = (await auth()) as Session;

  if (!session) {
    return <ChatPanelNoAuth />;
  }

  return <ChatPanel {...{ userid: session?.user?.id }} />;
}
