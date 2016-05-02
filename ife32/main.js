// JavaScript Document

//对validate函数进行封装

var con='';

var validator={
  validName:function(str){    //验证名称
	  var len=str.length;
	  if(len>=4 && len<=16)
		return true;
	  return false;
  },
  validPassword:function(str){ //密码验证
      var len=str.length;
	  if(len>=6 && len<=16){
		 con=str;
	     return true;
	  }
	  return false;
  },
  validRepeat:function(str){  //重复密码验证
      if(str && str==con){
		  return true;  
	  }
	  return false;
  },
  validEmail:function(str){  //邮箱验证
	  var reg=/([\w*-_]+)@(\w)\.([\w]{2,4})$/;
	  return reg.test(str);
  },
  validPhone:function(str){ //手机号验证
     var reg=/^1[0-9]{10}$/;
	 return reg.test(str);
  },
  validSubmit:function(str){  //提交验证
	  var inputValue=document.getElementsByTagName("input");
	  var tot=0,len=inputValue.length;
	  for(var i=0;i<len;i++){
		  if(inputValue[i].className=="Right")
		       tot++;
	  }
	  return tot==len;
  }
}

//工厂配置 
//格式：<p><span>名称</span><input type="text"></p> <span>提示</span>
//       
  function Factory(data){
	method={
	 inition:{
		    label: data.label,
            type: data.type,
            validator: data.validator,
            rules: data.rules,
            success: data.success,
            fail: data.fail
	 },
	 //return judge();
	
	 Input:function(){
		 var formFactory=document.getElementById("formFactory");
		 var p=document.createElement("p");
		 var span1=document.createElement("span");
		 span1.innerHTML=this.inition.label;
		 var input=document.createElement("input");
		 input.type=this.inition.type;
		 
		 var span2=document.createElement("span");
		 span2.className="hint";
		 
		 p.appendChild(span1);
		 p.appendChild(input);
		 formFactory.appendChild(p);
		 formFactory.appendChild(span2);
		 
		 //事件绑定
	     var that=this;  //后边需要使用input框中的值，得用到this
		 input.addEventListener('focus',function(){
			span2.innerHTML=that.inition.rules;
			//alert("p2的内容是"+p2.innerHTML);
		 });
		 
		 input.addEventListener("blur",function(){
			//alert("that 是"+that.value);
			//alert("this是"+this.value);
		     var returnValue=that.inition.validator(this.value);
			 //alert("returnValue是"+returnValue);
			 if(returnValue){
				 input.className="Right";
				 span2.className="hint rightSpan";
				 span2.innerHTML=that.inition.success;
			 }
			 else{
			    input.className="Wrong";
				span2.className="hint wrongSpan";
				span2.innerHTML=that.inition.fail;
			}
		 });
     },
   
	  btn:function(){
		  var formFactory=document.getElementById("formFactory");
		  var div=document.createElement("div");
		 // div.className="bton";
		  var btn=document.createElement("button");
		  btn.innerHTML=this.inition.label;
		  
		  var that=this;
		  btn.addEventListener('click',function(){
			 if(that.inition.validator())
				alert("提交成功");
			 else
				alert("提交失败");
		  });
		  div.appendChild(btn);
		  formFactory.appendChild(div);
	  },
	  
	  judge:function(){
		 switch(this.inition.type){
			 case 'submit':
				//alert("submit");
				this.btn();break;
			 default:
			    //alert("input");
				this.Input();
		 }
	  },
  };
  return method.judge();
  
}
  window.onload=function(){
	 for(var i=0;i<config_form.length;i++)
	    Factory(config_form[i]);
  }