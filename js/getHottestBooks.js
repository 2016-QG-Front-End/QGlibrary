 function getHottestBook() {
            $.ajax({
                type: "POST",
                url: "http://192.168.199.79:10086/newBook",
                dataType: "json",
                data: null,
                success: function(data) {
                    if (data.length>0) {
                        // alert(data.length);
                        for (var i = 0; i < 3; i++) {
                            var slidingBook = '<div class="one-screen">' +
                                '<img src="' + data[i].picture + '">' +
                                '<div class="hot-book-info">' +
                                '<h1>' + data[i].name + '</h1>' +
                                '<span>作者：</span><span>' + data[i].author + '</span>' +
                                '<br>' +
                                '<span>评分：</span>' +
                                '<div class="hot-book-score">' + data[i].rating + '</div>' +
                                '<span>内容简介：</span>' +
                                '<div class="hot-book-intro">' + data[i].content + '</div>' +
                                '<a href="' + data[i].douban + '" target="_blank">详情</a>' +
                                '</div>' +
                                '</div>';
                            if (i == 0) {
                                var copyFirstBook = slidingBook;
                            }
                            $('.slide-container').append(slidingBook);

                        }
                            $('.slide-container').append(copyFirstBook);

                    }
                },
                error: function(jqXHR) {
                    alert("发生错误：" + jqXHR.status);
                },
            });
            setInterval(function() {
                if (parseInt($('.slide-container').css('marginLeft')) == -2700) {
                    $('.slide-container').css('marginLeft', '225px');
                }
                $('.slide-container').animate({ marginLeft: '-=975px' }, 3000);
            }, 6000);
        }