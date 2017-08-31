import instance from '../index.js'

function getLanguage(){
  return instance.get('/languages')
}
export default getLanguage
