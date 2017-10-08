// pages/items/items.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      videos:[],
      searchtext:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  //文本输入绑定数据
  bindSearchtext: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.lazytechfinance.com/movie/api/video/search', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        videoName: e.detail.value
      },
      success: function (res) {
        console.log(e.detail.value=='');

        if (e.detail.value != null && e.detail.value != ''){
          that.setData({
            videos: res.data.resultList
          })
        }else{
          that.setData({
            videos: []
          })
        }
       
      }
    })
    this.setData({
      searchtext: e.detail.value
    })
  },

  bindSearchconfirm: function (e) {
    var videoname = e.detail.value;
    console.log("videoname" + videoname);
    wx.navigateTo({
      url: '../list/list?videoname=' + videoname + '&searchtype=name'
    })
  },

 
  search: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../list/list?id=' + id
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log(1);
    var that = this
    wx.request({
      url: 'https://www.lazytechfinance.com/movie/api/video/search', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        videoName: ''
      },
      success: function (res) {
        console.log(res.data.resultList);
        that.setData({
          videos: res.data.resultList
        })
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})