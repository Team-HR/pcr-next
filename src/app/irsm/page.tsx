'use client';

import PeriodSelector from '@/components/PeriodSelector';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function IrsmPage() {

  return (
    <div>
      <PeriodSelector title='Individual Rating Scale Matrix' description='View Individual Rating Scale Matrix' />
    </div >
  );
}
