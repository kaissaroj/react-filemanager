export function GetFileNameFromLink(link: string) {
  const fileName = link.split('/').pop()
  return fileName
}
export function IsImage(url: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
}
export const Actions = {
  actions: {},
  set(actions: any) {
    this.actions = actions
  },
  get() {
    return this.actions
  }
}
export function CopyToClipboard(value: any) {
  const textArea = document.createElement('textarea')
  textArea.value = value
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  textArea.remove()
}
export function BeautifyData(responseData: any) {
  const { status, data } = responseData
  let lists = []
  if (status) {
    lists = data.map((list: any) => {
      return {
        ...list,
        title:
          list.type === 'folder' ? list.title : GetFileNameFromLink(list.link),
        type: IsImage(list.link) ? 'image' : list.type
      }
    })
  } else {
    console.error(responseData)
    throw Error('Failed to retrieve data')
  }
  return lists
}
export function GetFileExtension(link: string) {
  var doc = link.substring(link.lastIndexOf('/'))
  return doc.substring(doc.lastIndexOf('.'))
}
