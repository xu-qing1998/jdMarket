var ua = navigator.userAgent.toLowerCase();
var isIE6 = ua.indexOf("msie 6") > -1;//�ж��Ƿ�ΪIE6

// remove css image flicker
//IE6��Ĭ�ϲ����汳��ͼƬ��CSS��ÿ�θ��ͼƬ��λ��ʱ�������·��������������������IE6���汳��ͼƬ
if(isIE6){
    try{
        document.execCommand("BackgroundImageCache", false, true);
    }catch(e){}
}
//png24
if (!!window.DD_belatedPNG) {
    DD_belatedPNG.fix('img,.header .mid .btn_group ul li.login a,.header .mid .searchbox .btn_input,.recommend .recommend_con .item .btn_buy,.routes .routes_left .bd .league ul li .teletext .tip');
};

