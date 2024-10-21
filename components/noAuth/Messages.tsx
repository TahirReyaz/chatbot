import { useEffect, useRef } from "react";

import { Message as MessageType } from "@/lib/definitions";
import Message from "../Message";

interface Props {
  messages?: MessageType[];
}

const Messages = ({ messages }: Props) => {
  const divRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (divRef?.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="text-gray-50 max-h-[70vh] overflow-y-auto">
      {/* Render your messages here */}
      {messages?.map((message, index) => (
        <Message key={index} {...{ ...message }} />
      ))}
      <div ref={divRef} />
    </div>
  );
};

export default Messages;
