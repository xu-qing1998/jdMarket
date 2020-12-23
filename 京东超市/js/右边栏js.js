$(function(){
	$(".tab-ico").mouseenter(function(){
		$(".tab-text").attr("style","display: block;");
//		$(".tab-text").siblings().attr("style","display: none;");s
	}).mouseleave(function(){
		$(".tab-text").attr("style","display: none;");
	}
	)
})