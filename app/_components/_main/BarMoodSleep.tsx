"use client";
import { MoodType } from "@/models/moodEntries";
import { format } from "date-fns";
import VerySadWhiteIcon from "../_icons/VerySadWhiteIcon";
import SadWhiteIcon from "../_icons/SadWhiteIcon";
import NeutralWhiteIcon from "../_icons/NeutralWhiteIcon";
import HappyWhiteIcon from "../_icons/HappyWhiteIcon";
import VeryHappyWhiteIcon from "../_icons/VeryHappyWhiteIcon";
import { useState } from "react";
import BarPopover from "./BarPopover";

type BarMoodSleepProps = {
  day?: string;
  moodEntry?: MoodType;
  index: number;
};

function BarMoodSleep({ day, moodEntry, index }: BarMoodSleepProps) {
  const [showBarPopover, setShowPopover] = useState(false);

  const dayEntry = moodEntry && format(moodEntry?.createdAt, "MMMM dd");
  const sleepHours = moodEntry?.sleepHours;

  function showFeeling() {
    if (moodEntry?.mood === -2)
      return { emoji: <VerySadWhiteIcon />, color: "#ff9b99" };
    if (moodEntry?.mood === -1)
      return { emoji: <SadWhiteIcon />, color: " #b8b1ff" };
    if (moodEntry?.mood === 0)
      return { emoji: <NeutralWhiteIcon />, color: "#89caff" };
    if (moodEntry?.mood === 1)
      return { emoji: <HappyWhiteIcon />, color: "#89e780" };
    if (moodEntry?.mood === 2)
      return { emoji: <VeryHappyWhiteIcon />, color: "#ffc97c" };
  }

  return (
    <>
      <div className="flex h-[307px] min-w-10 flex-col gap-3">
        {sleepHours && (
          <div
            onMouseEnter={() => setShowPopover(true)}
            onMouseLeave={() => setShowPopover(false)}
            style={{
              height: sleepHours === 1.5 ? sleepHours * 45 : sleepHours * 28,
              backgroundColor: showFeeling()?.color,
            }}
            className="relative mt-auto flex w-10 cursor-pointer justify-center rounded-full"
          >
            {showFeeling()?.emoji}

            {showBarPopover && (
              <BarPopover index={index} moodEntry={moodEntry} />
            )}
          </div>
        )}
        <div
          className={`flex ${!sleepHours ? "mt-auto" : ""} flex-col items-center gap-1.5`}
        >
          <p className="text-preset-9 text-neutral-900">
            {dayEntry ? dayEntry.split(" ").at(0) : day?.split(" ").at(0)}
          </p>
          <p className="text-preset-8 text-neutral-900">
            {" "}
            {dayEntry ? dayEntry.split(" ").at(1) : day?.split(" ").at(1)}
          </p>
        </div>
      </div>
    </>
  );
}

export default BarMoodSleep;
