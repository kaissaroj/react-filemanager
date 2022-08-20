import { Breadcrumb, Button } from 'antd'
import React, { useRef } from 'react'
import { PlusSquareOutlined, UploadOutlined } from '@ant-design/icons'
// eslint-disable-next-line no-unused-vars
import { BreadCumbType, CreateType } from '../types'
import { Actions } from '../utilities/helper'

interface ModalTitleProps {
  breadCumbLists: BreadCumbType[]
  toggleBreadCumbIndex: (index: number) => void
}
const ModalTitle = ({
  toggleBreadCumbIndex,
  breadCumbLists
}: ModalTitleProps) => {
  const selectInputRef: any = useRef(null)
  const { create }: any = Actions.get()

  const handleChangeFile = async (event: any) => {
    const link = breadCumbLists[breadCumbLists.length - 1].link
    const file = event.target.files[0]
    const fileExtension = file?.type.split('/')[1]
    const payload: CreateType = {
      name: file?.name.replace('.' + fileExtension, ''),
      type: 'FILE',
      location: link,
      file: file
    }
    const response = await create(payload)
    if (response?.status) {
      alert('File Successfully uploaded')
    } else {
      alert('File upload failed')
    }
  }
  const createNewFolder = async () => {
    const link = breadCumbLists[breadCumbLists.length - 1].link
    const name: any = prompt('Enter Folder Name')
    if (name && name !== '') {
      const payload: CreateType = {
        name,
        type: 'FOLDER',
        location: link,
        file: ''
      }
      const response = await create(payload)
      if (response?.status) {
        alert('Folder Successfully created')
      } else {
        alert('Folder create failed')
      }
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <Breadcrumb>
        {breadCumbLists.map(({ title, link }: BreadCumbType, index: number) => {
          return (
            <Breadcrumb.Item key={`${title}-${index}-${link}`}>
              <span
                onClick={() => toggleBreadCumbIndex(index)}
                style={{ cursor: 'pointer' }}
              >
                {title}
              </span>
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Button icon={<PlusSquareOutlined />} onClick={() => createNewFolder()}>
          Create Folder
        </Button>
        <div style={{ marginLeft: '10px' }} />
        <Button
          icon={<UploadOutlined />}
          onClick={() => selectInputRef?.current?.click()}
        >
          Upload File
        </Button>
      </div>
      <input
        ref={selectInputRef}
        type='file'
        onChange={handleChangeFile}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default ModalTitle
