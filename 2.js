let goods = textMatches(/¥\d+\.\d+/).findOnce().parent().parent().children();
if (goods) {
    for (let i = 0; i < 5; i++) {
        goods[i].child(5).click();
        sleep(2000);
        back();
        sleep(2000);
    }
}