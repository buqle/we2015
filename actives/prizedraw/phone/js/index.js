/**
 * Created by ronghedai on 16/9/28.
 */
;!function(a){"use strict";var b=document,c="querySelectorAll",d="getElementsByClassName",e=function(a){return b[c](a)},f={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:!0},g={extend:function(a){var b=JSON.parse(JSON.stringify(f));for(var c in a)b[c]=a[c];return b},timer:{},end:{}};g.touch=function(a,b){var c;return/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent)?(a.addEventListener("touchmove",function(){c=!0},!1),void a.addEventListener("touchend",function(a){a.preventDefault(),c||b.call(this,a),c=!1},!1)):a.addEventListener("click",function(a){b.call(this,a)},!1)};var h=0,i=["layermbox"],j=function(a){var b=this;b.config=g.extend(a),b.view()};j.prototype.view=function(){var a=this,c=a.config,f=b.createElement("div");a.id=f.id=i[0]+h,f.setAttribute("class",i[0]+" "+i[0]+(c.type||0)),f.setAttribute("index",h);var g=function(){var a="object"==typeof c.title;return c.title?'<h3 style="'+(a?c.title[1]:"")+'">'+(a?c.title[0]:c.title)+'</h3><button class="layermend"></button>':""}(),j=function(){var a,b=(c.btn||[]).length;return 0!==b&&c.btn?(a='<span type="1">'+c.btn[0]+"</span>",2===b&&(a='<span type="0">'+c.btn[1]+"</span>"+a),'<div class="layermbtn">'+a+"</div>"):""}();if(c.fixed||(c.top=c.hasOwnProperty("top")?c.top:100,c.style=c.style||"",c.style+=" top:"+(b.body.scrollTop+c.top)+"px"),2===c.type&&(c.content='<i></i><i class="laymloadtwo"></i><i></i>'),f.innerHTML=(c.shade?"<div "+("string"==typeof c.shade?'style="'+c.shade+'"':"")+' class="laymshade"></div>':"")+'<div class="layermmain" '+(c.fixed?"":'style="position:static;"')+'><div class="section"><div class="layermchild '+(c.className?c.className:"")+" "+(c.type||c.shade?"":"layermborder ")+(c.anim?"layermanim":"")+'" '+(c.style?'style="'+c.style+'"':"")+">"+g+'<div class="layermcont">'+c.content+"</div>"+j+"</div></div></div>",!c.type||2===c.type){var k=b[d](i[0]+c.type),l=k.length;l>=1&&layer.close(k[0].getAttribute("index"))}document.body.appendChild(f);var m=a.elem=e("#"+a.id)[0];c.success&&c.success(m),a.index=h++,a.action(c,m)},j.prototype.action=function(a,b){var c=this;if(a.time&&(g.timer[c.index]=setTimeout(function(){layer.close(c.index)},1e3*a.time)),a.title){var e=b[d]("layermend")[0],f=function(){a.cancel&&a.cancel(),layer.close(c.index)};g.touch(e,f)}var h=function(){var b=this.getAttribute("type");0==b?(a.no&&a.no(),layer.close(c.index)):a.yes?a.yes(c.index):layer.close(c.index)};if(a.btn)for(var i=b[d]("layermbtn")[0].children,j=i.length,k=0;j>k;k++)g.touch(i[k],h);if(a.shade&&a.shadeClose){var l=b[d]("laymshade")[0];g.touch(l,function(){layer.close(c.index,a.end)})}a.end&&(g.end[c.index]=a.end)},a.layer={v:"1.7",index:h,open:function(a){var b=new j(a||{});return b.index},close:function(a){var c=e("#"+i[0]+a)[0];c&&(c.innerHTML="",b.body.removeChild(c),clearTimeout(g.timer[a]),delete g.timer[a],"function"==typeof g.end[a]&&g.end[a](),delete g.end[a])},closeAll:function(){for(var a=b[d](i[0]),c=0,e=a.length;e>c;c++)layer.close(0|a[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var a=document.scripts,c=a[a.length-1],d=c.src,e=d.substring(0,d.lastIndexOf("/")+1);c.getAttribute("merge")||document.head.appendChild(function(){var a=b.createElement("link");return a.href=e+"need/layer.css",a.type="text/css",a.rel="styleSheet",a.id="layermcss",a}())}()}(window);
var click = false;
$(function () {
    //活动说明
    $('.aa-cols').live('tap',function () {
        layer.closeAll();
        layer.open({
            content: '<div class="imgs-close" style="cursor: pointer;"></div>' +
            '<div class="allbox">' +
            '<div class="t-actions ten-span">' +
            '<span style="font-size: 0.8rem; font-weight: bold">活动说明</span><span id="wode">我的奖品</span>' +
            '</div>' +
            '<p>' +
            '<span>1.活动奖品：<br></span>一等奖：IPhone7一台 +现金红包<br>二等奖：磨砂玻璃杯1个+现金红包<br>三等奖：2元话费 +现金红包<br>四等奖：1元话费+现金红包<br>五等奖：现金红包<br>注：现金红包有且只能领取一次' +
            '<br><span>2.活动时间：<br></span>2016年10月1日 - 2016年10月28日'+
            '<br><span>3.活动及兑奖说明：：<br></span>游戏在15秒内完成即可获取抽奖机会，新用户每人均有1次获奖机会。（活动分享好友可额外获得1次获奖机会且有且仅有一次）；'+
            '<br><span>4.奖励发放方式：<br></span>① 所得1元/2元话费奖励在1个工作日内发放，具体到账时间以话费余额为准（部分运营商无充值短信提示）；170/171号段无法进行充值。<br>② 现金红包奖励即时到账；<br>③ 若抽中实物奖品，用户可直接联系客服（微信号：ronghedai888），实物奖品于10月15日和10月30日两次发放，具体到货时间以快递签收时间为准，所提交信息仅用于奖品邮寄，不作其他用途；中奖用户自中奖日起5个工作日内，未联系微信客服发送邮寄地址等信息的，则视为自动放弃；<br>④ 此活动最终解释权归融和贷所有。'+
            '</p>'+
            '</div>',
        });
    });
    //我的奖品
    $('#wode').live('tap', function () {
        layer.closeAll();
        layer.open({
            content: '<div class="imgs-close" style="cursor: pointer;"></div>' +
            '<div class="allbox">' +
            '<div class="t-actions tin-cc">' +
            '<span class="aa-cols">活动说明</span><span id="wode" style="font-size: 0.8rem; font-weight: bold">我的奖品</span>' +
            '</div>' +
            '<div class="tin-a" id="tin_us">' +

            '</div>'+
            '</div>',
        });

        $.post('/weixin/?user&q=get_share_ajax&alias=prizedraw&methodname=get_myreward',{token:localStorage.getItem('token')},function(res){
            if(res.code == 1){
                var htmltext = '';
                for(var i = 0, len = res.data.length; i < len; i ++){
                    if(res.data[i].reward ===null) return;
                    reward1 = res.data[i].reward;
                    state = res.data[i].stauts;
                    htmltext += '<div class="tin-a">';
                    htmltext += '<div class="aun-hongbao">';
                    htmltext += '<div class="image-t">';
                    if(reward1 == '话费1元'){
                        htmltext += '<div class="allspan">￥<span>1</span>元</div>';
                        htmltext += '<p class="huafeis">话费</p>';
                    }else if(reward1 == '话费2元'){
                        htmltext += '<div class="allspan">￥<span>2</span>元</div>';
                        htmltext += '<p class="huafeis">话费</p>';
                    }else if(reward1 == '磨砂玻璃杯'){
                        htmltext += '<div class="allspan allspan-01"><span class="jiangpin">磨砂玻璃杯</span></div>';
                        htmltext += '<p class="huafeis">实物</p>';
                    }else if(reward1 == '现金红包'){
                        htmltext += '<div class="allspan"><span>688</span></div>';
                        htmltext += '<p class="huafeis">红包</p>';
                    }
                    htmltext += '</div>';
                    htmltext += '</div>';
                    htmltext += '<div class="aun-hongbao1 imgs-closeaon">';


                    htmltext += '<div class="yishiyong">'+(state == 0 ? '发放中' : '已使用')+'</div>';
                    if(reward1 == '话费1元'){
                        htmltext += '<span class="ai-ps">即使充值,24小时到账</span>';
                    }else if(reward1 == '话费2元'){
                        htmltext += '<span class="ai-ps">即使充值,24小时到账</span>';
                    }else if(reward1 == '磨砂玻璃杯'){
                        htmltext += '<span class="ai-ps">中奖日起 5个工作日内联系客服</span>';
                    }else if(reward1 == '现金红包'){
                        htmltext += '<span class="ai-ps">有效期2个月</span>';
                    }

                    htmltext += '</div>';
                    htmltext += '</div>';
                }
                $('#tin_us').html(htmltext);
            }
        },'json');
    });

    $('.imgs-close').live('tap', function () {
        layer.closeAll();
    });

    //开始游戏
    $('#readyGame').on('tap',function(){ //输入手机号
        //layer.closeAll();
        //layer.open({
        //    content:'<div class="imgs-close" style="cursor: pointer;"></div>'+
        //            '<div class="tphones">' +
        //                '<div class="in-cups"><input id="phone" placeholder="输入手机号" value="" maxlength="11"></div>' +
        //                '<div id="warn"></div>'+
        //                '<div class="lijikais" id="begin">立即开始</div>' +
        //            '</div>',
        //})
    });

    //点击立即开始
    phone=null;
    $('#begin').live('tap', function() {  //输入验证码
        phone = $('#phone').val();
        var phoneTest = /^1[3578]\d{9}$/;
        if(phone == ''){
            $('#warn').html('手机号不能为空');
        }else if(!(phoneTest.test(phone))){
            $('#warn').html('手机号格式错误');
        }else{
            $.ajax({
                url:'/weixin/?user&q=reg&type=sendRegCode',
                dataType: 'json',
                data: {
                    phone: phone,
                },
                type: 'get',
                success: function (res){
                    if(res.code==0){
                        layer.closeAll();
                        checkSendTime(30);
                        layer.open({
                            content:'<div class="imgs-close" style="cursor: pointer;"></div>'+
                            '<div class="tphones">' +
                            '<div class="in-cups"><input id ="yzm" placeholder="输入验证码" value="" maxlength="11"></div><span class="on-texts"></span>' +
                            '<div id="warn"></div>'+
                            '<div class="lijikais" id="nao">挠一挠</div>' +
                            '</div>',
                        });
                    }else if(res.code == 103){
                        window.location.href='/active/prizedraw/index.html';
                    }else{
                       alert(res.msg);
                    }
                }
            })
        }
    });

    //点击挠-挠
    $('#nao').live('tap',function(){
        var yzm = $('#yzm').val();
        if(yzm == ''){
            $('#warn').html('验证码不能为空');
        }else{
            $.ajax({
                url:"/weixin/?user&q=reg&type=weixinReg",
                data:{
                    phone:phone,
                    phonecode:yzm,
                },
                dataType:'json',
                type: 'POST',
                success:function(ret){
                        layer.closeAll();
                        if(ret.code==0){
                            localStorage.setItem('token',ret.data.token);
                            window.location.href='/dyapp/active/redgame/index.html';
                        }else{
                           alert(ret.msg);
                        }
                }

            })
        }
    });

    //验证码倒计时
    function checkSendTime(time){
        InvTims = setInterval(function(){
            if(time <= 0){
                clearInterval(this);
                $('.on-texts').text('');
            }else {
                time --;
                $('.on-texts').text(time + 's');
            }
        }, 1000)
    }


    //实时中奖记录

    $.ajax({
        url:"/weixin/?user&q=get_share_ajax&alias=prizedraw&methodname=get_newly",
        dataType:'json',
        type: 'get',
        success:function(ret){
            if(ret.code==1){
                var zhongjiang = '';
                var len = ret.data.length;
                for(var i=0;i<len;i++){
                    zhongjiang+='<div class="in-bol"><p class="te-phons">'+ret.data[i].phone+'</p><p class="te-jiangls">'+ret.data[i].reward+'</p></div>';
                }
                var count = 512+parseInt(ret.total);
                $('.ringhs').html(zhongjiang);
                $('#count').html(count);
            }else{
                alert(ret.msg);
            }
        }
    });
});


//从弹窗中我的奖品中查看
(function (){
    var url = window.location.href.split("#")[1];
    if(url == '01'){
        layer.closeAll();
        layer.open({
            content: '<div class="imgs-close" style="cursor: pointer;"></div>' +
            '<div class="allbox">' +
            '<div class="t-actions tin-cc">' +
            '<span class="aa-cols">活动说明</span><span id="wode" style="font-size: 0.8rem; font-weight: bold">我的奖品</span>' +
            '</div>' +
            '<div class="tin-a" id="tin_us">' +

            '</div>'+
            '</div>',
        });

        $.post('/weixin/?user&q=get_share_ajax&alias=prizedraw&methodname=get_myreward',{token:localStorage.getItem('token')},function(res){
            if(res.code == 1){
                var htmltext = '';
                for(var i = 0, len = res.data.length; i < len; i ++){
                    if(res.data[i].reward ===null) return;
                    reward1 = res.data[i].reward;
                    state = res.data[i].stauts;
                    htmltext += '<div class="tin-a">';
                    htmltext += '<div class="aun-hongbao">';
                    htmltext += '<div class="image-t">';
                    if(reward1 == '话费1元'){
                        htmltext += '<div class="allspan">￥<span class="jiangpin">1</span>元</div>';
                        htmltext += '<p class="huafeis">话费</p>';
                    }else if(reward1 == '话费2元'){
                        htmltext += '<div class="allspan">￥<span class="jiangpin">2</span>元</div>';
                        htmltext += '<p class="huafeis">话费</p>';
                    }else if(reward1 == '磨砂玻璃杯'){
                        htmltext += '<div class="allspan allspan-01"><span class="jiangpin">磨砂玻璃杯</span></div>';
                        htmltext += '<p class="huafeis">实物</p>';
                    }else if(reward1 == '现金红包'){
                        htmltext += '<div class="allspan"><span class="jiangpin">688</span></div>';
                        htmltext += '<p class="huafeis">红包</p>';
                    }
                    htmltext += '</div>';
                    htmltext += '</div>';
                    htmltext += '<div class="aun-hongbao1 imgs-closeaon">';
                    htmltext += '<div class="yishiyong">'+(state == 0 ? '发放中' : '已使用')+'</div>';
                    if(reward1 == '话费1元'){
                        htmltext += '<span class="ai-ps">即使充值,24小时到账</span>';
                    }else if(reward1 == '话费2元'){
                        htmltext += '<span class="ai-ps">即使充值,24小时到账</span>';
                    }else if(reward1 == '磨砂玻璃杯'){
                        htmltext += '<span class="ai-ps">中奖日起 5个工作日内联系客服</span>';
                    }else if(reward1 == '现金红包'){
                        htmltext += '<span class="ai-ps">有效期2个月</span>';
                    }

                    htmltext += '</div>';
                    htmltext += '</div>';
                }
                $('#tin_us').html(htmltext);
            }
        },'json');
    }
})();

function getday(time) {
    var date = new Date();
    date.setTime(time * 1000);
    Y = date.getFullYear() + '/';
    M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    D = date.getDate()+'   ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = (date.getSeconds() + 1 < 10 ? '0' + (date.getSeconds() + 1) : date.getSeconds() + 1);
    time = Y + M + D + h + m + s;
    return time;
}


