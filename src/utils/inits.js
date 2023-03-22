import _ from "lodash"
import store from '@/store';

export const initLocationData = (urlSearch) => {
  let urlArr
  try {
    urlArr = _.split(_.trim(decodeURI(urlSearch), '?'), '&')
  } catch (err) {
    //URL中的中文字符必须通过java.net.URLEncoder.encode("中文", "UTF-8")编码
    throw new Error(`解析URL"${urlSearch}"时发生错误: ${err}`)
  }

  let urlMap = {}
  for (let j = 0, len = urlArr.length; j < len; j++) {
    const parArr = _.split(urlArr[j], '=')
    if (parArr.length > 0) {
      const key = parArr[0] === 'menuname' ? 'title' : parArr[0]
      urlMap[key] = parArr[1]
    }
  }

  //设置到浏览器页签
  const title = urlMap.title
  if (title) {
    document.title = title
  }
  console.log(urlMap, 9999)
  store.commit('app/SET_LOCATION_DATA', urlMap)
}
