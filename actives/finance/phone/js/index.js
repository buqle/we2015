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

    function lijicanyu(){
        if(isApp == false){
            window.location.href = '/weixin/home.html#tender';
        }else {
            api.closeWin();
        }
    }

        function getReg(){
            getToken();
                if(isApp == false){
                    location.href = '/weixin/home.html#/login/register';
                }else {
                    openlogin(1);
                }
        }



    function reward(){ //抽奖
        $.ajax({
            url:'/weixin/?user&q=get_share_ajax&alias=finance&methodname=get_reward1&token='+token,
            type:'get',
            dataType:'json',
            success: function(ret){
                var Prize = ['25元红包','30元红包','kindle','15元红包','100元现金','100M流量','8元红包','富士拍立得','50元话费','便捷小风扇','500元现金','5元红包','50元红包','iPhone 6s Plus'];
                var allbiao = ['投12月标满1000元即可获得','投12月标满5000元即可获得','','投三月标满10000元即可获得','现金将在活动结束后3个工作日内充入汇付账户','','投三月标满5000元即可获得','','','','现金将在活动结束后3个工作日内充入汇付账户','投三月标满1000元即可获得','投12月标满10000元即可获得','']
                var dataLv = ret.code;
                var num;
                switch (dataLv){
                    case 0:
                        var num = randomnum(-11,11);
                        break;
                    case 1:
                        var num = randomnum(14,36);
                        break;
                    case 2:
                        var num = randomnum(39,62);
                        break;
                    case 3:
                        var num = randomnum(65,88);
                        break;
                    case 4:
                        var num = randomnum(91,114);
                        break;
                    case 5:
                        var num = randomnum(117,141);
                        break;
                    case 6:
                        var num = randomnum(144,166);
                        break;
                    case 7:
                        var num = randomnum(169,192);
                        break;
                    case 8:
                        var num = randomnum(195,217);
                        break;
                    case 9:
                        var num = randomnum(220,243);
                        break;
                    case 10:
                        var num = randomnum(246,269);
                        break;
                    case 11:
                        var num = randomnum(272,295);
                        break;
                    case 12:
                        var num = randomnum(298,320);
                        break;
                    case 13:
                        var num = randomnum(323,346);
                        break;
                    default:
                        break;
                };
                if(dataLv == '16'){
                    layer.open({
                        title:'提示：',
                        content : '未开通汇付,请到账户中心立即开通',
                        btn : ['确认'],
                        yes : function(){
                            layer.closeAll();
                            lijicanyu();
                        }
                    });
                }else if( dataLv == '14'){
                    layer.open({
                        title:'提示：',
                        content : '抽奖失败',
                        btn : ['确认']
                    });
                }else if( dataLv == '15'){
                    layer.open({
                        title:'提示：',
                        content : '活动已结束',
                        btn : ['确认']
                    });
                }else if( dataLv == '17'){
                    layer.open({
                        title:'提示：',
                        content : '今天已抽过奖',
                        btn : ['确认']
                    });
                }else if( dataLv == '18'){
                    layer.open({
                        title:'提示：',
                        content : '请求参数非法',
                        btn : ['确认']
                    });
                }else {
                    $('.zhizhen').rotate({
                        angle:0,
                        animateTo:2520 + num,
                        duration:5000,
                        callback:function(){
                            var texts = Prize[dataLv];
                            var allbiaos = allbiao[dataLv];
                            if(dataLv == '16'){
                                layer.open({
                                    title:'提示：',
                                    content : '您未开通汇付账户,请到账户中心立即开通',
                                    btn : ['确认'],
                                    yes : function(){
                                        layer.closeAll();
                                        if(isApp == false){
                                            window.location.href = '/weixin/home.html#user';
                                        }else {
                                            closeWin();
                                        }
                                    }
                                });
                            }else {
                                if(dataLv == '2' || dataLv == '7' || dataLv == '9' || dataLv == '13'){
                                    getDiv_DZ(texts);
                                }else if(dataLv == '5' || dataLv == '8'){
                                    getPhone(texts);
                                }else if(dataLv == '0' || dataLv == '1' || dataLv == '3' || dataLv == '4' || dataLv == '6' || dataLv == '10' || dataLv == '11' || dataLv == '12'){
                                    getDiv(texts,allbiaos);
                                }
                            }
                        }
                    })
                }
            }
        })
    }


    function randomnum(smin, smax){
        var Range = smax - smin;
        var Rand = Math.random();
        return (smin + Math.round(Rand * Range));
    }
    function getZZ(){
        getToken();
        if(token == '' || token == null){
            if(isApp == false){
                if(window.confirm('对不起，请先登录您的账户！')){
                    location.href = '/weixin/home.html#login';
                    return true;
                }else{
                    return false;
                }
            }else {
                openlogin(1);
            }
        }else {
            reward();
        }
    }

    //活动规则
    function getGz(){
        layer.open({
            content: '<div class="left"><p class="red">【活动规则汇总】</p><ul>\
            <li>一、新手福利</li>\
	        <li>1、活动期间，所有注册并开通汇付账户的用户均可获得688元现金红包和5元现金奖励；</li>\
	        <li>2.5元现金奖励将在三个工作日内直充用户汇付账户，可投资，可提现；</li>\
	        <li>3、688现金红包可在会员中心—活动管理—我的红包中查看。</li>\
	        <li>二、理财转盘</li>\
	        <li>1、活动期间，融和贷所有开通汇付的用户，每个账户每天均有一次抽奖机会。</li>\
	        <li>2、投资券使用规则：</li>\
	        <li>1）518理财节代金券有效期为3天，从领取日开始计算；</li>\
	        <li>2）单笔投资限用一张代金券，518理财节幸运抽奖红包不与新手688红包叠加使用，用户投资时，系统默认使用该笔投资可以获得的最大奖励代金券；</li>\
	        <li>3）符合条件的投资，满标复审后，三个工作日内代金券金额将直充用户汇付账户，可投资，可取现。</li>\
	        <li>3、流量、话费使用规则：用户所得流量、话费券，可在对应奖券中点击填写需充值的手机号进行充值，奖励到账以实际运营商到账时间为准。</li>\
	        <li>4、实物使用规则：用户所得实物奖励，需在对应奖券中点击填写收货地址，融和贷工作人员将在活动结束七个工作日内，安排发货。</li>\
	        <li>5、抽到现金券的用户，现金奖励将在活动结束后三个工作日内发放到用户汇付账户。</li>\
	        <li>6、本活动最终解释权归融和贷所有，如有疑问，请致电在线客服：400-182-8687。</li>\
	        <li>三、精选加息</li>\
	        <li>1、活动期间，融和财富—理财页面，每天随机发放精选加息标的；</li>\
	        <li>2、本活动奖励可与平台其他活动奖励叠加享有；</li>\
	        <li>3、本次活动中，不包含债权转让项目。</li>\
	        <li>四、理财达人</li>\
	        <li>1、用户在活动期间内，投资平台任意理财产品（不包含债权转让项目），新增待收累计总额排名前五即可获得对应奖品；</li>\
	        <li>2、新增待收累计总额排行榜按由多到少的顺序进行排序，相同投资总额的用户，按照达到的时间先后顺序进行排名，先达到的人排名在前；</li>\
	        <li>3、所得现金奖励将在活动结束后，一个工作日内直充用户汇付账户；</li>\
	        <li>4、用户所得实物奖励可在会员中心—活动管理—我的红包中查看并填写收货地址，活动结束七个工作日内统一发货；</li>\
	        <li>5、如同时（即同天同时同分同秒）出现相同待收总额排名前五的用户，则同一排名的两位用户，均可获得该排名对应奖励；</li>\
	        <li>6、本活动不包含债权转让项目。</li>\
	        <li>五、520加息</li>\
	        <li>1.活动期间，平台所有新老用户，凡投资3月标、6月标、12月标，均可获得对应加息奖励；</li>\
            <li>2.本活动奖励可与平台其他活动奖励叠加享有；</li>\
            <li>3.加息奖励随利息同时发放；</li>\
            <li>4.本次活动中，不包含债权转让项目。</li>\
            </ul>\
	        </div>',
            btn:["我知道了"]
        });
    }

    //提示层
    function getDiv(texts,allbiaos){
        layer.open({
            title:'提示：',
            content : '<div class="opView"><div>\
            <p class="vive1">恭喜你抽中<span>'+texts+'</span></p>\
            <p class="vive2 allbiao">'+allbiaos+'</p></div>\
            </div>',
            btn : ['立即投资'],
            yes : function(){
                layer.closeAll();
                lijicanyu();
            }
        });
    }

        //实物层
        function getDiv_DZ(texts){
            layer.open({
                title:'提示：',
                content : '<div class="opView"><div>\
                    <p class="vive1">恭喜你抽中<span>'+texts+'</span></p>\
                    </div>',
                btn : ['立即领取'],
                yes : function(){
                    layer.closeAll();
                    getDz(texts);
                    $("#sjld").sjld("#shenfen","#chengshi","#quyu");
                }
            });
        }


    //提交地址
    function getDz(texts){
        layer.open({
            title:'请正确填写收货信息',
            content:'<div class="opView_m">\
            <div class="in_oip">\
            <p>恭喜您抽中<span>'+texts+'</span>大奖</p>\
        <p>请填写收货信息</p>\
        <div id="sjld" style="width:12rem; height:1.5rem;position:relative;">\
            <div class="m_zlxg" id="shenfen">\
            <p title="">选择省份</p>\
            <div class="m_zlxg2">\
            <ul></ul>\
            </div>\
            </div>\
            <div class="m_zlxg" id="chengshi">\
            <p title="">选择城市</p>\
            <div class="m_zlxg2">\
            <ul></ul>\
            </div>\
            </div>\
            <div class="m_zlxg" id="quyu">\
            <p title="">选择区域</p>\
            <div class="m_zlxg2">\
            <ul></ul>\
            </div>\
            </div>\
            <input id="sfdq_num" type="hidden" value="" />\
            <input id="csdq_num" type="hidden" value="" />\
            <input id="sfdq_tj" type="hidden" value="" />\
            <input id="csdq_tj" type="hidden" value="" />\
            <input id="qydq_tj" type="hidden" value="" />\
            </div>\
            <p>详细地址</p>\
            <input class="aun_ccin" id="xiangxidizhi" type="text" value="" name="" placeholder="详细地址">\
            <p>收货人</p>\
            <input class="aun_ccin" id="shouhuoren" type="text" value="" name="" placeholder="收货人姓名">\
            <p>手机号码：</p>\
        <input class="aun_ccin" maxlength="11" id="shoujihao" type="text" value="" name="" placeholder="手机号码">\
            </div>\
            <div class="oni_ain" onclick="callDz();">确定</div>\
            </div>'
        })
    }



    //流量手机号码
    function getPhone(texts){
        layer.open({
            title:'提示：',
            content:'<div class="getPhones">\
            <div class="opView aoun_tm"><div>\
            <p class="vive1">恭喜你抽中<span>'+texts+'</span></p>\
        <p class="vive2">请填写需要充值的手机号码</p></div>\
            <div>\
            <input class="ininput" id="ping_phone" maxlength="11" type="text" value="" placeholder="手机号码"><span onclick="liuliang();" class="quedings">确定</span>\
            </div>\
            <div style="height: 0.8rem;"></div>\
            <p class="vive2" style="font-size: 0.6rem; line-height: 0.8rem;">*您在移动端填写的获奖信息<br>可以前往PC端修改或查看</p>\
            </div>\
            </div>'
        })
    }

    //提交地址
    function callDz(){
        var sfdq_tj = $('#sfdq_tj').val();
        var csdq_tj = $('#csdq_tj').val();
        var qydq_tj = $('#qydq_tj').val();
        var shouhuoren = $('#shouhuoren').val(); //收货人
        var shoujihao = $('#shoujihao').val(); //手机号
        var xiangxidizhi = $('#xiangxidizhi').val(); //细地址
        if(sfdq_tj != '' && csdq_tj != '' && qydq_tj != '' && xiangxidizhi != '' && shouhuoren != '' && shoujihao != ''){
            var dizhi = sfdq_tj + csdq_tj + qydq_tj + xiangxidizhi; // 完整地址
            $.ajax({
                url:'/weixin/?user&q=get_share_ajax&alias=finance&methodname=get_address_info',  //地址
                type:'get',
                data:{
                    address:dizhi,
                    phone:shoujihao,
                    name:shouhuoren,
                    token: token
                },
                dataType:'json',
                success: function(ret){
                    if(ret.code == 1){
                        layer.closeAll();
                        layer.open({
                            title:'提示：',
                            content:'提交成功',
                            btn : ['确认'],
                        })
                    }else {
                        layer.open({
                            title:'提示：',
                            content:'提交失败',
                            btn : ['确认'],
                        })
                    }
                }
            })
        }else {
            alert('您填写的地址有误！请重新输入');
            return false;
        }
    }
getToken();
if(token != null || token != '' || token != undefined){
    $.ajax({
        url:'/weixin/?user&q=set_red&type=get_managing_win&token='+ token,
        type:'get',
        dataType: 'json',
        success: function(ret){
            if(ret.ret == 0){
                var html = '';
                var allmoney=0;
                for(var i = 0, len = ret.list.length; i < len; i++){
                    html += '<p class="heands"><span>'+ret.list[i].name+'</span><span>'+parseInt(ret.list[i].account)+'</span><span>'+ret.list[i].tendertime+'</span><span>'+parseInt(ret.list[i].recover_account_all)+'</span></p>';
                    allmoney += parseInt(ret.list[i].recover_account_all);
                }
                $('.inin').html(html);
                $('.allmoneysnng').text(allmoney);
            }
        }
    })
}

function liuliang(){
    var phones = $('#ping_phone').val();
    if(phones != ''){
        $.ajax({
            url:'/weixin/?user&q=get_share_ajax&alias=finance&methodname=get_address_info',
            type:'get',
            data:{
                phone:phones
            },
            dataType: 'json',
            success:function(ret){
                if(ret.code == 1){
                    layer.closeAll();
                    layer.open({
                        title:'提示：',
                        content:'提交成功',
                        btn : ['确认'],
                    })
                }else {
                    layer.open({
                        title:'提示：',
                        content:'提交失败',
                        btn : ['确认'],
                    })
                }
            }
        })
    }else {
        alert('手机号码不能为空！');
    }

}
//情人节活动控制
var date = new Date();
var times = date.getTime()/1000;
if(times > 1463846399){
    var aas = '<img src="/dyweb/dythemes/rhd/actives/finance/phone/images/a7_02.png">';
    $('#section6').html(aas);
}
if(1463673599 < times){
    var aas = '<img src="/dyweb/dythemes/rhd/actives/finance/phone/images/tin.png">';
    $('#section7').html(aas);
}




