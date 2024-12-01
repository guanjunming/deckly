import { auth } from "@/auth";

const StatsPage = async () => {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return <div>Statistics</div>;
};

export default StatsPage;
