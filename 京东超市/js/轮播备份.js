$(function(){
  var $container = $('#container')
  var $list = $('#list')
  var $points = $('#pointa>a')
  var $prev = $('#prev')
  var $next = $('#next')
  var TIME = 400 // 移动的总时间
  var ITEM_TIME = 20 //单元移动的间隔时间
  var PAGE_WIDTH = 780 // 一页的宽度
  var imgCount = $points.length //图片的数量
  var index = 0 //当前圆点的下标
  var moving = false //是否正在翻页中
	
// 1. 点击向右(左)的图标, 平滑切换到下(上)一页
  $next.click(function () {
    nextPage(true)
  })
  $prev.click(function () {
    nextPage(false)
  })
  
  var intervalId = setInterval(function(){
  	nextPage(true);
  },2000)
  
  $container.hover(function(){
  	   clearInterval(intervalId);
  },function(){
  	intervalId = setInterval(function(){
  	nextPage(true);
  },2000)
  })
  
 
  function nextPage(next){
  	 var offset=0; 
  	 offset =next ? -PAGE_WIDTH :PAGE_WIDTH;
  	var itemOffset = offset/(TIME/ITEM_TIME);
  	var currentLeft= $list.position().left;
  	var targetLeft = currentLeft + offset
  	 var intervalId = setInterval(function(){
  	 	currentLeft+=itemOffset;
  	 	if(currentLeft===targetLeft){
  	 		clearInterval(intervalId);
  	 		 if(currentLeft===-PAGE_WIDTH*(imgCount+1)){
  	 		 	currentLeft=-PAGE_WIDTH;
  	 		 }else if( currentLeft===0){
  	 		 	currentLeft=-PAGE_WIDTH*imgCount;
  	 		 }
  	 	}
  	   $list.css("left", currentLeft)
  	 }, ITEM_TIME)
  	
  	
  	
  	
  
  	
  	
  	
  }
  
	
	
	
	
	
	
	
	
	
	
})