"use client";

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { githubLogin, googleLogin } from "@/server/actions/auth";

interface OAuthButtonsProps {
  mode: "login" | "signup";
}

const OAuthButtons = ({ mode }: OAuthButtonsProps) => {
  return (
    <div className="my-4 flex flex-col gap-3">
      <Button
        variant="outline"
        size="lg"
        className="w-full rounded-full"
        onClick={() => googleLogin()}
      >
        <FcGoogle /> {`${mode === "login" ? "Sign in" : "Sign up"} with Google`}
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="w-full rounded-full"
        onClick={() => githubLogin()}
      >
        <FaGithub /> {`${mode === "login" ? "Sign in" : "Sign up"} with GitHub`}
      </Button>
    </div>
  );
};

export default OAuthButtons;
