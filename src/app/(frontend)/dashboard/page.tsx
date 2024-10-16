"use client"
import AddCourse from '@/components/AddCourse';
import { useSession } from 'next-auth/react'

import React from 'react'

const page = () => {
    const session = useSession();
    
  return (
    <div>
      <div>
        <AddCourse/>
      </div>
    </div>

  )
}

export default page