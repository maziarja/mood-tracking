import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import Header from "./_components/_main/Header";
import Heading from "./_components/_main/Heading";
import User, { UserType } from "@/models/user";
import LogTodayMoodButton from "./_components/_main/_buttons/LogTodayMoodButton";
import AverageMood from "./_components/_main/AverageMood";
import AverageSleep from "./_components/_main/AverageSleep";
import MoodSleepTrends from "./_components/_main/MoodSleepTrends";
import MoodEntries, { MoodEntriesType } from "@/models/moodEntries";
import SettingModal from "./_components/_main/SettingModal";
import LogModal from "./_components/_main/LogModal";
import { convertToObject } from "@/config/convertToObject";
import { isSameDay, max } from "date-fns";
import TodayLog from "./_components/_main/TodayLog";
import DeleteAccountModal from "./_components/_main/DeleteAccountModal";

async function Page() {
  const session = await auth();
  if (!session) redirect("/sign-up");

  const [userDoc, moodEntriesDoc] = await Promise.all([
    User.findById(session.user?.id).lean(),
    MoodEntries.findOne({
      userId: session && session && session.user && session?.user.id,
    })
      .select("moodEntries -_id")
      .sort({ createdAt: "desc" })
      .lean(),
  ]);

  if (!userDoc) throw new Error("User not found");
  const { name, image } = convertToObject(userDoc) as UserType;
  const moodEntries = convertToObject(moodEntriesDoc) as MoodEntriesType;

  // checking if the last log is today
  const createdAt =
    moodEntries && moodEntries.moodEntries.map((entry) => entry.createdAt);
  const lastCreatedAt = createdAt && max(createdAt);
  const lastCreateAtDate = lastCreatedAt && new Date(lastCreatedAt);
  const today = new Date();
  const isLastCreatedLogToday =
    lastCreateAtDate && isSameDay(lastCreateAtDate, today);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-10 xl:px-[135px] xl:py-10">
      <div
        className={`relative ${!isLastCreatedLogToday ? "mb-12" : "mb-8"} flex flex-col space-y-12 xl:space-y-15`}
      >
        <Header image={image} />
        <Heading name={name} />
        {!isLastCreatedLogToday && <LogTodayMoodButton />}
        {isLastCreatedLogToday && <TodayLog moodEntries={moodEntries} />}
        <SettingModal image={image} name={name} />
        <DeleteAccountModal />
        <LogModal />
      </div>
      <div className="xl:grid xl:grid-cols-3 xl:justify-center xl:gap-8">
        <div className="bg-neutral-0 mb-8 space-y-6 rounded-2xl px-4 py-5 ring-1 ring-blue-100">
          <AverageMood moodEntries={moodEntries} />
          <AverageSleep moodEntries={moodEntries} />
        </div>
        <div className="xl:col-span-2">
          <MoodSleepTrends moodEntries={moodEntries} />
        </div>
      </div>
    </div>
  );
}

export default Page;
