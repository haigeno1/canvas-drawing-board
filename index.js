var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var eraserEnable = false;
var lineWidth = 6;
function resize() {
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  canvas.width = pageWidth;
  canvas.height = pageHeight;
}

window.onresize = function() {
  resize();
};
resize();

function drawPoint(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineWidth = lineWidth;
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

listenToMouse(canvas);

function listenToMouse(canvas) {
  var usingMouse = false;
  var lastPoint = { x: undefined, y: undefined };

  if (document.body.ontouchstart !== undefined) {
    //判断设备是否支持touch事件
    canvas.ontouchstart = function(a) {
      var x = a.touches[0].clientX;
      var y = a.touches[0].clientY;
      usingMouse = true;
      if (eraserEnable) {
        ctx.clearRect(x - 25, y - 25, 50, 50);
      } else {
        lastPoint = { x: x, y: y };
      }
    };
    canvas.ontouchmove = function(a) {
      var x = a.touches[0].clientX;
      var y = a.touches[0].clientY;
      if (!usingMouse) {
        return;
      }
      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20);
      } else {
        var newPoint = { x: x, y: y };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };
    canvas.ontouchend = function() {
      usingMouse = false;
    };
  } else {
    canvas.onmousedown = function(a) {
      var x = a.clientX;
      var y = a.clientY;
      usingMouse = true;
      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20);
      } else {
        lastPoint = { x: x, y: y };
      }
    };
    canvas.onmousemove = function(a) {
      var x = a.clientX;
      var y = a.clientY;
      if (!usingMouse) {
        return;
      }
      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20);
      } else {
        var newPoint = { x: x, y: y };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };
    canvas.onmouseup = function() {
      usingMouse = false;
    };
  }
}

brush.onclick = function() {
  eraserEnable = false;
  brush.classList.add("active");
  eraser.classList.remove("active");
};

eraser.onclick = function() {
  eraserEnable = true;
  eraser.classList.add("active");
  brush.classList.remove("active");
};

clear.onclick = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

download.onclick = function() {
  var url = canvas.toDataURL("image/png");
  var a = document.createElement("a");
  a.href = url;
  a.download = "canvas画板.png";
  a.target = "_blank";
  a.click();
};

black.onclick = function() {
  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  black.classList.add("active");
  red.classList.remove("active");
};

red.onclick = function() {
  ctx.fillStyle = "red";
  ctx.strokeStyle = "red";
  red.classList.add("active");
  black.classList.remove("active");
};

thick.onclick = function() {
  lineWidth = 6;
  thick.classList.add("active");
  thin.classList.remove("active");
};

thin.onclick = function() {
  lineWidth = 3;
  thin.classList.add("active");
  thick.classList.remove("active");
};
