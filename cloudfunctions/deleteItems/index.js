// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('spend_items')
      .where({
        accountKey: event.accountKey
      })
      .remove()
  } catch (e) {
    console.error(e)
  }
}