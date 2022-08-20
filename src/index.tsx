import { Button, Modal } from 'antd'
import * as React from 'react'
import {
  useQuery,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import 'antd/dist/antd.css'
import { Actions, BeautifyData } from './utilities/helper'
import { Loading } from './components'
import { Lists, ModalTitle } from './elements'
// eslint-disable-next-line no-unused-vars
import { BreadCumbType, CreateType, listType } from './types'

interface ReactFileManagerProps {
  visible: boolean
  getList: (path: string) => Promise<any>
  deletePath: (path: string) => Promise<any>
  renamePath: (path: string, newFileName: string) => Promise<any>
  create: (payload: CreateType) => Promise<any>
  onClose: () => void
}
const queryClient = new QueryClient()
export const ReactFileManager = ({
  visible,
  onClose,
  getList,
  renamePath,
  deletePath,
  create
}: ReactFileManagerProps) => {
  React.useLayoutEffect(() => {
    Actions.set({ getList, deletePath, renamePath, onClose, create })
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <Body {...{ visible }} key={`${visible}-file-manager-body`} />
      <React.Fragment />
    </QueryClientProvider>
  )
}

const Body = ({ visible }: { visible: boolean }) => {
  const { getList, onClose }: any = Actions.get()
  const [isVisible, setVisible] = React.useState<boolean>(visible)
  const [breadCumbLists, setBreadCumbLists] = React.useState<
    Array<BreadCumbType>
  >([
    {
      title: 'Home',
      link: '/'
    }
  ])
  const [queryKey, setQueryKey] = React.useState<string>('/')
  const { isLoading, data }: any = useQuery([queryKey], () => {
    return visible ? getList(queryKey) : new Promise((resolve) => resolve(null))
  })
  const handleModalCancel = () => {
    setVisible(false)
    onClose()
  }
  const updateBreadBumbIndex = (title: string, link: string) => {
    const newBread: any = [...breadCumbLists, { title, link }]
    let path: string = ''
    newBread.forEach((item: any, index: number) => {
      if (index > 0) {
        path += (index > 1 ? '/' : '') + item.title
      }
    })
    setBreadCumbLists(newBread)
    setQueryKey('/' + encodeURIComponent(path))
  }
  const toggleBreadCumbIndex = (index: number) => {
    const filteredBreadCumb = breadCumbLists.filter((_, i) => i <= index)
    let path: string = ''
    filteredBreadCumb.forEach((item: any, index: number) => {
      if (index > 0) {
        path += (index > 1 ? '/' : '') + item.title
      }
    })
    setBreadCumbLists(filteredBreadCumb)
    setQueryKey('/' + encodeURIComponent(path))
  }
  const lists: listType[] = data ? BeautifyData(data) : []

  return (
    <Modal
      visible={isVisible}
      width='90%'
      onCancel={handleModalCancel}
      closable={false}
      title={<ModalTitle {...{ breadCumbLists, toggleBreadCumbIndex }} />}
      footer={[
        <Button key='back' onClick={handleModalCancel}>
          CLOSE
        </Button>
      ]}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Lists data={lists} {...{ updateBreadBumbIndex }} />
      )}
    </Modal>
  )
}
