import { Session } from "@/app/lib/definitions";
import { auth } from "@/auth";
import ChatPanel from "@/components/chatPanel";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Screen: any = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = (await auth()) as Session;
  if (!session) {
    redirect("/");
  }

  return <ChatPanel {...{ id, userid: session.user?.id }} />;
};

export default Screen;
