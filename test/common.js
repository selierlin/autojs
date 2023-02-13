
var common = {};
var musiceVolume = 0;
var brightness = 0;
/**
 * 关闭应用
 * @param {string} packageName  应用包名
 */
common.killAppByRoot = function killAppByRoot(packageName) {
    shell('am force-stop ' + packageName, true);
};

/**
 * 关闭应用
 * @param {string} name 应用名称
 */
common.killApp = function (name) {
    recents();// 进入任务窗口
    var appObj = desc(name + ",未加锁").findOne(1000)
    if (appObj != null) {
        var app = appObj.bounds();//获取应用的bounds布局属性
        log("滑动关闭:" + name)
        swipe(app.centerX(), app.centerY(), device.width, app.centerY(), 300);//模拟滑屏
        sleep(1000);
    } else {
        log("未找到后台:" + name)
    }
    back();//返回
}

/**
 * 关闭应用
 * @param {string} name 包名/应用名称
 * @returns 关闭结果
 */
common.killAppBySetting = function (name) {
    var obj = getPackageAndName(name)
    if (!obj) {
        return;
    }
    app.openAppSetting(packageName);
    text(appName).waitFor();
    let is_sure = textMatches(/(.*强行.*|.*停止.*|.*结束.*|结束运行)/).findOne(3000);
    if (is_sure && is_sure.enabled()) {
        is_sure.parent().click();
        textMatches(/(.*确.*|.*定.*)/).findOne().click();
        log(appName + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        log(appName + "应用不能被正常关闭或不在后台运行");
        back();
    }
}

common.getPackageAndName = function (name) {
    // 根据应用名称获取包名
    var packageName = getPackageName(name);
    var appName = name;
    if (!packageName) {
        // 获取不到,尝试根据包名获取
        if (getAppName(name)) {
            packageName = name;
            appName = getAppName(packageName);
        } else {
            console.error('未找到' + name)
            return null;
        }
    }
    return { packageName: packageName, appName: appName }
}

common.getFormatTime = function (date, fmt) {
    if (typeof date === 'string') {
        return date;
    }
    if (!fmt) {
        fmt = "yyyy-MM-dd hh:mm:ss"
    }
    var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), //时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds(), //毫秒
    }

    if (!date || date == null) return null;

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}


common.startQuietModel = function () {
    try {
        log("开启静默模式")
        musiceVolume = device.getMusicVolume()
        brightness = device.getBrightness()
        device.setMusicVolume(0)
        device.setBrightness(100)
    } finally {
        toast("请允许修改系统设置后，继续运行脚本")
    }
}

common.exitQuietModel = function () {
    try {
        log("退出静默模式")
        device.setMusicVolume(musiceVolume)
        device.setBrightness(brightness)
    } finally {
        toast("请允许修改系统设置后，继续运行脚本")
    }
}

module.exports = common;