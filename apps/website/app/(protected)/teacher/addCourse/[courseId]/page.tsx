import React from 'react';
import CoursesUpdatePage from '../../_comps/coursesUpdatePage';

const AddCourses = ({ params }: { params: { courseId: string } }) => {
  return <CoursesUpdatePage params={params}/>;
};

export default AddCourses;
