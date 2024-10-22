"use client";

import { User, BotIcon } from "lucide-react";
import { useTheme } from "next-themes";

interface Props {
  id: string;
  content: string;
  role: string;
}

const Message = ({ content, role }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className={`mb-4 flex gap-2`}>
      <div className="text-santasGray">
        {role === "assistant" ? <BotIcon size={20} /> : <User size={20} />}
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
