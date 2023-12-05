import { PhotoIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';

interface UploaderFormProps {
  multiple?: boolean;
  setFiles: any;
}

export default function UploaderForm({
  multiple = false,
  setFiles,
}: UploaderFormProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (!multiple) {
      setFiles([e.dataTransfer.files[0]]);
    } else {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prevState: any) => [...prevState, ...newFiles]);
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleChange(e: any) {
    e.preventDefault();
    if (!multiple) {
      setFiles([e.target.files[0]]);
    } else {
      const newFiles = Array.from(e.target.files);
      setFiles((prevState: any) => [...prevState, ...newFiles]);
    }
  }

  return (
    <form
      className={`${
        dragActive ? 'border-gray-900' : 'border-gray-900/25'
      }  flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10`}
      onDragEnter={handleDragEnter}
      onSubmit={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <label htmlFor="file-upload" className="w-full h-full  cursor-pointer ">
        <input
          placeholder="fileInput"
          className="hidden"
          id="file-upload"
          ref={inputRef}
          type="file"
          multiple={multiple}
          onChange={handleChange}
        />

        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm text-center  leading-6 text-gray-600">
            <span className=" font-semibold w-full text-center  ">
              {/* {multiple ? 'Dosyaları' : 'Dosyayı'} seç veya sürükle bırak. */}
              {multiple ? 'Dateien' : 'Datei'} auswählen oder per Drag & Drop
              verschieben.
            </span>
          </div>
          <p className="text-xs leading-5 text-gray-600">Max 2GB</p>
        </div>
      </label>
    </form>
  );
}
