const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// create a texture from an image path
const texture = PIXI.Texture.from('examples/assets/bunny.png');

// Scale mode for pixelation
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

for (let i = 0; i < 10; i++) {
  createBunny(
    Math.floor(Math.random() * app.screen.width),
    Math.floor(Math.random() * app.screen.height),
  );
}

function createBunny(x, y) {
  // create our little bunny friend..
  const bunny = new PIXI.Sprite(texture);

  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  bunny.interactive = true;

  // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
  bunny.buttonMode = true;

  // center the bunny's anchor point
  bunny.anchor.set(0.5);

  // make it a bit bigger, so it's easier to grab
  bunny.scale.set(3);

  // setup events for mouse + touch using
  // the pointer events
  bunny
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

  // For mouse-only events
  // .on('mousedown', onDragStart)
  // .on('mouseup', onDragEnd)
  // .on('mouseupoutside', onDragEnd)
  // .on('mousemove', onDragMove);

  // For touch-only events
  // .on('touchstart', onDragStart)
  // .on('touchend', onDragEnd)
  // .on('touchendoutside', onDragEnd)
  // .on('touchmove', onDragMove);

  // move the sprite to its designated position
  bunny.x = x;
  bunny.y = y;

  // add it to the stage
  app.stage.addChild(bunny);
}

function onDragStart(event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd() {
  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}

function onDragMove() {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
  }
}
// Inner radius of the circle
const radius = 100;

// The blur amount
const blurSize = 32;

app.loader.add('grass', 'examples/assets/bg_grass.jpg');
app.loader.load(setup);

function setup(loader, resources) {
  const background = new PIXI.Sprite(resources.grass.texture);
  app.stage.addChild(background);
  background.width = app.screen.width;
  background.height = app.screen.height;

  const circle = new PIXI.Graphics()
    .beginFill(0xFF0000)
    .drawCircle(radius + blurSize, radius + blurSize, radius)
    .endFill();
  circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

  const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
  const texture = app.renderer.generateTexture(circle, PIXI.SCALE_MODES.NEAREST, 1, bounds);
  const focus = new PIXI.Sprite(texture);

  app.stage.addChild(focus);
  background.mask = focus;

  app.stage.interactive = true;
  app.stage.on('mousemove', pointerMove);

  function pointerMove(event) {
    focus.position.x = event.data.global.x - focus.width / 2;
    focus.position.y = event.data.global.y - focus.height / 2;
  }
}
