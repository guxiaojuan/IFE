// JavaScript Document
//尝试原型模式+构造函数

function create(elem){
	this.str="";
	this.arr=[];
	this.elem=elem;
}

create.prototype={
  constructor:create,
  addTag:function(){                //添加标签
		var len=this.arr.length;
		var index=this.arr.indexOf(this.str);
		//alert(index);
		if(index==-1){        //去重
			var li=document.createElement("li");
			li.innerHTML=this.str;
			this.arr.push(this.str);
			if(len==10){
				this.arr.shift();
				var node=this.elem.firstChild;
				this.elem.removeChild(node);
			}
			//alert(li);
			this.elem.appendChild(li);
		}  
   },
   
}

var tagValue=document.getElementById("tagValue");
var hobbyValue=document.getElementById("hobbyValue");
var tag=document.getElementById("tag");
var hobby=document.getElementById("hobby");
var btn=document.getElementById("btn");
reg=/[,.;，。\s\n]+/;

//实例化对象
var Tag=new create(tag);
var Hobby=new create(hobby);

//鼠标悬停时添加删除
function addDel(tag,content){
	if(tag.tagName=='LI'){
	   tag.innerHTML="点击删除"+content;
	   //alert(tag);
	   tag.style.background="red";
	}
}
//鼠标离开时去掉删除
function Del(tag,content){
   if(tag.tagName=='LI'){
	   //alert(content);
	  // alert("content的长度是"+content.length);
      tag.innerHTML=content.substr(4);
	  //alert(tag.innerHTML);
	  tag.style.background="#0099FF";
   }
}
//鼠标点击删除tag
function DelTag(tag){
	if(tag.tagName=='LI')
	  // alert(tag.parentNode);
	   tag.parentNode.removeChild(tag);
}

window.onload=function(){
	//Tag
	tagValue.addEventListener('keyup',function(){
		var str=tagValue.value;
		if(str.match(reg) || event.keyCode ==13){    //换行符不管用，需要单独写，我的浏览器上中文符号也不识别
			var tmp=str.trim().split(reg)[0];
			//alert(tmp);
			Tag.str=tmp;
			//alert(Tag.arr);
			Tag.addTag();
			tagValue.value="";
		}			
    });
	
	tag.addEventListener('mouseover',function(event){
		//alert(event.target.tagName);	 //LI
		//alert(event.target.innerHTML); <li>df</li>
		//alert(event.target);  [object HTMLUListElement]
		//alert(event.target.firstChild);  [object HTMLLIElement]
		//alert(event.target.firstChild.innerHTML);  df
		//alert(event.target.firstChild.tagName);LI
		var node=event.target;
		addDel(node,node.innerHTML);
	    
    });

	tag.addEventListener('mouseout',function(event){
	     var node=event.target;
		Del(node,node.innerHTML);
	});
	
	tag.addEventListener('click',function(event){
	    var node=event.target;
		DelTag(node);
		Tag.arr.shift();
		
	});
	
	//hobby
	btn.onclick=function(){
		var str=hobbyValue.value;
		var tmp=str;
		if(str.match(reg)){    
			tmp=str.trim().split(reg);	
		}
		for(var i in tmp){
		   	Hobby.str=tmp[i];
			Hobby.addTag();
		}
		hobbyValue.value="";
	}

}






