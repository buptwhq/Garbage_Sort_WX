var that
var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: {},
    searchrecord:{},//搜索记录
    id: '',
    openid: '',
    openidyh: '',
    isLike: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    that = this;
    that.data.id = options.id;
    that.data.openid = options.openid;
    that.getOpenid();
    wx.cloud.init({
      env: app.globalData.evn
    })

    // 获取话题信息
    db.collection('topic').doc(that.data.id).get({
      success: function(res) {
        console.log(res)
        that.topic = res.data;
        that.setData({
          topic: that.topic,
        })
      }
    })

   

  },

  onShow: function() {
    // 获取回复列表
    that.getRecord()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.getOpenid();
  },
  // 定义调用云函数获取openid
  getOpenid(){
    let page = this;
    wx.cloud.callFunction({
      name:'login',
      success:res=>{
        console.log('openid--',res.result.openid)
        var openid0 = res.result.openid;
        that.data.openidyh = openid0;
        console.log(that.data.openidyh);
        that.getRecord();
      }
    })
  },

  getRecord: function() {
    // 获取回复列表
    db.collection('search_record')
      .orderBy('date', 'desc')
      .where({
        _openid: that.data.openidyh
      })
      .get({
        success: function(res) {
          // res.data 包含该记录的数据
          console.log(res)
          that.data.searchrecord = res.data;
          that.setData({
            searchrecord: that.data.searchrecord,
        })
        },
        fail: console.error
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})