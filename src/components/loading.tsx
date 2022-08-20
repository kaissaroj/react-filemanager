import { Spin } from 'antd'
import React from 'react'

const ContainerStyle = {
  height: '200px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
export default function Loading() {
  return (
    <div style={ContainerStyle}>
      <Spin size='large' />
    </div>
  )
}
