import { auth } from "@/auth";

const CardsPage = async () => {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return <div>Add Cards</div>;
};

export default CardsPage;
