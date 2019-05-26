//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    text: [
      "成大事不在于力量的大小，而在于能坚持多久。",
      "顽强的毅力可以征服世界上任何一座高峰。",
      "读一本好书，就是和许多高尚的人谈话。",
      "人的影响短暂而微弱，书的影响则广泛而深远。 "
    ],
    text1: [
      " ——约翰生",
      "——狄更斯",
      "——歌德",
      "——普希金"
    ],
    userInfo: {},
    hasUserInfo: false,
    openid: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.reLaunch({
      url: '../flower/flower',
    })
  },
  
  onLoad: function (options) {
    var arr = this.data.text;
    var id = parseInt(Math.random() * arr.length);
    var arr1 = this.data.text1;

    this.setData({
      text: arr[id],
      text1: arr1[id]

    });
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
    var openid;
    let that = this;
    const db = wx.cloud.database();
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openId)
        openid = res.result.openId;
        that.setData({
          openid: openid
        })
        db.collection("user").where({ _openid: openid }).get({
          success: function (res) {
            if (res.data == '') {
              console.log("res.userInfo.name")
              db.collection('user').add({
                data: {
                  // user:' getOpenid'
                  // age:"18"
                  name: res.userInfo.nickName,
                  url: res.userInfo.avatarUrl
                },
                success: res => {
                  // console.log(openid);
                  console.log("插入成功");
                }
              })
            } else {
              that.setData({
                userInfo: res.data[0],
              })  
            }
          }
        })
      }
    })
    var setInter = setInterval(
      function () {
        clearInterval(setInter)
        wx.reLaunch({
          url: '../flower/flower',
        })
      }
      , 6000);
  }

})