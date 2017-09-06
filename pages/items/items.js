// pages/items/items.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      items:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.lazytechfinance.com/movie/api/param/video', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        paramType: '001'
      },
      success: function (res) {
        console.log(res.data.resultList);
        that.setData({
          items: res.data.resultList
        })
      }
    })
  },
  search: function (e) {
    var videotype = e.currentTarget.dataset.videotype;
    console.log("videotype" + videotype);
    wx.navigateTo({
      url: '../list/list?videotype=' + videotype
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
      url: 'https://www.lazytechfinance.com/movie/api/param/video', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        paramType: '001'
      },
      success: function (res) {
        console.log(res.data.resultList);
        that.setData({
          items: res.data.resultList
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