// for (let i = 0; i < 3; i++) {
//     let tv = className("android.widget.LinearLayout").clickable(true).depth(14).indexInParent(i).findOne(2000)
//     log(tv)
//     tv.click()
//     sleep(3000)

// }

let tv = className("android.widget.LinearLayout").idContains('bottom').clickable(true).focusable(true).depth(14).drawingOrder(2).indexInParent(3).boundsInside(0, 0, device.width, device.height/2).findOne(2000)
log(tv)
if (tv) {
    tv.click()

}

// let tv = className("androidx.recyclerview.widget.RecyclerView").idContains('board_bottom').clickable(false).focusable(true).depth(13).drawingOrder(3).indexInParent(2).findOne(2000)
// log(tv)
// if (tv) {

// }