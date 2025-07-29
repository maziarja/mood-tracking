import { useLog } from "@/app/contexts/LogContext";
import { useState } from "react";

type SleepTimeProps = {
  hours: string;
};

function SleepTime({ hours }: SleepTimeProps) {
  const { setSleepHours, sleepHours } = useLog();
  const [aveHours, setAveHours] = useState<null | number>(null);

  function handleClick() {
    if (hours === "0-2") {
      setSleepHours(1.5);
      setAveHours(1.5);
    }
    if (hours === "3-4") {
      setSleepHours(3.5);
      setAveHours(3.5);
    }
    if (hours === "5-6") {
      setSleepHours(5.5);
      setAveHours(5.5);
    }
    if (hours === "7-8") {
      setSleepHours(7.5);
      setAveHours(7.5);
    }
    if (hours === "9+") {
      setSleepHours(9);
      setAveHours(9);
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`bg-neutral-0 flex items-center gap-3 rounded-[10px] px-4 py-3 ring-2 ${aveHours === sleepHours ? "ring-blue-600" : "ring-blue-100"}`}
    >
      <div
        className={`h-5 w-5 rounded-full ${aveHours === sleepHours ? "border-5" : "border-[1.5px]"} ${aveHours === sleepHours ? "border-blue-600" : "border-blue-200"} `}
      ></div>
      <p className="text-preset-5 text-neutral-900">{hours} hours</p>
    </div>
  );
}

export default SleepTime;
