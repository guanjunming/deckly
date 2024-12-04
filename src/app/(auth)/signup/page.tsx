import AppLogo from "@/components/common/AppLogo";
import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center border">
      <div className="pt-2">
        <Link href="/">
          <AppLogo size={50} />
        </Link>
      </div>

      <div className="flex h-full w-full items-center">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
