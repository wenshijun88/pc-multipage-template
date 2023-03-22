
const install = function (Vue) {
  // 校验手机号码
  const validatePhone = (rule, value, callback) => {
    value = value || '' // 处理null
    var phone = value.replace(/\s/g, '') // 去除空格
    // 校验手机号，号段主要有(不包括上网卡)：130~139、150~153，155~159，180~189、170~171、176~178。14号段为上网卡专属号段
    const mobRegs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
    const telRegs = /^([0-9]{3,4}-)?[0-9]{7,8}$/
    if (value.length === 0) {
      callback()
    } else {
      if (mobRegs.test(phone) || telRegs.test(phone)) {
        callback()
      } else {
        callback(new Error())
      }
    }
  }
  // 校验数字
  const validateNumber = (rule, value, callback) => {
    if (value === '' || value === 'undefined' || value === undefined) {
      callback()
    } else {
      if (!isNaN(value)) {
        callback()
      } else {
        callback(new Error('数字'))
      }
    }
  }
  // 校验url地址
  const validateURL = (rule, value, callback) => {
    const isUrl = value.search(/^((http)s?):[//][\w]+(\.[\w]+)?$/i)
    if (isUrl > -1) {
      callback()
    } else {
      callback(new Error())
    }
  }

  // 校验多选选框
  const validateCheckGroup = (rule, value, callback) => {
    const length = value.length
    if (length > 0) {
      callback()
    } else {
      callback(new Error())
    }
  }
  // 校验正整数
  const validateInt = (rule, value, callback) => {
    if (Number.isInteger(Number(value))) {
      callback()
    } else {
      callback(new Error())
    }
  }

  Vue.prototype.yy_rules = function (item) {
    let rules = []
    if (item.required) {
      rules.push({
        required: true,
        message: item.msg || '该项为必填项',
        trigger: 'blur'
      })
    }
    if (item.maxLength) {
      rules.push({
        min: 1,
        max: item.maxLength,
        message: '长度有误',
        trigger: 'blur'
      })
    }
    if (item.type) {
      let type = item.type
      switch (type) {
        case 'email':
          rules.push({
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          })
          break
        case 'isNum':
          rules.push({
            validator: validateNumber,
            trigger: 'blur',
            message: '请输入数字'
          })
          break
        case 'isInt':
          rules.push({
            validator: validateInt,
            trigger: 'blur',
            message: '请输入正整数'
          })
          break
        case 'phone':
          rules.push({
            validator: validatePhone,
            message: '号码不合法',
            trigger: 'blur'
          })
          break
        case 'isUrl':
          rules.push({
            validator: validateURL,
            message: 'url不合法',
            trigger: 'blur'
          })
          break
        case 'checkGroup':
          rules.push({
            validator: validateCheckGroup,
            message: '该项为必选项',
            trigger: 'blur'
          })
          break
        default:
          rules.push({})
          break
      }
    }
    return rules
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
