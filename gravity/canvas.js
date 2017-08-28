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

var gravity=1;
var friction=0.95;


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

addEventListener("click",function(){
   init(); 
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Ball(x, y,dx,dy, radius, color) {
	this.x = x;
	this.y = y;
    this.dy=dy;
    this.dx=dx;
	this.radius = radius;
	this.color = color;

	this.update = function() {
		if(this.y+this.radius+this.dy>=canvas.height){
            this.dy*=-gravity;
            this.dy*=friction;
        }else{
            this.dy+=gravity;
        }
        
        if(this.x+this.radius>=canvas.width || this.x-this.radius<=0){
            this.dx*=-1;
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
        c.stroke();
		c.closePath();
	};
}


// Implementation
var ballArray=[];
function init() {
    ballArray=[];
    for(var i=0;i<300;i++){
        var radiusB=randomIntFromRange(5,30);
        var x=randomIntFromRange(radiusB,canvas.width-radiusB);
        var y=randomIntFromRange(0,canvas.height-2*radiusB);
        var colorB=randomColor(colors);
        var dx=randomIntFromRange(-2,2);
        ballArray[i]=new Ball(x,y,dx,0,radiusB,colorB);
    }
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0;i<ballArray.length;i++){
        ballArray[i].update();
    }
//	c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
}

init();
animate();