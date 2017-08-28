var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

//c.fillStyle='rgba(255,0,0,0.5)';
//c.fillRect(100,100,100,100);
//c.fillStyle='rgba(0,255,0,0.5)';
//c.fillRect(200,200,100,100);
//c.fillStyle='rgba(0,0,255,0.5)';
//c.fillRect(300,300,100,100);
//
////Line
//c.beginPath();
//c.moveTo(100,200);
//c.lineTo(300,400);
//c.stroke();

////Line
//c.beginPath();
//c.moveTo(200,100);
//c.lineTo(400,300);
//c.strokeStyle="#fa34b4";
//c.stroke();
//
////arc or circle
//c.beginPath();
//c.arc(300,300,30,0,Math.PI*2,true);
//c.strokeStyle="blue";
//c.stroke();

//
//for(var i=0;i<33;i++){
//    var x=Math.random()* window.innerWidth;
//    var y=Math.random()* window.innerHeight;
//    var cindx=parseInt(Math.random()*color.length);
//    console.log(cindx);
//    c.beginPath();
//    c.arc(x,y,30,0,Math.PI*2,true);
//    c.strokeStyle=color[cindx];
//    c.stroke();
//}

var color=["#2C3E50","#E74C3C","#ECF0F1","#3498DB","#2980B9"];

var mouse={
    x:undefined,
    y:undefined
}

var maxRadius=40;

window.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
});

window.addEventListener('resize',function(){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
    init();
});

function Circle(x,y,dx,dy,radius,color){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.minRadius=radius;
    this.radius=radius;
    
    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        c.strokeStyle=color;
        c.stroke();
        c.fillStyle=color;
        c.fill();
    }
    
    this.update = function(){
        this.x+=this.dx;
        this.y+=this.dy;
        if(this.x+this.radius>=window.innerWidth || this.x-this.radius<=0){
            this.dx*=-1;
        }
        if(this.y+this.radius>=window.innerHeight || this.y-this.radius<=0){
            this.dy*=-1;
        }
        if(mouse.x-this.x<50 && this.x-mouse.x<50 && mouse.y-this.y<50 && this.y-mouse.y<50){
            if(this.radius<maxRadius){
                this.radius+=5;
            }
        }else if(this.radius>this.minRadius){
            this.radius-=1;
        }
        this.draw();
    }
}

var circleArray =[];

function init(){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
    circleArray =[];
    for(var i=0;i<300;i++){
        var radius=10;
        var x=Math.random() * (innerWidth-radius*2)+radius;
        var y=Math.random() * (innerHeight-radius*2)+radius;
        var dx=(Math.random()-0.5)*2;
        var dy=(Math.random()-0.5)*2;
        var cindx=parseInt(Math.random()*color.length);
        circleArray[i]=new Circle(x,y,dx,dy,radius,color[cindx]);
    }
}






function animate(){
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
    requestAnimationFrame(animate);
}

init();
animate();