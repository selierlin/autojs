// var a = className("android.view.ViewGroup").depth(22).drawingOrder(1).indexInParent(0).boundsInside(0, device.height / 2, device.width, device.height).findOne(1000).bounds()
var a = className("android.view.View").depth(24).drawingOrder(2).indexInParent(1).boundsInside(0, device.height / 2, device.width, device.height).findOne(1000).bounds()

click(a.centerX(), a.centerY());