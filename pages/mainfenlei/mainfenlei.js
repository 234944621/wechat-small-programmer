// page/one/index.js
Page({
  data: {
    imgUrls: [
      'https://7368-shiguangshucheng-9845f6-1259049166.tcb.qcloud.la/%E8%BF%BD%E9%A3%8E%E7%AD%9D%E7%9A%84%E4%BA%BA.gif',
      'https://7368-shiguangshucheng-9845f6-1259049166.tcb.qcloud.la/QQ%E5%9B%BE%E7%89%8720190510192954.jpg',
      'https://7368-shiguangshucheng-9845f6-1259049166.tcb.qcloud.la/%E6%97%B6%E5%85%89%E6%98%A0%E7%94%BB3.gif',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    open: false,
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: '',
    show: 'block',
    hide: 'none'
  },
 
  tap_start: function (e) {
    this.data.mark = this.data.newmark = e.touches[0].pageX;
    if (this.data.staus == 1) {
      // staus = 1指默认状态
      this.data.startmark = e.touches[0].pageX;
    } else {
      // staus = 2指屏幕滑动到右边的状态
      this.data.startmark = e.touches[0].pageX;
    }

  },
  tap_drag: function (e) {
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if (this.data.mark < this.data.newmark) {
      if (this.data.staus == 1) {
        if (this.data.windowWidth * 0.4 > Math.abs(this.data.newmark - this.data.startmark)) {
          this.setData({
            translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
          })
        }
      }

    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if (this.data.mark > this.data.newmark) {
      if (this.data.staus == 1 && (this.data.newmark - this.data.startmark) > 0) {
        this.setData({
          translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
        })
      } else if (this.data.staus == 2 && this.data.startmark - this.data.newmark < this.data.windowWidth * 0.4) {
        this.setData({
          translate: 'transform: translateX(' + (this.data.newmark + this.data.windowWidth * 0.4 - this.data.startmark) + 'px)'
        })
      }

    }

    this.data.mark = this.data.newmark;

  },
  tap_end: function (e) {
    if (this.data.staus == 1 && this.data.startmark < this.data.newmark) {
      if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.4)) {
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      } else {
        this.setData({
          translate: 'transform: translateX(' + this.data.windowWidth * 0.4 + 'px)'
        })
        this.data.staus = 2;
      }
    } else {
      if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.4)) {
        // this.setData({
        //   translate: 'transform: translateX(' + this.data.windowWidth * 0.75 + 'px)'
        // })
        // this.data.staus = 2;
      } else {
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      }
      
    }
    

    this.data.mark = 0;
    this.data.newmark = 0;
  },
  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        translate: 'transform: translateX(0px)'
      })
      this.data.open = false;
    } else {
      this.setData({
        translate: 'transform: translateX(' + this.data.windowWidth * 0.4 + 'px)'
        
      })
      this.data.open = true;
      this.data.staus = 2;
    }
  },
  jumpPage0: function () {
    wx.navigateTo({
      url: '/pages/flower/flower',
    })
  },
  jumpPage1: function () {
    
    wx.navigateTo({
      url: '/pages/fenlei/fenlei?cid=1',
    })
  },
  jumpPage2: function () {

    wx.navigateTo({
      url: '/pages/fenlei/fenlei?cid=2',
    })
  },
  jumpPage3: function () {

    wx.navigateTo({
      url: '/pages/fenlei/fenlei?cid=3',
    })
  },
  jumpPage4: function () {

    wx.navigateTo({
      url: '/pages/fenlei/fenlei?cid=4',
    })
  },
 book1: function () {
    wx.navigateTo({
      url: '/pages/mainxiangqing/mainxiangqing',
    })
  },
  book2: function () {
    wx.navigateTo({
      url: '/pages/mainxiangqing/mainxiangqing',
    })
  },
    collected: function (e) {
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
  jumpPage: function () {
    wx.navigateTo({
      url: '/pages/want/want',
    })
  },
  bindFocus: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})