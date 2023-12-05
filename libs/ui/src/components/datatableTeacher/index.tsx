'use client';

import React, { useState, useEffect } from 'react';
import { DataTableComps } from './table';
import { Payment, columns } from './columns';
import axios from 'axios';
import { useAuth } from 'apps/website/hooks/useAuth';
import { getFileS3Url } from '@/s3';
export default function Datatable() {
  const [data, setData] = useState<Payment[]>([]);
  const [categories, setCategories] = useState<any[]>([]); // any tipi kullanıldı, gerçek tipinize uygun bir tip kullanmalısınız
  const auth: any = useAuth();

  const getData = async () => {
    if (!auth?.token) return;

    try {
      // Kategorileri çek
      const responseCategories = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      setCategories(responseCategories.data);

      // Kursları çek
      const responseCourses = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/courses`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (responseCourses.data) {
        const updatedData = await Promise.all(
          responseCourses.data.map(async (course) => {
            const categoryId = course.categoryId;
            const matchingCategory = responseCategories.data.find(
              (category) => category.id === categoryId
            );

            let updatedCourse = { ...course };

            // Update categoryName
            updatedCourse.categoryName = matchingCategory
              ? matchingCategory.name
              : 'Kategori bulunamadı...';

            // Update imageUrl if it exists
            if (course.imageUrl) {
              updatedCourse.imageUrl = await getFileS3Url(course.imageUrl);
            }

            return updatedCourse;
          })
        );

        setData(updatedData);
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
      throw error;
    }
  };

  useEffect(() => {
    getData();
  }, [auth?.token]);

  return (
    <DataTableComps columns={columns} data={data} categories={categories} />
  );
}
