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
const ChapterDelete = ({ chapter, setChapters }) => {
  const auth: any = useAuth();
  const onSubmit = async () => {
    try {
      const resPatch = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/chapters/${chapter.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      setChapters((prev) => {
        // Silinen chapter'ın position'ından sonraki tüm elemanların position'ını güncelle
        const updatedChapters = prev
          .filter((item) => item.id !== chapter.id)
          .map((item, index) => ({
            ...item,
            position: index,
          }));
        console.log(updatedChapters);
        return updatedChapters;
      });

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
            <AlertDialogCancel>{/* İptal */} Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit}>Onayla</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  );
};

export default ChapterDelete;
