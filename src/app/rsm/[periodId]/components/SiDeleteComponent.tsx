'use client';

import { useState } from "react";
import API from "@/lib/axios";

type ComponentType = {
  deleteSiId: number | null
  onDeleteSuccess: () => Promise<void> | void
}

export default function SiDeleteComponent({ deleteSiId, onDeleteSuccess }: ComponentType) {

  const [deleting, setDeleting] = useState(false)


  async function handleSubmit() {
    setDeleting(true)
    await API.delete("/api/si/" + deleteSiId)
    if (onDeleteSuccess) await onDeleteSuccess();
    // 
    (document.getElementById("siDeleteModal") as HTMLDialogElement)?.close()
    setDeleting(false)
  }

  return (
    <>
      <dialog id="siDeleteModal" className="modal">
        <div className="modal-box mt-10 bg-gray-100">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <div className="mt-5">

            <h3>Confirm delete success indicator.</h3>

          </div>
          {/* multiselect component end */}

          <div className="mt-5 flex gap-2">
            <form method="dialog">
              <button className="btn mr-3" >Cancel</button>
            </form>

            <button className="btn btn-primary" onClick={() => handleSubmit()}> {deleting ? 'Deleting...' : 'Delete'} </button>
          </div>

        </div>
      </dialog >
    </>
  );
}