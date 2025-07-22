'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PcrPage() {
  const years = [2025, 2024, 2023, 2022];

  return (
    <div>
      <div className='flex justify-center mt-10'>
        <div className='text-3xl'>Performance Commitment & Review</div>
      </div>
      <div className='flex justify-center mb-5'>
        <div className='text-lg'>Input or Edit Performance Commitment and Review Form</div>
      </div >
      <div className='flex justify-center'>
        <select defaultValue="Large" className="select select-lg mr-2">
          <option disabled={true}>Select Period</option>
          <option>January-June</option>
          <option>July-December</option>
        </select>
        <select defaultValue="Large" className="select select-lg mr-2">
          <option disabled={true}>Select Year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>
        <button className='btn btn-lg'> Open</button>
      </div>
    </div >
  );
}
