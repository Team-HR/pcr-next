"use client";

import API from "@/lib/axios";
import { routes } from "@/types/routes";
import { use, useEffect, useState } from "react";

type Params = {
    periodId: string; // Next.js always passes route params as strings
};


export default function RsmEditorPage({ params }: { params: Promise<Params> }) {
    const { periodId } = use(params);

    const [form, setForm] = useState({
        period: 'January - June 2025',
        type: 'ipcr'
    });

    const [ratee, setRatee] = useState({
        id: 9,
        name: 'FRANZ JOSHUA A. VALENCIA, JR.',
        position: 'ADMINISTRATIVE OFFICER IV',
        department: 'HUMAN RESOURCE MANAGEMENT AND DEVELOPMENT OFFICE'
    });


    const [coreFunctions, setCoreFunctions] = useState<CoreFunction[] | []>([]);

    useEffect(() => {
        async function getCoreFunctions() {
            // const res = await API.get(routes.coreFunction.show(periodId, 32))
            // console.log(res.data);
            // setCoreFunctions(res.data)
            const res = await API.get('/api/pcr/' + periodId + '/core')
            console.log(res.data);
            setCoreFunctions(res.data)
        }

        async function getStratFunction() {
            // const res = await API.get(routes.stratFunction.show(periodId, 9))
            // console.log('getStratFunction: ', res.data);
        }

        getStratFunction()
        getCoreFunctions()

    }, [periodId])


    return (
        <div className="bg-white">
            <pre>
                {JSON.stringify(coreFunctions, null, 2)}
            </pre>
        </div>
    )


    return (
        <div className="w-full">
            {/* form start */}
            <div className=" bg-white h-screen m-5 text-sm no-margin">
                <div className="text-center text-lg font-medium">
                    {
                        form.type == 'ipcr' ? 'INDIVIDUAL PERFORMANCE COMMITMENT AND REVIEW (IPCR)' :
                            form.type == 'spcr' ? 'SECTION PERFORMANCE COMMITMENT AND REVIEW (SPCR)' :
                                form.type == 'dpcr' ? 'DEPARTMENT PERFORMANCE COMMITMENT AND REVIEW (DPCR)' :
                                    form.type == 'division' ? 'DIVISION PERFORMANCE COMMITMENT AND REVIEW (DIVISION PCR)' :
                                        <>{'< SET PCR FORMTYPE >'}</>
                    }
                </div>
                <div className="mt-5 m-5">
                    I, {ratee && ratee.name ? <span className="font-medium">{ratee.name}</span> : '__________________________________________'} , {ratee.position ? ratee.position : '_____________________________________________'} of the {ratee.department ? <span className="font-medium">{ratee.department}</span> : '_____________________________________________'} commit to deliver and agree to be rated on the attainment of the following targets in accordance with the indicated measures for the period {form.period ? form.period : '______________________________________'}.
                </div>
                <div className="float-right text-center mt-2 mr-10">
                    <u><b>{ratee.name}</b></u>
                    <div>Ratee</div>
                </div>

                <div>
                    <table className="table-auto mt-20 border-collapse border border-gray-400 w-full">
                        <tbody>
                            <tr className="bg-green-200">
                                <td className="border border-gray-400 p-2">
                                    <div className="text-xs">Reviewed by:</div>
                                    <div className="mt-10 text-center">
                                        <u>VERONICA GRACE P. MIRAFLOR</u>
                                        <div className="text-xs">Immediate Supervisor</div>
                                    </div>
                                </td>
                                <td className="border border-gray-400 p-2">
                                    <div className="text-xs">Noted by:</div>
                                    <div className="mt-10 text-center">
                                        <u>VERONICA GRACE P. MIRAFLOR</u>
                                        <div className="text-xs">Department Head</div>
                                    </div>
                                </td>
                                <td className="border border-gray-400 p-2">
                                    <div className="text-xs">Approved by:</div>
                                    <div className="mt-10 text-center">
                                        <u>JOHN T. RAYMOND, JR.</u>
                                        <div className="text-xs">Head of Agency</div>
                                    </div>
                                </td>
                                <td className="border border-gray-400 p-2 w-40">
                                    <div className="text-xs">Date:</div>
                                    <div className="mt-10 text-center">
                                        <u>08/18/25</u>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <table className="table-auto border-collapse border border-gray-400 w-full">
                        <thead>
                            <tr className="bg-blue-100 h-10">
                                <th className="border border-gray-400" rowSpan={2}>MFO/PAP</th>
                                <th className="border border-gray-400" rowSpan={2}>Success Indicator</th>
                                <th className="border border-gray-400" rowSpan={2}>Actual Accomplishments</th>
                                <th className="border border-gray-400" colSpan={4}>Rating Matrix</th>
                                <th className="border border-gray-400" rowSpan={2}>Remarks</th>
                                <th className="border border-gray-400" rowSpan={2}>FolderIcon</th>
                                <th className="border border-gray-400" rowSpan={2}>Options</th>
                            </tr>
                            <tr className="bg-blue-100 h-10">
                                <th className="border border-gray-400">Q</th>
                                <th className="border border-gray-400">E</th>
                                <th className="border border-gray-400">T</th>
                                <th className="border border-gray-400">A</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* strategic start*/}
                            <tr className="h-10">
                                <td colSpan={10} className="p-2 font-bold bg-amber-100">Strategic Function</td>
                            </tr>
                            <tr>
                                <td colSpan={10} className="border border-gray-400 p-2 text-center">
                                    <button className="btn btn-primary btn-xs">Add Accomplishment</button>
                                    <button className="btn btn-xs ml-2">Not Applicable</button>
                                </td>
                            </tr>
                            {/* <tr>
                                <td className="border border-gray-400 p-2">n/a</td>
                                <td className="border border-gray-400 p-2">n/a</td>
                                <td className="border border-gray-400 p-2">n/a</td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2">n/a</td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2 text-center">
                                    <button className="btn btn-primary mr-2 btn-xs">Edit</button>
                                    <button className="btn btn-xs">Remove</button>
                                </td>
                            </tr> */}
                            {/* strategic end*/}
                            {/* core functions start */}
                            <tr className="h-10">
                                <td colSpan={10} className="p-2 font-bold bg-amber-100">Core Functions (<span className="text-blue-600">80%</span>)</td>
                            </tr>

                            {/* <tr>
                                <td className="border border-gray-400 p-2">n/a</td>
                                <td className="border border-gray-400 p-2">n/a</td>
                                <td className="border border-gray-400 p-2">n/a</td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2">n/a</td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2"></td>
                            </tr> */}

                            {
                                coreFunctions ? coreFunctions.map((coreFunc) => {
                                    return <tr key={coreFunc.id}>
                                        <td className="border border-gray-400 p-2">{coreFunc.order} {coreFunc.title}</td>
                                        <td className="border border-gray-400 p-2">n/a</td>
                                        <td className="border border-gray-400 p-2">n/a</td>
                                        <td className="border border-gray-400 p-2"></td>
                                        <td className="border border-gray-400 p-2"></td>
                                        <td className="border border-gray-400 p-2"></td>
                                        <td className="border border-gray-400 p-2"></td>
                                        <td className="border border-gray-400 p-2">n/a</td>
                                        <td className="border border-gray-400 p-2"></td>
                                        <td className="border border-gray-400 p-2"></td>
                                    </tr>
                                }) : ''
                            }

                            {/* core functions end */}
                            {/* support functions start */}
                            <tr className="h-10">
                                <td colSpan={10} className="p-2 font-bold bg-amber-100">Support Functions</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">n/a</td>
                                <td className="border border-gray-400 p-2">n/a</td>
                                <td className="border border-gray-400 p-2">n/a</td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2">n/a</td>
                                <td className="border border-gray-400 p-2"></td>
                                <td className="border border-gray-400 p-2"></td>
                            </tr>
                            {/* support functions end */}
                        </tbody>
                    </table>
                </div>

                <div>
                    <table className="no-break table-auto border-collapse border border-gray-400 w-full">
                        <tbody>
                            <tr className="bg-amber-100">
                                <td className="border border-gray-400 p-2" style={{ fontSize: 9 }} colSpan={2}>SUMMARY OF RATING</td>
                                <td className="border border-gray-400 p-2" style={{ fontSize: 9 }}>TOTAL</td>
                                <td className="border border-gray-400 p-2" style={{ fontSize: 9 }}>FINAL NUMERICAL RATING</td>
                                <td className="border border-gray-400 p-2" style={{ fontSize: 9 }}>FINAL ADJECTIVAL RATING</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">Strategic Objectives</td>
                                <td className="border border-gray-400 p-2">Total Weight Allocation: N/A</td>
                                <td className="border border-gray-400 p-2 font-bold">N/A</td>
                                <td rowSpan={3} className="text-center font-bold border border-gray-400 p-2">3.89</td>
                                <td rowSpan={3} className="text-center font-bold border border-gray-400 p-2">Very Satisfactory</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">Core Functions</td>
                                <td className="border border-gray-400 p-2">Total Weight Allocation: 80%</td>
                                <td className="border border-gray-400 p-2 font-bold">3.1</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">Support Functions</td>
                                <td className="border border-gray-400 p-2">Total Weight Allocation: 20%</td>
                                <td className="border border-gray-400 p-2 font-bold">0.79</td>
                            </tr>
                            <tr>
                                <td colSpan={5}>
                                    <div className="pl-2 pt-2 font-medium">Comments and Recommendation For Development Purpose :</div>

                                    <div className="p-2 ml-5">
                                        test
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className="no-break table-auto border-collapse border border-gray-400 w-full">
                        <tbody>
                            <tr className="bg-green-200">
                                <td className="border border-gray-400 min-w-60" style={{ fontSize: 10 }}>
                                    Discussed: Date:
                                </td>
                                <td className="border border-gray-400 p-2 min-w-50" style={{ fontSize: 10 }}>
                                    Assessed by: Date:
                                </td>
                                <td>

                                </td>
                                <td className="border border-gray-400 p-2" style={{ fontSize: 10 }}>
                                    Reviewed: Date:
                                </td>
                                <td className="border border-gray-400 p-2 min-w-50" style={{ fontSize: 10 }}>
                                    Final Rating by:
                                </td>
                                <td className="border border-gray-400 p-2 min-w-30" style={{ fontSize: 10 }}>
                                    Date:
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 text-center align-bottom font-medium">
                                    {ratee.name}
                                </td>
                                <td className="border border-gray-400">
                                    <div className="text-center" style={{ fontSize: 10 }}>I certified that I discussed my assessment of the performance with the employee:</div>

                                    <div className="text-center mt-10 font-medium">VERONICA GRACE P. MIRAFLOR</div>
                                </td>
                                <td className="border border-gray-400">
                                    <div className="text-center" style={{ fontSize: 10 }}>I certified that I discussed with the employee how they are rated:</div>

                                    <div className="text-center mt-10 font-medium">VERONICA GRACE P. MIRAFLOR</div>
                                </td>
                                <td className="border border-gray-400 text-center align-bottom" style={{ fontSize: 10 }}>
                                    (all PMT member will sign)
                                </td>
                                <td className="border border-gray-400">
                                    <div className="text-center mt-10 font-medium"> JOHN T. RAYMOND, JR.</div>
                                </td>
                                <td className="border border-gray-400">

                                </td>
                            </tr>
                            <tr>
                                <td className="text-center border border-gray-400" style={{ fontSize: 10 }}>
                                    Ratee
                                </td>
                                <td className="text-center border border-gray-400" style={{ fontSize: 10 }}>
                                    Supervisor
                                </td>
                                <td className="text-center border border-gray-400" style={{ fontSize: 10 }}>
                                    Department Head
                                </td>
                                <td></td>
                                <td className="text-center border border-gray-400" style={{ fontSize: 10 }}>
                                    Head of Agency
                                </td>
                                <td className="border border-gray-400"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
            {/* form end */}
        </div >
    );
}
