import AppLogo from "@/components/common/AppLogo";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center border">
      <div className="pt-2">
        <AppLogo size={50} />
      </div>

      <div className="flex h-full w-full items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
