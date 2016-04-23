// JavaScript Document

var queue=[];
var bfsqueue=[];
var timer=null; 


function dfs(node){

	queue.push(node);
	var i;
	
	for(i=0;i<node.children.length;i++)
	{
		
		dfs(node.children[i]);
	}
	
}

function bfs(node){
	
	   var i=0;
	   var j=0;
	   bfsqueue.push(node); 
	 
	   while(bfsqueue.length!=j) 
	   {	  
		   m=bfsqueue[j];   
		   queue.push(m);   
		   j++;             
			for(i=0;i<m.children.length;i++)
			bfsqueue.push(m.children[i])      
	   }

	
}

var flag=0;//是否找到的标志
function show(){
	clearInterval(timer);
	var i;
	var alltree= document.getElementsByClassName('tree');
	for(i=0;i<alltree.length;i++){
		alltree[i].style.background = '#fff';
	}
	i = 0;
	//queue[0].style.background = '#000';
	timer = setInterval(function(){ 
		//i++;

		if(i >= queue.length){
			queue[i-1].style.background = '#fff';
			clearInterval(timer);
			if(flag==0)
			  alert("你要找的内容不存在");
		}else{
		    if(text.value && text.value == queue[i].innerHTML.split('<')[0].trim()){
			   //alert(queue[i].innerText.split(' ')[0]);
			   //alert(queue[i].innerHTML);
			   queue[i].style.background = '#FF0'      //元素找到，标注
			   flag=1;
			   if(i)
			     queue[i-1].style.background='#fff';   //恢复父节点的颜色
			     clearInterval(timer);
			}
			else
			queue[i].style.background = '#000';
			
		    //if(text.value!=queue[i-1].innerText.split(' ')[0])    //颜色恢复
			if(i)
			 queue[i-1].style.background = '#fff'; 
			
			i++;
		}
		
	}, 500);
	
}

var text;
var selected;
var divs=document.getElementsByTagName("div");
window.onload=function(){
	document.getElementById('dfs').onclick=function(){
	
		queue=[];
		text=document.getElementsByName('find')[0];
		dfs(document.getElementsByClassName('NO1')[0]);
		show();
		//alert(queue[0].innerHTML);
		
	}
	document.getElementById('bfs').onclick=function(){
		queue=[];
		text=document.getElementsByName('find')[0];
		bfs(document.getElementsByClassName('NO1')[0]);
		show();
	}
	
     //selectDiv(); //初始化	
	 document.getElementById("insert").onclick=function(event){
		 selectDiv(); //初始化	
		 var input=document.getElementsByTagName("input")[0];
		 if(input.value==""){
			 alert("请输入添加内容");
		 }
		 else if(selected==undefined){
		   alert("请选中要操作的节点"); 	 
		 }
		 else{
		   var div=document.createElement("div");
		   div.innerHTML=input.value;
		   selected.appendChild(div);
		   selectDiv();
		   
		 }
	 }
	 
	 document.getElementById("del").onclick=function(event){
	   selectDiv();
	   if(selected==undefined){
		  alert("请选中要删除的节点");  
	   }
	   else{
		  selected.parentNode.removeChild(selected);   
	   }
	}

}

function selectDiv(){
	 for(var i=0;i<divs.length;i++){
		 divs[i].onclick=function(event){
			  clearDiv();  //清理前边的修改
			  event.stopPropagation();  //不阻止冒泡的话，会将改变冒泡到根节点
			  selected=this;
		 }
     }
}

function clearDiv(){
   for(var i=0;i<divs.length;i++){
	  divs[i].style.background="#fff"; 
   }
}