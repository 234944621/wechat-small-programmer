"use strict";
const db = wx.cloud.database()

const util = require('../../utils/util1.js')

Page({
  data: {
    isList: false, // 转换页面风格的标识 true为竖向风格 false为横向风格
    accounts: [],  // 存储查询的账本数据
    now: null,     // 存储当日时间
    year: null,     // 存储年份
    isPopping: false,//是否已经弹出
    animPlus: {},//旋转动画
    animCollect: {},//item位移,透明度
    animTranspond: {},//item位移,透明度
    animInput: {},//item位移,透明度
    time: "",
    'goodList': [
      {
        'sumtime': '10分钟',
        // 'result':'成功：恭喜你,再接再厉吖!'
        'result': '失败：很遗憾,继续加油吖!'
      }
    ],
    zuobiao1: '',
    zuobiao2: '',
    zuobiao3: '',
    isShow: false,
    io: false,
    isopen: false,
    animationData: {},
    title: "ddemo",
    currentIndex: 0,
    oldIndex: 0,
    view: [
      { in: "", out: "" },
      { in: "", out: "" }
    ],
    logs: [],
    jiaodu: 0,
    min: '',
    min1: '5',
    setInter: '',
    setInter1: '',
    timesetInters: '',
    timesetInterm: '',
    timesetTens: '',
    value: '',
    display: 'none',
    shijian: 'block',
    shijianb: 'none',
    jb: 'none',
    jb1: 'none',
    ks: 'none',
    fq: 'none',
    s: '00',
    array: ['10分钟', '20分钟', '30分钟', '40分钟', '50分钟', '60分钟', '70分钟', '80分钟', '90分钟'],
    objectArray: [
      {
        id: 0,
        name: '10分钟'
      },
      {
        id: 1,
        name: '20分钟'
      },
      {
        id: 2,
        name: '30分钟'
      },
      {
        id: 3,
        name: '40分钟'
      },
      {
        id: 4,
        name: '50分钟'
      },
      {
        id: 5,
        name: '60分钟'
      },
      {
        id: 6,
        name: '70分钟'
      },
      {
        id: 7,
        name: '80分钟'
      },
      {
        id: 8,
        name: '90分钟'
      }
    ],
    index: 1
  },
  isPopping: false,//是否已经弹出  
  animPlus: {},//旋转动画  
  animCollect: {},//item位移,透明度  
  animTranspond: {},//item位移,透明度  
  animInput: {},//item位移,透明度  
  // 账本显示风格
  switchList() {
    // 设置页面风格样式
    let isList = !this.data.isList
    this.setData({
      isList
    })
    wx.setStorage({
      key: "isList",
      data: isList
    })
  },

  onLoad() {
    // 获取页面风格转换标识
    var isList = wx.getStorageSync('isList')

    // // 调用云函数接口 获取当前日期
    wx.cloud.callFunction({
      name: 'getTime',
      success: (res) => {
        let year = res.result.split('-')[0]
        this.setData({
          now: res.result,
          year,
        })
      },
      fail: console.error
    })
    // 查询账本
    db.collection('accounts')
      .get({
        success: res => {
          this.setData({
            accounts: res.data.reverse(), // 反转数组，优先显示创建早的账本
            isList
          })
          wx.hideLoading()
        }
      })

    var TIME = util.formatTime(new Date());
    this.setData({
      time: TIME,
    })
  },
  jumpPage0: function () {
    wx.navigateTo({
      url: '/pages/jinbi/jinbi',
    })
  },
  touchStart: function (t) {
    this.setData({
      startX: t.changedTouches[0].clientX
    })
  },
  plus: function () {
    if (this.data.isPopping) {
      //缩回动画 

      this.takeback();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画  
      //  this.takeback();
      this.popp();
      this.setData({
        isPopping: true
      })
    }
  },
  input: function () {
    console.log("input")
  },
  transpond: function () {
    console.log("transpond")
  },
  submit: function () {
    console.log("submit")
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

  //弹出动画  
  popp: function () {
    //plus顺时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })

    animationPlus.rotateZ(360).step();
    animationTranspond.translate(0, 2).rotateZ(360).opacity(1).step();
    animationInput.translate(0, 0).rotateZ(360).opacity(1).step();
    animationcollect.translate(-2, 0).rotateZ(360).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })

  },
  takeback: function () {
    //plus逆时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationcollect.translate(-10, -60).rotateZ(0).opacity(0).step();
    animationTranspond.translate(70, 10).rotateZ(0).opacity(0).step();
    animationInput.translate(45, -45).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  }, 
  bindPickerChange: function (e) {

    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log((e.detail.value) * 10 + 10);
    function size(min) {
      return min >= 10 ? min : '0' + min;
    }
    this.setData({
      index: e.detail.value,
      min: size((e.detail.value) * 10 + 10),
      min1: size((e.detail.value) * 10 + 10),
      shijian: 'none',
      shijianb: 'block',
      ks: 'block',
      jb: 'block'
    });
  },
  start: function (e) {

    var that = this;
    that.setData({
      io: true
    })
    wx.showToast({
      title: '将手机扣下开始专注',
      icon: 'none',
      duration: 2000
    })
    var shijianb = that.data.shijianb;
    clearInterval(that.data.setInter);
    console.log(shijianb);
    if (shijianb = 'none') { console.log(0); console.log(shijianb); }
    if (shijianb = 'block') { console.log(1); console.log(shijianb); }

    var min1 = that.data.min1;
    console.log(min1);


    this.isShow = true;
    that.setData({
      ks: 'none',
      fq: 'block'
    });

    wx.onAccelerometerChange(function (e) {
      if (!that.isShow) {
        return
      }

      console.log(e.z)
      that.setData({
        zuobiao1: e.x,
        zuobiao2: e.y,
        zuobiao3: e.z
      })
      if (e.z < 0.8 && !that.data.io) {
        wx.showToast({
          title: '正面，十秒后专注将会被打断',
          icon: 'none',
          duration: 1000
        })
        if (!that.data.isopen) {
          that.setData({
            isopen: true,
          })
          var miao = 0
          that.data.timesetTens = setInterval(
            function () {
              miao += 1;
              if (miao == 10) {
                wx.stopAccelerometer()
                clearInterval(that.data.setInter);
                clearInterval(that.data.timesetTens);
                // clearInterval(that.data.timesetInters);
                // clearInterval(that.data.timesetInterm);
                var jiaodu = that.data.jiaodu;

                setTimeout(function () {
                  wx.showToast({
                    title: '很遗憾 失败了',
                    icon: 'none',
                    image: '/images/index.jpg',
                    duration: 1000
                  })
                  if (jiaodu >= 0) {
                    that.data.setInter1 = setInterval(
                      function () {
                        var jiaodu = that.data.jiaodu;
                        if (jiaodu <= 0) {
                          clearInterval(that.data.setInter1)
                        }
                        var min = that.data.min;
                        // var m = 0.6 / min;
                        jiaodu -= 0.5;
                        that.setData({
                          jiaodu: jiaodu,
                        });
                        console.log(jiaodu);
                        if (jiaodu <= 0) {
                          clearInterval(that.data.setInter1)
                        }
                      }
                      , 5);
                    var s = that.data.s;
                    var min = that.data.min;
                    min = '00',
                      s = '00',
                      clearInterval(that.data.timesetInters);
                    clearInterval(that.data.timesetInterm);
                    that.setData({
                      s: s,
                      min: min,
                      ks: 'none',
                      fq: 'none',
                      shijian: 'block',
                      shijianb: 'none',
                    })
                  }
                })
              }
            }
            , 1000)
        }
      }
      if (e.z > 0.9 && !that.data.io) {
        wx.showToast({
          title: '扣下了',
          icon: 'none',
          duration: 2000
        })
        console.log(that.data.io)
        console.log(that.data.isopen)
        if (that.data.isopen) {
          that.setData({
            isopen: false,
          })
          clearInterval(that.data.timesetTens);
        }
      }

      if (e.z > 0.9 && that.data.io) {
        that.setData({
          io: false,
        })
        clearInterval(that.data.setInter);
        clearInterval(that.data.timesetInters);
        clearInterval(that.data.timesetInterm);
        clearInterval(that.data.timesetTens);
        var min = size(that.data.min - 1);
        that.setData({
          min: min
        })//开始时分钟数减1
        wx.showToast({
          title: '开始计时',
          icon: 'success',
          duration: 2000
        })
        that.data.setInter = setInterval(
          function () {
            var jiaodu = that.data.jiaodu;
            var min1 = that.data.min1;
            var m = 0.6 / min1;
            jiaodu += m;
            that.setData({
              jiaodu: jiaodu,
              // ks: 'none',
              // fq: 'block'
            });

            if (jiaodu >= 359.9) {
              clearInterval(that.data.setInter);
              var diaplay = that.data.display;
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              var s = that.data.s;
              var min = that.data.min;
              min = '00'
              s = '00'
              clearInterval(that.data.timesetInters);
              clearInterval(that.data.timesetInterm);
              that.setData({
                s: '00',
                jiaodu: 0,
                min: '',
                ks: 'none',
                fq: 'none',
                shijian: 'block',
                shijianb: 'none',
                jb: 'none',
                jb1: 'block',
              })
            }
          }
          , 100);



        that.data.timesetInterm = setInterval(
          function () {
            if (min > 0) {
              min = size(min - 1);
              that.setData({
                min: min
              })
            }

            console.log(min)
          }
          , 60000);//60秒分钟数-1


        var s = that.data.s;
        s = 59;
        that.setData({
          s: s
        })
        that.data.timesetInters = setInterval(
          function () {
            if (s > 0) {
              s = size(s - 1);
              that.setData({
                s: s
              })
            }
            else {
              s = 60;
              s = size(s - 1);
              that.setData({
                s: s
              })
            }

          }

          , 1000);//秒数-1

      }
    })


    function size(s) {
      return s >= 10 ? s : '0' + s;
    }
    function size(min) {
      return min >= 10 ? min : '0' + min;
    }


  },

  end: function () {

    var that = this;
    clearInterval(that.data.setInter);
    // clearInterval(that.data.timesetInters);
    // clearInterval(that.data.timesetInterm);
    var jiaodu = that.data.jiaodu;

    setTimeout(function () {
      wx.showToast({
        title: '很遗憾 失败了',
        icon: 'none',
        image: '/images/index.jpg',
        duration: 2000
      })
      if (jiaodu >= 0) {
        that.data.setInter1 = setInterval(
          function () {
            var jiaodu = that.data.jiaodu;
            if (jiaodu <= 0) {
              clearInterval(that.data.setInter1)
            }
            var min = that.data.min;
            // var m = 0.6 / min;
            jiaodu -= 0.5;
            that.setData({
              jiaodu: jiaodu,
            });
            console.log(jiaodu);
            if (jiaodu <= 0) {
              clearInterval(that.data.setInter1)
            }
          }
          , 5);
        var s = that.data.s;
        var min = that.data.min;
        min = '00',
          s = '00',
          clearInterval(that.data.timesetInters);
        clearInterval(that.data.timesetInterm);
        that.setData({
          s: s,
          min: min,
          ks: 'none',
          fq: 'none',
          shijian: 'block',
          shijianb: 'none',
        })
      }

    }, 1000)
  },
  jinbi: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    // animation.scale(2, 2).rotate(45).step()
    this.animation.translate(175, -50).step({ duration: 1700 })
    this.setData({
      animationData: animation.export(),
      // jb1: 'none'
    })

    setTimeout(function () {
      // animation.translate(30).step()p
      animation.opacity(0).step(),

        this.setData({
          animationData: animation.export(),
          // jb1:'none'
        })
    }.bind(this), 1700)
  },
  onHide: function () {

  },
  rotateThenScale: function () {
    // 先旋转后放大
    this.animation.rotate(45).step()
    this.animation.scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateAndScaleThenTranslate: function () {
    // 先旋转同时放大，然后平移
    this.animation.rotate(45).scale(2, 2).step()
    this.animation.translate(100, 100).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
  },
  onUnload: function () {
    var that = this;
    clearInterval(that.data.setInter)
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

  touchEnd: function (t) {
    var e = this,
      n = this.data.view;
    this.setData({ endX: t.changedTouches[0].clientX });
    var a = t.changedTouches[0].clientX - this.data.startX;
    if (a < -100) {
      if (this.data.currentIndex >= 1
      ) return; this.setData({
        oldIndex: e.data.currentIndex,
        currentIndex: ++e.data.currentIndex
      }),
        n[this.data.oldIndex].out = "animated fadeOutLeft",
        n[this.data.oldIndex].in = "",
        n[this.data.currentIndex].in = "animated fadeInRight",
        n[this.data.currentIndex].out = ""
        , this.setData({ view: n }),
        this.cleanAnimated(),
        this.showAnimated()
    }
    else if (a > 100) {
      if (this.data.currentIndex <= 0)
        return;
      this.setData({
        oldIndex: e.data.currentIndex,
        currentIndex: --e.data.currentIndex
      }),
        n[this.data.oldIndex].out = "animated fadeOutRight",
        n[this.data.oldIndex].in = "",
        n[this.data.currentIndex].in = "animated fadeInLeft",
        n[this.data.currentIndex].out = "",
        this.setData({ view: n }),
        this.cleanAnimated(),
        this.showAnimated()
    }
  },
  showAnimated: function () {
    var t = this;
    0 === this.data.currentIndex ? (setTimeout(
      function () {
        t.setData({
          one_one: "animated fadeIn",
          one_two: "animated bounceIn"
        }
        )
      }, 1e3),
      setTimeout(function () {
        t.setData({
          one_three: "animated bounceIn"
        })
      }, 1500),
      setTimeout(function () {
        t.setData({
          one_four: "animated bounceIn"
        })
      }, 1800),
      setTimeout(function () {
        t.setData({
          one_five: "animated lightSpeedIn"
        })
      }, 1900)
    ) : 1 === this.data.currentIndex && (setTimeout(function () {
      t.setData({
        two_one: "animated fadeInDown",
        two_two: "animated fadeInUp"
      })
    }, 1e3),
      setTimeout(function () {
        t.setData({
          two_three: "animated zoomIn",
          two_four: "animated zoomIn"
        })
      }, 1200),
      setTimeout(function () {
        t.setData({
          two_three: "two-music-one",
          two_four: "two-music-two"
        })
      }, 2200)
    )
  },
  cleanAnimated: function () {
    0 === this.data.oldIndex ? this.setData({
      one_one: "animated fadeOut",
      one_two: "animated fadeOut",
      one_three: "animated fadeOut",
      one_four: "animated fadeOut",
      one_five: "animated fadeOut"
    })
      :
      1 === this.data.oldIndex && this.setData({
        two_one: "animated fadeOut",
        two_two: "animated fadeOut",
        two_three: "animated fadeOut",
        two_four: "animated fadeOut",
        two_five: "animated fadeOut"
      })
  },
 
  onShow: function () {
    this.showAnimated();
    var t = this;
    setTimeout(function () {
      t.setData({ bottom: "animated slideInUp" })
    }, 2e3
    ),
      setTimeout(function () {
        t.setData({ bottom_one: "animated slideInUp" })
      }, 2100
      ),
      setTimeout(function () {
        t.setData({ bottom_two: "animated slideInUp" })
      }, 2200
      ),
      setTimeout(function () {
        t.setData({ bottom_three: "animated slideInUp" }
        )
      }, 2300
      ),
      setTimeout(function () {
        t.setData({
          bottom_four: "animated slideInUp"
        })
      }, 2400),
      setTimeout(function () {
        t.setData({
          bottom_one: "bottom-4s-move"
        })
      }, 3100),
      setTimeout(function () {
        t.setData({
          bottom_two: "bottom-3s-move"
        })
      }, 3200),
      setTimeout(function () {
        t.setData({
          bottom_three: "bottom-2s-move"
        })
      }, 3300),
      setTimeout(function () {
        t.setData({ bottom_four: "bottom-1s-move" })
      }, 3400)


  },
  onHide: function () {
    this.cleanAnimated(),
      this.setData({
        bottom: "",
        bottom_one: "",
        bottom_two: "",
        bottom_three: "",
        bottom_four: ""
      })
  },
  //点击弹出  


  onUnload: function () { },
  onPullDownRefresh: function () { }
}
);
//# sourceMappingURL=ddemo.js.map
