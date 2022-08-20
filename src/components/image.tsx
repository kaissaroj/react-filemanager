import { Image } from 'antd'
import React from 'react'

const imageStyle = {
  borderRadius: '4px'
}
export default function ImageFile({ src }: { src: string }) {
  return (
    <div>
      <Image style={imageStyle} width={65} height={50} src={src} alt='' />
    </div>
  )
}
