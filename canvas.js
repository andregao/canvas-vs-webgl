const c = document.getElementById("myCanvas");
c.addEventListener("mousemove", handleMousemove);
c.addEventListener("touchmove", handleTouchmove);
c.addEventListener("touchend", handleTouchend);
c.addEventListener("mouseleave", handleTouchend);
window.addEventListener("resize", appInit);

const ctx = c.getContext("2d");

let x = Infinity;
let y = Infinity;
const cursorArea = 40;
const largest = 50;
const scaleDelta = 2;
const colorSwatches = ["#333333", "orangered", "gainsboro", "gray"];
let circleCount;
let circles = [];
let requestId = null;

class Circle {
  constructor() {
    this.color =
      colorSwatches[Math.floor(Math.random() * colorSwatches.length)];

    this.radius = Math.random() * 10 + 2;
    this.newRadius = this.radius;
    this.center = {
      x: Math.random() * (window.innerWidth - this.radius * 2) + this.radius,
      y: Math.random() * (window.innerHeight - this.radius * 2) + this.radius
    };
    this.deltaX = Math.random() * 2 - 1;
    this.deltaY = Math.random() * 2 - 1;
  }

  draw() {
    this.center.x += this.deltaX;
    this.center.y += this.deltaY;
    // calculate new radius base on cursor position
    if (
      Math.abs(this.center.x - x) <= this.newRadius + cursorArea &&
      Math.abs(this.center.y - y) <= this.newRadius + cursorArea
    ) {
      this.newRadius < largest && (this.newRadius += scaleDelta);
    } else {
      this.newRadius > this.radius && (this.newRadius -= scaleDelta);
    }
    // set new position delta to bounce off screen edges
    const leftEdge = this.center.x - this.newRadius;
    const rightEdge = this.center.x + this.newRadius;
    const topEdge = this.center.y - this.newRadius;
    const bottomEdge = this.center.y + this.newRadius;
    (rightEdge >= innerWidth || leftEdge <= 0) && (this.deltaX = -this.deltaX);
    (bottomEdge >= innerHeight || topEdge <= 0) && (this.deltaY = -this.deltaY);
    ctx.beginPath();
    ctx.arc(
      this.center.x,
      this.center.y,
      this.newRadius,
      0,
      Math.PI * 2,
      false
    );
    ctx.strokeStyle = "transparent";
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

appInit();

function appInit() {
  requestId && window.cancelAnimationFrame(requestId);
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  circleCount = Math.floor((c.width * c.height) / 1000);

  circles = [];
  for (let i = 0; i < circleCount; i++) {
    circles.push(new Circle());
  }
  animate();
}

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circles.forEach(c => {
    c.draw();
  });
  requestId = window.requestAnimationFrame(() => animate());
}

function handleMousemove(e) {
  x = e.clientX;
  y = e.clientY;
}

function handleTouchmove(e) {
  const {
    targetTouches: {
      0: { clientX: tx, clientY: ty }
    }
  } = e;
  x = tx;
  y = ty;
}

function handleTouchend() {
  x = Infinity;
  y = Infinity;
}

function handleResize() {
  appInit();
}
