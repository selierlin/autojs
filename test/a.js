
// let pointCenter = text("每日签到").findOne(3000)
// getChildText(pointCenter.parent().parent())

// function getChildText(obj) {
//     let i = 0;
//     obj.children().forEach(function (child) {
//         log(i++, child.text())
//     })
// }

// let a = text("每日任务").findOne(3000)
//     let signBtn = a.parent().child(5)
//     if (signBtn.text() !== '已完成') {
//         a.parent().child(5).click()
//         sleep(5000)
//         log("返回")
//         back()
//     }
//     log("签到已完成")

var common = require('./common.js')
log(common.getFormatTime(new Date()))