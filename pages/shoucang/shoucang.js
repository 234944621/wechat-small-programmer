// pages/gouwuche/gouwuche.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'iscart': false, //控制购物车有没有数据
    'goodlist': [],
    'checkAll': false,
    'shoucang': [],
    'totalCount': 0,
    'totalPrice': 0,
  },



  //删除
  deleteList(e) {
    console.log(e.currentTarget.id);
    console.log(234456)
    console.log(this.data.goodlist)
    console.log(e)
    const index = e.currentTarget.dataset.index;
    let goodList = this.data.goodlist;
    for(var i=0;i<this.data.goodlist.length;i++){
      if (this.data.goodlist[i]["_id"] == e.currentTarget.id){
        console.log(9999)
        goodList.splice(i, 1);
        wx.removeStorageSync('shoucang')
      }
    }
    // goodList.splice(index, 1);
    this.setData({
      goodlist: goodList
    });
    // if (goodList.length==0) {
    //   this.setData({
    //     iscart: true
    //   });
    // } else {
    //   this.calculateTotal();
    // }
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
        totalCount += good.count;
        totalPrice += good.count * good.price;
      }
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      'totalCount': totalCount,
      'totalPrice': totalPrice
    })
  },
  /**
   * 用户选择购物车商品
   */
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.goodList;
    var values = e.detail.value;
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; ++j) {
        if (checkboxItems[i].isbn == values[j]) {
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
  onLoad: function (options) {
    var array = [];
    var shoucang = this.data.shoucang;
    shoucang = [];
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    const db = wx.cloud.database()
    db.collection('collection').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        console.log(res.data)
        console.log(res.data.length)
        // console.log(res.data[0].bid)
        for (var i = 0; i < res.data.length; i++) {
          console.log(res.data[i].bid)
          db.collection('books').where({
            _id: res.data[i].bid
          }).get({
            success: res => {
              shoucang.push(res.data[0])
              wx.setStorageSync('shoucang', shoucang)
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
        array = wx.getStorageSync('shoucang')//获得缓存
        console.log(array)
        this.setData({
          goodlist: array
        })
        // console.log(this.data.goodlist)
        // wx.removeStorageSync('shoucang')
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
  onShow:function(){
    this.onLoad();
  },
})
