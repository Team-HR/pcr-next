'use client';

import { FaSave } from "react-icons/fa";
import { useMfoEditModalContext } from "../../context/MfoEditModalContext";
import { useEffect, useState } from "react";
import API from "@/lib/axios";

type FormType = {
  parent_id: number,
  cf_ID: number,
  cf_count: string,
  cf_title: string
};

type MfoEditComponentType = {
  onSaveSuccess: () => Promise<void> | void
}

export default function MfoEditComponent({ onSaveSuccess }: MfoEditComponentType) {

  const { row, periodId, editType } = useMfoEditModalContext()
  const [isSaving, setIsSaving] = useState(false);
  const [cfData, setCfData] = useState<FormType>({ parent_id: row?.parent_id ?? 0, cf_ID: row?.cf_ID ?? 0, cf_count: row?.cf_count ?? '', cf_title: row?.cf_title ?? '' })

  useEffect(() => {
    if (editType == 'edit') {
      setCfData({ parent_id: row?.parent_id ?? 0, cf_ID: row?.cf_ID ?? 0, cf_count: row?.cf_count ?? '', cf_title: row?.cf_title ?? '' })
    } else {
      setCfData({ parent_id: 0, cf_ID: 0, cf_count: '', cf_title: '' })
    }
  }, [editType, row])

  async function handleSubmit() {
    setIsSaving(true);
    if (editType == 'edit') {
      await API.patch("api/mfo/" + cfData.cf_ID, { cf_count: cfData.cf_count, cf_title: cfData.cf_title });
    } else if (editType == 'sub') {
      await API.post("api/mfo/sub", {
        period_id: row?.mfo_periodId,
        parent_id: row?.cf_ID,
        cf_count: cfData.cf_count,
        cf_title: cfData.cf_title
      });
    } else if (editType == 'new') {
      await API.post("api/mfo", {
        newMfo: {
          period_id: periodId,
          cf_count: cfData.cf_count,
          cf_title: cfData.cf_title
        }
      });
    }

    if (onSaveSuccess) await onSaveSuccess();
    setIsSaving(false);
    (document.getElementById("mfoEditModal") as HTMLDialogElement).close()
  }

  return (
    <>
      <dialog id="mfoEditModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{editType == 'new' ? 'Add New' : editType == 'edit' ? 'Rename' : 'Add Sub'} MFO/PAP Title</h3>
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
              <button className="btn" onClick={() => setCfData({ parent_id: row?.parent_id ?? 0, cf_ID: row?.cf_ID ?? 0, cf_count: row?.cf_count ?? '', cf_title: row?.cf_title ?? '' })}>Cancel</button>
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