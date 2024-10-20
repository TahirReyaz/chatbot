"use client";

import { Button } from "@/components/ui/button";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import ChatCard from "./chatCard";
import { Chat } from "@/app/lib/definitions";
import Link from "next/link";

interface Props {
  chats?: Chat[];
  isLoggedIn: boolean;
}

const SidebarContent = ({ chats, isLoggedIn }: Props) => {
  return (
    <SheetContent side="left" className="w-full">
      <div className="flex gap-4">
        <h5>History</h5>
        <span>{`${chats?.length ?? 0} chats`}</span>
      </div>
      {isLoggedIn ? (
        <div className="w-full max-h-[80vh] overflow-y-auto">
          <SheetClose asChild className="w-full">
            <Link
              href={`/`}
              className="rounded hover:bg-santasGray/20 w-full flex"
            >
              <Button className="w-full">Start New Chat</Button>
            </Link>
          </SheetClose>
          {chats && chats?.length > 0 ? (
            chats.map((chat, index) => (
              <ChatCard
                key={index}
                {...{
                  ...chat,
                }}
              />
            ))
          ) : (
            <p>Login to save and revisit previous chats!</p>
          )}
        </div>
      ) : (
        <p>0 chats! Start new chat</p>
      )}
    </SheetContent>
  );
};

export default SidebarContent;
