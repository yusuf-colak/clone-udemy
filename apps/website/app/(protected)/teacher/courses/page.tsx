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
import { Edit, Image } from 'lucide-react';
import { Button } from '@/libs/ui/components/ui/button';
import { useRouter } from 'next/navigation';
import CourseDeleteButton from '../_comps/courseDeleteButton';
const CoursesEditPage = () => {
  const auth: any = useAuth();
  const [courses, setCourses] = React.useState([]);
  const router = useRouter();
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
      <div className="flex gap-5 flex-wrap  justify-center">
        {courses.map((course: any) => (
          <Card className="max-w-[400px] min-w-[200px]">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <Link
                  className="hover:cursor-pointer"
                  href={`/${course.id}`}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h1 className="max-w-[200px] truncate ...">
                          {course.title}
                        </h1>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p> {course.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                <div>
                  <Button
                    className="rounded-full"
                    size="sm"
                    onClick={() => {
                      router.push(`courses/${course.id}`);
                    }}
                    variant="ghost"
                  >
                    <Edit />
                  </Button>
                  <CourseDeleteButton
                    courseId={course.id}
                    setCourses={setCourses}
                  />
                </div>
              </CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                className="hover:cursor-pointer"
                href={`/${course.id}`}
              >
                {course.imageUrl ? (
                  <img
                    className="h-[300px] w-[300px] object-cover"
                    src={course.imageUrl}
                    alt="course"
                  />
                ) : (
                  <div className="h-[300px] w-[300px] bg-slate-100 flex items-center justify-center rounded-xl">
                    <Image color="grey" size={40} />
                  </div>
                )}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </React.Fragment>
  );
};

export default CoursesEditPage;
