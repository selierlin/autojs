var unlockScreen = require('./unlockScreen.js')
var common = require('./common.js')
var notify = require('./notify.js')

var APP = 'com.ccb.longjiLife'
var NAME = '建行生活'
var LEFT = 300;
var RIGHT = 788;
var allMessage = '';
// 建行生活
// unlockScreen.unlockIfNeed()
// sleep(2000)
// doLife("1760", LEFT)
doLife("159", RIGHT)

function doLife(name, index) {
    try {
        openApp(index)
        let a = sign(name)
        console.log(allMessage)
        common.killApp(NAME)
    } finally {
        notify.sendQywx(allMessage)
    }

}

function openApp(index) {
    log("正在打开...");
    app.launch(APP)
    // sleep(1000)
    // click(index, 1930)
    // let a = text("建行生活").boundsInside(device.width / 2, 0, device.width, device.height).findOne(3000)
    // click(a.parent().bounds().centerX(),a.parent().bounds().centerY())
    // log("等待8秒,待app完全启动")
    sleep(8000)
}

function sign(name) {
    // 判断是否有弹窗
    // let ad = className("android.widget.Image").depth(16).drawingOrder(0).indexInParent(0).clickable(true).findOne(3000)
    // if (ad) {
    //     log("关闭弹窗")
    //     ad.click();
    //     sleep(1000)
    // }
    log("搜索会员有礼")

    let member = text("会员有礼").findOne(3000)
    if (!member) {
        allMessage += ("账号[" + name + "] 未找到会员有礼")
        return;
    } else {
        member.parent().child(member.indexInParent() + 3).click()
        sleep(1000);
        let a = text("立即签到").findOne(3000)
        if (a) {
            a.click()
            log("签到完成")
            allMessage += ("账号[" + name + "] 签到完成✅")
            return true;
        } else {
            allMessage += ("找不到签到按钮，不可签到")
            return false;
        }
    }
}


function lottery() {
    log("进入抽奖")
    text("会员有礼").findOne().parent().child(20).click()
    sleep(5000);
    let count = getChangeCount()
    if (count <= 0) {
        log('已抽奖')
        return;
    } else {
        for (let i = 0; i < count; i++) {
            textEndsWith("抽奖机会").findOne().parent().child(4).child(0).child(1).click()
            sleep(6000)
        }

        let result = getLotteryResult()
        log(result)
        if (result.indexOf('恭喜')) {
            log(text("我知道了").findOne().parent().parent().child(2).text())
        }
        text("我知道了").findOne().click()
        sleep(1000)
    }
    back()
    sleep(1000)
}

function getChangeCount() {
    let change = textEndsWith("抽奖机会").findOne().text()
    log(change)
    return change.substring(4, 5);
}

function getLotteryResult() {
    return text("我知道了").findOne().parent().parent().child(0).text();
}