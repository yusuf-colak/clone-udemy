'use client';
import { useAuth } from 'apps/website/hooks/useAuth';
import axios from 'axios';
import { FileUp, LayoutDashboard } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { IconBadge } from '@/libs/ui/components/icon-badge';
import TitleFrom from './_comps/titleFrom';
import { DescriptionForm } from './_comps/description-form';
import { CategoryForm } from './_comps/category-form';
import { ImageForm } from './_comps/image-form';
import { ChaptersForm } from './_comps/chapters-form';
import { AttachmentForm } from './_comps/attachmentFrom';
const CourseId = ({ params }: { params: { courseId: string } }) => {
  const [courseData, setCourseData] = useState<any | null>();
  const [categories, setCategories] = useState<any | null>();
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
  console.log(courseData);
  const requiredFields = [
    courseData?.title,
    courseData?.description,
    courseData?.imageUrl,
    courseData?.price,
    courseData?.categoryId,
  ];

  const totalFields = requiredFields.length;
  const compeltedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${compeltedFields}/${totalFields}) `;

  return (
    <React.Fragment>
      {courseData && (
        <main className="p-6">
          <div className="flex  items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Kurs kurulumu</h1>
              <span className="text-sm text-slate-700">
                Tüm alanları tamamlayın {completionText}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Kursunuzu özelleştirin</h2>
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
                  <h2 className="text-xl">Video ve Dosyaları Düzenleyin</h2>
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

export default CourseId;
