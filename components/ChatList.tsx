import { Session } from "@/lib/definitions";
import { auth } from "@/auth";
import ChatCard from "./chatCard";

const ChatList = async () => {
  const session = (await auth()) as Session;
  return (
    <>
      {session?.user ? (
        <ChatCard {...{ title: "adrak", id: "lehsun" }} />
      ) : (
        <p>Login to save and revisit previous chats!</p>
      )}
    </>
  );
};

export default ChatList;
