/*
 功能说明:
 1. 点击向右(左)的图标, 平滑切换到下(上)一页
 2. 无限循环切换: 第一页的上一页为最后页, 最后一页的下一页是第一页
 3. 每隔3s自动滑动到下一页
 4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
 5. 切换页面时, 下面的圆点也同步更新
 6. 点击圆点图标切换到对应的页

 bug: 快速点击下一页时, 有问题
 */
$(function () {
  var $points = $('#pointasecond>a')
  var index=0; 
  var intervalId = setInterval(function () {
  	 index++;
  	 if(index>=5){
  	 	index=0;
  	 }
  	 if($points[index].className=="on"){
  	 	  // 移除当前下标元素的class
      $points[index].className = ''
  	 }else{
  	 	 $points[index].className = 'on'
  	 }
   
  }, 1000)

})