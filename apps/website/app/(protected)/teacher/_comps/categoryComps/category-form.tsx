'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';

import { Button } from '@/libs/ui/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from '@/libs/ui/components/ui/form';
import { FormControl } from '@/libs/ui/components/ui/form';
import { Combobox } from '@/libs/ui/components/ui/combobox';
import { cn } from '@/libs/ui/utils';
import { useAuth } from 'apps/website/hooks/useAuth';
interface CategoryFormProps {
  courseData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

export const CategoryForm = ({
  courseData,
  courseId,
  setCourseData,
  options,
}: CategoryFormProps) => {
  const auth: any = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: courseData?.categoryId || '',
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setCourseData((current) => ({ ...current, ...values }));
      toast.success('Kategori başarıyla güncellendi');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Bir hata oluştu');
    }
  };

  const selectedOption = options?.find(
    (option) => option.value === courseData.categoryId
  );

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        {/* Kurs kategorisi */}
        Kurskategorie
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>{/* İptal */} Abbrechen</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              {/* Kategoriyi Düzenle */}
              Bearbeiten
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            'text-sm mt-2',
            !courseData.categoryId && 'text-slate-500 italic'
          )}
        >
          {selectedOption?.label || 'Kategori seçilmedi'}
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={...options} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {/* Kaydet */} Speichern
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
