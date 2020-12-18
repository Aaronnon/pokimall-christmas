// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


let downLoad = async(event, context) => {
    const res = await cloud.downloadFile({
        fileID: 'cloud://poki-6gowbjzme643c931.706f-poki-6gowbjzme643c931-1304496780/christmas/qrcode.png', // 图片的File ID
    })
    const buffer = res.fileContent
    console.log(buffer)
    return buffer
}


let upload = async(Buffer) => {
    return await cloud.openapi.customerServiceMessage.uploadTempMedia({
        type: 'image',
        media: {
            contentType: 'image/png',
            value: Buffer
        }
    })
}


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if (event.Content == '1') {
    let Buffer = await downLoad()
    let meida = await upload(Buffer)
        // console.log(meida)
    try {
     
        const result = await cloud.openapi.customerServiceMessage.send({
            touser: wxContext.OPENID,
            "msgtype": "image",
            "image": {
                "media_id": meida.mediaId
            }
        })
        return result
    } catch (err) {
        return err
    }
  } else {
    try {
      await cloud.openapi.customerServiceMessage.send({
        touser: wxContext.OPENID,
        msgtype: 'text',
        text: {
          content: 
        `
哇！让我康康[让我看看]是哪位小可爱来领取礼品啦？

只需三步❗无门槛❗无邮费❗
$0领取你的礼品！

❶.扫描下方二维码(回复"1",获取二维码)

❷.下载POKI MALL官方APP

❸.联系APP客服
          
SO EASY!!!
      
你的愿望，POKI 帮你实现！
          
⭐ 每天会有多位【锦鲤】诞生！

⭐ 被选中的锦鲤宝宝，客服会通过您许愿时所留下的个人信息，在3个工作日内和您取得联系！

⭐ 分享许愿活动，可以累计经验值，提高愿望被实现的几率哦！

📢 注意事项：
* 许愿活动仅限加拿大地区
* 活动&领奖时间截至
2020.12.21 – 12.27 23:59（EST）`
        }
      });
      return 'success'
    } catch (err) {
      return err
    }
  }
}