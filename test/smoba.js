var unlockScreen = require('./unlockScreen.js')

// 王者营地
if (!auto.service) {
    toast('无障碍服务未启动！退出！')
    exit()
}
unlockScreen.unlockIfNeed()
console.show()
openApp()
view()
viewRecord();
openMyTask();
sign();
getInterval();
log("✅任务完成")
exit()


function openApp() {
    log("正在打开王者营地...");
    app.launch("com.tencent.gamehelper.smoba")
    sleep(10000)
}

function view() {
    log("浏览资讯中")
    className("android.widget.RadioButton").text("资讯").findOne().click();
    sleep(500);
    className("android.view.ViewGroup").depth(26).drawingOrder(12).indexInParent(10).clickable(true).findOne().click()
    sleep(2000)
    log("点赞")
    var c = id("img_like").findOne().bounds()
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
    sleep(2000)
    log("点击第一条")
    var a = className("android.view.View").depth(24).drawingOrder(2).indexInParent(1).findOne().bounds()
    click(a.centerX(), a.centerY());
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
