
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

/**
 * [正则表达式对账号密码验证]
 * 
 * 
 * 
 */
$(function() {
    
        var username = document.getElementById('username'),
            password = document.getElementById('password'),
            regUser = /^[a-zA-Z0-9]{4,8}$/,
            regPass = /^[a-zA-Z0-9]{4,8}$/;
            $('#username').bind('keyup', function() {
                if (!regUser.test(username.value)) {
                    $('.log-in-error').html('用户名由4到8个数字或大小写字母组成').css("display","block");
                } else {
                    $('.log-in-error').html('').css("display","none");
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

/**
 * [登录，对登录信息的上传]
 *  
 * 
 *
 */
$(function () {
    $('.log-submit').bind('click', function (e) {
        var username = document.getElementById('username'),
            password = document.getElementById('password'),
            obj = new Object();
            obj.user = username.value;
            obj.password = password.value;
            e.preventDefault(),
            $.ajax({
                type: "post",
                url: 'http://192.168.1.110:10086/hasUser',
                data: JSON.stringify(CreateJson(obj)),
                dataType: "json",
                async: false,
                success: function(data) {
                    LogInChange(JSON.$.parseJSON(data));
                },
                error: function(xhr, status, errorThrowm) {
                    alert("错误" + status + "错误抛出：" + errorThrowm);
                }
            });
    });
    
})

/**
 * [CreateJson 创建JSON数据的对象]
 * @param {[Object]} obj [存有账号密码等信息的对象]
 */
function CreateJson (obj) {
    var account = new Object();
    for (var i in obj) {
        account[i] = obj[i];
    }
    return obj
}

/**
 * [LogInChange 登录数据返回对数据的分析]
 * @param {[type]} data [json解析后的数据]
 */
function LogInChange (data) {
    switch(data.status) {
        case '1': locaton.href=data.url;break;
        case '2':  $('.log-in-error').html('用户名不存在或密码错误').css("display","block");
    }
}