import React from 'react'

interface HeadingProps {
  title: string;
  textColor?: string;
}

const Heading = ({ 
  title, 
  textColor = "text-white" 
}: HeadingProps) => {
  return (
    <h2 className={`${textColor} text-7xl font-extrabold text-center mt-20 max-lg:text-5xl`}>
      {title}
    </h2>
  )
}

export default Heading
