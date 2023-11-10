import Resizer from "react-image-file-resizer";
import {uploadFile} from "@/s3";

async function uploadWithProgress(file: any, idx: number, setUploads: any, setProgress: any, customName?: string) {
  const fileName = customName ?? file.name;

  const reader = new FileReader();

  reader.onload = async (event: any) => {
    const blob = new Blob([event.target.result], {type: file.type});

    const s3Upload = uploadFile(fileName, blob);

    setUploads((prevUploads: any) => {
      const updatedUploads = [...prevUploads];
      updatedUploads[idx] = s3Upload;
      return updatedUploads;
    });

    s3Upload.on('httpUploadProgress', (progress: any) => {
      const percentage = (progress.loaded / progress.total) * 100;
      setProgress((prevProgress: any) => {
        const updatedProgress = [...prevProgress];
        updatedProgress[idx] = percentage;
        return updatedProgress;
      });
    });

    try {
      return await s3Upload.done();
    } catch (err: any) {
      if (err.name === 'AbortError') return null;
    }
  };

  reader.readAsArrayBuffer(file);
}

async function resizeAndUploadThumbnail(file: any, idx: number, setUploads: any, setProgress: any) {
  const thumbnail = await resizeImage(file);
  await uploadWithProgress(thumbnail, idx, setUploads, setProgress, 'thumbnail/' + file.name);
}

async function startUpload(files: any, setUploads: any, setProgress: any) {
  const uploadPromises = files.map(async (file: any, idx: any) => {
    const uploadPromise = uploadWithProgress(file, idx, setUploads, setProgress);

    if (file.type.startsWith('image/')) {
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'webp' || fileExtension === 'png') {
        return Promise.all([uploadPromise, resizeAndUploadThumbnail(file, idx, setUploads, setProgress)]);
      }
    }

    return uploadPromise;
  });

  return Promise.all(uploadPromises);
}

const resizeImage = (file: any) =>
  new Promise((resolve) => {
    // Extract the file extension from the file name
    const fileExtension = file.name.split('.').pop().toLowerCase();

    // Determine the compressFormat based on the file extension
    let compressFormat = "JPEG"; // Default to JPEG
    if (fileExtension === "png") {
      compressFormat = "PNG";
    } else if (fileExtension === "webp") {
      compressFormat = "WEBP";
    }

    Resizer.imageFileResizer(
      file,
      300,
      300,
      compressFormat,
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

export {startUpload};
