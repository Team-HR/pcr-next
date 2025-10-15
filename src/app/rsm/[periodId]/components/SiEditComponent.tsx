'use client';

import { FaSave } from "react-icons/fa";
import { useMfoEditModalContext } from "../../context/MfoEditModalContext";
import { useEffect, useRef, useState } from "react";
import API from "@/lib/axios";
import MultipleSearchSelect from "@/components/MultipleSearchSelect";
import SavingModal from "@/components/SavingModal";


type ComponentType = {
  employeesOption: EmployeeOption[]
  onSaveSuccess: () => Promise<void> | void
}

export default function SiEditComponent({ employeesOption, onSaveSuccess }: ComponentType) {

  const { row } = useMfoEditModalContext()

  const [siInput, setSiInput] = useState('');
  const [qualities, setQualities] = useState(['', '', '', '', '']);
  const [efficiencies, setEfficiencies] = useState(['', '', '', '', '']);
  const [timelinesses, setTimelinesses] = useState(['', '', '', '', '']);
  const [selectedPersonnel, setSelectedPersonnel] = useState<EmployeeOption[] | []>([])
  const [saving, setSaving] = useState(false);

  function clearForm() {
    setSiInput('')
    setQualities(['', '', '', '', ''])
    setEfficiencies(['', '', '', '', ''])
    setTimelinesses(['', '', '', '', ''])
    setSelectedPersonnel([])
  }


  async function handleSubmit() {

    try {
      const response = await API.post("/api/si/save", {
        mi_id: null,
        cf_ID: row?.cf_ID,
        successIndicator: siInput,
        quality: qualities,
        efficiency: efficiencies,
        timeliness: timelinesses,
        inCharge: selectedPersonnel
      });

      (document.getElementById("saving_modal") as HTMLDialogElement)?.showModal();
      if (onSaveSuccess) await onSaveSuccess();
      (document.getElementById("saving_modal") as HTMLDialogElement)?.close();
      (document.getElementById("siEditModal") as HTMLDialogElement)?.close()
      clearForm()
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <SavingModal />
      <dialog id="siEditModal" className="modal">
        <div className="modal-box mt-10 w-12/12 max-w-5xl bg-gray-100">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">SUCCESS INDICATOR:</h3>
          <textarea value={siInput} onChange={(e) => setSiInput(e.target.value)} rows={3} placeholder="Enter success indicator here..." className="textarea textarea-lg textarea-accent w-full mt-5"></textarea>

          <div className="text-lg mt-5 text font-semibold">QUALITY: </div>
          <>
            {qualities.map((val, i) => (
              <div key={i} className="mb-1">
                <label className="input w-full">
                  <b>{5 - i} :</b>
                  <input type="text" value={val} onChange={(e) => { const newArr = [...qualities]; newArr[i] = e.target.value; setQualities(newArr) }} />
                </label>
              </div>
            ))}
          </>
          <div className="text-lg mt-5 text font-semibold">EFFICIENCY: </div>
          <>
            {efficiencies.map((val, i) => (
              <div key={i} className="mb-1">
                <label className="input w-full">
                  <b>{5 - i} :</b>
                  <input type="text" value={val} onChange={(e) => { const newArr = [...efficiencies]; newArr[i] = e.target.value; setEfficiencies(newArr); }} className="w-full" />
                </label>
              </div>
            ))}
          </>
          <div className="text-lg mt-5 text font-semibold">TIMELINESS: </div>
          <>
            {timelinesses.map((val, i) => (
              <div key={i} className="mb-1">
                <label className="input w-full">
                  <b>{5 - i} :</b>
                  <input type="text" value={val} onChange={(e) => { const newArr = [...timelinesses]; newArr[i] = e.target.value; setTimelinesses(newArr); }} className="w-full" />
                </label>
              </div>
            ))}
          </>

          <div className="mt-5">

            <MultipleSearchSelect<EmployeeOption>
              label="Select Employees"
              selected={selectedPersonnel}
              options={employeesOption}
              textKey="full_name"
              valueKey="employee_id"
              onChange={setSelectedPersonnel}
            />

          </div>
          {/* multiselect component end */}

          <div className="mt-5 flex">

            <form method="dialog">
              <button className="btn mr-3" >Cancel</button>
            </form>

            <button className="btn btn-primary" onClick={() => handleSubmit()}> {saving ? 'Saving...' : 'Save'} </button>

          </div>

        </div>
      </dialog >
    </>
  );
}