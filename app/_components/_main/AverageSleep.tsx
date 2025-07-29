import { MoodType } from "@/models/moodEntries";
import { CgArrowBottomRight, CgArrowTopRight } from "react-icons/cg";
import { FiArrowRight } from "react-icons/fi";
import SleepIcon from "../_icons/SleepIcon";

type moodEntriesProps = {
  moodEntries: {
    moodEntries: MoodType[];
  } | null;
};
function AverageSleep({ moodEntries }: moodEntriesProps) {
  const lastFiveMoodEntries =
    moodEntries?.moodEntries && moodEntries?.moodEntries.length >= 5
      ? moodEntries?.moodEntries
          .reverse()
          .slice(0, 5)
          ?.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateA - dateB;
          })
      : undefined;

  const prevFiveMoodEntries = moodEntries?.moodEntries
    .reverse()
    .slice(-10, -5)
    ?.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    });

  const isFiveChecking =
    lastFiveMoodEntries &&
    lastFiveMoodEntries?.length >= 5 &&
    lastFiveMoodEntries !== undefined;

  const lastFiveAverageSleep =
    lastFiveMoodEntries &&
    lastFiveMoodEntries?.reduce((acc, cur) => {
      return cur.sleepHours + acc;
    }, 0) / lastFiveMoodEntries.length;

  const prevFiveAverageSleep =
    prevFiveMoodEntries && prevFiveMoodEntries?.length >= 5
      ? prevFiveMoodEntries?.reduce((acc, cur) => {
          return cur.sleepHours + acc;
        }, 0) / prevFiveMoodEntries.length
      : 0;

  function compareLastAndPrevSleep() {
    if (
      lastFiveAverageSleep !== undefined &&
      lastFiveAverageSleep - prevFiveAverageSleep === 0
    )
      return {
        icon: <FiArrowRight />,
        result: "Same as the previous 5 check-ins",
      };
    if (
      lastFiveAverageSleep !== undefined &&
      lastFiveAverageSleep - prevFiveAverageSleep > 0
    )
      return {
        icon: <CgArrowTopRight />,
        result: "Increase from the previous 5 check-ins",
      };
    if (
      lastFiveAverageSleep !== undefined &&
      lastFiveAverageSleep - prevFiveAverageSleep < 0
    )
      return {
        icon: <CgArrowBottomRight />,
        result: "Decrease from the previous 5 check-ins",
      };
  }

  return (
    <div className="space-y-4">
      <p className="text-preset-5 text-neutral-900">
        Average Sleep{" "}
        <span className="text-preset-7 text-neutral-600">
          (last 5 Check-ins)
        </span>
      </p>
      <div
        className={`flex flex-col justify-center space-y-3 rounded-2xl ${!isFiveChecking ? "bg-blue-100" : "bg-blue-600"} px-4 py-10 ${isFiveChecking && "pattern"} `}
      >
        {!isFiveChecking && (
          <>
            <p className="text-preset-4 text-neutral-900">
              Not enough data yet!
            </p>

            <p className="text-preset-7 text-neutral-900">
              Track 5 nights to view average sleep.
            </p>
          </>
        )}
        {isFiveChecking && (
          <>
            <div className="text-neutral-0 flex items-center gap-3">
              <div>
                <SleepIcon size="24" color="fill-neutral-0" />
              </div>
              <p className="text-preset-4">
                {lastFiveAverageSleep && Math.trunc(lastFiveAverageSleep)}-
                {lastFiveAverageSleep && Math.ceil(lastFiveAverageSleep)} Hours
              </p>
            </div>

            <div className="text-neutral-0 flex items-center gap-2">
              <div>{compareLastAndPrevSleep()?.icon}</div>
              <p className="text-preset-7">
                {compareLastAndPrevSleep()?.result}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AverageSleep;
