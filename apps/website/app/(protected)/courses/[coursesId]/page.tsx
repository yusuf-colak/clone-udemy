'use client';
import { Button } from '@/libs/ui/components/ui/button';
import { useAuth } from 'apps/website/hooks/useAuth';
import axios from 'axios';
import React, { useEffect } from 'react';
import ChapterPage from './_comps/chapterPage';
import { cn } from '@/libs/ui/utils';
import ChapterSidebar from './_comps/chapterSidebar';
const CoursesVideoPage = ({ params }: { params: { coursesId: string } }) => {
  const auth: any = useAuth();
  const [courses, setCourses] = React.useState([]);
  const [previewCover, setPreviewCover] = React.useState('');
  const [trackings, setTrackings] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/${params.coursesId}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        const sortedChapters = sortChaptersByPosition(response.data.chapters);
        setCourses({ ...response.data, chapters: sortedChapters });
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    const sortChaptersByPosition = (chapters) => {
      return chapters.sort((a, b) => a.position - b.position);
    };

    if (auth?.token) {
      fetchData();
    }
  }, [auth?.token, params.chapterId]);
  useEffect(() => {
    if (courses.chapters?.length) {
      setPreviewCover(courses.chapters[0].id);
    }
  }, [courses.chapters]);
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="w-full">
        <p className=" lg:text-4xl text-2xl font-semibold text-gray-800">
          {courses.title}
        </p>
        <ChapterPage
          setPreviewCover={setPreviewCover}
          courses={courses}
          previewCover={previewCover}
          setTrackings={setTrackings}
          trackings={trackings}
        />
      </div>

      <ChapterSidebar
        courses={courses}
        setPreviewCover={setPreviewCover}
        previewCover={previewCover}
        setTrackings={setTrackings}
        trackings={trackings}
      />
    </div>
  );
};

export default CoursesVideoPage;
