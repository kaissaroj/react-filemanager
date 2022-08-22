import React, { useState } from 'react'
import { ReactFileManager } from 'react-filemanager'
import 'react-filemanager/dist/index.css'
import {
  DeleteFileFolder,
  GetLists,
  RenameFileFolder,
  CreateFileFolder
} from './apicalls'

const App = () => {
  const [_show, setShow] = useState<boolean>(false)
  function onCopy(value: string) {
    alert(value)
  }
  return (
    <>
      <ReactFileManager
        visible={_show}
        onClose={() => setShow(false)}
        getList={GetLists}
        deletePath={DeleteFileFolder}
        renamePath={RenameFileFolder}
        create={CreateFileFolder}
        onCopy={onCopy}
      />
      <button onClick={() => setShow(true)}>Open</button>
      <input type={'text'} id='text' />
    </>
  )
}

export default App
