"use client";

import API from "@/lib/axios";
import { use, useEffect, useState } from "react";
import RsmRowComponent from "./RsmRowComponent";

type Params = {
    periodId: string; // Next.js always passes route params as strings
};

type Personnel = {
    employee_id: number,
    full_name: string,
    actual_accomplishment: string
}

type SuccessIndicator = {
    personnel?: Personnel[]
}


type Row = {
    cf_ID: number,
    cf_count: string,
    cf_title: string,
    has_si: boolean,
    indent: number,
    num_si: number,
    success_indicator: SuccessIndicator
}


export default function RsmEditorPage({ params }: { params: Promise<Params> }) {
    const { periodId } = use(params);
    const [data, setData] = useState<any>(null);
    const [rows, setRows] = useState<Row[]>([]);
    const [loading, setLoading] = useState(true);

    async function getRatingScaleMatrixInfo() {
        try {
            const response = await API.get("/api/rsm/title/" + periodId);
            setData(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            // setLoading(false);
        }
    }

    async function getRsmRows() {
        try {
            const response = await API.get("/api/rsm/" + periodId);
            setRows(response.data.rows);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getRatingScaleMatrixInfo();
        getRsmRows();
    }, [periodId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl">
                Loading Rating Scale Matrix...
            </div>
        );
    }

    return (
        <div>
            <div className="mt-10 text-3xl flex justify-center">
                Rating Scale Matrix
            </div>
            <div className="text-2xl flex justify-center">{data.department?.department}</div>
            <div className="text-xl flex justify-center">{data?.period} {data?.year}</div>

            {/* Example of rendering fetched data */}
            {/* {data && (
                <div className="mt-6 flex justify-center">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )} */}
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="p-4 border">MFO/PAP</th>
                        <th className="p-4 border">SUCCESS INDICATOR</th>
                        <th className="p-4 border">PERFORMANCE MEASURES</th>
                        <th className="p-4 border">Q</th>
                        <th className="p-4 border">E</th>
                        <th className="p-4 border">T</th>
                        <th className="p-4 border">IN-CHARGE</th>
                        <th className="p-4 border">OPTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {rows && rows.length > 0 ? (
                        rows.map((row: any, index: number) => {
                            if (!row.has_si) {  // for mfos with no success indicator
                                return (
                                    <tr key={row.id ?? index}>
                                        <td
                                            className="px-4 border"
                                            colSpan={8}
                                            style={{ textIndent: row.indent ? row.indent * 10 : 0 }}
                                        >
                                            {row.cf_count} {row.cf_title}
                                        </td>
                                    </tr>
                                );
                            } else if (row.has_si && row.num_si === 1) { // for mfos with only one success indicator
                                return (
                                    <tr key={row.id ?? index}>
                                        <RsmRowComponent row={row} index={0} />
                                    </tr>
                                );
                            } else if (row.has_si && row.num_si > 1) { // for mfos with more than 1 success indicator
                                return row.success_indicators.map((si: any, sIndex: number) => {
                                    if (sIndex === 0) {
                                        return (
                                            <tr key={`${row.id ?? index}.${sIndex}`}>
                                                <td
                                                    rowSpan={row.num_si}
                                                    className="px-4 border"
                                                    style={{ textIndent: row.indent ? row.indent * 10 : 0 }}
                                                >
                                                    {row.cf_count} {row.cf_title}
                                                </td>
                                                <td className="px-4 border">{si.mi_succIn}</td>
                                                <td className="px-4 border">
                                                    {
                                                        row.success_indicators[sIndex].perf_measures ? row.success_indicators[sIndex].perf_measures.map((measure: any, mIndex: number) => {
                                                            return <div key={mIndex} className="p-0 m-0">{measure}</div>
                                                        }) : ''
                                                    }
                                                </td>
                                                <td className="px-4 border">
                                                    {
                                                        row.success_indicators[sIndex].has_quality ? row.success_indicators[sIndex].quality.map((item: string, i: number) => {
                                                            if (i < 5 && item) {
                                                                return <div key={i}><b>{5 - i}</b> - {item}</div>
                                                            }
                                                        }) : ''
                                                    }
                                                </td>
                                                <td className="px-4 border">
                                                    {
                                                        row.success_indicators[sIndex].has_efficiency ? row.success_indicators[sIndex].efficiency.map((item: string, i: number) => {
                                                            if (i < 5 && item) {
                                                                return <div key={i}><b>{5 - i}</b> - {item}</div>
                                                            }
                                                        }) : ''
                                                    }
                                                </td>
                                                <td className="px-4 border">
                                                    {
                                                        row.success_indicators[sIndex].has_timeliness ? row.success_indicators[sIndex].timeliness.map((item: string, i: number) => {
                                                            if (i < 5 && item) {
                                                                return <div key={i}><b>{5 - i}</b> - {item}</div>
                                                            }
                                                        }) : ''
                                                    }
                                                </td>
                                                <td className="px-4 border">
                                                    {
                                                        row.success_indicators[sIndex].personnel ? row.success_indicators[sIndex].personnel.map((person: Personnel) => {
                                                            return <div key={person.employee_id}>{person.full_name}</div>
                                                        }) : ''
                                                    }
                                                </td>
                                                <td className="px-4 border"></td>
                                            </tr>
                                        );
                                    } else {
                                        return (
                                            <tr key={`${row.id ?? index}.${sIndex}`}>
                                                <td className="px-4 border">{si.mi_succIn}</td>
                                                <td className="px-4 border">
                                                    {
                                                        row.success_indicators[sIndex].perf_measures ? row.success_indicators[sIndex].perf_measures.map((measure: string, mIndex: number) => {
                                                            return <div key={mIndex} className="p-0 m-0">{measure}</div>
                                                        }) : ''
                                                    }
                                                </td>
                                                <td className="px-4 border"></td>
                                                <td className="px-4 border"></td>
                                                <td className="px-4 border"></td>
                                                <td className="px-4 border"></td>
                                                <td className="px-4 border"></td>
                                            </tr>
                                        );
                                    }
                                });
                            }
                            return null;
                        })
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center py-4 border">
                                No rows found
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    );
}
