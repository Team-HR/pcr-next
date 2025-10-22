'use client';

import { useState } from "react";
import { useMfoEditModalContext } from "../../context/MfoEditModalContext";
import API from "@/lib/axios";

type ComponentType = {
  onDeleteSuccess: () => Promise<void> | void
}

export default function MfoDeleteComponent({ onDeleteSuccess }: ComponentType) {

  const [deleting, setDeleting] = useState(false)
  const { deleteId } = useMfoEditModalContext()

  async function handleSubmit() {
    setDeleting(true)
    await API.delete("/api/mfo/" + deleteId)
    if (onDeleteSuccess) await onDeleteSuccess();
    (document.getElementById("MfoDeleteModal") as HTMLDialogElement)?.close()
    setDeleting(false)
  }

  return (
    <>
      <dialog id="MfoDeleteModal" className="modal">
        <div className="modal-box mt-10 bg-gray-100">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <div className="mt-5">

            <h3>Warning! Confirm delete MFO.</h3>

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