;(function(global) {
  'use strict';

  /**
   * 仿 JQuery 写法, 基本模板如下
   * var Fn = function(opt) {
   *   // 可以不通过实例化 Fn 来访问到 Fn 的原型对象
   *   return new Fn.prototype.init(opt)
   * }
   * Fn.prototype = {
   *   init: function() {}
   * }
   * Fn.prototype.init.prototype = Fn.prototype
   * @param {*} el 
   * @returns 
   */
  var MyPlugin = function (el) {
    return new MyPlugin.prototype.init(el)
  }

  MyPlugin.prototype.init = function(el) {
    this.el = typeof el === 'string'
      ? document.querySelector(el)
      : el
  }

  MyPlugin.prototype.setBackground = function(bg) {
    this.el.style.background = bg
    return this
  }

  MyPlugin.prototype.setWidth = function(width) {
    this.el.style.width = width
    return this
  }

  MyPlugin.prototype.setHeight = function(height) {
    this.el.style.height = height
    return this
  }

  MyPlugin.prototype.init.prototype = MyPlugin.prototype

  global._$MyPlugin = MyPlugin
})(this || window)
