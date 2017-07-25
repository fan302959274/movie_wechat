//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    videodisplay: 'none',
    adddisplay: '',
    textdisplay:'',
    marginTop:'100rpx',
    uploaddisabled:'false',
    animation: ''

   
  },

  uploadImg: function () {
    var that = this
    wx.chooseVideo({
      success: function (res) {
        var tempFilePath = res.tempFilePath
        
        that.setData({
          videodisplay: '',
          adddisplay: 'none',
          textdisplay: 'none',
          marginTop: '0rpx',
          src: tempFilePath,
          tempFilePath: tempFilePath,
          uploaddisabled:''
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


  },

  removeVideo: function (event) {
    var that = this
    that.setData({
      videodisplay: 'none',
      adddisplay: '',
      textdisplay: '',
      marginTop: '100rpx',
      uploaddisabled: 'false'
    })

  },

  uploadVideo: function (event) {
    wx.uploadFile({
      url: 'https://www.lazytechfinance.com/movie/api/video/upload', //上传视频接口
      filePath: event.currentTarget.id,
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

  }
  
})

