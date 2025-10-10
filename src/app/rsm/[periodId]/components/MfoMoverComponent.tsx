'use client';

import { FaSave } from "react-icons/fa";
import { useMfoEditModalContext } from "../../context/MfoEditModalContext";
import { useEffect, useState } from "react";
import API from "@/lib/axios";

type FormData = { cf_ID: number, cf_count: string, cf_title: string };

type MfoEditComponentType = {
  onSaveSuccess: () => Promise<void> | void
}

export default function MfoMoverComponent({ onSaveSuccess }: MfoEditComponentType) {

  const { row } = useMfoEditModalContext()
  const [isSaving, setIsSaving] = useState(false);
  const [mfos, setMfos] = useState<Mfo[] | undefined>([]);

  // cf_ID
  // parent_id
  // period_id

  useEffect(() => {
    async function getMfos() {
      const response = await API.post("api/getRsmMfos", {
        cf_ID: row?.cf_ID,
        parent_id: row?.parent_id,
        period_id: row?.mfo_periodId
      })

      setMfos(response.data.rows)
      console.log("mfos: ", response.data.rows);
    }
    getMfos();
  }, [row])

  async function handleSubmit() {
    setIsSaving(true);
    // await API.patch("api/mfo/" + cfData.cf_ID, { cf_count: cfData.cf_count, cf_title: cfData.cf_title });
    // if (onSaveSuccess) await onSaveSuccess();
    setIsSaving(false);
    (document.getElementById("mfoMoverModal") as HTMLDialogElement).close()
  }

  async function moveMfoTo(new_parent_id: number) {
    // cf_ID
    // new_parent_id
    await API.post("api/moveMfoToNewParent", {
      cf_ID: row?.cf_ID,
      new_parent_id: new_parent_id
    });

    if (onSaveSuccess) await onSaveSuccess();
    (document.getElementById("mfoMoverModal") as HTMLDialogElement).close()
  }

  return (
    <>
      <dialog id="mfoMoverModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Move MFO/PAP</h3>
          <div className="flex gap-1 mt-5">
            <table className="table table-zebra table-xs">
              <thead>
                <tr>
                  <th>MFO/PAP</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  mfos ? mfos.map(mfo =>
                    <tr key={mfo.cf_ID} className="hover:bg-blue-200">
                      <td style={{ textIndent: mfo.indent * 30 }}>{mfo.cf_count} {mfo.cf_title}</td>
                      <td>
                        <button className="btn btn-primary btn-xs" disabled={mfo.isDisabled} onClick={() => moveMfoTo(mfo.cf_ID)}>Move here</button>
                      </td>
                    </tr>
                  ) : ''
                }
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            {/* <button className="btn btn-primary" onClick={() => handleSubmit()}>
              {isSaving ? <><span className="loading loading-spinner"></span> Saving...</> : <><FaSave /> Save </>}
            </button> */}
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