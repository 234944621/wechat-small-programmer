// const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    logs: [],
    list: []
  },
  deleteList(e) {
    console.log(e.currentTarget.id)
    const index = e.currentTarget.dataset.index;
    let list = this.data.list;
    // list.splice(index, 1);
    this.setData({
      list: list
    });

    const db = wx.cloud.database({
      env: 'shiguangshucheng-9845f6'
    });
    const xl = db.collection('address');
    xl.where({ id: e.currentTarget.id }).get().then(
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
    });
  },
 
  onLoad: function (options) {
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
        console.log(res.data)
        this.setData({
          list: res.data
        })
        // console.log(this.data.list)
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
  jumpPage1: function () {
    wx.navigateTo({
      url: '/pages/+address/+address',
    })
  },
  submit: function () {
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () {

  },
  close_mask: function () {
    this.setData({
      showModal: false
    })
  },
  btn_radio: function (res) {
    var that = this;
    var list = that.data.list;
    var index = res.currentTarget.dataset.index;
    list[index].selected = !list[index].selected;

    for (var i = 0; i < list.length; i++) {
      if (i != index) {
        list[i].selected = false;
        // console.log(arr[i].phone);

      } else {
        list[i].selected = true;
      }
    }
    that.setData({
      list: list,

    })
    // if (list[index].selected) {
    //   list[index].selected = true;
    //   that.setData({
    //     list: list
    //   })
    // } else {

    //   console.log("222222");
    //   list[index].selected = false;
    //   that.setData({
    //     list: list
    //   })
    // }
    that.setData({
      list: list
    })
  },
  // 
  btn_update: function () {
    wx.navigateTo({
      url: '../new_receiving_address/new_receiving_address',
    })
  },
  btn_sub: function () {
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
        var usemessage = res;
        that.setData({
          usemessage: usemessage
        })
      }
    })
  },
  checkboxChange: function (e) {
    /*console.log('checkbox发生change事件，携带value值为：', e.detail.value);*/
    var checkboxItems = this.data.list;
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
   
    this.setData({
      'list': checkboxItems
    })
  }
})
