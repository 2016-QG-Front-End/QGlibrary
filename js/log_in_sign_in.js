/**
 * [对登录与注册的div的转换]
 */
$(function() {

    /**
     * [从登录div转换到注册div]
     * $('.change-sign-in') [获取登录的div]
     * $('.warm-log-in') [获取注册的div]
     */
    $('.change-sign-in').bind('click',function() {
        $('.warm-sign-in').css("display","none")
        .prev().css("display","none");
        $('.warm-log-in').css("display","block")
        .prev().css("display","block");
    });

    /**
     * [从注册div转换到登录div]
     * $('.change-sign-in') [获取登录的div]
     * $('.warm-log-in') [获取注册的div]
     */
    $('.change-log-in').bind('click',function() {
        $('.warm-log-in').css("display","none")
        .prev().css("display","none");
        $('.warm-sign-in').css("display","block")
        .prev().css("display","block");
    })
})

$(function() {
    
        var username = document.getElementById('username'),
            password = document.getElementById('password'),
            regUser = /^[a-zA-Z0-9]{4,8}$/,
            regPass = /^[a-zA-Z0-9]{4,8}$/;
            $('#username').bind('keyup', function() {
                if (!regUser.test(username.value)) {
                    $('.log-in-error').html('用户名由4到8个数字或大小写字母组成').css("display","block");
                } else {
                    $('.log-in-error').css("display","none");
                }
            })
            $('#password').bind('keyup', function() {
                if ($('.log-in-error').html() != '用户名由4到8个数字或大小写字母组成') {
                    if(! regPass.test(password.value)) {
                        $('.log-in-error').html('密码由4到8个数字或大小写字母组成').css("display","block");
                    } else {
                        $('.log-in-error').css("display","none");
                    }
                }
            })
})

$(function () {
    $.ajax({
                type: "post",
                url: ,
                data: ,
                dataType: "json",
                async: false,
                // username: 'admin',
                // password: "admin123456",
                success: function(data) {
                    

                },
                error: function(xhr, status, errorThrowm) {
                    alert("错误" + status + "错误抛出：" + errorThrowm);
                }
            });
})
function CreateJson () {
    var obj = new Object;
}