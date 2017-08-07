 function getHottestBook() {
     $.ajax({
             type: "POST",
             url: "http://192.168.199.79:10086/newBook",
             dataType: "json",
             data: null,
             success: function(data) {
                 if (data.length > 0) {
                     // alert(data.length);
                     for (var i = 18; i <= 20; i++) {
                         if (!data[i].rating) {
                             data[i].rating = '暂无';
                         }
                         var slidingBook = '<div class="one-screen">' +
                             '<img src="' + data[i].picture + '">' +
                             '<div class="hot-book-info">' +
                             '<h1>' + data[i].name + '</h1>' +
                             '<span>作者：</span><span>' + data[i].author + '</span>' +
                             '<br>' +
                             '<span>评分：</span>' +
                             '<div class="hot-book-score">' + data[i].rating + '</div>' +
                             '<span>内容简介：</span>' +
                             '<div class="hot-book-intro">' + data[i].content + '</div>' +
                             '<a href="' + data[i].douban + '" target="_blank">详情</a>' +
                             '</div>' +
                             '</div>';
                         switch (i) {
                             case 18:
                                 var hBookOne = slidingBook;
                                 break;
                             case 19:
                                 var hBookTwo = slidingBook;
                                 break;
                             case 20:
                                 var hBookThree = slidingBook;
                                 break;
                             default:
                                 break;
                         }
                     }
                         $('.slide-container').append(hBookThree);
                         $('.slide-container').append(hBookOne);
                         $('.slide-container').append(hBookTwo);
                         $('.slide-container').append(hBookThree);
                         $('.slide-container').append(hBookOne);
                     }
                 },
                 error: function(jqXHR) {
                     alert("发生错误：" + jqXHR.status);
                 },
             });

         // timer = setInterval(function() {
         //     if (parseInt($('.slide-container').css('marginLeft')) == -2700) {
         //         $('.slide-container').css('marginLeft', '225px');
         //     }
         //     $('.slide-container').animate({ marginLeft: '-=975px' }, 3000);
         // }, 6000);
     }

     function getID(domId) {
         return document.getElementById(domId);
     }

     var left = getID('leftArrow');
     var right = getID('rightArrow');
     var slider = getID('slider');
     var list = getID('slide-container');
     var animating = false;

     left.onclick = function() {
         if (!animating) {
             sliderIt(975);
         }
     }

     right.onclick = function() {
         if (!animating) {
             sliderIt(-975);
         }
     }

     function sliderIt(args) {
         var slideTo = parseInt(list.style.marginLeft) + args;
         var time = 1000; //the time for slide one pic
         var interval = 5;
         var speed = args / (time / interval); // the speed of slider

         var go = function() {
             animating = true;
             if ((speed > 0 && parseInt(list.style.marginLeft) < slideTo) || (speed < 0 && parseInt(list.style.marginLeft) > slideTo)) {
                 list.style.marginLeft = parseInt(list.style.marginLeft) + speed + "px";
                 setTimeout(go, interval);
             } else {
                 animating = false;
                 list.style.marginLeft = slideTo + "px";
                 if (slideTo == 225) {
                     list.style.marginLeft = -2700 + "px";
                 }
                 if (slideTo < -3150) {
                     list.style.marginLeft = -750 + "px";
                 }
             }
         }
         go();
     }

     function play() {
         timer = setInterval(function() {
             right.onclick();
         }, 5000);
     }

     function stop() {
         clearInterval(timer);
         // animating = true;
     }
     slider.onmouseover = stop;
     slider.onmouseout = play;
     play();