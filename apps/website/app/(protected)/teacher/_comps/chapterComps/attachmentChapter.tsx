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
import AttachmentDelete from './attachmentDelete';
import AttachmentDow from './attachmentDow';

interface AttachmentChapterFromProps {
  chapter: any;
  setChapters: any;
}
const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

const AttachmentChapter = ({
  chapter,
  setChapters,
}: AttachmentChapterFromProps) => {
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
        fileNamesEdit !== null && chapter?.attachments
          ? chapter?.attachments[fileNamesEdit]?.name
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
            courseId: chapter.courseId,
            chapterId: chapter.id,
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        console.log(responsePost.data);
        setChapters((chapters: any) => {
          const index = chapters.findIndex(
            (item: any) => item.id === chapter.id
          );
          const updatedChapters = [...chapters];
          updatedChapters[index] = {
            ...updatedChapters[index],
            attachments: [
              ...updatedChapters[index].attachments,
              responsePost.data,
            ],
          };
          return updatedChapters;
        });
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Dosya yüklenirken bir hata oluştu');
      }
    }

    toast.success('Dosya başarıyla yüklendi');
    toggleEdit();
    router.refresh();
  };

  useEffect(() => {
    if (chapter.url) {
      getFileS3Url(chapter.url).then((url) => {
        setPreviewCover(url);
      });
    }
  }, [chapter.imageUrl]);

  const fileEdit = (index: number) => {
    setFileNamesEdit(index);
    form.setValue('name', chapter?.attachments[index]?.name || '');
    setAttachmentId(chapter?.attachments[index]?.id || '');
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
      setChapters((current) => {
        const index = current.findIndex((item: any) => item.id === chapter.id);
        const updatedChapters = [...current];
        updatedChapters[index] = {
          ...updatedChapters[index],
          attachments: updatedChapters[index].attachments.map((item: any) =>
            item.id === attachmentId ? response.data : item
          ),
        };
        return updatedChapters;
      });
      setFileNamesEdit(null);
      toast.success('Başarıyla güncellendi');
      toggleEdit();
      setIsEditing(false);
    } catch {
      toast.error('Bir hata oluştu');
    }
  };
  const handleDownload = (attachment) => {
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
          {!isEditing && !chapter.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Dosya Ekle
            </>
          )}
          {!isEditing && chapter.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Dosya Düzenle
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!chapter.attachments ? (
          <div className="flex items-center justify-center  bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2  w-full">
            {chapter.attachments.map((attachment: any, index: number) => (
              <div
                key={index}
                className="flex gap-x-2 bg-slate-200 text-slate-700 rounded-md mb-4 text-sm "
              >
                {
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
                }
                <div className="ml-auto pr-2 flex items-center gap-x-2">
                  <AttachmentDow attachment={attachment} />
                  <Button
                    onClick={() => fileEdit(index)}
                    variant="ghost"
                    size="sm"
                  >
                    <Edit />
                  </Button>
                  <AttachmentDelete
                    attachment={attachment}
                    setChapters={setChapters}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      {chapter?.attachments.length < 1 && (
        <div className="text-slate-500 text-sm">Dosya bulunamadı...</div>
      )}
      {isEditing && (
        <div>
          <FileUploader
            multiple={true}
            tenant="attachment/chapters"
            onFinish={handleFileUploadFinish}
          />
        </div>
      )}
    </div>
  );
};

export default AttachmentChapter;
