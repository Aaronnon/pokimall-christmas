// miniprogram/pages/index.js


Page({

  /**
   * 页面的初始数据
   */
  data: {

    clickRules: false,
    clickRewards: false,
    clickContent: false,
    clickDone: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

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
    this.setData({
      clickContent: true
    })
  },
  clickValue(e) {
    if (e.detail.value !== '') {
      console.log(e.detail.value);
    }

  },

  confirmContert() {

    var str = "abcdefghijklmnopqrstuvwxyz0123456789";
    // var arr = [...str]
    var tmp = [];
    var random;
    for (var i = 0; i < 8; i++) {
      random = Math.floor(Math.random() * (str.length));
      if (tmp.indexOf(str[random]) === -1) {
        tmp.push(str[random])
      } else {
        i--;
      }
    }
    // tmp.toString();
    console.log(tmp);
    
    this.setData({
      clickContent: false,
      clickDone: true

    })

  },

  onClickClose() {
    this.setData({
      clickRules: false,
      clickRewards: false,
      clickContent: false,
      clickDone: false

    })
  }

})