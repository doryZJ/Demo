import Axios from '../index'
const uploadPath = 'upload.php'
function uploadFile(upfile){
	Axios.post(uploadPath,upfile)
}
export {
	uploadFile
}