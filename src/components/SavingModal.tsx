'use client';

export default function SavingModal() {

  return (
    <dialog id="saving_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Saving changes...</h3>
        <p className="py-4">Please wait while changes are being updated.</p>
      </div>
    </dialog>
  );
}
