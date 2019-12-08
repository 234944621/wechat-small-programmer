//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      //添加
      // res: function (e) {
      //   const db = wx.cloud.database()
      //   db.collection('user').add({
      //     data: {
      //       username: e.detail.value.username
      //     },
      //     success: res => {
      //       // 在返回结果中会包含新创建的记录的 _id
      //       this.setData({
      //         username: e.detail.value.username
      //       })
      //       wx.showToast({
      //         title: '新增记录成功',
      //       })
      //       console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      //     },
      //     fail: err => {
      //       wx.showToast({
      //         icon: 'none',
      //         title: '新增记录失败'
      //       })
      //       console.error('[数据库] [新增记录] 失败：', err)
      //     }
      //   })
      // },
    })
    //云开发初始化
    wx.cloud.init({
      env: 'shiguangshucheng-9845f6',
       traceUser:true
    })
  },
  globalData: {
    userInfo: null
  },
  globalData: {
    openid: null
  },
  globalData: {
    e: null
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }
    else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },
  globalData: {
    currentLocation: '',
    userInfo: null
  },
  onLaunch: function () {
    //云开发初始化
    if (!wx.cloud) {
      console.error('请使用 2.2.3 ')
    } else {
        wx.cloud.init({
          env: 'shiguangshucheng-9845f6',
          traceUser: true
        })
      }
  }
  
})