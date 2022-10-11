const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const canvasWidth = (canvas.width = innerWidth);
const canvasHeight = (canvas.height = innerHeight);

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }
  draw() {
    context.fillStyle = "rgba(255, 0, 0, .2)";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const offset = {
  x: -565,
  y: -600,
};

const boundaries = [];

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const image = new Image();
image.src = "/img/town.png";
const playerImage = new Image();
playerImage.src = "/img/playerDown.png";

class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
  }

  draw() {
    context.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
  }
}

const player = new Sprite({
  position: {
    x: canvasWidth / 2 - 198 / 4 / 2,
    y: canvasHeight / 2 - 68 / 2,
  },
  image: playerImage,
  frames: {
    max: 4,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
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

const movables = [background, ...boundaries];

function retangularCollision({ retangle1, retangle2 }) {
  return (
    retangle1.position.x + retangle1.width >= retangle2.position.x &&
    retangle1.position.x <= retangle2.position.x + retangle2.width &&
    retangle1.position.y <= retangle2.position.y + retangle2.height &&
    retangle1.position.y + retangle1.height >= retangle2.position.y
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  player.draw();

  let moving = true;
  if (keys.w.pressed && lastKey === "w") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        retangularCollision({
          retangle1: player,
          retangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        console.log("Colidindo");
        moving = false;
        break;
      }
    }
    if(moving)
    movables.forEach((movable) => {
      movable.position.y += 3;
    });
  } else if (keys.a.pressed && lastKey === "a") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        retangularCollision({
          retangle1: player,
          retangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log("Colidindo");
        moving = false;
        break;
      }
    }
    if(moving)
    movables.forEach((movable) => {
      movable.position.x += 3;
    });
  } else if (keys.d.pressed && lastKey === "d") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        retangularCollision({
          retangle1: player,
          retangle2: {
            ...boundary,
            position: {
              x: boundary.position.x -3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log("Colidindo");
        moving = false;
        break;
      }
    }
    if(moving)
    movables.forEach((movables) => {
      movables.position.x -= 3;
    });
  } else if (keys.s.pressed && lastKey === "s") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        retangularCollision({
          retangle1: player,
          retangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        console.log("Colidindo");
        moving = false;
        break;
      }
    }
    if(moving)
    movables.forEach((movables) => {
      movables.position.y -= 3;
    });
  }
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

animate();
