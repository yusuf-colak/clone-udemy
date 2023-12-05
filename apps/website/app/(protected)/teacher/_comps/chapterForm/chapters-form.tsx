'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Chapter, Course } from '@prisma/client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/libs/ui/components/ui/form';
import { Button } from '@/libs/ui/components/ui/button';
import { Input } from '@/libs/ui/components/ui/input';
import { cn } from '@/libs/ui/utils';

import { ChaptersList } from './chapters-list';
import { useAuth } from 'apps/website/hooks/useAuth';

interface ChaptersFormProps {
  courseData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChaptersForm = ({
  courseData,
  courseId,
  setCourseData,
}: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [chapters, setChapters] = useState([]);
  const auth: Any = useAuth();
  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const position =
    chapters === null || chapters.length === 0 ? 0 : chapters.length;

  const { isSubmitting, isValid } = form.formState;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/chapters/byCourse/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        const sortedChapters = response.data.sort(
          (a, b) => a.position - b.position
        );
        setChapters(sortedChapters);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchData();
  }, [auth?.token, courseId]);

  useEffect(() => {
    setCourseData((current) => ({ ...current, chapters }));
  }, [chapters]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chapters`,
        { title: values.title, position: position, courseId },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/chapters/byCourse/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      const sortedChapters = response.data.sort(
        (a, b) => a.position - b.position
      );
      setChapters(sortedChapters);
      form.reset();
      toast.success('Video başarıyla oluşturuldu. Lütfen düzenleme yapın...');
      toggleCreating();
      router.refresh();
    } catch {
      toast.error('Bir hata oluştu');
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await Promise.all(
        updateData.map(async (item, index) => {
          const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/chapters/${item.id}`,
            {
              id: item.id,
              position: item.position,
            },
            {
              headers: {
                Authorization: `Bearer ${auth?.token}`,
              },
            }
          );
        })
      );
      form.reset();
      toast.success('Sıralama başarıyla güncellendi');
      router.refresh();
    } catch {
      toast.error('Bir hata oluştu');
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        {/* Kurs videoları */}Kursvideos
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>{/* İptal */} Abbrechen</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              {/* Video Ekle */}
              Video hinzufügen
            </>
          )}
        </Button>
      </div>
      {isCreating && (
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
                      placeholder="Videoname"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              {/* Ekle */}Hinzufügen
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            'text-sm mt-2',
            !chapters?.length && 'text-slate-500 italic'
          )}
        >
          {!chapters?.length && 'Video Bulunamadı...'}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            setChapters={setChapters}
            chapters={chapters}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          {/* Videoları yeniden sıralamak için sürükleyip bırakın */}
          Per Drag-and-Drop können Sie Videos neu anordnen
        </p>
      )}
    </div>
  );
};
