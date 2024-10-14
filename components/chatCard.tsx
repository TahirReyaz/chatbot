import Link from "next/link";
import { SheetClose } from "./ui/sheet";

interface Props {
  title: string;
  id: string;
}

const ChatCard = ({ title, id }: Props) => {
  return (
    <SheetClose asChild className="w-full">
      <Link
        href={`/chat/${id}`}
        className="rounded bg-santasGray p-2 w-full flex"
      >
        {title}
      </Link>
    </SheetClose>
  );
};

export default ChatCard;
