//本脚本需手动进入活动界面，且打开任务列表才可起效
//针对<淘宝双11（2021年）>活动有效
//author：Selier
auto.waitFor();//无障碍服务检测
setScreenMetrics(1080, 2340);//声明是基于分辨率 1080,2340 的点击

while (text("赚糖领红包").findOnce() == null) {
    toast("请手动进入活动首页");
    sleep(6000);
}
console.show();//开启悬浮窗
if (text("赚糖领红包").exists()) {
    enterTask("赚糖领红包");
    console.info("成功进入任务列表");
    sleep(3000);
}
if (text("去完成").exists() || text("去浏览").exists()) {
    //关键字作为任务类型
    var hasTask = true;
    while (hasTask) {
        /* if(textContains("蚂蚁森林").exists()){
            // taskObj = textContains("蚂蚁森林").findOnce();
            // console.info(taskObj.text());
            // taskObj.click();
            // sleep(10000);
            // console.hide();
            // click(224,780);
            // sleep(500);
            // click(358,700);
            // sleep(500);
            // click(477,644);
            // sleep(500);
            // click(624,640);            
            // sleep(500);
            // click(757,709);
            // sleep(500);
            // click(867,805);
            // sleep(1000);
            // back();
            // sleep(1000);
            // back();
            // console.show();
            // console.info("任务完成");
            continue;
        }else  */
        if (textContains("每日签到").exists()) {
            enterTask("每日签到");
            sleep(1000);
            console.log("任务完成");
        } else if (textContains("浏览天天领现金").exists()) {
            enterTask("浏览天天领现金");
            sleep(2000);
            // 点击天天领钱
            click(399, 1750);
            doTimeTask();
            back();
        } else if (textContains("预售爆款种草指南(0/1)").exists()) {
            enterTask("预售爆款种草指南(0/1)");
            doTimeTask();
            back();
        } else if (textContains("预售爆款种草指南(0/1)").exists()) {
            enterTask("预售爆款种草指南(0/1)");
            doTimeTask();
            back();
        } else if (textContains("逛逛天猫主会场(0/1)").exists() && findButton("逛逛天猫主会场(0/1)")) {
            enterTask("逛逛天猫主会场(0/1)");
            doTimeTask();
            back();
        } else if (textContains("报名品牌会员挑战计划(0/1)").exists()) {
            enterTask("报名品牌会员挑战计划(0/1)");
            doTimeTask();
            back();
        } else if (textContains("小互动(0/1)").exists()) {
            enterTask("小互动(0/1)");
            sleep(1000);
            // 点击 开始互动
            click(519, 1568);
            sleep(5000);
            // 开始游戏：跑酷
            for (var i = 0; i < 30; i++) {
                click(250, 1680);
                sleep(100);
                click(820, 1690);
                sleep(100);
                click(519, 1568);
                sleep(100);
            }
            console.log("任务完成");
            back();
        } else if (textContains("浏览精选商品").exists() && findButton1("浏览精选商品")) {
            // 进入任务
            taskName = textContains("浏览精选商品").findOnce().parent().parent().child(0).text();
            enterTask(taskName);
            // 做时间相关任务
            doTimeTask();
            back();
            sleep(1000);
        } else if (textContains("浏览15").exists() && findButton("浏览15")) {
            // 进入任务
            taskName = textContains("浏览15").findOnce().parent().parent().child(0).text();
            enterTask(taskName);
            // 做时间相关任务
            doTimeTask();
            back();
            sleep(1000);
        } else {
            hasTask = false;
        }
        sleep(1000);
    }
}

// 自动领取
while (true) {
    if (text("立即领取").exists()) {
        text("立即领取").findOnce().click();
        sleep(1000);
        if (text("关闭").exists()) {
            text("关闭").click();
        }
    } else { break; }
}
// 回到首页
while (text("赚糖领红包").findOnce() == null) {
    console.log("回到任务首页");
    text("关闭").findOnce().click();
    sleep(1000);
}

clickSugar();
sleep(3000);
console.log("任务完成，退出脚本");
engines.myEngine().forceStop()




function doTimeTask() {
    // 监听文本控件
    let flag = listenText("浏览得奖励");
    if (flag) {
        console.log("任务倒计时中...")
        sleep(16000);
        console.info("完成任务")
    } else {
        console.warn("未找到任务倒计时，返回任务");
    }
}

function enterTask(taskName) {
    taskObj = textContains(taskName).findOnce();
    console.log(taskObj.text());
    taskObj.click();
}

function findButton(taskName) {
    return textContains(taskName).findOnce().parent().parent().parent().child(1).text() != "已完成";
}

function findButton1(taskName) {
    return textContains(taskName).findOnce().parent().parent().child(1).text() != "已完成";
}
function listenText(text) {
    flag = false;
    count = 0;
    while (count < 40) {
        if (textContains(text).exists()) {
            flag = true;
            break;
        }
        count++;
        sleep(500);
    }
    return flag;
}

function clickSugar() {
    if (textContains("点击赢红包").exists()) {
        sugar = textContains("点击赢红包").findOnce();
        sugarCount = sugar.text().split("，")[1];
        console.info("当前共有" + sugarCount + "个骰子");
        if (sugarCount && sugarCount > 0) {
            for (var i = 0; i < sugarCount; i++) {
                console.log("第" + (i + 1) + "个");
                sugar.click();
                sleep(5000);
            }
        }
    }
}





