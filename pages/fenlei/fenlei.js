// pages/fenlei/fenlei.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // background: ['pink', 'blue', 'green', 'red', 'yellow'],
    previousMargin: 10,
    cid: '',
    nextMargin: 10,
    show: 'block',
    hide: 'none',
    booklist: [],
    index: '',
    current: 0
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      console.log(options.cid);
      wx.cloud.init({
        traceUser: true
      })
      const db = wx.cloud.database({
        env: 'shiguangshucheng-9845f6'
      });
      const xl = db.collection('books');
      xl.where({ cid: Number(options.cid) }).get({
        success: res => {
          console.log(res.data);
          var app = getApp();
          app.globalData.option = res.data;
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
    },

    collected: function (e) {
      const db = wx.cloud.database({
        env: 'shiguangshucheng-9845f6'
      });
      var app = getApp();
      console.log(app.globalData.option);
      console.log(this.data.current);
      const current = Number(this.data.current);
      console.log(app.globalData.option[current]._id);
      const xl = db.collection('collection');
      xl.add({
        data: {
          // user:' getOpenid'
          // age:"18"
          bid: app.globalData.option[current]._id,
        },
        success: res => {
          console.log("插入成功");
        }
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'none',
        image: '/images/收藏.png',
        duration: 1000
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
      var app = getApp();
      console.log(app.globalData.option);
      console.log(this.data.current);
      const current = Number(this.data.current);
      console.log(app.globalData.option[current]._id);
      const xl = db.collection('collection');
      xl.where({ bid: app.globalData.option[current]._id }).get().then(
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

    xiangxi: function (e) {
      // this.setData({
      //   index: e.detail.current
      // })
      console.log(e)
    },
    swiperChange: function (e) {
      var that = this;
      if (e.detail.source == 'touch') {
        that.setData({
          current: e.detail.current
        })
      }
    },
    jumpPage: function () {
      var app = getApp();
      console.log(app.globalData.option);
      console.log(this.data.current);
      const current = Number(this.data.current);
      console.log(app.globalData.option[current]._id);
      wx.navigateTo({
        url: '/pages/mainxiangqing/mainxiangqing?id=' + app.globalData.option[current]._id
      })
    }
  },

  onShareAppMessage: function () {
    let that = this;
    return {
      title: '简直走别拐弯', // 转发后 所显示的title
      path: '/pages/index/index', // 相对的路径
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
  }
})
