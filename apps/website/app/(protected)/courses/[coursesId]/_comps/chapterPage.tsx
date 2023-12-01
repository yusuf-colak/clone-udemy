'use client';
import { getFileS3Url } from '@/s3';
import { useAuth } from 'apps/website/hooks/useAuth';
import axios from 'axios';
import { Video } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { set } from 'zod';

const ChapterPage = ({
  courses,
  previewCover,
  setPreviewCover,
  setTrackings,
  trackings,
}) => {
  const videoRef = useRef(null);
  const [chapter, setChapter] = useState([]);
  const [videoDuration, setVideoDuration] = useState(null);
  const [isWatched, setIsWatched] = useState(null);
  const [videoSeconds, setVideoSeconds] = useState('');
  const [isCurrentTime, setIsCurrentTime] = useState('');
  const [currentTimeInterval, setCurrentTimeInterval] = useState(null);
  const [trackingsId, setTrackingsId] = useState(null);
  const auth: any = useAuth();

  const createTrackings = async () => {
    try {
      if (!auth?.user?.id) return;
      const responseOlustur = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/trackings/controlAndCreate`,
        {
          chapterId: chapter.id,
          userId: auth?.user?.id,
          courseId: chapter.courseId,
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

  useEffect(() => {
    createTrackings();
  }, [previewCover, chapter?.id]);

  useEffect(() => {
    const tracking = trackings.filter(
      (tracking) => tracking.chapterId === previewCover
    );
    const trackingIds = tracking[0]?.id;
    setTrackingsId(trackingIds);
  }, [trackings, previewCover]);

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
      setCurrentTimeInterval(
        setInterval(() => {
          // Check if the video is playing before updating currentTime
          if (!videoElement.paused) {
            const currentTime = videoElement.currentTime;
            setIsCurrentTime(currentTime);
          }
        }, 10000) // Update every 10 seconds
      );
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', () => {});
      }

      // Clear the interval when the component is unmounted or video changes
      clearInterval(currentTimeInterval);
    };
  }, [chapter]);
  useEffect(() => {
    const updateTime = async () => {
      try {
        if (previewCover) {
          const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/trackings/${trackingsId}`,
            {
              isTime: isCurrentTime,
            },
            {
              headers: {
                Authorization: `Bearer ${auth?.token}`,
              },
            }
          );
        }
      } catch (error) {
        console.error('Error updating chapter:', error);
      }
    };
    if (isCurrentTime) updateTime();
  }, [isCurrentTime, previewCover]);

  const handleTimeUpdate = (event) => {
    const currentTime = event.target.currentTime;
    const videoDuration = event.target.duration;
    const lastOneSeconds = videoDuration - 1;

    if (currentTime >= lastOneSeconds) {
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
      if (previewCover) {
        try {
          await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/trackings/${trackingsId}`,
            {
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
      }
    };

    if (isWatched) updateChapterTracking();
  }, [isWatched]);

  useEffect(() => {
    // Sayfa yüklendiğinde videonun 30. saniyesine git
    if (videoRef.current && previewCover) {
      videoRef.current.currentTime = 30;
    }
  }, [previewCover]);
  return (
    <div className="w-full p-5">
      <h2 className="lg:text-2xl text-xl font-semibold text-blue-950">
        {chapter?.title}
      </h2>

      {chapter?.videoUrl ? (
        <>
          <div className="w-full flex justify-center bg-black my-5">
            <video
              id="chapterVideo"
              controls
              src={chapter?.videoUrl}
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              className="lg:w-11/12 w-full"
              ref={videoRef}
            />
          </div>
        </>
      ) : (
        <div className="w-full my-5 h-56 bg-gray-200 flex justify-center items-center">
          <Video size={50} color="grey" />
        </div>
      )}

      <p>
        <span>Video Açıklaması: </span> {chapter?.description}
      </p>
    </div>
  );
};

export default ChapterPage;
