import AddCourse from '@/components/Course/AddCourse';

import React from 'react'

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Create Course',
  description: 'Create a new course',
}

const page = () => {
  return (
    <div>
      <div className='px-2'>
        <AddCourse/>
      </div>
    </div>

  )
}

export default page