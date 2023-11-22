'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/libs/ui/components/ui/button';

import { startUpload } from '@/libs/ui/services/file_uploader.service';
import UploaderForm from '@/libs/ui/components/fileUploader/form';
import UploadList from '@/libs/ui/components/fileUploader/list';

interface FileUploaderProps {
  tenant: string;
  folder?: string | null;
  multiple?: boolean;
  onFinish?: (results: any[] | null) => void; // Add this line
}

export default function FileUploader({
  tenant,
  folder = null,
  multiple = false,
  onFinish,
}: FileUploaderProps) {
  const [files, setFiles] = useState<any>([]);
  const [progress, setProgress] = useState<number[]>([]);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [uploadFinished, setUploadFinished] = useState(false);
  const [open, setOpen] = useState(false);
  const [uploads, setUploads] = useState<any[]>([]);
  const [canceled, setCanceled] = useState<boolean[]>([]);

  useEffect(() => {
    if (!open) {
      setFiles([]);
      setUploadStarted(false);
      setUploadFinished(false);
      setProgress([]);
    }
  }, [open]);

  useEffect(() => {
    if (files.length > 0) {
      if (progress.every((val) => val === 100)) {
        setUploadFinished(true);
      }
    }
  }, [progress]);

  async function handleSubmitFile(e: any) {
    if (files.length > 0) {
      setUploadStarted(true);
      setProgress(Array(files.length).fill(0));
      setUploads(Array(files.length).fill(null));
      setCanceled(Array(files.length).fill(false));

      startUpload(tenant, folder, files, setUploads, setProgress)
        .then((results) => {
          if (onFinish) {
            onFinish(results ?? null);
          }
        })
        .catch((error) => {
          console.error('An error occurred during the upload:', error);
          if (onFinish) {
            onFinish(null); // Call the onFinish hook with null to indicate an error occurred
          }
        });
    }
  }

  function cancelUpload(idx: number) {
    uploads[idx].abort();

    setUploads((prevUploads) => {
      const updatedUploads = [...prevUploads];
      updatedUploads[idx] = null;
      return updatedUploads;
    });
    setProgress((prevProgress) => {
      const updatedProgress = [...prevProgress];
      updatedProgress[idx] = 100;
      return updatedProgress;
    });
    setCanceled((prevCanceled) => {
      const updatedCanceled = [...prevCanceled];
      updatedCanceled[idx] = true;
      return updatedCanceled;
    });
  }

  function removeFile(idx: any) {
    setFiles((prevState: any) =>
      prevState.filter((file: any, i: any) => i !== idx)
    );
  }

  return (
    <div className="pt-2">
      {!uploadStarted && (
        <UploaderForm multiple={multiple} setFiles={setFiles} />
      )}

      {files.length > 0 && (
        <UploadList
          files={files}
          progress={progress}
          uploadStarted={uploadStarted}
          cancelUpload={cancelUpload}
          removeFile={removeFile}
          canceled={canceled}
        />
      )}

      <div className="text-right pt-2">
        {!uploadFinished && (
          <Button
            variant={uploadStarted ? 'outline' : 'black'}
            disabled={uploadStarted || files.length === 0}
            onClick={handleSubmitFile}
          >
            {uploadStarted ? 'Yükleniyor...' : 'Yükle'}
          </Button>
        )}
      </div>
    </div>
  );
}
