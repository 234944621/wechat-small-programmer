// find.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
     winHeight: 0,
    // tab切换  
    currentTab: 0,
    'iscart': false,
    'iscart1': false, //控制购物车有没有数据
    'iscart2': false,
    'iscart3': false,
    'iscart4': false,
    'goodList1': [
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      }
    ],
    'goodList2': [
      {
        'cover': 'https://pic.baike.soso.com/ugc/baikepic2/12018/20171101102459-269220975_jpg_466_642_59717.jpg/300',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      }
    ],
    'goodList3': [
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      }     
    ],
    'goodList4': [
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      }
    ],
    'goodList5': [
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      },
      {
        'cover': 'http://img10.makepolo.net/images/formals/img/product/218/307/3_2bd28603d190605b4ea0270609e13156.jpg',
        'isbn': '9787535482051',
        'desc': '2020张宇考研数学题源探析经典1000题数一二三习题分册+解析分册',
        'price': 25.9,
        'count': 1
      }
    ],
    'totalCount': 0,
    'totalPrice': 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // console.log('i='+i);
    var that = this;

    /** 
     * 获取系统信息 
     */

    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  //滑动或点击都触发
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.currentLocation == '') {
      this.setData({
        currentTab: 0
      });
    } else {
      var i = app.globalData.currentLocation;
      console.log('onshow');
      console.log('i=' + i);

      this.setData({
        currentTab: i
      });
    }
  },

  /**
   * 删除购物车当前商品
   */
  deleteList1(e) {
    const index = e.currentTarget.dataset.index;
    let goodList1 = this.data.goodList1;
    goodList1.splice(index, 1);
    this.setData({
      goodList1: goodList1
    });
    if (!goodList1.length) {
      this.setData({
        iscart: true
      });
    } else {
      this.calculateTotal();
    }
  },
  deleteList2(e) {
    const index = e.currentTarget.dataset.index;
    let goodList2 = this.data.goodList2;
    goodList2.splice(index, 1);
    this.setData({
      goodList2: goodList2
    });
    if (!goodList2.length) {
      this.setData({
        iscart1: true
      });
    } else {
      this.calculateTotal();
    }
  },
  
  jumpPage: function () {
    wx.navigateTo({
      url: '/pages/mainxiangqing/mainxiangqing',
    })
  },
  jumpPage1: function () {
    wx.navigateTo({
      url: '/pages/mainxiangqing/mainxiangqing',
    })
  },
  jumpPage10: function () {
    wx.navigateTo({
      url: '/pages/pingjia/pingjia',
    })
  },
  jumpPage222: function () {
    wx.navigateTo({
      url: '/pages/jiesuan/jiesuan',
    })
  }
})