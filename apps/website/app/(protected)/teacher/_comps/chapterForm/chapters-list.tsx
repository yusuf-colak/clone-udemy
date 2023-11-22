'use client';

import { Chapter } from '@prisma/client';
import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { Delete, Edit, Grip, Pencil } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/libs/ui/components/ui/accordion';
import { Badge } from '@/libs/ui/components/ui/badge';
import { cn } from '@/libs/ui/utils';
import ChapterEdit from '../chapterComps/chapterEdit';
import ChapterDelete from '../chapterComps/chapterDelete';
import ChapterEditV2 from '../chapterComps/chapterEditV2';
import TitleChapterEdit from '../chapterComps/titleEdit';
import DescriptionChapterEdit from '../chapterComps/descriptionedit';
import { VideoChapterEdit } from '../chapterComps/videoChapter';
import { Button } from '@/libs/ui/components/ui/button';

interface ChaptersListProps {
  chapters: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ChaptersList = ({
  chapters,
  onReorder,
  onEdit,
  setChapters,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(chapters);
  }, [chapters]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const [reorderedItem] = chapters.splice(result.source.index, 1);
    chapters.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = chapters.slice(startIndex, endIndex + 1);

    setChapters(chapters);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: chapters.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`item-${index}`}>
                      <div
                        className={cn(
                          ' grid grid-cols-2  items-center text-md chapters-center   bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 ',
                          chapter.isPublished &&
                            'bg-sky-100 border-sky-200 text-sky-700'
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          className={cn(
                            'flex flex-row  gap-x-2  px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition',
                            chapter.isPublished &&
                              'border-r-sky-200 hover:bg-sky-200'
                          )}
                          {...provided.dragHandleProps}
                        >
                          <Grip className="h-5 w-5" /> {chapter.title}
                        </div>
                        <div className="ml-auto  flex items-center chapters-center ">
                          <ChapterDelete
                            chapter={chapter}
                            setChapters={setChapters}
                          />

                          <AccordionTrigger className="py-0 pr-1">
                            <Button variant="ghost">
                              <Edit />
                            </Button>
                          </AccordionTrigger>
                        </div>
                        <ChapterEditV2
                          chapter={chapter}
                          setChapters={setChapters}
                        />
                      </div>
                    </AccordionItem>
                  </Accordion>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
