/*! layer mobile-v1.7 弹层组件移动版 License LGPL http://layer.layui.com/mobile By 贤心 */
;!function(a){"use strict";var b=document,c="querySelectorAll",d="getElementsByClassName",e=function(a){return b[c](a)},f={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:!0},g={extend:function(a){var b=JSON.parse(JSON.stringify(f));for(var c in a)b[c]=a[c];return b},timer:{},end:{}};g.touch=function(a,b){var c;return/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent)?(a.addEventListener("touchmove",function(){c=!0},!1),void a.addEventListener("touchend",function(a){a.preventDefault(),c||b.call(this,a),c=!1},!1)):a.addEventListener("click",function(a){b.call(this,a)},!1)};var h=0,i=["layermbox"],j=function(a){var b=this;b.config=g.extend(a),b.view()};j.prototype.view=function(){var a=this,c=a.config,f=b.createElement("div");a.id=f.id=i[0]+h,f.setAttribute("class",i[0]+" "+i[0]+(c.type||0)),f.setAttribute("index",h);var g=function(){var a="object"==typeof c.title;return c.title?'<h3 style="'+(a?c.title[1]:"")+'">'+(a?c.title[0]:c.title)+'</h3><button class="layermend"></button>':""}(),j=function(){var a,b=(c.btn||[]).length;return 0!==b&&c.btn?(a='<span type="1">'+c.btn[0]+"</span>",2===b&&(a='<span type="0">'+c.btn[1]+"</span>"+a),'<div class="layermbtn">'+a+"</div>"):""}();if(c.fixed||(c.top=c.hasOwnProperty("top")?c.top:100,c.style=c.style||"",c.style+=" top:"+(b.body.scrollTop+c.top)+"px"),2===c.type&&(c.content='<i></i><i class="laymloadtwo"></i><i></i>'),f.innerHTML=(c.shade?"<div "+("string"==typeof c.shade?'style="'+c.shade+'"':"")+' class="laymshade"></div>':"")+'<div class="layermmain" '+(c.fixed?"":'style="position:static;"')+'><div class="section"><div class="layermchild '+(c.className?c.className:"")+" "+(c.type||c.shade?"":"layermborder ")+(c.anim?"layermanim":"")+'" '+(c.style?'style="'+c.style+'"':"")+">"+g+'<div class="layermcont">'+c.content+"</div>"+j+"</div></div></div>",!c.type||2===c.type){var k=b[d](i[0]+c.type),l=k.length;l>=1&&layer.close(k[0].getAttribute("index"))}document.body.appendChild(f);var m=a.elem=e("#"+a.id)[0];c.success&&c.success(m),a.index=h++,a.action(c,m)},j.prototype.action=function(a,b){var c=this;if(a.time&&(g.timer[c.index]=setTimeout(function(){layer.close(c.index)},1e3*a.time)),a.title){var e=b[d]("layermend")[0],f=function(){a.cancel&&a.cancel(),layer.close(c.index)};g.touch(e,f)}var h=function(){var b=this.getAttribute("type");0==b?(a.no&&a.no(),layer.close(c.index)):a.yes?a.yes(c.index):layer.close(c.index)};if(a.btn)for(var i=b[d]("layermbtn")[0].children,j=i.length,k=0;j>k;k++)g.touch(i[k],h);if(a.shade&&a.shadeClose){var l=b[d]("laymshade")[0];g.touch(l,function(){layer.close(c.index,a.end)})}a.end&&(g.end[c.index]=a.end)},a.layer={v:"1.7",index:h,open:function(a){var b=new j(a||{});return b.index},close:function(a){var c=e("#"+i[0]+a)[0];c&&(c.innerHTML="",b.body.removeChild(c),clearTimeout(g.timer[a]),delete g.timer[a],"function"==typeof g.end[a]&&g.end[a](),delete g.end[a])},closeAll:function(){for(var a=b[d](i[0]),c=0,e=a.length;e>c;c++)layer.close(0|a[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var a=document.scripts,c=a[a.length-1],d=c.src,e=d.substring(0,d.lastIndexOf("/")+1);c.getAttribute("merge")||document.head.appendChild(function(){var a=b.createElement("link");return a.href=e+"need/layer.css",a.type="text/css",a.rel="styleSheet",a.id="layermcss",a}())}()}(window);


var lottery={
    index:-1,	//当前转动到哪个位置，起点位置
    count:0,	//总共有多少个位置
    timer:0,	//setTimeout的ID，用clearTimeout清除
    speed:20,	//初始转动速度
    times:0,	//转动次数
    cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize:-1,	//中奖位置
    init:function(id){
        if ($("#"+id).find(".col").length>0) {
            $lottery = $("#"+id);
            $units = $lottery.find(".col");
            this.obj = $lottery;
            this.count = $units.length-1;
            $lottery.find(".col-"+this.index).addClass("col_active");
        };
    },
    roll:function(){
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".col-"+index).removeClass("col_active");
        index += 1;
        if (index>count-1) {
            index = 0;
        };
        $(lottery).find(".col-"+index).addClass("col_active");
        this.index=index;
        return false;
    },
    stop:function(index){
        this.prize=index;
        return false;
    }
};
var getnum;
var getarr=["20元现金红包","10元现金红包","5元现金红包","2元话费","1元话费","iPhone6s","Ipad mini4","谢谢参与！"];
function roll(){
    lottery.times += 1;
    lottery.roll();
    if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
        console.log(lottery.times +'-----'+ lottery.cycle+10 +'--'+ lottery.prize +'----'+lottery.index);
        clearTimeout(lottery.timer);
        lottery.prize=-1;
        lottery.times=0;
        click=false;
        setTimeout(function(){
            layer.closeAll();
            layer.open({
                content: '<div class="left"><img src="/dyweb/dythemes/rhd/actives/newmobile/phone/img/11_03.png" width="100%" height="100%"><span style="position: absolute; top: 50%; left: 50%; width: 9rem; font-size: 0.7rem; height: 2rem; margin: -1rem 0 0 -4.5rem; text-align: center">恭喜您获得<span >'+getarr[getnum]+'</span></div>',
                btn:["我知道了"]
            });
        },500)
    }else{
        if (lottery.times<lottery.cycle) {
            lottery.speed -= 10;
        }else if(lottery.times==lottery.cycle) {
            lottery.prize = getnum;
        }else{
            if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                lottery.speed += 110;
            }else{
                lottery.speed += 20;
            }
        }
        if (lottery.speed<40) {
            lottery.speed=40;
        }
        lottery.timer = setTimeout(roll,lottery.speed);
    }
    return false;
}

var click=false;

var baseurl="http://local.trust.ronghedai.com/";
var telphone,telyzm;
var isPost = false;
function aa(){
    if (isPost){
        return false;
    }

    isPost = true;
    if($('.ac-gets').text() != '获取验证码'){
        return false;
    }
    time($('.ac-gets'));
    if(!$('.getyzm').hasClass('gray')){
        $('.getyzm').addClass('gray');
        $.ajax({
            url:baseurl+'weixin/?user&q=reg&type=sendRegCode',
            type:'post',
            data:{phone:telphone},
            dataType:'json',
            success:function(res){
                $('.getyzm').removeClass('gray')
                if(res.code==0){
                    alert("验证码发送成功，注意查收");
                }else if(res.code == 101){
                    alert(res.msg);
                }else if(res.code == 102){
                    alert('手机格式不正确！');
                }else if(res.code == 104){
                    alert('手机号码不能为空！');
                }else{
                    alert("验证码发送失败，请重新输入");
                }
            }
        });
        isPost = false;
    }
}
var wait=300;
function time(o) {
    if (wait == 0) {
        o.text('获取验证码');
        wait = 300;
    } else {
        o.text("重新发送(" + wait + ")");
        wait--;

        setTimeout(
            function() {time(o)}
            ,1000
        )
    }
}



function myReward(){
    var token = localStorage.getItem("token");
    if(token == null || token ==''){
        layer.closeAll();
        layer.open({
            content:'<div style="padding: 15px 10px;">您还未登录，请先去登录！</div>',
            btn:['确认'],
            yes:function(){
                window.location.href="/weixin/home.html#login";
            }
        });
    }else{
        window.location.href="/active/newmobile1/index.html";
    }
}
function getLuck(token){
    $.ajax({
        url:baseurl+'/weixin/?user&q=get_share_ajax&alias=newmobile1&methodname=get_reward1&token='+token,
        type:'get',
        dataType:'json',
        success:function(res){
            if(res.code == 0){
                getnum=res.code;
                start();
            }else if(res.code == 1){
                getnum=res.code;
                start();
            }else if(res.code == 2){
                getnum=res.code;
                start();
            }else if(res.code == 3){
                getnum=res.code;
                start();
            }else if(res.code == 4){
                getnum=res.code;
                start();
            }else if(res.code == 5){
                getnum=res.code;
                start();
            }else if(res.code == 6){
                getnum=res.code;
                start();
            }else if(res.code == 7) {
                getnum=res.code;
                start();
            }else if(res.code == 11){
                layer.closeAll();
                layer.open({
                    content: '<div style="padding: 15px 10px;">您的抽奖次数已经用完。</div>',
                    btn:["我知道了"]
                });
            }else {
                layer.closeAll();
                layer.open({
                    content: '<div class="left"><img src="/dyweb/dythemes/rhd/actives/newmobile/phone/img/22_03.png" width="100%" height="100%"></div>',
                    btn:["我知道了"]
                });
            }

        }
    })
}


function bb(){
    var sjyzm=$('.yzm').val();
    if(sjyzm!=''){
        $.ajax({
            url:baseurl+'weixin/?user&q=reg&type=weixinReg',
            type:'post',
            dataType:'json',
            data:{phone:telphone,phonecode:sjyzm},
            success:function(res){
                layer.closeAll();
                if(res.code==0){
                    localStorage.setItem('token',res.data.token);
                    var token = res.data.token;
                    setTimeout(function(){
                        getLuck(token)
                    },200)
                }else{
                    alert(res.msg);
                }
            }
        })
    }
};
var start = null;
window.onload=function(){
    lottery.init('lottery');
    start =function(){
        if (click) {
            return false;
        }else{
            lottery.speed=100;
            roll();
            click=true;
            return false;
        }
    }
    $(".ljcj").click(function(){
        var token = localStorage.getItem('token');
        if(token == null){
            layer.open({
                content:'<input type="tel" class="phone" placeholder="请输入正确的手机号" maxlength="11">\
			<div class="sssq">试试手气</div>',
                style:'width:14rem'
            });
        }else {
            getLuck(token);
        }

        $('.layermbox').on('click','.sssq',function(e){
            var phone=$('.phone').val();
            reg1 = /^1[34578]\d{9}$/;
            if(phone!=''&&reg1.test(phone)){
                $.ajax({
                    url:baseurl+'/weixin/?user&q=get_share_ajax&alias=newmobile1&methodname=get_can',
                    type:'get',
                    data:{phone:phone},
                    dataType:'json',
                    success:function(res){
                        if(res.code==0){
                            layer.closeAll();
                            layer.open({
                                content: '<div class="left">抱歉，该活动已结束</div>',
                                btn:["我知道了"]
                            });
                        }else if(res.code==1){
                            layer.closeAll();
                            layer.open({
                                shadeClose: false,
                                content:'<input type="text" class="phone yzm" placeholder="请输入验证码"><a href="javascript:aa();" class="getyzm ac-gets">获取验证码</a>\
						<div class="sure" onclick="bb();">确定</div>',
                                style:'width:15rem;background-color:#ECECEC;'
                            });
                            telphone=phone;
                            //getnum=res.lucky
                            //start();
                        }else if (res.code == 2){
                            layer.closeAll();
                            layer.open({
                                shadeClose: false,
                                content:'<input type="text" class="phone yzm" placeholder="请输入验证码"><a href="javascript:aa();" class="getyzm ac-gets">获取验证码</a>\
						<div class="sure" onclick="bb();">确定</div>',
                                style:'width:15rem;background-color:#ECECEC;'
                            });
                            telphone=phone;
                        }else if(res.code == 3){
                            layer.closeAll();
                            layer.open({
                                content: '<div class="left">参数错误</div>',
                                btn:["我知道了"]
                            });
                        }else if(res.code == 4){
                            layer.closeAll();
                            layer.open({
                                content: '<div class="left">您的抽奖机会已用完</div>',
                                btn:["我知道了"]
                            });
                        }else {
                            layer.closeAll();
                            layer.open({
                                content: '<div class="left">抱歉，您不符合抽奖条件</div>',
                                btn:["我知道了"]
                            });
                        }
                    }
                })
            }else {
                layer.closeAll();
                layer.open({
                    content: '<div class="left">您输入的手机号码有误！</div>',
                    btn:["我知道了"]
                });
            }
        });
    })

    $.ajax({
        url:baseurl+'weixin/?user&q=get_share_ajax&alias=newmobile1&methodname=get_newly',
        type:'post',
        dataType:'json',
        success:function(res){
            if(res.code==1){
                var html="";
                for (var i = res.data.length - 1; i >= 0; i--) {
                    html+='<li><span class="name">'+res.data[i].username+'</span><span class="recard_content">';
                    var str = res.data[i].reward;
                    if(str == '1元话费' || str == '2元话费'){
                        html+='中了'+res.data[i].reward+'</span>';
                    }else{
                        html+='中了'+res.data[i].reward+'</span>';
                    }
                    html+='<span class="recard_time">'+getday(res.data[i].addtime)+'</span></li>';
                };
                $('.recard_list').html(html);
            }
            var li=$('.recard_list li');
            var len=li.length-6;
            var i=1;
            var up=function(upl){
                li.css({'transform':"translateY("+upl+"rem)",'-webkit-transform':"translateY("+upl+"rem)",'transition': 'all 1s ease-in-out','-webkit-transition':'all 1s ease-in-out'});
            }
            setInterval(function(){
                if(len>0){

                    len--; up(-i*1.5);
                    i++;
                }else{
                    li.css({'transform':"translateY("+0+"rem)",'-webkit-transform':"translateY("+0+"rem)",'transition': 'all 0s ease-in-out','-webkit-transition':'all 1s ease-in-out'});
                    len=li.length-6;
                    i=1;
                }
            },2000);
        }
    })

    //点击活动规则
    $('.s4_bottom').click(function(){
        layer.open({
            content: '<div class="left"><p class="red">【活动说明】</p><ul><li>1、活动期间在活动页面注册的新用户，即可获得一次抽奖机会；</li>\
	    <li>2、分享好友可额外获得1次抽奖机会（有且只有一次）；</li><li>3、所得话费奖励在1个工作日内发放到账；</li>\
	    <li>4、现金奖励在用户投资后3个工作日发放到账；</li>\
	    <li>5、若抽中实物奖品，用户需要在融和贷微信订阅号中提交姓名、手机号和邮寄地址等个人信息，此信息仅用于奖品邮寄，不做其他用途；</li><li>6、活动期间注册的新用户还可额外获得平台688元注册红包；</li><li>7、此活动最终解释权归融和贷所有。</li>\
	    </ul></div>',
            btn:["我知道了"]
        });
    })
    function getday(time) {
        var date = new Date();
        date.setTime(time * 1000);
        Y = date.getFullYear() + '/';
        M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1) + '/';
        D = date.getDate()+'   ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = (date.getSeconds() + 1 < 10 ? '0' + (date.getSeconds() + 1) : date.getSeconds() + 1);
        time = Y + M + D;
        return time;
    }


    function getweichat(){
        var token = localStorage.getItem('token');
        $.ajax({
            url:'/weixin/?user&q=get_share_ajax&alias=newmobile1&methodname=shared',
            type:'get',
            dataType: 'json',
            data:{
                token: token
            },
            success: function(request){
                alert('分享成功！');
            }
        })
    }

    $.getJSON('/?getweixintoken',{},function(ret){
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
    })
    var rhdTitle = '新手福利，一大波现金、话费大奖来袭';
    var rhdLink = 'http://www.ronghedai.com/dyapp/active/newmobile1/index.html';
    var rhdDesc = '国资风投+银行联合存管，人脉变钱脉，100%钱生钱，安全理财必备神器！';
    wx.ready(function(){
        wx.onMenuShareQQ({
            title: rhdTitle,
            desc: rhdDesc,
            link: rhdLink,
            imgUrl:'http://www.ronghedai.com/dyweb/dythemes/rhd/images/gaiban/icon200x200.png',
            success: function () {
                getweichat();
            }
        });

        wx.onMenuShareAppMessage({
            title: rhdTitle,
            desc: rhdDesc,
            link: rhdLink,
            imgUrl:'http://www.ronghedai.com/dyweb/dythemes/rhd/images/gaiban/icon200x200.png',
            success: function () {
                getweichat();
            }
        });

        wx.onMenuShareQQ({
            title: rhdTitle, // 分享标题
            desc: rhdDesc, // 分享描述
            link: rhdLink, // 分享链接
            imgUrl:'http://www.ronghedai.com/dyweb/dythemes/rhd/images/gaiban/icon200x200.png',
            success: function () {
                getweichat();
            }
        });

        wx.onMenuShareWeibo({
            title: rhdTitle, // 分享标题
            desc: rhdDesc, // 分享描述
            link: rhdLink, // 分享链接
            imgUrl:'http://www.ronghedai.com/dyweb/dythemes/rhd/images/gaiban/icon200x200.png',
            success: function () {
                getweichat();
            }
        });

        wx.onMenuShareQZone({
            title: rhdTitle, // 分享标题
            desc: rhdDesc, // 分享描述
            link: rhdLink, // 分享链接
            imgUrl:'http://www.ronghedai.com/dyweb/dythemes/rhd/images/gaiban/icon200x200.png',
            success: function () {
                getweichat();
            }
        });
    })
};
