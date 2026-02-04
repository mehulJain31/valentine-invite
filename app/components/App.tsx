"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Landing from "./Landing";
import Tease from "./Tease";
import TheAsk from "./TheAsk";
import Celebration from "./Celebration";

export default function App() {
  const [step, setStep] = useState(0);
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Ms. Prakruti Kothari";
  const second_name = searchParams.get("name") || "Kothari Ji";

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <AnimatePresence mode="wait">
        {step === 0 && <Landing key="landing" name={name} onNext={() => setStep(1)} />}
        {step === 1 && <Tease key="tease" name={second_name} onYes={() => setStep(2)} />}
        {step === 2 && <TheAsk key="ask" onYes={() => setStep(3)} />}
        {step === 3 && <Celebration key="celebration" />}
      </AnimatePresence>
    </div>
  );
}
