//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    hidden: true,
    nocancel: true,
    userInfo: {},
    movies: [
      { url: 'http://toppicture.oss-cn-beijing.aliyuncs.com/38508484_38508484_1410501439525.jpg' },
      { url: 'http://toppicture.oss-cn-beijing.aliyuncs.com/146767860904892041.jpg' },
      { url: 'http://toppicture.oss-cn-beijing.aliyuncs.com/1225242074829.jpg' },
      { url: 'http://toppicture.oss-cn-beijing.aliyuncs.com/20160812152819_5549.jpg' },
      { url: 'http://toppicture.oss-cn-beijing.aliyuncs.com/711101975fac4ef1b490585a86219472.jpg' },
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
      console.log('全局openid为:' + userInfo.openId)  
        //更新数据
        that.setData({
          userInfo: userInfo
        })
        //收集用户信息
        wx.login({
          success: function (loginRes) {
            if (loginRes.code) {
              //发起网络请求
              console.log(loginRes.code);
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
                  userOpenId: userInfo.openId,
                  loginCodeRandom:loginRes.code//传到后台后获取用户唯一标识openid(登录一次生成一个，一个只能用一次)
                },
                success: function (res) {
                  console.log(res.data.msg)
                  //设置全局openid
                  app.globalData.openid = res.data.result;
                  console.log('全局openid为:' + app.globalData.openid)  
                }
              })

            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });

        
     
     

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
  //评论
  comments: function (event) {
    var movieid = event.currentTarget.id;
    console.log(movieid);
    wx.navigateTo({
      url: '../reply/reply?movieid='+movieid
    })
  },
  //取消
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
})
