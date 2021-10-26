"ui";
// author:selier
// update:2021年9月12日00:09:18
// version:1.2.0

var count = 20; // 需要执行多少次
//设置在特定屏幕分辨率下要点击的坐标值(x,y)
setScreenMetrics(1080, 2340);            //声明是基于分辨率1080，2340的点击



ui.layout(
    <vertical>
        <button id="start" text="开始运行"/>
        <button id="exit" text="退出软件"/>
    </vertical>
);
ui.start.click(()=>{
    toast("开始运行");
    threads.start(function(){
        auto.waitFor();
        start();
    });
});
ui.exit.click(()=>{
    toast("关闭");
    exit();    
});



// 启动
function start() {

    auto.waitFor();
    var count = dialogs.input("请输入需要执行的次数", "10");
    if (launchPackage("com.tencent.mm")) {
        sleep(2000);
        while (className('android.widget.LinearLayout').id('a4k').findOnce() == null) {
            toast("请回到桌面，手动打开一次微信");
            sleep(3000);
        }
        toast("准备执行次数：" + count);
        for (let i = 0; i < count; i++) {
            if (className('android.widget.LinearLayout').id('a4k').exists()) {
                toast("正在执行次数：" + (i + 1));
                // 打开聊天窗口
                className('android.widget.LinearLayout').id('a4k').findOnce().click();
                sleep(1000);

                // 打开UV链接
                clickMiniApp();
                // 这里视网络情况加载，等待弹出地址授权
                // sleep(2000);
                // 等待允许出现
                while (!click('允许')) { }
                // sleep(2000);

                while (!desc('关闭').findOnce().click()) { }
                toast("关闭");
                sleep(1000);

                back();
                toast("返回");
                sleep(1000);
                // 打开最近使用小程序
                openRecApp();
                sleep(1000);
                //删除小程序
                delApp();
                sleep(1000);
                back();
                sleep(1000);
            } else {
                toast("当前未找到真快乐小程序，退出");
            }
        }
    } else {
        toase("打开微信失败");
    }
    toast("执行完毕");
    exit();

}

function clickMiniApp() {
    if (className('android.widget.ImageView').depth(22).id('at1').exists()) {
        // 点击小程序
        let happy = className('android.widget.ImageView').depth(22).id('at1').findOne().bounds();
        click(happy.centerX(), happy.centerY());
    } else {
        toast("当前页面未找到真快乐小程序");
        exit();
    }

}
function openRecApp() {
    // 打开最近使用小程序
    var target = className('android.widget.LinearLayout').id('a4k').findOne().bounds();
    gesture(300, [target.centerX(), target.centerY()], [target.centerX(), target.centerY() + 1000]);
}


//删除小程序
function delApp() {
    // 第一次调试获取的classname
    // var target = className('android.widget.LinearLayout').id('dtm').findOne().bounds();
    // 09-11 最近调试获取的classname
    var target = className('android.widget.RelativeLayout').depth(27).id('dtm').findOne().bounds();

    // target.scrollDown();
    var x = target.centerX();
    var y = target.centerY();
    var points = [1500];

    // 位置相同会导致拖动失效问题
    var iCount = 2000 / 4;
    for (let i = 0; i < iCount; i++) {
        points.push([parseInt(x + i % 2), parseInt(y)]);
    }
    points.push([parseInt(x), parseInt(2188)]);
    gesture.apply(null, points);
}