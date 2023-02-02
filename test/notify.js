let config = require("./config.js")
let common = require("./common.js")
var notify = {};

notify.sendPushPlus = function (title, content) {
    let url = 'https://www.pushplus.plus/send';
    const body = {
        token: config.pushPlusToken,
        title: title.replace(/[\r\n]/g, ""),
        content: content + common.getFormatTime(new Date()),
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
        content: content + '\n发送时间: ' + common.getFormatTime(new Date()),
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
    if (!content) {
        console.error("没有内容")
    }
    let url = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=' + config.QYWX_KEY;
    const body = {
        msgtype: 'text',
        text: {
            content: content + '\n通知时间: ' + common.getFormatTime(new Date()),
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

notify.autoSendMessage = function (title, content) {
    if (!content) {
        console.error("没有内容")
    }
    if (config.QYWX_KEY) {
        this.sendQywx(content);
    }
    if (config.pushPlusToken) {
        this.sendPushPlus(title, content);
    }
    if (config.pushPlusToken && config.pushPlusTopic) {
        this.sendPushPlusGroup(title, content);
    }
}
module.exports = notify;
