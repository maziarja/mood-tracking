"use client";

import { FormEvent, useState } from "react";
import HappyColorIcon from "../_icons/HappyColorIcon";
import NeutralColorIcon from "../_icons/NeutralColorIcon";
import SadColorIcon from "../_icons/SadColorIcon";
import VeryHappyColorIcon from "../_icons/VeryHappyColorIcon";
import VerySadColorIcon from "../_icons/VerySadColorIcon";
import TagMood from "./TagMoodStep2";
import MoodStep1 from "./MoodStep1";
import SleepTime from "./SleepTimeStep4";
import { useLog } from "@/app/contexts/LogContext";
import { createNewLog } from "@/app/_actions/createNewLog";
import { useModal } from "@/app/contexts/ModalContext";
import { IoMdInformationCircle } from "react-icons/io";

function LogMoodForm() {
  const numOfSteps = 4;
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const { mood, sleepHours } = useLog();
  const { setIsLogModalOpen } = useModal();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const feelings = formData.getAll("feels").slice(0, 3) as string[];
    const createdAt = new Date().toISOString();

    const newLogData = {
      mood,
      sleepHours,
      feelings,
      createdAt,
      journalEntry,
    };

    const result = await createNewLog(newLogData);
    if (result && result.error) {
      setError(result.error);
    } else {
      setIsLogModalOpen(false);
    }
  }

  function handleClickStep1(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (step < numOfSteps && mood !== null) {
      setStep((prevStep) => prevStep + 1);
      setError("");
    }
    if (mood === null) setError("Please select a mood before continuing.");
  }
  function handleClickStep3(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (step < numOfSteps && journalEntry !== "") {
      setStep((prevStep) => prevStep + 1);
      setError("");
    }
    if (journalEntry === "")
      setError("Please write a few words about your day before continuing.");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <p className="text-preset-3 md:text-preset-2 text-neutral-900">
        Log your mood
      </p>
      <div className="flex w-full gap-4">
        {Array.from({ length: numOfSteps }, (_, i: number) => i + 1).map(
          (i) => (
            <div
              key={i}
              className={`h-1.5 w-full rounded-full ${step >= i ? "bg-blue-600" : "bg-blue-200"} `}
            ></div>
          ),
        )}
      </div>

      <div className={`${step === 1 ? "flex" : "hidden"} flex flex-col`}>
        <p className="text-preset-3-m md:text-preset-3 mb-6 text-neutral-900">
          How was your mood today?
        </p>
        <div className="mb-6 flex flex-col gap-3">
          <MoodStep1 title="Very Happy" mood={2}>
            <VeryHappyColorIcon size="38" />
          </MoodStep1>
          <MoodStep1 title="Happy" mood={1}>
            <HappyColorIcon size="38" />
          </MoodStep1>
          <MoodStep1 title="Neutral" mood={0}>
            <NeutralColorIcon size="38" />
          </MoodStep1>
          <MoodStep1 title="Sad" mood={-1}>
            <SadColorIcon size="38" />
          </MoodStep1>
          <MoodStep1 title="Very Sad" mood={-2}>
            <VerySadColorIcon size="38" />
          </MoodStep1>
        </div>

        {error && (
          <p className="mb-4 flex items-center gap-2">
            <IoMdInformationCircle className="text-red-700" />
            <span className="text-preset-7 text-red-700">{error}</span>
          </p>
        )}
        <button
          onClick={handleClickStep1}
          className="text-preset-4 text-neutral-0 w-full cursor-pointer rounded-[10px] bg-blue-600 px-8 py-3 focus:outline-2 focus:outline-offset-4 focus:outline-blue-600"
        >
          Continue
        </button>
      </div>

      <div className={`${step === 2 ? "flex" : "hidden"} flex flex-col gap-6`}>
        <div>
          <p className="text-preset-3-m md:text-preset-3 mb-1.5 text-neutral-900">
            How did you feel?
          </p>
          <span className="text-preset-6 text-neutral-600">
            Select up to three tags:
          </span>
        </div>
        <div className="flex flex-wrap gap-4">
          <TagMood name={"Joyful"} />
          <TagMood name={"Down"} />
          <TagMood name={"Anxious"} />
          <TagMood name={"Calm"} />
          <TagMood name={"Excited"} />
          <TagMood name={"Frustrated"} />
          <TagMood name={"Lonely"} />
          <TagMood name={"Grateful"} />
          <TagMood name={"Overwhelmed"} />
          <TagMood name={"Motivated"} />
          <TagMood name={"Irritable"} />
          <TagMood name={"Peaceful"} />
          <TagMood name={"Tired"} />
          <TagMood name={"Hopeful"} />
          <TagMood name={"Confident"} />
          <TagMood name={"Stressed"} />
          <TagMood name={"Content"} />
          <TagMood name={"Disappointed"} />
          <TagMood name={"Optimistic"} />
          <TagMood name={"Restless"} />
        </div>

        <button
          onClick={handleClickStep1}
          className="text-preset-4 text-neutral-0 w-full cursor-pointer rounded-[10px] bg-blue-600 px-8 py-3 focus:outline-2 focus:outline-offset-4 focus:outline-blue-600"
        >
          Continue
        </button>
      </div>

      <div className={`${step === 3 ? "flex" : "hidden"} flex flex-col gap-6`}>
        <p className="text-preset-3-m md:text-preset-3 text-neutral-900">
          Write about your day...
        </p>
        <div className="flex flex-col gap-2">
          <textarea
            className="bg-neutral-0 placeholder:text-preset-6-i text-preset-6-i h-37.5 w-full rounded-[10px] px-4 py-3 text-neutral-600 ring-1 ring-neutral-300 placeholder:text-neutral-600"
            placeholder="Today, I felt..."
            name="journalEntry"
            value={journalEntry.slice(0, 149)}
            onChange={(e) => setJournalEntry(e.target.value)}
          />
          <span className="ml-auto">
            {journalEntry.length}/{150}
          </span>
          {error && (
            <p className="mb-4 flex items-center gap-2">
              <IoMdInformationCircle className="text-red-700" />
              <span className="text-preset-7 text-red-700">{error}</span>
            </p>
          )}
        </div>

        <button
          onClick={handleClickStep3}
          className="text-preset-4 text-neutral-0 w-full cursor-pointer rounded-[10px] bg-blue-600 px-8 py-3 focus:outline-2 focus:outline-offset-4 focus:outline-blue-600"
        >
          Continue
        </button>
      </div>

      <div className={`${step === 4 ? "flex" : "hidden"} flex flex-col`}>
        <p className="text-preset-3-m md:text-preset-3 mb-6 text-neutral-900">
          How many hours did you sleep last night?
        </p>
        <div className="mb-6 flex flex-col gap-3">
          <SleepTime hours="9+" />
          <SleepTime hours="7-8" />
          <SleepTime hours="5-6" />
          <SleepTime hours="3-4" />
          <SleepTime hours="0-2" />
          <p className="text-red-700">{error}</p>
        </div>
        <button className="text-preset-4 text-neutral-0 w-full cursor-pointer rounded-[10px] bg-blue-600 px-8 py-3 focus:outline-2 focus:outline-offset-4 focus:outline-blue-600">
          Submit
        </button>
      </div>
    </form>
  );
}

export default LogMoodForm;
