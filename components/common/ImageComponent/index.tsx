import { useEffect, useRef, useState } from 'react'

const ImageComponent = ({
  src,
  alt,
  classStr,
  onClick = () => {},
}: {
  src: string | null
  alt: string
  classStr?: string
  onClick?: (v: any) => void
}) => {
  const isLoaded = useRef<any>(false)
  // const [poster, setPoster] = useState<any>('')
  // useEffect(() => {
  //   if (!src || isLoaded.current) return
  //   fetch(src)
  //     .then((fetchResponse) => {
  //       if (fetchResponse.ok) {
  //         return fetchResponse
  //       }
  //     })
  //     .then((response: any) => {
  //       if (response) {
  //         return src.includes('svg')
  //           ? response!.arrayBuffer()
  //           : response!.blob()
  //       }
  //     })
  //     .then((imageBlob) => {
  //       if (imageBlob) {
  //         let imageObjectURL: any

  //         if (src.includes('svg')) {
  //           const buffer = new Buffer(imageBlob)
  //           setPoster('data:image/svg+xml;base64,' + buffer.toString('base64'))
  //         } else {
  //           imageObjectURL = URL.createObjectURL(imageBlob)
  //           setPoster(imageObjectURL)
  //         }
  //       }
  //     })
  //     .catch((e) => console.log(e))
  //   isLoaded.current = true
  // }, [src])
  return (
    <img
      src={src?.replaceAll('admin.', '') || ''}
      alt={alt}
      onClick={onClick}
      className={classStr}
    />
  )
}

export default ImageComponent
