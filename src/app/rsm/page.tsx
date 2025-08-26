'use client';

import PeriodSelector from '@/components/PeriodSelector';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RsmPage() {
  const route = useRouter();

  function handleOnSelect(periodId: number) {
    console.log("/rsm/" + periodId);
    route.replace("/rsm/" + periodId);
  }

  return (
    <div>
      <PeriodSelector title='Rating Scale Matrix' description='Edit Rating Scale Matrix' onSelect={handleOnSelect} />
    </div >
  );
}
