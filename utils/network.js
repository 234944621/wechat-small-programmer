import { globalUrls } from "urls.js"

const network = {
  getMovieList: function (params) {
    params.type = "movie",
      this.getItemList(params)
  },
  getTvList: function (params) {
    params.type = "youth",
      this. getItemList(params)
  },
  getShowList: function (params) {
   params.type = "education",
   this.getItemList(params)
  },
  getItemList: function (params) {
      var url = "";
      if(params.type ==='movie'){
        url = globalUrls.movieList;
        } else if (params.type === 'youth') {
          url = globalUrls.tvList;
      } else if (params.type === 'education') {
        url = globalUrls.showList;
      }else{}
        var count = params.count ? params.count : 7;
        wx.request({
          url: url,
          data: {
            count: count
          },
          success: function (res) {
            var items = res.data.subject_collection_items;
            if (params && params.success) {
              params.success(items);
            }
          }
        })
  },
  getItemDetail : function (params){
      var type = params.type;
      var id = params.id;
      var url = "";
      if(type ==="movie"){
        url = globalUrls.movieDetail + id;
      } else if (type === "tv"){
        url = globalUrls.tvDetail + id;
      }
      else {
        url = globalUrls.showDetail + id;
      }
      wx.request({
        url : url,
        success : function(res){
        // console.log(res)
        var item = res.data;
        if(params.success){
          params.success(item);
        }

        }
      })
  },
  getItemComments: function (params) {
    var type = params.type;
    var id = params.id;
    var start =params.start?params.start:0;
    var count = params.count ? params.count: 3;
    var url = "";
    if (type === "movie") {
      url = globalUrls.movieComments(id, start, count);
    } else if (type === "tv") {
      url = globalUrls.tvComments(id, start, count);
    }
    else {
      url = globalUrls.showComments(id, start, count);
    }
    wx.request({
      url: url,
      success: function (res) {
        // console.log(res)
        var data = res.data;
        if (params.success) {
          params.success(data);
        }

      }
    }
    )
  },
  //搜索
  getSearch:function(params){
      var q =params.q;
      var url = globalUrls.searchUrl(q);
      wx.request({
        url: url,
        success:function(res){
          console.log(res);
          var subjects = res.data.subjects;
          if(params.success){
            params.success(subjects)
          }
        }
      })
  }
}


export {
  network
}