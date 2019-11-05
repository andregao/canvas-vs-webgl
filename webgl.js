const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  backgroundColor: 0xeeeeee
});
document.body.appendChild(app.view);
app.stage.sortableChildren = true;

const circlesArray = [];
let circleCount = 500;
const maxRadius = 50;
const mouseCircleRadius = 30;
const positionDeltaFactor = 2;
const scaleDelta = 0.3;

const mouseCircle = new PIXI.Graphics();
mouseCircle.beginFill(0x000000, 0.3);
mouseCircle.drawCircle(0, 0, mouseCircleRadius);
mouseCircle.endFill();
mouseCircle.zIndex = 1;
app.stage.addChild(mouseCircle);

const colorSwatches = [0x333333, 0xff4500, 0xdcdcdc, 0x808080];
let circles = new PIXI.Container();
circles.zIndex = 0;
app.stage.addChild(circles);

function makeCircle() {
  const shape = new PIXI.Graphics();
  const radius = Math.random() * 10 + 4;
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

for (let i = 0; i < circleCount; i++) {
  const c = makeCircle();
  circlesArray.push(c);
  circles.addChild(c);
}

app.ticker.add(() => {
  circlesArray.forEach(c => {
    const radius = c.width / 2;
    // grow and shrink
    if (
      Math.abs(mouseCircle.x - c.x) <= mouseCircleRadius + radius &&
      Math.abs(mouseCircle.y - c.y) <= mouseCircleRadius + radius
    ) {
      // console.log("overlap");
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

    // bounce off screen edges
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

app.stage.interactive = true;
app.stage.on("pointermove", handlePointermoveStage);
app.stage.on("pointerout", handlePointeroutStage);

function handlePointermoveStage(e) {
  mouseCircle.position.x = e.data.global.x;
  mouseCircle.position.y = e.data.global.y;
}

function handlePointeroutStage() {
  // console.log("pointer out stage");
  // mouseCircle.position.x = mouseCircle.position.y = -50;
}
