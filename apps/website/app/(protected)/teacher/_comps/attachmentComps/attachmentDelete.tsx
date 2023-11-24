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
import { Button } from '@/libs/ui/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useAuth } from 'apps/website/hooks/useAuth';
import { toast } from 'react-hot-toast';
import axios from 'axios';
const AttachmentDelete = (
  { attachment, setCourseData },
  { params }: { params: { courseId: string } }
) => {
  const auth: any = useAuth();
  const onSubmit = async () => {
    try {
      const resPatch = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/attachments/${attachment.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setCourseData((current) => ({
        ...current,
        attachments: current.attachments.filter(
          (item) => item.id !== attachment.id
        ),
      }));
      toast.success('Başarıyla silindi');
    } catch {
      toast.error('Bir hata oluştu');
    }
  };
  return (
    <React.Fragment>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="ghost">
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          Silmek istediğinize eminmisiniz ?
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit}>Onayla</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  );
};

export default AttachmentDelete;
