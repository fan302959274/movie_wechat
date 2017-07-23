//index.js
//获取应用实例
var app = getApp()
Page({
  uploadImg: function () {

    wx.chooseVideo({
      success: function (res) {
       
        var tempFilePath = res.tempFilePath
        wx.uploadFile({
          url: 'https://www.lazytechfinance.com/movie/api/video/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePath,
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          method: 'POST',
          success: function (res) {
            wx.showToast({
              title: res.data,
              icon: 'success',
              duration: 2000
            })
            var data = JSON.parse(res.data);
            if (data.code == '20000') {
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: data.msg,
                icon: 'error',
                duration: 2000
              })

            }
            //do something
          }
        })
      },
      fail: function (err) {
        wx.showToast({
          title: err,
          icon: 'success',
          duration: 2000
        })
      }
    })


  }
  
})

