;(function(global) {
  'use strict';

  var MyPlugin2 = function(value) {
    var val = value
    var reg = {
      phone: /^1[3456789]\d{9}$/,
      number: /^-?\d*\.?\d+$/,
    }

    return {
      getRegs() {
        return reg
      },
      setRegs(params) {
        reg = { ...reg, ...params }
      },
      isPhone() {
        reg.phone.test(val) && console.log('这是手机号')
        return this
      },
      isNumber() {
        reg.number.test(val) && console.log('这是数字')
        return this
      }
    }
  }

  global.MyPlugin2 = MyPlugin2
  //  CommonJs 规范
  if (typeof module !== 'undefined' && module.exports) module.exports = MyPlugin2
})(this || window);

