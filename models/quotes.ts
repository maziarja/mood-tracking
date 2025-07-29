import { Document, type Model, model, models, Schema } from "mongoose";

export type MoodQuotesType = {
  moodQuotes: Record<string, []>;
};

const quotesSchema = new Schema(
  {
    moodQuotes: {
      "-2": [String],
      "-1": [String],
      "0": [String],
      "1": [String],
      "2": [String],
    },
  },
  {
    collection: "moodQuotes",
  },
);

const MoodQuotes: Model<MoodQuotesType & Document> =
  models.MoodQuotes ||
  model<MoodQuotesType & Document>("MoodQuotes", quotesSchema);

export default MoodQuotes;
