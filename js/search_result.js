$(document).ready(function() {
	tooltip();
	esc();

})
/**
 * [弹出简介]
 */
function tooltip() {
	$('.main-info').click(function(e) {
		e.stopPropagation();
		if($('.simple-info').html() == "") {
			rq = {
				isbn: $(this)[0].children[4].innerHTML
			}

			$.ajax({
				type:"POST",
				url:"",
				contentType:"application/json; charset=utf-8",
				data: JSON.stringify(rq),
				dataType: "json",
				async: false,
				success: function(data) {
					var tooltip = 
			             '<h5>作者简介</h5>'
			            + '<p>' + data.book.aboutwrite.substring(0, 100) + '</p>'
			            + '<h5>内容简介</h5>'
			            + '<p>' + data.book.content.substring(0, 100) + '</p>'
			            + '<a href="www.ffafa.com">去买书</a>'

				        $('.simple-info').html(tooltip);
				        $('.simple-info')
				        	.css({
				        		"top": e.pageY + "px",
				        		"left": e.pageX + "px",
				        		"display": "block"

				        	}).show("fast");
				}
			});
		} else {
			$('.simple-info').html("")
			.css("display","none");
		}

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

		if(scrollTop/(contentH - viewH) >= 0.95) {
			result();
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
		"datas" : key,
		"index" : $('.index').text()
	};

	$.ajax({
		type:"POST",
		url:"",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify(rq),
		dataType: "json",
		async: false,
		success: function(data) {
			if(data.status) {			
				var books = data.books;

				for(var i = 0; i < books.length; i++) {
					var str = 				
						'<div class="triangle"></div>'
					+	'<img src="'+books[i].picture+'">'
		            +   '<p class="book-name">'+ books[i].name  +'</p>'
		            +   '<p class="book-writer">作者:'+ books[i].author +'</p>'
		            +   '<div class="evaluate">'
		            +       '<div class="on"></div>'
		            +   '</div>'
		            +	'<p class="isbn">' + books[i].isbn + '</p>'          

		        	$('<li>').addClass('main-info').html(str).appendTo($('.in-container'));
		        	$('.on').css("width", ((books.rating)/10)*5*16);
		        	$('.isbn').css("display","none");
				} 
		        $('.index').text(parseInt($('.index').text()) + books.length);				
			} else {
				$('div').css({"margin":"0 auto","width":"1000px","color":"grey","text-align":"center","font-size":"13px"})
						.text("共找到" + $('.index').text() + "条结果")
			}			
		}
	});

}

