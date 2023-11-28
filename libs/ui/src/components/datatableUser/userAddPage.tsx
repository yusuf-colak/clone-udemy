import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/libs/ui/components/ui/alertDialog';
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
import { Button } from '@/libs/ui/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from 'apps/website/hooks/useAuth';
import { toast } from 'react-hot-toast';
const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'İsim alanı boş bıraklıamaz ve en az 2 karakter olmalıdır.',
    })
    .max(50),
  email: z.string().email().min(2, {
    message: 'Email alanı boş bıraklıamaz...',
  }),
  password: z
    .string()
    .min(6, {
      message: 'Şifre alanı boş bıraklıamaz ve en az 6 karakter olmalıdır.',
    })
    .max(15),
});
const UserAddPage = () => {
  const auth: any = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      email: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log(response.data);
      toast.success('Kullanıcı başarıyla oluşturuldu.');
    } catch {
      toast.error('Bir hata oluştu');
    }
    console.log(values);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Kullanıcı Ekle</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kullanıcı Ekle</AlertDialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İsim</FormLabel>
                    <FormControl>
                      <Input placeholder="İsim" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <Input placeholder="Şifre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Kullanıcıyı Ekle</Button>
            </form>
          </Form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserAddPage;
