import { Input, Modal } from 'antd'
import React, { useRef, useState } from 'react'
import { Actions, GetFileExtension } from '../utilities/helper'

const RenameModal = ({
  details,
  setRenameDetails
}: {
  details: any
  setRenameDetails: any
}) => {
  const inputRef: any = useRef(null)
  const { renamePath }: any = Actions.get()
  const { _show, data } = details
  const { type, title, link } = data
  const ext = type === 'image' || type === 'file' ? GetFileExtension(title) : ''
  const fileName = data?.title.replace(ext, '')
  const [confirmLoading, setConfirmLoading] = useState(false)
  const handleOk = async () => {
    const confirmation = confirm('Are you sure you want to rename ?')
    if (!confirmation) return
    setConfirmLoading(true)
    await renamePath(link, `${inputRef.current}${ext}`)
    setRenameDetails({ _show: false, data: {} })
    setConfirmLoading(false)
  }

  const handleCancel = () => {
    setRenameDetails({ _show: false, data: {} })
  }

  return (
    <Modal
      title='Rename'
      visible={_show}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Input
        addonAfter={ext}
        defaultValue={fileName}
        autoFocus
        onChange={(e) => (inputRef.current = e.currentTarget.value)}
      />
    </Modal>
  )
}

export default RenameModal
