// pages/want/want.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    weibos: [],
    booklist: [],
    userInfo: {},
    hasUserInfo: false,
    openid: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    evaContent: ''
  },

  /**
   * 组件的方法列表
   */

  methods: {
    getUserInfo: function (e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
    onLoad: function (options) {
      getUserInfo();
      wx.cloud.init({
        traceUser: true
      })
      const db = wx.cloud.database({
        env: 'shiguangshucheng-9845f6'
      });
      const xl = db.collection('books');
      xl.get({
        success: res => {
          console.log(res.data)
          this.setData({

            booklist: res.data,
          })

        },
        fail: err => {
          console.log("失败")
          wx.showToast({
            icon: 'none',
            title: '失败',
          })
        }
      })
    },
    tijiao: function (e) {

      console.log(e)
      var value = e.detail.value.text;
      var weibos = this.data.weibos;
      weibos.push(value);
      console.log(weibos)
      this.setData({
        weibos: weibos,
        evaContent: ''
      })
    }
  },


})
