import Link from "next/link";
import { Ellipsis } from "lucide-react";

import { SheetClose } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface Props {
  title: string;
  id: string;
}

const ChatCard = ({ title, id }: Props) => {
  return (
    <div className="grid grid-cols-12 rounded hover:bg-santasGray/20">
      <SheetClose asChild className="w-full col-span-10">
        <Link href={`/chat/${id}`} className="p-2 w-full flex">
          {title}
        </Link>
      </SheetClose>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="col-span-2 flex items-center cursor-pointer">
            <Ellipsis />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">Rename</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatCard;
