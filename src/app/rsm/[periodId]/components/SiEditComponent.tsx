'use client';

import { useEffect, useState, useCallback } from "react";
import { useMfoEditModalContext } from "../../context/MfoEditModalContext";
import API from "@/lib/axios";
import MultipleSearchSelect from "@/components/MultipleSearchSelect";
import SavingModal from "@/components/SavingModal";

type ComponentType = {
  employeesOption: EmployeeOption[];
  onSaveSuccess?: () => Promise<void> | void;
};

export default function SiEditComponent({ employeesOption, onSaveSuccess }: ComponentType) {
  const { row, si } = useMfoEditModalContext();

  const [siInput, setSiInput] = useState('');
  const [qualities, setQualities] = useState<string[]>(Array(5).fill(''));
  const [efficiencies, setEfficiencies] = useState<string[]>(Array(5).fill(''));
  const [timelinesses, setTimelinesses] = useState<string[]>(Array(5).fill(''));
  const [selectedPersonnel, setSelectedPersonnel] = useState<EmployeeOption[]>([]);
  const [saving, setSaving] = useState(false);

  // store initial values for cancel restore
  const [initialValues, setInitialValues] = useState({
    siInput: '',
    qualities: Array(5).fill(''),
    efficiencies: Array(5).fill(''),
    timelinesses: Array(5).fill(''),
    selectedPersonnel: [] as EmployeeOption[],
  });

  /** Utility — reset all form values */
  const clearForm = useCallback(() => {
    setSiInput('');
    setQualities(Array(5).fill(''));
    setEfficiencies(Array(5).fill(''));
    setTimelinesses(Array(5).fill(''));
    setSelectedPersonnel([]);
  }, []);

  /** Reset when switching to a new row */
  useEffect(() => {
    if (row) clearForm();
  }, [row, clearForm]);

  /** Populate form when editing an SI */
  useEffect(() => {
    if (!si) return;
    const loaded = {
      siInput: si.mi_succIn ?? '',
      qualities: si.quality?.map(v => v ?? '') ?? Array(5).fill(''),
      efficiencies: si.efficiency?.map(v => v ?? '') ?? Array(5).fill(''),
      timelinesses: si.timeliness?.map(v => v ?? '') ?? Array(5).fill(''),
      selectedPersonnel: si.personnel ?? [],
    };

    // update both live form and stored initial snapshot
    setSiInput(loaded.siInput);
    setQualities(loaded.qualities);
    setEfficiencies(loaded.efficiencies);
    setTimelinesses(loaded.timelinesses);
    setSelectedPersonnel(loaded.selectedPersonnel);
    setInitialValues(loaded);
  }, [si]);

  /** DRY helper for updating rating fields (quality, efficiency, timeliness) */
  const handleArrayChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(prev => prev.map((v, i) => (i === index ? value : v)));
  };

  /** Submit handler */
  const handleSubmit = async () => {
    try {
      setSaving(true);
      (document.getElementById("saving_modal") as HTMLDialogElement)?.showModal();

      await API.post("/api/si/save", {
        mi_id: si?.mi_id ?? null,
        cf_ID: si?.cf_ID ?? row?.cf_ID,
        successIndicator: siInput,
        quality: qualities,
        efficiency: efficiencies,
        timeliness: timelinesses,
        inCharge: selectedPersonnel,
      });

      await onSaveSuccess?.();
      clearForm();
      (document.getElementById("siEditModal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error saving SI:", error);
    } finally {
      setSaving(false);
      (document.getElementById("saving_modal") as HTMLDialogElement)?.close();
    }
  };

  /** Cancel handler — restore to original loaded values */
  const handleCancel = () => {
    setSiInput(initialValues.siInput);
    setQualities(initialValues.qualities);
    setEfficiencies(initialValues.efficiencies);
    setTimelinesses(initialValues.timelinesses);
    setSelectedPersonnel(initialValues.selectedPersonnel);
  };

  /** Helper for rendering repeated sections */
  const renderRatingInputs = (
    label: string,
    values: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => (
    <>
      <div className="text-lg mt-5 font-semibold">{label}:</div>
      {values.map((val, i) => {
        return i < 5 ? <div key={i} className="mb-1">
          <label className="input w-full flex items-center gap-2">
            <b>{5 - i}:</b>
            <input
              type="text"
              value={val ?? ''}
              onChange={(e) => handleArrayChange(i, e.target.value, setter)}
              className="w-full"
            />
          </label>
        </div> : ''
      })}
    </>
  );

  return (
    <>
      <SavingModal />
      <dialog id="siEditModal" className="modal">
        <div className="modal-box mt-10 w-12/12 max-w-5xl bg-gray-100">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCancel}>
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">SUCCESS INDICATOR:</h3>
          <textarea
            value={siInput ?? ''}
            onChange={(e) => setSiInput(e.target.value)}
            rows={3}
            placeholder="Enter success indicator here..."
            className="textarea textarea-lg textarea-accent w-full mt-5"
          />

          {renderRatingInputs("QUALITY", qualities, setQualities)}
          {renderRatingInputs("EFFICIENCY", efficiencies, setEfficiencies)}
          {renderRatingInputs("TIMELINESS", timelinesses, setTimelinesses)}

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

          <div className="mt-5 flex">
            <form method="dialog">
              <button className="btn mr-3" onClick={handleCancel}>Cancel</button>
            </form>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
