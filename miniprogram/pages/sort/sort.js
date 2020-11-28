const app = getApp();
Page({
  data: {
    ColorList: [
      "../../images/RecycleableWaste.jpg",
      "../../images/HazardouAwaste.jpg",
      "../../images/KitchenWasteIcon1.png",
      "../../images/OtherWasteIcon2.png",
    ]
  },
  onLoad:function(){
      wx.showShareMenu({
          withShareTicket: true //要求小程序返回分享目标信息
      })
  },
  goSearch: function () {
    wx.navigateTo({
      url: '/pages/ai/search',
    })
  },
  onClick:function(e){
   // console.log(JSON.stringify(e))
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
        url: '/pages/sort/detail/index?type=' + (index+1)

    })
  }
})