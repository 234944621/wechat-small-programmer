// pages/mainxiangqing/mainxiangqing.js
var app = getApp()
Page({
  data: {
    show: 'block',
    hide: 'none',
    currentData: 0,
    menuTop: ' ',
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    goods_list: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    hideCount: false,
    // indicatorDots: false,
    // autoplay: false,
    // interval: 5000,
    // duration: 500,
    // goods_list: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    hideCount: true,
    count: 0,
    needAni: false,
    hide_good_box: true,
    id:'',
    booklist:[],
    detailObj: {},
    index: null,
    // 是否收藏
    isCollected: false
  },
  

  onload:function(e){
    let detailStorage = wx.getStorageSync('isCollected')
    //如果没有收藏
    if (!detailStorage) {
      //初始化一个空的对象
      wx.setStorageSync('isCollected', {});
    }
    //如果收藏了
    if (detailStorage[index]) {
      this.setData({
        isCollected: true
      })
    }


  },

  //选项卡
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  jumpPage: function () {
    wx.switchTab({
      url: '/pages/gouwuche/gouwuche',
    })
  },
  jumpPage1: function () {
    wx.switchTab({
      url: '/pages/mainfenlei/mainfenlei',
    })
  },
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '简直走别拐弯', // 转发后 所显示的title
      path: '/pages/fenlei/fenlei', // 相对的路径
      success: (res) => {    // 成功后要做的事情
        console.log(res.shareTickets[0])
        // console.log

        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res) => {
            that.setData({
              isShow: true
            })
            console.log(that.setData.isShow)
          },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  
  collected: function (e) {
    console.log(e.currentTarget.id)
    const db = wx.cloud.database({
      env: 'shiguangshucheng-9845f6'
    });
    const xl = db.collection('collection');
    xl.add({
      data: {
        // user:' getOpenid'
        // age:"18"
        bid: e.currentTarget.id,
      },
      success: res => {
        console.log("插入成功");
      }
    })
    wx.showToast({
      title: '收藏成功',
      icon: 'none',
      image: '/images/收藏.png',
      duration: 2000
    });
    const that = this;
    that.setData({
      show: 'none',
      hide: 'block'
    })
  },
  no_collected: function (e) {
    const db = wx.cloud.database({
      env: 'shiguangshucheng-9845f6'
    });
    const xl = db.collection('collection');
    xl.where({ bid: e.currentTarget.id }).get().then(
      res => {
        // res.data 包含该记录的数据
        console.log(res.data)
        console.log(res.data[0]._id)
        xl.doc(res.data[0]._id).remove({
          success(res) {
            console.log(res.data)
          }
        });
      });
    wx.showToast({
      title: '取消收藏',
      icon: 'none',
      duration: 2000
    });
    const that = this;
    that.setData({
      hide: 'none',
      show: 'block'
    })
  },

  onLoad: function (options) {
    console.log(options.id)
    console.log('jnmjkjk')
    var that = this;
    wx.cloud.init({
      traceUser: true
    })
    const db = wx.cloud.database({
      env: 'shiguangshucheng-9845f6'
    });
    const xl = db.collection('books');
    xl.where({ _id: options.id }).get({
      success: res => {
        console.log(res.data);
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
    this.busPos = {};
    this.busPos['x'] = app.globalData.ww * 0.8;
    this.busPos['y'] = app.globalData.hh * 0.8;
  },
  touchOnGoods: function (e) {
    console.log(e)
    // console.log(this.openids)
    const db = wx.cloud.database({
      env: 'shiguangshucheng-9845f6'
    });
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openId)
        db.collection("cart").where({ bid: e.currentTarget.id, _openid: res.result.openId }).get({
          success: function (res) {
            if (res.data == '') {
              db.collection('cart').add({
                data: {
                  bid: e.currentTarget.id,
                  number: 1
                },
                success: res => {
                  console.log("插入成功");
                }
              })
            } else {
              console.log(res.data[0]._id);
              db.collection('cart').doc(res.data[0]._id).update({
                // data 传入需要局部更新的数据
                data: {
                  number: res.data[0].number + 1
                },
                success(res) {
                  console.log(res.data)
                }
              })
            }
          }
        })
      }
    })
    // const xl = db.collection('cart');
    // xl.where({ bid: e.currentTarget.id,_openid:this.options_id})
    // xl.add({
    //   data: {
    //     // user:' getOpenid'
    //     // age:"18"
    //     bid: e.currentTarget.id,
    //     unmber:1
    //   },
    //   success: res => {
    //     console.log("插入成功");
    //   }
    // })
    // 如果good_box正在运动
    // if (!this.data.hide_good_box) return;
    // this.finger = {};
    // var topPoint = {};
    // this.finger['x'] = e.touches["0"].clientX;
    // this.finger['y'] = e.touches["0"].clientY;
    // if (this.finger['y'] < this.busPos['y']) {
    //   topPoint['y'] = this.finger['y'] - 150;
    // } else {
    //   topPoint['y'] = this.busPos['y'] - 150;
    // }
    // topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2 + this.finger['x'];
    // this.linePos = app.bezier([this.finger, topPoint, this.busPos], 30);
    // this.startAnimation();
  },

})