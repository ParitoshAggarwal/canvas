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


// earth color scheme
var earth = [
'rgb(0, 38, 28)', 
'rgb(4, 76, 41)',
'rgb(22, 127, 57)',
'rgb(69, 191, 85)',
'rgb(150, 237, 137)',
];

// fire color scheme
var fire = [
'rgb(242, 193, 102)', 
'rgb(242, 134, 3)',
'rgb(217, 63, 7)',
'rgb(140, 29, 4)',
'rgb(65, 15, 4)',
];

// water color scheme
var water = [
'rgb(0, 48, 90)', 
'rgb(0, 75, 141)',
'rgb(0, 116, 217)',
'rgb(65, 147, 217)',
'rgb(122, 186, 242)',
];

var g=[earth,fire,water];
var gindx=0;
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
    circles.push(new Circle(mouse.x,mouse.y,50,randomColor(g[gindx]),20));
    gindx+=1;
    gindx%=3;
    
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Circle(x, y, radius, color,dr) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
    this.dx=randomIntFromRange(-2,2)+1;
    this.dy=randomIntFromRange(-2,2)+1;
    this.dr=dr
    
	this.update = function() {
		
        
        this.x+=this.dx;
        this.y+=this.dy;
        this.radius+=this.dr;
        
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.strokeStyle=color;
        c.stroke();
//        c.fillStyle=color;
//        c.fill();
		c.closePath();
	};
}

var circles=[];

// Implementation
function init() {
    c.fillText("Paritosh's Webpage",canvas.width/2,canvas.height-100);
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
    var x=mouse.x;
    var y=mouse.y;
    var radius=randomIntFromRange(10,40)+20;
//    var ghhg=;
    var colorB=randomColor(g[gindx]);
    circles.push(new Circle(x,y,radius,colorB,-0.5));
    
    for(var i=0;i<circles.length;i++){
        if(circles[i].radius<=0){
//            circles.splice(i, 1);
            continue;
        }
        circles[i].update();
    }
    c.font="70px Georgia";
    c.fillStyle="white";
    init();
//	c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
}

init();
animate();