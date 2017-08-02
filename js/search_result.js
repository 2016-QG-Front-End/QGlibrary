$(document).ready(function() {
	tooltip();

})

function tooltip() {
	$('.main-info').mouseover(function(e) {
		var tooltip = '<div class="simple-info">'
            + '<h5>作者简介</h5>'
            + '<p>米原万里（1950-2006），日本作家，文化学者，俄语翻译。早年就读于布拉格的学校，返回日本后长年从事驻外俄语翻译工作，并发表多部文学作品。作品多与日俄文化交流相关，著有《旅行者的早餐》《奥尔加·莫里索普娜的反话》《米原万里的口译现场》等。</p>'
            + '<h5>内容简介</h5>'
            + '<p>《旅行者的早餐》是作家米原万里的美食美文随笔集。'
            + '人类舌尖上永远住着一对好邻居，深厚的文化和有趣的笑话。米原万里身为知名俄语翻译家，也是赫赫有名的“毒舌美人”，自如地游走在欧亚大陆，记录下爆笑吐槽的舌尖之旅。'
            +'</p>'
            + '<a href="www.ffafa.com">去买书</a>'
            + '<p>◄</p>'
        + '</div>'
        $('body').append(tooltip);
        $('.simple-info')
        	.css({
        		"top": e.pageY + "px",
        		"left": e.pageX + "px"
        	}).show("fast");
	}).mouseout(function(){
		$('.simple-info').remove();
	})
}

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

function result() {
	var search = decodeURI(window.location.search);
	var qs = (search.length > 0 ? search.substring(1) : '');
	var key = decodeURIComponent(qs.split('&')[0].split('=')[1]);
	var request = {
		"datas" = key,
		"index" = $('.index').text()
	};

	$.ajax({
		type:"POST",
		url:"",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify(key),
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

		        	$('<li>').addClass('main-info').html(str).appendTo($('.in-container'));
		        	$('.on').css("width", ((books.rating)/10)*5*16);
				} 
		        $('.index').text(parseInt($('.index').text()) + books.length);				
			} else {
				$('div').css({"margin":"0 auto","width":"1000px","color":"grey","text-align":"center","font-size":"13px"})
						.text("共找到" + $('.index').text() + "条结果")
			}			
		}
	});

}

