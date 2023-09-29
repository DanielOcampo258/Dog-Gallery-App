import React from 'react'

const ErrorComponent = ({text}) => {
  return (
    <article className='flex flex-col w-10/12 items-center text-center gap-3'>
      <h1 className='text-lg font-bold md:text-xl lg:text-3xl'>{text}</h1>
      <h2 className='text-base md:text-xl '>Please refresh and try again!</h2>
      </article>
  )
}

export default ErrorComponent