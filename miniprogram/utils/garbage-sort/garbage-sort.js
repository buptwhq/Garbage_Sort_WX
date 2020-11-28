
var garbage_data = require('./garbage-sort-data.js');
var sorts = [
    {
        color: "#014782",
        bgcolor: "#e9e8e6",
        logo: "../../../images/RecycleableWaste.jpg",
        name: "可回收物",
        content: "适宜回收利用和资源化利 用的，如：玻、金、塑、 纸、衣",
        desc: "酱油瓶、玻璃杯、平板玻璃、易拉罐、饮料瓶、 洗发水瓶、塑料玩具、书本、报纸、广告单、 纸板箱、衣服、床上用品等",
        action: ["轻投轻放", "清洁干燥，避免污染", "废纸尽量平整", "立体包装物请清空内容物，清洁后压扁投放","有尖锐边角的，应包裹后投放"],
    },
    {
        color: "#e73322",
        bgcolor: "#c8e2f8",
        logo: "../../../images/HazardouAwaste.jpg",
        name: "有害垃圾",
        content: "对人体健康或者自然环境造成直接或潜在危害的废弃物",
        desc: "废电池、油漆桶、荧光灯管、废药品及其包装物等",
        action: ["投放时请注意轻放", "易破损的请连带包装或包裹后轻放","如易挥发，请密封后投放"],
    },
    {
    color:"#664035",
    bgcolor: "#d6d5d4",
    logo:"../../../images/chuyulaji.png",
    name:"厨余垃圾",
    content: "家庭、餐饮企业、集体食堂、农贸市场产生的易腐性垃圾",
    desc: "剩菜剩饭、瓜皮果核、菜帮菜叶、废弃食物、食物残渣、水产品等",
    action: ["大块骨头和椰子壳、榴莲壳等不易生化降解，不宜作为厨余垃圾，可作为其他垃圾投放。","纯液体(如牛奶等)，可直接倒入下水口。"],
},{
    color: "#2c2b27",
    bgcolor: "#e9e8e6",
    logo: "../../../images/qitalaji.png",
    name: "其他垃圾",
    content: "除可回收物、有害垃圾、厨余垃圾之外的生活垃圾，难以辨识类别的生活垃圾",
    desc: "餐巾纸、卫生纸、纸尿裤、卫生巾、塑料袋、陶瓷碟碗、食品袋(盒)、保鲜膜(袋)、大骨头、玉米棒、坚果壳、烟头、灰土、头发、橡皮泥、干电池等",
    action: ["尽量沥干水分", "难以辨识类别的生活垃圾投入其他垃圾容器内"],

}];

function init(categroy, that, callback) {
  if (categroy <= 0){
    return false;
  }
  var temData = that.data.wxaSortPickerData;
  if(typeof temData == 'undefined'){
      temData = {};
  }
  that.wxaSortPickerUpper = wxaSortPickerUpper;
  that.wxaSortPickerLower = wxaSortPickerLower;
  that.wxaSortPickerScroll = wxaSortPickerScroll;
  that.wxaSortPickerTemTagTap = wxaSortPickerTemTagTap;
  setViewWH(that);

  buildTextData(that,categroy);
}

function buildTextData(that,categroy){

  //读取某类垃圾数据
var textData = {};
    var  garbage_sort_data = garbage_data.garbage_sort_data;
    garbage_sort_data.forEach(function (item){
        if(item.categroy ===categroy){
            textData = item.data ;
        }
    })

   // console.log("textData:"+JSON.stringify(textData)) ;
    var temData = that.data.wxaSortPickerData;
    if(typeof temData == 'undefined'){
            temData = {};
    }
    temData.textData = textData;
    that.setData({
        wxaSortPickerData: temData
    });

    that.setData({
        sort: sorts[categroy-1]
    });

   // console.log(that.data.wxaSortPickerData);
    //console.log('sort:'+JSON.stringify(that.data.sort));

}

function wxaSortPickerUpper(e) {
    //console.dir(e);
}

function wxaSortPickerLower(e) {
    //console.dir(e);
}

function wxaSortPickerScroll(e) {
    //console.log(e.detail.scrollTop);
}

function setViewWH(that) {
    wx.getSystemInfo({
        success: function (res) {
            // console.dir(res);
            var windowWidth = res.windowWidth;
            var windowHeight = res.windowHeight;
            var temData = that.data.wxaSortPickerData;
            if(typeof temData == 'undefined'){
                temData = {};
            }
            var view = {};
            view.scrollHeight = windowHeight;
            temData.view = view;
            that.setData({
                wxaSortPickerData: temData
            })
        }
    })
}

function wxaSortPickerTemTagTap(e) {
    var that = this;
    var temData = that.data.wxaSortPickerData;
    temData.wxaSortPickertoView = e.target.dataset.tag;
    //console.log(temData)
    that.setData({
        wxaSortPickerData: temData
    });
}

module.exports = {
    init: init
}