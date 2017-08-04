
/**
 * [createNewBook 创建新书节点，展示新书速递]
 * @param {[obj]} data [新书的obj对象，含有新书的信息]
 */
function createNewBook(data) {
    var oLi = '<li class="new-book-show-cell"><a href="' + data.douban + '"><img src="' + data.picture + '"></a><div class="book-name"><a href="'+ data.douban + '">' + data.name +'</a></div>' + '<div  class="writer">' + data.author + '</div>' + '</li>'
    $('.new-books').append(oLi);
}

$(function() {
    $.ajax({
        type: "post",
        url: 'http://192.168.199.79:10086/newBook',
        data: null,
        dataType: "json",
        async: false,
        success: function(data) {
            for (var i = 0; i < 10; i++) {
                createNewBook(data[i]);
            }
            
        },
        xhrFields: {
                    withCredentials: true
                },
        // error: function(xhr, status, errorThrowm) {
        //     alert("错误" + status + "错误抛出：" + errorThrowm);
        // }
    })
})
/**
 * [页面跳转到搜索框，url传递类别]
 * 
 * 
 */
$(function() {
    $('.book-type-label li span').bind('click', function () {
        var type = $(this).text();
        location.href = location.href + '?' + encodeURIComponent('search_text=' + type);
    })
})

