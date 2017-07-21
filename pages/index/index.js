//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ]   
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    wx.request({
      url: 'http://www.tanguoguo.com/api/user/save', //仅为示例，并非真实的接口地址
      method: 'POST',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          mydata: res.data.msg
        })
      }
    })
  },
  // 下拉刷新回调接口
  onPullDownRefresh: function () {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    wx.stopPullDownRefresh()
  }
})
