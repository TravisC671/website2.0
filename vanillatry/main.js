import './style.css'

const background = "#010101";
const vertices = 1;
const maxSpeed = 10;
const xpadding = 0.1;
const ypadding = 0.1;
const radius = 5;
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.fillStyle = background;
ctx.fillRect(0, 0, canvas.width, canvas.height);
var frame = 0;
var xPos = []
var yPos = []
var xVel = []
var yVel = []
var birthFrame = []
const xLim = window.innerWidth - (window.innerWidth * (xpadding / 2));
const yLim = window.innerHeight - (window.innerHeight * (ypadding / 2));
const minSpeed = maxSpeed * -1
// sets up the basic variables needed for each point
function createVar(step) {
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
}
var step = 0;
function setup() {
  createVar(step)
  step++
}

//repeats createVar for the amount of vertices
Array.from({ length: vertices }, () => setup());
/*
tells the       [ xmin              | xmax              | ymin               | ymax                 | xVelocitymin  | xVelocitymax | yVelocitymin   | yVelocitymax | xOffset | yOffset] of each side
leftSide =   0 =[ 0                 | 0                 | 0                  | window.innerHeight   | 0             | maxSpeed     | -max           | max          | -3      | 0      ]
topSide =    1 =[ 0                 | window.innerWidth | 0                  | 0                    | -max          | max          | 0              | max          | 0       | -3     ]
rightSide =  2 =[ window.innerWidth | window.innerWidth | 0                  | window.innerHeight   | -max          | 0            | -max           | max          | 3       | 0      ]
bottomSide = 3 =[ 0                 | window.innerWidth | window.innerHeight | window.innerHeight   | -max          | max          | -max           | 0            | 0       | 3      ]
*/
const sideVars = [
  [0, 0, 0, window.innerHeight, 0, maxSpeed, ~maxSpeed, ~maxSpeed, -3, 0],
  [0, window.innerWidth, 0, 0, ~maxSpeed, maxSpeed, 0, maxSpeed, 0, -3],
  [window.innerWidth, window.innerWidth, 0, window.innerHeight, ~maxSpeed, 0, ~maxSpeed, maxSpeed, 3, 0],
  [0, window.innerWidth, window.innerHeight, window.innerHeight, ~maxSpeed, maxSpeed, ~maxSpeed, 0, 0, 3]]
function getRandomArbitrary(max, min) {
  if (max === min) {
    return max
  } else {
    //add random after testing
    return Math.random() * (max - min) + min;
  }
}
function newVar(iteration) {
  let side = Math.floor(Math.random() * 4)
  let x = getRandomArbitrary(sideVars[side][1], sideVars[side][0]);
  let y = getRandomArbitrary(sideVars[side][3], sideVars[side][2]);
  let xv = getRandomArbitrary(sideVars[side][5], sideVars[side][4]);
  let yv = getRandomArbitrary(sideVars[side][7], sideVars[side][6]);
  let startX = x + (sideVars[side][8] * radius);
  let startY = y + (sideVars[side][9] * radius);
  xPos[iteration] = startX;
  yPos[iteration] = startY;
  xVel[iteration] = xv;
  yVel[iteration] = yv;
  birthFrame[iteration] = 0;
  let xpos = (xVel[iteration] * (frame - birthFrame[iteration])) + xPos[iteration];
  let ypos = (yVel[iteration] * (frame - birthFrame[iteration])) + yPos[iteration];
  ctx.beginPath();
  console.log(side);
  console.log(window.innerWidth + "," + window.innerHeight);
  console.log(`x:${x}, y:${y}`);
  console.log(`startX:${xPos[iteration]}, startY:${yPos[iteration]}`);
  ctx.arc(xpos, ypos, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
}
function testing() {
  for (let iteration = 0; iteration < 4; iteration++) {
    let x = getRandomArbitrary(sideVars[iteration][1], sideVars[iteration][0]);
    let y = getRandomArbitrary(sideVars[iteration][3], sideVars[iteration][2]);
    let xv = getRandomArbitrary(sideVars[iteration][5], sideVars[iteration][4]);
    let yv = getRandomArbitrary(sideVars[iteration][7], sideVars[iteration][6]);
    let startX = x + (sideVars[iteration][8] * radius);
    let startY = y + (sideVars[iteration][9] * radius);
    console.log(iteration);
    console.log(window.innerWidth + "," + window.innerHeight);
    console.log(`x:${x}, y:${y}`);
    console.log(`startX:${startX}, startY:${startY}`);
  }
}
testing()
newVar()
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let iteration = 0; iteration < vertices; iteration++) {
    let xpos = (xVel[iteration] * (frame - birthFrame[iteration])) + xPos[iteration];
    let ypos = (yVel[iteration] * (frame - birthFrame[iteration])) + yPos[iteration];

    if (xpos <= (radius * -10) || xpos >= window.innerWidth + (radius * 10) || ypos <= (radius * -10) || ypos >= window.innerHeight + (radius * 10)) {
      newVar(iteration)
    }

    ctx.beginPath();
    ctx.arc(xpos, ypos, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white'
    ctx.fill();
  }
  window.requestAnimationFrame(draw)
  frame++
}
window.requestAnimationFrame(draw)