
/**
 * [createPopularBook 创建热门图书的节点]
 * @param {[type]} data [书的信息]
 */
function createPopularBook(data) {
    var oLi = '<a href=""><img src="' + data.pictrue + '"></a><div><h4>' + data.name + '</h4><p class="evaluate">评分：<i>' + data.rating + '</i></p><p class="book-writer">' + data.author +'</p><p class="category ">' + 标签 + ' </p><p class="cntent-abstract">' + 内容简介 + '</p></div>';
    $('.popular-books-table').append(oLi);
}

$(function() {
    $.ajax({
        type: "post",
        url: 'http://192.168.1.110:10086/newBook',
        data: null,
        dataType: "json",
        async: false,
        success: function(data) {
            for (var i = 10; i < 20; i++) {
                createPopularBook(data.book[i]);
            }
            
        },
        error: function(xhr, status, errorThrowm) {
            alert("错误" + status + "错误抛出：" + errorThrowm);
        }
    })
})