//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    movies: [
      { url: 'http://foxmovie.oss-cn-beijing.aliyuncs.com/foxmovie1501075155067.jpg' },
      { url: 'http://foxmovie.oss-cn-beijing.aliyuncs.com/foxmovie1501075110382.jpg' },
      { url: 'http://foxmovie.oss-cn-beijing.aliyuncs.com/foxmovie1501075125632.jpg' },
      { url: 'http://foxmovie.oss-cn-beijing.aliyuncs.com/foxmovie1501075139563.jpg' },
      { url: 'http://foxmovie.oss-cn-beijing.aliyuncs.com/foxmovie1501075148953.jpg' },
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
    app.getUserInfo(function (userInfo){
        //更新数据
        that.setData({
          userInfo: userInfo
        })
        //收集用户信息

        wx.request({
          url: 'https://www.lazytechfinance.com/movie/api/user/save', //仅为示例，并非真实的接口地址
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          data: {
            userNickName: userInfo.nickName,
            userAvatarUrl: userInfo.avatarUrl,
            userGender: userInfo.gender,//性别 0：未知、1：男、2：女
            userProvince: userInfo.province,
            userCity: userInfo.city,
            userCountry: userInfo.country,
            userUnionId: userInfo.watermark,
            userOpenId: userInfo.openId
          },
          success: function (res) {
            console.log(res.data.msg)
          }
        })

     
     

    })
    wx.request({
      url: 'https://www.lazytechfinance.com/movie/api/video/list', //仅为示例，并非真实的接口地址
      method: 'POST',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          movielist:res.data.resultList
        })
      }
    })
  },
  // 下拉刷新回调接口
  onPullDownRefresh: function () {
    var that = this
    wx.request({
      url: 'https://www.lazytechfinance.com/movie/api/video/list', //仅为示例，并非真实的接口地址
      method: 'POST',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          movielist: res.data.resultList
        })
        wx.stopPullDownRefresh()
      }
    })
   
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
    console.log('circle 下一页');
  },
  //详细
  detail: function (event) {
    var src = event.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?src='+src
    })
  },
})
