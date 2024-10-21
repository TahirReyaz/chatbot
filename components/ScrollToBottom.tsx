"use client";

import { useEffect, useRef } from "react";

const ScrollToBottom = () => {
  const divRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (divRef?.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return <div ref={divRef} />;
};

export default ScrollToBottom;
