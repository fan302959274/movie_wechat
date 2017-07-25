//index.js
//获取应用实例
var app = getApp()
Page({
  onLoad: function (option) {
    var that = this
    console.log(option.src)
    //更新数据
    that.setData({
      src: option.src
    })
  } 
})

