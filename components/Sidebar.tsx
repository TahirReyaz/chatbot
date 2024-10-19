import { getChatList } from "@/lib/actions/chat";
import SidebarContent from "./SidebarContent";
import { auth } from "@/auth";
import { Session } from "next-auth";

const Sidebar = async () => {
  const session = (await auth()) as Session;
  const chats = session?.user?.id ? await getChatList(session.user?.id) : [];
  return <SidebarContent {...{ chats, isLoggedIn: !!session?.user?.id }} />;
};

export default Sidebar;
