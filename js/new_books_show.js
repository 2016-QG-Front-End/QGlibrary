
/**
 * [CreateNewBook 创建新书节点，展示新书速递]
 * @param {[obj]} data [新书的obj对象，含有新书的信息]
 */
function CreateNewBook(data) {
    var oLi = '<li><img src="' + data.picture + '"><div class="book-name"><a href="'+ data.url + '">' + data.name +'</a></div>' + '<div  class="writer">' + data.author + '</div>' + '</li>'
    $('.new-books').append(oLi);
}

$(function() {
    $.ajax({
        type: "post",
        url: 'http://192.168.1.110:10086/newBook',
        data: null,
        dataType: "json",
        async: false,
        success: function(data) {
            for (var i = 0; i < 10; i++) {
                CreateNewBook(data.book[i]);
            }
            
        },
        error: function(xhr, status, errorThrowm) {
            alert("错误" + status + "错误抛出：" + errorThrowm);
        }
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

