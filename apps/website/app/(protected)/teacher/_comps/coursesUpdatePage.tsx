'use client';
import { useAuth } from 'apps/website/hooks/useAuth';
import axios from 'axios';
import { LayoutDashboard } from 'lucide-react';

import React, { useEffect, useState } from 'react';

import { IconBadge } from '@/libs/ui/components/icon-badge';
import TitleFrom from '../_comps/titleComps/titleFrom';
import { DescriptionForm } from '../_comps/descriptionComps/description-form';
import { CategoryForm } from '../_comps/categoryComps/category-form';
import { ImageForm } from '../_comps/imageComps/image-form';
import { AttachmentForm } from '../_comps/attachmentComps/attachmentFrom';
import PublishSwitch from '../_comps/publishSwitchComps/publishSwitch';
import { ChaptersForm } from './chapterForm/chapters-form';
import { toast } from 'react-hot-toast';
const CoursesUpdatePage = ({ params }) => {
  const [courseData, setCourseData] = useState<any | null>();
  const [categories, setCategories] = useState<any | null>();
  const [completedFields, setCompletedFields] = useState<number>(1);
  const auth: any = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/${params.courseId}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        const responseCategories = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setCategories(responseCategories.data);
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    if (auth?.token) {
      fetchData();
    }
  }, [auth?.token, params.courseId]);

  const totalFields = 5;

  useEffect(() => {
    const requiredFields = [
      courseData?.title,
      courseData?.description,
      courseData?.imageUrl,
      courseData?.chapters?.length > 0,
      courseData?.categoryId,
    ];

    setCompletedFields(requiredFields.filter(Boolean).length);
  }, [courseData]);

  return (
    <React.Fragment>
      {courseData && (
        <main className="lg:p-6 p-2">
          <div className="flex  items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">
                {/* Kurs kurulumu */}
                Kursaufbau
              </h1>
              <span className="text-sm text-slate-700">
                Füllen Sie alle Felder aus ({completedFields}/{totalFields})
              </span>
            </div>
            <PublishSwitch
              courseData={courseData}
              setCourseData={setCourseData}
              courseId={params.courseId}
              totalFields={totalFields}
              completedFields={completedFields}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Passen Sie Ihren Kurs an</h2>
              </div>
              <TitleFrom
                courseData={courseData}
                setCourseData={setCourseData}
                courseId={params.courseId}
              />
              <DescriptionForm
                courseData={courseData}
                setCourseData={setCourseData}
                courseId={params.courseId}
              />
              <ImageForm
                courseData={courseData}
                setCourseData={setCourseData}
                courseId={params.courseId}
              />

              <CategoryForm
                courseData={courseData}
                setCourseData={setCourseData}
                courseId={params.courseId}
                options={categories?.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
              />
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Bearbeiten Sie Videos und Dateien</h2>
                </div>
                <ChaptersForm
                  setCourseData={setCourseData}
                  courseData={courseData}
                  courseId={params.courseId}
                />
                <AttachmentForm
                  setCourseData={setCourseData}
                  courseData={courseData}
                  courseId={params.courseId}
                />
              </div>
            </div>
          </div>
        </main>
      )}
    </React.Fragment>
  );
};

export default CoursesUpdatePage;
