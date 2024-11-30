import LogoutButton from "@/components/auth/LogoutButton";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <LogoutButton>Logout</LogoutButton>

      {children}
    </div>
  );
};

export default MainLayout;
