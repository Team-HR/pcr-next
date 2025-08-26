'use client';

import { useState } from "react";
import API from "@/lib/axios";

type PeriodSelectorProps = {
  title?: string;
  description?: string;
  icon?: string;
  onSelect?: (periodId: number) => void;
}

export default function PeriodSelector({ title = "", description = "", icon = "", onSelect }: PeriodSelectorProps) {
  const years = [2025, 2024, 2023, 2022];
  const [period, setPeriod] = useState('');
  const [year, setYear] = useState('');

  async function getMfoPeriodId() {

    try {
      const response = await API.post('/api/getPeriodId', {
        selectedPeriod: period, selectedYear: year
      });
      const periodId = response.data;
      if (onSelect) {
        onSelect(periodId)
      } else {
        console.log("(onSelect not used) periodId: ", periodId);
      }

    } catch (error) {
      console.log(error);

    }


  }

  return (
    <div>
      <div className='flex justify-center mt-10'>
        <div className='text-3xl'>{title}</div>
      </div>
      <div className='flex justify-center mb-5'>
        <div className='text-lg'>{description}</div>
      </div >
      <div className='flex justify-center'>
        <select className="select select-lg mr-2" defaultValue={period} onChange={e => { setPeriod(e.target.value) }}>
          <option value="" disabled={true}>Select Period</option>
          <option value={'January - June'}>January-June</option>
          <option value={'July - December'}>July-December</option>
        </select>
        <select defaultValue={year} onChange={e => { setYear(e.target.value) }} className="select select-lg mr-2">
          <option value="" disabled={true}>Select Year</option>
          {years.map((_year, index) => (
            <option key={index} value={_year}>{_year}</option>
          ))}
        </select>
        <button className='btn btn-lg' onClick={getMfoPeriodId}> Open</button>
      </div>
    </div>
  );
}
