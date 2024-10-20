import Link from "next/link";

import { SheetClose } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import ChatMenuIcon from "./ChatMenuIcon";
import { deleteChat } from "@/lib/actions/chat";
import ChatDeleteButton from "./ChatDeleteButton";

interface Props {
  title: string;
  id: string;
}

const ChatCard = ({ title, id }: Props) => {
  return (
    <div className="flex justify-between rounded hover:bg-santasGray/20 mt-2 p-2">
      <SheetClose asChild className="w-full">
        <Link href={`/chat/${id}`} className="w-full flex text-sm">
          {title}
        </Link>
      </SheetClose>
      <DropdownMenu>
        <ChatMenuIcon />
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">Rename</DropdownMenuItem>
          <ChatDeleteButton id={id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatCard;
