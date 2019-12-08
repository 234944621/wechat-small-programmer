// pages/jinbi/jinbi.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'goodList': []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database({
      env: 'shiguangshucheng-9845f6'
    });
    console.log(app.globalData.openid)
    const xl = db.collection('user');
    xl.where({ _openid: app.globalData.openid }).get().then(
      res => {
        // res.data 包含该记录的数据
        console.log(res.data)
        this.setData({
          goodList: res.data
        });
        console.log(this.data.goodList)
      });
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