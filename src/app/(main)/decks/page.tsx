import { auth } from "@/auth";

const DecksPage = async () => {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default DecksPage;
