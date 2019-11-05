document.body.addEventListener("mouseleave", handlePointerOut);
document.body.addEventListener("touchend", handlePointerOut);
window.addEventListener("resize", appInit);

let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  backgroundColor: 0xffffff
});
document.body.appendChild(app.view);
app.stage.interactive = true;
app.stage.on("pointermove", handlePointermoveStage);

let circleCount;
let mouseCircleInitialX;
let circlesArray;
const maxRadius = 50;
const mouseCircleRadius = 40;
const positionDeltaFactor = 2;
const scaleDelta = 0.2;
const colorSwatches = [0x333333, 0xff4500, 0xdcdcdc, 0x808080];

function appInit() {
  // calculate circle count and off screen position
  app.resizeTo = window;
  circleCount = Math.floor((window.innerWidth * window.innerHeight) / 1000);
  mouseCircleInitialX = window.innerWidth + mouseCircleRadius * 3;
  mouseCircle.position.x = mouseCircleInitialX;

  // initialize all circles
  circlesArray = [];
  let circles = new PIXI.Container();
  for (let i = 0; i < circleCount; i++) {
    const c = makeCircle();
    circlesArray.push(c);
    circles.addChild(c);
  }
  app.stage.removeChildren();
  app.stage.addChild(circles);
}

// cursor area for interaction
const mouseCircle = new PIXI.Graphics();
mouseCircle.beginFill(0x000000);
mouseCircle.drawCircle(0, 0, mouseCircleRadius);
mouseCircle.endFill();

function makeCircle() {
  const shape = new PIXI.Graphics();
  const radius = Math.random() * 10 + 2;
  shape.lineStyle(0);
  const color = colorSwatches[Math.floor(Math.random() * colorSwatches.length)];
  const position = {
    x: Math.random() * (window.innerWidth - radius * 2) + radius,
    y: Math.random() * (window.innerHeight - radius * 2) + radius
  };
  shape.deltaX = Math.random() * positionDeltaFactor - positionDeltaFactor / 2;
  shape.deltaY = Math.random() * positionDeltaFactor - positionDeltaFactor / 2;
  shape.beginFill(color, 1);
  shape.drawCircle(0, 0, radius);
  shape.x = position.x;
  shape.y = position.y;
  shape.endFill();

  return shape;
}

appInit();

app.ticker.add(() => {
  circlesArray.forEach(c => {
    const radius = c.width / 2;
    // grow and shrink
    if (
      Math.abs(mouseCircle.x - c.x) <= mouseCircleRadius + radius &&
      Math.abs(mouseCircle.y - c.y) <= mouseCircleRadius + radius
    ) {
      if (radius < maxRadius) {
        c.scale.x += scaleDelta;
        c.scale.y += scaleDelta;
      }
    } else {
      if (c.scale.x > 1) {
        c.scale.x -= scaleDelta;
        c.scale.y -= scaleDelta;
      }
    }
    // set new position delta to bounce off screen edges
    let newRadius = c.width / 2;
    const leftEdge = c.x - newRadius;
    const rightEdge = c.x + newRadius;
    const topEdge = c.y - newRadius;
    const bottomEdge = c.y + newRadius;
    (rightEdge >= app.screen.width || leftEdge <= 0) && (c.deltaX = -c.deltaX);
    (bottomEdge >= app.screen.height || topEdge <= 0) && (c.deltaY = -c.deltaY);
    c.x += c.deltaX;
    c.y += c.deltaY;
  });
});

function handlePointermoveStage(e) {
  mouseCircle.position.x = e.data.global.x;
  mouseCircle.position.y = e.data.global.y;
}

function handlePointerOut() {
  mouseCircle.position.x = mouseCircleInitialX;
}
