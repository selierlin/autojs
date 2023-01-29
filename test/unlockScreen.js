importClass(android.content.Context);
importClass(android.provider.Settings);

var myLog = "";
const w = device.width;
const h = device.height;
const maxSwipeNum = 50;
// 息屏时间/2
const loopTime = getLoopTime();
var myCfg = storages.create("DingDing-SayNo");

/**
 * 获取完全日志
 * @returns {string} 日志
 */
var getLog = function () {
    return myLog;
};

/**
 * 解锁屏幕
 * @param {*} pwd - 密码
 */
var unlockIfNeed = function (pwd) {
    device.wakeUpIfNeeded();
    // 是否需要解锁手机
    if (!hasUnlock()) {
        setLog("已是解锁状态");
        home()
        return;
    }
    if (!isLock()) {
        setLog("未设置解锁密码 直接上滑");
        swipeUp();
        setLog("解锁成功");
    } else {
        setLog("有解锁密码");
        swipeUp();
        
        if (pwd) {
            enterPwd(pwd);
        } else {
            setLog("请配置手机解锁密码");
            exit();
        }
        setLog("解锁完毕");
    }
    home()
    sleep(1000);
}

/**
 * 手机是否需要解锁
 */
function hasUnlock() {
    var km = context.getSystemService(Context.KEYGUARD_SERVICE);
    // 是否处于限制输入模式  true:不响应home键和右软件 false:功能正常
    return km.inKeyguardRestrictedInputMode();
}

/**
 * 手机是否锁屏(不管是否有密码)
 */
function isLock() {
    var km = context.getSystemService(Context.KEYGUARD_SERVICE);
    // 返回点前是否处于锁屏的状态 true:锁屏 false:已解锁
    // 是否设置了锁屏密码 true:有锁屏密码（包含SIM卡锁） false:未设置
    return km.isKeyguardLocked() && km.isKeyguardSecure();
}


/**
 * 上滑至输入密码界面
 */
function swipeUp() {
    if (myCfg.contains("CFG_SWIPE_TIME_")) {
        const CFG_SWIPE_TIME_ = myCfg.get("CFG_SWIPE_TIME_");
        gesture(CFG_SWIPE_TIME_, [w / 2, h * 0.9], [w / 2, h * 0.1]);
        sleep(1000);
        if (swipeUpSuc()) {
            return;
        }
    }
    if (swipeUpMethodOne()) {
        log("方式一上滑成功");
    } else if (swipeUpMethodTwo()) {
        log("方式二上滑成功");
    } else {
        setLog("当前程序无法上滑至桌面或密码输入界面");
        exit();
    }
}

/**
 * 上滑方式一
 */
function swipeUpMethodOne() {
    var xyArr = [220];
    var x0 = w / 2;
    var y0 = h / 4 * 3;
    var angle = 0;
    var x = 0;
    var y = 0;
    for (let i = 0; i < 30; i++) {
        y = x * tan(angle);
        if ((y0 - y) < 0) {
            break;
        }
        var xy = [x0 + x, y0 - y];
        xyArr.push(xy);
        x += 5;
        angle += 3;
    }
    gesture.apply(null, xyArr);
    function tan(angle) {
        return Math.tan(angle * Math.PI / 180);
    }
    return swipeUpSuc();
}

/**
 * 上滑方式二
 */
function swipeUpMethodTwo() {
    let swipeTime = 0;
    let addTime = 20;
    for (let i = 0; i < maxSwipeNum; i++) {
        swipeTime += addTime;
        gesture(swipeTime, [w / 2, h * 0.9], [w / 2, h * 0.1]);
        sleep(1000);
        if (swipeUpSuc()) {
            myCfg.put("CFG_SWIPE_TIME_", swipeTime);
            return true;
        }
    }
    return false;
}

/**
 * 判断上滑结果
 */
function swipeUpSuc() {
    let km = context.getSystemService(Context.KEYGUARD_SERVICE);
    // 判断是否在锁屏界面
    if (!km.inKeyguardRestrictedInputMode()) {
        return true;
    }
    for (let i = 0; i < 10; i++) {
        if (!text(i).clickable(true).exists() && !desc(i).clickable(true).exists()) {
            return false;
        }
    }
    return true;
}

/**
 * 输入手机解锁密码
 * @param {*} pwd - 密码
 */
function enterPwd(pwd) {
    //点击
    if (text(0).clickable(true).exists()) {
        for (var i = 0; i < pwd.length; i++) {
            a = pwd.charAt(i)
            sleep(200);
            text(a).clickable(true).findOne().click()
        }
    } else {
        for (var i = 0; i < pwd.length; i++) {
            a = pwd.charAt(i)
            sleep(200);
            desc(a).clickable(true).findOne().click()
        }
    }
}
/**
 * 根据当前自动息屏时间获取循环时间
 */
function getLoopTime() {
    let lockTime = Settings.System.getInt(context.getContentResolver(), Settings.System.SCREEN_OFF_TIMEOUT);
    if (null == lockTime || "" == lockTime || "undefined" == lockTime) {
        return 8000;
    }
    return lockTime / 2;
}

/**
 * 保存日志
 * @param {*} msg - 日志
 */
function setLog(msg) {
    log(msg);
    msg += '\n\n';
    myLog += msg;
}

module.exports.unlockIfNeed = unlockIfNeed;
module.exports.getLog = getLog;