import {
  CopyOutlined,
  // EditOutlined,
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
  showRenameModal,
  prefix,
  refetch
}: {
  type: string
  link: string
  showRenameModal: (data: any) => void
  refetch: any
  prefix: string
}) => {
  return (
    <React.Fragment>
      <Dropdown
        overlay={() => (
          <MenuItems {...{ type, link, prefix, refetch, showRenameModal }} />
        )}
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
  showRenameModal,
  prefix,
  refetch
}: {
  type: string
  link: string
  showRenameModal: any
  prefix: string
  refetch: any
}) => {
  const { deletePath, onCopy }: any = Actions.get()
  let lists = [
    {
      icon: <CopyOutlined />,
      label: 'Copy',
      key: 0
    },
    // {
    //   icon: <EditOutlined />,
    //   label: 'Rename',
    //   key: 1
    // },
    {
      icon: <DeleteOutlined />,
      label: 'Delete',
      key: 2
    }
  ]
  if (type === 'folder') {
    // delete lists[0]
    // delete lists[2]
    lists = []
  }
  const onClick = async ({ key }: any) => {
    if (Number(key) === 0) {
      if (onCopy) {
        onCopy(link)
      }
      CopyToClipboard(link)
      message.info('Copied to clipboard')
    }
    if (Number(key) === 2) {
      const confirmation = confirm('Are you sure you want to remove ?')
      if (confirmation) {
        alert(prefix)
        await deletePath(prefix)
        setTimeout(() => {
          refetch()
        }, 1000)
      }
    }
    if (Number(key) === 1) {
      showRenameModal()
    }
  }
  return <Menu items={lists} onClick={onClick} />
}

export default MenuOption
