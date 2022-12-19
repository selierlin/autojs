var unlockScreen = require('./unlockScreen.js')
var common = require('./common.js')
var notify = require('./notify.js')
unlockScreen.unlockIfNeed()
sleep(2000)

var APP = 'com.ccb.longjiLife'
var NAME = '建行生活'
var LEFT = 300;
var RIGHT = 788;
var hasTwo = 0;// 是否有两个分身

// 建行生活
doLife1()
if (hasTwo) {
    doLife2()
}

function doLife1() {
    openApp(LEFT)
    let a = sign()
    if (a) {
        lottery()
    }
    home()
    sleep(1000)
    common.killApp(NAME)
}

function doLife2() {
    openApp(RIGHT)
    let a = sign()
    if (a) {
        lottery()
    }
    home()
    sleep(1000)
    common.killApp(NAME)
}



function openApp(a) {
    log("正在打开...");
    app.launch(APP)
    let cancel = text("取消").findOne(2000)
    if (cancel) {
        hasTwo = 1;
        log("找到两个app,准备循环执行")
        if (a == LEFT) {
            let aa = text(NAME).boundsInside(0, device.height / 2, device.width / 2, device.height).findOne()// 获取左边的
            log("打开左边的app")
            click(aa.bounds().centerX(), aa.bounds().centerY());
        } else {
            let aa = text(NAME).boundsInside(device.width / 2, device.height / 2, device.width, device.height).findOne()// 获取右边的
            log("打开右边的app")
            click(aa.bounds().centerX(), aa.bounds().centerY());
        }
    }
    log("等待8秒,待app完全启动")
    sleep(8000)
}

function sign() {
    log("进入签到")
    let member = text("会员有礼").findOne(3000)
    log("搜索会员有礼:" + member)
    if (!member) {
        log("未找到会员有礼")
        notify.sendPushPlus("第" + (hasTwo + 1) + "个账号 未找到会员有礼")
        log("返回")
        back()
        sleep(1000)
        return false;
    } else {
        member.parent().child(19).click()
        sleep(1000);
        let a = text("立即签到").findOne(6000)
        if (a) {
            a.click()
            log("签到完成")
            notify.sendPushPlus("第" + (hasTwo == 1) + "个账号 签到完成")
        } else {
            log("今日已经签到")
            notify.sendPushPlus("第" + (hasTwo + 1) + "个账号 今日已经签到")
        }
        sleep(500)
    }

    log("返回")
    back()
    sleep(1000)
    return true;
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