const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const count = document.querySelector('.count');
const dive = document.querySelector('div');
const info = document.querySelector('#info');


const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

info.classList.add('visible');

setTimeout(() => {
    info.classList.remove('visible');
    info.classList.add('hidden');
}, 5000);

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// function to generate random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
class Shape {
  x;
  y;
  velX;
  velY;

  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}
class Ball extends Shape {
  constructor(color, size) {
    super(random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),);
    this.color = color;
    this.size = size;
    this.exists = true;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
  
}
class MadCircle extends Shape {
  constructor(color, size) {
    super(random(0 + size, width - size),
    random(0 + size, height - size), 20, 20);
    this.color = color;
    this.size = size;
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.x -= this.velX;
          break;
        case "ArrowRight":
          this.x += this.velX;
          break;
        case "ArrowUp":
          this.y -= this.velY;
          break;
        case "ArrowDown":
          this.y += this.velY;
          break;
      }
    });
  }
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x -= (this.size);
    }
  
    if ((this.x - this.size) <= 0) {
      this.x += (this.size);
    }
  
    if ((this.y + this.size) >= height) {
      this.y -= (this.size);
    }
  
    if ((this.y - this.size) <= 0) {
      this.y += (this.size);
    }
  }
  collisionDetect() {
    for (const ball of balls) {
      if ( ball.exists ) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + ball.size) {
          ballCount--;
          ball.exists = false;
          // balls.pop(ball);
          count.textContent = `Ball count: ${ ballCount }`;
          if ( ballCount === 0 ) {
            madCircle.youWin();
          }
        }
      }
    }
  }
  youWin() {
    const win = document.createElement('h4');
    win.textContent = 'You Win!';
    dive.appendChild(win);
  }
}
const madCircle = new MadCircle('white', 15);
// const testBall = new Ball('violet', 15);
// console.log(testBall.x,
//   testBall.size,
//   testBall.color,
//   testBall.draw()
//   )
const balls = [];
let ballCount = balls.length;
while ( ballCount < 100 ) {
  const size = random(10, 20);
  const ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      randomRGB(),
      size,
    );
  ballCount++;
  balls.push(ball);
  count.textContent = `Ball count: ${ ballCount }`;
}
function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 20%)";
  ctx.fillRect(0, 0, width, height);

  for ( const ball of balls ) {
    if ( ball.exists ) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
      madCircle.draw();
      madCircle.checkBounds();
      madCircle.collisionDetect();
    }
  }
  requestAnimationFrame(loop);
}
loop();