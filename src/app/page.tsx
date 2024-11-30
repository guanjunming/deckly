import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1>Home Page</h1>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
}
