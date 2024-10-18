import { auth } from "@/auth";
import ChatPanel from "@/components/chatPanel";
import { Session } from "./lib/definitions";

export default async function Home() {
  const session = (await auth()) as Session;

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ChatPanel {...{ userid: session?.user?.id }} />
    </div>
  );
}
