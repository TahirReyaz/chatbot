"use client";

import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "./ui/input";
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

const formSchema = z.object({
  input: z.string().min(1, { message: "This field has to be filled." }),
});

interface Props {
  id?: string;
  userId?: string;
}

const ChatPanel = ({ id, userId }: Props) => {
  console.log({ id, userId });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const [state, formAction, isPending] = useActionState(
    (prevState: void | undefined, formData: FormData) =>
      sendMessage(prevState, formData, id, userId),
    undefined
  );

  return (
    <div>
      <div className="text-gray-50">Messages</div>
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
