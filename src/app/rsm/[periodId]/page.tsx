"use client";

import API from "@/lib/axios";
import { use, useEffect, useRef, useState } from "react";
import RsmRowComponent from "./components/RsmRowComponent";
import MultipleSearchSelect from "@/components/MultipleSearchSelect";
import SavingModal from "@/components/SavingModal";
import MfoDropdownComponent from "./components/MfoDropdownComponent";
import { useRsmContext } from "../context/RsmContext";
import MfoEditComponent from "./components/MfoEditComponent";

type Params = {
    periodId: string; // Next.js always passes route params as strings
};

type Header = {
    department: { department: string }
    period: string
    year: number
}

export default function RsmEditorPage({ params }: { params: Promise<Params> }) {
    const { periodId } = use(params);
    const [data, setData] = useState<Header>();
    // const [rows, setRows] = useState<Row[] | undefined>(undefined) // useRsmContext();
    const { rows, setRows } = useRsmContext();

    const [employeesOption, setEmployeeOption] = useState<EmployeeOption[]>([])
    const [siToEditSelected, setSiToEditSelected] = useState<EmployeeOption[]>([])

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [siToEdit, setSiToEdit] = useState<SuccessIndicator | null>(null)

    // const efficiencyRefs = Array.from({ length: 5 }, () =>
    //     useRef<HTMLInputElement>(null)
    // );
    // const qualityRefs = Array.from({ length: 5 }, () =>
    //     useRef<HTMLInputElement>(null)
    // );
    // const timelinessRefs = Array.from({ length: 5 }, () =>
    //     useRef<HTMLInputElement>(null)
    // );


    // const efficiencyRefs = [0, 1, 2, 3, 4].map(() => useRef<HTMLInputElement>(null));
    const efficiencyRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    // const qualityRefs = [0, 1, 2, 3, 4].map(() => useRef<HTMLInputElement>(null));
    const qualityRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    // const timelinessRefs = [0, 1, 2, 3, 4].map(() => useRef<HTMLInputElement>(null));
    const timelinessRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        async function getRatingScaleMatrixInfo() {
            try {
                const response = await API.get("/api/rsm/title/" + periodId);
                setData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        async function getRsmRows() {
            setLoading(true)
            try {
                const response = await API.get("/api/rsm/" + periodId);
                setRows(response.data.rows);
                console.log('rows:', response.data.rows);

            } catch (error) {
                console.log(error);
            } finally {
                // setLoading(false);
            }
        }

        async function getEmployeesOption() {
            try {
                const response = await API.get("/api/getAllEmployees");
                setEmployeeOption(response.data)
                console.log("getEmployeesOption:", response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getRatingScaleMatrixInfo()
        getRsmRows()
        getEmployeesOption()
    }, [periodId, setRows]);


    useEffect(() => {
        if (siToEdit && textareaRef.current) {
            textareaRef.current.value = siToEdit?.mi_succIn || "";
        }

        qualityRefs.forEach((ref, i) => {
            if (siToEdit && ref?.current) {
                ref.current.value = siToEdit.quality?.[i] ?? "";
            }
        })

        efficiencyRefs.forEach((ref, i) => {
            if (siToEdit && ref?.current) {
                ref.current.value = siToEdit.efficiency?.[i] ?? "";
            }
        })

        timelinessRefs.forEach((ref, i) => {
            if (siToEdit && ref?.current) {
                ref.current.value = siToEdit.timeliness?.[i] ?? "";
            }
        });

    }, [siToEdit, efficiencyRefs, qualityRefs, timelinessRefs]);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl">
                Loading Rating Scale Matrix...
            </div>
        );
    }

    const editSuccessIndicator = (data: SuccessIndicator) => {
        setSiToEdit(data);
        setSiToEditSelected(data.personnel ?? [])
        console.log('siToEdit:', data);
        (document.getElementById('my_modal_3') as HTMLDialogElement).showModal();
    }

    async function submitEdit() {
        setSaving(true);
        (document.getElementById('saving_modal') as HTMLDialogElement).showModal();
        const mi_id = siToEdit?.mi_id;
        const cf_ID = siToEdit?.cf_ID;
        const successIndicator = textareaRef.current?.value;

        const qualityArr = [];
        for (let index = 0; index < qualityRefs.length; index++) {
            qualityArr.push(qualityRefs[index].current?.value)
        }

        const efficiencyArr = [];
        for (let index = 0; index < efficiencyRefs.length; index++) {
            efficiencyArr.push(efficiencyRefs[index].current?.value)
        }

        const timelinessArr = [];
        for (let index = 0; index < timelinessRefs.length; index++) {
            timelinessArr.push(timelinessRefs[index].current?.value)
        }

        try {
            await API.post("/api/si/save", {
                mi_id: mi_id,
                cf_ID: cf_ID,
                successIndicator: successIndicator,
                quality: qualityArr,
                efficiency: efficiencyArr,
                timeliness: timelinessArr,
                inCharge: siToEditSelected
            });

            await reloadRows();

            (document.getElementById('my_modal_3') as HTMLDialogElement).close();
            setSaving(false);
            (document.getElementById('saving_modal') as HTMLDialogElement).close();

        } catch (error) {
            alert(error)
        }

    }


    async function reloadRows() {
        const response = await API.get("/api/rsm/" + periodId);
        setRows(response.data.rows);
    }

    return (
        <div>
            <SavingModal />
            {/* multiselect component start */}
            {/* <div className="mt- flex justify-center">
                Rating Scale Matrix
            </div> */}
            <div className="text-xl flex justify-center">{data?.department?.department}</div>
            <div className="text-lg flex justify-center">{data?.period} {data?.year}</div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 h-screen">
                <table className="table table-pin-rows table-pin-cols">
                    <thead>
                        <tr className="text-center">
                            <th className="text-xs p-1 border-1 border-gray-300 bg-gray-50">MFO/PAP</th>
                            <th className="text-xs p-1 border-1 border-gray-300 bg-gray-50">SUCCESS INDICATOR</th>
                            <th className="text-xs p-1 border-1 border-gray-300 bg-gray-50">PERFORMANCE <br />MEASURES</th>
                            <th className="text-xs p-1 border-1 border-gray-300 bg-gray-50 text-center">QUALITY</th>
                            <th className="text-xs p-1 border-1 border-gray-300 bg-gray-50 text-center">EFFICIENCY</th>
                            <th className="text-xs p-1 border-1 border-gray-300 bg-gray-50 text-center">TIMELINESS</th>
                            <th className="text-xs p-1 border-1 border-gray-300 bg-gray-50">IN-CHARGE</th>
                            <th className="text-xs p-1 border-1 border-gray-300 bg-gray-50">OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows && rows.length > 0 ? (
                            rows.map((row: Row, index: number) => {
                                if (!row.has_si) {  // for mfos with no success indicator
                                    return (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td
                                                className="px-4 border-1 border-gray-300"
                                                colSpan={8}
                                                style={{ textIndent: row.indent ? row.indent * 10 : 0 }}
                                            >
                                                <MfoDropdownComponent row={row} /> {row.cf_count} {row.cf_title}
                                            </td>
                                        </tr>
                                    );
                                } else if (row.has_si && row.num_si === 1) { // for mfos with only one success indicator
                                    return (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <RsmRowComponent row={row} index={0} onEditonSelect={editSuccessIndicator} />
                                        </tr>
                                    );
                                } else if (row.has_si && row.num_si > 1) { // for mfos with more than 1 success indicator
                                    return row.success_indicators.map((si: SuccessIndicator, sIndex: number) => {
                                        if (sIndex === 0) {
                                            return (
                                                <tr key={`${index}.${sIndex}`} className="hover:bg-gray-100">
                                                    <RsmRowComponent row={row} index={sIndex} onEditonSelect={editSuccessIndicator} />
                                                </tr>
                                            );
                                        } else {
                                            return (
                                                <tr key={`${index}.${sIndex}`} className="hover:bg-gray-100">
                                                    <RsmRowComponent row={row} index={sIndex} onEditonSelect={editSuccessIndicator} />
                                                </tr>
                                            );
                                        }
                                    });
                                }
                                return null;
                            })
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-4">
                                    No records found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>


            {/* 
                Edit mfo modal below
            */}

            <MfoEditComponent />

            {/* 
                Edit success indicator modal below
            */}

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box mt-10 w-12/12 max-w-5xl bg-gray-100">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">SUCCESS INDICATOR:</h3>
                    <textarea ref={textareaRef} rows={3} defaultValue="" placeholder="Enter success indicator here..." className="textarea textarea-lg textarea-accent w-full mt-5"></textarea>

                    <div className="text-lg mt-5 text font-semibold">QUALITY: </div>
                    <>
                        {qualityRefs.map((ref, i) => (
                            <div key={i} className="mb-1">
                                <label className="input w-full">
                                    <b>{i + 1} :</b>
                                    <input type="text" id={`qualInput` + i} ref={ref} defaultValue="" />
                                </label>
                            </div>
                        ))}
                    </>
                    <div className="text-lg mt-5 text font-semibold">EFFICIENCY: </div>
                    <>
                        {efficiencyRefs.map((ref, i) => (
                            <div key={i} className="mb-1">
                                <label className="input w-full">
                                    <b>{i + 1} :</b>
                                    <input type="text" id={`effInput` + i} ref={ref} defaultValue="" />
                                </label>
                            </div>
                        ))}
                    </>
                    <div className="text-lg mt-5 text font-semibold">TIMELINESS: </div>
                    <>
                        {timelinessRefs.map((ref, i) => (
                            <div key={i} className="mb-1">
                                <label className="input w-full">
                                    <b>{i + 1} :</b>
                                    <input type="text" id={`timeInput` + i} ref={ref} defaultValue="" className="w-full" />
                                </label>
                            </div>
                        ))}
                    </>

                    {/* selected={siToEdit?.personnel} */}
                    <div className="mt-5">
                        {/* <MultipleSearchSelect 
                            label="ASSIGNED PERSONNEL:" 
                            selectedProp={siToEditSelected} 
                            onChange={setSiToEditSelected} 
                            options={employeesOption} 
                            text="full_name" 
                            value="employee_id" 
                        /> */}


                        <MultipleSearchSelect<EmployeeOption>
                            label="Select Employees"
                            selected={siToEditSelected}
                            options={employeesOption}
                            textKey="full_name"
                            valueKey="employee_id"
                            onChange={setSiToEditSelected}
                        />


                    </div>
                    {/* multiselect component end */}

                    <div className="mt-5 flex">
                        <form method="dialog">
                            <button className="btn mr-3" >Cancel</button>
                        </form>
                        <button className="btn btn-primary" onClick={submitEdit}>{saving ? 'Saving...' : 'Save'} </button>
                    </div>

                </div>
            </dialog >
        </div >
    );
}
