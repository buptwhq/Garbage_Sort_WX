const  searchGarbage = require('../../utils/garbage-search.js');
const db = wx.cloud.database();
var util = require('../../utils/util.js')


Page(
    {
    data: {
      datas:[],
      searchText:"",
        noResult:"没有查到结果，换个词试试奥~",
      logo:"",
  },

 
  onLoad: function (options) {
      if(options.searchText){
          this.setData({
              searchText:options.searchText//为data.searchText赋值
          });
        this.onGetData(options.searchText);//调用onGetData()进行搜索以及数据库上传
      }
  },
  searchIcon:function(e){//与输入框绑定的函数
      console.log('search:'+JSON.stringify(e));//显示结果，并将js值转为JSON格式，方便显示
      if(!e.detail.value){//空
        return ;
      }
      this.setData({
          searchText:e.detail.value
      });
    console.log("====="+e.detail.value)
    this.onGetData(this.data.searchText)
  },
  onGetData:function(text){
    console.log("搜索text:"+text);
      db.collection('search_record').add({
          data:{
                keyword:text,
                date:util.formatTime(new Date())
          },
          success:function(res){
             console.log('保存搜索记录：',JSON.stringify(res));
          },
          fail:function(error){
              console.error('保存搜索记录错误：'+error);

          }
      });
    var that=this
    var searchResult = new Array();

     searchGarbage.search(text, function success(res){//data.datas的赋值
       console.log('searchResult:'+res);
         searchResult = res;
         that.setData({
             datas:searchResult
         })
     });

      console.log('datas:'+JSON.stringify(this.data.datas));
      console.log('that.searchText:'+that.data.searchText);
      console.log(!that.data.datas);
      console.log(that.data.searchText.length>0);
      console.log(that.data.datas);


  },
  onItemClick:function(event){
    var index =event.currentTarget.dataset.index
    var logoImg=""
    console.log(index)
    switch (parseInt(index)) {
      case 1:
        logoImg = "/images/RecycleableWaste.jpg"
        break;
      case 2:
        logoImg = "/images/HazardouAwaste.jpg"
        break;
      case 3:
        logoImg = "/images/HouseholdfoodWaste.jpg"
        break;
      case 4:
        logoImg = "/images/ResidualWaste.png"
        break;
    }
    console.log(logoImg)
    this.setData({
      logo:logoImg,
      isShow:!this.data.isShow
    })
  }
  
})