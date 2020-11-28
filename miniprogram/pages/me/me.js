// miniprogram/pages/me/me.js
var that
var app = getApp();
Page({

  actioncnt: function() {        
    wx.showActionSheet({            
      itemList:  ['群聊',  '好友',  '朋友圈'],
      success: function(res)  {
        console.log(res.tapIndex)
      },
      fail: function(res)  {
        console.log(res.errMsg)
      }
    })   
  },
  /**
   * 页面的初始数据
   */
  data: {
    openid1: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.getOpenid();
    wx.cloud.init({
      env: app.globalData.evn
    })

  },
    // 定义调用云函数获取openid
    getOpenid(){
      let page = this;
      wx.cloud.callFunction({
        name:'login',
        complete:res=>{
          console.log('openid--',res.result.openid)
          var openid0 = res.result.openid;
          that.data.openid1 = openid0;
          console.log(that.data.openid1);
        }
      })
    },
  /**
   * 收藏列表
   */
  onCollectClick:function(event){
    var openidtemp = that.data.openid1;
    wx.navigateTo({
      url: '../collect/collect?openid=' + openidtemp
    })
  },
  /**
   * 发布历史
   */
  onHistoryClick:function(event){
    var openidtemp = that.data.openid1;
    wx.navigateTo({
      url: '../history/history?openid=' + openidtemp
    })
  },
  onRecordClick:function(event){
    var openidtemp = that.data.openid1;
    wx.navigateTo({
      url: '../searchrecord/searchrecord?openid=' + openidtemp
    })
  },

  
})