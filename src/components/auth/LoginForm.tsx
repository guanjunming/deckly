"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { googleLogin, login } from "@/actions/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { loginSchema } from "@/schemas/auth";
import ErrorLabel from "./ErrorLabel";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("");

    try {
      const data = await login(values);

      if (data?.error) {
        setError(data?.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <div className="h-full w-full place-content-center sm:max-w-[500px]">
      <div className="rounded-xl bg-card text-card-foreground sm:border sm:shadow">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          autoComplete="email"
                          {...field}
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
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ErrorLabel message={error} />

                <Button
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="mt-2 w-full rounded-full"
                >
                  {form.formState.isSubmitting ? (
                    <PulseLoader
                      loading={true}
                      color="#fff"
                      size={8}
                      speedMultiplier={0.7}
                    />
                  ) : (
                    "Log In"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="my-4 w-full rounded-full"
            onClick={() => googleLogin()}
          >
            <FcGoogle /> Log in with Google
          </Button>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default LoginForm;
