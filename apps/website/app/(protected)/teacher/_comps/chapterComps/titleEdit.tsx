import React from 'react';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
interface TitleFromProps {
  chapter: any;
  setChapter: any;
}
const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
});

const TitleChapterEdit = ({ chapter, setChapters }: TitleFromProps) => {
  const auth: any = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: chapter,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/chapters/${chapter.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      setChapters((current) => {
        const index = current.findIndex((c) => c.id === chapter.id);
        const newChapters = [...current];
        newChapters[index] = { ...current[index], ...values };
        return newChapters;
      });
      toast.success('Video başlığı başarıyla güncellendi...');
      toggleEdit();
    } catch {
      toast.error('Bir hata oluştu');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video Başlığı
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>İptal</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Başlığı Düzenle
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{chapter.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
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
              <Button disabled={!isValid || isSubmitting} type="submit">
                Kaydet
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default TitleChapterEdit;
