let tip = className("android.widget.TextView").clickable(false).depth(18).drawingOrder(0).indexInParent(0).findOne(15000)
if (tip) {
    let btnText = tip.parent().child(1).text()
    log(btnText)
    let btnResult = tip.parent().child(2)
    if (btnResult.text().indexOf('获取更多积分') > -1) {
        btnResult.click()
    } else {
        log("关闭弹窗")
        text("closeBtn").findOne(3000).click()
    }
}