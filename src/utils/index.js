export function handleNoStringToNull (obj = {}) {
  Object.keys(obj).forEach(key => {
    obj[key] === ''? null : obj[key]
  })
  return obj
}

export function getUrlPrefix() {
  let url = window.location.href
  let urlArr = url.split('/')
  let prefix = urlArr.filter(str => !!str.match(/hesuan/i))[0] || ''
  return prefix
}

