$(function () {
    
    $('#submit').click(function () {
        var name = $('[name=name2]').val();
        var tel = $('[name=tel]').val();

        //验证姓名
        if (name != '') {
            var names = parseInt(name);//验证是否为数字
            if (isNaN(names)) {
                if (/[@#\$%\^&\*]+/gi.test(name)) { //验证是否含有特殊字符
                    alert('姓名不能带有特殊字符')
                    return
                }
                if (name.length > 6) {
                    alert('姓名长度不符合规定，请输入六个或以下汉字')
                    return
                }
            } else {
                alert("姓名不能是数字");
                return
            }
        } else {
            alert('用户名不能为空')
            return
        }
        //验证联系电话
        if (tel != '') {
            var tels = parseInt(tel);//验证是否为数字
            if (!isNaN(tels)) {
                var reg = /(1[3-9]\d{9}$)/;
                if (!reg.test(tel)) { //验证手机号码格式
                    alert("请输入正确格式的手机号码！");
                    return false;
                }
            } else {
                alert("联系电话必须是数字");
                return
            }
        } else {
            alert('联系电话不能为空')
            return
        }
        /*  //验证邮箱
         if (mail!= '') {

            var mails = parseInt(mail);//验证是否为数字
            if(!isNaN(mails)){

                //正则表达式验证电子邮件格式
                var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; 
                // var reg2 = /(\d{4})-(\d{7})/; 
                if (!reg.test(mail) ) { 
                    alert("请输入正确格式的电子邮件地址！");
                    return false;
                }

            } else{
                alert("邮箱不能全是数字");
                return
            }

        }else{
            alert('邮箱不能为空')
            return
        } */
        $.ajax({
            url: "?op=submitApply",    // 提交到controller的url路径，在本页面就直接用?代替文件名即可，省略文件名，别的页面则需写全路径
            type: "post",    // 提交方式
            data: { "name": name, "age": age, 'tel': tel, 'address': address },  // data为String类型，必须为 Key/Value 格式。
            dataType: "json",    // 服务器端返回的数据类型
            success: function (data) {    // 请求成功后的回调函数，其中的参数data为controller返回的map,也就是说,@ResponseBody将返回的map转化为JSON格式的数据，然后通过data这个参数取JSON数据中的值

                if (data.code == 1) {
                    alert('报名成功！')
                    location.href = 'index.php';
                }

            },
        });
    });
})