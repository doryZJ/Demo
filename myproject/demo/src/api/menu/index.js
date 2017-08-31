import Axios from '../index.js'

const MENUURL = 'menus?application=1&level=1'
const LEVEL_MENU_URL = 'menus?application=1&level=2'
const SON_MENU_URL = 'menus?application=1&pid='
const ALLMENUURL = 'e-commerce/f/menu'

function getLevelOne() {
  return Axios.get(MENUURL)
}
function getLevelTwo() {
  return Axios.get(LEVEL_MENU_URL)
}
function getMenuByPid(pid) {
  return Axios.get(SON_MENU_URL + pid)
}
function getMenu(pid){
  return Axios.post(ALLMENUURL,{'pid': pid})
}
export {
  getLevelOne,
  getLevelTwo,
  getMenuByPid,
  getMenu
}
