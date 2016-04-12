
   var txt=document.getElementById("txt");
   var btn=document.getElementsByName("btn");
   var ul=document.getElementsByTagName("ul")[0];
   var arr=[];
   var check = /^([1-9][0-9]|100)$/;
   //alert(ul[0]);
   //alert(btn[0]);   //object HTMLInputElement

  //alert(UL.length);
   btn[0].onclick=function(){        //左侧入
     if(!check.test(txt.value)){
	    alert("请输入10-100的数字");
	 }
	 else if(ul.childNodes.length>60){
		alert("输入已满60个"); 
	}
	 else{
	   var li=document.createElement("li");
	   li.style.height=txt.value+"px";
       ul.insertBefore(li,ul.firstChild);
	   txt.value="";
	 }
   }
   btn[1].onclick=function(){         //右侧入
     if(!check.test(txt.value)){
	   alert("请输入10-100的数字");
	 }
	 else if(ul.childNodes.length>60){
	    alert("输入已满60个");	 
	 }
	 else{
	   var li=document.createElement("li");
	   li.style.height=txt.value+"px";
	   ul.appendChild(li);
	   txt.value="";
	 }
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

  btn[4].onclick=function(){              //随机
	  if(ul.childNodes.length==60){
	    return;	  
	  }
	  var len=ul.childNodes.length;
	 for(var i=0;i<60-len;i++){
	   var rand=Math.floor(Math.random()*90+10);
	   var li=document.createElement("li");
	   li.style.height=rand+"px";
	   ul.appendChild(li);
	}
  }

 var reg=/^([1-9][0-9]|100)px$/;
 function arra(){
	var len=ul.children.length;
    for(var i=0;i<len;i++){
		//alert(ul.children[i].style.height.match(reg)[1]);
		arr[i]=parseInt(ul.children[i].style.height.match(reg)[1]);
	}
   
 }


 function selectSort(){
	     var i=0,timer;
		 var len=ul.children.length;
		 selectSort.swap=function(){
		    var k=i;
		    for(var j=i+1;j<len;j++){
			   if(arr[k]>arr[j])
			       k=j;
		    }
		   var tmp=arr[i];
		   arr[i]=arr[k];
		   arr[k]=tmp;
		   ul.children[i].style.height=arr[i]+"px";
		   ul.children[k].style.height=arr[k]+"px";
		   i++
		  if(i>=len){
			  clearInterval(timer);
		  }
		 
	 }
	timer=setInterval("selectSort.swap()",100);
}


 btn[5].onclick=function(){
	arra();
	selectSort();
 }