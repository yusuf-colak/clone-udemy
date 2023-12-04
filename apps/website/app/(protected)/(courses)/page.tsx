'use client';
import { useAuth } from 'apps/website/hooks/useAuth';
import axios from 'axios';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/libs/ui/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/libs/ui/components/ui/tooltip';
import Link from 'next/link';
import { getFileS3Url } from '@/s3';
import { CheckCircle, Image } from 'lucide-react';
import { Progress } from '@/libs/ui/components/ui/progress';
import { Button } from '@/libs/ui/components/ui/button';
import { Book } from 'iconsax-react';
import { ScrollArea } from '@/libs/ui/components/ui/scroll-area';
import Greeting from '@/libs/ui/components/greeting';

const CoursesPage = () => {
  const auth: any = useAuth();
  const [courses, setCourses] = React.useState([]);
  const [trackings, setTrackings] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/courses`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        const responseTracking = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/trackings/user/${auth?.user?.id}/lenght/courseIds`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setTrackings(responseTracking.data);
        const updatedCourses = async () => {
          try {
            if (response.data) {
              const updatedData = await Promise.all(
                response.data.map(async (course) => {
                  if (!course.imageUrl) return course;
                  const url = await getFileS3Url(course.imageUrl);

                  return { ...course, imageUrl: url };
                })
              );
              setCourses(updatedData);
            } else {
              console.error(
                'Error updating courses: response.data is null or undefined'
              );
            }
          } catch (error) {
            console.error('Error updating courses:', error);
          }
        };

        updatedCourses();
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    if (auth?.token) {
      fetchData();
    }
  }, [auth?.token]);
  return (
    <React.Fragment>
      <Greeting />

      <div className="flex gap-5 flex-wrap justify-start  ">
        {courses.map((course: any) =>
          course.isPublished ? (
            <div
              key={course.id}
              className="w-[400px] min-w-[250px] h-[520px]  bg-slate-100 shadow-lg hover:shadow-slate-400  shadow-slate-300 rounded-3xl transition ease-in-out duration-500"
            >
              <div>
                <div className="flex justify-between">
                  <>
                    {course.imageUrl ? (
                      <div className="flex flex-col w-full">
                        <img
                          className=" w-full h-[200px] object-fill flex justify-center items-center rounded-t-3xl "
                          src={course.imageUrl}
                          alt="course"
                        />
                        {trackings.map((tracking: any) => {
                          if (tracking.courseId === course.id) {
                            return (
                              <Progress
                                className="rounded-t-3xl"
                                key={tracking.courseId}
                                value={
                                  (tracking.count / course.chapters.length) *
                                  100
                                }
                              />
                            );
                          } else {
                            return (
                              <Progress
                                className="rounded-t-3xl"
                                key={'yok'}
                                value={0}
                              />
                            );
                          }
                        })}
                      </div>
                    ) : (
                      <div className="h-[200px] w-full bg-slate-100 flex items-center justify-center rounded-3xl ">
                        <Image color="grey" size={40} />
                      </div>
                    )}
                  </>
                </div>
              </div>
              <div className="flex flex-col justify-between h-[320px] p-5 pt-3 gap-y-3 ">
                <h2 className="text-blue-950 text-3xl"> {course.title}</h2>
                <ScrollArea className=" border-0 h-[110px] w-[350px] rounded-md   text-xs text-blue-900">
                  {course.description}
                </ScrollArea>
                <div>
                  <span className="mb-2 text-blue-800 flex flex-row flex-nowrap gap-x-1">
                    <Book /> {course.chapters?.length} ders{' '}
                    {trackings.map((tracking: any) => {
                      if (
                        tracking.courseId === course.id &&
                        tracking.count === course.chapters.length
                      ) {
                        return (
                          <CheckCircle
                            key={tracking.courseId}
                            size={24}
                            className="text-green-500"
                          />
                        );
                      }
                    })}
                  </span>
                  <Link
                    className="hover:cursor-pointer"
                    href={`/${course.id}`}
                  >
                    <Button
                      size="custom"
                      variant="custom"
                      className="  flex w-full"
                    >
                      Kursa Katıl
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </React.Fragment>
  );
};
export default CoursesPage;
