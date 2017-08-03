/**************************
*****版本：book-mock1.0****
*****包含：用户名、分类页**
*****时间：2017.04.07******
*****更新者：apple*********
**************************/
//注意要请求数据要加载mockjs和jQuery.js
//ajax请求可用jQuery
//用户登录账号的路由为http://vtmer.cn/login
//书本信息的为http://vtmer.cn/class
//搜索页的为http：//vtmer.cn/search
//需要将搜索结果返回到url上
//如：搜索：白夜行
//链接为：http：//vtmer.cn/search=白夜行
/*********************/
//用户名登录表单验证：
//账号(name)都是英文 
//密码(password)都是数字，且长度为6-10

 Mock.mock('http://vtmer.cn/login', {
     'user|5-10':[{
          	name:'@first()',
          	password:'@string(lower+number,6,10)'
          }]         
     });

Mock.mock('http://vtmer.cn/class', {
			// 书的大分类
 			'bookclass|4':[{
 				// 书的详情
 				'bookInfo|20-40':[{
                         //评分星标
                         "star|1-5":"★",
 					// 书名
          			title:'@title(1,3)',
          			// 作者
          			author:'@name()',
          			// 出版社
          			publish:'@region()出版社',
          			// 出版时间
          			publishDate:'@date(yyyy-MM-dd)',
          			// 图书馆详情
          			library:[{
          				// 数目
          				total:'@natural(0, 100)本 ',
          				// 位置
          				position:'@natural(2, 7)楼@natural(1,100)架@natural(0, 100)'
          			}],
          			// 书本链接
          			bookUrl:[{
          				doubanUrl:'@url()',
          				zhihuUrl:'@url()'
          			}],
          			// 书本购买链接
          			buyUrl:[{
          				jDUrl:'@url()',
          				DangUrl:'@url()',
          				AmazonUrl:'@url()'
          			}],
          			// 作者介绍
          			ahthorIntro:'@paragraph(3)',
          			// 书本介绍
          			bookIntro:'@paragraph(5)',
          			// 书本封面链接
          			cover: '@image(266x368,@color(),png)',
          			// 评分
          			socre:'@natural(0, 5)'
 				}]
         	}]
     });

Mock.mock('http://QGlibrary.cn/search', {
          // 书的详情
          'bookInfo|20-40':[{
               // 书名
               title:'@title(1,5)',
               // 作者
               author:'@name()',
               // 出版社
               publish:'@region()出版社',
               // 出版时间
               publishDate:'@date(yyyy-MM-dd)',
               // 图书馆详情
               library:[{
                    // 数目
                    total:'@natural(0, 100)',
                    // 位置
                    position:'@natural(2, 7)楼@natural(1,100)架@natural(0, 100)'
               }],
               // 书本链接
               bookUrl:[{
                    doubanUrl:'@url()',
                    zhihuUrl:'@url()'
               }],
               // 书本购买链接
               buyUrl:[{
                    jDUrl:'@url()',
                    DangUrl:'@url()',
                    AmazonUrl:'@url()'
               }],
               // 作者介绍
               ahthorIntro:'@paragraph(3)',
               // 书本介绍
               bookIntro:'@paragraph(5)',
               // 书本封面链接
               cover: '@image(200x280,@color(),png)',
               // 评分
               socre:'@natural(0, 10)'
               //isbn
               isbn:'@string(lower+number,10)'
          }]

     });

Mock.mock('http://QGlibrary.com/')