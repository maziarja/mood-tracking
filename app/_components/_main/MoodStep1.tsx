import { useLog } from "@/app/contexts/LogContext";
import { ReactNode, useState } from "react";

type MoodStep1Props = {
  title: string;
  children: ReactNode;
  mood: -2 | -1 | 0 | 1 | 2;
};

function MoodStep1({ title, children, mood }: MoodStep1Props) {
  const { mood: currentMood, setMood } = useLog();

  function handleClick() {
    if (mood === 2) setMood(2);
    if (mood === 1) setMood(1);
    if (mood === 0) setMood(0);
    if (mood === -1) setMood(-1);
    if (mood === -2) setMood(-2);
  }
  return (
    <div
      onClick={handleClick}
      className={`bg-neutral-0 flex cursor-pointer items-center gap-3 rounded-[10px] px-4 py-3 ring-2 ${currentMood === mood ? "ring-blue-600" : "ring-blue-100"} `}
    >
      <div
        className={`h-5 w-5 rounded-full ${currentMood === mood ? "border-5" : "border-[1.5px]"} ${currentMood === mood ? "border-blue-600" : "border-blue-200"} `}
      ></div>
      <p className="text-preset-5 text-neutral-900">{title}</p>
      <div className="ml-auto">{children}</div>
    </div>
  );
}

export default MoodStep1;
