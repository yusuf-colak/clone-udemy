import UploadItem from "@/libs/ui/components/fileUploader/item";

interface UploadListProps {
  files: any;
  progress: number[];
  uploadStarted: boolean;
  cancelUpload: (idx: number) => void;
  removeFile: (idx: number) => void;
  canceled: boolean[];
}

export default function UploadList({files, progress, uploadStarted, cancelUpload, removeFile, canceled}: UploadListProps) {
  return (
    <ul className="divide-y divide-gray-100">
      {files.map((file: any, idx: any) => (
        <li key={idx} className="space-x-2">
          <UploadItem file={file} idx={idx} progress={progress} uploadStarted={uploadStarted} cancelUpload={cancelUpload} removeFile={removeFile} canceled={canceled[idx]} />
        </li>
      ))}
    </ul>
  )
}
