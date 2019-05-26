// 云函数入口文件
// const cloud = require('wx-server-sdk')
// npm install--save wx - server - sdk@latest
// 初始化云函数
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var date = new Date()
  var seperator1 = "-"
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var d = date.getDay()
  var h = date.getHours()
  var m = date.getMinutes()
  var s = date.getSeconds()
  m = checkTime(m)
  s = checkTime(s)
  if (month >= 1 && month <= 9) {
    month = "0" + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate
  }
  // 格式化当前时间
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
 
}