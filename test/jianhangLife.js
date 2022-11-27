// 建行生活
openApp()

function openApp() {
    log("正在打开...");
    app.launch("com.ccb.longjiLife")
    sleep(3000)
    click(300, 1930)
    sleep(8000)
}
// sign()
function sign() {
    log("进入签到")
    text("会员有礼").findOne().parent().child(19).click()
    sleep(1000);
    text("立即签到").click()
    log("签到完成")
    sleep(500)
    log("返回")
    back()
    sleep(1000)
}

coujian()
function coujian() {
    log("进入抽奖")
    text("会员有礼").findOne().parent().child(20).click()
    sleep(5000);
    let count = getChangeCount()
    if (count > 0) {
        for (let i = 0; i < count; i++) {
            textEndsWith("抽奖机会").findOne().parent().child(4).child(0).child(1).click()
            // className("android.widget.TextView").depth(14).findOne().click()
            sleep(6000)
        }
    }
    let result = getCoujianResult()
    log(result)
    text("我知道了").findOne().click()
    sleep(1000)
    back()
    sleep(1000)
}

function getChangeCount() {
    let change = textEndsWith("抽奖机会").findOne().text()
    log(change)
    return change.substring(4, 5);
}
function getCoujianResult(){
    return text("我知道了").findOne().parent().parent().child(0).text();
}