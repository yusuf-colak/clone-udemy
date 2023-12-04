'use client';
import { useAuth } from 'apps/website/hooks/useAuth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EntriesMain = () => {
  const auth: any = useAuth();

  const [completeCourse, setCompleteCourse] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseChapterLenght = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/chapters/lenght`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        const responseTrackingLenght = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/trackings/user/${auth?.user?.id}/lenght`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        setCompleteCourse(
          responseChapterLenght.data == responseTrackingLenght.data
            ? true
            : false
        );
      } catch (error) {
        console.error('Error updating courses:', error);
      }
    };

    if (auth?.token) {
      fetchData();
    }
  }, [auth?.token]);

  return (
    <React.Fragment>
      {completeCourse ? (
        <div>Girişler Sayfası Açık durumda tüm kurslar tamamlanmış...</div>
      ) : (
        <div>Girişler Sayfası Kapalı durumda tüm kurslar tamamlanmamış...</div>
      )}
    </React.Fragment>
  );
};

export default EntriesMain;
