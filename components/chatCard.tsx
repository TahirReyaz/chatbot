import Link from "next/link";

import { SheetClose } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import ChatMenuIcon from "./ChatMenuIcon";

interface Props {
  title: string;
  id: string;
}

const ChatCard = ({ title, id }: Props) => {
  return (
    <div className="grid grid-cols-12 rounded hover:bg-santasGray/20 mt-2">
      <SheetClose asChild className="w-full col-span-10">
        <Link href={`/chat/${id}`} className="p-2 w-full flex text-sm">
          {title}
        </Link>
      </SheetClose>
      <DropdownMenu>
        <ChatMenuIcon />
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">Rename</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-500">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatCard;
