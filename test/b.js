var common = require('./common.js')
const viewTime = 12000 // 观看视频的等待时间
const waitTime = 1000 // 点击后等待的时间
const findTime = 3000 // 等待控件出现时间



// let a = text("斗地主 +20").findOne(findTime)
// if (!a) {
//     return
// }
// a.click()
// sleep(5000)
let level = text("升级可得100钻").findOne(findTime)
if (!level) {
    exit()
}
let parent = level.parent().parent()
click(parent.bounds().centerX(), parent.bounds().centerY())
sleep(findTime)
let join = className("android.view.View").depth(14).drwaingOrder(0).indexInParent(4).findOne(findTime)
if (!join) {
    exit()
}
click(join.bounds().centerX(), join.bounds().centerY())