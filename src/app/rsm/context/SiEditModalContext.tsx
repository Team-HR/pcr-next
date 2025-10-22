'use client';

import React, { createContext, useContext, ReactNode, useState } from "react";

type MfoEditModalType = {
    row: Row | undefined
    setRow: React.Dispatch<React.SetStateAction<Row | undefined>>
    editType: string
    setEditType: React.Dispatch<React.SetStateAction<string>>
    deleteId: number
    setDeleteId: React.Dispatch<React.SetStateAction<number>>
};

const SiEditModalContext = createContext<MfoEditModalType | undefined>(undefined);

export const SiEditModalProvider = ({ children }: { children: ReactNode }) => {

    const [row, setRow] = useState<Row | undefined>(undefined)
    const [editType, setEditType] = useState<string>('new') // new | edit | sub
    const [deleteId, setDeleteId] = useState<number>(0)

    return (
        <SiEditModalContext.Provider value={{
            row, setRow, editType, setEditType, deleteId, setDeleteId
        }}>
            {children}
        </SiEditModalContext.Provider>
    )
}


export const useSiEditModalContext = () => {
    const ctx = useContext(SiEditModalContext);
    if (!ctx) throw new Error("SiEditModalContext must be used inside AppProvider");
    return ctx;
};