const c = document.getElementById("myCanvas");
c.addEventListener("mousemove", handleMousemove);
c.width = window.innerWidth;
c.height = window.innerHeight;
const ctx = c.getContext("2d");
ctx.strokeStyle = "rgba(0,0,0,0)";

let x = 400;
let y = 400;
const cursorArea = 70;
const largest = 50;
const scaleDelta = 2.5;
const circleCount = 500;
const colorSwatches = ["#333333", "orangered", "gainsboro", "gray"];

class Circle {
  constructor() {
    this.r = Math.random() * 255;
    this.g = Math.random() * 255;
    this.b = Math.random() * 255;
    this.color = colorSwatches[Math.floor(Math.random() * 4)];

    this.radius = Math.random() * 10 + 4;
    this.newRadius = this.radius;
    this.center = {
      x: Math.random() * (innerWidth - this.radius * 2) + this.radius,
      y: Math.random() * (innerHeight - this.radius * 2) + this.radius
    };
    this.directionX = Math.round(Math.random()) ? 1 : -1;
    this.directionY = Math.round(Math.random()) ? 1 : -1;
    this.deltaX = this.directionX * Math.random();
    this.deltaY = this.directionY * Math.random();
  }

  draw() {
    this.center.x += this.deltaX;
    this.center.y += this.deltaY;
    if (
      Math.abs(this.center.x - x) <= this.radius + cursorArea &&
      Math.abs(this.center.y - y) <= this.radius + cursorArea
    ) {
      this.newRadius <= largest && (this.newRadius += scaleDelta);
    } else {
      this.newRadius >= this.radius && (this.newRadius -= scaleDelta);
    }
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
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const circles = [];
for (let i = 0; i < circleCount; i++) {
  circles.push(new Circle());
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  circles.forEach(c => c.draw());
  requestAnimationFrame(() => animate());
}

animate();

function handleMousemove(e) {
  x = e.clientX;
  y = e.clientY;
}
