import Sidebar from "@/components/sidebar/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen w-full">{children}</div>
    </div>
  );
};

export default MainLayout;
