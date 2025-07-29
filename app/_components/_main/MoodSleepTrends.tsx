import { eachDayOfInterval, subDays, format } from "date-fns";
import SleepIcon from "../_icons/SleepIcon";
import BarMoodSleep from "./BarMoodSleep";
import { MoodType } from "@/models/moodEntries";

type moodEntriesProps = {
  moodEntries: {
    moodEntries: MoodType[];
  } | null;
};

async function MoodSleepTrends({ moodEntries }: moodEntriesProps) {
  const tenLastDay = eachDayOfInterval({
    start: subDays(new Date(Date.now()), 10),
    end: Date.now(),
  });

  const formattedTenLastDay = tenLastDay.map((d) => format(d, "MMMM dd"));

  const sortedMoodEntries = moodEntries?.moodEntries
    .reverse()
    .slice(0, 11)
    ?.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    });

  return (
    <div className="bg-neutral-0 bg w-full space-y-6 rounded-2xl px-4 py-5 ring-1 ring-blue-100 md:px-5 md:py-8 lg:px-8 lg:py-8 xl:min-w-155 xl:py-9">
      <p className="text-preset-3-m text-neutral-900">Mood and sleep trends</p>
      <div className="flex gap-3">
        <div className="flex h-78 flex-col gap-10">
          <div className="relative flex w-17 gap-1">
            <SleepIcon />
            <p className="text-preset-9 text-neutral-600">9+ hours</p>
            {/* <div className="absolute top-1.5 left-22 border-t-1 border-neutral-100"></div> */}
          </div>
          <div className="relative flex w-17 gap-1">
            <SleepIcon />
            <p className="text-preset-9 text-neutral-600">7-8 hours</p>
            {/* <div className="absolute top-1.5 left-22 border-t-1 border-neutral-100"></div> */}
          </div>
          <div className="relative flex w-17 gap-1">
            <SleepIcon />
            <p className="text-preset-9 text-neutral-600">5-6 hours</p>
            {/* <div className="absolute top-1.5 left-22 border-t-1 border-neutral-100"></div> */}
          </div>
          <div className="relative flex w-17 gap-1">
            <SleepIcon />
            <p className="text-preset-9 text-neutral-600">3-4 hours</p>
            {/* <div className="absolute top-1.5 left-22 border-t-1 border-neutral-100"></div> */}
          </div>
          <div className="relative flex w-17 gap-1">
            <SleepIcon />
            <p className="text-preset-9 text-neutral-600">0-2 hours</p>
            {/* <div className="absolute top-1.5 left-22 border-t-1 border-neutral-100"></div> */}
          </div>
        </div>

        <div className="flex w-full items-center gap-3 overflow-x-scroll md:gap-4">
          {!sortedMoodEntries || sortedMoodEntries.length === 0
            ? formattedTenLastDay.map((day, i) => {
                return <BarMoodSleep key={i} day={day} index={i} />;
              })
            : sortedMoodEntries.map((moodEntry, i) => {
                return <BarMoodSleep key={i} moodEntry={moodEntry} index={i} />;
              })}
        </div>
      </div>
    </div>
  );
}

export default MoodSleepTrends;
