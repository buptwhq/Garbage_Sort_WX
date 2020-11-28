const checkPermission = scope =>//箭头函数，参数为scope
    new Promise((resolve, reject) => {
        wx.getSetting({//获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
            success: res => {
                // 是否存在认证配置
                console.log(res);
                let hasAuthorized = res.authSetting.hasOwnProperty(scope);//确定对象是否具有具有指定名称的属性
                console.log('hasAuthorized:'+hasAuthorized);

                if (hasAuthorized) {//判断是否已经操作过授权操作
                    // 已授权
                    if (res.authSetting[scope]) {
                        resolve('已授权')
                        return
                    }
                    // 用户曾拒绝，提示进入小程序设置页面，wx限制:需要主动点击才能执行openSetting()，因此使用modal
                    wx.showModal({
                        title: '没有权限',
                        content: '体验该功能仍需要您授权功能权限，现在前往设置开启',
                        success: res => {
                            if (res.confirm) {//用户点击确定
                                reject('设置页面')
                                wx.openSetting()
                            } else if (res.cancel) {//用户点击取消
                                reject('不进入设置')
                            }
                        }
                    })
                }else{//用户未曾操作过授权
                    console.log('getSetting里面无该权限,申请授权1！');
                    wx.authorize({//提前向用户发起授权请求,如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
                        scope: scope,
                        success () {
                            resolve('已授权1');
                        },fail(){
                            reject('申请授权失败！');

                        }
                    })
                }
            },
            fail: err => {
                console.error(err);
                reject(err.errMsg) }
        })
    });
//提供对外的接口
module.exports = {
    checkPermission: checkPermission,
}