//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    replytext:'',
    movieid:null,
    replys: []

  },
  onLoad: function (option) {
    var that = this
    //更新数据
    that.setData({
      movieid: option.movieid
    })

    console.log('==============' + that.data.movieid)
    wx.request({
      url: 'https://www.lazytechfinance.com/movie/api/reply/list', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        //'videoId': that.data.movieid,
        'videoId': 1,
      },
      success: function (res) {
        console.log(res.data.resultList);
        that.setData({
          replys: res.data.resultList
        })
      }
    })
  },
  // 下拉刷新回调接口
  onPullDownRefresh: function () {
    console.log("哈哈哈哈哈")
    var that = this
    wx.request({
      url: 'https://www.lazytechfinance.com/movie/api/reply/list', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        //'videoId': that.data.movieid,
        'videoId': 1,
      },
      success: function (res) {
        console.log(res.data.resultList);
        that.setData({
          replys: res.data.resultList
        })
        wx.stopPullDownRefresh()
      }
    })

  },

  confirm: function () {
    this.setData({
      nocancel: !this.data.nocancel
    });
    console.log("clicked confirm");
  }
,
  bindReplytext:function(e) {
    console.log(e.detail.value)
     this.setData({
       
       replytext: e.detail.value
     })
   },
  reply: function (e) {
    var openid = app.globalData.openid;
    var movieid = e.currentTarget.id;
    console.log('评论的电影id为' + movieid);
    wx.request({
      url: 'https://www.lazytechfinance.com/movie/api/reply/reply', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        'replyContent': this.data.replytext,
        'videoId': movieid,
        'replyUser': openid
      },
      success: function (res) {
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
    
  }
  ,

  

})

