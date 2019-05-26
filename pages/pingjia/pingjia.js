// pages/evaluate/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default_score: 5,
    score_text_arr: ['非常差', '差', '一般', '好', '非常好'],
    score_text: "",
    score_img_arr: [],
    upload_pic: [],
    upload_pic_name: [],
    upload_succ: true,
    pic_length: false,
    is_upload: false,
    delete_ico: "https://7368-shiguangshucheng-9845f6-1259049166.tcb.qcloud.la/差(1).png",
    camera_pic: "https://7368-shiguangshucheng-9845f6-1259049166.tcb.qcloud.la/相机(1).png",
    goods_img: "https://7368-shiguangshucheng-9845f6-1259049166.tcb.qcloud.la/泰戈尔诗选.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      // order_id: options.order_id,
      // goods_id: options.goods_id,
      // goods_ext_id: options.goods_ext_id
    });

    this.get_goods(options.goods_id, options.goods_ext_id)
    this._default_score(this.data.default_score);

  },

  get_goods: function (goods_id, goods_ext_id) {
    var that = this;
    wx.request({
      // url: 'https://xxx.com/home/goods/goodsEvaluate',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token'),
        // goods_id: that.data.goods_id,
        // goods_ext_id: that.data.goods_ext_id
      },
      success: function (res) {
        that.setData({
          goods_img: res.data.goods_ext_image,
        });

      }
    })
  },

  _default_score: function (tauch_score = 0) {
    var score_img = [];
    var score = 0;
    for (let i = 0; i < 5; i++) {
      if (i < tauch_score) {
        score_img[i] = "https://7368-shiguangshucheng-9845f6-1259049166.tcb.qcloud.la/五星好评点击后.png"
        score = i;
      } else {
        score_img[i] = "https://7368-shiguangshucheng-9845f6-1259049166.tcb.qcloud.la/五星好评未点击.png"
      }
    }

    this.setData({
      score_img_arr: score_img,
      score_text: this.data.score_text_arr[score]
    });
  },

  onScore: function (e) {
    var score = e.currentTarget.dataset.score;
    this._default_score(score);
  },

  chooseImage(e) {
    var that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        var addImg = res.tempFilePaths;
        var pic_length = false;
        if (addImg.length < 3) {
          pic_length = false;
        } else {
          pic_length = true;
        }
        that.setData({
          upload_pic: addImg,
          pic_length: pic_length,
          is_upload: true
        })
      }
    })

  },

  //上传评论
  onSubmit: function () {
    var that = this;
    var is = false;
    var upload_picture_list = that.data.upload_pic
    var upload_img = []
    for (var i in upload_picture_list) {
      that.upload_file_server(that, upload_picture_list, i)
    }

    setTimeout(function () {
      if (that.data.upload_succ) {
        var ddd = [];
        for (var i in that.data.upload_pic_name) {
          console.log(that.data.upload_pic_name[i]);
          ddd.push(that.data.upload_pic_name[i])
        }
        console.log(that.data.upload_pic_name);
        wx.request({
          // url: 'https://xxx.com/home/order/addEvaluate',
          method: 'POST',
          data: {
            token: wx.getStorageSync('token'),
            order_evaluate: {
              // "order_id": that.data.order_id,
              // "goods_id": that.data.goods_id,
              // "goods_ext_id": that.data.goods_ext_id,
              "img_name": that.data.upload_pic_name
            },

          },
          success: function (res) {

          }
        })
      }
    }, 800);



  },

  upload_file_server: function (that, upload_picture_list, i) {
    var upload_task = wx.uploadFile({
      header: { "Content-Type": "multipart/form-data" },
      // url: "https://xxx.com/home/goods/goodsEvaluatePic",
      filePath: upload_picture_list[i],
      name: 'img_file',
      formData: {
        token: wx.getStorageSync('token'),

      },
      success: function (res) {

        let json_data = JSON.parse(res.data);
        if (json_data.code == 200) {

          let img_name = json_data.img_name;

          that.data.upload_pic_name[i] = img_name;
          that.setData({
            upload_pic_name: that.data.upload_pic_name
          })

        } else {
          that.data.upload_succ = false;
          wx.showToast({
            title: json_data.msg,
            icon: 'loading',
            duration: 2000
          })
        }

      }
    });

  },

  deletePic: function (e) {
    var pic_index = e.currentTarget.dataset.pic_index;
    var upload_pic = [];
    for (let i in this.data.upload_pic) {
      if (i != pic_index) {
        upload_pic.push(this.data.upload_pic[i])
      }
    }
    console.log(upload_pic)
    this.setData({
      upload_pic: upload_pic,
      pic_length: false,
      is_upload: true
    })

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})