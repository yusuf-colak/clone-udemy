import React from 'react';
import CoursesUpdatePage from '../../_comps/coursesUpdatePage';

const CoursesCreateUpdatePage = ({
  params,
}: {
  params: { courseId: string };
}) => {
  return <CoursesUpdatePage params={params} />;
};

export default CoursesCreateUpdatePage;
