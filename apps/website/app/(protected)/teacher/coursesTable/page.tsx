import React from 'react';
import Datatable from '@/libs/ui/components/datatableTeacher/index';
import Greeting from '@/libs/ui/components/greeting';

export default function Index() {
  return (
    <div className="w-full ">
      <Greeting />
      <Datatable />
    </div>
  );
}
