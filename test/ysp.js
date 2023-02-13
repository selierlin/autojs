/**
 * 央视频
 * author:selier
 * create:2023.02.01 13:28
 * update:2023.02.02 14:03
 * version:2.0
 */
var common = require('./common.js')
var unlockScreen = require('./unlockScreen.js')
var notify = require('./notify.js')
var config = require("./config.js")
const viewTime = 12000 // 观看视频的等待时间
const waitTime = 1000 // 点击后等待的时间
const findTime = 3000 // 等待控件出现时间
var allMessage = "";
try {
    console.show()
    unlockScreen.unlockIfNeed(config.password)
    common.startQuietModel()
    for (let i = 0; i < 20; i++) {
        try {
            let appName = "央视频" + (i + 1)
            let openResult = openApp(appName)
            if (!openResult) {
                break
            }
            skipAd()
            doTask(appName)
            let myScore = getMyScoreByCenter(appName)
            // openActivity()
            // let result = lottery()
            // log(result)
            log(appName, "任务完成✅")
            allMessage += (appName + "积分 " + myScore + "\n")
        } catch (err) {
            console.error(err)
            log("任务失败❌")
            break;
        }
    }
} finally {
    notify.autoSendMessage("央视频", allMessage)
    common.exitQuietModel()
    console.info("任务结束🔚")
}
function openApp(appName) {
    let a = common.getPackageAndName(appName)
    if (!a) {
        return false;
    }
    console.info("~~~~~~~~~~~~~~")
    console.info("打开", appName)
    app.launchApp(a.appName)
    log("等待(8秒)程序启动加载完成")
    let access = text('允许').findOne(findTime)
    if (access) {
        access.click()
    }
    sleep(8000)
    return true
}

function skipAd() {
    let ad = className("android.widget.ImageView").depth(5).drawingOrder(4).findOne(findTime)
    if (ad) {
        log("关闭广告弹窗")
        ad.parent().child(3).click()
    } else {
        log("无广告弹窗")
    }
}

function openActivity() {
    console.hide()
    // let ac = textContains("五粮液").fondOne(5000)
    let a = text("推荐").findOne().bounds()
    click(a.centerX(), a.centerY())
    sleep(waitTime)
    let ac = className("android.widget.FrameLayout").clickable(true).depth(10).drawingOrder(10).indexInParent(9).findOne(findTime)
    if (!ac) {
        throw '未找到活动'
    }
    log("进入活动")
    ac.click()
    console.show()
    sleep(findTime)

}

function getMyScore() {
    let score = textContains("我的积分").findOne(findTime)
    let myScore = score.text().split(":")[1]
    console.info("我的积分为：" + myScore)
    return myScore
}

function getMyScoreByCenter(appName) {
    log("获取当前积分")
    let online = text("我的").findOne(findTime)
    online.parent().click()
    let pointCenter = text("关注").findOne(findTime)
    let point = pointCenter.parent().parent().child(2).child(0).text()
    console.info(appName, "当前积分", point)
    return point
}

function lottery() {
    let myScore = getMyScore()
    let count = 1;
    for (let i = 0; i < Math.floor(myScore / 10) + 1; i++) {
        let btn = textMatches("(10积分 /次|今日剩余1次免费机会|没有抽奖机会了)").findOne(findTime)
        if (!btn) {
            throw '找不到抽奖按钮'
        }
        log(btn.text())
        if (btn.text() === '没有抽奖机会了') {
            return "没有抽奖机会了"
        } else if (btn.text() === '今日剩余1次免费机会') {
            i--;
        }
        let temp = btn.parent().child(2).bounds()
        click(temp.centerX(), temp.centerY())
        log("第", (count++), "次抽奖中...")
        let a = textMatches("(再试一次|获取更多积分|knowBtn)").findOne(15000)
        // let a = textMatches("((已达)|((.|\\n)*请明日再来))").findOne(waitTime)
        if (!a) {
            throw '未找到抽奖结果'
        }
        console.info("抽奖结果：" + a.text())
        console.info("抽奖结果：" + a.parent().child(0).text())
        switch (a.text()) {
            case "再试一次":
                log("关闭弹窗")
                text("closeBtn").findOne(findTime).click()
                break;
            case "获取更多积分":
                click(a.bounds().centerX(), a.bounds().centerY())
                return '获取更多积分'
            case "knowBtn":
                log("关闭弹窗")
                text("closeBtn").findOne(findTime).click()
                return '操作完成'
            default:
                throw '未找到抽奖结果'
        }
        sleep(waitTime)
    }
}

function doTask(appName) {
    log(appName, ": 开始每日任务")
    viewVideo()
    viewTv()
    viewOnline()
    openTask()
    sign()
    concern()
    back()
    sleep(1000)
}
function getTaskList() {
    let todo = textContains("去完成").findOne(findTime)
    if (todo) {
        log(todo)
    }
}
function sign() {
    log("签到")
    sleep(findTime)
    let a = text("每日任务").findOne(findTime)
    let signBtn = a.parent().child(5)
    if (signBtn.text() !== '已完成') {
        signBtn.click()
        sleep(5000)
        log("返回")
        back()
    }
    console.info("签到已完成")
}
function viewVideo() {
    log("观看视频")
    console.hide()
    sleep(500)
    let a = text("体育").findOne().bounds()
    click(a.centerX(), a.centerY())
    console.show()
    sleep(waitTime)
    for (let i = 0; i < 3; i++) {
        log("第", (i + 1), "次滑动观看中(" + (viewTime / 1000) + "秒)...")
        swipe(device.width / 2, device.height - 300, device.width / 2, device.height / 4, 300);
        sleep(waitTime)
        likeVideo(i)
        sleep(viewTime)
    }
    console.info("观看视频完成")
}
function viewTv() {
    log("观看电视")
    for (let i = 0; i < 3; i++) {
        let a = text("电视").findOne(findTime)
        a.parent().click()
        log("第", (i + 1), "次观看电视中(" + (viewTime / 1000) + "秒)...")
        sleep(viewTime)
        let b = text("首页").findOne(findTime)
        b.parent().click()
        sleep(waitTime)
    }
    console.info("观看电视完成")
}
function viewOnline() {
    log("打开直播")
    let online = text("直播").findOne(findTime)
    online.parent().click()
    console.hide()
    for (let i = 0; i < 3; i++) {
        let a = className("android.widget.FrameLayout").depth(10).drawingOrder(1).indexInParent(0).findOne(findTime)
        if (a) {
            click(a.bounds().centerX(), a.bounds().centerY())
            sleep(viewTime)
            back()
        }
        sleep(1000)
    }
    console.show()
    console.info("观看直播完成")
}
function concern() {
    log("打开关注")
    sleep(findTime)
    let a = text("每日任务").findOne(findTime)
    let signBtn = a.parent().child(13)
    if (signBtn.text() !== '已完成') {
        signBtn.click()
        sleep(findTime)
        for (let i = 0; i < 3; i++) {
            let a = text("关注").findOne(findTime)
            let b = a.parent().parent()
            log("关注", b.child(0).text())
            b.click()
            sleep(500)
        }
        log("返回")
        back()
        sleep(1000)
    }
    console.info("关注完成")
}
function likeVideo(i) {
    log("点赞视频")
    let like = className("android.widget.ImageView").depth(17).drawingOrder(1).findOne(findTime)
    if (like) {
        click(like.bounds().centerX(), like.bounds().centerY())
        console.info("点赞视频完成")
        sleep(waitTime)
        if (i == 0) {
            share(like)
        }
    }
}
function share(like) {
    log("点击分享")
    like.parent().parent().child(2).click()
    log("分享给QQ好友")
    sleep(waitTime)
    let share = text("QQ好友").findOne(2000).parent().bounds()
    sleep(waitTime)
    click(share.centerX(), share.centerY())
    sleep(findTime)
    console.info("分享完成，返回继续观看视频")
    back()
}

function openTask() {
    log("打开任务中心")
    let my = text("我的").findOne(findTime)
    my.parent().click()
    let pointCenter = text("关注").findOne(findTime)
    pointCenter.parent().parent().child(2).click()
}