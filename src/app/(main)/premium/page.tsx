import { auth } from "@/auth";

const PremiumPage = async () => {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return <div>Premium</div>;
};

export default PremiumPage;
