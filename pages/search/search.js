//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    iscart: true,
    inputValue: '',
    getSearch: [],
    books:[],
    modalHidden: true
  },
  bindInput: function (e) {
    const db = wx.cloud.database({
      env: 'shiguangshucheng-9845f6'
    });
    db.collection('books').where({
      //使用正则查询，实现对搜索的模糊查询
      bname: db.RegExp({
        regexp: e.detail.value,
        //从搜索栏中获取的value作为规则进行匹配。
      })
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          books: res.data,
          inputValue: e.detail.value,
          iscart: false
        })
      }
    })
    console.log('bindInput' + this.data.inputValue)
  },
  setSearchStorage: function () {
    let data;
    let localStorageValue = [];
    if (this.data.inputValue != '') {
      //调用API从本地缓存中获取数据
      var searchData = wx.getStorageSync('searchData') || []
      searchData.push(this.data.inputValue)
      wx.setStorageSync('searchData', searchData)
      wx.navigateTo({
        url: '../result/result'
      })
      // console.log('马上就要跳转了！')
    } else {
      console.log('空白空白')
    }
    // this.onLoad();
  },
  modalChangeConfirm: function () {
    wx.setStorageSync('searchData', [])
    this.setData({
      modalHidden: true
    })
    wx.redirectTo({
      url: '../search/search'
    })
    // this.onLoad();

  },
  modalChangeCancel: function () {
    this.setData({
      modalHidden: true
    })
  },
  clearSearchStorage: function () {
    this.setData({
      modalHidden: false
    })
    // this.onLoad();
  },
  onLoad: function () {
    console.log('search is onLoad');
  },
  onShow: function () {
    var getSearch = wx.getStorageSync('searchData');
    this.setData({
      getSearch: getSearch,
      inputValue: ''
    })
    console.log('search is onshow')
  },
  // onHide: function () {
  //   console.log('search is onHide')
  //   wx.redirectTo({
  //     url: '../search/search'
  //   })
  // },
  bindchange: function (e) {
    console.log('bindchange')
  },
  clearInput: function () {
    this.setData({
      inputValue: ''
    })
  },
  jumpPage: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/mainxiangqing/mainxiangqing?id=' + e.currentTarget.id,
    })
  }
})