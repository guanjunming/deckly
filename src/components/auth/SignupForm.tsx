"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { signupSchema } from "@/schemas/auth";
import PulseLoader from "react-spinners/PulseLoader";
import ErrorLabel from "./ErrorLabel";
import { useState } from "react";
import { signup } from "@/server/actions/auth";
import OAuthButtons from "./OAuthButtons";

const SignupForm = () => {
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    setError("");

    const data = await signup(values);

    if (data?.error) {
      setError(data?.error);
    }
  };

  return (
    <div className="mx-auto w-full sm:max-w-[450px]">
      <CardHeader>
        <CardTitle className="text-4xl">Create your account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name" className="text-base">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Name"
                        maxLength={50}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email" className="text-base">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="Email"
                        type="email"
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
                    <FormLabel htmlFor="password" className="text-base">
                      Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="Password"
                        autoComplete="new-password"
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
                  "Sign up"
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
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <OAuthButtons mode="signup" />

        <div className="mt-8 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </div>
  );
};

export default SignupForm;
