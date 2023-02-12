/**
 * 淘宝淘金币任务
 * author:selier
 * create:2023.02.10 22:20
 * update:2023.02.11 01:50
 * version:1.0
 */
var common = require('./common.js')
var unlockScreen = require('./unlockScreen.js')
var notify = require('./notify.js')
var config = require("./config.js")
const viewTime = 12000 // 观看视频的等待时间
const waitTime = 1000 // 点击后等待的时间
const findTime = 3000 // 等待控件出现时间
var allMessage = "";
var isSign = false;

var APP = 'com.taobao.taobao'
var NAME = '淘宝'

try {
    console.show()
    // unlockScreen.unlockIfNeed(config.password)
    // openApp(APP)
    // closeAd()
    // openActivity()
    // getTodayReward()
    openTask()
    doTaskList()
    receiveReward()
    receiveTaskReward()
    doPuke()
    doCash()
} catch (ex) {
    log(ex)
} finally {
    // notify.autoSendMessage(NAME, allMessage)
    console.info("任务结束🔚")
}


function openApp(appName) {
    let a = common.getPackageAndName(appName)
    if (!a) {
        return false;
    }
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


function closeAd() {
    log("查找广告弹窗")
    let a = className("android.widget.ImageView").clickable(true).depth(10).desc("浮层关闭按钮").drawingOrder(2).findOne(findTime)
    if (a) {
        log("关闭广告弹窗")
        a.click()
        sleep(waitTime)
    } else {
        log("无广告弹窗")
    }

}

function openActivity() {
    console.hide()
    sleep(waitTime)
    let a = text("领淘金币").findOne(findTime)
    if (a) {
        log("打开领淘金币页面")
        click(a.bounds().centerX(), a.bounds().centerY())
        sleep(findTime)
    }
    console.show()
}

function getTodayReward() {
    log("领取今日奖励")
    // let a = className("android.view.View").clickable(true).depth(13).drawingOrder(0).findOne(findTime)
    // if (a) {
    //     a.click()
    //     console.info("领取今日奖励完成")
    //     sleep(findTime)
    // } else {
    //     let a = className("android.view.View").clickable(true).depth(14).drawingOrder(0).findOne(findTime)
    //     if (a) {
    //         a.click()
    //         console.info("领取今日奖励完成")
    //         sleep(findTime)
    //     }
    // }
    let a = text("今日签到").findOne(findTime)
    if (a) {
        a.parent().child(1).click()
        console.info("领取今日奖励完成")
    }else{
        isSign = true;
        log("领取今日奖励已完成")
    }
}

function openTask() {
    log("打开赚金币任务列表")
    let a = className("android.widget.Button").clickable(true).boundsInside(device.width / 3, 0, device.width, device.height / 2).depth(16).drawingOrder(0).indexInParent(0).findOne(findTime)
    if (a) {
        a.click()
        sleep(findTime)
    }
}

function getTaskList() {
    log("读取任务列表")
    let a = className("android.widget.ListView").depth(13).drawingOrder(0).findOne(findTime)
    if (a) {
        return a;
    }
    return null;
}
function doTaskList() {
    let taskList = getTaskList()
    if (!taskList) {
        throw '未找到任务列表'
    }
    log("开始执行任务")
    for (let i = 1; i < taskList.children().size(); i++) {
        let b = taskList.children().get(i).child(1);
        let taskName = b.child(0).text()
        let getCold = b.child(2).child(1).text()
        let todoButton = taskList.children().get(i).child(2)
        if (todoButton.text() === '明日再来') {
            console.info(taskName, getCold, "完成")
        } else if (todoButton.text() === '领取奖励') {
            continue
        } else {
            log(taskName, getCold)
            if (taskName.indexOf("领取淘金币礼包") > -1) {
                receiveGift(todoButton)
            } else if (taskName.indexOf("去看淘金币省了多少钱") > -1) {
                saveHowMoney(todoButton)
            } else if (taskName.indexOf("免费为好友送淘金币") > -1) {
                sendGold(todoButton)
            } else if (taskName.indexOf("淘金币趣味课堂") > -1) {
                questionClass(todoButton)
            } else if (taskName.indexOf("浏览超值购商品") > -1 || taskName.indexOf("逛精选优品") > -1) {
                viewStore(todoButton)
            } else if (taskName.indexOf("逛农场领免费水果") > -1) {
                continue;
            } else if (taskName.indexOf("去蚂蚁庄园捐爱心蛋") > -1) {
                continue;
            } else if (taskName.indexOf("搜一搜你想要的商品") > -1 || taskName.indexOf("逛猜你喜欢的商品") > -1 || taskName.indexOf("搜一搜你心仪的宝贝") > -1) {
                searchStore(todoButton)
            } else if (taskName.indexOf("玩火爆连连消领金币") > -1) {
                continue;
            } else if (taskName.indexOf("去淘宝斗地主玩1局") > -1) {
                todoButton.click()
                sleep(5000)
                puke()
            } else if (taskName.indexOf("逛大牌") > -1) {
                bigName(todoButton)
            }
        }
    }
}

function bigName(todoButton) {
    todoButton.click()
    sleep("等待中(18秒)...")
    sleep(18000)
    back()
    sleep(findTime)
}

function puke() {
    log("点击托管")
    let button = className("android.view.View").depth(13).drawingOrder(0).clickable(true).indexInParent(3).findOne(findTime)
    button.click()
    log("等待牌局结束(最多3分钟)...")
    let a = text("昵称").findOne(3 * 60 * 000)
    if (a) {
        log("牌局结束，点击返回")

        let left = className("android.view.View").depth(12).drawingOrder(0).clickable(true).indexInParent(0).findOne(findTime)
        left.click()
        sleep(waitTime)
        let leave = text("离开").findOne(findTime)
        if (leave) {
            leave.click()
            sleep(waitTime)

        }
        // log("关闭")
        // let close = text("关闭").findOne(findTime)
        back()
        sleep(waitTime)
        log("返回到任务列表")
        let backClose = className("android.view.View").depth(11).drawingOrder(0).clickable(true).indexInParent(0).findOne(findTime)
        backClose.click()
        console.info("淘宝斗地主", "完成")
        sleep(waitTime)
    }
}

// function searchBaby(todoButton) {
//     todoButton.click()
//     sleep(findTime)
//     let search = text("搜索发现").findOne(findTime)
//     if (search) {
//         let keyword = search.parent().child(1).child(0).child(0)
//         log("搜索宝贝：", keyword.text())
//         keyword.click()
//         log("浏览18秒中")
//         sleep(18000)
//         back()
//         sleep(waitTime)
//         back()
//         sleep(waitTime)
//     }
// }

function searchStore(todoButton) {
    todoButton.click()
    sleep(findTime)
    let keyword = className("android.view.View").depth(11).drawingOrder(9).clickable(true).indexInParent(8).findOne(findTime)
    if (keyword) {
        log("搜索宝贝：", keyword.desc())
        keyword.click()
        log("浏览18秒中")
        sleep(18000)
        console.info("你想要的商品", "完成")
        back()
        sleep(waitTime)
        back()
        sleep(waitTime)
    }
}

function viewStore(todoButton) {
    todoButton.click()
    console.hide()
    sleep(waitTime)
    swipe(device.width / 2, device.height - 300, device.width / 2, device.height / 4, 300)
    for (let i = 0; i < 12; i++) {
        //   这里改为上下滑动
        swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 300)
        sleep(500)
        swipe(device.width / 2, device.height / 4, device.width / 2, device.height / 2, 300)
        sleep(500)
    }
    console.show()
    console.info("浏览商品", "完成")
    back()
    sleep(findTime)
}

function questionClass(todoButton) {
    todoButton.click()
    sleep(waitTime)
    let button = className("android.widget.Button").depth(16).drawingOrder(0).clickable(true).findOne(findTime)
    if (button) {
        button.click()
        console.info("淘金币趣味课堂", "完成")
        sleep(waitTime)
        back()
        sleep(waitTime)
    }
}

function receiveGift(todoButton) {
    todoButton.click()
    console.info("领取淘金币礼包", "完成")
    sleep(waitTime)
}

function saveHowMoney(todoButton) {
    todoButton.click()
    console.info("去看淘金币省了多少钱", "完成")
    sleep(waitTime)
    back()
    sleep(findTime)
}

function receiveReward() {
    log("领取奖励")
    let taskList = getTaskList()
    if (!taskList) {
        throw '未找到任务列表'
    }
    for (let i = 1; i < taskList.children().size(); i++) {
        let b = taskList.children().get(i).child(1);
        let taskName = b.child(0).text()
        let getCold = b.child(2).child(1).text()
        let todoButton = taskList.children().get(i).child(2)
        if (todoButton.text() === '领取奖励') {
            console.info(taskName, getCold, "已领取奖励")
            todoButton.click()
            sleep(waitTime)
        }
    }
}
function receiveTaskReward() {
    log("领取累计任务奖励")
    while (true) {
        let a = text('立即领取').findOne(waitTime)
        if (a) {
            a.click()
            sleep(waitTime)
        } else {
            break;
        }
    }

}

function doPuke() {
    if (isSign) {
        return
    }
    log("打开斗地主")
    let a = textStartsWith("斗地主").findOne(findTime)
    if (!a) {
        return
    }
    a.click()
    sleep(5000)
    log("点击升级可得100钻")
    let level = text("升级可得100钻").findOne(findTime)
    if (!level) {
        throw "未找到升级可得100钻"
    }
    let parent = level.parent().parent()
    click(parent.bounds().centerX(), parent.bounds().centerY())
    sleep(findTime)
    log("经典模式")
    let join = className("android.view.View").depth(14).drawingOrder(0).indexInParent(4).findOne(findTime)
    if (!join) {
        throw "未找到经典模式"
    }

    click(join.bounds().centerX(), join.bounds().centerY())
    sleep(findTime)

    puke()
}

function doCash() {
    let a = text("领现金 +20").findOne(findTime)
    if (!a) {
        return
    }
    log("领现金")
    a.click()
    sleep(findTime)
    back()
}

function sendGold(todoButton) {
    todoButton.click()
    sleep(waitTime)
    let a = text("一键免费送好友").findOne(findTime)
    if (a) {
        a.click()
        console.info("免费为好友送淘金币", "完成")
        sleep(waitTime)
    }
    back()
    sleep(findTime)
}