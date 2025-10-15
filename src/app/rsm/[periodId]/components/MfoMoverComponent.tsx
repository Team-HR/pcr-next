'use client';

import { useMfoEditModalContext } from "../../context/MfoEditModalContext";
import { useEffect, useState } from "react";
import API from "@/lib/axios";

type ComponentType = {
  onSaveSuccess: () => Promise<void> | void
}

export default function MfoMoverComponent({ onSaveSuccess }: ComponentType) {

  const { row } = useMfoEditModalContext()
  const [isLoading, setIsLoading] = useState(false);
  const [mfos, setMfos] = useState<Mfo[] | undefined>([]);

  useEffect(() => {
    async function getMfos() {
      setIsLoading(true)
      const response = await API.post("api/getRsmMfos", {
        cf_ID: row?.cf_ID,
        parent_id: row?.parent_id,
        period_id: row?.mfo_periodId
      })

      setMfos(response.data.rows)
      setIsLoading(false)
    }
    getMfos();
  }, [row])

  async function moveMfoTo(new_parent_id: string | number) {
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
          {
            !isLoading ? <div className="mt-5">

              <button className="btn btn-primary my-5" onClick={() => moveMfoTo('')}>Move to Top Level</button>

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
            </div> : <div className="flex justify-center mt-10">
              <span className="loading loading-ring mr-5"></span> Loading MFOs. Please wait...
            </div>
          }
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