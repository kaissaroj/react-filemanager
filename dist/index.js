function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var antd = require('antd');
var React = require('react');
var React__default = _interopDefault(React);
var reactQuery = require('@tanstack/react-query');
require('antd/dist/antd.css');
var icons = require('@ant-design/icons');

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function GetFileNameFromLink(link) {
  var fileName = link.split('/').pop();
  return fileName;
}
function IsImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
var Actions = {
  actions: {},
  set: function set(actions) {
    this.actions = actions;
  },
  get: function get() {
    return this.actions;
  }
};
function CopyToClipboard(value) {
  var textArea = document.createElement('textarea');
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
}
function BeautifyData(responseData) {
  var status = responseData.status,
      data = responseData.data;
  var lists = [];

  if (status) {
    lists = data.map(function (list) {
      return _extends({}, list, {
        title: GetFileNameFromLink(list.link),
        type: IsImage(list.link) ? 'image' : list.type
      });
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

var ContainerStyle = {
  height: '200px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
function Loading() {
  return React__default.createElement("div", {
    style: ContainerStyle
  }, React__default.createElement(antd.Spin, {
    size: 'large'
  }));
}

var styles = {
  fontSize: 50,
  color: '#3399ff'
};
function Folder() {
  return React__default.createElement(icons.FolderFilled, {
    style: styles,
    className: 'fm-item-icon'
  });
}

var styles$1 = {
  fontSize: 35,
  color: '#fa7125'
};
function File() {
  return React__default.createElement(icons.FileFilled, {
    style: styles$1,
    className: 'fm-item-icon'
  });
}

var imageStyle = {
  borderRadius: '4px'
};
function ImageFile(_ref) {
  var src = _ref.src;
  return React__default.createElement("div", null, React__default.createElement(antd.Image, {
    style: imageStyle,
    width: 65,
    height: 50,
    src: src,
    alt: ''
  }));
}

var styles$2 = {"fmItem":"_styles-module__fmItem__3AgOk","fmItemContainer":"_styles-module__fmItemContainer__3uMId","fmItemMenuIcon":"_styles-module__fmItemMenuIcon__33CL5","fmItemName":"_styles-module__fmItemName__39AR9","loader":"_styles-module__loader__3qqrl"};

var MenuOption = function MenuOption(_ref) {
  var type = _ref.type,
      link = _ref.link,
      showRenameModal = _ref.showRenameModal;
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(antd.Dropdown, {
    overlay: function overlay() {
      return React__default.createElement(MenuItems, Object.assign({}, {
        type: type,
        link: link,
        showRenameModal: showRenameModal
      }));
    },
    trigger: ['click'],
    placement: 'bottomRight'
  }, React__default.createElement("div", {
    className: styles$2.fmItemMenuIcon
  }, React__default.createElement(icons.MoreOutlined, null))));
};

var MenuItems = function MenuItems(_ref2) {
  var type = _ref2.type,
      link = _ref2.link,
      showRenameModal = _ref2.showRenameModal;

  var _Actions$get = Actions.get(),
      deletePath = _Actions$get.deletePath,
      copyId = _Actions$get.copyId;

  var lists = [{
    icon: React__default.createElement(icons.CopyOutlined, null),
    label: 'Copy',
    key: 0
  }, {
    icon: React__default.createElement(icons.EditOutlined, null),
    label: 'Rename',
    key: 1
  }, {
    icon: React__default.createElement(icons.DeleteOutlined, null),
    label: 'Delete',
    key: 2
  }];

  if (type === 'folder') {
    delete lists[0];
  }

  var onClick = function onClick(_ref3) {
    var key = _ref3.key;

    try {
      var _temp4 = function _temp4() {
        if (Number(key) === 1) {
          showRenameModal();
        }
      };

      if (Number(key) === 0) {
        if (copyId) {
          var inputDom = document.getElementById(copyId);
          if (inputDom) inputDom.value = link;
        }

        CopyToClipboard(link);
        antd.message.info('Copied to clipboard');
      }

      var _temp5 = function () {
        if (Number(key) === 2) {
          var confirmation = confirm('Are you sure you want to remove ?');

          var _temp6 = function () {
            if (confirmation) {
              return Promise.resolve(deletePath(link)).then(function () {});
            }
          }();

          if (_temp6 && _temp6.then) return _temp6.then(function () {});
        }
      }();

      return Promise.resolve(_temp5 && _temp5.then ? _temp5.then(_temp4) : _temp4(_temp5));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return React__default.createElement(antd.Menu, {
    items: lists,
    onClick: onClick
  });
};

var FileFolderTitle = function FileFolderTitle(_ref) {
  var title = _ref.title;
  return React__default.createElement(antd.Typography.Paragraph, {
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

var RenameModal = function RenameModal(_ref) {
  var details = _ref.details,
      setRenameDetails = _ref.setRenameDetails;
  var inputRef = React.useRef(null);

  var _Actions$get = Actions.get(),
      renamePath = _Actions$get.renamePath;

  var _show = details._show,
      data = details.data;
  var type = data.type,
      title = data.title,
      link = data.link;
  var ext = type === 'image' || type === 'file' ? GetFileExtension(title) : '';
  var fileName = data === null || data === void 0 ? void 0 : data.title.replace(ext, '');

  var _useState = React.useState(false),
      confirmLoading = _useState[0],
      setConfirmLoading = _useState[1];

  var handleOk = function handleOk() {
    try {
      var confirmation = confirm('Are you sure you want to rename ?');
      if (!confirmation) return Promise.resolve();
      setConfirmLoading(true);
      return Promise.resolve(renamePath(link, "" + inputRef.current + ext)).then(function () {
        setRenameDetails({
          _show: false,
          data: {}
        });
        setConfirmLoading(false);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var handleCancel = function handleCancel() {
    setRenameDetails({
      _show: false,
      data: {}
    });
  };

  return React__default.createElement(antd.Modal, {
    title: 'Rename',
    visible: _show,
    onOk: handleOk,
    confirmLoading: confirmLoading,
    onCancel: handleCancel
  }, React__default.createElement(antd.Input, {
    addonAfter: ext,
    defaultValue: fileName,
    autoFocus: true,
    onChange: function onChange(e) {
      return inputRef.current = e.currentTarget.value;
    }
  }));
};

function Lists(_ref) {
  var data = _ref.data,
      updateBreadBumbIndex = _ref.updateBreadBumbIndex;

  var _useState = React.useState({
    _show: false,
    data: {}
  }),
      renameDetails = _useState[0],
      setRenameDetails = _useState[1];

  function _showRenameModal(data) {
    setRenameDetails({
      _show: true,
      data: data
    });
  }

  return React__default.createElement(React__default.Fragment, null, React__default.createElement(antd.List, {
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
    renderItem: function renderItem(_ref2) {
      var type = _ref2.type,
          title = _ref2.title,
          link = _ref2.link;
      return React__default.createElement(antd.List.Item, null, React__default.createElement("div", {
        className: styles$2.fmItem
      }, React__default.createElement("div", {
        className: styles$2.fmItemContainer
      }, type === 'folder' ? React__default.createElement("span", {
        onClick: function onClick() {
          return updateBreadBumbIndex(title, link);
        },
        style: {
          cursor: 'pointer'
        }
      }, React__default.createElement(Folder, null)) : type === 'file' ? React__default.createElement(File, null) : React__default.createElement("div", null, React__default.createElement(ImageFile, {
        src: link
      }))), React__default.createElement(MenuOption, Object.assign({}, {
        type: type,
        link: link
      }, {
        showRenameModal: function showRenameModal() {
          return _showRenameModal({
            type: type,
            title: title,
            link: link
          });
        }
      })), React__default.createElement(FileFolderTitle, Object.assign({}, {
        title: title
      }))));
    }
  }), renameDetails !== null && renameDetails !== void 0 && renameDetails._show ? React__default.createElement(RenameModal, {
    details: renameDetails,
    key: (renameDetails === null || renameDetails === void 0 ? void 0 : renameDetails._show) + "-rename-modal",
    setRenameDetails: setRenameDetails
  }) : React__default.createElement(React__default.Fragment, null));
}

var ModalTitle = function ModalTitle(_ref) {
  var toggleBreadCumbIndex = _ref.toggleBreadCumbIndex,
      breadCumbLists = _ref.breadCumbLists;
  var selectInputRef = React.useRef(null);

  var _Actions$get = Actions.get(),
      create = _Actions$get.create;

  var handleChangeFile = function handleChangeFile(event) {
    try {
      var link = breadCumbLists[breadCumbLists.length - 1].link;
      var file = event.target.files[0];
      var fileExtension = file === null || file === void 0 ? void 0 : file.type.split('/')[1];
      var payload = {
        name: file === null || file === void 0 ? void 0 : file.name.replace('.' + fileExtension, ''),
        type: 'FILE',
        location: link,
        file: file
      };
      return Promise.resolve(create(payload)).then(function (response) {
        if (response !== null && response !== void 0 && response.status) {
          alert('File Successfully uploaded');
        } else {
          alert('File upload failed');
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var createNewFolder = function createNewFolder() {
    try {
      var link = breadCumbLists[breadCumbLists.length - 1].link;
      var name = prompt('Enter Folder Name');

      var _temp2 = function () {
        if (name && name !== '') {
          var payload = {
            name: name,
            type: 'FOLDER',
            location: link,
            file: ''
          };
          return Promise.resolve(create(payload)).then(function (response) {
            if (response !== null && response !== void 0 && response.status) {
              alert('Folder Successfully created');
            } else {
              alert('Folder create failed');
            }
          });
        }
      }();

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return React__default.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  }, React__default.createElement(antd.Breadcrumb, null, breadCumbLists.map(function (_ref2, index) {
    var title = _ref2.title,
        link = _ref2.link;
    return React__default.createElement(antd.Breadcrumb.Item, {
      key: title + "-" + index + "-" + link
    }, React__default.createElement("span", {
      onClick: function onClick() {
        return toggleBreadCumbIndex(index);
      },
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
  }, React__default.createElement(antd.Button, {
    icon: React__default.createElement(icons.PlusSquareOutlined, null),
    onClick: function onClick() {
      return createNewFolder();
    }
  }, "Create Folder"), React__default.createElement("div", {
    style: {
      marginLeft: '10px'
    }
  }), React__default.createElement(antd.Button, {
    icon: React__default.createElement(icons.UploadOutlined, null),
    onClick: function onClick() {
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

var queryClient = new reactQuery.QueryClient();
var ReactFileManager = function ReactFileManager(_ref) {
  var visible = _ref.visible,
      onClose = _ref.onClose,
      getList = _ref.getList,
      renamePath = _ref.renamePath,
      deletePath = _ref.deletePath,
      create = _ref.create,
      copyId = _ref.copyId;
  React.useLayoutEffect(function () {
    Actions.set({
      getList: getList,
      deletePath: deletePath,
      renamePath: renamePath,
      onClose: onClose,
      create: create,
      copyId: copyId
    });
  }, []);
  return React.createElement(reactQuery.QueryClientProvider, {
    client: queryClient
  }, React.createElement(Body, Object.assign({}, {
    visible: visible
  }, {
    key: visible + "-file-manager-body"
  })), React.createElement(React.Fragment, null));
};

var Body = function Body(_ref2) {
  var visible = _ref2.visible;

  var _Actions$get = Actions.get(),
      getList = _Actions$get.getList,
      onClose = _Actions$get.onClose;

  var _React$useState = React.useState(visible),
      isVisible = _React$useState[0],
      setVisible = _React$useState[1];

  var _React$useState2 = React.useState([{
    title: 'Home',
    link: '/'
  }]),
      breadCumbLists = _React$useState2[0],
      setBreadCumbLists = _React$useState2[1];

  var _React$useState3 = React.useState('/'),
      queryKey = _React$useState3[0],
      setQueryKey = _React$useState3[1];

  var _useQuery = reactQuery.useQuery([queryKey], function () {
    return visible ? getList(queryKey) : new Promise(function (resolve) {
      return resolve(null);
    });
  }),
      isLoading = _useQuery.isLoading,
      data = _useQuery.data;

  var handleModalCancel = function handleModalCancel() {
    setVisible(false);
    onClose();
  };

  var updateBreadBumbIndex = function updateBreadBumbIndex(title, link) {
    var newBread = [].concat(breadCumbLists, [{
      title: title,
      link: link
    }]);
    var path = '';
    newBread.forEach(function (item, index) {
      if (index > 0) {
        path += (index > 1 ? '/' : '') + item.title;
      }
    });
    setBreadCumbLists(newBread);
    setQueryKey('/' + encodeURIComponent(path));
  };

  var toggleBreadCumbIndex = function toggleBreadCumbIndex(index) {
    var filteredBreadCumb = breadCumbLists.filter(function (_, i) {
      return i <= index;
    });
    var path = '';
    filteredBreadCumb.forEach(function (item, index) {
      if (index > 0) {
        path += (index > 1 ? '/' : '') + item.title;
      }
    });
    setBreadCumbLists(filteredBreadCumb);
    setQueryKey('/' + encodeURIComponent(path));
  };

  var lists = data ? BeautifyData(data) : [];
  return React.createElement(antd.Modal, {
    visible: isVisible,
    width: '90%',
    onCancel: handleModalCancel,
    closable: false,
    title: React.createElement(ModalTitle, Object.assign({}, {
      breadCumbLists: breadCumbLists,
      toggleBreadCumbIndex: toggleBreadCumbIndex
    })),
    footer: [React.createElement(antd.Button, {
      key: 'back',
      onClick: handleModalCancel
    }, "CLOSE")]
  }, isLoading ? React.createElement(Loading, null) : React.createElement(Lists, Object.assign({
    data: lists
  }, {
    updateBreadBumbIndex: updateBreadBumbIndex
  })));
};

exports.ReactFileManager = ReactFileManager;
//# sourceMappingURL=index.js.map
