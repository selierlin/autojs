var common = require('./common.js')
const viewTime = 12000 // 观看视频的等待时间
const waitTime = 1000 // 点击后等待的时间
const findTime = 3000 // 等待控件出现时间


// let keyword = className("android.view.View").depth(11).drawingOrder(9).clickable(true).indexInParent(8).findOne(findTime)
let keyword = text('趋势热搜').findOne(findTime)
if (keyword) {
    let key = keyword.parent().child(1).child(0);
    click(key.bounds().centerX(), key.bounds().centerY())
    log("搜索宝贝：", key.text()())
    log("浏览18秒中")
    sleep(18000)
    console.info("你想要的商品", "完成")
    back()
    sleep(waitTime)
    back()
    sleep(waitTime)
}