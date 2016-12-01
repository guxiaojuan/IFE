var canvas,context;   //保存画布和绘图上下文

window.onload=function(){
	canvas=document.getElementById('canvas');
	context=canvas.getContext('2d');

	drawMaze("maze.png",268,5);
	window.onKeydown=processKey;
}

var x=0,y=0;   //记录笑脸图标的位置
var timer;
var dx=0,dy=0;//记录笑脸的速度
function drawMaze(mazeFile,startX,startY){
	clearTimeout(timer);
	dx=0;
	dy=0;
	var imgMaze=new Image();
	imgMaze.onload=function(){
		canvas.width=imgMaze.width;
		canvas.height=imgMaze.height;
		context.drawImage(imgMaze,0,0);

		x=startX;
		y=startY;
		var imgFace=document.getElementById('face');
		context.drawImage(imgFace,x,y);
		context.stroke();

		timer=setTimeout(drawFrame, 10);
	};
	imgMaze.src=mazeFile;
}

function processKey(e){
	dx=0;
	dy=0;

	if(e.keyCode==38) //向上移动
		dy=-1;
	if(e.keyCode==40)//向下移动
		dy=1;
	if(e.keyCode==37)//向左移动
		dx=-1;
	if(e.keyCode==39)//向右移动
		dx=1;
}

function checkForCollision(){   //碰撞检测
	var imgData=context.getImageData(x-1,y-1,15+2,15+2);
	var pixels=imgData.data;

	for(var i=0;i<pixels.length;i+=4){
		var red=pixels[i];
		var green=pixels[i+1];
		var blue=pixels[i+2];
		var alpha=pixels[i+3];

		if(red==0 && green==0 && blue==0)
			return true;
		if(red==169 && green==169 && blue==169)
			return true;
	}
	return false;
}

function drawFrame(){
	if(dx!=0 || dy!=0){
		context.beginPath();
		context.fillStyle="rgb(254,244,207)";
		context.rect(x,y,15,15);
		context.fill();

		x+=dx;
		y+=dy;

		if(checkForCollision()){
			x-=dx;
			y-=dy;
			dx=0;
			dy=0;
		}

		var imgFace=document.getElementById("face");
		context.drawImage(imgFace,x,y);

		if (y>(canvas.height-17)) {
			alert("You win!");
			return;
		}
	}

	timer=setTimeout(drawFrame, 10);
}

function loadEasy(){
	drawMaze('easy_Maze.png',5,5);
}
function loadHard(){
	drawMaze('maze.png',268,5);
}
