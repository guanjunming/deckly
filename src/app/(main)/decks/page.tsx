import { auth } from "@/auth";

const DecksPage = async () => {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return <div>Decks</div>;
};

export default DecksPage;
