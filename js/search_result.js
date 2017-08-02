var books = [
    {"name":"book1","author":"author1","rating":9,"pictrue":"https://img3.doubanio.com/lpic/s29448286.jpg", "isbn": 211321313212132},
    {"name":"book2","author":"author2","rating":6,"pictrue":"https://img3.doubanio.com/lpic/s29448286.jpg", "isbn": 211321313212132},
    {"name":"book3","author":"author3","rating":3,"pictrue":"https://img3.doubanio.com/lpic/s29448286.jpg", "isbn": 211321313212132},
    {"name":"book4","author":"author4","rating":7,"pictrue":"https://img3.doubanio.com/lpic/s29448286.jpg", "isbn": 211321313212132},
    {"name":"book5","author":"author5","rating":9,"pictrue":"https://img3.doubanio.com/lpic/s29448286.jpg", "isbn": 211321313212132},
    {"name":"book6","author":"author6","rating":9,"pictrue":"https://img3.doubanio.com/lpic/s29448286.jpg", "isbn": 211321313212132},
    {"name":"book7","author":"author7","rating":9,"pictrue":"https://img3.doubanio.com/lpic/s29448286.jpg", "isbn": 211321313212132},
    {"name":"book8","author":"author8","rating":9,"pictrue":"https://img3.doubanio.com/lpic/s29448286.jpg", "isbn": 211321313212132},          
    {"name":"book28","author":"author28","rating":9,"pictrue":"https://img3.doubanio.com/lpic/s29448286.jpg", "isbn": 211321313212132},
    {"name":"book1","author":"author1","rating":9,"pictrue":"https://img3.doubanio.com/lpic/s29448286.jpg", "isbn": 211321313212132},
    {"name":"book2","author":"author2","rating":6,"pictrue":"https://img3.doubanio.com/lpic/s29448286.jpg", "isbn": 211321313212132},
    {"name":"book3","author":"author3","rating":3,"pictrue":"https://img3.doubanio.com/lpic/s29448286.jpg", "isbn": 211321313212132},
    {"name":"book4","author":"author4","rating":7,"pictrue":"https://img3.doubanio.com/lpic/s29448286.jpg", "isbn": 211321313212132}
    
  ]

var bookInfo = {"name":"从柏拉图到维尼熊","author":"authorname","rating":9,"pictrue":"http://tupian.com","douban":"http://book.douban.com/subject/23124","content":"一本浅尝但不辄止的经典速览67部哲学经典导读，你的思想进阶指南读一点哲学，你能得到什么？千年之前的离经叛道，我们现在视之为理所当然哲学的伟大之处，就在于思想具有超越时空的不朽力量读哲学吧，让你的生命也能永恒★五分钟能读懂一本经典作品？是的，精选六十七本经典哲学作品，用言简意赅的文字介绍了主要内容及其影响，非常适合初涉哲学的读者按图索骥。每章节最后还提供快速阅读，便于读者迅速了解每本书的大概风格。★给哲学入门者的必读书单？是的，本书针对的就是没有系统接触过哲学著作，但有兴趣想了解哲学基本常识的读者。全书以哲学历史为轴，概览哲学发展进程，方便读者寻找感兴趣的哲学流派或哲学家，从而选择进一步了解和延伸阅读，使得读者对哲学的理解更加具体化。★以哲学经典为主综合其他思想经典本书在选择要介绍的经典时，并没有局限在哲学范围之内，而是从小说、随笔、儿童文学","aboutwriter":"詹姆斯· M. 罗素，英国人，毕业于剑桥大学哲学系，获得了批评理论方向的本科学位。他曾在英国的开放大学任教，目前从事媒体行业。曾经出版过《灵修经典导读》以及一些其他的哲学读物。目前和妻子、女儿以及他们的两只猫居住在伦敦的北部地区。","type":"文学","ISBN":"97827382193"}

$(document).ready(function() {
	addBooks(books, $('.in-container'));
	booktip();
	esc();



})
/**
 * [弹出简介]
 */
function booktip() {
	$('.main-info').click(function(e) {
		e.stopPropagation();
		if($('.simple-info').html() == "") {
		aboutBook(e);	
			// rq = {
			// 	isbn: $(this)[0].children[4].innerHTML
			// }

			// $.ajax({
			// 	type:"POST",
			// 	url:"",
			// 	contentType:"application/json; charset=utf-8",
			// 	data: JSON.stringify(rq),
			// 	dataType: "json",
			// 	async: false,
			// 	success: function(data) {
			// 		var data.book= bookInfo;
			// 		var booktip = 
				        //  '<h5>作者简介</h5>'
				        // + '<p>' + bookInfo.aboutwriter + '……</p>'
				        // + '<h5>内容简介</h5>'
				        // + '<p>' + bookInfo.content.substring(0, 100) + '……</p>'
				        // + '<a href="' +bookInfo.douban+ '">去买书</a>'

				        // $('.simple-info').html(booktip);
				        // $('.simple-info')
				        // 	.css({
				        // 		"top": e.pageY + "px",
				        // 		"left": e.pageX + "px",
				        // 		"display": "block"

				        // 	}).show("fast");
			// 	}
			// });
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
			// result();
			addBooks(books, $('.in-container'));
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
		url:"",
		contentType:"application/json; charset=utf-8",
		data: JSON.stringify(rq),
		dataType: "json",
		async: false,
		success: function(data) {
			if(data.status) {			
				var books = data.bookInfo;
			 	addBooks (books)
			} else {
				$('div').css({"margin":"0 auto","width":"1000px","color":"grey","text-align":"center","font-size":"13px"})
						.text("共找到" + $('.index').text() + "条结果")
			}			
		}
	});

}

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

function aboutBook (e) {
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