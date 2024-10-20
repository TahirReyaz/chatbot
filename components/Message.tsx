"use client";

import { User, BotIcon } from "lucide-react";
import { useTheme } from "next-themes";

interface Props {
  id: string;
  content: string;
  userid: string;
}

const Message = ({ content, userid }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className={`mb-4 flex gap-2`}>
      <div className="text-santasGray">
        {userid === "bot" ? <BotIcon size={20} /> : <User size={20} />}
      </div>
      <p
        className={` ${
          resolvedTheme === "light" ? "text-woodsmoke" : "text-iron"
        }`}
      >
        {content}
      </p>
    </div>
  );
};

export default Message;
