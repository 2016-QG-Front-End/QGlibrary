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
    })

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