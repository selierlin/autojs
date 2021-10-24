"ui";
// author:selier
// update:2021年9月19日12:00:00
// version:1.5.2

var count = 20; // 需要执行多少次
//设置在特定屏幕分辨率下要点击的坐标值(x,y)
setScreenMetrics(1080, 2340);            //声明是基于分辨率1080，2340的点击

ui.layout(
    <vertical>
        <text h="50dp" line="20" />
        <text h="150dp" id="tip" line="20" />
        <text textSize="16sp" textColor="red" text='设置获取地址位置授权等待时间(毫秒)' />
        <input type='text' id="yesTime" text='5000' inputType="number|numberDecimal" />
        <text textSize="16sp" textColor="red" text='设置返回等待时间(毫秒)' />
        <input type='text' id="backTime" text='1000' inputType="number|numberDecimal" />
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
        start();
        // test();
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
// auto.waitFor();

// 启动
function start() {
    var count = dialogs.input("请输入需要执行的次数", "10");
    yesTime = ui.yesTime.getText();
    backTime = ui.backTime.getText();
    clickTime = ui.clickTime.getText();
    if (launchPackage("com.tencent.mm")) {
        toast("启动微信中，请等待5秒");
        sleep(5000);
        toast("准备执行次数：" + count);
        for (let i = 0; i < count; i++) {
            toast("正在执行次数：" + (i + 1));
            sleep(clickTime);
            // 点击第一个聊天用户
            click(540, 323);
            sleep(clickTime);
            // 点击最下面的分享链接
            click(515, 1682);
            // 等待位置授权允许
            sleep(yesTime)
            // 点击允许获取地理位置
            click(730, 2098);
            sleep(clickTime);
            // 返回到首页
            click(991, 161);
            // back();
            sleep(backTime)
            back();
            sleep(backTime)
            // 打开最近使用小程序页面
            openRecApp();
            sleep(clickTime);
            // 删除第一个小程序
            delApp();
            sleep(backTime)
            // 返回到聊天首页
            back();
            sleep(backTime);
        }
        resultToast = "执行完毕，共执行" + count + "次";
        toast(resultToast);
        device.vibrate(1000);
        exit();
    } else {
        toast("打开微信失败");
    }
}


function openRecApp() {
    gesture(300, [540, 323], [540, 323 + 1000]);
}

function delApp() {
    var x = 172.5;
    var y = 625;
    var points = [1500];

    // 位置相同会导致拖动失效问题
    var iCount = 2000 / 4;
    for (let i = 0; i < iCount; i++) {
        points.push([parseInt(x + i % 2), parseInt(y)]);
    }
    points.push([parseInt(x), parseInt(2188)]);
    gesture.apply(null, points);
}