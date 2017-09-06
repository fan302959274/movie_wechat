//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
   src:null

  },
  onLoad: function (option) {
    var that = this
    console.log(option.src)
    //更新数据
    that.setData({
      src: option.src
    })
  },

  confirm: function () {
    this.setData({
      nocancel: !this.data.nocancel
    });
    console.log("clicked confirm");
  }
,

  

})

