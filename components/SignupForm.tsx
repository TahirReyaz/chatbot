"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

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
import { signup } from "@/lib/actions/auth";
import { useState } from "react";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .regex(passwordValidation, {
      message:
        "Password must be minimum 8 characters long. Must contain an Uppercase, a Lowercase, a Number and a Special Character",
    }),
});

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await signup(values.email, values.password);
      setIsLoading(false);
      redirect("/login");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[350px] mx-auto mt-8 "
      >
        <h3 className="text-center text-lg font-bold">Sign Up</h3>
        <p className="text-center text-sm">
          Create an account with your email and password
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
        <Button type="submit" className="w-full">
          Sign up
          {isLoading && <Loader2 className="ms-2 h-4 w-4 animate-spin" />}
        </Button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-bold">
            Sign in
          </Link>{" "}
          instead.
        </p>
      </form>
    </Form>
  );
};

export default SignupForm;
