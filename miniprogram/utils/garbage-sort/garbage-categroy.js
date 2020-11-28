module.exports = {
    RECYCLEABLE: 1, // 可回收物
    HAZARDOUS: 2, // 有害垃圾
    HOUSEHOLD_FOOD: 3, // 厨余垃圾
    RESIDUAL: 4, // 其他垃圾
    ZX_GARBAGE: 5, // 装修垃圾
    BIG_GARBAGE: 6, // 大件垃圾
    NON_LIFE_GARBAGE: 7, // 非生活垃圾

    getCategoryName(value) {
        var categoryNameArray = ['可回收物','有害垃圾','厨余垃圾','其他垃圾','装修垃圾','大件垃圾','非生活垃圾'] ;
        return categoryNameArray[value];//返回ID对应的垃圾名称
    },
};
