import { Spin, Image, Dropdown, Menu, message, Typography, Modal, Input, List, Breadcrumb, Button } from 'antd';
import React__default, { useRef, useState, useLayoutEffect, createElement, Fragment } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import 'antd/dist/antd.css';
import { FolderFilled, FileFilled, MoreOutlined, CopyOutlined, EditOutlined, DeleteOutlined, PlusSquareOutlined, UploadOutlined } from '@ant-design/icons';

function GetFileNameFromLink(link) {
  const fileName = link.split('/').pop();
  return fileName;
}
function IsImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
const Actions = {
  actions: {},

  set(actions) {
    this.actions = actions;
  },

  get() {
    return this.actions;
  }

};
function CopyToClipboard(value) {
  const textArea = document.createElement('textarea');
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
}
function BeautifyData(responseData) {
  const {
    status,
    data
  } = responseData;
  let lists = [];

  if (status) {
    lists = data.map(list => {
      return { ...list,
        title: GetFileNameFromLink(list.link),
        type: IsImage(list.link) ? 'image' : list.type
      };
    });
  } else {
    console.error(responseData);
    throw Error('Failed to retrieve data');
  }

  return lists;
}
function GetFileExtension(link) {
  var doc = link.substring(link.lastIndexOf('/'));
  return doc.substring(doc.lastIndexOf('.'));
}

const ContainerStyle = {
  height: '200px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
function Loading() {
  return React__default.createElement("div", {
    style: ContainerStyle
  }, React__default.createElement(Spin, {
    size: 'large'
  }));
}

const styles = {
  fontSize: 50,
  color: '#3399ff'
};
function Folder() {
  return React__default.createElement(FolderFilled, {
    style: styles,
    className: 'fm-item-icon'
  });
}

const styles$1 = {
  fontSize: 35,
  color: '#fa7125'
};
function File() {
  return React__default.createElement(FileFilled, {
    style: styles$1,
    className: 'fm-item-icon'
  });
}

const imageStyle = {
  borderRadius: '4px'
};
function ImageFile({
  src
}) {
  return React__default.createElement("div", null, React__default.createElement(Image, {
    style: imageStyle,
    width: 65,
    height: 50,
    src: src,
    alt: ''
  }));
}

var styles$2 = {"fmItem":"_styles-module__fmItem__3AgOk","fmItemContainer":"_styles-module__fmItemContainer__3uMId","fmItemMenuIcon":"_styles-module__fmItemMenuIcon__33CL5","fmItemName":"_styles-module__fmItemName__39AR9","loader":"_styles-module__loader__3qqrl"};

const MenuOption = ({
  type,
  link,
  showRenameModal
}) => {
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Dropdown, {
    overlay: () => React__default.createElement(MenuItems, Object.assign({}, {
      type,
      link,
      showRenameModal
    })),
    trigger: ['click'],
    placement: 'bottomRight'
  }, React__default.createElement("div", {
    className: styles$2.fmItemMenuIcon
  }, React__default.createElement(MoreOutlined, null))));
};

const MenuItems = ({
  type,
  link,
  showRenameModal
}) => {
  const {
    deletePath
  } = Actions.get();
  const lists = [{
    icon: React__default.createElement(CopyOutlined, null),
    label: 'Copy',
    key: 0
  }, {
    icon: React__default.createElement(EditOutlined, null),
    label: 'Rename',
    key: 1
  }, {
    icon: React__default.createElement(DeleteOutlined, null),
    label: 'Delete',
    key: 2
  }];

  if (type === 'folder') {
    delete lists[0];
  }

  const onClick = async ({
    key
  }) => {
    if (Number(key) === 0) {
      CopyToClipboard(link);
      message.info('Copied to clipboard');
    }

    if (Number(key) === 2) {
      const confirmation = confirm('Are you sure you want to remove ?');

      if (confirmation) {
        await deletePath(link);
      }
    }

    if (Number(key) === 1) {
      showRenameModal();
    }
  };

  return React__default.createElement(Menu, {
    items: lists,
    onClick: onClick
  });
};

const FileFolderTitle = ({
  title
}) => {
  return React__default.createElement(Typography.Paragraph, {
    title: title,
    ellipsis: {
      rows: 1
    },
    style: {
      margin: 0,
      height: 30,
      padding: '4px 6px',
      fontSize: 12,
      lineHeight: '22px',
      fontWeight: 500,
      textAlign: 'center'
    }
  }, title);
};

const RenameModal = ({
  details,
  setRenameDetails
}) => {
  const inputRef = useRef(null);
  const {
    renamePath
  } = Actions.get();
  const {
    _show,
    data
  } = details;
  const {
    type,
    title,
    link
  } = data;
  const ext = type === 'image' || type === 'file' ? GetFileExtension(title) : '';
  const fileName = data === null || data === void 0 ? void 0 : data.title.replace(ext, '');
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    const confirmation = confirm('Are you sure you want to rename ?');
    if (!confirmation) return;
    setConfirmLoading(true);
    await renamePath(link, `${inputRef.current}${ext}`);
    setRenameDetails({
      _show: false,
      data: {}
    });
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setRenameDetails({
      _show: false,
      data: {}
    });
  };

  return React__default.createElement(Modal, {
    title: 'Rename',
    visible: _show,
    onOk: handleOk,
    confirmLoading: confirmLoading,
    onCancel: handleCancel
  }, React__default.createElement(Input, {
    addonAfter: ext,
    defaultValue: fileName,
    autoFocus: true,
    onChange: e => inputRef.current = e.currentTarget.value
  }));
};

function Lists({
  data,
  updateBreadBumbIndex
}) {
  const [renameDetails, setRenameDetails] = useState({
    _show: false,
    data: {}
  });

  function showRenameModal(data) {
    setRenameDetails({
      _show: true,
      data
    });
  }

  return React__default.createElement(React__default.Fragment, null, React__default.createElement(List, {
    grid: {
      gutter: 16,
      xs: 3,
      sm: 4,
      md: 5,
      lg: 6,
      xl: 8,
      xxl: 9
    },
    dataSource: data,
    renderItem: ({
      type,
      title,
      link
    }) => React__default.createElement(List.Item, null, React__default.createElement("div", {
      className: styles$2.fmItem
    }, React__default.createElement("div", {
      className: styles$2.fmItemContainer
    }, type === 'folder' ? React__default.createElement("span", {
      onClick: () => updateBreadBumbIndex(title, link),
      style: {
        cursor: 'pointer'
      }
    }, React__default.createElement(Folder, null)) : type === 'file' ? React__default.createElement(File, null) : React__default.createElement("div", null, React__default.createElement(ImageFile, {
      src: link
    }))), React__default.createElement(MenuOption, Object.assign({}, {
      type,
      link
    }, {
      showRenameModal: () => showRenameModal({
        type,
        title,
        link
      })
    })), React__default.createElement(FileFolderTitle, Object.assign({}, {
      title
    }))))
  }), renameDetails !== null && renameDetails !== void 0 && renameDetails._show ? React__default.createElement(RenameModal, {
    details: renameDetails,
    key: `${renameDetails === null || renameDetails === void 0 ? void 0 : renameDetails._show}-rename-modal`,
    setRenameDetails: setRenameDetails
  }) : React__default.createElement(React__default.Fragment, null));
}

const ModalTitle = ({
  toggleBreadCumbIndex,
  breadCumbLists
}) => {
  const selectInputRef = useRef(null);
  const {
    create
  } = Actions.get();

  const handleChangeFile = async event => {
    const link = breadCumbLists[breadCumbLists.length - 1].link;
    const file = event.target.files[0];
    const fileExtension = file === null || file === void 0 ? void 0 : file.type.split('/')[1];
    const payload = {
      name: file === null || file === void 0 ? void 0 : file.name.replace('.' + fileExtension, ''),
      type: 'FILE',
      location: link,
      file: file
    };
    const response = await create(payload);

    if (response !== null && response !== void 0 && response.status) {
      alert('File Successfully uploaded');
    } else {
      alert('File upload failed');
    }
  };

  const createNewFolder = async () => {
    const link = breadCumbLists[breadCumbLists.length - 1].link;
    const name = prompt('Enter Folder Name');

    if (name && name !== '') {
      const payload = {
        name,
        type: 'FOLDER',
        location: link,
        file: ''
      };
      const response = await create(payload);

      if (response !== null && response !== void 0 && response.status) {
        alert('Folder Successfully created');
      } else {
        alert('Folder create failed');
      }
    }
  };

  return React__default.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  }, React__default.createElement(Breadcrumb, null, breadCumbLists.map(({
    title,
    link
  }, index) => {
    return React__default.createElement(Breadcrumb.Item, {
      key: `${title}-${index}-${link}`
    }, React__default.createElement("span", {
      onClick: () => toggleBreadCumbIndex(index),
      style: {
        cursor: 'pointer'
      }
    }, title));
  })), React__default.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  }, React__default.createElement(Button, {
    icon: React__default.createElement(PlusSquareOutlined, null),
    onClick: () => createNewFolder()
  }, "Create Folder"), React__default.createElement("div", {
    style: {
      marginLeft: '10px'
    }
  }), React__default.createElement(Button, {
    icon: React__default.createElement(UploadOutlined, null),
    onClick: () => {
      var _selectInputRef$curre;

      return selectInputRef === null || selectInputRef === void 0 ? void 0 : (_selectInputRef$curre = selectInputRef.current) === null || _selectInputRef$curre === void 0 ? void 0 : _selectInputRef$curre.click();
    }
  }, "Upload File")), React__default.createElement("input", {
    ref: selectInputRef,
    type: 'file',
    onChange: handleChangeFile,
    style: {
      display: 'none'
    }
  }));
};

const queryClient = new QueryClient();
const ReactFileManager = ({
  visible,
  onClose,
  getList,
  renamePath,
  deletePath,
  create
}) => {
  useLayoutEffect(() => {
    Actions.set({
      getList,
      deletePath,
      renamePath,
      onClose,
      create
    });
  }, []);
  return createElement(QueryClientProvider, {
    client: queryClient
  }, createElement(Body, Object.assign({}, {
    visible
  }, {
    key: `${visible}-file-manager-body`
  })), " :", ' ', createElement(Fragment, null));
};

const Body = ({
  visible
}) => {
  const {
    getList,
    onClose
  } = Actions.get();
  const [isVisible, setVisible] = useState(visible);
  const [breadCumbLists, setBreadCumbLists] = useState([{
    title: 'Home',
    link: '/'
  }]);
  const [queryKey, setQueryKey] = useState('/');
  const {
    isLoading,
    data
  } = useQuery([queryKey], () => {
    return visible ? getList(queryKey) : new Promise(resolve => resolve(null));
  });

  const handleModalCancel = () => {
    setVisible(false);
    onClose();
  };

  const updateBreadBumbIndex = (title, link) => {
    const newBread = [...breadCumbLists, {
      title,
      link
    }];
    let path = '';
    newBread.forEach((item, index) => {
      if (index > 0) {
        path += (index > 1 ? '/' : '') + item.title;
      }
    });
    setBreadCumbLists(newBread);
    setQueryKey('/' + encodeURIComponent(path));
  };

  const toggleBreadCumbIndex = index => {
    const filteredBreadCumb = breadCumbLists.filter((_, i) => i <= index);
    let path = '';
    filteredBreadCumb.forEach((item, index) => {
      if (index > 0) {
        path += (index > 1 ? '/' : '') + item.title;
      }
    });
    setBreadCumbLists(filteredBreadCumb);
    setQueryKey('/' + encodeURIComponent(path));
  };

  const lists = data ? BeautifyData(data) : [];
  return createElement(Modal, {
    visible: isVisible,
    width: '90%',
    onCancel: handleModalCancel,
    closable: false,
    title: createElement(ModalTitle, Object.assign({}, {
      breadCumbLists,
      toggleBreadCumbIndex
    })),
    footer: [createElement(Button, {
      key: 'back',
      onClick: handleModalCancel
    }, "CLOSE")]
  }, isLoading ? createElement(Loading, null) : createElement(Lists, Object.assign({
    data: lists
  }, {
    updateBreadBumbIndex
  })));
};

export { ReactFileManager };
//# sourceMappingURL=index.modern.js.map
