'use client';
import { Switch } from '@/libs/ui/components/ui/switch';
import { cn } from '@/libs/ui/utils';
import { useAuth } from 'apps/website/hooks/useAuth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PublishSwitch = ({
  courseData,
  setCourseData,
  courseId,
  totalFields,
  completedFields,
}) => {
  const [isPublished, setIsPublished] = useState<boolean>();
  const auth: any = useAuth();
  useEffect(() => {
    setIsPublished(courseData?.isPublished);
  }, [courseData?.isPublished]);

  const onSubmit = async () => {
    const updatedIsPublished = !isPublished;
    await setIsPublished(updatedIsPublished);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`,
        { isPublished: updatedIsPublished },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setCourseData((current) => ({
        ...current,
        isPublished: updatedIsPublished,
      }));
    } catch {
      console.error('Error updating course data');
    }
  };

  return (
    <div className="flex flex-row items-center">
      Paylaşıma {courseData?.isPublished ? 'açık' : 'kapalı'}
      <Switch
        defaultChecked={courseData?.isPublished}
        onClick={onSubmit}
        disabled={totalFields !== completedFields}
        className={cn(
          totalFields === completedFields
            ? 'cursor-pointer'
            : 'cursor-not-allowed',
          'ml-2'
        )}
      />
    </div>
  );
};

export default PublishSwitch;
