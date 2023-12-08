'use client';

import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/libs/ui/components/ui/button';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/libs/ui/components/ui/form';
import { Input } from '@/libs/ui/components/ui/input';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useAuth } from 'apps/website/hooks/useAuth';
const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
});
const CreateCoursesPage = () => {
  const router = useRouter();
  const auth: any = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/courses`,
        {
          title: values.title,
          userId: auth?.user.id,
          isPublished: false,
          tenantId: auth?.user.tenantId,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      router.push(`/teacher/addCourse/${response.data.id}`);
      toast.success('Ihr Kurs wurde erfolgreich erstellt');
    } catch (error) {
      toast.error('Etwas ist schief gelaufen');
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex lg:items-center lg:justify-center h-full p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kursunuza ad verin</FormLabel>
                <FormDescription>
                  Kursunuza ne ad vermek istersiniz? Endişelenmeyin , kurs
                  bağlığını daha sonra değiştirebilirsiniz.
                </FormDescription>
                <FormLabel>Kurs başlığı</FormLabel>
                <FormControl>
                  <Input placeholder="Kurs başlığı girin" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Link href="/">
              <Button type="button" variant="ghost">
                {/* İptal */} Abbrechen
              </Button>
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Devam et
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCoursesPage;
