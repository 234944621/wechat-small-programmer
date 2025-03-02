const globalUrls ={
  movieList:"https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items",
  tvList:"https://m.douban.com/rexxar/api/v2/subject_collection/tv_hot/items",
  showList:"https://m.douban.com/rexxar/api/v2/subject_collection/tv_variety_show/items",
  movieDetail:"https://m.douban.com/rexxar/api/v2/movie/",
  tvDetail: "https://m.douban.com/rexxar/api/v2/tv/",
  showDetail: "https://m.douban.com/rexxar/api/v2/tv/",
movieComments: function(id, start=0, count = 3){
  return "https://m.douban.com/rexxar/api/v2/movie/"+ id + '/interests?count =' + count + '&start=' + start;
},
  tvComments: function (id, start = 0, count = 3) {
  return "https://m.douban.com/rexxar/api/v2/tv/" + id + '/interests?count =' + count + '&start=' + start;
  },
  showComments: function (id, start = 0, count = 3 ) {
  return "https://m.douban.com/rexxar/api/v2/tv/" + id + '/interests?count =' + count + '&start=' + start;
  },
  searchUrl: function(q){
    return"https://m.douban.com/rexxar/api/v2/search?type=movie&q="+q
  }
}
export {globalUrls}