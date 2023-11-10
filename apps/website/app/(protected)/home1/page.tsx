'use client';

import React from 'react';
import DynamicIcon from '@/libs/ui/components/dynamicIcon';
import FileUploader from '@/libs/ui/components/fileUploader';

const merhaba = () => {
  const handleFileUploadFinish = (fileNames: any) => {
    // You can now use the fileNames array in the ParentComponent's logic
  };
  return (
    <div>
      <h1>Merhaba</h1>
      <DynamicIcon name="users" />
      <FileUploader tenant="test" onFinish={handleFileUploadFinish} />
    </div>
  );
};

export default merhaba;
