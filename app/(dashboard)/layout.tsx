import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { config } from "@/lib/utils";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: {
    user: { name: string; email: string; image: string };
  } | null = await getServerSession();

  if (!session) {
    redirect("/");
  }

  let email: string = await session?.user?.email;
  
  const res = await fetch(`${config.apiURL}/api/users/email/${email}`);
  const data = await res.json();
  // redirecting user to the home page if not admin
  if (data.role === "user") {
    redirect("/");
  }

  return <>{children}</>;
}
