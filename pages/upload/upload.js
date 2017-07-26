//index.js
//获取应用实例
var app = getApp()
var interval
Page({
  data: {
    videodisplay: 'none',
    adddisplay: '',
    textdisplay:'',
    marginTop:'100rpx',
    uploaddisabled:'false',
    uploadtext: '上传视频',
    loadingdisplay:'none'

   
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
    var that = this
    that.setData({
      uploaddisabled: 'none',
      uploadtext: '上传中...',
      loadingdisplay: ''
    })
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
          that.setData({
            uploadtext: '上传视频',
            loadingdisplay: 'none',
            uploaddisabled: '',
          })
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
  

  
})

