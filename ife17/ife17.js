// JavaScript Document

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
   var chart_wrap=document.getElementsByClassName("aqi-chart-wrap")[0];
   chart_wrap.innerHTML="";
   
   var color='',content='';   //随机产生颜色
   for(var i in chartData){
	   color="#"+Math.floor(Math.random()*0xffffff).toString(16);   //转化为16进制
       var div=document.createElement("div");
	   chart_wrap.innerHTML+="<div style='background:"+color+";width:100px;height:"+chartData[i]+"px;' title="+i+"空气质量："+chartData[i]+"></div>";
   }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var gra_time=document.getElementsByName("gra-time");
  var nowTime;
  for(var i=0;i<gra_time.length;i++){
	  if(gra_time[i].checked){
		  nowTime=gra_time[i].value;
		  break;
	  }
  }
  // 设置对应数据
   if(nowTime!=pageState.nowGraTime)
       pageState.nowGraTime=nowTime;
	   
  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var citySelect=document.getElementById("city-select");
  var cityName=citySelect.options[citySelect.selectedIndex].value;

  // 设置对应数据
  if(cityName!=pageState.nowSelectCity)
     pageState.nowSelectCity=cityName;
	 
  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
   var gra_time=document.getElementsByName("gra-time");
   for(var i=0;i<gra_time.length;i++){
	   gra_time[i].onclick=graTimeChange;
   }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var opts="";
  for(var data in aqiSourceData){
	  if(pageState.nowSelectCity==-1){   //初始化
		  pageState.nowSelectCity=data;
	  }
	  opts+="<option>"+data+"</option>";
  }
  var citySelect=document.getElementById("city-select");
  citySelect.innerHTML=opts;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onchange=citySelectChange; 
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 
    var cityDate = aqiSourceData[pageState.nowSelectCity];

    if (pageState.nowGraTime =="day") {
        chartData = cityDate;
    }

    if (pageState.nowGraTime == "week") {
        chartData = {};
        var Sum = 0;
        var dayNum = 0;
	    var week=1;
		var curMonth=0,flag=0;
        for (var i in cityDate) {
            var date = new Date(i);
            var day = date.getDay();
			var month=date.getMonth()+1;
            if(curMonth==0){
			   curMonth=month;
			   flag=1;
			}
			if(curMonth!=month){
				curMonth=month;
				flag=0;
			}
			//var week=1;
            if (day ==0) {    // 一周从周日开始，也就是day为0
                if (Sum > 0) {
                    var value = Math.floor(Sum / dayNum);
					if(flag==0){
					  week=1;
					  flag=1;
					}
                    var key = month+"月份第"+week + "周平均";
                    chartData[key] = value;
					week++;
                }
                dayNum = 0;
                Sum = 0;
            } 
		
            dayNum++;
            Sum += cityDate[i];
        }

        if (Sum > 0) {
            var value = Math.floor(Sum / dayNum);
			if(flag==0)
			   week=1;
			var key=month+"月份第"+week+"周平均";
            chartData[key] = value;
        }
    }

    if (pageState.nowGraTime == "month") {
        chartData = {};
        var Month = -1;
        var dayNum = 0;
        var Sum = 0;
        for (var i in cityDate) {
            var date = new Date(i);
            var month = date.getMonth();
            if (month !=Month) {
                if (dayNum > 0) {
                    var value = Math.floor(Sum / dayNum);
                    var key = date.getFullYear() + "年" + date.getMonth() + "月" + "平均";
                    chartData[key] = value;
                }
                Month = month;
                dayNum = 0;
                Sum = 0;
            }
            dayNum++;
            Sum += cityDate[i];
        }
        if (dayNum > 0) {
            var value = Math.floor(Sum / dayNum);
            var key = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + "平均";
            chartData[key] =value;
        }
    }
}



/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  
  renderChart();
}

init();



































