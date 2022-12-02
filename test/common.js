
var common = {};

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
            log('未找到' + name)
            return null;
        }
    }
    return { packageName: packageName, appName: appName }
}


module.exports = common;