$(function () {
    $(document).scroll(function () {
        var stop = $(window).scrollTop()
        if (stop < 550) {
            $('.ele-nav').hide()
            
        }else {
            $('.ele-nav').show()
            if (stop<1004) {
                $('#ele-item-1').css({ 'border': '1px solid #ffb310', 'color': '#ffb310' })
                $('#ele-item-1').siblings().css({ 'border': '1px solid #fff', 'color': '#333' })
            } else if(stop<1369) {
                $('#ele-item-2').css({ 'border': '1px solid #ffb310', 'color': '#ffb310' })
                $('#ele-item-2').siblings().css({ 'border': '1px solid #fff', 'color': '#333' })
            }else if(stop<1890) {
                $('#ele-item-3').css({ 'border': '1px solid #ffb310', 'color': '#ffb310' })
                $('#ele-item-3').siblings().css({ 'border': '1px solid #fff', 'color': '#333' })
            }else if(stop<2420) {
                $('#ele-item-4').css({ 'border': '1px solid #ffb310', 'color': '#ffb310' })
                $('#ele-item-4').siblings().css({ 'border': '1px solid #fff', 'color': '#333' })
            }else if(stop<2950) {
                $('#ele-item-5').css({ 'border': '1px solid #ffb310', 'color': '#ffb310' })
                $('#ele-item-5').siblings().css({ 'border': '1px solid #fff', 'color': '#333' })
            }else if(stop<3481) {
                $('#ele-item-6').css({ 'border': '1px solid #ffb310', 'color': '#ffb310' })
                $('#ele-item-6').siblings().css({ 'border': '1px solid #fff', 'color': '#333' });
            }else if(stop<5380){
                $('#ele-item-7').css({ 'border': '1px solid #ffb310', 'color': '#ffb310' })
                $('#ele-item-7').siblings().css({ 'border': '1px solid #fff', 'color': '#333' })
            }
        }
    })
});