import React, { Component, Fragment, useEffect, useRef } from 'react'

const Map = ({
  location,
  zoom = 18,
  link,
}: {
  location: any
  zoom?: number
  link: string
}) => {
  const ref = useRef<any>(null)

  useEffect(() => {
    if (!ref.current) return
  }, [location])
  return (
    <div style={{ width: '100%', height: '100%' }} ref={ref}>
      <iframe
        src={link}
        width="100%"
        height="100%"
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}

export default Map
