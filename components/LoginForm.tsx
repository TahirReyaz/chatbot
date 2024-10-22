"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
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
import { authenticate } from "@/lib/actions/auth";
import { toast } from "sonner";

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

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  // Had to write this because it was stated in the docs that useActionState handles form with server functions... will look into it later and remove this if needed
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setHasSubmitted(true);

    // The action state wants FormData not an object so had to write this as well
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    return formAction(formData);
  };

  // For the toasts
  useEffect(() => {
    if (hasSubmitted && !isPending) {
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        // This doesn't work because the page gets redirected from the server function before this code runs
        toast.success("Successfully logged in");
      }
      setHasSubmitted(false);
    }
  }, [errorMessage, hasSubmitted, isPending]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
