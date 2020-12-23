/*设置入口函数*/
	$( function(){
	   $(document).scroll(function(){
	   var stop = $(window).scrollTop();
	   if(stop<650){
	   	     $("#leftfixed1").css("backgroundColor", "#ffa133");
	   	     $("#leftfixed1").siblings().css("backgroundColor","white");
	     }
	   
	    if(stop>650 && stop<1200){
	   	     $("#leftfixed2").css("backgroundColor", "#ffa133");
	   	     $("#leftfixed2").siblings().css("backgroundColor","white");
	     }
	    
	     if(stop>1200 && stop<1500){
	   	     $("#leftfixed3").css("backgroundColor", "#ffa133");
	   	     $("#leftfixed3").siblings().css("backgroundColor","white");
	     }
	    
	     if(stop>1500 && stop<1550){
	   	     $("#leftfixed4").css("backgroundColor", "#ffa133");
	   	     $("#leftfixed4").siblings().css("backgroundColor","white");
	     }
	     
	     if(stop>1550){
	     	 $("#leftfixed4").css("backgroundColor", "#ffa133");
	   	     $("#leftfixed4").siblings().css("backgroundColor","white");
	     }
	   })
	})