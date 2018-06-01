/**
 * Created by ronghedai on 16/9/28.
 */
;!function (a) {
    "use strict";
    var b = document, c = "querySelectorAll", d = "getElementsByClassName", e = function (a) {
        return b[c](a)
    }, f = {type: 0, shade: !0, shadeClose: !0, fixed: !0, anim: !0}, g = {
        extend: function (a) {
            var b = JSON.parse(JSON.stringify(f));
            for (var c in a)b[c] = a[c];
            return b
        }, timer: {}, end: {}
    };
    g.touch = function (a, b) {
        var c;
        return /Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent) ? (a.addEventListener("touchmove", function () {
            c = !0
        }, !1), void a.addEventListener("touchend", function (a) {
            a.preventDefault(), c || b.call(this, a), c = !1
        }, !1)) : a.addEventListener("click", function (a) {
            b.call(this, a)
        }, !1)
    };
    var h = 0, i = ["layermbox"], j = function (a) {
        var b = this;
        b.config = g.extend(a), b.view()
    };
    j.prototype.view = function () {
        var a = this, c = a.config, f = b.createElement("div");
        a.id = f.id = i[0] + h, f.setAttribute("class", i[0] + " " + i[0] + (c.type || 0)), f.setAttribute("index", h);
        var g = function () {
            var a = "object" == typeof c.title;
            return c.title ? '<h3 style="' + (a ? c.title[1] : "") + '">' + (a ? c.title[0] : c.title) + '</h3><button class="layermend"></button>' : ""
        }(), j = function () {
            var a, b = (c.btn || []).length;
            return 0 !== b && c.btn ? (a = '<span type="1">' + c.btn[0] + "</span>", 2 === b && (a = '<span type="0">' + c.btn[1] + "</span>" + a), '<div class="layermbtn">' + a + "</div>") : ""
        }();
        if (c.fixed || (c.top = c.hasOwnProperty("top") ? c.top : 100, c.style = c.style || "", c.style += " top:" + (b.body.scrollTop + c.top) + "px"), 2 === c.type && (c.content = '<i></i><i class="laymloadtwo"></i><i></i>'), f.innerHTML = (c.shade ? "<div " + ("string" == typeof c.shade ? 'style="' + c.shade + '"' : "") + ' class="laymshade"></div>' : "") + '<div class="layermmain" ' + (c.fixed ? "" : 'style="position:static;"') + '><div class="section"><div class="layermchild ' + (c.className ? c.className : "") + " " + (c.type || c.shade ? "" : "layermborder ") + (c.anim ? "layermanim" : "") + '" ' + (c.style ? 'style="' + c.style + '"' : "") + ">" + g + '<div class="layermcont">' + c.content + "</div>" + j + "</div></div></div>", !c.type || 2 === c.type) {
            var k = b[d](i[0] + c.type), l = k.length;
            l >= 1 && layer.close(k[0].getAttribute("index"))
        }
        document.body.appendChild(f);
        var m = a.elem = e("#" + a.id)[0];
        c.success && c.success(m), a.index = h++, a.action(c, m)
    }, j.prototype.action = function (a, b) {
        var c = this;
        if (a.time && (g.timer[c.index] = setTimeout(function () {
                layer.close(c.index)
            }, 1e3 * a.time)), a.title) {
            var e = b[d]("layermend")[0], f = function () {
                a.cancel && a.cancel(), layer.close(c.index)
            };
            g.touch(e, f)
        }
        var h = function () {
            var b = this.getAttribute("type");
            0 == b ? (a.no && a.no(), layer.close(c.index)) : a.yes ? a.yes(c.index) : layer.close(c.index)
        };
        if (a.btn)for (var i = b[d]("layermbtn")[0].children, j = i.length, k = 0; j > k; k++)g.touch(i[k], h);
        if (a.shade && a.shadeClose) {
            var l = b[d]("laymshade")[0];
            g.touch(l, function () {
                //layer.close(c.index, a.end)
            })
        }
        a.end && (g.end[c.index] = a.end)
    }, a.layer = {
        v: "1.7", index: h, open: function (a) {
            var b = new j(a || {});
            return b.index
        }, close: function (a) {
            var c = e("#" + i[0] + a)[0];
            c && (c.innerHTML = "", b.body.removeChild(c), clearTimeout(g.timer[a]), delete g.timer[a], "function" == typeof g.end[a] && g.end[a](), delete g.end[a])
        }, closeAll: function () {
            for (var a = b[d](i[0]), c = 0, e = a.length; e > c; c++)layer.close(0 | a[0].getAttribute("index"))
        }
    }, "function" == typeof define ? define(function () {
        return layer
    }) : function () {
        var a = document.scripts, c = a[a.length - 1], d = c.src, e = d.substring(0, d.lastIndexOf("/") + 1);
        c.getAttribute("merge") || document.head.appendChild(function () {
            var a = b.createElement("link");
            return a.href = e + "need/layer.css", a.type = "text/css", a.rel = "styleSheet", a.id = "layermcss", a
        }())
    }()
}(window);
shart = null;
$(function () {
    var hp = 0;
    time = 0;
    var times = HPtimes = undefined;
    var count = 0;
    $('#logo').live('tap',function () {
        if(localStorage.getItem('token') == null){
            alert('登录超时。');
            window.location.href = '/weixin/home.html#login';
            return;
        }
        if(hp >= 100){
            count ++;
            $('#hp').animate({bottom: '0'+'%'},10)
            $('.tests').text(100 +'%');
            clearInterval(HPtimes);
            clearInterval(times);
            $('.yumaos').stop(true, true);
            if(count == 1){
                if(time > 15000){
                    dialogs('您的成绩为 : '+(time/1000).toFixed(2)+'秒', '挑战失败','成绩必须低于15秒才能抽奖');
                    $('#all-ctinl').hide();
                    $(".aa-shows").show();
                    $('#img2').show();
                    //if(shart=='99'){
                    //    $('#fenxiang').hide();
                    //}else{
                    //    $('#fenxiang').show();
                    //}
                    if (localStorage.getItem(localStorage.getItem('token')) == null) {
                        $('#fenxiang').show();
                    } else {
                        $('#fenxiang').hide();
                    }

                }else {
                    choujiang(shart);
                }
            }
            return false;
        }else {
            hp+=2;
            $('#hp').animate({bottom: '+=2'+'%'},10)
            $('.tests').text(hp +'%');
            $('.yumaos').animate({left:'2.5rem', bottom:'-1rem'}, 100).animate({left:'2rem', bottom:'-2rem'},100);
        }
        if(times === undefined){
            times = setInterval(function () {
                time += 150;
                //if(time >= 30000){
                //    clearInterval(times);
                //    dialogs('您的成绩为 : '+(time/1000).toFixed(2)+'秒', '挑战失败','成绩必须低于15秒才能抽奖');
                //    $(".aa-shows").show();
                //    $('#all-ctinl').hide();
                //    $('#fenxiang').show();
                //}
                $('#time').text(Number(time/1000).toFixed(2));
            },150)
            HPtimes = setInterval(function () {
                if(hp <= 0){
                    return false;
                }
                if(hp >= 60){
                    $('.tu1-img').html('<img src="/dyweb/dythemes/rhd/actives/redgame/phone/image/3_03.png">')
                }else if(hp >= 30){
                    $('.tu1-img').html('<img src="/dyweb/dythemes/rhd/actives/redgame/phone/image/2_03.png">')
                }else {
                    $('.tu1-img').html('<img src="/dyweb/dythemes/rhd/actives/redgame/phone/image/1_03.png">')
                }
                $('#hp').animate({bottom: '-=1'+'%'},10)
                hp-=1;
                $('.tests').text(hp +'%');
            },500)
        }
    })
});


function choujiang(share){
    share = shart;
    $.ajax({
        url:"/weixin/?user&q=get_share_ajax&alias=prizedraw&methodname=get_reward1",
        data:{
            token:localStorage.getItem('token')
        },
        dataType:'json',
        type: 'get',
        success:function(ret){
            switch(ret.code){
                case 0:
                    dialogs('您的成绩为 : ' + (time / 1000).toFixed(2) + '秒', '挑战成功', '恭喜你获得688现金红包');
                    $('#img1').show();
                    $('.img-zhongj').css({'background': "url(/dyweb/dythemes/rhd/actives/redgame/phone/image/hongbaos_0ss3.png) 0 0 no-repeat",'backgroundSize': '100%'
                    });
                    break;
                case 1:
                    dialogs('您的成绩为 : '+(time/1000).toFixed(2)+'秒', '挑战成功','恭喜你获得磨砂玻璃杯');
                    $('#img1').show();
                    $('.img-zhongj').css({'background':"url(/dyweb/dythemes/rhd/actives/redgame/phone/image/beizitu_03.png) 0 0 no-repeat", 'backgroundSize':'100%'});
                    break;
                case 2:
                    dialogs('您的成绩为 : '+(time/1000).toFixed(2)+'秒', '挑战成功','恭喜你获得1元话费');
                    $('#img1').show();
                    $('.img-zhongj').css({'background':"url(/dyweb/dythemes/rhd/actives/redgame/phone/image/huafei_03.png) 0 0 no-repeat", 'backgroundSize':'100%'});
                    break;
                case 3:
                    dialogs('您的成绩为 : '+(time/1000).toFixed(2)+'秒', '挑战成功','恭喜你获得2元话费');
                    $('#img1').show();
                    $('.img-zhongj').css({'background':"url(/dyweb/dythemes/rhd/actives/redgame/phone/image/huafei_03.png) 0 0 no-repeat", 'backgroundSize':'100%'});
                break;
                default:
                    alert(ret.msg);
                    window.location.reload();
                    break;
            }
            if (localStorage.getItem(localStorage.getItem('token')) == null) {
                $('#fenxiang').show();
            } else {
                $('#wodejp').show();
            }
            /*if(share == '99'){
                $('#wodejp').show();
            }else {
                $('#fenxiang').show();
            }*/
        }

    })
}


function dialogs(time, test, pro){
    layer.closeAll();
    layer.open({
        content: '<div class="tin-boxs">' +
                '<img class="touxImg" id="img1" src="/dyweb/dythemes/rhd/actives/redgame/phone/image/success.png">'+
                '<img class="touxImg" id="img2" src="/dyweb/dythemes/rhd/actives/redgame/phone/image/fail.png">'+
                '<div class="in-ton"><div class="in-chenggong">'+test+'</div><div class="in-chengjis" id="minsTest">'+time+'</div></div>' +
                '<div class="aa-shows" style="font-size: 0.9rem; color: #FFF; text-align: center; display: none; line-height: 1.5rem;">'+pro+'</div>'+
                '<div class="huafeism" id="all-ctinl"><div class="img-zhongj"></div><p class="goxn">'+pro+'</p></div>' +
                '<div class="in-fenx" id="fenxiang" style="display: none; cursor: pointer">分享好友在玩一次</div>' +
                '<div class="in-fenx" id="wodejp" style="display: none; cursor: pointer">我的奖品</div>'+
                '<div class="in-aam">' +
                '<a id="guanzhu" style="cursor: pointer" href="javascript:void(0)">关注我们</a>' +
                '<a style="margin-left: 1rem; cursor: pointer" href="javascript:void(0)" id="shouye">返回首页</a>' +
                '</div>' +
                '</div>'

    })
}


$('#fenxiang').live('tap', function () {  //分享一次
    layer.closeAll();
    layer.open({
        content: '<div class="fen-imgs"></div><div style="height: 9rem"></div>'
    })
    $('.layermcont').live('tap', function () {
        layer.closeAll();
        window.location.reload();
    })
})
$('#guanzhu').live('tap', function () {  //关注我们
    layer.closeAll();
    layer.open({
        content: '<div class="imgs-close" style="cursor: pointer;"></div>'+
        '<div class="big-boxs">' +
        '</div>'
    })
});

$('#shouye').live('tap',function(){
    window.location.href='/weixin/home.html#home';
});

$('.imgs-close').live('tap', function () {
    layer.closeAll();
    window.location.reload();
});

$('#wodejp').live('tap', function(){
    window.location.href = '/dyapp/active/prizedraw/index.html#01';
})

function getweichat(){
    $.ajax({
        url:'/weixin/?user&q=get_share_ajax&alias=prizedraw&methodname=shared',
        type:'get',
        dataType: 'json',
        success: function(request){}
    })
}
$.getJSON('/?getweixintoken', {}, function (ret) {
    wx.config({
        debug: false,
        appId: ret.appId,
        timestamp: ret.timestamp,
        nonceStr: ret.nonceStr,
        signature: ret.signature,
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
        ]
    });
});

var rhdLink = 'http://www.ronghedai.com/dyapp/active/prizedraw/index.html';
var rhdTitle = '玩就玩吧，非要任性送东西，这么好的福利我怎么能独享';
wx.ready(function () {
    wx.onMenuShareTimeline({
        title: rhdTitle, // 分享标题
        link: rhdLink, // 分享链接
        //desc:rhdDesc,
        imgUrl: 'http://www.ronghedai.com/dyweb/dythemes/rhd/actives/redgame/phone/image/logogog.jpg', // 分享图标
        success: function () {
            getweichat();
            writeTelTem();
            shart = '99';
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareAppMessage({
        title: rhdTitle, // 分享标题
        link: rhdLink, // 分享链接
        //desc:rhdDesc,
        imgUrl: 'http://www.ronghedai.com/dyweb/dythemes/rhd/actives/redgame/phone/image/logogog.jpg', // 分享图标
        success: function () {
            getweichat();
            writeTelTem();
            shart = '99';
        },
        cancel: function () {
        }
    });

    var writeTelTem = function() {
        localStorage.setItem(localStorage.getItem('token'), '1');
    };
});
