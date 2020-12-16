// miniprogram/pages/index.js
const app = getApp()
const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    rulesPageImg: '',
    rewardsPageImg: '',
    contentsDonePageImg: '',
    clickRules: false,
    clickRewards: false,
    clickContent: false,
    clickContentDone: false,
    clickDone: false,
    clickShare:false,
    progressPercent: 0,
    status: false,
    wish: '',
    weChat: '',
    phone: '',
    tag: '',
    upAnimation:'',
    upAnimation1:'',
    upAnimation2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  SetActive(e) {
    this.setData({
      active: e.detail.value
    })
  },
  onLoad: function (options) {
    let that = this;
    setTimeout(function () {
      that.setData({
        loading: true,
        upAnimation:'upAnimation',
        upAnimation1:'upAnimation1',
        upAnimation2:'upAnimation2'
      })
    }, 500)
    wx.downloadFile({
      url: 'https://706f-poki-6gowbjzme643c931-1304496780.tcb.qcloud.la/christmas/rules.png?sign=18f849511dce8b4d72ba8e58a6479132&t=1607717183',
      success: function (res) {
        if (res.statusCode === 200) {
          const fs = wx.getFileSystemManager()
          fs.saveFile({
            tempFilePath: res.tempFilePath,
            success(res) {
              wx.setStorageSync('rules_preview', res.savedFilePath)
            }
          })
        }
      }
    })

    wx.downloadFile({
      url: 'https://706f-poki-6gowbjzme643c931-1304496780.tcb.qcloud.la/christmas/rewards-list.png?sign=ddcde5c8d821006138b1e7e50e8a7db8&t=1607967394',
      success: function (res) {
        if (res.statusCode === 200) {
          const fs = wx.getFileSystemManager()
          fs.saveFile({
            tempFilePath: res.tempFilePath,
            success(res) {
              wx.setStorageSync('rewards_preview', res.savedFilePath)
            }
          })
        }
      }
    })

    wx.downloadFile({
      url: 'https://706f-poki-6gowbjzme643c931-1304496780.tcb.qcloud.la/christmas/content.png?sign=0288fd8f84e1812f5d209bd56f7b79ea&t=1607969649',
      success: function (res) {
        if (res.statusCode === 200) {
          const fs = wx.getFileSystemManager()
          fs.saveFile({
            tempFilePath: res.tempFilePath,
            success(res) {
              wx.setStorageSync('contents_preview', res.savedFilePath)
            }
          })
        }
      }
    })

    wx.downloadFile({
      url: 'https://706f-poki-6gowbjzme643c931-1304496780.tcb.qcloud.la/christmas/fail.png?sign=a3a737730f7fb414e7abba99716d002c&t=1608077845',
      success: function (res) {
        if (res.statusCode === 200) {
          const fs = wx.getFileSystemManager()
          fs.saveFile({
            tempFilePath: res.tempFilePath,
            success(res) {
              wx.setStorageSync('contents_done_preview', res.savedFilePath)
            }
          })
        }
      }
    })
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
  onShare(){
    this.setData({
      clickContentDone:false,
      clickShare:true
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const newProgress = this.data.progressPercent + Number(0.1)
    const newProgressStr = newProgress.toString()
    const index = newProgressStr.indexOf('.')
    const result = Number(newProgressStr.slice(0, index + 3))

    const result1 = Number(result.toFixed(1))
    this.setData({
      progressPercent: result1
    })
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        _percent: result1
      }
    })
  },

  onClickRules() {
    const path = wx.getStorageSync('rules_preview')
    if (path != null) {
      this.setData({
        rulesPageImg: path
      })
    }
    this.setData({
      clickRules: true
    })
  },

  onClickRewards() {
    const path = wx.getStorageSync('rewards_preview')
    if (path != null) {
      this.setData({
        rewardsPageImg: path
      })
    }
    this.setData({
      clickRewards: true
    })
  },

  onClickContent() {

    const path = wx.getStorageSync('contents_preview')
    if (path != null) {
      this.setData({
        contentsPageImg: path
      })
    }
    const path1 = wx.getStorageSync('contents_done_preview')
    if (path1 != null) {
      this.setData({
        contentsDonePageImg: path1
      })
    }

    if (this.data.weChat !== '') {
      this.setData({
        clickContentDone: true
      })
    } else {
      this.setData({
        clickContent: true
      })
    }

  },
  clickValue(e) {
    const newWish = e.detail.value
    if (e.detail.value !== '') {
      this.setData({
        wish: newWish
      });
    }

  },
  clickWechat(e) {
    const newWechat = e.detail.value
    if (e.detail.value !== '') {
      this.setData({
        weChat: newWechat
      });
    }

  },
  clickPhone(e) {
    const newPhone = e.detail.value
    if (e.detail.value !== '') {
      this.setData({
        phone: newPhone
      });
    }

  },

  confirmContert() {
    if (this.data.weChat != '') {
      const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      // var arr = [...str]
      const tmp = [];
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

      db.collection('users').doc(app.userInfo._id).update({
        data: {
          _wishRound: 0,
          _tag: tmpJoin,
          _phone: this.data.phone,
          _weChat: this.data.weChat,
          _wish: this.data.wish
        }
      })
      this.setData({
        clickContent: false,
        clickDone: true,
        tag: tmpJoin
      })

    }

  },
  onClickCloseShare(){
    this.setData({
      clickShare:false
    })
  },

  onClickCloseRules() {
    this.setData({
      clickRules: false,
    })
  },

  onClickCloseRewards() {
    this.setData({
      clickRewards: false,
    })
  },

  onClickCloseContent() {
    this.setData({
      clickContent: false,
    })
  },
  onClickCloseDone() {
    this.setData({
      clickDone: false
    })
  },
  onClickCloseContentDone() {
    this.setData({
      clickContentDone: false
    })
  },

  getUserInfo(e) {
    let userInfo = e.detail.userInfo
    if (!this.data.status && userInfo) {
      db.collection('users').add({
        data: {
          nickName: userInfo.nickName,
          _wishRound: 1,
          _percent: 0,
          _wish: '',
          _weChat: '',
          _phone: '',
          _tag: '',
          joinTime: new Date(),
        }
      }).then((res) => {
        db.collection('users').doc(res._id).get().then((res) => {
          app.userInfo = Object.assign(app.userInfo, res.data)
          this.setData({
            status: true,
            // clickContent: true
          })

        })

      })
    }
  }



})