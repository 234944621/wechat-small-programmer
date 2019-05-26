// pages/gouwuche/gouwuche.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'iscart': false, //控制购物车有没有数据
    'goodList': [],
    'checkAll': false,
    'totalCount': 0,
    'totalPrice': 0,
    'number':0,
    'clecte':[],
  },
  onLoad: function (options) {
    var array = [];
    var result = [];
    var clecte = this.data.clecte;
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    const db = wx.cloud.database()
    db.collection('cart').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        // console.log(res.data)
        result = res.data;
        console.log(result)
        console.log(res.data.length)
        // console.log(res.data[0].bid)
        for (var i = 0; i < res.data.length; i++) {
          console.log(res.data[i].bid)
          db.collection('books').where({
            _id: res.data[i].bid
          }).get({
            success: res => {
              clecte.push(res.data[0])
              // console.log(result)
              // console.log(result[i].number)
              // clecte[i].number = result[i].number
              // console.log(clecte)
              wx.setStorageSync('clecte', clecte)
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
        array = wx.getStorageSync('clecte')//获得缓存
        for (var i = 0; i < res.data.length; i++){
          array[i].number = result[i].number
          array[i].checked = false
        }
        // console.log(array)
        this.setData({
          goodList: array
        })
        // console.log(this.data.goodList)
        wx.removeStorageSync('clecte')
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
  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    console.log(index)
    let goodList = this.data.goodList;
    goodList.splice(index, 1);
    this.setData({
      goodList: goodList
    });
    if (!goodList.length) {
      this.setData({
        iscart: true
      });
    } else {
      this.calculateTotal();
    }
    const db = wx.cloud.database({
      env: 'shiguangshucheng-9845f6'
    });
    console.log(e.currentTarget.id)
    const xl = db.collection('cart');
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
      title: '删除成功',
      icon: 'none',
      duration: 2000
    })
  },

  /**
   * 计算商品总数
   */
  calculateTotal: function () {
    var goodList = this.data.goodList;
    var totalCount = 0;
    var totalPrice = 0;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      if (good.checked) {
        totalCount += good.number;
        totalPrice += good.number * good.price;
      }
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      'totalCount': totalCount,
      'totalPrice': totalPrice
    })
  },

  /**
   * 用户点击商品减1
   */
  subtracttap: function (e) {
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    var number = goodList[index].umber;
    if (number <= 1) {
      return;
    } else {
      goodList[index].number--;
      this.setData({
        'goodList': goodList
      });
      this.calculateTotal();
    }
  },

  /**
   * 用户点击商品加1
   */
  addtap: function (e) {
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    var number = goodList[index].number;
    goodList[index].number++;
    this.setData({
      'goodList': goodList
    });
    this.calculateTotal();
  },
  /**
   * 用户选择购物车商品
   */
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.goodList;
    // console.log(checkboxItems)
    var values = e.detail.value;
    // console.log(values)
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; ++j) {
        if (checkboxItems[i]._id == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    var checkAll = false;
    if (checkboxItems.length == values.length) {
      checkAll = true;
    }

    this.setData({
      'goodList': checkboxItems,
      'checkAll': checkAll
    });
    this.calculateTotal();
  },

  /**
   * 用户点击全选
   */
  selectalltap: function (e) {
    // console.log('用户点击全选，携带value值为：', e.detail.value);
    var value = e.detail.value;
    var checkAll = false;
    if (value && value[0]) {
      checkAll = true;
    }

    var goodList = this.data.goodList;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      good['checked'] = checkAll;
    }

    this.setData({
      'checkAll': checkAll,
      'goodList': goodList
    });
    this.calculateTotal();
  },
  onReady: function () {
    this.calculateTotal();
  },
  jumpPage: function () {
    wx.switchTab({
      url: '/pages/mainfenlei/mainfenlei',
    })
  },
  jumpPage111: function () {
    wx.navigateTo({
      url: '/pages/jiesuan/jiesuan',
    })
  },
  jumpPage15: function () {
    wx.navigateTo({
      url: '/pages/mainxiangqing/mainxiangqing',
    })
  }
})
