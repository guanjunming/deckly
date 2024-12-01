import { auth } from "@/auth";

const BrowserPage = async () => {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return <div>Decks</div>;
};

export default BrowserPage;
