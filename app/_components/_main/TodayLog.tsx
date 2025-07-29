import connectDB from "@/config/database";
import { MoodEntriesType } from "@/models/moodEntries";
import MoodQuotes from "@/models/quotes";
import { isSameDay } from "date-fns";
import VerySadColorIcon from "../_icons/VerySadColorIcon";
import SadColorIcon from "../_icons/SadColorIcon";
import NeutralColorIcon from "../_icons/NeutralColorIcon";
import HappyColorIcon from "../_icons/HappyColorIcon";
import VeryHappyColorIcon from "../_icons/VeryHappyColorIcon";
import { FaQuoteLeft } from "react-icons/fa";
import SleepIcon from "../_icons/SleepIcon";
import StarsIcon from "../_icons/StarsIcon";

type TodayLogProps = {
  moodEntries: MoodEntriesType;
};

async function TodayLog({ moodEntries }: TodayLogProps) {
  await connectDB();
  const todayEntry = moodEntries.moodEntries.find((entry) => {
    const dateEntry = new Date(entry.createdAt);
    const today = new Date();
    return isSameDay(dateEntry, today);
  });

  const moodQuotes = await MoodQuotes.findOne();
  const quote =
    todayEntry &&
    todayEntry.mood !== null &&
    moodQuotes?.moodQuotes[todayEntry.mood][Math.trunc(Math.random() * 5)];

  function showFeeling() {
    if (todayEntry?.mood === -2)
      return {
        emoji: <VerySadColorIcon className="md:h-80 md:w-80" />,
        mood: "Very Sad",
      };
    if (todayEntry?.mood === -1)
      return {
        emoji: <SadColorIcon className="md:h-80 md:w-80" />,
        mood: "Sad",
      };
    if (todayEntry?.mood === 0)
      return {
        emoji: <NeutralColorIcon className="md:h-80 md:w-80" />,
        mood: "Neutral",
      };
    if (todayEntry?.mood === 1)
      return {
        emoji: <HappyColorIcon className="md:h-80 md:w-80" />,
        mood: "Happy",
      };
    if (todayEntry?.mood === 2)
      return {
        emoji: <VeryHappyColorIcon className="md:h-80 md:w-80" />,
        mood: "Very Happy",
      };
  }

  if (!todayEntry) return null;
  return (
    <div className="flex flex-col gap-5 xl:grid xl:grid-cols-[1.5fr_1fr]">
      <div className="bg-neutral-0 flex flex-col items-center justify-center gap-8 rounded-2xl px-4 py-8 ring-1 ring-blue-100 md:relative md:overflow-hidden md:px-8">
        <div className="md:mb-18 md:self-start">
          <p className="text-preset-3 text-neutral-600">I&apos;m feeling</p>
          <p className="text-preset-2 text-neutral-900">
            {showFeeling()?.mood}
          </p>
        </div>
        <div className="md:absolute md:right-7 md:-bottom-8">
          {showFeeling()?.emoji}
        </div>
        <div className="md:w-[50%] md:self-start">
          <FaQuoteLeft className="mx-auto mb-4 text-2xl text-blue-600 md:mx-0" />
          <p className="text-preset-6-i text-center text-pretty text-neutral-900 md:text-left">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="bg-neutral-0 flex flex-col gap-4 rounded-2xl p-5 ring-1 ring-blue-100">
          <div className="flex gap-2">
            <SleepIcon size="22" />
            <p className="text-preset-6 text-neutral-600">Sleep</p>
          </div>
          <p className="text-preset-3 text-neutral-900">
            {todayEntry.sleepHours < 9 &&
              todayEntry.sleepHours > 1.5 &&
              `${Math.trunc(todayEntry.sleepHours)}-${Math.ceil(todayEntry.sleepHours)}
            Hours`}
            {todayEntry.sleepHours >= 9 && "9+ hours"}
            {todayEntry.sleepHours === 1.5 && "0-2 hours"}
          </p>
        </div>
        <div className="bg-neutral-0 flex flex-col gap-4 rounded-2xl p-5 ring-1 ring-blue-100">
          <div className="text-preset-6 flex gap-3 text-neutral-600">
            <StarsIcon /> <p>Reflection of the day</p>
          </div>
          <p className="text-preset-6 mb-4 h-20 text-neutral-900">
            {todayEntry.journalEntry}
          </p>
          <div className="flex gap-3">
            {todayEntry.feelings.map((feel, i) => (
              <p className="text-preset-6-i text-neutral-600" key={i}>
                #{feel}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayLog;
