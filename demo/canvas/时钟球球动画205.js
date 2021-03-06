// importClass(android.graphics.BitmapFactory);
// importClass(android.graphics.drawable.BitmapDrawable);
// importClass(android.graphics.Bitmap);
// importClass(android.graphics.Paint);
// importClass(android.graphics.Color);
var digit = require('./digit.js')
var width = device.width
var height = device.height

var RADIUS = device.width / 150;
var RADIUSofBallInMotion=RADIUS*2

// log(RADIUS)
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;


const endTime = new Date(2019, 0, 13, 18, 47, 52);
var curShowTimeSeconds = 0
var nextShowTimeSeconds = 0
var balls = [];

var ballColors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]



ballColors=ballColors.map((color)=>{
  return colors.parseColor(color)
})





// log(width)
// log(height)
// exit()
var Feis = {
  Color: android.graphics.Color,
  Color_toARGB: function (color) {
    return [Feis.Color.alpha(color), Feis.Color.red(color), Feis.Color.green(color), Feis.Color.blue(color)];
  }
}

var BG_COLOR = '#ff00ff00'
BG_COLOR = colors.parseColor(BG_COLOR)
var window = floaty.rawWindow(
  <canvas id="board" h="{{device.height}}" w="{{device.width}}" />
);
window.setTouchable(false);
setInterval(()=>{},3000)
window.board.on("draw", function (canvas) {
  var argb = Feis.Color_toARGB(BG_COLOR)
  canvas.drawARGB(argb[0], argb[1], argb[2], argb[3]);


  WINDOW_WIDTH = width
  WINDOW_HEIGHT = height

  MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
  // log("MARGIN_LEFT = %d", MARGIN_LEFT)
  RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1
  // log("RADIUS = %d", RADIUS)

  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
  // log("MARGIN_TOP = %d", MARGIN_TOP)

  curShowTimeSeconds = getCurrentShowTimeSeconds()
  // log("curShowTimeSeconds = %d", curShowTimeSeconds)

  render(canvas);
  update();


  // log(balls.length)
})

sleep(6000)

function update(){
  if(!nextShowTimeSeconds){
    nextShowTimeSeconds = getCurrentShowTimeSeconds();
  }

  var nextHours = parseInt( nextShowTimeSeconds / 3600);
  var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )
  var nextSeconds = nextShowTimeSeconds % 60

  var curHours = parseInt( curShowTimeSeconds / 3600);
  var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 )
  var curSeconds = curShowTimeSeconds % 60
  var info={
    nextSeconds:nextSeconds,
    curSeconds:curSeconds
  }
  // log(info)
  if( nextSeconds != curSeconds ){
    log('nextSeconds != curSeconds')
      if( parseInt(curHours/10) != parseInt(nextHours/10) ){
          addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
      }
      if( parseInt(curHours%10) != parseInt(nextHours%10) ){
          addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
      }

      if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
          addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
      }
      if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
          addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
      }

      if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
          addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
      }
      if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
        // log('????????????????????????')
          addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
      }

      // curShowTimeSeconds = nextShowTimeSeconds;
      nextShowTimeSeconds = curShowTimeSeconds;
  }

  updateBalls();

  // console.log( balls.length)
}

function updateBalls(){

  for( var i = 0 ; i < balls.length ; i ++ ){

      balls[i].x += balls[i].vx;
      balls[i].y += balls[i].vy;
      balls[i].vy += balls[i].g;

      if( balls[i].y >= WINDOW_HEIGHT/4*3-RADIUS ){
          balls[i].y = WINDOW_HEIGHT/4*3-RADIUS;
          balls[i].vy = - balls[i].vy*0.65;
      }
  }

  var cnt = 0
  for( var i = 0 ; i < balls.length ; i ++ )
      if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
          balls[cnt++] = balls[i]

  while( balls.length > cnt ){
      balls.pop();
  }
}
function addBalls( x , y , num ){

  for( var i = 0  ; i < digit[num].length ; i ++ )
      for( var j = 0  ; j < digit[num][i].length ; j ++ )
          if( digit[num][i][j] == 1 ){
              var aBall = {
                  x:x+j*2*(RADIUS+1)+(RADIUS+1),
                  y:y+i*2*(RADIUS+1)+(RADIUS+1),
                  g:1.5+Math.random(),
                  vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                  vy:-15,
                  color: ballColors[ Math.floor( Math.random()*ballColors.length ) ]
              }

              balls.push( aBall )
          }
}
function getCurrentShowTimeSeconds() {
  var curTime = new Date();
  var ret = endTime.getTime() - curTime.getTime();
  ret = Math.round(ret / 1000)

  return ret >= 0 ? ret : 0;
}

function render(canvas) {
  var hours = parseInt( curShowTimeSeconds / 3600);
  var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 )
  var seconds = curShowTimeSeconds % 60

  var paint = new Paint();
  paint.setColor(??????(BG_COLOR)); //???????????????????????????
  paint.setAlpha(255); //?????????0-255
  paint.setStyle(Paint.Style.FILL); //??????Paint.Style.FILL Paint.Style.FILL_AND_STROKE
  // paint.setStrokeWidth(5);

  renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , canvas, paint )
  renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , canvas, paint )
  renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , canvas, paint )
  renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , canvas, paint);
  renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , canvas, paint);
  renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , canvas, paint);
  renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , canvas, paint);
  renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , canvas, paint);


  // log('balls.length=%d',balls.length)
  for( var i = 0 ; i < balls.length ; i ++ ){
    // cxt.fillStyle=balls[i].color;
    var ballColorsId=random(0, ballColors.length-1)
    // log('ballColorsId=%d',ballColorsId)
    // log('ballColors=',ballColors[ballColorsId])
    paint.setColor(ballColors[ballColorsId]); //???????????????????????????
    canvas.drawCircle( balls[i].x , balls[i].y , RADIUSofBallInMotion , paint );
    // canvas.drawCircle( balls[i].x , balls[i].y , RADIUS , paint );


}
}












function renderDigit(x, y, num, canvas, paint) {
  for (var i = 0; i < digit[num].length; i++)
    for (var j = 0; j < digit[num][i].length; j++)
      if (digit[num][i][j] == 1) {
        canvas.drawCircle(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, paint)
      }
}




// canvas.drawCircle(a, b, 100, paint);






// this.paint.setStrokeWidth(5);
// this.paint.setStyle(Paint.Style.STROKE);
// this.paint.setARGB(255, 0, 0, 0);
// this.paint.setTextSize(75);

// canvas.drawLine(X, Y, x, y, this.paint);
// canvas.drawLine(X, Y, a, b, this.paint);
// canvas.drawText(String("A"), X, Y, this.paint)
// canvas.drawText(String("B"), x, y, this.paint);
// canvas.drawCircle(X, Y, 10, this.paint);
// canvas.drawCircle(x, y, 10, this.paint);
// canvas.drawCircle(a, b, 10, this.paint);

// canvas.drawText(String("O"), obj.ox, obj.oy, this.paint);

// canvas.drawRect(0, device.height / 3, device.width, device.height / 3 * 2, paint);
// var x1 = 0
// var y1 = 0
// var x2 = device.width
// var y2 = device.height
// canvas.drawLine(x1, y1, x2, y2, paint)

// * drawArc(RectF oval, float startAngle, float sweepAngle, boolean useCenter, Paint paint)
// ?????????????????????RectF?????????????????????????????????????????????????????????????????????(???)???????????????????????????????????????(???)????????????????????????????????????????????????????????????,???????????????????????????,????????????,????????????????????????????????????,????????????Paint?????????






function ??????(color) {
  return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};
