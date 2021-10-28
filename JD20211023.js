//本脚本需手动进入活动界面，且打开任务列表才可起效
//针对<京东双11（2021年）>活动有效
//author：Selier
auto.waitFor();//无障碍服务检测
setScreenMetrics(1080, 2340);//声明是基于分辨率 1080,2340 的点击
while (textContains("打卡领红包").findOnce() == null) {
    toast("请手动进入活动页面");
    sleep(6000);
}
console.show();//开启悬浮窗
if (textContains("打卡领红包").exists()) {
    console.info("成功进入活动界面");
    click(938, 1555)
}

let flag = true;
while (flag) {
    // 查找任务列表下所有任务
    console.log("获取任务列表");
    sleep(3000);
    let tasks = textMatches(/.*?\(.*?\)/).find();
    let taskArr = [];
    if (tasks) {
        for (let i = 0; i < tasks.size(); i++) {
            // 当前任务对象
            let task = tasks[i];
            // 任务名称
            let taskName = task.text();
            // 任务标签
            let taskTag = task.parent().child(2).text();
            // 排除任务
            if (taskName.indexOf("邀请好友") > -1 || taskName.indexOf("小程序") > -1 || taskTag.indexOf("小程序") > -1 || taskName.indexOf("去下单") > -1) {
                continue;
            }
            // 完成任务数
            let completeCount = taskName[taskName.indexOf("(") + 1];
            // 总任务数
            let allCount = taskName.substring(taskName.indexOf("/") + 1, taskName.length - 1);
            if (allCount - completeCount > 0) {
                console.log("任务：" + taskName + "，" + taskTag + "，" + completeCount + "，" + allCount);
                taskArr.push(task);
            }
        }
        if (taskArr && taskArr.length > 0) {
            for (let i = 0; i < taskArr.length; i++) {
                let task = taskArr[i];
                // 任务名称
                let taskName = task.text();
                // 任务标签
                let taskTag = task.parent().child(2).text();
                // 完成任务数
                let completeCount = taskName[taskName.indexOf("(") + 1];
                // 总任务数
                let allCount = taskName.substring(taskName.indexOf("/") + 1, taskName.length - 1);

                if (allCount - completeCount <= 0) {
                    // 任务已经完成，返回
                    continue;
                }
                for (let i = 0; i < allCount - completeCount; i++) {
                    console.log(taskTag);
                    // 进入任务
                    task.parent().child(3).click();

                    // 任务逻辑处理
                    if (taskName.indexOf("城城分") > -1) {
                        sleep(5000);
                        // 关闭弹出的窗口
                        if (textContains("红包").exists()) {
                            textContains("红包").findOnce().parent().child(0).click();
                        } else if (textContains("邀请").exists()) {
                            textContains("邀请新朋友").findOnce().parent().child(2).click();
                        } else {
                            back();
                            sleep(3000);
                            continue;
                        }

                        sleep(1000);
                        text("624393fabf2293cb").findOnce().click();
                        sleep(1000);
                        back();
                        sleep(1000);
                    } else if (taskName.indexOf("去浏览") > -1 || taskName.indexOf("加购") > -1) {
                        sleep(5000);
                        // 获取页面上所有的商品
                        let goods = textMatches(/¥\d+\.\d+/).findOnce().parent().parent().children();
                        if (goods) {
                            // 只遍历5次
                            for (let i = 0; i < 5; i++) {
                                // 可能有6的情况
                                // goods[i].child(6).click();
                                goods[i].child(5).click();
                                sleep(2000);
                                back();
                                sleep(2000);
                            }
                        }
                    } else if (taskName.indexOf("首页") > -1) {
                        // TODO
                        sleep(3000);
                        for (let i = 0; i < 5; i++) {
                            click(686, 1334);
                            sleep(3000);
                            back();
                            sleep(2000);
                        }
                        back();
                        sleep(2000);
                        click(1000, 1627);
                        break;
                    } else if (taskName.indexOf("去种草城") > -1) {
                        if (textContains("汪汪币").exists()) {
                            sleep(5000);
                            // 只遍历5次
                            for (let i = 0; i < 5; i++) {
                                textContains("汪汪币").findOnce().parent().parent().child(2).child(4).click();
                                sleep(2000);
                                back();
                                sleep(3000);
                            }
                        }
                    } else if (taskTag.indexOf("8s") > -1) {
                        doTimeTask();
                        sleep(2000);
                    } else if (taskTag.indexOf("浏览可得") > -1 || taskTag.indexOf("浏览并关注") > -1) {
                        sleep(5000);
                    } else {
                        flag = false;
                    }
                    console.log("返回")
                    back();
                    sleep(3000);
                }
            }
        } else {
            flag = false;
        }
    } else {
        flag = false;
    }

}



console.log("所有任务已完成，若有剩余可再启动一次脚本或手动完成");
console.log("结束任务");
// home();
sleep(3000);
console.log("已退出脚本");
engines.myEngine().forceStop()



function doTimeTask() {
    // 监听文本控件
    let flag = listenText("浏览.*?汪汪币");
    if (flag) {
        console.log("任务倒计时中...")
        sleep(10000);
        console.info("完成任务")
    } else {
        console.warn("未找到任务倒计时，返回任务");
    }
}

function listenText(text) {
    flag = false;
    count = 0;
    while (count < 40) {
        if (textMatches(text).exists()) {
            flag = true;
            break;
        }
        count++;
        sleep(500);
    }
    return flag;
}