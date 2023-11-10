'use client';
import { useEffect, useState } from 'react';

import * as z from 'zod';
import axios from 'axios';
import { Pencil, PlusCircle, ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Button } from '@/libs/ui/components/ui/button';
import { useAuth } from 'apps/website/hooks/useAuth';
import FileUploader from '@/libs/ui/components/fileUploader';
import { getFileS3Url } from '@/s3';

interface ImageFormProps {
  chapter: any;
  setChapters: any;
}

const formSchema = z.object({
  videoUrl: z.string().min(1, {
    message: 'Image is required',
  }),
});

export const VideoChapterEdit = ({ chapter, setChapters }: ImageFormProps) => {
  const auth: any = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [previewCover, setPreviewCover] = useState(null);
  const [isWatched, setIsWatched] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const handleFileUploadFinishVideo = async (fileNames: any) => {
    setPreviewCover(fileNames[0].url);

    setIsEditing(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/chapters/${chapter.id}`,
        {
          videoUrl: fileNames[0].fileName,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      setChapters((current) => {
        const index = current.findIndex((c) => c.id === chapter.id);
        const newChapters = [...current];
        newChapters[index] = { ...current[index], ...fileNames[0] };
        return newChapters;
      });
      toast.success('Course updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (chapter.videoUrl) {
      getFileS3Url(chapter.videoUrl).then((url) => {
        setPreviewCover(url);
      });
    }
  }, [chapter.url]);
  const handleTimeUpdate = (event) => {
    const currentTime = event.target.currentTime;
    const watchedThreshold = 30; // Örneğin, 30 saniye

    if (currentTime >= watchedThreshold) {
      setIsWatched(true);
      // Diğer işlemleri buraya ekleyebilirsin.
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video Yükle
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>İptal</>}
          {!isEditing && !chapter.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Video Ekle
            </>
          )}
          {!isEditing && chapter.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Video Düzenle
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!previewCover ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 h-60 w-full">
            <video
              src={previewCover}
              className="w-full h-full object-cover rounded-md"
              controls
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUploader tenant="video" onFinish={handleFileUploadFinishVideo} />
        </div>
      )}
    </div>
  );
};
