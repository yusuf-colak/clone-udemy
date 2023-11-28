import React from 'react';

const CoursesCreateUpdatePage = ({
  params,
}: {
  params: { userId: string };
}) => {
  return <div>İd:{params.userId}</div>;
};

export default CoursesCreateUpdatePage;
