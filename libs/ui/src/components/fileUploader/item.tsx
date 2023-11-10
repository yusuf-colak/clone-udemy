import { Progress } from '@/libs/ui/components/ui/progress';
import { cn } from '@/libs/ui/utils';

interface UploadItemProps {
  file: any;
  idx: number;
  progress: number[];
  uploadStarted: boolean;
  cancelUpload: (idx: number) => void;
  removeFile: (idx: number) => void;
  canceled: boolean;
}

export default function UploadItem({
  file,
  idx,
  progress,
  uploadStarted,
  cancelUpload,
  removeFile,
  canceled,
}: UploadItemProps) {
  function formatBytes(a: any, b = 2) {
    if (!+a) return '0 Bytes';
    const c = 0 > b ? 0 : b,
      d = Math.floor(Math.log(a) / Math.log(1024));
    return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
      ['Bytes', 'KB', 'MB', 'GB'][d]
    }`;
  }

  function getFileExtension(fileName: string) {
    return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          {file.type.startsWith('image/') ? (
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50 object-cover"
              src={URL.createObjectURL(file)}
              alt={file.name}
            />
          ) : (
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-50">
              <p className="text-xs text-gray-500">
                {getFileExtension(file.name)}
              </p>
            </div>
          )}
          <div className="w-[200px] min-w-0 flex-auto">
            <p className="truncate text-sm font-semibold leading-6 text-gray-900">
              {file.name}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {formatBytes(file.size)}
            </p>
          </div>
        </div>
        {uploadStarted ? (
          !canceled && progress[idx] === 100 ? (
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-green-500 shadow-sm ring-1 ring-inset ring-green-300">
              Yüklendi
            </span>
          ) : !canceled ? (
            <div className="space-x-2">
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                {progress[idx].toFixed(0)}%
              </span>
              <span
                onClick={() => cancelUpload(idx)}
                className="cursor-pointer rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-red-900 shadow-sm ring-1 ring-inset ring-red-300"
              >
                Yükleniyor...
              </span>
            </div>
          ) : (
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-red-400 shadow-sm ring-1 ring-inset ring-red-300">
              İptal Et
            </span>
          )
        ) : (
          <span
            onClick={() => removeFile(idx)}
            className="cursor-pointer rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Sil
          </span>
        )}
      </div>

      {!canceled && <Progress value={progress[idx]} />}
    </div>
  );
}
