import React, { useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/libs/ui/components/ui/select';

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
  roleId: z.string({
    required_error: 'Lütfen rol seçiniz',
  }),
});
const UserAddPage = () => {
  const auth: any = useAuth();
  const [roles, setRoles] = React.useState([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      email: '',
    },
  });

  useEffect(() => {
    const fetchRoles = async () => {
      if (auth?.token) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/roles`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setRoles(response.data);
        console.log(response.data);
      }
    };
    fetchRoles();
  }, [auth?.token]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const responseUser = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      const responseRole = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/rolesonusers`,
        {
          userId: responseUser.data.id,
          roleId: values.roleId,
          assignedAt: new Date(),
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log('responseRole.data', responseRole.data);
      console.log('responseUser.data', responseUser.data);
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
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol Seçiniz</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Lütfen Rol Seçiniz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role: any) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

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
