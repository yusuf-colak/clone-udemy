import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/libs/ui/components/ui/accordion';

import { Button } from '@/libs/ui/components/ui/button';
import { Edit } from 'lucide-react';
import TitleChapterEdit from './titleEdit';
import DescriptionChapterEdit from './descriptionedit';
import { VideoChapterEdit } from './videoChapter';
const ChapterEditV2 = ({ chapter, setChapters }) => {
  return (
    <React.Fragment>
      <AccordionContent className="col-span-2 p-2">
        <TitleChapterEdit chapter={chapter} setChapters={setChapters} />
        <DescriptionChapterEdit chapter={chapter} setChapters={setChapters} />
        <VideoChapterEdit chapter={chapter} setChapters={setChapters} />
      </AccordionContent>
    </React.Fragment>
  );
};

export default ChapterEditV2;
