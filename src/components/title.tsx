import React from 'react'
import { Typography } from 'antd'
const FileFolderTitle = ({ title }: { title: string }) => {
  return (
    <Typography.Paragraph
      title={title}
      ellipsis={{ rows: 1 }}
      style={{
        margin: 0,
        height: 30,
        padding: '4px 6px',
        fontSize: 12,
        lineHeight: '22px',
        fontWeight: 500,
        textAlign: 'center'
      }}
    >
      {title}
    </Typography.Paragraph>
  )
}

export default FileFolderTitle
