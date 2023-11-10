'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Course } from '@prisma/client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/libs/ui/components/ui/form';
import { Button } from '@/libs/ui/components/ui/button';
import { Textarea } from '@/libs/ui/components/ui/textarea';
import { cn } from '@/libs/ui/utils';
import { useAuth } from 'apps/website/hooks/useAuth';

interface DescriptionFormProps {
  courseData: Course;
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: 'Description is required',
  }),
});

export const DescriptionForm = ({
  courseData,
  courseId,
  setCourseData,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const auth: any = useAuth();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: courseData?.description || '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setCourseData((current) => ({ ...current, ...values }));

      toast.success('Course updated');
      toggleEdit();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Kurs açıklaması
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>İptal</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Kurs açıklamasını düzenle
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            'text-sm mt-2',
            !courseData.description && 'text-slate-500 italic'
          )}
        >
          {courseData.description || 'Açıklama bulunamadı...'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Açıklama giriniz..."
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
