'use client';

import PeriodSelector from '@/components/PeriodSelector';
import { useRouter } from 'next/navigation';
import { FaBalanceScale } from 'react-icons/fa';

export default function RsmPage() {
  const route = useRouter();

  function handleOnSelect(periodId: number) {
    console.log("/rsm/" + periodId);
    route.replace("/rsm/" + periodId);
  }

  return (
    <div>
      <FaBalanceScale size={100} className='mx-auto mt-20 mb-0' color='teal'/>
      <PeriodSelector title='Rating Scale Matrix' description='Edit Rating Scale Matrix' onSelect={handleOnSelect} />
    </div >
  );
}
