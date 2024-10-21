import Link from "next/link";
import { FrownIcon } from "lucide-react";

export const NotFound = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FrownIcon className="w-10" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested chat.</p>
      <Link
        href="/"
        className="mt-4 rounded-md px-4 py-2 text-sm transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
};

export default NotFound;
