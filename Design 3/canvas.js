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
	'#04BFBF',
	'#CAFCD8',
	'#F7E967',
	'#A9CF54',
    '#588F27',
    '#263248',
    '#7E8AA2',
    '#DC3522'
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



// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
var objectArray=[];
function Object(startX,width,height,color){
    this.startX=startX;
    this.color=color;
    this.height=height;
    this.width=width;
    this.dy=10;
    this.originalHeight=height;
    
    this.update = function() {
        if(mouse.x>=this.startX && mouse.x<=this.startX+this.width&&this.height<canvas.height+8){
            this.height+=this.dy;
        }else if(this.height>this.originalHeight){
            this.height-=this.dy;
        }
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
        
        var grd=c.createLinearGradient(this.startX,canvas.height,this.startX+this.width,canvas.height-this.height);
        grd.addColorStop(0,this.color);
        grd.addColorStop(1,this.color);
        
        c.fillStyle=grd;
        c.fillRect(this.startX,canvas.height,this.width,-this.height);
        c.stroke();
	};
}


// Implementation
function init() {
    objectArray=[];
    var hmtimes=Math.floor(canvas.width/80);
    var startx=0;
    for(var i=0;i<=hmtimes;i++){
        var colorB=randomColor(colors);
        while(i!=0 && colorB==objectArray[i-1].color){
            colorB=randomColor(colors);
        }
        objectArray[i]=new Object(startx,80,randomIntFromRange(canvas.height/10,canvas.height/2),colorB);
        startx+=80;
    }
    
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0;i<objectArray.length;i++){
        objectArray[i].update();
    }
    c.font="50px Verdana";
    c.fillStyle="White";
    c.fillText("AMPLIFY IT",canvas.width/2-200,canvas.height/2-100);
    
    c.beginPath();
    c.moveTo(canvas.width/2-210,canvas.height/2-70);
    c.lineTo(canvas.width/2+100,canvas.height/2-70);
    c.lineWidth=8;
    c.strokeStyle="white";
    c.stroke();
    
    c.font="30px Verdana";
    c.fillStyle="White";
    c.fillText("SINCE 1907",canvas.width/2-150,canvas.height/2-30);
    
    
}

init();
animate();