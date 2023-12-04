import { Button } from '@/libs/ui/components/ui/button';
import { getFileS3Url } from '@/s3';
import { Download } from 'lucide-react';
import React from 'react';

const AttachmentDow = ({ attachment }) => {
  const handleDownload = (attachment) => {

    if (attachment.url) {
      getFileS3Url(attachment.url).then((url) => {
        const downloadLink = url;
        const link = document.createElement('a');
        link.href = downloadLink;
        link.target = '_blank';
        link.download = attachment.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };
  return (
    
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleDownload(attachment)}
    >
      <Download />
    </Button>
  );
};

export default AttachmentDow;
