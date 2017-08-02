$(document).ready(function() {
	$(".triangle").hover(function() {
		$(this).css({"opacity":"0"});
	},function() {
		$(this).css({"opacity":"1"});
	});

})

function scrollBottom() {
	$("#container").scroll(function() {
		var $this = $(this),
		var viewH = $(this).height(),
		var contentH = $(this).get(0).scrollHeight,
		var scrollTop = $(this).scrollTop();

	})
}

function result() {
	var search = decodeURI(window.location.search);
	var qs = (search.length > 0 ? search.substring(1) : '');
	var key = decodeURIComponent(qs.split('&')[0].split('=')[1]);
	var request = {
		"datas" = key,
		"index"
	}

	$.ajax({
		type:"POST",
		url:"",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify(key),
		dataType: "json",
		async: false,
		success: function(data) {
			$.each(data.books, function() {
				var books = data.books
				var str = 
				'<li class="main-info">'
				+	'<div class="triangle"></div>'
				+	'<img src="'+books.picture+'" title="'+books.name+'">'
	            +   '<p class="book-name">'+ books.name  +'</p>'
	            +   '<p class="book-writer">作者:'+ books.author +'</p>'
	            +   '<div class="evaluate">'
	            +       '<div class="on"></div>'
	            +   '</div>'         
            	+'</li>'

			})
			
		}
	});



}

