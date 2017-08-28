// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};

var colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];


// Event Listeners
addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;

	init();
});

addEventListener("click",function(event){
    var x=mouse.x;
    var y=mouse.y;
    var dy=randomIntFromRange(-5,5);
    var dx=randomIntFromRange(-5,5);
    var radius=randomIntFromRange(1,20)+5;
    var colorB=randomColor(colors);
    ballArray.push(new Balls(x,y,dx,dy,radius,colorB));
});

// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
var ballArray=[];
function Balls(x, y, dx,dy,radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
    this.dx=dx;
    this.dy=dy;

	this.update = function() {
		if(this.x+this.radius>=canvas.width || this.x-this.radius<=0){
            this.dx*=-1;
        }
        if(this.y+this.radius>=canvas.height || this.y-this.radius<=0){
            this.dy*=-1;
        }
        this.x+=this.dx;
        this.y+=this.dy;
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};
}


// Implementation
function init() {

}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0;i<ballArray.length;i++){
        ballArray[i].update();
    }
}

init();
animate();