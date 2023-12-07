'use client';

import * as z from 'zod';
import axios from 'axios';
import { Pencil, PlusCircle, ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';
import Image from 'next/image';

import { Button } from '@/libs/ui/components/ui/button';
import { useAuth } from 'apps/website/hooks/useAuth';
import FileUploader from '@/libs/ui/components/fileUploader';
import { getFileS3Url } from '@/s3';

interface ImageFormProps {
  courseData: Course;
  courseId: string;
  setCourseData: any;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
});

export const ImageForm = ({
  courseData,
  courseId,
  setCourseData,
}: ImageFormProps) => {
  const auth: any = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [previewCover, setPreviewCover] = useState(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const handleFileUploadFinish = async (fileNames: any) => {
    setPreviewCover(fileNames[0].url);
    setIsEditing(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`,
        {
          imageUrl: fileNames[0].fileName,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setCourseData((current) => ({ ...current, ...response.data }));
      toast.success('Bild erfolgreich aktualisiert');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Beim Aktualisieren des Bildes ist ein Fehler aufgetreten');
    }
  };

  useEffect(() => {
    if (courseData.imageUrl) {
      getFileS3Url(courseData.imageUrl).then((url) => {
        setPreviewCover(url);
      });
    }
  }, [courseData.imageUrl]);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        {/* Kurs resmi */}
        Kursbild
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>{/* İptal */} Abbrechen</>}
          {!isEditing && !courseData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              {/* Resim Ekle */}
              Bild hinzufügen
            </>
          )}
          {!isEditing && courseData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              {/* Resimi Düzenle */}
              Bearbeiten
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
            <img
              alt="Upload"
              className="w-full h-full object-cover rounded-md"
              src={previewCover ?? 'https://via.placeholder.com/300'}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUploader
            tenant="test"
            folder="image"
            onFinish={handleFileUploadFinish}
          />
        </div>
      )}
    </div>
  );
};
