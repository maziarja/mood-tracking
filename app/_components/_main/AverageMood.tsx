import { MoodType } from "@/models/moodEntries";
import VerySadWhiteIcon from "../_icons/VerySadWhiteIcon";
import SadWhiteIcon from "../_icons/SadWhiteIcon";
import NeutralWhiteIcon from "../_icons/NeutralWhiteIcon";
import HappyWhiteIcon from "../_icons/HappyWhiteIcon";
import VeryHappyWhiteIcon from "../_icons/VeryHappyWhiteIcon";
import { FiArrowRight } from "react-icons/fi";
import { CgArrowTopRight } from "react-icons/cg";
import { CgArrowBottomRight } from "react-icons/cg";

type moodEntriesProps = {
  moodEntries: {
    moodEntries: MoodType[];
  } | null;
};

function AverageMood({ moodEntries }: moodEntriesProps) {
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

  const lastFiveAverageMood =
    lastFiveMoodEntries &&
    lastFiveMoodEntries?.reduce((acc, cur) => {
      return cur.mood + acc;
    }, 0);

  const prevFiveAverageMood =
    prevFiveMoodEntries && prevFiveMoodEntries?.length >= 5
      ? prevFiveMoodEntries?.reduce((acc, cur) => {
          return cur.mood + acc;
        }, 0)
      : 0;

  const isFiveChecking =
    lastFiveMoodEntries &&
    lastFiveMoodEntries?.length >= 5 &&
    lastFiveMoodEntries !== undefined;

  function showAverageMood() {
    if (lastFiveAverageMood !== undefined && lastFiveAverageMood <= -2)
      return {
        emoji: <VerySadWhiteIcon />,
        color: "#ff9b99",
        mood: "Very Sad",
      };
    if (
      lastFiveAverageMood !== undefined &&
      lastFiveAverageMood >= -1 &&
      lastFiveAverageMood < 0
    )
      return { emoji: <SadWhiteIcon />, color: " #b8b1ff", mood: "Sad" };
    if (
      lastFiveAverageMood !== undefined &&
      lastFiveAverageMood >= 0 &&
      lastFiveAverageMood < 1
    )
      return {
        emoji: <NeutralWhiteIcon />,
        color: "#89caff",
        mood: "Neutral",
      };
    if (
      lastFiveAverageMood !== undefined &&
      lastFiveAverageMood >= 1 &&
      lastFiveAverageMood < 2
    )
      return { emoji: <HappyWhiteIcon />, color: "#89e780", mood: "Happy" };
    if (lastFiveAverageMood !== undefined && lastFiveAverageMood >= 2)
      return {
        emoji: <VeryHappyWhiteIcon />,
        color: "#ffc97c",
        mood: "Very Happy",
      };
  }

  function compareLastAndPrevMood() {
    if (
      lastFiveAverageMood !== undefined &&
      lastFiveAverageMood - prevFiveAverageMood === 0
    )
      return {
        icon: <FiArrowRight />,
        result: "Same as the previous 5 check-ins",
      };
    if (
      lastFiveAverageMood !== undefined &&
      lastFiveAverageMood - prevFiveAverageMood > 0
    )
      return {
        icon: <CgArrowTopRight />,
        result: "Increase from the previous 5 check-ins",
      };
    if (
      lastFiveAverageMood !== undefined &&
      lastFiveAverageMood - prevFiveAverageMood < 0
    )
      return {
        icon: <CgArrowBottomRight />,
        result: "Decrease from the previous 5 check-ins",
      };
  }

  return (
    <div className="space-y-4">
      <p className="text-preset-5 text-neutral-900">
        Average Mood{" "}
        <span className="text-preset-7 text-neutral-600">
          (last 5 Check-ins)
        </span>
      </p>
      <div
        style={{
          backgroundColor: !isFiveChecking
            ? "#e0e6fa"
            : showAverageMood()?.color,
        }}
        className={`flex flex-col justify-center space-y-3 rounded-2xl bg-blue-100 px-4 py-10 ${isFiveChecking && "pattern"} `}
      >
        {!isFiveChecking && (
          <>
            <p className="text-preset-4 text-neutral-900">Keep tracking!</p>

            <p className="text-preset-7 text-neutral-900">
              Log 5 check-ins to see your average mood.
            </p>
          </>
        )}
        {isFiveChecking && (
          <>
            <div className="flex items-center gap-3 text-neutral-900">
              <div>{showAverageMood()?.emoji}</div>
              <p className="text-preset-4">{showAverageMood()?.mood}</p>
            </div>

            <div className="flex items-center gap-2 text-neutral-900">
              <div>{compareLastAndPrevMood()?.icon}</div>
              <p className="text-preset-7">
                {compareLastAndPrevMood()?.result}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AverageMood;
