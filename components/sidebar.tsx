"use client";

import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ChatCard from "./chatCard";

export function Sidebar() {
  const chats = [{ title: "Adrak", id: "lesun" }];
  return (
    <SheetContent side="left" className="bg-shark text-iron w-full">
      <SheetHeader>
        <SheetTitle className="text-iron">History</SheetTitle>
      </SheetHeader>
      <div className="w-full">
        {chats?.length > 0 ? (
          chats.map((chat) => (
            <ChatCard
              {...{
                ...chat,
              }}
            />
          ))
        ) : (
          <p>Login to save and revisit previous chats!</p>
        )}
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
