/*Initialize Global Variables*/
var width, height, largeHeader, canvas, ctx, points, center, animateHeader = true;
width = window.innerWidth;
height = window.innerHeight;
/*Center of the screen*/
center = {
    x: width / 2,
    y: height / 2
};

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
        var distance = Math.sqrt(Math.pow(this.x1 - point2d.getX1(), 2) + Math.pow(this.y1 - point2d.getY1(), 2));
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
        ctx.lineWidth = 3;
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
    this.getX1 = function() {
        return this.x1;
    }
    this.getX2 = function() {
        return this.x2;
    }
    this.getY1 = function() {
        return this.y1;
    }
    this.getY2 = function() {
        return this.y2;
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
        var beeScalar = 6
        var direction = this.getDirection();
        this.line.setX1(this.location.getX1() - direction.getX1() * beeScalar);
        this.line.setY1(this.location.getY1() - direction.getY1() * beeScalar);
        this.location.add(moveVector);
        /*Makes the bee larger than the move vector, so we can have bigger
        but slower vector bees*/
        this.line.setX2(this.location.getX1() + moveVector.getX1() * beeScalar);
        this.line.setY2(this.location.getY1() + moveVector.getY1() * beeScalar);
    }
    this.getDirection = function() {
        var direction = new Point2d(this.line['x2'] - this.line['x1'], this.line['y2'] - this.line['y1']);
        direction.normalize();

        return direction;
    }
    this.getSpeedByProximity = function() {
        var proximitySpeed = 0;
        var minimumSpeed = 5;
        var startPoint = this.location;
        var endPoint = this.target;
        var proximitySpeed = startPoint.distance(endPoint) / 5 * Math.random();
        //console.log(proximitySpeed);
        return Math.min(minimumSpeed, proximitySpeed);
    }
    this.getDirectionToTarget = function() {
        var direction = this.target;
        direction.subtract(this.location);
        direction.normalize();

        return direction;
    }
    this.wanderingDirection = function() {
        var factor = 0.1
        var randomFraction = factor * Math.random() + 0.1;
        var target = this.getDirectionToTarget();
        var direction = this.getDirection();
        direction.multiply(1 - randomFraction);
        target.multiply(randomFraction);
        direction.add(target);
        direction.normalize();
        //console.log(direction);
        return direction;

    }
    this.seekTarget = function() {
        var distance = 2
        var moveVector = this.wanderingDirection();
        moveVector.multiply(distance);
        this.move(moveVector);
    }

}


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
var bees = [];
var numBees = 50;

function initBees() {
    for (var i = 0; i < numBees; i++) {

        var bee = new Bee(new Point2d(0,0), new Point2d(10,10));
        bees.push(bee);
        console.log("bee");

    }
}
function updateBees(){
  for (var i = 0; i<bees.length; i++){

    bees[i].setTarget(new Point2d(mouseX, mouseY));
    //console.log(bees[i]['location']['x1'])
    bees[i].seekTarget();
    bees[i].draw();
    console.log(bees[i]['target']['x1'])

  }
}



// var bee = new Bee(new Point2d(200, 200), new Point2d(180, 180));
// bee.setColor("rgba(255,255,255,1)");
// bee.setTarget(new Point2d(200, 200));
// bees.push(bee);

function updateColorByProximity() {
    for (var i = 0; i < bees.length; i++) {
        beeCoord = bees[i]['location'];
        mouseCoord = new Point2d(mouseX, mouseY);
        distance = beeCoord.distance(mouseCoord);
        heat = parseInt(Math.min(255, distance / 4));
        //console.log(mouseCoord);
        //console.log(heat);
        //console.log(mouseX+","+mouseY);
        bees[i].setColor("rgba(255," + heat + "," + heat + ",1)");

    }
}


function initAnimation() {
    animate();
}

initBees();
initAnimation();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateBees();
    updateColorByProximity();


    requestAnimationFrame(animate);
}
