# react-filemanager

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-filemanager.svg)](https://www.npmjs.com/package/react-filemanager) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i @kaizer433/react-filemanager
```

## Usage

```tsx
import React, { Component } from 'react'

import { ReactFileManager } from '@kaizer433/react-filemanager'
import '@kaizer433/react-filemanager/dist/index.css'

import {
  DeleteFileFolder,
  GetLists,
  RenameFileFolder,
  CreateFileFolder
} from './api'
class Example extends Component {
  render() {
    return (
      <ReactFileManager
        visible={_show}
        onClose={() => setShow(false)}
        getList={GetLists}
        deletePath={DeleteFileFolder}
        renamePath={RenameFileFolder}
        create={CreateFileFolder}
      />
    )
  }
}
```

## License

MIT © [kaissaroj](https://github.com/kaissaroj)
