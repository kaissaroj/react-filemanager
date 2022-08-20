import {
  CopyOutlined,
  EditOutlined,
  MoreOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { Dropdown, Menu, message } from 'antd'
import React from 'react'
import styles from '../styles.module.css'
// import { DeleteFileFolder } from '../utilities/apicalls'
import { Actions, CopyToClipboard } from '../utilities/helper'

const MenuOption = ({
  type,
  link,
  showRenameModal
}: {
  type: string
  link: string
  showRenameModal: (data: any) => void
}) => {
  return (
    <React.Fragment>
      <Dropdown
        overlay={() => <MenuItems {...{ type, link, showRenameModal }} />}
        trigger={['click']}
        placement='bottomRight'
      >
        <div className={styles.fmItemMenuIcon}>
          <MoreOutlined />
        </div>
      </Dropdown>
    </React.Fragment>
  )
}
const MenuItems = ({
  type,
  link,
  showRenameModal
}: {
  type: string
  link: string
  showRenameModal: any
}) => {
  const { deletePath }: any = Actions.get()
  const lists = [
    {
      icon: <CopyOutlined />,
      label: 'Copy',
      key: 0
    },
    {
      icon: <EditOutlined />,
      label: 'Rename',
      key: 1
    },
    {
      icon: <DeleteOutlined />,
      label: 'Delete',
      key: 2
    }
  ]
  if (type === 'folder') {
    delete lists[0]
  }
  const onClick = async ({ key }: any) => {
    if (Number(key) === 0) {
      CopyToClipboard(link)
      message.info('Copied to clipboard')
    }
    if (Number(key) === 2) {
      const confirmation = confirm('Are you sure you want to remove ?')
      if (confirmation) {
        await deletePath(link)
      }
    }
    if (Number(key) === 1) {
      showRenameModal()
    }
  }
  return <Menu items={lists} onClick={onClick} />
}

export default MenuOption
