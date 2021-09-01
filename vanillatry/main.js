import './style.css'

//defaults
const background = "#010101";
const accent = "#575757";
const vertices = 40;
const maxSpeed = .2;
const xpadding = 0.1;
const ypadding = 0.1;
const radius = 5;
const distance = 250;
const maxlinks = 5;
const lineWidth = 2;
//setup
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.fillStyle = background;
ctx.fillRect(0, 0, canvas.width, canvas.height);

//border
const padding = radius
const outerborder = 5;

//debug and stuff
var play = true;
var debug = false;
var trace = false;
//1 is false -1 is true
const inward = 1;

//attributes of the scene
var xPos = []
var yPos = []
var xVel = []
var yVel = []
var birthFrame = []
var frame = 0;
const xLim = window.innerWidth - (window.innerWidth * (xpadding / 2));
const yLim = window.innerHeight - (window.innerHeight * (ypadding / 2));
const minSpeed = maxSpeed * -1
const x1 = ~padding * inward;
const y1 = ~padding * inward;
const x2 = window.innerWidth + (padding * inward);
const y2 = window.innerHeight + (padding * inward);

//populates scenes
var step = 0;
function createVar() {
  let x = Math.floor((Math.random() * xLim) + (xpadding / 2));
  let y = Math.floor(Math.random() * yLim + (ypadding / 2));
  let xv = Math.random() * (maxSpeed - minSpeed) + minSpeed;
  let yv = Math.random() * (maxSpeed - minSpeed) + minSpeed;
  let birthF = 0;
  xPos[step] = x;
  yPos.push(y)
  xVel.push(xv)
  yVel.push(yv)
  birthFrame.push(birthF)
  step++
}
Array.from({ length: vertices }, () => createVar());


/*
This table tells the range of each value of each side
tells the       [ xmin              | xmax              | ymin               | ymax                 | xVelocitymin  | xVelocitymax | yVelocitymin   | yVelocitymax | side   ] of each side
leftSide =   0 =[ 0                 | 0                 | 0                  | window.innerHeight   | 0             | maxSpeed     | -max           | max          | left   ]
topSide =    1 =[ 0                 | window.innerWidth | 0                  | 0                    | -max          | max          | 0              | max          | top    ]
rightSide =  2 =[ window.innerWidth | window.innerWidth | 0                  | window.innerHeight   | -max          | 0            | -max           | max          | right  ]
bottomSide = 3 =[ 0                 | window.innerWidth | window.innerHeight | window.innerHeight   | -max          | max          | -max           | 0            | bottom ]
*/
const sideVars = [
  [x1, x1, y1, y2, .1, maxSpeed, ~maxSpeed, maxSpeed, "left"],
  [x1, x2, y1, y1, ~maxSpeed, maxSpeed, .1, maxSpeed, "top"],
  [x2, x2, y1, y2, ~maxSpeed, -0.1, ~maxSpeed, maxSpeed, "right"],
  [x1, x2, y2, y2, ~maxSpeed, maxSpeed, ~maxSpeed, -0.1, "bottom"]];


//rng function that cleans up the code
function getRandomArbitrary(max, min) {
  if (max === min) {
    return max
  } else {
    //add random after testing
    return Math.random() * (max - min) + min;
  }
}

//function thats called when a new point is needed, it creates all new attributes
function newVar(iteration) {
  let side = Math.floor(Math.random() * 4)
  let x = getRandomArbitrary(sideVars[side][1], sideVars[side][0]);
  let y = getRandomArbitrary(sideVars[side][3], sideVars[side][2]);
  let xv = getRandomArbitrary(sideVars[side][5], sideVars[side][4]);
  let yv = getRandomArbitrary(sideVars[side][7], sideVars[side][6]);
  xPos[iteration] = Math.floor(x);
  yPos[iteration] = Math.floor(y);
  xVel[iteration] = xv;
  yVel[iteration] = yv;
  birthFrame[iteration] = frame;
  let xpos = (xVel[iteration] * (frame - birthFrame[iteration])) + xPos[iteration];
  let ypos = (yVel[iteration] * (frame - birthFrame[iteration])) + yPos[iteration];
  if (debug) {
    console.log(sideVars[side][8]);
    console.log(`birth frame: ${birthFrame[iteration]}`)
    console.log(`x1: ${x1}, y1: ${y1}`);
    console.log(`x2: ${x2}, y2: ${y2}`);
    console.log(`x:${xPos[iteration]}, y:${yPos[iteration]}`);
    console.log(`x:${xpos}, y:${ypos}`);
  }
  ctx.beginPath();
  ctx.arc(xpos, ypos, radius, 0, 2 * Math.PI);
  ctx.fillStyle = accent;
  ctx.fill();
}

//draws the link
function clamp(max, min, oldMax, oldMin, value) {
  let factor = (oldMax - oldMin) / value
  return (max - min) / factor
}
function DrawLine(xsub1, ysub1, iteration) {
  if (maxlinks == 0) { return }
  for (let step = 0; step < vertices; step++) {
    if (step != iteration) {
      let xsub2 = (xVel[step] * (frame - birthFrame[step])) + xPos[step];
      let ysub2 = (yVel[step] * (frame - birthFrame[step])) + yPos[step];
      let a = xsub1 - xsub2;
      let b = ysub1 - ysub2;
      let c = Math.sqrt(a * a + b * b)
      if (c <= distance) {

        ctx.beginPath();
        ctx.moveTo(xsub1, ysub1);
        ctx.lineTo(xsub2, ysub2);
        ctx.strokeStyle = accent;
        let width = lineWidth - clamp(lineWidth, 0.01, distance, 0, c)
        ctx.lineWidth = width;
        ctx.stroke();

      }
    }
  }
}

//draws!
function draw() {
  if (!trace) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  for (let iteration = 0; iteration < vertices; iteration++) {
    let xpos = (xVel[iteration] * (frame - birthFrame[iteration])) + xPos[iteration];
    let ypos = (yVel[iteration] * (frame - birthFrame[iteration])) + yPos[iteration];

    //calculates the x and y and then determines if it needs to make a new point
    if (xpos <= x1 - outerborder || xpos >= x2 + outerborder || ypos <= y1 - outerborder || ypos >= y2 + outerborder) {
      newVar(iteration)
    } else {
      DrawLine(xpos, ypos, iteration)
      ctx.beginPath();
      ctx.arc(xpos, ypos, radius, 0, 2 * Math.PI);
      if (debug) {
        let velocityPercent = (((Math.abs(xVel[iteration]) + Math.abs(yVel[iteration])) / 2) / maxSpeed * 255)
        ctx.fillStyle = `rgb(${velocityPercent}, 255, 255)`
        ctx.fill();
        debugCircle(xpos, ypos);
      }
      if (!debug) {
        ctx.fillStyle = accent;
        ctx.fill();
      }
    }
    
  }
  if (debug) {
    debugRectangle()
  }
  animation()
}
function debugCircle(xpos, ypos) {
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(xpos, ypos, distance/2, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
  ctx.fill();
}
//shows boundaries where of where a point spawns and where it kills it
function debugRectangle() {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.rect(x1, y1, x2 - x1, y2 - y1);
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.rect(x1 - outerborder, y1 - outerborder, x2 + padding, y2 + padding + outerborder);
}
//allows for pausing. when play is false it will repeate till its true
function animation() {
  if (!play) {
    window.requestAnimationFrame(animation)
  } else {
    window.requestAnimationFrame(draw)
    frame++
  }
}

//event listener key presses
document.addEventListener('keydown', function (event) {
  if (event.key === " ") {
    play = !play
  }
  if (event.key === "d") {
    debug = !debug
  }
  if (event.key === "t") {
    trace = !trace
  }
});

window.requestAnimationFrame(draw)