const c = document.getElementById("myCanvas");
c.addEventListener('mousemove',handleMousemove);
c.width = window.innerWidth;
c.height = window.innerHeight;
const ctx = c.getContext("2d");
ctx.strokeStyle = "rgba(0,0,0,0)";

class Circle {
  r = Math.random() * 255;
  g = Math.random() * 255;
  b = Math.random() * 255;

  radius = Math.random() * 50 + 30;
  center = {
    x: Math.random() * (innerWidth - this.radius * 2) + this.radius,
    y: Math.random() * (innerHeight - this.radius * 2) + this.radius
  };
  directionX = Math.round(Math.random()) ? 1 : -1;
  directionY = Math.round(Math.random()) ? 1 : -1;
  deltaX = this.directionX * (Math.random() - 0.5);
  deltaY = this.directionY * (Math.random() - 0.5);

  draw() {
    this.center.x += this.deltaX;
    this.center.y += this.deltaY;
    const leftEdge = this.center.x - this.radius;
    const rightEdge = this.center.x + this.radius;
    const topEdge = this.center.y - this.radius;
    const bottomEdge = this.center.y + this.radius;
    (rightEdge >= innerWidth || leftEdge <= 0) && (this.deltaX = -this.deltaX);
    (bottomEdge >= innerHeight || topEdge <= 0) && (this.deltaY = -this.deltaY);
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
    ctx.fill();
  }
}

const circles = [];
for (let i = 0; i < 100; i++) {
  circles.push(new Circle());
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  circles.forEach(c => c.draw());
  requestAnimationFrame(() => animate());
}
animate();

function handleMousemove() {
  console.log('test')
}

// const center = {
//   x: Math.random() * (innerWidth - radius * 2) + radius,
//   y: Math.random() * (innerHeight - radius * 2) + radius
// };
// const directionX = Math.round(Math.random()) ? 1 : -1;
// const directionY = Math.round(Math.random()) ? 1 : -1;
// let deltaX = directionX * (Math.random() * 2 + 1);
// let deltaY = directionY * (Math.random() * 3 + 1);
//
// const animate = () => {
//   ctx.clearRect(0, 0, innerWidth, innerHeight);
//   center.x += deltaX;
//   center.y += deltaY;
//
//   ctx.beginPath();
//   const leftEdge = center.x - radius;
//   const rightEdge = center.x + radius;
//   const topEdge = center.y - radius;
//   const bottomEdge = center.y + radius;
//   (rightEdge >= innerWidth || leftEdge <= 0) && (deltaX = -deltaX);
//   (bottomEdge >= innerHeight || topEdge <= 0) && (deltaY = -deltaY);
//   ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, false);
//   ctx.stroke();
//   requestAnimationFrame(() => animate());
// };
// animate();
