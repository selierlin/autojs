var appName = "真快乐|国美电器";
console.show()
// 点击app的分享链接
let a = textMatches("(" + appName + ").*?").findOne(1000)
log(a)
if (!a) {
    throw "未找到 " + appName + "的分享链接"
}
log("打开分享链接")
console.hide()
sleep(1000)
let temp = a.parent().parent().bounds()
click(temp.centerX(), temp.centerY())
console.show()