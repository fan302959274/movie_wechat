//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    replytext:'',
    replys: [],
    movieid:null
  },
  onLoad: function (option) {
    var that = this
    //之前页面带过来的参数
    that.setData({
      movieid: option.movieid
    })
    //加载所有指定视频
    wx.request({
      url: 'https://www.lazytechfinance.com/movie/api/reply/list', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        'videoId': that.data.movieid,
      },
      success: function (res) {
        that.setData({
          replys: res.data.resultList
        })
      }
    })
  },
  // 下拉刷新回调接口
  onPullDownRefresh: function () {
    var that = this
    wx.request({
      url: 'https://www.lazytechfinance.com/movie/api/reply/list', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        'videoId': that.data.movieid,
      },
      success: function (res) {
        that.setData({
          replys: res.data.resultList
        })
        wx.stopPullDownRefresh()
      }
    })

  },

  //文本输入绑定数据
  bindReplytext:function(e) {
     this.setData({
       replytext: e.detail.value
     })
  },
  //发表评论
  reply: function (e) {
    var that = this
    var openid = app.globalData.openid;
    wx.request({
      url: 'https://www.lazytechfinance.com/movie/api/reply/reply', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        'replyContent': that.data.replytext,
        'videoId': that.data.movieid,
        'replyUser': openid
      },
      success: function (res) {
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 2000
        })
        //重新加载数据
        wx.request({
          url: 'https://www.lazytechfinance.com/movie/api/reply/list', //仅为示例，并非真实的接口地址
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          data: {
            'videoId': that.data.movieid,
          },
          success: function (res) {
            that.setData({
              replys: res.data.resultList
            })
          }
        })
      }
    })
    
  }
  ,

  

})

