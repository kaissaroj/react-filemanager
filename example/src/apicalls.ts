const endpoint = 'http://localhost:3000/filemanager'

export async function GetLists(path: string = '') {
  const response = {
    status: false,
    data: []
  }
  try {
    const urlEndPoint = path !== '' ? `${endpoint}${path}` : endpoint
    const result = await fetch(urlEndPoint)
    const resultJSON = await result.json()
    response.status = true
    response.data = resultJSON
  } catch (e) {
    console.error(e)
    throw Error(e)
  }
  return response
}
export async function DeleteFileFolder(path: string = '') {
  const response = {
    status: false,
    data: []
  }
  try {
    const urlEndPoint =
      path !== '' ? `${endpoint}/${encodeURIComponent(path)}` : endpoint
    const result = await fetch(urlEndPoint, { method: 'DELETE' })
    const resultJSON = await result.json()
    response.status = true
    response.data = resultJSON
  } catch (e) {
    console.error(e)
    throw Error(e)
  }
  return response
}
export async function RenameFileFolder(path: string = '', newFileName: string) {
  const response = {
    status: false,
    data: []
  }
  try {
    let urlEndPoint =
      path !== '' ? `${endpoint}/${encodeURIComponent(path)}` : endpoint
    urlEndPoint = urlEndPoint + `/${encodeURIComponent(newFileName)}`

    const result = await fetch(urlEndPoint, {
      method: 'PATCH'
    })
    const resultJSON = await result.json()
    response.status = true
    response.data = resultJSON
  } catch (e) {
    console.error(e)
    throw Error(e)
  }
  return response
}
export async function CreateFileFolder(payload: {
  name: string
  type: string
  location: string
  file: File
}) {
  const response = {
    status: false,
    data: []
  }
  try {
    let urlEndPoint = endpoint + '/save'
    const formData = new FormData()
    formData.append('name', payload.name)
    formData.append('type', payload.type)
    formData.append('location', payload.location)
    formData.append('file', payload.file)

    const result = await fetch(urlEndPoint, {
      method: 'POST',
      body: formData
    })
    const resultJSON = await result.json()
    response.status = true
    response.data = resultJSON
  } catch (e) {
    console.error(e)
    throw Error(e)
  }
  return response
}
