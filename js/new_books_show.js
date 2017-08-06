
/**
 * [createNewBook 创建新书节点，展示新书速递]
 * @param {[obj]} data [新书的obj对象，含有新书的信息]
 */
function createNewBook(data) {
     var author = data.author
        if(author.length >= 6) {
            author = author.substring(0,5) + '...' 
        };

    var name = data.name
        if(name.length >= 7) {
            name = name.substring(0,6) + '...' 
        };
    
    var oLi = '<li class="new-book-show-cell"><a href="' + data.douban + '"  target="_blank"><img src="' + data.picture + '" title="' + data.name + '"></a><div class="book-name"><a href="'+ data.douban + '"  target="_blank" title="' + data.name + '" >' + name +'</a></div>' + '<div  class="writer" title="' + data.author + '">' + author + '</div>' + '</li>'
    $('.new-books').append(oLi);
}

$(function() {
    $('.book-type-label li span').bind('click', function () {
        var type = $(this).text();
        url =  'search_result.html' + '?' + 'search_text='+ encodeURIComponent(type);
        window.open(url);
    })
})

