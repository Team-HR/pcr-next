'use client';

import { useRef, useState } from 'react';

type ConfirmationModalProps = {
  id: string;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmAction: () => void | Promise<void>;
  cancelAction?: () => void;
  variant?: 'default' | 'danger' | 'warning';
  closeOnConfirm?: boolean;
  isLoading?: boolean;
};

export default function ConfirmationModal({
  id,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmAction,
  cancelAction,
  variant = 'default',
  closeOnConfirm = true,
  isLoading = false,
}: ConfirmationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [internalLoading, setInternalLoading] = useState(false);

  const handleConfirm = async () => {
    setInternalLoading(true);
    try {
      await confirmAction();
      if (closeOnConfirm) {
        dialogRef.current?.close();
      }
    } finally {
      setInternalLoading(false);
    }
  };

  const isButtonLoading = isLoading || internalLoading;

  const handleCancel = () => {
    if (cancelAction) {
      cancelAction();
    }
    dialogRef.current?.close();
  };

  const handleDialogCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const getConfirmButtonClass = () => {
    switch (variant) {
      case 'danger':
        return 'btn btn-error';
      case 'warning':
        return 'btn btn-warning';
      default:
        return 'btn btn-primary';
    }
  };

  return (
    <dialog
      id={id}
      ref={dialogRef}
      className="modal"
      onCancel={handleDialogCancel}
      onClick={handleBackdropClick}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button
              type="button"
              className="btn"
              onClick={handleCancel}
              disabled={isButtonLoading}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={getConfirmButtonClass()}
              onClick={handleConfirm}
              disabled={isButtonLoading}
            >
              {isButtonLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {confirmText}
                </>
              ) : (
                confirmText
              )}
            </button>
          </form>
        </div>
      </div>
      {/* <form method="dialog" className="modal-backdrop">
        <button onClick={handleCancel}>close</button>
      </form> */}
    </ dialog>
  );
}

