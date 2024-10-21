import { auth } from "@/auth";
import ChatPanel from "@/components/chatPanel";
import { Session } from "./lib/definitions";

export default async function Home() {
  const session = (await auth()) as Session;

  return <ChatPanel {...{ userid: session?.user?.id }} />;
}
