import React from 'react'

function Footer() {
    const date = new Date()
    const getCurrentYear = date.getFullYear()
  return (
    <div className='py-3 text-white text-center bg-dark'>All Rights Reserved &reg; {getCurrentYear}</div>
  )
}

export default Footer