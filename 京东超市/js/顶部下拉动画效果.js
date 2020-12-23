$(function(){
	$("#ttbar-myjd").mouseenter(function(){
		$("#myjingdongshow").attr("style","display: block;");
	}).mouseleave(function(){
		$("#myjingdongshow").attr("style","display: none;");
	})
	
	$("#ttbar-serv").mouseenter(function(){
		$("#myclient").attr("style","display: block;");
	}).mouseleave(function(){
		$("#myclient").attr("style","display: none;");
	})
})