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
    //收集用户信息
    wx.login({
      success: function (loginRes) {
        if (loginRes.code) {
          //发起网络请求
          console.log(loginRes.code);
         


          wx.request({
            url: 'https://qiuwangjue.mybission.com/weixin/getOpenId', //仅为示例，并非真实的接口地址
            method: 'GET',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              code: loginRes.code
            },
            success: function (res) {
              console.log(res.data);
              console.log(res.data.data.openid);
             

              wx.request({
                url: 'https://qiuwangjue.mybission.com/weixin/wxPay', //仅为示例，并非真实的接口地址
                method: 'POST',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  openid: res.data.data.openid
                },
                success: function (res) {
                  console.log("======================" + res.data.data[0].appid);
                  wx.requestPayment(
                    {
                      'timeStamp': res.data.data[0].timeStamp,
                      'nonceStr': res.data.data[0].nonceStr,
                      'package': res.data.data[0].package,
                      'signType': 'MD5',
                      'paySign': res.data.data[0].paySign,
                      'success': function (res) {

                        // console.log("======================" + res);

                      },
                      'fail': function (res) {
                        console.log(res);
                      },
                      'complete': function (res) {
                        // console.log("======================" + res);
                      }
                    })
                }
              })




            }
          })

         




        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    



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
    wx.request({
      url: 'https://qiuwangjue.mybission.com/weixin/wxPay', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        openid: 'o7z8d0Y2WSOdadoMVc9WTbihbM9o'
      },
      success: function (res) {
        console.log("======================" + app.globalData.openid);
        console.log(res.data.resultList);

        that.setData({
          movielist: res.data.resultList
        })
      }
    })

  },
  

  
})

