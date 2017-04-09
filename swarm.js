var width, height, largeHeader, canvas, ctx, points, center, animateHeader = true;
console.log("was called");

width = window.innerWidth;
height = window.innerHeight;
center = {
    x: width / 2,
    y: height / 2
};

largeHeader = document.getElementById('large-header');
largeHeader.style.height = height + 'px';

canvas = document.getElementById('demo-canvas');
canvas.width = width;
canvas.height = height;
ctx = canvas.getContext('2d');
//Objects
function Line(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
        
    }
}

//bees = [];
var randomX1 = center.x - (width / 40) + Math.random() * width / 20
var randomY1 = center.y - (width / 40) + Math.random() * width / 20
var randomX2 = center.x - (width / 40) + Math.random() * width / 20
var randomY2 = center.y - (width / 40) + Math.random() * width / 20
var line = new Line(randomX1, randomY1, randomX2, randomY2);

var bee = {

    x1: randomX1,
    y1: randomY1,
    x2: randomX2,
    y2: randomY2
}

function draw() {
line.draw();
console.log("loop");
}
setInterval(draw, 10);
