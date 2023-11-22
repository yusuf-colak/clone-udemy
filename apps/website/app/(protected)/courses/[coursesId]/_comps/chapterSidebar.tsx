import { cn } from '@/libs/ui/utils';
import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/libs/ui/components/ui/scroll-area';
import AttachmentDow from '../../../teacher/_comps/attachmentComps/attachmentDow';
import { Check, CheckCircle, Clock4 } from 'lucide-react';
import { getFileS3Url } from '@/s3';
import { useAuth } from 'apps/website/hooks/useAuth';
import axios from 'axios';

const ChapterSidebar = ({
  courses,
  setPreviewCover,
  previewCover,
  setTrackings,
  trackings,
}) => {
  const [videoDurations, setVideoDurations] = useState({});
  const auth: any = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/trackings/user/${auth?.user?.id}/courseId/${courses.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setTrackings(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    if (auth?.token && courses.id) {
      fetchData();
    }
  }, [auth?.token, courses.id]);

  useEffect(() => {
    const fetchVideoDurations = async () => {
      const durations = {};
      for (const chapter of courses.chapters || []) {
        if (chapter.videoUrl) {
          try {
            const url = await getFileS3Url(chapter.videoUrl);
            const video = document.createElement('video');
            video.src = url;
            await video.load();
            durations[chapter.id] = video.duration;
          } catch (error) {
            console.error(
              `Error fetching video duration for chapter ${chapter.id}:`,
              error
            );
          }
        }
      }
      setVideoDurations(durations);
    };

    fetchVideoDurations();
  }, [courses.chapters]);
  return (
    <div className="flex flex-col gap-y-10  h-full ">
      <div className=" p-2">
        <h2 className="text-xl font-medium text-black border-b-2 border-black mb-2">
          Kurs içeriği
        </h2>
        <ScrollArea className=" lg:h-40 lg:w-full  ">
          {courses.chapters?.map((chapter, index) => (
            <div className=" w-full lg:w-[350px]" key={chapter.id}>
              {chapter.id && (
                <button
                  className={cn(
                    previewCover === chapter.id && 'bg-gray-300 text-white',
                    'flex  w-full hover:bg-gray-100 hover:text-black text-start px-1'
                  )}
                  onClick={() => {
                    setPreviewCover(chapter.id);
                  }}
                >
                  <div className="flex w-full justify-between p-1">
                    <div className="flex flex-col">
                      <span className="text-2xl">
                        {index + 1}. {chapter.title}
                      </span>
                      {chapter.videoTime && (
                        <span className="text-xs flex flex-row items-center">
                          <Clock4 size={13} className="mr-1" />
                          {chapter.videoTime}
                        </span>
                      )}
                    </div>

                    {trackings.find(
                      (tracking) => tracking.chapterId === chapter.id
                    ) && (
                      <div className="flex items-center pr-2">
                        <CheckCircle color="green" size={25} />
                      </div>
                    )}
                  </div>
                </button>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>

      {courses.attachments && courses.attachments.length > 0 && (
        <div className=" p-2">
          <div className="text-xl text-black font-semibold border-b-2 border-black ">
            Kurs Dosyaları
          </div>
          <ScrollArea className=" lg:h-32 lg:w-full ">
            {courses.attachments?.map((attachment) => (
              <div className="flex flex-row justify-between items-center hover:bg-gray-100 gap-x-2 border-b m-1">
                {attachment.name}
                <AttachmentDow attachment={attachment} />
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default ChapterSidebar;
