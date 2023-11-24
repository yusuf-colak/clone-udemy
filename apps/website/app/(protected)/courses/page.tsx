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
        console.log(responseTracking.data);
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
      <div className="flex gap-5 flex-wrap justify-center">
        {courses.map((course: any) =>
          course.isPublished ? (
            <Card key={course.id} className="w-[400px] min-w-[250px]">
              <Link
                className="hover:cursor-pointer"
                href={`/courses/${course.id}`}
              >
                {trackings.map((tracking: any) => {
                  if (tracking.courseId === course.id) {
                    return (
                      <>
                        <Progress
                          key={tracking.courseId}
                          value={
                            (tracking.count / course.chapters.length) * 100
                          }
                        />
                      </>
                    );
                  }
                })}
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <>
                      {course.imageUrl ? (
                        <img
                          className="h-[100px] w-[300px] object-contain"
                          src={course.imageUrl}
                          alt="course"
                        />
                      ) : (
                        <div className="h-[100px] w-[300px] bg-slate-100 flex items-center justify-center rounded-xl">
                          <Image color="grey" size={40} />
                        </div>
                      )}
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
                    </>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h1 className="w-[330px] truncate ... text-2xl">
                          {course.title}
                        </h1>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p> {course.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <CardDescription className="text-xs">
                    {course.description}
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>
          ) : null
        )}
      </div>
    </React.Fragment>
  );
};
export default CoursesPage;
