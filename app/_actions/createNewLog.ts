"use server";

import { auth } from "@/config/auth";
import connectDB from "@/config/database";
import MoodEntries from "@/models/moodEntries";
import { isSameDay, max } from "date-fns";
import { revalidatePath } from "next/cache";

type Data = {
  mood: -2 | -1 | 0 | 1 | 2 | null;
  sleepHours: number;
  feelings: string[];
  createdAt: string;
  journalEntry: string;
};

export async function createNewLog(data: Data) {
  await connectDB();
  const session = await auth();

  if (!session || !session.user)
    throw new Error("You must be logged in firsts");

  const moodEntry = await MoodEntries.findOneAndUpdate({
    userId: session?.user.id,
  });

  if (!data.sleepHours)
    return {
      error: "Please enter sleep hours",
    };

  if (!moodEntry) {
    MoodEntries.create({
      moodEntries: [data],
      userId: session.user.id,
    });
  }

  if (moodEntry) {
    const createdAt = moodEntry.moodEntries.map((entry) => entry.createdAt);
    const lastCreatedAt = max(createdAt);
    const lastCreateAtDate = new Date(lastCreatedAt);
    const today = new Date();
    const isLastCreatedLogToday = isSameDay(lastCreateAtDate, today);

    if (!isLastCreatedLogToday) {
      moodEntry?.moodEntries.push(data);
      await moodEntry?.save();
    }
  }

  revalidatePath("/");
}
