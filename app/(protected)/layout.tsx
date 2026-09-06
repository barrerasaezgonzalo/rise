import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { RiseProvider } from "../providers/RiseProvider";
import { ToastProvider } from "../providers/ToastProvider";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <ToastProvider>
      <RiseProvider>{children}</RiseProvider>
    </ToastProvider>
  );
}
