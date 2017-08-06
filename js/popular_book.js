/**
 * [createPopularBook 创建热门图书的节点]
 * @param {[type]} data [书的信息]
 */
function createPopularBook(data) {
    var author = data.author
    if (author.length >= 12) {
        author = author.substring(0, 11) + '...'
    };

    var name = data.name
    if (name.length >= 7) {
        name = name.substring(0, 6) + '...'
    };

    var rate = data.rating;
    if (!rate) {
        rate = '暂无';
    }

    var content = data.content.substring(0, 8) + '...'

    var oLi = '<li><a href="' + data.douban + '" target="_blank" title="' + data.name + '"><img onclick="trackWhat('+data.ISBN+')" src="' + data.picture + '"></a><div><h4 title="' + data.name + '" >' + name + '</h4><p class="evaluate">评分：<i>' + rate + '</i></p><p class="book-writer" title="' + data.author + '">' + author + '</p><p class="category " title="' + data.content + '">' + content + ' </p></div></li>';
    $('.popular-books-table').append(oLi);

    var personRecommendBook = document.getElementsByClassName('popular-books-table')[0];
    var Li = personRecommendBook.getElementsByTagName('li');
    var h4 = Li[Li.length - 1].getElementsByTagName('h4')[0];
    h4.onclick = function() {
        trackWhat(data.ISBN)
        window.open(data.douban);

    }
}

$(function() {
    $.ajax({
        type: "post",
        url: 'http://192.168.199.79:10086/newBook',
        data: null,
        dataType: "json",
        async: false,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            for (var i = 0; i < 10; i++) {
                createNewBook(data[i]);
            };
            for (var i = 10; i < 18; i++) {
                createPopularBook(data[i]);
            };

        },
    });
})

/**
 * 跟踪用户浏览记录
 */
function trackWhat(isbn) {
    rq = {
        ISBN: arguments[0]
    }
    $.ajax({
        type: "POST",
        url: "http://192.168.199.79:10086/bookEx",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify(rq),
        success: function(data) {},
        error: function(jqXHR) {
            alert("发生错误：" + jqXHR.status);
        },
    });
}