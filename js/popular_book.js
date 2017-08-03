
/**
 * [createPopularBook 创建热门图书的节点]
 * @param {[type]} data [书的信息]
 */
function createPopularBook(data) {
    var oLi = '<li><a href=""><img src="' + data.picture + '"></a><div><h4>' + data.name + '</h4><p class="evaluate">评分：<i>' + data.rating + '</i></p><p class="book-writer">' + data.author +'</p><p class="category ">' + data.type + ' </p><p class="cntent-abstract">' + data.content + '</p></div></li>';
    $('.popular-books-table').append(oLi);
}

$(function() {
    $.ajax({
        type: "post",
        url: 'http://192.168.43.182:10086/newBook',
        data: null,
        dataType: "json",
        async: false,
        xhrFields: {
                    withCredentials: true
                },
        success: function(data) {
            for (var i = 10; i < 18; i++) {
                createPopularBook(data[i]);
            }
            
        },
        // error: function(xhr, status, errorThrowm) {
        //     alert("错误" + status + "错误抛出：" + errorThrowm);
        // }
    })
})