var common = require('./common.js')
var unlockScreen = require('./unlockScreen.js')
var notify = require('./notify.js')
// 王者营地
if (!auto.service) {
    toast('无障碍服务未启动！退出！')
    exit()
}
try {
    unlockScreen.unlockIfNeed()
    console.show()
    openApp()
    view()
    viewRecord();
    openMyTask();
    sign();
    getInterval();
    log("✅任务完成")
    notify.sendPushPlus("王者营地任务完成✅")
} catch (e) {
    log(e)
    notify.sendPushPlus("王者营地任务失败❌")
} finally {
    exit()
    common.killApp('王者营地')
}


function openApp() {
    log("正在打开王者营地...");
    app.launch("com.tencent.gamehelper.smoba")
    log("等待10秒,待app完全启动")
    let access = text('允许').findOne(1000)
    if (access) {
        access.click()
    }
    sleep(10000)
}

function view() {
    let a = text("官方").findOne(3000)
    if (a) {
        let layout = a.parent().parent().parent().parent();
        log("向右➡️滑动")
        layout.parent().parent().scrollRight()
        sleep(1000)
        log("打开世界")
        console.hide()
        let world = text("世界").findOne(3000)
        click(world.bounds().centerX(), world.bounds().centerY())
        sleep(2000)
        console.show()
    }

    log("浏览资讯中")
    className("android.view.ViewGroup").clickable(true).depth(17).drawingOrder(2).indexInParent(1).findOne().click();
    sleep(2000)
    log("点赞")
    var c = id("img_like").findOne().bounds()
    click(c.centerX(), c.centerY());
    sleep(1000)
    click(c.centerX(), c.centerY());
    sleep(1000)
    log("分享给QQ好友")
    var c = text("分享").findOne().bounds()
    click(c.centerX(), c.centerY());
    sleep(1000)
    var d = text("QQ好友").findOne().bounds();
    click(d.centerX(), d.centerY());
    sleep(2000)
    log("分享给好友‘你’")
    var d = text("你").findOne().bounds();
    click(d.centerX(), d.centerY());
    sleep(1000)
    log("发送成功")
    text("发送").findOne().click();
    sleep(2000);
    log("返回王者营地")
    text("返回王者营地").findOne().click();
    sleep(2000)
    log("返回首页")
    back();
    sleep(2000)
}

function viewRecord() {
    log("浏览战绩...")
    className("android.widget.RadioButton").text("战绩").findOne().click();
    console.hide()
    sleep(2000)
    log("点击第一条")
    var a = className("android.view.View").depth(24).drawingOrder(2).indexInParent(1).boundsInside(0, device.height / 2, device.width, device.height).findOne(1000).bounds()
    click(a.centerX(), a.centerY());
    sleep(2000)
    log("滚动")
    swipe(device.width / 2, device.height - 100, device.width / 2, device.height / 2, 300);
    sleep(2000)
    log("点击数据")
    var data = text("数据").findOne(3000).bounds();
    click(data.centerX(), data.centerY());
    log("滚动")
    swipe(device.width / 2, device.height - 100, device.width / 2, device.height / 2, 300);
    console.show()
    sleep(4000)
    log("返回首页")
    back();
    sleep(1000)
}


function openMyTask() {
    log("打开‘我’的主页")
    className("android.widget.RadioButton").text("我").findOne().click();
    sleep(500)
    log("打开每日福利")
    click("每日福利")
    sleep(2000)
}

function sign() {
    log("签到")
    text("立即签到").findOne().click();
    sleep(1000)
    text("确定").findOne().click();
    sleep(500)
}

function getInterval() {
    log("领取奖励")
    click("一键领取")
    sleep(1000)
    log("领取完成")
    click("确定")
    sleep(500)
}
