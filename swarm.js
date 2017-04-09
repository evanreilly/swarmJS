var width, height, largeHeader, canvas, ctx, points, center, animateHeader = true;


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


function Point2d(x1,y1){
  this.x1 = x1;
  this.y1 = y1;
  this.normalize = function(){
    v = Math.sqrt(Math.pow(this.x1,2)+Math.pow(this.y1,2));
    this.x1 = this.x1/v;
    this.y1 = this.y1/v;
  }
  this.magnitude = function(){
    v = Math.sqrt(Math.pow(this.x1,2)+Math.pow(this.y1,2));
    return v;
  }
  this.add = function(point2d){
    this.x1 = this.x1+point2d.getX1();
    this.y1 = this.y1+point2d.getY1();
  }
  this.multiply = function(factor){
    this.x1 = this.x1*factor;
    this.y1 = this.y1 *factor;
  }
  this.setX1 = function(x1){this.x1 = x1;}
  this.setY1 = function(y1){this.y1 = y1;}
  this.getX1 = function(){return this.x1;}
  this.getY1 = function(){return this.y1;}

}

function Line(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.strokeStyle = "rgba(156,217,249,0.5)";
    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        //ctx.strokeStyle = "#FF0000";
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
    }
    this.setX1 = function(x1){this.x1 = x1;}
    this.setY1 = function(y1){this.y1 = y1;}
    this.setX2 = function(x2){this.x2 = x2;}
    this.setY2 = function(y2){this.y2 = y2;}
    this.setColor = function(color){this.strokeStyle = color;}

}

//bees = [];


var bee = {

    x1: randomX1,
    y1: randomY1,
    x2: randomX2,
    y2: randomY2
}


function initAnimation(){
  animate();
}

var randomX1 = center.x - (width / 40) + Math.random() * width / 20
var randomY1 = center.y - (width / 40) + Math.random() * width / 20
var randomX2 = center.x - (width / 40) + Math.random() * width / 20
var randomY2 = center.y - (width / 40) + Math.random() * width / 20
var line = new Line(randomX1, randomY1, randomX2, randomY2);

line.setColor("rgba(156,200,249,0.5)")
var point1 = new Point2d(0,0);
var point2 = new Point2d(1,2);
console.log(point1['x1']);
point1.add(point2);
console.log(point1['x1']);
console.log(point1['y1']);
point1.normalize();
console.log(point1['x1']);
console.log(point1['y1']);
initAnimation();
function animate(){
  line.draw();
  requestAnimationFrame(animate);
}


// function draw() {
// line.draw();
// //console.log("loop");
// }
// setInterval(draw, 10);
