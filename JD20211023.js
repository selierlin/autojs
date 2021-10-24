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
if(textContains("打卡领红包").exists()){
    console.info("成功进入活动界面");
    click(938,1555)
    sleep(3000);
}
while(textContains("8s").exists()){
    taskName = textContains("8s").findOnce();
    console.log(taskName.text());
    taskName.parent().child(3).click();
    sleep(1000);
    
    doTimeTask();
    back();
    sleep(2000);
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
        sleep(9000);
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