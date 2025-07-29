import { Document, type Model, model, models, Schema } from "mongoose";

export type MoodType = {
  mood: -2 | -1 | 0 | 1 | 2 | null;
  feelings: string[];
  journalEntry: string;
  sleepHours: number;
  createdAt: string;
};

export type MoodEntriesType = {
  _id: string;
  moodEntries: MoodType[];
  userId: string;
  updatedAt?: Date;
  createdAt: Date;
};

const moodEntriesSchema = new Schema(
  {
    moodEntries: [
      {
        mood: Number,
        feelings: [String],
        journalEntry: String,
        sleepHours: Number,
        createdAt: {
          type: String,
          required: [true, "createAt is required"],
        },
      },
    ],
    userId: String,
  },
  {
    timestamps: true,
    collection: "moodEntries",
  },
);

const MoodEntries: Model<MoodEntriesType & Document> =
  models.MoodEntries ||
  model<MoodEntriesType & Document>("MoodEntries", moodEntriesSchema);

export default MoodEntries;
