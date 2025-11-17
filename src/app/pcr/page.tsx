'use client';

import PeriodSelector from '@/components/PeriodSelector';
import { useRouter } from 'next/navigation';
import { LuFileChartLine } from 'react-icons/lu';

export default function PcrPage() {

  const route = useRouter();

  function handleOnSelect(periodId: number) {
    console.log("/pcr/" + periodId);
    route.replace("/pcr/" + periodId);
  }

  return (
    <div>
      <LuFileChartLine size={100} className='mx-auto mt-20 mb-0' color='teal' />

      <PeriodSelector title='Performance Commitment & Review' description='Input or Edit Performance Commitment and Review Form' onSelect={(periodId) => handleOnSelect(periodId)} />
    </div >
  );
}
