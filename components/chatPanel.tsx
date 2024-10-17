"use client";

import { useActionState } from "react";
// import { useChat } from "ai/react";
import { Textarea } from "./ui/textarea";
import { sendMessage } from "@/lib/actions/chat";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./ui/input";

const formSchema = z.object({
  input: z.string().min(1, { message: "This field has to be filled." }),
});

const ChatPanel = () => {
  // const { messages, input, handleInputChange, handleSubmit } = useChat();
  // console.log({ messages });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const [state, formAction, isPending] = useActionState(sendMessage, undefined);

  return (
    <div>
      {/* <div className="text-gray-50">Messages</div> */}
      {/* <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch text-alabaster">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap text-alabaster">
            <p>adrak</p>
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input
            className="fixed text-iron bg-shark bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div> */}
      <Form {...form}>
        <form action={formAction} className="space-y-8 w-[350px] mx-auto mt-8 ">
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Say something..."
                    {...field}
                    className="bg-shark"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            variant={isPending ? "ghost" : "secondary"}
          >
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatPanel;
