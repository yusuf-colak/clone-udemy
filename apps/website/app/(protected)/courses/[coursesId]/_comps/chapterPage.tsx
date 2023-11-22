'use client';
import { getFileS3Url } from '@/s3';
import { useAuth } from 'apps/website/hooks/useAuth';
import axios from 'axios';
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { set } from 'zod';

const ChapterPage = ({
  courses,
  previewCover,
  setPreviewCover,
  setTrackings,
  trackings,
}) => {
  const [chapter, setChapter] = useState([]);
  const [videoDuration, setVideoDuration] = useState(null);
  const [isWatched, setIsWatched] = useState(null);
  const [videoSeconds, setVideoSeconds] = useState('');
  const auth: any = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const foundChapter = (courses.chapters || []).find(
        (chapter) => chapter.id === previewCover
      );
      setChapter(foundChapter);
      if (foundChapter?.videoUrl) {
        try {
          const url = await getFileS3Url(foundChapter.videoUrl);
          setChapter((prevChapter) => ({ ...prevChapter, videoUrl: url }));
          setIsWatched(false);
        } catch (error) {
          console.error('Error fetching video URL:', error);
        }
      }
    };
    fetchData();
  }, [previewCover]);
  useEffect(() => {
    const videoElement = document.getElementById('chapterVideo');
    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', () => {
        setVideoDuration(videoElement.duration);
      });
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', () => {});
      }
    };
  }, [chapter]);

  const handleTimeUpdate = (event) => {
    const currentTime = event.target.currentTime;
    const videoDuration = event.target.duration;
    const lastFiveSeconds = videoDuration - 1;

    if (currentTime >= lastFiveSeconds) {
      setIsWatched(true);
      setVideoSeconds(currentTime);
    }
  };

  useEffect(() => {
    if (isWatched) {
      const positionChapters =
        courses.chapters.find((chapter) => chapter.id === previewCover)
          .position + 1;

      const nextChapterId = courses.chapters.find(
        (chapter) => positionChapters === chapter.position
      )?.id;

      if (nextChapterId) setPreviewCover(nextChapterId);
    }
  }, [isWatched]);

  useEffect(() => {
    const updateChapterTracking = async () => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/trackings/controlAndCreate`,
          {
            chapterId: chapter.id,
            userId: auth?.user?.id,
            courseId: chapter.courseId,
            isCompleted: isWatched,
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
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
        console.error('Error updating chapter:', error);
      }
    };

    if (isWatched) updateChapterTracking();
  }, [isWatched]);

  return (
    <div className="w-full p-5">
      <h2 className="text-2xl font-semibold text-gray-700">{chapter?.title}</h2>

      {chapter?.videoUrl ? (
        <>
          <div className="w-full flex justify-center bg-black my-5">
            <video
              id="chapterVideo"
              controls
              src={chapter?.videoUrl}
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              className="lg:w-5/6 w-full  "
            />
          </div>
        </>
      ) : (
        <div className="w-full my-5 h-56 bg-gray-200 flex justify-center items-center">
          <Video size={50} color="grey" />
        </div>
      )}

      <p>{chapter?.description}</p>
    </div>
  );
};

export default ChapterPage;
