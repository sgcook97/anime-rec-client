import React from 'react'
import Image from 'next/image'

export default function FrontPage(props : any) {
  return (
    <>
        <Image
            className='bg-img'
            src='/samnroll-background.jpeg'
            alt='...'
            fill={true}
            objectFit='cover'
        />
        <div className='front-page-content'>
            <h1 className='front-page-heading'>SamnRoll</h1>
            <button className='enter-button' onClick={props.ToggleFrontPage}>
                Enter
            </button>
        </div>
    </>
  )
}
