import { MoodType } from "@/models/moodEntries";
import { VscTriangleRight } from "react-icons/vsc";
import { VscTriangleLeft } from "react-icons/vsc";

import VerySadColorIcon from "../_icons/VerySadColorIcon";
import SadColorIcon from "../_icons/SadColorIcon";
import NeutralColorIcon from "../_icons/NeutralColorIcon";
import HappyColorIcon from "../_icons/HappyColorIcon";
import VeryHappyColorIcon from "../_icons/VeryHappyColorIcon";

type BarPopoverProps = {
  moodEntry: MoodType;
  index: number;
};

function BarPopover({ moodEntry, index }: BarPopoverProps) {
  function showFeeling() {
    if (moodEntry?.mood === -2)
      return { emoji: <VerySadColorIcon size="16" />, mood: "Very Sad" };
    if (moodEntry?.mood === -1)
      return { emoji: <SadColorIcon size="16" />, mood: "Sad" };
    if (moodEntry?.mood === 0)
      return { emoji: <NeutralColorIcon size="16" />, mood: "Neutral" };
    if (moodEntry?.mood === 1)
      return { emoji: <HappyColorIcon size="16" />, mood: "Happy" };
    if (moodEntry?.mood === 2)
      return { emoji: <VeryHappyColorIcon size="16" />, mood: "Very Happy" };
  }

  return (
    <div
      className={`absolute ${moodEntry.sleepHours === 1.5 && "-top-40"} ${moodEntry.sleepHours === 3.5 && "-top-40"} w-[175px] ${index <= 3 ? "left-14" : "right-14"} bg-neutral-0 z-999 rounded-lg p-3 shadow-xl/10 ring-1 ring-blue-100`}
    >
      {index > 3 ? (
        <VscTriangleRight
          className={`fill-neutral-0 absolute ${moodEntry.sleepHours === 1.5 && "bottom-1"} ${moodEntry.sleepHours === 3.5 && "bottom-1"} -right-4 text-2xl`}
        />
      ) : (
        <VscTriangleLeft
          className={`fill-neutral-0 ${moodEntry.sleepHours === 3.5 && "bottom-1"} ${moodEntry.sleepHours === 1.5 && "bottom-1"} absolute -left-4 text-2xl`}
        />
      )}
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-preset-8 mb-2 text-neutral-600">Mood</p>
          <div className="flex items-center gap-1.5">
            <span>{showFeeling()?.emoji} </span>
            <span className="text-preset-7 text-neutral-900">
              {showFeeling()?.mood}
            </span>
          </div>
        </div>
        <div>
          <p className="text-preset-8 mb-1.5 text-neutral-600">Sleep</p>
          <p className="text-preset-7 text-neutral-900">
            {moodEntry.sleepHours < 9 &&
              moodEntry.sleepHours > 1.5 &&
              `${Math.trunc(moodEntry.sleepHours)}-${Math.ceil(moodEntry.sleepHours)}
            Hours`}
            {moodEntry.sleepHours >= 9 && "9+ hours"}
            {moodEntry.sleepHours === 1.5 && "0-2 hours"}
          </p>
        </div>
        <div>
          <p className="text-preset-8 mb-1.5 text-neutral-600">Reflection</p>
          <p className="text-preset-9 text-neutral-900">
            {moodEntry.journalEntry}
          </p>
        </div>
        <div>
          <p className="text-preset-8 mb-1.5 text-neutral-600">Tags</p>
          <p className="text-preset-9 text-neutral-900">
            {moodEntry.feelings.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BarPopover;
