//app.js
App({
    onLaunch: function() {

        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                env: 'test-214e26',
                traceUser: true,
            })
        }
        //小程序的版本更新
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function(res) {//监听小程序有版本更新事件
            console.log(res.hasUpdate)
            if (res.hasUpdate) {
                updateManager.onUpdateReady(function() {
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success: function(res) {
                            if (res.confirm) {
                                updateManager.applyUpdate()
                            }
                        }
                    })
                })
            }
        })
        updateManager.onUpdateFailed(function() {
            // 新版本下载失败
        })

    },
    globalData: {
        openid: 'oG8co49QazT9nB-cfDw--YFtKIyU',
        evn: 'test-214e26'
    }
})