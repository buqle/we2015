;!function(a){"use strict";var b=document,c="querySelectorAll",d="getElementsByClassName",e=function(a){return b[c](a)},f={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:!0},g={extend:function(a){var b=JSON.parse(JSON.stringify(f));for(var c in a)b[c]=a[c];return b},timer:{},end:{}};g.touch=function(a,b){var c;return/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent)?(a.addEventListener("touchmove",function(){c=!0},!1),void a.addEventListener("touchend",function(a){a.preventDefault(),c||b.call(this,a),c=!1},!1)):a.addEventListener("click",function(a){b.call(this,a)},!1)};var h=0,i=["layermbox"],j=function(a){var b=this;b.config=g.extend(a),b.view()};j.prototype.view=function(){var a=this,c=a.config,f=b.createElement("div");a.id=f.id=i[0]+h,f.setAttribute("class",i[0]+" "+i[0]+(c.type||0)),f.setAttribute("index",h);var g=function(){var a="object"==typeof c.title;return c.title?'<h3 style="'+(a?c.title[1]:"")+'">'+(a?c.title[0]:c.title)+'</h3><button class="layermend"></button>':""}(),j=function(){var a,b=(c.btn||[]).length;return 0!==b&&c.btn?(a='<span type="1">'+c.btn[0]+"</span>",2===b&&(a='<span type="0">'+c.btn[1]+"</span>"+a),'<div class="layermbtn">'+a+"</div>"):""}();if(c.fixed||(c.top=c.hasOwnProperty("top")?c.top:100,c.style=c.style||"",c.style+=" top:"+(b.body.scrollTop+c.top)+"px"),2===c.type&&(c.content='<i></i><i class="laymloadtwo"></i><i></i>'),f.innerHTML=(c.shade?"<div "+("string"==typeof c.shade?'style="'+c.shade+'"':"")+' class="laymshade"></div>':"")+'<div class="layermmain" '+(c.fixed?"":'style="position:static;"')+'><div class="section"><div class="layermchild '+(c.className?c.className:"")+" "+(c.type||c.shade?"":"layermborder ")+(c.anim?"layermanim":"")+'" '+(c.style?'style="'+c.style+'"':"")+">"+g+'<div class="layermcont">'+c.content+"</div>"+j+"</div></div></div>",!c.type||2===c.type){var k=b[d](i[0]+c.type),l=k.length;l>=1&&layer.close(k[0].getAttribute("index"))}document.body.appendChild(f);var m=a.elem=e("#"+a.id)[0];c.success&&c.success(m),a.index=h++,a.action(c,m)},j.prototype.action=function(a,b){var c=this;if(a.time&&(g.timer[c.index]=setTimeout(function(){layer.close(c.index)},1e3*a.time)),a.title){var e=b[d]("layermend")[0],f=function(){a.cancel&&a.cancel(),layer.close(c.index)};g.touch(e,f)}var h=function(){var b=this.getAttribute("type");0==b?(a.no&&a.no(),layer.close(c.index)):a.yes?a.yes(c.index):layer.close(c.index)};if(a.btn)for(var i=b[d]("layermbtn")[0].children,j=i.length,k=0;j>k;k++)g.touch(i[k],h);if(a.shade&&a.shadeClose){var l=b[d]("laymshade")[0];g.touch(l,function(){layer.close(c.index,a.end)})}a.end&&(g.end[c.index]=a.end)},a.layer={v:"1.7",index:h,open:function(a){var b=new j(a||{});return b.index},close:function(a){var c=e("#"+i[0]+a)[0];c&&(c.innerHTML="",b.body.removeChild(c),clearTimeout(g.timer[a]),delete g.timer[a],"function"==typeof g.end[a]&&g.end[a](),delete g.end[a])},closeAll:function(){for(var a=b[d](i[0]),c=0,e=a.length;e>c;c++)layer.close(0|a[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var a=document.scripts,c=a[a.length-1],d=c.src,e=d.substring(0,d.lastIndexOf("/")+1);c.getAttribute("merge")||document.head.appendChild(function(){var a=b.createElement("link");return a.href=e+"need/layer.css",a.type="text/css",a.rel="styleSheet",a.id="layermcss",a}())}()}(window);
var getCode = null;
var getarr=["1元话费","2元话费","新人专享大礼包"];

//查看奖励
function getReward(){

    window.location.href="/weixin/home.html#user/hongbao";
}

//点击火炬出现注册弹窗
$(function(){
    $('.hj .heada').on('tap',function(){
        $('#tishi .tishi').hide();
        $(this).addClass('headb').siblings().removeClass('headb') ;
        layer.open({
            content:'<img id="aaaccc" class="close" src="/dyweb/dythemes/rhd/actives/olympics/phone/images/5.png">'+
            '<div class="div-form">'+
            '<div class="form-group  li-row-90">'+
            '<input type="text" class="form-control li-row-90" id="tel" placeholder="输入手机号" maxlength="11">'+
            '</div> <div class="form-group  li-row-90 yzm" style="position:relative;">'+
            '<input type="text" class="form-control li-row-90" id="password" placeholder="手机验证码">'+
            '<div class="dxyzm li-row-50" onclick="getphoneCode()">获取验证码</div>'+
            '</div><div id="warn"></div>'+
            '<div class="form-group  li-row-90 zhuce" onclick="zhuce(1);">立即领取</div></div>',
            shadeClose: false
        })
    });
});

//验证码倒计时
function checkSendTime(time) {
    if (time < 1) {
        hqyzm=1;
        $(".dxyzm").html("获取验证码").removeClass("disabled");

    } else {
        time = time -1;
        $(".dxyzm").html(time + "秒重新发送");
        setTimeout(function() {
            checkSendTime(time);
        },1000);
    }
}

//获取验证码
var hqyzm =1;
function getphoneCode (){
    var telCode =  $('#yzm').val();
    var tel = $('#tel').val();
    var yzm = $('.dxyzm').html();
    if(hqyzm==2){
        return;
    }
    if(yzm == '获取验证码'){
        hqyzm=2;
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
                        //valicode:telCode
                    },
                    type: 'get',
                    success: function (res){
                        if(res.code==0){
                            alert("验证码发送成功，注意查收");
                            $(".dxyzm").addClass('disabled').off();
                            checkSendTime(60);

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
    }else{
        return;
    }


}

//注册列表
$.ajax({
    url:'/weixin/?user&q=get_share_ajax&alias=olympics&methodname=get_newly',
    type:'get',
    dataType: 'json',
    success: function(ret){
        if(ret.code==1){
            var rewardList = '';

            for(var i = 0, len = ret.data.length; i < len; i ++){
                rewardList += '<p><span>'+ret.data[i].phone+'</span><span>'+ret.data[i].reward+'</span></p>';
            }
            $('#reardList').html(rewardList);
            $('.count').html(ret.total);
        }

    }
});

//立即领取
function zhuce(num){
   var count = num;
    var telphone = $("#tel").val();
    var telCode =  $('#yzm').val();
    var passwordid = $('#password').val();
    if(count==1){
        $.ajax({
            url:"/weixin/?user&q=reg&type=weixinReg",
            data:{
                phone:telphone,
                phonecode:passwordid
            },
            dataType:'json',
            type: 'get',
            success:function(ret){
                if(ret.code==0){

                    localStorage.setItem("token",ret.data.token);
                    changeReward(ret.data.token);
                    return;
                }else{
                    alert(ret.msg);
                }
            }

        });
        count++;
        return count;
    }
}

//抽奖
function changeReward(token){
    baseurl="/weixin/";
    var guize='';
    $.ajax({
        url:baseurl+'?user&q=get_share_ajax&alias=olympics&methodname=get_reward1&token='+token,
        type:'post',
        dataType:'json',
        success:function(res) {
            switch (res.code){
                case 0:
                    getCode = 0;
                    break;
                case 1:
                    getCode = 1;
                    break;
            }
            layer.open({
                content:'<img id="aaaccc" class="close" src="/dyweb/dythemes/rhd/actives/olympics/phone/images/5.png">'+
                '<div class="bt"><p><span class="hs">恭喜你获得'+getarr[getCode]+'</span></p><p id="hf">话费领不够，红包急来凑</p></div>'+
                '<div style="height:0.5rem;"></div>'+
                '<div class="bk">'+
                '<div class="bk1">'+
                '<p><b>新用户专享礼，这里还有大惊喜！</b></p>'+
                '<p style="font-size:x-small;color:red;text-align:left;">1、新手<span class="tc">688</span>元红包大礼 2、微信专享<span class="tc">5</span>元话费</p>'+
                '</div>'+
                '</div>'+
                '<img class="img3" src="/dyweb/dythemes/rhd/actives/olympics/phone/images/4.png">'+
                '<div class="an">再抽一次</div>'+
                '<div id="mon_on">'+
                '</div>',
                shadeClose: false
            });

            if (res.code == 0) {
                guize+='<p style="color:black;font-weight:bold;">活动规则</p>';
                guize+='<p>1、活动时间为2016.8.6—2016.8.31，活动仅限新用户参与；</p>';
                guize+='<p>2、 每个新用户手机注册完成后均有一次抽奖机会，点击“再抽一次”分享到朋友圈可额外获得一次抽奖机会；</p>';
                guize+='<p>3、话费奖励在用户领取后24小时内到账，如遇逾期请联系相关运营商。</p>';
                $('#mon_on').html(guize);
            }else if(res.code == 1){
                guize+='<p style="color:black;font-weight:bold;">活动规则</p>';
                guize+='<p>1、活动时间为2016.8.6—2016.8.31，活动仅限新用户参与；</p>';
                guize+='<p>2、 每个新用户手机注册完成后均有一次抽奖机会，点击“再抽一次”分享到朋友圈可额外获得一次抽奖机会；</p>';
                guize+='<p>3、话费奖励在用户领取后24小时内到账，如遇逾期请联系相关运营商。</p>';
                $('#mon_on').html(guize);

            }else if(res.code == 2){
                $('#hf').hide();
                $('.hs').text('恭喜你获得新人专属大礼包');
                guize+='<p style="color:black;font-weight:bold;">活动规则</p>';
                guize+='<p>1、活动时间为2016.8.6—2016.8.31，活动仅限新用户参与；</p>';
                guize+='<p>2、“话费见面礼”为随机领取，包含”1元话费“、”2元话费“及”新人专属大礼包”；</p>';
                guize+='<p>3、话费奖励在用户领取后24小时内到账，如遇逾期请联系相关运营商；</p>';
                guize+='<p>4、688元红包说明：</p>';
                guize+='<p class="suojin">1）用户注册即可获得688元现金红包；</p>';
                guize+='<p class="suojin">2）红包及详情可在账户中心-我的红包查看；</p>';
                guize+='<p class="suojin">3）红包有效期为60天，从领取日开始计算；</p>';
                guize+='<p class="suojin">4） 新用户首次投资≥100元即可领取10元现金红包。</p>';
                guize+='<p class="suojin">5、 5元话费说明：新用户在微信端注册且首次投资≥100元可额外获得5元话费奖励，话费奖励在用户领取后24小时内到账，如遇逾期请联系相关运营商。</p>';
                $('#mon_on').html(guize);
            } else{
                layer.open({
                    content:res.msg,
                    bth:['我知道了']
                })
            }
        }
    });
}
var share=1;
function getweichat(){
    var token = localStorage.getItem('token');
    $.ajax({
        url:'/weixin/?user&q=get_share_ajax&alias=olympics&methodname=shared',
        type:'get',
        dataType: 'json',
        data:{
            token: token
        },
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
var rhdTitle = '洪荒之力赢大奖，话费现金任你拿';
var rhdLink = 'http://www.ronghedai.com/dyapp/active/olympics/index.html';
//var rhdDesc = '国资风投+银行联合存管，人脉变钱脉，100%钱生钱，安全理财必备神器！';
wx.ready(function () { /*/dyweb/dythemes/rhd/actives/olympics/phone/images/8_03.png*/
    wx.onMenuShareTimeline({
        title: rhdTitle, // 分享标题
        link: rhdLink, // 分享链接
        //desc:rhdDesc,
        imgUrl: 'http://www.ronghedai.com/dyweb/dythemes/rhd/actives/olympics/phone/images/logon.png', // 分享图标
        success: function () {
            getweichat();
            share=2;
        },
        cancel: function () {

            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareAppMessage({
        title: rhdTitle, // 分享标题
        link: rhdLink, // 分享链接
        //desc:rhdDesc,
        imgUrl: 'http://www.ronghedai.com/dyweb/dythemes/rhd/actives/olympics/phone/images/logon.png', // 分享图标
        success: function () {
            getweichat();
            share=2;
        },
        cancel: function () {

            // 用户取消分享后执行的回调函数
        }
    });

});

var agin = 1;
$('.an').live('tap',function(){
        if(share==1){
            $("body").append('<div class="ww1" style="width:100%;height:100%;position: fixed;top: 0;left: 0;background:#000;opacity:0.6; z-index: 19891024;"></div>'+
                '<div id="ww2" style="color:white;width:100%;height:100%;position: fixed;top: 0;left: 0;z-index: 19891025;">'+
                '<img style="position:absolute;left:50%;top:50%;width:14rem;height:6rem;margin:-3rem 0 0 -7rem;" src="/dyweb/dythemes/rhd/actives/olympics/phone/images/fx1.png">'+
                '<img style="position: absolute;width: 5rem;top: 0rem;right: 1rem;" src="/dyweb/dythemes/rhd/actives/olympics/phone/images/fx2.png">'+
                '</div>');
        }else{
            if(agin!=1){
                return;
            }else {
                agin++;
            baseurl="/weixin/";
            var guize='';
            $.ajax({
                url:baseurl+'?user&q=get_share_ajax&alias=olympics&methodname=get_reward1&token='+localStorage.getItem('token'),
                type:'post',
                dataType:'json',
                success:function(res) {
                    if(res.code == '10'){
                        layer.closeAll();
                        layer.open({
                            content: res.msg,
                            btn: '[确定]'
                        });
                        return;
                    }
                    /*if(res.code == '11'){
                        layer.closeAll();
                        layer.open({
                            content: res.msg,
                            btn: '[确定]'
                        })
                        return;
                    }*/
                    switch (res.code){
                        case 0:
                            getCode = 0;
                            break;
                        case 1:
                            getCode = 1;
                            break;
                    }
                    layer.open({
                        content:'<img id="aaaccc" class="close" src="/dyweb/dythemes/rhd/actives/olympics/phone/images/5.png">'+
                        '<div class="bt"><p><span class="hs">恭喜你获得'+getarr[getCode]+'</span></p><p id="hf">话费领不够，红包急来凑</p></div>'+
                        '<div style="height:0.5rem;"></div>'+
                        '<div class="bk">'+
                        '<div class="bk1">'+
                        '<p><b>新用户专享礼，这里还有大惊喜！</b></p>'+
                        '<p style="font-size:x-small;color:red;text-align:left;">1、新手<span class="tc">688</span>元红包大礼 2、微信专享<span class="tc">5</span>元话费</p>'+
                        '</div>'+
                        '</div>'+
                        '<img class="img3" src="/dyweb/dythemes/rhd/actives/olympics/phone/images/4.png">'+
                        '<div class="an" onclick="getReward();">查看奖励</div>'+
                        '<div id="mon_on">'+
                        '</div>',
                        shadeClose: false
                    });

                    if (res.code == 0) {
                        guize+='<p style="color:black;font-weight:bold;">活动规则</p>';
                        guize+='<p>1、活动时间为2016.8.6—2016.8.31，活动仅限新用户参与；</p>';
                        guize+='<p>2、 每个新用户手机注册完成后均有一次抽奖机会，点击“再抽一次”分享到朋友圈可额外获得一次抽奖机会；</p>';
                        guize+='<p>3、话费奖励在用户领取后24小时内到账，如遇逾期请联系相关运营商。</p>';
                        $('#mon_on').html(guize);
                    }else if(res.code == 1){
                        guize+='<p style="color:black;font-weight:bold;">活动规则</p>';
                        guize+='<p>1、活动时间为2016.8.6—2016.8.31，活动仅限新用户参与；</p>';
                        guize+='<p>2、 每个新用户手机注册完成后均有一次抽奖机会，点击“再抽一次”分享到朋友圈可额外获得一次抽奖机会；</p>';
                        guize+='<p>3、话费奖励在用户领取后24小时内到账，如遇逾期请联系相关运营商。</p>';
                        $('#mon_on').html(guize);

                    }else if(res.code == 2){
                        $('#hf').hide();
                        $('.hs').text('谢谢您的参与！');
                        guize+='<p>活动时间为2016.8.6—2016.8.31，活动仅限新用户参与。</p>';
                        $('#mon_on').html(guize);
                    }


                }
            });
        }
        }
});


//分享阴影
$(document).on('tap',"#ww2",showShare);
$(document).on('tap',".ww1",showShare);
function showShare(){
    $('#ww2').remove();
    $('.ww1').remove();
}

//点击关闭弹窗
$('#aaaccc').live("tap",function(){
    $('.layermbox').addClass('dis');
});

//“点我”循环效果
var index=0;
setInterval(function()
{
    var TheArray = new Array();//定义数组变量
    TheArray[0]="0";//数组初始化
    TheArray[1]="1";
    TheArray[2]="2";
    TheArray[3]="1";
    var ss = index%4;
    $('#tishi .tishi').eq(TheArray[ss]).text('点我').siblings().text('');
    index++;
//        console.log(index);
},1000);






