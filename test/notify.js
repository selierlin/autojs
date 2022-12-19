let config = require("./config.js")
var notify = {};

notify.sendPushPlus = function (title, content) {
    let url = 'https://www.pushplus.plus/send';
    const body = {
        token: config.pushPlusToken,
        title: title.replace(/[\r\n]/g, ""),
        content: content + new Date(),
    };

    var res = http.post(url, body);
    if (res) {
        let response = res.body.string();
        log("PushPlus result=" + response)
    } else {
        console.error("pushplus 发送失败")
    }
}

notify.sendPushPlusGroup = function (title, content) {
    let url = 'https://www.pushplus.plus/send';
    const body = {
        token: config.pushPlusToken,
        title: title.replace(/[\r\n]/g, ""),
        content: content + '\n发送时间: ' + new Date(),
        topic: config.pushPlusTopic
    };

    var res = http.post(url, body);
    if (res) {
        let response = res.body.string();
        log("PushPlus result=" + response)
    } else {
        console.error("pushplus 发送失败")
    }
}


notify.sendQywx = function (content) {
    if (!config.QYWX_KEY) {
        console.error("企业微信机器人 未读取到配置 QYWX_KEY")
        return
    }
    let url = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=' + config.QYWX_KEY;
    const body = {
        msgtype: 'text',
        text: {
            content: content + '\n通知时间: ' + new Date(),
        }
    };

    var res = http.postJson(url, body);
    if (res) {
        let response = res.body.string();
        log("企业微信机器人 result=" + response)
    } else {
        console.error("企业微信机器人 发送失败")
    }
}

module.exports = notify;
