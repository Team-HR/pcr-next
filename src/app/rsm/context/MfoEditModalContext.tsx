'use client';

import React, { createContext, useContext, ReactNode, useState } from "react";

type MfoEditModalType = {
    row: Row | undefined;
    setRow: React.Dispatch<React.SetStateAction<Row | undefined>>;
};

const MfoEditModalContext = createContext<MfoEditModalType | undefined>(undefined);

export const MfoEditModalProvider = ({ children }: { children: ReactNode }) => {

    const [row, setRow] = useState<Row | undefined>(undefined)

    return (
        <MfoEditModalContext.Provider value={{ row, setRow }}>
            {children}
        </MfoEditModalContext.Provider>
    )
}


export const useMfoEditModalContext = () => {
    const ctx = useContext(MfoEditModalContext);
    if (!ctx) throw new Error("MfoEditModalContext must be used inside AppProvider");
    return ctx;
};