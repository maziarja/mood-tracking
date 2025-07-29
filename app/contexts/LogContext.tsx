"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";

type LogProviderProps = {
  children: ReactNode;
};

type LogContextType = {
  mood: -2 | -1 | 0 | 1 | 2 | null;
  setMood: Dispatch<SetStateAction<-2 | -1 | 0 | 1 | 2 | null>>;
  sleepHours: number;
  setSleepHours: Dispatch<SetStateAction<number>>;
};

const LogContext = createContext<LogContextType | undefined>(undefined);

function LogProvider({ children }: LogProviderProps) {
  const [mood, setMood] = useState<-2 | -1 | 0 | 1 | 2 | null>(null);
  const [sleepHours, setSleepHours] = useState(0);
  return (
    <LogContext.Provider
      value={{
        mood,
        setMood,
        sleepHours,
        setSleepHours,
      }}
    >
      {children}
    </LogContext.Provider>
  );
}

const useLog = function () {
  const context = useContext(LogContext);
  if (context === undefined)
    throw new Error("Log context was used outside of log provider");
  return context;
};

export { LogProvider, useLog };
