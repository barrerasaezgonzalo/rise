"use client";

import { HeaderButtons } from "../components/HeaderButtons";
import { HeaderLogo } from "../components/HeaderLogo";
import { HomeHero } from "../components/HomeHero";
import { HomeInput } from "../components/HomeInput";
import { HeaderBg } from "../components/HeaderBg";
import { RiseInfoBanner } from "../components/RiseInfoBanner";
import { RiseButton } from "../components/RiseButton";
import { useRise } from "../hooks/useRise";
import { RisePlan } from "../components/RisePlan";
import { ClosedPlan } from "../components/ClosedPlan";

export default function Page() {
  const { completed, plan } = useRise();
  return (
    <>
      <main
        className={`relative flex min-h-screen justify-center font-sans 
        ${completed && plan ? "items-start py-22" : "items-center overflow-hidden"}`}
      >
        <HeaderBg />
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
        <div
          className={`relative w-full max-w-2xl rounded-3xl border border-white/40 bg-[#fffaf2]/95 px-6 py-6 shadow-2xl backdrop-blur-md md:px-10 md:py-8 `}
        >
          <HeaderButtons />

          {plan?.status === "completed" || plan?.status === "cancelled" ? (
            <ClosedPlan />
          ) : completed && plan ? (
            <RisePlan />
          ) : (
            <>
              <header className="flex flex-col items-center text-center">
                <HeaderLogo />
                <HomeHero />
              </header>
              <HomeInput />
              <footer className="mt-6">
                <RiseButton />
              </footer>
            </>
          )}
        </div>
      </main>

      {!plan && <RiseInfoBanner />}
    </>
  );
}
