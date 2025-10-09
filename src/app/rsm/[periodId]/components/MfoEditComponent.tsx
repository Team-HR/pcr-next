'use client';

import { FaSave } from "react-icons/fa";
import { useMfoEditModalContext } from "../../context/MfoEditModalContext";
import { useEffect, useState } from "react";
import API from "@/lib/axios";

export default function MfoEditComponent() {

  const { row, setRow } = useMfoEditModalContext()

  const [cfData, setCfData] = useState<{ cf_count: string, cf_title: string }>({ cf_count: row?.cf_count ?? '', cf_title: row?.cf_title ?? '' })

  useEffect(() => {
    setCfData({ cf_count: row?.cf_count ?? '', cf_title: row?.cf_title ?? '' })
    // setRow({ ...row!, cf_count: cfData.cf_count, cf_title: cfData.cf_title })
  }, [row])

  const handleSubmit = async () => {
    await API.patch("/api/mfo/" + row?.cf_ID, cfData);
    (document.getElementById('mfoEditModal') as HTMLDialogElement)?.close()
  }

  return (
    <>
      {/* <button className="btn btn-ghost btn-sm" onClick={() => (document.getElementById('mfoEditModal' + cf_ID) as HTMLDialogElement)?.showModal()}>{label}</button> */}
      <dialog id="mfoEditModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit MFO/PAP Title</h3>
          <div className="flex gap-1 mt-5">
            <fieldset className="fieldset w-30">
              <legend className="fieldset-legend">Code:</legend>
              <input type="text" className="input w-30" placeholder="Type here" value={cfData?.cf_count} onChange={(e) => setCfData({ ...cfData, cf_count: e.target.value })} />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">MFO/PAP Title:</legend>
              <input type="text" className="input w-full" placeholder="Type here" value={cfData?.cf_title} onChange={(e) => setCfData({ ...cfData, cf_title: e.target.value })} />
            </fieldset>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={() => handleSubmit()}><FaSave /> Save</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}