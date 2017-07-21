//index.js
//获取应用实例
var app = getApp()
Page({
  uploadImg: function () {

    wx.chooseImage({
      success: function (res) {
        
        var tempFilePaths = res.tempFilePaths
        wx.showToast({
          title: tempFilePaths[0],
          icon: 'error',
          duration: 2000
        })
        wx.uploadFile({
          url: 'http://www.tanguoguo.com/api/video/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          method: 'POST',
          success: function (res) {
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

