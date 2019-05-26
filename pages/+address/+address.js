
//获取应用实例
var app = getApp()
Page({
  data: {
    provinces: [],
    citys: [],
    one: 'block',
    two: 'none',
    districts: [],
    selProvinceIndex: 0,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },
  bindCancel: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  bindSave: function (e) {
    var that = this;
    var username = e.detail.value.username;
    var useraddress = e.detail.value.useraddress;
    var usernumber = e.detail.value.usernumber;
    var usercode = e.detail.value.usercode;
    if (username == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (usernumber == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return
    }
    
    if (useraddress == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }
    if (usercode == "") {
      wx.showModal({
        title: '提示',
        content: '请填写邮编',
        showCancel: false
      })
      return
    }
    var apiAddoRuPDATE = "add";
    var apiAddid = that.data.id;
    if (apiAddid) {
      apiAddoRuPDATE = "update";
    } else {
      apiAddid = 0;
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    console.log(e.currentTarget.id)
    const db = wx.cloud.database({
      env: 'shiguangshucheng-9845f6'
    });
    const xl = db.collection('address');
    xl.add({
      data: {
        // user:' getOpenid'
        // age:"18"
        // bid: e.currentTarget.id,
        username: e.detail.value.username,
        usernumber: e.detail.value.usernumber,
        userdizhi: e.detail.value.userdizhi,
        useraddress: e.detail.value.useraddress,
        usercode: e.detail.value.usercode
      },
      success: res => {
        console.log("插入成功");
      }
    })

    
  },



  formReset: function () {
    console.log('form发生了reset事件')
  },
  
  
 
  onLoad: function (e) {
    var that = this;
    // this.initCityData(1);
    var id = e.id;
    if (id) {
      // 初始化原数据
      wx.showLoading();
      wx.request({
        // url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/shipping-address/detail',
        data: {
          token: app.globalData.token,
          id: id
        },
        success: function (res) {
          wx.hideLoading();
          if (res.data.code == 0) {
            that.setData({
              id: id,
              addressData: res.data.data,
              selProvince: res.data.data.provinceStr,
              selCity: res.data.data.cityStr,
              selDistrict: res.data.data.areaStr
            });
            that.setDBSaveAddressId(res.data.data);
            return;
          } else {
            wx.showModal({
              title: '提示',
              content: '无法获取快递地址数据',
              showCancel: false
            })
          }
        }
      })
    }
  },
  
  deleteAddress: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/shipping-address/delete',
            data: {
              token: app.globalData.token,
              id: id
            },
            success: (res) => {
              wx.navigateBack({})
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      one: 'none',
      two: 'block'
    })
  }
})
