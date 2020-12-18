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
    clickShare: false,
    progressPercent: 0,
    status: false,
    wish: '',
    weChat: '',
    phone: '',
    tag: '',
    upAnimation: '',
    upAnimation1: '',
    upAnimation2: '',
    wishes: [],
    contents: '',
    contents1: '',
    display: true,
    gift: [{
        barcode: 4901301375056,
        name: 'KAO 花王果味口气清新漱口水'
      },
      {
        barcode: 4975541027587,
        name: 'CHARLEY 苹果葡萄发酵液浴盐入浴剂 40g'
      },
      {
        barcode: 4997770096943,
        name: 'Daiso 大创 ER胎盘素美白保湿乳液 120ml'
      },
      {
        barcode: 4901417601452,
        name: '【橄榄精华】Kracie 植物性滋润保湿洗面奶 130g'
      },
      {
        barcode: 4991936383281,
        name: 'HONYARADOH虹雅堂 柴犬香味玩偶'
      },
      {
        barcode: 4582469492375,
        name: 'Lavons Room Fragance 室内固体香薰芳香剂'
      },
      {
        barcode: 8806325623984,
        name: 'LION 狮王 抑菌杀菌温和清洁泡沫洗手液 沁悦花香型 250ml'
      },
      {
        barcode: 8809479165874,
        name: 'Duft & Doft 牡丹香氛滋润身体乳'
      },
      {
        barcode: 4571889666800,
        name: 'GIK PRP血清胶原蛋白面膜抽取式'
      },
      {
        barcode: 4560119224699,
        name: '【全身精油】Diane Bonheur 发、脸、身体三合一精油 100ml'
      },
      {
        barcode: 4975541016765,
        name: 'CHARLEY 滋润护手霜 cherry blossom/sweet flower/fresh butter'
      },
      {
        barcode: 8809542872043,
        name: 'Merbliss 限量红宝石 红润密集滋养活力面膜'
      },
      {
        barcode: 8809480651557,
        name: 'Angel Looka 冰淇凌甜筒身体乳'
      }
    ]
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
        upAnimation: 'upAnimation',
        upAnimation1: 'upAnimation1',
        upAnimation2: 'upAnimation2'
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
    const _ = db.command
    db.collection('users').where({
      _wishRound: 0
    }).get().then(res => {
      this.setData({
        wishes: res.data
      });
      var num = Math.ceil(Math.random() * (this.data.wishes.length) - 1);
      var num1 = Math.ceil(Math.random() * (this.data.wishes.length) - 1);
      this.setData({
        contents: this.data.wishes[num]._wish,
        contents1: this.data.wishes[num1]._wish
      })
    })

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
      }).then((res => {
        setTimeout(() => {
          this.setData({
            display: false
          })
        }, 2500);
      }))
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
  onShare() {

    this.setData({
      clickContentDone: false,
      clickShare: true
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const newProgress = this.data.progressPercent + Number(5)
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

      var num = Math.ceil(Math.random() * (this.data.gift.length) - 1);
      const winGift = this.data.gift[num]

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
          _wish: this.data.wish,
          _gift: winGift
        }
      })
      this.setData({
        clickContent: false,
        clickDone: true,
        tag: tmpJoin
      })
    }

  },
  onClickCloseShare() {
    this.setData({
      clickShare: false
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
          _gift: {},
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