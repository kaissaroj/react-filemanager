import React, { useState } from 'react'
import { List } from 'antd'
import {
  File,
  FileFolderTitle,
  Folder,
  ImageFile,
  MenuOption,
  RenameModal
} from '../components'
// eslint-disable-next-line no-unused-vars
import { listType } from '../types'
import styles from '../styles.module.css'

interface ListProps {
  data: listType[]
  updateBreadBumbIndex: (title: string, link: string) => void
  refetch: any
}
export default function Lists({
  data,
  refetch,
  updateBreadBumbIndex
}: ListProps) {
  const [renameDetails, setRenameDetails] = useState<{
    _show: boolean
    data: {
      title?: string
      link?: string
      type?: string
    }
  }>({
    _show: false,
    data: {}
  })
  function showRenameModal(data: any) {
    setRenameDetails({ _show: true, data })
  }
  return (
    <React.Fragment>
      <List
        grid={{
          gutter: 16,
          xs: 3,
          sm: 4,
          md: 5,
          lg: 6,
          xl: 8,
          xxl: 9
        }}
        dataSource={data}
        renderItem={({ type, title, prefix, link }: any) => (
          <List.Item>
            <div className={styles.fmItem}>
              <div className={styles.fmItemContainer}>
                {type === 'folder' ? (
                  <span
                    onClick={() => updateBreadBumbIndex(title, prefix)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Folder />
                  </span>
                ) : type === 'file' ? (
                  <File />
                ) : (
                  <div>
                    <ImageFile src={link} />
                  </div>
                )}
              </div>
              <MenuOption
                {...{ type, link, prefix, refetch }}
                showRenameModal={() => showRenameModal({ type, title, link })}
              />
              <FileFolderTitle {...{ title }} />
            </div>
          </List.Item>
        )}
      />
      {renameDetails?._show ? (
        <RenameModal
          details={renameDetails}
          key={`${renameDetails?._show}-rename-modal`}
          setRenameDetails={setRenameDetails}
        />
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  )
}
