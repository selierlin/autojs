var common = require('./common.js')
var unlockScreen = require('./unlockScreen.js')
var notify = require('./notify.js')

for (let i = 0; i < 1; i++) {
    try {
        let appName = "央视频" + (i + 1)
        // openApp(appName)
        // skipAd()
        // openActivity()
        // let myScore = getMyScore()
        // let result = lottery(myScore)
        // if (result == '获取更多积分') {
        doTask(appName)
        // }
        log("任务完成✅")
    } catch (err) {
        console.error(err)
        log("任务失败❌")
    }

}
function openApp(appName) {
    let a = common.getPackageAndName(appName)
    log(a)
    if (!a) {
        throw '找不到' + appName
    }
    app.launchApp(a.appName)
    let access = text('允许').findOne(3000)
    if (access) {
        access.click()
    }
    log("等待8秒程序启动完成")
    sleep(8000)
}

function skipAd() {
    let ad = className("android.widget.ImageView").depth(5).drawingOrder(4).findOne(3000)
    if (ad) {
        log("关闭广告弹窗")
        ad.parent().child(3).click()
    } else {
        log("未找到广告弹窗")
    }
}

function openActivity() {
    // let ac = textContains("五粮液").fondOne(5000)
    let ac = className("android.widget.FrameLayout").clickable(true).depth(10).drawingOrder(10).indexInParent(9).findOne(3000)
    if (!ac) {
        throw '未找到活动'
    }
    log("进入活动")
    ac.click()

}

function getMyScore() {
    let score = textContains("我的积分").findOne(3000)
    if (score) {
        log(score.text())
    }
    let myScore = score.text().split(":")[1]
    log("我的积分为：" + myScore)
    return myScore
}

function lottery(myScore) {
    let btn = textContains("积分 /次").findOne(3000)
    if (btn) {
        log(btn.text())
        let temp = btn.parent().child(2).bounds()
        click(temp.centerX(), temp.centerY())
        log("抽奖中")
        let tip = className("android.widget.TextView").clickable(false).depth(18).drawingOrder(0).indexInParent(0).findOne(15000)
        if (tip) {
            log(tip.text())
            let btnText = tip.parent().child(1)
            if (btnText.text().indexOf('获取更多积分') > -1) {
                btnText.click()
                return '获取更多积分'
            } else {
                log("关闭弹窗")
                text("closeBtn").findOne(3000).click()
            }
        }
    }
}

function doTask(appName) {
    log(appName, ": 开始每日任务")
    // let taskList = getTaskList()
    // sign()
    viewVideo()
    viewTv()
    viewOnline()
    concern()
    likeVideo()
    share()
}
function getTaskList() {
    let todo = textContains("去完成").findOne(1000)
    if (todo) {
        log(todo)
    }
}
function sign() { }
function viewVideo() {
    log("观看视频")
    let a = text("体育").findOne().bounds()
    click(a.centerX(), a.centerY())
    for (let i = 0; i < 3; i++) {
        swipe(device.width / 2, device.height - 300, device.width / 2, device.height / 4, 300);
        sleep(13000)
    }
}
function viewTv() {
    log("观看电视")
let a = text("电视").findOne(3000)
a.parent().click()
let b = text("卫视").findOne(3000)
b.parent().click()
for (let i = 0; i < 3; i++) {
    let tv = className("android.widget.LinearLayout").clickable(true).depth(14).indexInParent(i).findOne(2000)
    tv.click()
    sleep(3000)
    
}
}
function viewOnline() { }
function concern() { }
function likeVideo() { }
function share() { }