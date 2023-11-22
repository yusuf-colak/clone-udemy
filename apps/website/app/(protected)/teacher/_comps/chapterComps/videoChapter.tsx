'use client';
import { useEffect, useState } from 'react';

import * as z from 'zod';
import axios from 'axios';
import { Pencil, PlusCircle, ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

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
  const [videoDuration, setVideoDuration] = useState(null);
  const [videoSeconds, setVideoSeconds] = useState('');
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const handleFileUploadFinishVideo = async (fileNames: any) => {
    const duration = await getVideoDuration(fileNames[0].file);

    const formatDuration = async (duration: number) => {
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = Math.round(duration % 60);

      if (hours > 0) {
        return `${hours} sa ${minutes} dak`;
      } else {
        return `${minutes} dak ${seconds} san`;
      }
    };

    setPreviewCover(fileNames[0].url);
    setIsEditing(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/chapters/${chapter.id}`,
        {
          videoUrl: fileNames[0].fileName,
          videoTime: await formatDuration(duration),
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setChapters((chapters: any) => {
        const index = chapters.findIndex((item: any) => item.id === chapter.id);
        const updatedChapters = [...chapters];
        updatedChapters[index] = {
          ...updatedChapters[index],
          videoUrl: fileNames[0].fileName,
        };
        return updatedChapters;
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

  const getVideoDuration = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const media = new Audio(reader.result);
        media.onloadedmetadata = () => resolve(media.duration);
      };
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });

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
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUploader
            tenant="test"
            folder="video"
            onFinish={handleFileUploadFinishVideo}
          />
        </div>
      )}
    </div>
  );
};
