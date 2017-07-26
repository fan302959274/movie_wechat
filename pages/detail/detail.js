//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    hidden: true,
    nocancel: true

  },
  onLoad: function (option) {
    var that = this
    console.log(option.src)
    //更新数据
    that.setData({
      src: option.src
    })
  },
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  confirm: function () {
    this.setData({
      nocancel: !this.data.nocancel
    });
    console.log("clicked confirm");
  }
,
  comments:function(){

    var that = this
    //更新数据
    that.setData({
      hidden: false,
      nocancel: false
    })
  },
  

})

