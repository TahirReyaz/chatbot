"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useActionState } from "react";

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
import { authenticate } from "@/lib/actions/auth";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  console.log({ errorMessage });

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8 w-[350px] mx-auto mt-8 ">
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
                <Input
                  placeholder="Your email address"
                  {...field}
                  className="bg-shark"
                />
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
                <Input {...field} className="bg-shark" />
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
          Sign in
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

export default Login;
