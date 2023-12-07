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
import { Edit, X } from 'lucide-react';
import { delay } from 'framer-motion';
const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'İsim alanı boş bırakılamaz ve en az 2 karakter olmalıdır.',
    })
    .max(50),
  email: z.string().email({ message: 'Geçersiz email adresi' }),
  password: z.string().refine(
    (value) => {
      // Şifre alanı boşsa uyarı verme
      if (value === '') {
        return true;
      }
      // Şifre alanı 6 haneden küçükse hata ver
      return value.length >= 6;
    },
    {
      message: 'Şifre alanı boş bırakılamaz ve en az 6 karakter olmalıdır.',
    }
  ),
  roleId: z.string({
    required_error: 'Lütfen rol seçiniz',
  }),
});

const UserEditPage = ({ userId, userName, mail, roleId }) => {
  const auth: any = useAuth();
  const [roles, setRoles] = React.useState([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userName,
      password: '',
      email: mail,
      roleId: roleId,
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
      }
    };
    fetchRoles();
  }, [auth?.token]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userData = {
        name: values.name,
        email: values.email,
      };

      // Eğer şifre alanı boş değilse, şifreyi güncelle
      if (values.password !== '') {
        userData.password = values.password;
      }

      const responseUser = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      const responseRole = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/rolesonusers/${userId}/${roleId}`,
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

      window.location.reload();
      toast.success('Der Benutzer wurde erfolgreich aktualisiert.');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Die E-Mail-Adresse ist bereits vergeben.');
      } else {
        console.error('Bir hata oluştu:', error);
      }
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full" size="sm" variant="ghost">
          <Edit />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-center">
            {/* Kullanıcı Güncelle */}
            Benutzer aktualisieren
            <AlertDialogCancel className="rounded-full p-2">
              <X />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
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
                    <FormLabel>Passwort</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Passwort"
                        type="password"
                        {...field}
                      />
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
                    <FormLabel>Wählen Sie Rolle aus</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wählen Sie Rolle aus" />
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
              <Button className="flex w-full border" type="submit">
                {/* Kullanıcıyı Güncelle */}
                Benutzer aktualisieren
              </Button>
            </form>
          </Form>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserEditPage;
