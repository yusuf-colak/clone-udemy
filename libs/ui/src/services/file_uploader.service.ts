import Resizer from "react-image-file-resizer";
import {getFileS3Url, uploadFile} from "@/s3";

async function uploadWithProgress(tenant: string, file: any, idx: number, setUploads: any, setProgress: any, customName?: string) {
  const fileName = tenant + "/" + (customName ?? file.name);

  const reader = new FileReader();

  return new Promise((resolve, reject) => {
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
      await s3Upload.done();
      const url = await getFileS3Url(fileName);
      resolve({ fileName, status: 'uploaded', url}); // Resolve the promise with fileName
    } catch (err: any) {
      if (err.name === 'AbortError') resolve({ fileName, status: 'aborted' });
      else reject(err); // Reject the promise on error
    }
  };

    reader.onerror = (error) => {
      reject(error); // Reject the promise on FileReader error
    };

    reader.readAsArrayBuffer(file);
  });
}

async function resizeAndUploadThumbnail(tenant: string, file: any, idx: number, setUploads: any, setProgress: any) {
  const thumbnail = await resizeImage(file);
  await uploadWithProgress(tenant, thumbnail, idx, setUploads, setProgress, 'thumbnail/' + file.name);
}

async function startUpload(tenant: string, files: any, setUploads: any, setProgress: any) {
  const uploadPromises = files.map((file: any, idx: number) => {
    // You can add additional checks here if needed
    return uploadWithProgress(tenant, file, idx, setUploads, setProgress);
  });

  // Await the array of promises and catch any error
  try {
    return await Promise.all(uploadPromises); // This should be an array of file names or nulls if aborted
  } catch (error) {
    // Handle errors, possibly by logging or setting an error state
    console.error("Error uploading files:", error);
  }
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
