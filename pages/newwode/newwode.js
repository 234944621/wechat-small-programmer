// pages/newwode/newwode.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  //   let me = this; //获取tab的距离顶部高度 
  //   const query = wx.createSelectorQuery(); 
  //   query.select('#tab').boundingClientRect(function (res) { 
  //     // console.log(res.top) 
  //     me.data.tabTop = res.top 
  //   }).exec();
  // },
  // onPageScroll: function (e) {
  //   let me = this;
  //   //tab的吸顶效果
  //   console.log(e.scrollTop > me.data.tabTop)
  //   if (e.scrollTop > me.data.tabTop) {
  //     if (me.data.tabFix) {
  //       return
  //     } else {
  //       me.setData({
  //         tabFix: 'Fixed'
  //       })
  //     }
  //   } else {
  //     me.setData({
  //       tabFix: ''
  //     })
  //   }
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }, 
  view1: function () {
    app.globalData.currentLocation = 0,
      console.log(app.globalData.currentLocation);
    wx.navigateTo({ url: '/pages/dingdan/dingdan' })
  },
  view2: function () {
    app.globalData.currentLocation = 1,
      console.log(app.globalData.currentLocation);
    wx.navigateTo({ url: '/pages/dingdan/dingdan' })
  },
  view3: function () {
    app.globalData.currentLocation = 2,
      console.log(app.globalData.currentLocation);
    wx.navigateTo({ url: '/pages/dingdan/dingdan' })
  },
  view4: function () {
    app.globalData.currentLocation = 3,
      console.log(app.globalData.currentLocation);
    wx.navigateTo({ url: '/pages/dingdan/dingdan' })
  },
  view5: function () {
    app.globalData.currentLocation = 4,
      console.log(app.globalData.currentLocation);
    wx.navigateTo({ url: '/pages/dingdan/dingdan' })
  },
  jumpPage: function () {
    wx.navigateTo({
      url: '/pages/shoucang/shoucang',
    })
  },
  jumpPage0: function () {
    wx.navigateTo({
      url: '/pages/jinbi/jinbi',
    })
  },
  jumpPage1: function () {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  }
})