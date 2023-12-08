'use client';
import { useAuth } from 'apps/website/hooks/useAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as z from 'zod';
import FileUploader from '@/libs/ui/components/fileUploader';
import { getFileS3Url } from '@/s3';
import { Button } from '@/libs/ui/components/ui/button';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/libs/ui/components/ui/form';
import { Input } from '@/libs/ui/components/ui/input';
const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Başlık zorunludur',
    })
    .max(40, { message: 'Başlık en fazla 40 karakter olmalıdır.' }),
});
const page = () => {
  const auth: any = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  const [logoAndName, setLogoAndName] = useState<any>();
  const [previewCover, setPreviewCover] = useState(null);
  const toggleEdit = () => setIsEditing((current) => !current);
  const toggleEditName = () => setIsEditingName((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: logoAndName?.name ? logoAndName?.name : '',
    },
  });
  const { isSubmitting, isValid } = form.formState;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tenants/${auth?.user?.tenantId}/ImageAndName`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setLogoAndName(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    if (!logoAndName && auth?.token) {
      fetchData();
    }
  }, [auth?.token]);

  const handleFileUploadFinish = async (fileNames: any) => {
    setIsEditing(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/tenants/${auth?.user?.tenantId}`,
        {
          image: fileNames[0].fileName,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setLogoAndName(response.data);
      toggleEdit();
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  useEffect(() => {
    if (logoAndName?.image) {
      getFileS3Url(logoAndName.image).then((url) => {
        setPreviewCover(url);
      });
    }
  }, [logoAndName?.image]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/tenants/${auth?.user?.tenantId}`,
        { name: values.name },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setLogoAndName((current) => ({ ...current, ...values }));
      toggleEditName();
    } catch {
      console.error('Error fetching course data:');
    }
  };
  return (
    <div >
      <div className="mt-6 border bg-slate-100 rounded-md p-4 max-w-[500px]">
        <div className="font-medium flex items-center justify-between pb-2">
          {/* Logo resmi */}
          Logo
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing && <>{/* İptal */} Abbrechen</>}
            {!isEditing && !logoAndName?.image && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                {/* Resim Ekle */}
                Bild hinzufügen
              </>
            )}
            {!isEditing && logoAndName?.image && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                {/* Resimi Düzenle */}
                Bearbeiten
              </>
            )}
          </Button>
        </div>
        {!isEditing &&
          (!logoAndName?.image ? (
            <div className="flex items-center justify-center  bg-slate-200 rounded-md">
              <ImageIcon className=" w-[45px] h-[45px] text-slate-500" />
            </div>
          ) : (
            <div className="relative mt-2 flex justify-center  w-full">
              <img
                alt="Upload"
                className="rounded-xl w-[45px] object-contain rounded-md"
                src={previewCover ?? 'https://via.placeholder.com/45'}
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
      <div className="mt-6 border bg-slate-100 rounded-md p-4 max-w-[500px]">
        <div className="font-medium flex items-center justify-between">
          {/* fİRMA ADI  */}
          Name der Firma
          <Button onClick={toggleEditName} variant="ghost">
            {isEditing ? (
              <>{/* İptal */} Abbrechen</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                {/* Başlığı düzenle */} Bearbeiten
              </>
            )}
          </Button>
        </div>
        {!isEditingName && <p className="text-sm mt-2">{logoAndName?.name}</p>}
        {isEditingName && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Titel eingeben"
                        {...field}
                      />
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
    </div>
  );
};

export default page;
