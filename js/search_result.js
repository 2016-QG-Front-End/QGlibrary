$(document).ready(function() {
	result();
	booktip();
	scrollBottom();
	esc();
})

/**
 * [弹出简介]
 */
function booktip() {
	$('ul li').click(function(e) {
		e.stopPropagation();
			rq = {
				isbn: $(this)[0].children[5].innerHTML
			}

			$.ajax({
				type:"POST",
				url:":192.168.1.110:10086/bookEx",
				contentType:"application/json; charset=utf-8",
				data: JSON.stringify(rq),
				dataType: "json",
				async: false,
				success: function(data) {
					aboutBook(e, data.book);
				}
			});

	})
}

/**
 * [点击其他地方收起简介]
 */
function esc() {
	$(window).click(function() {
		if($('.simple-info').html() != '') {
			$('.simple-info')
				.html("")
				.css("display","none");
		}
	})
}

/**
 * [监听滚动条]
 */
function scrollBottom() {
	$(window).scroll(function() {
		var viewH = $(window).height();
		var contentH = $(document).height();
		var scrollTop = $(window).scrollTop();

		if(scrollTop/(contentH - viewH) >= 0.9) {
			result();
			booktip();
		}

	})
}

/**
 * [请求搜索结果加载图片]
 */
function result() {
	var search = decodeURI(window.location.search);
	var qs = (search.length > 0 ? search.substring(1) : '');
	var key = decodeURIComponent(qs.split('&')[0].split('=')[1]);
	var rq = {
		datas : key,
		index : $('.index').text()
	};

	$.ajax({
		type:"POST",
		url:":192.168.1.110:10086/search",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify(rq),
		dataType: "json",
		async: false,
		success: function(data) {
			if(data.status) {			
			 	addBooks(data.books, $('.in-container'));
			} else {
				$('div').css({"margin":"0 auto","width":"1000px","color":"grey","text-align":"center","font-size":"13px"})
						.text("共找到" + $('.index').text() + "条结果")
			}			
		}
	});

}



/**
 * [加载图片]
 * @param {[type]} books  [书本数据]
 * @param {[type]} parent [父容器]
 */

function addBooks (books,parent) {
	for(var i = 0; i < books.length; i++) {
		var str = 				
			'<li class="main-info">'
		+	'<img src="'+books[i].pictrue+'">'
        +   '<p class="book-name">'+ books[i].name  +'</p>'
        +   '<p class="book-writer">作者:'+ books[i].author +'</p>'
        +   '<div class="evaluate">'
        +       '<div class="on" style="width:'+(parseInt(books[i].rating)/10)*5*16+'px"></div>'
        +   '</div>'
        +	'<p class="isbn">' + books[i].isbn + '</p>' 
        +   '</li>'         

    	$(str).appendTo(parent);
    	
    	$('.isbn').css("display","none");
	} 
    $('.index').text(parseInt($('.index').text()) + books.length);		
}


/**
 * [展开简介]
 * @param  {[type]} e [事件]
 */
function aboutBook (e,book) {
	var booktip = 
			'<h4>'+bookInfo.name+'</h4>'
        + '<h5>作者简介</h5>'
        + '<p>' + bookInfo.aboutwriter + '……</p>'
        + '<h5>内容简介</h5>'
        + '<p>' + bookInfo.content.substring(0, 100) + '……</p>'
        + '<a href="' + bookInfo.douban + '">去买书</a>'

    $('.simple-info').html(booktip);
    $('.simple-info')
    	.css({
    		"top": e.pageY + "px",
    		"left": e.pageX + "px",
    		"display": "block"

    	}).show("fast");
       
}
