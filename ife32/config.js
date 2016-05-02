// JavaScript Document

//表单的数据配置

var config_form=[
   { label:'名称',
      type:'text',
	  validator:function(str){
		  return validator.validName(str);
	  },
	  rules:'必填，长度为4-16个字符',
	  success:'格式正确',
	  fail:'名称格式不正确'
   },
   
   { label:'密码',
      type:'password',
	  validator:function(str){
		  return validator.validPassword(str);  
	  },   
	  rules:'必填，长度为6到16个字符',
	  success:'密码格式正确',
	  fail:'密码格式错误'
   },
   
   { label:'重复密码',
      type:'password',
	  validator:function(str){
		 return validator.validRepeat(str);  
	  },
	  rules:'必填，再次输入同样的密码',
	  success:'两次密码输入一致',
	  fail:'两次密码不一致，请重新输入'	
   },
   { label:'邮箱',
      type:'text',
	  validator:function(str){
		 return validator.validEmail(str);  
	  },
	  rules:'必填，请输入您的邮箱',
	  success:'邮箱格式正确',
	  fail:'邮箱格式不正确，请重新输入'	  
    },
	{ label:'手机',
	   type:'text',
	   validator:function(str){
		  return validator.validPhone(str);   
	   },
	   rules:'必填，请输入您的手机号',
	   success:'手机号码格式正确',
	   fail:'手机号码格式不正确'
	},
    { label:'提交',
	   type:'submit',
	   validator:function(){
	      return validator.validSubmit();
	   },
	   rules:'',
	   success:'您的表单格式正确',
	   fail:'您的表单格式不正确'
	}
				 
]