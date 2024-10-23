"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authenticate } from "@/lib/actions";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const LoginForm = () => {
  // Had to create this form object so that shadcn Form could be used
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, setIsPending] = useState<boolean>(false);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      await authenticate(formData);

      toast.success("Successfully logged in");
      setIsPending(false);
    } catch (error: unknown) {
      // Type guard for standard Error
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 w-[350px] mx-auto mt-8 "
      >
        <h3 className="text-center text-lg font-bold">Sign In</h3>
        <p className="text-center text-sm">
          Use your email and password to sign in
        </p>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          Sign in
          {/* Don't know why this spinner is never rendered even when isPending is true */}
          {isPending && <Loader2 className="ms-2 h-4 w-4 animate-spin" />}
        </Button>
        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold">
            Sign up
          </Link>{" "}
          for free.
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
