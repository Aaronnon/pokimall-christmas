// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if (event.Content == '1') {

    try {
      await cloud.openapi.customerServiceMessage.send({
        touser: wxContext.OPENID,
        msgtype: 'text',
        text: {
          content: 'Hello'
        }
      });
      return 'success'
    } catch (err) {
      return err
    }
  } else {
    try {
      await cloud.openapi.customerServiceMessage.send({
        touser: wxContext.OPENID,
        msgtype: 'text',
        text: {
          content: '您好,很高兴为您服务。'
        }
      });
      return 'success'
    } catch (err) {
      return err
    }
  }
}