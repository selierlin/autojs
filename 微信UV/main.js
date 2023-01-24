"ui";
// author:selier
// create:2021年9月19日12:00:00
// update:2023年1月24日13:40:00
// version:2.0

var count = 20; // 需要执行多少次
//设置在特定屏幕分辨率下要点击的坐标值(x,y)
setScreenMetrics(1080, 2340);            //声明是基于分辨率1080，2340的点击

// 小程序名称
var appName = "真快乐|国美电器";
// 设置获取地址位置授权时等待时间
var yesTime;
// 设置返回等待时间
var backTime;
// 设置点击等待时间
var clickTime;
ui.layout(
    <vertical>
        <text h="50dp" line="20" />
        <text h="150dp" id="tip" line="20" />
        <text textSize="16sp" textColor="red" text='设置获取地址位置授权时等待时间(毫秒)' />
        <input type='text' id="yesTime" text='5000' inputType="number|numberDecimal" />
        <text textSize="16sp" textColor="red" text='设置返回等待时间(毫秒)' />
        <input type='text' id="backTime" text='1500' inputType="number|numberDecimal" />
        <text textSize="16sp" textColor="red" text='设置点击等待时间(毫秒)' />
        <input type='text' id="clickTime" text='1000' inputType="number|numberDecimal" />
        <text h="50dp" textSize="16sp" textColor="green" text='以上配置如果遇到问题可自行调整' />
        <button id="start" text="开始运行" />
        <button id="exit" text="退出软件" />
    </vertical>
);
ui.start.click(() => {
    toast("开始运行");
    threads.start(function () {
        auto.waitFor();
        try {
            start();
            log("任务完成✅")
        } catch (e) {
            console.error(e)
            log("任务失败❌")
        } finally {
            exit();
        }
    });
});
ui.exit.click(() => {
    toast("关闭");
    exit();
});
var tipText = "首次点击“开始运行”，会自动打开设置并手动开启无障碍模式。";
tipText += "\n\n小米手机：设置-无障碍-已下载的服务-真快乐助手-[开启]";
tipText += "\n\noppo手机：设置-其它设置-无障碍-真快乐助手-[开启]";
tipText += "";
ui.tip.setText(tipText);


// 启动
function start() {
    var count = dialogs.input("请输入需要执行的次数", "50");
    if (!launchPackage("com.tencent.mm")) {
        toast("打开微信失败");
        return;
    }
    yesTime = ui.yesTime.getText();
    backTime = ui.backTime.getText();
    clickTime = ui.clickTime.getText();
    console.show()
    log("启动微信中，请等待5秒");
    sleep(5000);
    log("总共需要执行 %d 次", count);
    for (let i = 0; i < count; i++) {
        doTask(i + 1)
    }
    log("执行完毕，共执行 %d 次", count);
    device.vibrate(1000);
}

function doTask(index) {
    log("正在执行第 %d 次", index);
    openFriend();
    openShareUrl();
    // 等待位置授权允许
    sleep(yesTime)
    // 获取地理位置:这里点击返回跳过
    // 返回到首页
    backFun(3);
    // 打开最近使用小程序页面
    openRecApp();
    // 删除第一个小程序
    delRecAppV2();
    // 返回到聊天首页
    backFun(1);
}

function openFriend() {
    log("点击第一个好友")
    let friend = id("com.tencent.mm:id/bth").findOne(3000)
    if (!friend) {
        throw "未找到好友"
    }
    friend.click();
    sleep(clickTime);
}

function openShareUrl() {
    // 点击app的分享链接
    let a = textMatches("(" + appName + ").*?").findOne(1000)
    if (!a) {
        throw "未找到 " + appName + "的分享链接"
    }
    log("打开分享链接")
    console.hide()
    sleep(1000)
    let temp = a.parent().parent().bounds()
    click(temp.centerX(), temp.centerY())
    console.show()
}

function openRecApp() {
    // gesture(300, [540, 323], [540, 323 + 1000]);
    log("打开最近使用的小程序")
    gesture(300, [device.width / 2, device.height / 2], [device.width, device.height]);
    sleep(clickTime);
}

function backFun(count) {
    for (let i = 0; i < count; i++) {
        log("返回")
        back();
        sleep(backTime)
    }
}

// function delRecApp() {
//     var x = 172.5;
//     var y = 625;
//     var points = [1500];

//     // 位置相同会导致拖动失效问题
//     var iCount = 2000 / 4;
//     for (let i = 0; i < iCount; i++) {
//         points.push([parseInt(x + i % 2), parseInt(y)]);
//     }
//     points.push([parseInt(x), parseInt(2188)]);
//     gesture.apply(null, points);
// }

function delRecAppV2() {
    log("删除小程序 " + appName)
    let a = textMatches("(" + appName + ").*?").findOne(3000)
    if (a) {
        console.hide()
        let temp = a.bounds()

        var x = temp.centerX();
        var y = temp.centerY();
        var points = [1500];

        // 位置相同会导致拖动失效问题
        var iCount = 2000 / 4;
        for (let i = 0; i < iCount; i++) {
            points.push([x + i % 2, y]);
        }
        points.push([x, 2188]);
        gesture.apply(null, points);
        console.show()
        sleep(backTime)
    } else {
        throw "没有找到【" + appName + "】"
    }
}