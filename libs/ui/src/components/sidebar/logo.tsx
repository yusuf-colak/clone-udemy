'use client';
import { motion } from 'framer-motion';
import { cn } from '../../utils';
import { useAuth } from 'apps/website/hooks/useAuth';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getFileS3Url } from '@/s3';

const NavbarLogo = ({ controlText, controlLogo }: any) => {
  const [logoAndName, setLogoAndName] = useState(
    localStorage.getItem('logoAndName')
      ? JSON.parse(localStorage.getItem('logoAndName') || '')
      : null
  );

  const auth: any = useAuth();

  const fetchAndSetData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tenants/${auth?.user?.tenantId}/ImageAndName`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      const updatedData = response.data;

      // Update image URL
      getFileS3Url(updatedData.image)
        .then((url) => {
          updatedData.image = url;
        })
        .catch((error) => {
          console.error('Error updating image URL:', error);
        });

      // Check if the data is different from what is in localStorage
      const storedData = localStorage.getItem('logoAndName');
      if (!storedData || JSON.stringify(updatedData) !== storedData) {
        // Update state and localStorage if different
        setLogoAndName(updatedData);
        localStorage.setItem('logoAndName', JSON.stringify(updatedData));
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchAndSetData();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (!localStorage.getItem('logoAndName')) {
      fetchAndSetData();
    }
  }, []);
  useEffect(() => {
    if (logoAndName?.image) {
      getFileS3Url(logoAndName.image).then((url) => {
        setLogoAndName((current) => ({ ...current, image: url }));
      });
    }
  }, [localStorage.getItem('logoAndName')]);

  return (
    <React.Fragment>
      {logoAndName && (
        <motion.div
          animate={controlLogo}
          className={cn('flex w-full items-center lg:mb-6')}
        >
          <img alt="" className="rounded-xl w-[45px]" src={logoAndName.image} />
          <motion.h1 animate={controlText} className="text-2xl font-bold pl-3">
            {logoAndName.name}
          </motion.h1>
        </motion.div>
      )}
    </React.Fragment>
  );
};

export default NavbarLogo;
