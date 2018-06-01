;!function(a){"use strict";var b=document,c="querySelectorAll",d="getElementsByClassName",e=function(a){return b[c](a)},f={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:!0},g={extend:function(a){var b=JSON.parse(JSON.stringify(f));for(var c in a)b[c]=a[c];return b},timer:{},end:{}};g.touch=function(a,b){var c;return/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent)?(a.addEventListener("touchmove",function(){c=!0},!1),void a.addEventListener("touchend",function(a){a.preventDefault(),c||b.call(this,a),c=!1},!1)):a.addEventListener("click",function(a){b.call(this,a)},!1)};var h=0,i=["layermbox"],j=function(a){var b=this;b.config=g.extend(a),b.view()};j.prototype.view=function(){var a=this,c=a.config,f=b.createElement("div");a.id=f.id=i[0]+h,f.setAttribute("class",i[0]+" "+i[0]+(c.type||0)),f.setAttribute("index",h);var g=function(){var a="object"==typeof c.title;return c.title?'<h3 style="'+(a?c.title[1]:"")+'">'+(a?c.title[0]:c.title)+'</h3><button class="layermend"></button>':""}(),j=function(){var a,b=(c.btn||[]).length;return 0!==b&&c.btn?(a='<span type="1">'+c.btn[0]+"</span>",2===b&&(a='<span type="0">'+c.btn[1]+"</span>"+a),'<div class="layermbtn">'+a+"</div>"):""}();if(c.fixed||(c.top=c.hasOwnProperty("top")?c.top:100,c.style=c.style||"",c.style+=" top:"+(b.body.scrollTop+c.top)+"px"),2===c.type&&(c.content='<i></i><i class="laymloadtwo"></i><i></i>'),f.innerHTML=(c.shade?"<div "+("string"==typeof c.shade?'style="'+c.shade+'"':"")+' class="laymshade"></div>':"")+'<div class="layermmain" '+(c.fixed?"":'style="position:static;"')+'><div class="section"><div class="layermchild '+(c.className?c.className:"")+" "+(c.type||c.shade?"":"layermborder ")+(c.anim?"layermanim":"")+'" '+(c.style?'style="'+c.style+'"':"")+">"+g+'<div class="layermcont">'+c.content+"</div>"+j+"</div></div></div>",!c.type||2===c.type){var k=b[d](i[0]+c.type),l=k.length;l>=1&&layer.close(k[0].getAttribute("index"))}document.body.appendChild(f);var m=a.elem=e("#"+a.id)[0];c.success&&c.success(m),a.index=h++,a.action(c,m)},j.prototype.action=function(a,b){var c=this;if(a.time&&(g.timer[c.index]=setTimeout(function(){layer.close(c.index)},1e3*a.time)),a.title){var e=b[d]("layermend")[0],f=function(){a.cancel&&a.cancel(),layer.close(c.index)};g.touch(e,f)}var h=function(){var b=this.getAttribute("type");0==b?(a.no&&a.no(),layer.close(c.index)):a.yes?a.yes(c.index):layer.close(c.index)};if(a.btn)for(var i=b[d]("layermbtn")[0].children,j=i.length,k=0;j>k;k++)g.touch(i[k],h);if(a.shade&&a.shadeClose){var l=b[d]("laymshade")[0];g.touch(l,function(){layer.close(c.index,a.end)})}a.end&&(g.end[c.index]=a.end)},a.layer={v:"1.7",index:h,open:function(a){var b=new j(a||{});return b.index},close:function(a){var c=e("#"+i[0]+a)[0];c&&(c.innerHTML="",b.body.removeChild(c),clearTimeout(g.timer[a]),delete g.timer[a],"function"==typeof g.end[a]&&g.end[a](),delete g.end[a])},closeAll:function(){for(var a=b[d](i[0]),c=0,e=a.length;e>c;c++)layer.close(0|a[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var a=document.scripts,c=a[a.length-1],d=c.src,e=d.substring(0,d.lastIndexOf("/")+1);c.getAttribute("merge")||document.head.appendChild(function(){var a=b.createElement("link");return a.href=e+"",a.type="text/css",a.rel="styleSheet",a.id="layermcss",a}())}()}(window);
    apiready = function(){
        isApp = true;
        getToken();
    }

    var texts;
    var isApp = false;
    function getToken(){
        if (isApp) {
            api.getPrefs({
                key: 'token'
            }, function(ret, err){
                token = ret.value;
            })
        } else {
            token = localStorage.getItem('token');
        }
    }


    //活动规则
    $('.hdgz').on('tap',function(){
        $("body").append('<div id="t1"></div>'+
            '<div id="t2">'+
                '<div style="width:12rem;margin:1rem auto;">'+
            '<img style="width:12rem;" src="/dyweb/dythemes/rhd/actives/festival9/phone/images/zq4.png">'+
            '<div style="mon_on">'+
            '<p>1、活动时间：2016年9月8日——9月26日</p>'+
            '<p>2、活动期间在活动页面注册的新用户，即可获得一次抽奖机会；</p>'+
            '<p>3、分享好友可额外获得1次抽奖机会（仅有1次）；</p>'+
            '<p>4、所得1元/2元话费奖励在1个工作日内发放到账；所得5元话费奖励在用户投资后24小时内到账；</p>'+
            '<p>5、现金红包奖励在用户投资后3个工作日内发放到账；</p>'+
            '<p>6、若抽中实物奖品，用户可直接联系客服，此信息仅用于奖品邮寄，不作其他用途；实物奖品将于' +
            '活动结束后T+10个工作日内寄出（预售或抢购商品除外），中奖用户需保持手机畅通，本活动自中奖' +
            '日起7日内，若仍无法取得联系，视为自动放弃；<p>'+
            '<p>7、此活动最终解释权归融和贷所有。</p>'+
            '</div><div style="height:1rem;"></div>'+
            '<div class="zhidao">我知道了'+
            '</div></div>'+
            '</div>');
    });

//关闭活动规则
$(document).on('tap',".zhidao",function(){
    $('#t1').remove();
    $('#t2').remove();
});


//我的奖品跳转
$('.rewards').on('tap',function(){
    window.location.href='/weixin/home.html#user/hongbao';
});


//抽奖
$('.zhizhen').on('tap',function(){

    layer.open({
        content:'<div style="width:10rem;"><input type="text" class="form-control li-row-90" id="tel" placeholder="输入手机号" maxlength="11">' +
        '<div id="warn" style="margin-top:0.5rem;"></div>'+
        '<div class="shouqi">试试手气</div>'+
        '</div>',
    })
});



//转盘转动
function routes(num, animateTo , text, tx){
    $('.routes').rotate({
        angle:0,
        animateTo:animateTo,
        duration:5000,
        callback:function(){

            if(text.indexOf("元") > 0 || text.indexOf("现金") > 0 ){
                getCodes(text, tx);
            }else{
                wupin(text);
            }

        }
    })
}


//点击试试手气
$('.shouqi').live('tap',function(){
    tel = $("#tel").val();
    if(tel == "" || tel == undefined){
        $("#warn").html("<span style='color:red'>请输入手机号！</span>");
        return false;
    }else{
        reg1 = /^1[34578]\d{9}$/;//非空正则校验
        if(reg1.test(tel)){
            $("#warn").html("");
            $.ajax({
                url:'/weixin/?user&q=reg&type=sendRegCode',
                dataType: 'json',
                data: {
                    phone:tel
                },
                type: 'get',
                success: function (res){
                    if(res.code==0){
                        layer.closeAll();
                        layer.open({
                            content:'<div style="width:10rem; position: relative;"><input type="text" class="form-control li-row-90" id="yzm" placeholder="输入验证码" maxlength="6"><span id="Invatime" style="position: absolute; top: 0.5rem; left: 8rem; color:#DDD;"></span>' +
                            '<div class="lingqu">立即领取</div>'+
                            '</div>',
                        });
                        checkSendTime(60);
                    }else if(res.code==103){
                        window.location.href='/active/festival9/index.html';
                    }else{
                        alert(res.msg);
                    }
                }
            });
            return true;
        }else{
            $("#warn").html("<span style='color:red'>手机号码格式错误！</span>");
            return false;
        }
    }
});

//验证码倒计时
function checkSendTime(time){
    InvTims = setInterval(function(){
        if(time <= 0){
            clearInterval(this);
            $('#Invatime').text('');
        }else {
            time --;
            $('#Invatime').text(time + 's');
        }
    }, 1000)
}


//点立即领取进行抽奖
$('.lingqu').live('tap',function(){
    var yzm = $('#yzm').val();
    $.ajax({
        url:'/weixin/?user&q=reg&type=weixinReg',
        type:'get',
        data: {phone:tel,phonecode:yzm},
        dataType:'json',
        success: function(ret){
            if(ret.code == 0){
                layer.closeAll();
                getReward();
            }else {
                alert(res.msg);
            }
        }
    })
});


//获奖弹窗
function getCodes(text){
    layer.closeAll();

    layer.open({
        content:'<div class="ttcc">'+
        '<img class="close" src="/dyweb/dythemes/rhd/actives/festival9/phone/images/5.png">'+
        '<img class="hb" src="/dyweb/dythemes/rhd/actives/festival9/phone/images/hb.png">'+
        '<p class="shuzi"><span style="font-size:1rem;">'+text+'</span></p>'+
        '<p class="gx">恭喜你获得'+text+'</p>'+
        '<p class="gxs" style="display: none">返至"我的奖品"查询</p>'+
        '<div class="agin">再抽一次</div>'+
        '<div class="reward1" style="display: none">我的奖品</div>'+
        '</div>',
        shadeClose:false
    });
    if(share == 2){
        $('.gxs').show();
        $('.agin').hide();
        $('.reward1').show();
    }
}

//再抽一次查看奖品
$('.reward1').live('tap',function(){
    window.location.href='/weixin/home.html#user/hongbao';
});
//实物弹窗
function wupin(text){
    layer.closeAll();
    layer.open({
        content:'<div class="ttcc" style="height:11rem;">' +
        '<img class="close" src="/dyweb/dythemes/rhd/actives/festival9/phone/images/5.png">'+
        '<div class="shiwu">恭喜您获得了<span>'+text+'</span></div>'+
        '<div class="wenzi">' +
        '<p>请于7个工作日内联系客服</p>'+
        '<p>QQ：3483686885（融妹）</p>'+
        '<p>或微信号：ronghedai888(融和君说)</p>'+
        '<p>提交真实姓名、手机号码、邮寄地址等个人信息,</p>'+
        '<p>逾期视自动弃权；此信息仅用于奖品邮寄，不作其</p>'+
        '<p>他用途；此活动最终解释权归融和贷所有。</p>'+
        '</div></div>'+

        '<div class="agin" style="top:10.5rem;">再抽一次</div>'+
        '</div>',
        shadeClose:false
    });
}

//关闭弹窗
$('.close').live('tap',function(){
    $('.layermbox').addClass('dis');
});

function getReward(){ //获取奖等级
    $.ajax({
        url:'/weixin/?user&q=get_share_ajax&alias=festival9&methodname=get_reward1',
        type:'get',
        dataType:'json',
        success: function(ret){

            switch (ret.code){
                case 0:
                    var num = 2880;
                    routes(ret.code, num , ret.msg);
                    break;
                case 1:
                    var num = 2916;
                    routes(ret.code, num , ret.msg);
                    break;
                case 2:
                    var num=2952;
                    routes(ret.code, num , ret.msg);
                    break;
                case 3:
                    var num=2988;
                    routes(ret.code, num , ret.msg);
                    break;
                case 4:
                    var num = 3024;
                    routes(ret.code, num , ret.msg);
                    break;
                case 5:
                    var num = 3060;
                    routes(ret.code, num , ret.msg);
                    break;
                case 6:
                    var num = 3096;
                    routes(ret.code, num , ret.msg);
                    break;
                case 7:
                    var num = 3132;
                    routes(ret.code, num , ret.msg);
                    break;
                case 8:
                    var num = 3168;
                    routes(ret.code, num , ret.msg);
                    break;
                case 9:
                    var num = 3204;
                    routes(ret.code, num , ret.msg);
                    break;
                case 10:
                    alert('抱歉，您不符合抽奖条件');
                    break;
                case 11:
                    alert('参数错误');
                    break;
                case 12:
                    alert('抱歉，该活动已结束');

                    break;
                case 13:
                    alert('您的抽奖机会已用完');
                    break;
            }

        }
    })
}


//实时中奖记录
$.ajax({
    url:'/weixin/?user&q=get_share_ajax&alias=festival9&methodname=get_newly',
    dataType:'json',
    type:'get',
    success:function(ret){
        if(ret.code==1){
            var reardList = '';
            for(var i = 0, len = ret.data.length; i < len; i ++){
                reardList += '<p><span>'+ret.data[i].phone+'</span><span>'+ret.data[i].reward+'</span></p>';
            }
            $('#reardList').html(reardList);
            count = 400+parseInt(ret.total);
            rhdTitle = '【全民抽大奖】目前已有'+count+'个好友抢到话费、红包、iPhone6S……【融和贷】';
            //alert(count);
        }else{
            if (ret.msg != '登录超时') {
                alert(ret.msg);
            }
        }
    }
});




/*******分享********/
var share=1;
function getweichat(){
    var token = localStorage.getItem('token');
    $.ajax({
        url:'/weixin/?user&q=get_share_ajax&alias=festival9&methodname=shared',
        type:'get',
        dataType: 'json',
        success: function(request){

        }
    })
}

$.getJSON('/?getweixintoken', {}, function (ret) {
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: ret.appId, // 必填，公众号的唯一标识
        timestamp: ret.timestamp, // 必填，生成签名的时间戳
        nonceStr: ret.nonceStr, // 必填，生成签名的随机串
        signature: ret.signature,// 必填，签名，见附录1
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
});

setTimeout(function(){
    var rhdLink = 'http://www.ronghedai.com/dyapp/active/festival9/index.html';
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: rhdTitle, // 分享标题
            link: rhdLink, // 分享链接
            //desc:rhdDesc,
            imgUrl: 'http://www.ronghedai.com/dyweb/dythemes/rhd/actives/festival9/phone/images/fenxiang.png', // 分享图标
            success: function () {
                share=2;
                getweichat();
                texts = 2;
                $('.zhizhen').hide();
                $('.zhizhen1').show();
                $('.layermbox').addClass('dis');
                $('#ww2').remove();
                $('.ww1').remove();

            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: rhdTitle, // 分享标题
            link: rhdLink, // 分享链接
            //desc:rhdDesc,
            imgUrl: 'http://www.ronghedai.com/dyweb/dythemes/rhd/actives/festival9/phone/images/fenxiang.png', // 分享图标
            success: function () {
                getweichat();
                $('.zhizhen').hide();
                $('.zhizhen1').show();
                $('.layermbox').addClass('dis');
                $('#ww2').remove();
                $('.ww1').remove();
                share=2;
            },
            cancel: function () {

                // 用户取消分享后执行的回调函数
            }
        });
    });
}, 3500);



$('.zhizhen1').live('tap', function(){

    getReward();
});

//再抽一次
$('.agin').live('tap',function(){
    if(share==1){
        $("body").append('<div class="ww1" style="width:100%;height:100%;position: fixed;top: 0;left: 0;background:#000;opacity:0.6; z-index: 19891024;"></div>'+
            '<div id="ww2" style="color:white;width:100%;height:100%;position: fixed;top: 0;left: 0;z-index: 19891025;">'+
            '<img style="position:absolute;left:50%;top:50%;width:14rem;height:6rem;margin:-3rem 0 0 -7rem;" src="/dyweb/dythemes/rhd/actives/festival9/phone/images/fx2.png">'+
            '<img style="position: absolute;width: 5rem;top: 0rem;right: 1rem;" src="/dyweb/dythemes/rhd/actives/festival9/phone/images/fx1.png">'+
            '</div>');
    }
});

//分享阴影
$(document).on('tap',"#ww2",showShare);
$(document).on('tap',".ww1",showShare);
function showShare(){
    $('#ww2').remove();
    $('.ww1').remove();
}





