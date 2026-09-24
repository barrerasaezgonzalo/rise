import { usePlanView } from "@/app/hooks/usePlanView";
import Image from "next/image";

export function Logo() {
  const { handleHomeClick } = usePlanView();
  return (
    <div className="transform hover:scale-105 transition-transform duration-300 mx-auto">
      <button
        className="flex items-center justify-center cursor-pointer my-8"
        onClick={handleHomeClick}
      >
        <Image src="/logo.png" alt={"Rise"} width={200} height={200} />
      </button>
    </div>
  );
}
