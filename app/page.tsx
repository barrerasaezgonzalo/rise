"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { Logo } from "./components/UI/Logo";
import { Header } from "./components/UI/Header";
import { usePlanView } from "./hooks/usePlanView";
import { useActivePlan } from "./hooks/useActivePlan";
import { Loading } from "./components/UI/Loading";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { loadingInitial } = useActivePlan();
  const { currentView } = usePlanView();

  useEffect(() => {
    if (!loading && user === null) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loadingInitial) {
    return <Loading />;
  }

  if (loading || !user) return null;

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 bg-slate-900 font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90 blur-[2px]"
        style={{ backgroundImage: `url('/background.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-2xl w-full bg-white/90 backdrop-blur-md rounded-[32px] shadow-2xl px-6 py-4 flex flex-col justify-between">
        <Header />
        <Logo />
        {currentView}
      </div>
    </main>
  );
}
