    /**
     * 顶部加载条动画
     */
    $({ property: 0 }).animate({ property: 100 }, {
        duration: 3000,
        step: function() {
            var percentage = Math.round(this.property);
            $('#progress').css('width', percentage + "%");
            if (percentage == 100) {
                $("#progress").addClass("done"); //完成，隐藏进度条
            }
        }
    });

    /**
     * 点击logo返回首页
     */
    $('#logo').click(function() {
        window.location.href = 'index.html';
    });

    /**
     * 获取用户名
     */
    $(function() {
        $.ajax({
            type: "POST",
            url: "http://192.168.199.79:10086/getUser",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            data: {},
            success: function(data) {
                if (!data.name) {

                }else{
                $('#logOrReg').hide();
                $('#userName').text(data.name);
                $('#userInfo').show();
                // location.reload();
            }
            },
            error: function(jqXHR) {
                alert("发生错误：" + jqXHR.status);
            },
        });
    });
    /**
     * 注销
     */
    function logout() {
        $.ajax({
            type: "POST",
            url: "http://192.168.199.79:10086/logout",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            data: {},
            success: function(data) {
                $('#logOrReg').show();
                $('#userName').text('');
                $('#userInfo').hide();
                location.reload();
            },
            error: function(jqXHR) {
                alert("发生错误：" + jqXHR.status);
            },
        });
    }


    /**
     * 获取用户名和头像
     */
    var randomPic = parseInt(Math.random() * 30);
    $('#userHead').attr('src', '../images/headPic/' + randomPic + '.jpg');

    /**
     * 搜索框的跳转
     */
    $(document).ready(function() {
        searchSkip();

    });

    function searchSkip() {
        $('.button').bind('click', function() {         
            var url = window.location.href;
            if(url.indexOf('result')>0){
                location.search = 'search_text=' + encodeURIComponent(document.getElementById('search').value);
            } else {

            window.open('search_result.html' + '?' + 'search_text=' + encodeURIComponent(document.getElementById('search').value));
            }
        });
        $('#search').bind('keyup', function(e) {
            var ev = window.event || e;

            //13是键盘上面固定的回车键
            if (ev.keyCode == 13) {
                $('.button').trigger('click');
            }
        });
    }