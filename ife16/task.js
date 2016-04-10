/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var visited=[];//记录是否访问过

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */


function addAqiData() {
	 var city=document.getElementById("aqi-city-input").value.trim();
     var value=document.getElementById("aqi-value-input").value.trim();
	if(!city.match(/^[\u4e00-\u9fa5Za-z]+$/)){
		alert("城市名必须是中英文字符");
		//alert("city is"+city);
		return;
	}
	if(!value.match(/^(\d)+$/)){
       alert("空气质量指数必须是整数");
	   return ;
	}
	aqiData[city]=value;
	visited[city]=false;
}

/**
 * 渲染aqi-table表格
 */
var table=document.getElementById("aqi-table");
table.innerHTML="";

function renderAqiList() {
    
	for(var i in aqiData){            
		if(table.childNodes.length==0){
			table.innerHTML="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
		}
		if(!visited[i]){
		  var tr=document.createElement("tr");
		  var td1=document.createElement("td");
		  td1.innerHTML=i;
		  tr.appendChild(td1);
		  var td2=document.createElement("td");
		  td2.innerHTML=aqiData[i];
		  tr.appendChild(td2);
		  var td3=document.createElement("td");
		  td3.innerHTML="<button name='btn-Del'>删除</button>";
		  tr.appendChild(td3);
		  table.appendChild(tr);
		  visited[i]=true;
		}
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
  var tr=target.parentNode.parentNode;
  table.removeChild(tr);
  var City=tr.childNodes[0].innerHTML;
  //alert(City);
  delete aqiData[City];
  //alert(aqiData[City]);
  visited[City]=false;
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var btn=document.getElementById("add-btn");
  btn.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
 
  table.onclick=function(event){
	 if(event.target.tagName=="BUTTON"){ // 返回的是大写  
         delBtnHandle(event.target);
	 }
  }
}

init();