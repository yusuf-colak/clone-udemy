'use client';

import axios from 'axios';
import { Pencil, PlusCircle, ImageIcon, Edit, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/libs/ui/components/ui/form';
import { Button } from '@/libs/ui/components/ui/button';
import { Input } from '@/libs/ui/components/ui/input';
import { useAuth } from 'apps/website/hooks/useAuth';
import FileUploader from '@/libs/ui/components/fileUploader';
import { getFileS3Url } from '@/s3';
import AttachmentDelete from './attachmentComps/attachmentDelete';

interface AttachmentFromProps {
  courseData: Course;
  courseId: string;
  setCourseData: any;
}
const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

export const AttachmentForm = ({
  courseData,
  courseId,
  setCourseData,
}: AttachmentFromProps) => {
  const auth: any = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [previewCover, setPreviewCover] = useState(null);
  const [attachments, setAttachments] = useState<any | null>();
  const [fileNamesEdit, setFileNamesEdit] = useState<any | null>();
  const [attachmentId, setAttachmentId] = useState<any | null>();
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:
        fileNamesEdit !== null && courseData?.attachments
          ? courseData?.attachments[fileNamesEdit]?.name
          : '',
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const handleFileUploadFinish = async (fileNames: any) => {
    for (const file of fileNames) {
      try {
        const responsePost = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/attachments`,
          {
            name: file.fileName,
            url: file.fileName,
            courseId: courseId,
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setCourseData((current) => ({
          ...current,
          attachments: [...current.attachments, responsePost.data],
        }));
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Something went wrong');
      }
    }

    toast.success('All files uploaded successfully');
    toggleEdit();
    router.refresh();
  };

  useEffect(() => {
    if (courseData.url) {
      getFileS3Url(courseData.url).then((url) => {
        setPreviewCover(url);
      });
    }
  }, [courseData.imageUrl]);

  const fileEdit = (index: number) => {
    setFileNamesEdit(index);
    form.setValue('name', courseData?.attachments[index]?.name || '');
    setAttachmentId(courseData?.attachments[index]?.id || '');
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/attachments/${attachmentId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      setCourseData((current) => ({
        ...current,
        attachments: current.attachments.map((item) =>
          item.id === attachmentId ? response.data : item
        ),
      }));
      setFileNamesEdit(null);
      toast.success('Course updated');
      toggleEdit();
      setIsEditing(false);
    } catch {
      toast.error('Something went wrong');
    }
  };
  const handleDownload = (attachment) => {
    console.log('attachment', attachment);

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
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Dosyalar
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>İptal</>}
          {!isEditing && !courseData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Dosya Ekle
            </>
          )}
          {!isEditing && courseData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Dosya Düzenle
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!courseData.attachments ? (
          <div className="flex items-center justify-center  bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2  w-full">
            {courseData.attachments.map((attachment: any, index: number) => (
              <div
                key={index}
                className="flex gap-x-2 bg-slate-200 text-slate-700 rounded-md mb-4 text-sm "
              >
                <div className=" py-2 pl-1 border-r transition ">
                  {fileNamesEdit == index ? (
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-x-4  flex flex-row items-center "
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  disabled={isSubmitting}
                                  placeholder="e.g. 'Advanced web development'"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex items-center gap-x-2">
                          <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                          >
                            Kaydet
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <div>{attachment.name} </div>
                  )}
                </div>

                <div className="ml-auto pr-2 flex items-center gap-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(attachment)}
                  >
                    <Download />
                  </Button>

                  <Button
                    onClick={() => fileEdit(index)}
                    variant="ghost"
                    size="sm"
                  >
                    <Edit />
                  </Button>
                  <AttachmentDelete
                    attachment={attachment}
                    setCourseData={setCourseData}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      {courseData?.attachments.length < 1 && (
        <div className="text-slate-500 text-sm">Dosya bulunamadı...</div>
      )}

      {isEditing && (
        <div>
          <FileUploader
            multiple={true}
            tenant="attachment"
            onFinish={handleFileUploadFinish}
          />
        </div>
      )}
    </div>
  );
};
