// miniprogram/pages/index.js
const app = getApp()
const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {

    clickRules: false,
    clickRewards: false,
    clickContent: false,
    clickContentDone:false,
    clickDone: false,
    progressPercent: 0,
    status: false,


    wish: '',
    weChat: '',
    phone: '',
    tag:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then((res) => {
      db.collection('users').where({
        _openid: res.result.openid
      }).get().then((res) => {
        if (res.data.length) {
          app.userInfo = Object.assign(app.userInfo, res.data[0])
          this.setData({
            status: true,
            progressPercent: app.userInfo._percent,
            weChat: app.userInfo._weChat,
            phone: app.userInfo._phone,
            wish: app.userInfo._wish,
            tag: app.userInfo._tag
          })
        }
      })
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const newProgress = this.data.progressPercent + 0.1
    const newProgressStr = newProgress.toString()
    const index = newProgressStr.indexOf('.')
    const result = Number(newProgressStr.slice(0, index + 2))

    this.setData({
      progressPercent: result
    })
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        _percent: result
      }
    })
  },

  onClickRules() {
    this.setData({
      clickRules: true
    })
  },

  onClickRewards() {
    this.setData({
      clickRewards: true
    })
  },

  

  onClickContent() {
    if(app.userInfo._wishRound){
      this.setData({
        clickContent: true
      })
    }else{
      this.setData({
        clickContentDone: true
      })
    }

  },
  clickValue(e) {
    const newWish = e.detail.value
    if (e.detail.value !== '') {
      this.setData({
        wish: newWish
      });
      db.collection('users').doc(app.userInfo._id).update({
        data: {
          _wish: newWish
        }
      })
    }

  },
  clickWechat(e) {
    const newWechat = e.detail.value
    if (e.detail.value !== '') {
      this.setData({
        weChat: newWechat
      });
      db.collection('users').doc(app.userInfo._id).update({
        data: {
          _weChat: newWechat
        }
      })
    }

  },
  clickPhone(e) {
    const newPhone = e.detail.value
    if (e.detail.value !== '') {
      this.setData({
        phone: newPhone
      });
      db.collection('users').doc(app.userInfo._id).update({
        data: {
          _phone: newPhone
        }
      })
    }

  },

  confirmContert() {
    

    var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    // var arr = [...str]
    var tmp = [];
    var random;
    var tmpJoin = ''
    for (var i = 0; i < 8; i++) {
      random = Math.floor(Math.random() * (str.length));
      if (tmp.indexOf(str[random]) === -1) {
        tmp.push(str[random])
      } else {
        i--;
      }
    }
    tmpJoin = tmp.join('')
    console.log(tmpJoin);

    this.setData({
      clickContent: false,
      clickDone: true,
      tag:tmpJoin
    })
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        _wishRound: 0,
        _tag:tmpJoin
      }
    })

  },

  onClickClose() {
    this.setData({
      clickRules: false,
      clickRewards: false,
      clickContent: false,
      clickDone: false,
      clickContentDone:false
    })
  },

  getUserInfo(e) {
    let userInfo = e.detail.userInfo
    if (!this.data.status && userInfo) {
      db.collection('users').add({
        data: {
          userPhoto: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          _wishRound: 1,
          _percent: 0,
          _wish: '',
          _weChat: '',
          _phone: '',
          _tag:'',
          joinTime: new Date(),
        }
      }).then((res) => {
        db.collection('users').doc(res._id).get().then((res) => {
          app.userInfo = Object.assign(app.userInfo, res.data)
          this.setData({
            status: true,
            clickContent: true
          })

        })

      })
    }
  }

})