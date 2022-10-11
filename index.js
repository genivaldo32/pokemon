const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const canvasWidth = (canvas.width = innerWidth);
const canvasHeight = (canvas.height = innerHeight);

context.fillStyle = "dimgray";
context.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "/img/town.png";
const playerImage = new Image();
playerImage.src = "/img/playerDown.png";

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

const background = new Sprite({
  position: {
    x: -565,
    y: -550,
  },
  image: image,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function loop() {
  window.requestAnimationFrame(loop);
  background.draw();
  context.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvasWidth / 2 - playerImage.width / 4 / 2,
    canvasHeight / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
  );
  if (keys.w.pressed  && lastKey === 'w') background.position.y += 3;
  else if (keys.a.pressed  && lastKey === 'a') background.position.x += 3;
  else if (keys.d.pressed  && lastKey === 'd') background.position.x -= 3;
  else if (keys.s.pressed  && lastKey === 's') background.position.y -= 3;
}

let lastKey = "";
window.addEventListener("keydown", (ev) => {
  switch (ev.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (ev) => {
  switch (ev.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

loop();
