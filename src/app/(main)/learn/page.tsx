import { auth } from "@/auth";

const LearnPage = async () => {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return <div>Learn</div>;
};

export default LearnPage;
