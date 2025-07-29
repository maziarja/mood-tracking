"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";

type ModalProviderProps = {
  children: ReactNode;
};

type ModalContextType = {
  isSettingModalOpen: boolean;
  setIsSettingModalOpen: Dispatch<SetStateAction<boolean>>;
  isLogModalOpen: boolean;
  setIsLogModalOpen: Dispatch<SetStateAction<boolean>>;
  isDeleteAccountModalOpen: boolean;
  setIsDeleteAccountModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function ModalProvider({ children }: ModalProviderProps) {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);
  return (
    <ModalContext.Provider
      value={{
        isSettingModalOpen,
        setIsSettingModalOpen,
        isLogModalOpen,
        setIsLogModalOpen,
        isDeleteAccountModalOpen,
        setIsDeleteAccountModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

const useModal = function () {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("Modal context was used outside of modal provider");
  return context;
};

export { ModalProvider, useModal };
