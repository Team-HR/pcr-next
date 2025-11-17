'use client';

import PeriodSelector from '@/components/PeriodSelector';
import { IoScaleOutline } from 'react-icons/io5';

export default function IrsmPage() {

  return (
    <div>
      <IoScaleOutline size={100} className='mx-auto mt-20 mb-0' color='teal' />
      <PeriodSelector title='Individual Rating Scale Matrix' description='View Individual Rating Scale Matrix' />
    </div >
  );
}
