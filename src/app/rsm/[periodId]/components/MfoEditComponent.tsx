'use client';

import { FaSave } from "react-icons/fa";
import { useMfoEditModalContext } from "../../context/MfoEditModalContext";
import { useEffect, useState } from "react";
import API from "@/lib/axios";

type FormData = { cf_ID: number, cf_count: string, cf_title: string };

type MfoEditComponentType = {
  onSaveSuccess: () => Promise<void> | void
}

export default function MfoEditComponent({ onSaveSuccess }: MfoEditComponentType) {

  const { row } = useMfoEditModalContext()
  const [isSaving, setIsSaving] = useState(false);
  const [cfData, setCfData] = useState<FormData>({ cf_ID: row?.cf_ID ?? 0, cf_count: row?.cf_count ?? '', cf_title: row?.cf_title ?? '' })

  useEffect(() => {
    setCfData({ cf_ID: row?.cf_ID ?? 0, cf_count: row?.cf_count ?? '', cf_title: row?.cf_title ?? '' })
  }, [row])

  async function handleSubmit() {
    setIsSaving(true);
    await API.patch("api/mfo/" + cfData.cf_ID, { cf_count: cfData.cf_count, cf_title: cfData.cf_title });
    if (onSaveSuccess) await onSaveSuccess();
    setIsSaving(false);
    (document.getElementById("mfoEditModal") as HTMLDialogElement).close()
  }

  return (
    <>
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
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => setCfData({ cf_ID: row?.cf_ID ?? 0, cf_count: row?.cf_count ?? '', cf_title: row?.cf_title ?? '' })}>Cancel</button>
            </form>

            <button className="btn btn-primary" onClick={() => handleSubmit()}>
              {isSaving ? <><span className="loading loading-spinner"></span> Saving...</> : <><FaSave /> Save </>}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}