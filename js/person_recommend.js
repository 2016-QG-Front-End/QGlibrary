var time;
/**
 * 创建图表
 */
//图表初始化
var myChart = echarts.init(document.getElementById('personPieChart'));
var option = {
    title: {
        text: '个人搜索类型展示',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data: ['科技', '生活', '文学', '文化', '流行', '经营']
    },
    series: [{

        name: '书本类型',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        data: [
            { value: 0, name: '科技' },
            { value: 0, name: '生活' },
            { value: 0, name: '文学' },
            { value: 0, name: '文化' },
            { value: 0, name: '流行' },
            { value: 0, name: '经营' },
        ],

        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },



    }]
};
myChart.setOption(option);



//获取数据
$(function() {
    $.ajax({
        type: "post",
        url: 'http://192.168.199.79:10086/chart',
        data: null,
        dataType: "json",
        async: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            if (!isEmpty(data.ratio)) {
                $('.person-recommend').css('display', 'block');

                createPie(data.ratio);
            } else {
                clearInterval(time);
            }

        },
        // error: function(xhr, status, errorThrowm) {
        //     alert("错误" + status + "错误抛出：" + errorThrowm);
        // }
    });


    time = setInterval(function() {


        $.ajax({
            type: "post",
            url: 'http://192.168.199.79:10086/chart',
            data: null,
            dataType: "json",
            async: false,
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                if (!isEmpty(data.ratio)) {
                    $('.person-recommend').css('display', 'block');

                    createPie(data.ratio);
                } else {
                    clearInterval(time);
                }

            },
            // error: function(xhr, status, errorThrowm) {
            //     alert("错误" + status + "错误抛出：" + errorThrowm);
            // }
        });

    }, 3000);


})

/**
 * [createPie 獲取图表数据并创建个人数据]
 * @param {[Array]} data [个人搜索新]
 */
function createPie(data) {
    var leg = [],
        serDa = [];

    for (var i in data) {
        var obj = new Object();

        leg.push(i);
        obj.name = i;
        obj.value = data[i];

        serDa.push(obj);
    }

    myChart.setOption({
        legend: {
            data: leg
        },
        series: [{
            data: serDa
        }]
    });
}
/**
 * end 创建图表
 */

/**
 * 个人信息推荐书籍
 */
$(function() {
    $.ajax({
        type: "post",
        url: 'http://192.168.199.79:10086/recom',
        data: null,
        dataType: "json",
        async: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            if (!isEmpty(data)) {
                $('.person-recommend').css('display', 'block');
                createRecBook(data);
            } else {

            }

        },
        // error: function(xhr, status, errorThrowm) {
        //     alert("错误" + status + "错误抛出：" + errorThrowm);
        // }
    });

})
/**
 * [createRecBook 创建个人推荐书单]
 * @param  {[Array]} arr [一个包含多本书信息的数组]
 * 
 */
function createRecBook(arr) {
    for (var i in arr) {
        var author = arr[i].author
        if (author.length >= 7) {
            author = author.substring(0, 6) + '...'
        };

        var name = arr[i].name;
        if (name.length >= 7) {
            name = name.substring(0, 6) + '...'
        };

        var rate = arr[i].rating;
        if (!rate) {
            rate = '暂无';
        }

        var content = arr[i].content.substring(0, 8) + '...'

        var oLi = '<li><a href="' + arr[i].douban + '" target="_blank"><img onclick="trackWhat('+arr[i].ISBN+')" src="' + arr[i].picture + '" title="' + arr[i].name + '"></a><div><h4 title="' + arr[i].name + '">' + name + '</h4><p class="evaluate">评分：<i>' + rate + '</i></p><p class="book-writer" title="' + arr[i].author + '" >' + author + '</p><p class="category" title="' + arr[i].content + '">' + content + '</p></div></li>';

        $('.person-recommend-book').append(oLi);
    };

    for (var i in arr) {
        var personRecommendBook = document.getElementsByClassName('person-recommend-book')[0];
        var Li = personRecommendBook.getElementsByTagName('li');
        var h4 = Li[i].getElementsByTagName('h4')[0];
        h4.onclick = function() {
            rq = {
                ISBN: arr[i].ISBN
            }
            $.ajax({
                type: "POST",
                url: "http://192.168.199.79:10086/bookEx",
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                data: JSON.stringify(rq),
                success: function(data) {
                },
                error: function(jqXHR) {
                    alert("发生错误：" + jqXHR.status);
                },
            });
            window.open(arr[i].douban);
        }

    };
}
/**
 * end 个人信息推荐书籍
 */
function isEmpty(obj) {
    // 本身为空直接返回true
    if (obj == null) return true;

    // 然后可以根据长度判断，在低版本的ie浏览器中无法这样判断。
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    //最后通过属性长度判断。
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

/**
 * 跟踪用户浏览记录
 */
function trackWhat(isbn) {
    rq = {
        ISBN: arguments[0]
    }
    $.ajax({
        type: "POST",
        url: "http://192.168.199.79:10086/bookEx",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify(rq),
        success: function(data) {},
        error: function(jqXHR) {
            alert("发生错误：" + jqXHR.status);
        },
    });
}