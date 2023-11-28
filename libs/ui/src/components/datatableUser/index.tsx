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
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/roleUser`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      console.log('response', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching course data:', error);
      throw error;
    }
  };

  useEffect(() => {
    getData();
  }, [auth?.token]);

  return (
    <DataTableComps columns={columns} data={data} />
  );
}
