'use client';

import { useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";

type MultipleSearchSelectProps<T> = {
  label?: string;
  selected: T[];
  options: T[];
  textKey: keyof T;
  valueKey: keyof T;
  onChange?: (selected: T[]) => void;
};

export default function MultipleSearchSelect<T>({
  label = "",
  selected,
  options,
  textKey,
  valueKey,
  onChange,
}: MultipleSearchSelectProps<T>) {
  const [query, setQuery] = useState("");

  // Filter options that match the query and are not already selected
  const filteredOptions = options.filter((opt) => {
    const textValue = String(opt[textKey] ?? "").toLowerCase();
    const queryLower = query.toLowerCase();
    const isNotSelected = !selected.some(
      (s) => String(s[valueKey]) === String(opt[valueKey])
    );

    return textValue.includes(queryLower) && isNotSelected;
  });

  const addOption = (option: T) => {
    onChange?.([...selected, option]);
    setQuery("");
  };

  const removeOption = (val: string) => {
    onChange?.(
      selected.filter((opt) => String(opt[valueKey]) !== val)
    );
  };

  return (
    <div>
      {label && <label className="text-lg font-semibold">{label}</label>}

      {/* Selected tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map((opt) => (
          <span
            key={String(opt[valueKey])}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1"
          >
            {String(opt[textKey])}
            <button
              className="text-red-500 font-bold cursor-pointer"
              onClick={() => removeOption(String(opt[valueKey]))}
            >
              <FaRegTimesCircle />
            </button>
          </span>
        ))}
      </div>

      {/* Search input */}
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Dropdown list */}
      {query && (
        <ul className="border rounded mt-1 max-h-40 overflow-y-auto bg-white shadow">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={String(opt[valueKey])}
                className="px-2 py-1 cursor-pointer hover:bg-blue-100"
                onClick={() => addOption(opt)}
              >
                {String(opt[textKey])}
              </li>
            ))
          ) : (
            <li className="px-2 py-1 text-gray-500">No results</li>
          )}
        </ul>
      )}
    </div>
  );
}
