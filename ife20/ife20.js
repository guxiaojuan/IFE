// JavaScript Document

var btn=document.getElementsByName("btn");
var ul=document.getElementsByTagName("ul")[0];
var input=document.getElementById("inputValue");

reg=/[\s|,|\n]/;   //textarea中tab键不管用，囧
var str=[];

function split_Str(Str){
  var tmp=Str.split(reg);
  for(var i=0;i<tmp.length;i++)
     str.push(tmp[i]);
  /*alert(tmp);
  for(var i in str)
	  alert(str[i]);
  */
}


 btn[0].onclick=function(){                //左侧入
	 //alert(document.getElementById("inputValue").value);
	 //alert(input);
	 //alert(value);
	 split_Str(input.value);
	 var j=0; 
	 //var UL=document.createElement("ul");
	 for(var i in str){
		 var li=document.createElement("li");
		 li.innerHTML=str[i];
		 if(ul.length==0){
			 ul.appendChild(li);
		 }
		 else{
		   ul.insertBefore(li,ul.children[j]);
		   j++;
		} 
	 }
	/* UL.style.display="inline-block";
      alert(ul.firstChild);
	  alert(ul.children[0]);
	ul.insertBefore(UL,ul.firstChild); */
     input.value="";
	 str=[];
 }
 
 btn[1].onclick=function(){      //右侧入
   split_Str(input.value);
   var j=0;
   for(var i in str){
	  var li=document.createElement("li");
	  li.innerHTML=str[i];
	  ul.appendChild(li);
   }
   input.value="";
   str=[];
}


btn[2].onclick=function(){                 //左侧出
   if(ul.childNodes.length){
	    ul.removeChild(ul.firstChild);
	}
	  else{
	    alert("队列已为空");
	  }
}
   
btn[3].onclick=function(){              //右侧出
    if(ul.childNodes.length){
	   ul.removeChild(ul.lastChild);
	}
    else{
	  alert("队列已为空");
	}
}

var arr=[];
btn[4].onclick=function(){    //输入查询
	var txt=document.getElementById("txt").value;
	arr=txt.split(reg);
	for(var i in arr){
		var flag=0;
		for(var j=0;j<ul.children.length;j++){
			if(arr[i]==ul.children[j].innerHTML){
				ul.children[j].style.background="green";
				flag=1;
				break;
			}
		}
		if(!flag)
		  alert("没有查询到你要找的内容");
	}
}