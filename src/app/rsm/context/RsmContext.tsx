'use client';

import React, { createContext, useContext, ReactNode, useState } from "react";

type RsmContextType = {
    rows: Row[] | undefined;
    setRows: React.Dispatch<React.SetStateAction<Row[] | undefined>>;
    // getRow: (cf_ID: number) => Row | undefined;
};

const RsmContext = createContext<undefined | RsmContextType>(undefined);

export const RsmProvider = ({ children }: { children: ReactNode }) => {

    const [rows, setRows] = useState<Row[] | undefined>(undefined)

    // const getRow = (cf_ID: number) => {
    //     const row = rows?.find(row => row.cf_ID === cf_ID)
    //     return row;
    // }

    return (
        <RsmContext.Provider value={{ rows, setRows }}>
            {children}
        </RsmContext.Provider>
    )
}


export const useRsmContext = () => {
    const ctx = useContext(RsmContext);
    if (!ctx) throw new Error("useRsmContext must be used inside AppProvider");
    return ctx;
};