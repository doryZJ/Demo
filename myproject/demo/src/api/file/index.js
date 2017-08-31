import instance from '../index'

const  UPLOADFILEURL = '/files/upload'
const  deletePicUrl = '/files'

export default {
  uploadFile(file) {
    return instance.post(UPLOADFILEURL, file)
  },
  deleteImage (uuid) {
    return instance.delete(deletePicUrl, { params: {
      url: uuid
    }})
  }
}