'use client';

import React, { createContext, useContext, ReactNode, useState } from "react";

type MfoEditModalType = {
    row: Row | undefined
    setRow: React.Dispatch<React.SetStateAction<Row | undefined>>
    periodId: string | undefined
    setPeriodId: React.Dispatch<React.SetStateAction<string | undefined>>
    editType: string
    setEditType: React.Dispatch<React.SetStateAction<string>>
    deleteId: number
    setDeleteId: React.Dispatch<React.SetStateAction<number>>
    // for success indicator editor
    si: SuccessIndicator | undefined
    setSi: React.Dispatch<React.SetStateAction<SuccessIndicator | undefined>>
};

const MfoEditModalContext = createContext<MfoEditModalType | undefined>(undefined);

export const MfoEditModalProvider = ({ children }: { children: ReactNode }) => {

    const [row, setRow] = useState<Row | undefined>(undefined)
    const [periodId, setPeriodId] = useState<string | undefined>(undefined)
    const [editType, setEditType] = useState<string>('new') // new | edit | sub
    const [deleteId, setDeleteId] = useState<number>(0)

    const [si, setSi] = useState<SuccessIndicator | undefined>()

    return (
        <MfoEditModalContext.Provider value={{
            row, setRow, periodId, setPeriodId, editType, setEditType, deleteId, setDeleteId, si, setSi
        }}>
            {children}
        </MfoEditModalContext.Provider>
    )
}

export const useMfoEditModalContext = () => {
    const ctx = useContext(MfoEditModalContext);
    if (!ctx) throw new Error("MfoEditModalContext must be used inside AppProvider");
    return ctx;
};