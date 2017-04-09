/*Initialize Global Variables*/
var width, height, largeHeader, canvas, ctx, points, center, animateHeader = true;
width = window.innerWidth;
height = window.innerHeight;
/*Center of the screen*/
center = {
    x: width / 2,
    y: height / 2
};
//Get and Resize the background
largeHeader = document.getElementById('large-header');
largeHeader.style.height = height + 'px';
//Get and resize the canvas
canvas = document.getElementById('demo-canvas');
canvas.width = width;
canvas.height = height;
ctx = canvas.getContext('2d');

/*Objects*/

/*My own implementation of the Java Point2d class, it's missing some
features but contains all the features I need for this project*/
function Point2d(x1, y1) {
    this.x1 = x1;
    this.y1 = y1;
    this.normalize = function() {
        var v = Math.sqrt(Math.pow(this.x1, 2) + Math.pow(this.y1, 2));
        this.x1 = this.x1 / v;
        this.y1 = this.y1 / v;
    }
    this.magnitude = function() {
        var magnitude = Math.sqrt(Math.pow(this.x1, 2) + Math.pow(this.y1, 2));
        return magnitude;
    }
    this.distance = function(point2d) {
        var distance = Math.sqrt(Math.pow(this.x1 + point2d.getX1(), 2) + Math.pow(this.y1 + point2d.getY1(), 2));
        return distance;
    }
    this.add = function(point2d) {
        this.x1 = this.x1 + point2d.getX1();
        this.y1 = this.y1 + point2d.getY1();
    }
    this.subtract = function(point2d) {
        this.x1 = this.x1 - point2d.getX1();
        this.y1 = this.y1 - point2d.getY1();
    }
    this.multiply = function(factor) {
        this.x1 = this.x1 * factor;
        this.y1 = this.y1 * factor;
    }
    this.setX1 = function(x1) {
        this.x1 = x1;
    }
    this.setY1 = function(y1) {
        this.y1 = y1;
    }
    this.getX1 = function() {
        return this.x1;
    }
    this.getY1 = function() {
        return this.y1;
    }
}

/*A hacky line object, complete with a draw method
and a setColor method*/

function Line(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.strokeStyle = "rgba(156,217,249,0.5)";
    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        //ctx.strokeStyle = "#FF0000";
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
    }
    this.setX1 = function(x1) {
        this.x1 = x1;
    }
    this.setY1 = function(y1) {
        this.y1 = y1;
    }
    this.setX2 = function(x2) {
        this.x2 = x2;
    }
    this.setY2 = function(y2) {
        this.y2 = y2;
    }
    this.setColor = function(color) {
        this.strokeStyle = color;
    }
}

//bees = [];


function Bee(location, moveVector) {
    //fields

    this.location = location; //point2d
    this.line = new Line(location.getX1(), location.getY1(), moveVector.getX1(), moveVector.getY1());
    this.target = new Point2d(0, 0);
    //setters, getters
    this.setTarget = function(target) {
        this.target = target; //Point2d
    }
    this.setColor = function(color) {
        this.line.setColor(color);
    }

    this.setLocation = function(location) {
        this.location = location;
    }
    this.getLocation = function() {
        return location;
    }
    //methods
    this.draw = function() {
        this.line.draw();
    }
    this.move = function(moveVector) {
        this.line.setX1(this.location.getX1());
        this.line.setY1(this.location.getY1());
        location.add(moveVector);

        this.line.setX2(this.location.getX1());
        this.line.setY2(this.location.getY1());
    }
    this.getDirection = function() {
        var lastLocation = new Point2d(line.getX1(), line.getY1());
        var direction = this.location;
        direction.subtract(lastLocation);
        direction.normalize();
        return direction;
    }
    this.getSpeedByProximity = function() {
        var proximitySpeed = 0;
        var minimumSpeed = 15;
        var startPoint = this.location;
        var endPoint = this.target;
        var proximitySpeed = startPoint.distance(endPoint) * (0.3 * Math.random());

        return Math.min(minimumSpeed, proximitySpeed);
    }
    this.getDirectionToTarget = function() {
        var direction = this.target;
        direction.subtract(this.location);
        direction.normalize();

        return direction;
    }

    this.seekTarget = function() {
        var distance = this.getSpeedByProximity();
        //console.log(distance);
        var moveVector = this.getDirectionToTarget()
        //console.log(moveVector);
        moveVector.multiply(distance);
        //console.log(this.line);
        this.move(moveVector);
    }

}


function initAnimation() {
    animate();
}

var randomX1 = center.x - (width / 40) + Math.random() * width / 20
var randomY1 = center.y - (width / 40) + Math.random() * width / 20
var randomX2 = center.x - (width / 40) + Math.random() * width / 20
var randomY2 = center.y - (width / 40) + Math.random() * width / 20
//var line = new Line(randomX1, randomY1, randomX2, randomY2);

//line.setColor("rgba(156,200,249,0.5)")
var point1 = new Point2d(0, 0);
var point2 = new Point2d(1, 2);

var bee = new Bee(new Point2d(200, 200), new Point2d(180, 180));
bee.setColor("rgba(156,100,249,0.5)");
bee.setTarget(new Point2d(200, 200));
var mouseX = width / 2;
var mouseY = width / 2;


function showCoords(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    var coor = "X coords: " + mouseX + ", Y coords: " + mouseY;
    //console.log(coor);
}

function clearCoor() {
    //console.log("mouse out")
}



initAnimation();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bee.setTarget(new Point2d(mouseX, mouseY));
    bee.draw();
    bee.seekTarget();

    requestAnimationFrame(animate);
}



// function draw() {
// line.draw();
// //console.log("loop");
// }
// setInterval(draw, 10);
