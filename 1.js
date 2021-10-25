// if(textMatches(".*?\(\d\/\d\)").exists()){
//     console.log(textMatches(".*?\(\d/\d\)").find().size());
// }
let flag = true;
while (flag) {
    let tasks = textMatches(/.*?\(.*?\)/).find();
    console.log(tasks[2].text());
    if (tasks) {
        for (let i = 0; i < tasks.size(); i++) {
            let task = tasks[i];
            task.parent()
            let taskName = task.text();
            if (taskName.indexOf("邀请好友") > -1) {
                continue;
            }
            let taskNameSub = taskName.substring(taskName.indexOf("(") + 1, taskName.length - 1);
            let taskTextArr = taskNameSub.split("/");
            if (taskTextArr && taskTextArr[0] == taskTextArr[1]) {
                continue;
            }
            for (let i = 0; i < taskTextArr[1] - taskTextArr[0]; i++) {
                let taskTag = task.parent().child(2).text();
                console.log(taskTag);
                task.parent().child(3).click();
                if (taskName.indexOf("城城分") > -1) {
                    sleep(5000);
                    console.log(城城分);
                    // 关闭弹出的窗口
                    textContains("红包").findOnce().parent().child(0).click();
                    sleep(1000);
                    text("624393fabf2293cb").findOnce().click();
                    sleep(1000);
                    back();
                    sleep(1000);
                } else if (taskName.indexOf("去浏览") > -1 || taskName.indexOf("加购") > -1) {
                    sleep(5000);
                    // 获取页面上所有的商品
                    let goods = textMatches(/¥\d+\.\d+/).findOnce().parent().parent().children();
                    if (goods) {
                        // 只遍历5次
                        for (let i = 0; i < 5; i++) {
                            // 可能有6的情况
                            // goods[i].child(6).click();
                            goods[i].child(5).click();
                            sleep(2000);
                            back();
                            sleep(2000);
                        }
                    }
                } else if (taskTag.indexOf("8s") > -1) {
                    console.log("8s");
                    doTimeTask();
                } else {
                    falg = false;
                }
                back();
                sleep(3000);
            }
        }
    } else {
        flag = false;
    }
}
// console.log(textMatches(/.*?\(.*?\)/).find().size());

// console.log(textContains("7/7").findOnce().text());


function doTimeTask() {
    // 监听文本控件
    let flag = listenText("浏览.*?汪汪币");
    if (flag) {
        console.log("任务倒计时中...")
        sleep(9000);
        console.info("完成任务")
    } else {
        console.warn("未找到任务倒计时，返回任务");
    }
}

function listenText(text) {
    let flag = false;
    count = 0;
    while (count < 20) {
        if (textMatches(text).exists()) {
            flag = true;
            break;
        }
        count++;
        sleep(500);
    }
    return flag;
}