// pages/jiesuan/jiesuan.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addAddress:true,
    'userlist':[],
    'goodList': [],
    'iscart': false,
    isNeedLogistics: 0, // 是否需要物流信息
    allGoodsPrice: 0,
    yunPrice: 0,
    totalPrice:0,
    allGoodsAndYunPrice: 0,
    goodsJsonStr: "",
    orderType: "", //订单类型，购物车下单或立即支付下单，默认是购物车，
    jiesuan: [],
    hasNoCoupons: true,
    coupons: [],
    youhuijine: 0, //优惠券金额
    curCoupon: null // 当前选择使用的优惠券
  },
  onLoad: function (options) {
    var array = [];
    var result = [];
    var res = [];
    var r = [];
    var jiesuan = this.data.jiesuan;
    jiesuan = [];
    this.setData({
      totalPrice: options.price
    })
    console.log(options)
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    const db = wx.cloud.database()
    db.collection('address').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        if(res.data == ''){
          this.setData({
            addAddress: true
          });
        }else{
          this.setData({
            addAddress: false,
            userlist: res.data[0],
          });
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error(失败)
      }
    })
    if(options.id == "true"){
      db.collection('cart').where({
        _openid: this.data.openid
      }).get({
        success: res => {
          result = res.data;
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            db.collection('books').where({
              _id: res.data[i].bid
            }).get({
              success: res => {
                jiesuan.push(res.data[0])
                wx.setStorageSync('jiesuan', jiesuan)
              },
              fail: err => {
                wx.showToast({
                  icon: 'none',
                  title: '查询记录失败'
                })
                console.error(失败)
              }
            })
          }
          array = wx.getStorageSync('jiesuan')//获得缓存
          for (var i = 0; i < res.data.length; i++) {
            array[i].number = result[i].number
          }
          console.log(array)
          this.setData({
            goodList: array
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error(失败)
        }
      })
    }else{
      result = options.id.split(",")
      console.log(result)
      for (var i = 0; i < result.length; i++){
        console.log(result[i])
        db.collection('cart').where({
          _openid: this.data.openid,
          bid: result[i]
        }).get({
          success: res => {
            console.log(res.data[0].number)
            r.push(res.data[0])
            wx.setStorageSync('r', r)
            db.collection('books').doc(res.data[0].bid).get({
              success: res => {
                jiesuan.push(res.data)
                wx.setStorageSync('jiesuan', jiesuan)
              },
              fail: err => {
                wx.showToast({
                  icon: 'none',
                  title: '查询记录失败'
                })
                console.error(失败)
              }
            })
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            console.error(失败)
          }
        })
      }
      array = wx.getStorageSync('jiesuan')//获得缓存
      res = wx.getStorageSync('r')
      console.log(res)
      for (var i = 0; i < array.length; i++) {
        array[i].number = res[i].number
      }
      this.setData({
        goodList: array
      })
    }
  },
  onShow: function(options){
    this.onLoad(this.options)
  },
  addAddress212: function () {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
})