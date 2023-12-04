import React from 'react';
import Statistics from '@/libs/ui/components/statistics';
import Datatable from '@/libs/ui/components/datatable/index';
import Greeting from '@/libs/ui/components/greeting';

export default function Index() {
  return (
    <div className="w-full ">
      <Greeting />
      <Statistics className="mb-4" />
      <Datatable />
    </div>
  );
}
