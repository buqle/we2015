;!function(a){"use strict";var b=document,c="querySelectorAll",d="getElementsByClassName",e=function(a){return b[c](a)},f={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:!0},g={extend:function(a){var b=JSON.parse(JSON.stringify(f));for(var c in a)b[c]=a[c];return b},timer:{},end:{}};g.touch=function(a,b){var c;return/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent)?(a.addEventListener("touchmove",function(){c=!0},!1),void a.addEventListener("touchend",function(a){a.preventDefault(),c||b.call(this,a),c=!1},!1)):a.addEventListener("click",function(a){b.call(this,a)},!1)};var h=0,i=["layermbox"],j=function(a){var b=this;b.config=g.extend(a),b.view()};j.prototype.view=function(){var a=this,c=a.config,f=b.createElement("div");a.id=f.id=i[0]+h,f.setAttribute("class",i[0]+" "+i[0]+(c.type||0)),f.setAttribute("index",h);var g=function(){var a="object"==typeof c.title;return c.title?'<h3 style="'+(a?c.title[1]:"")+'">'+(a?c.title[0]:c.title)+'</h3><button class="layermend"></button>':""}(),j=function(){var a,b=(c.btn||[]).length;return 0!==b&&c.btn?(a='<span type="1">'+c.btn[0]+"</span>",2===b&&(a='<span type="0">'+c.btn[1]+"</span>"+a),'<div class="layermbtn">'+a+"</div>"):""}();if(c.fixed||(c.top=c.hasOwnProperty("top")?c.top:100,c.style=c.style||"",c.style+=" top:"+(b.body.scrollTop+c.top)+"px"),2===c.type&&(c.content='<i></i><i class="laymloadtwo"></i><i></i>'),f.innerHTML=(c.shade?"<div "+("string"==typeof c.shade?'style="'+c.shade+'"':"")+' class="laymshade"></div>':"")+'<div class="layermmain" '+(c.fixed?"":'style="position:static;"')+'><div class="section"><div class="layermchild '+(c.className?c.className:"")+" "+(c.type||c.shade?"":"layermborder ")+(c.anim?"layermanim":"")+'" '+(c.style?'style="'+c.style+'"':"")+">"+g+'<div class="layermcont">'+c.content+"</div>"+j+"</div></div></div>",!c.type||2===c.type){var k=b[d](i[0]+c.type),l=k.length;l>=1&&layer.close(k[0].getAttribute("index"))}document.body.appendChild(f);var m=a.elem=e("#"+a.id)[0];c.success&&c.success(m),a.index=h++,a.action(c,m)},j.prototype.action=function(a,b){var c=this;if(a.time&&(g.timer[c.index]=setTimeout(function(){layer.close(c.index)},1e3*a.time)),a.title){var e=b[d]("layermend")[0],f=function(){a.cancel&&a.cancel(),layer.close(c.index)};g.touch(e,f)}var h=function(){var b=this.getAttribute("type");0==b?(a.no&&a.no(),layer.close(c.index)):a.yes?a.yes(c.index):layer.close(c.index)};if(a.btn)for(var i=b[d]("layermbtn")[0].children,j=i.length,k=0;j>k;k++)g.touch(i[k],h);if(a.shade&&a.shadeClose){var l=b[d]("laymshade")[0];g.touch(l,function(){layer.close(c.index,a.end)})}a.end&&(g.end[c.index]=a.end)},a.layer={v:"1.7",index:h,open:function(a){var b=new j(a||{});return b.index},close:function(a){var c=e("#"+i[0]+a)[0];c&&(c.innerHTML="",b.body.removeChild(c),clearTimeout(g.timer[a]),delete g.timer[a],"function"==typeof g.end[a]&&g.end[a](),delete g.end[a])},closeAll:function(){for(var a=b[d](i[0]),c=0,e=a.length;e>c;c++)layer.close(0|a[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var a=document.scripts,c=a[a.length-1],d=c.src,e=d.substring(0,d.lastIndexOf("/")+1);c.getAttribute("merge")||document.head.appendChild(function(){var a=b.createElement("link");return a.href=e+"need/layer.css",a.type="text/css",a.rel="styleSheet",a.id="layermcss",a}())}()}(window);
var isread = 0;
apiready = function () {
    rhdapi.checklogin = function (callback) {
        api.getPrefs({
            key: 'token'
        }, function(ret, err){
            var retJ = {islogin:0};
            if (ret.value != null && ret.value !=''){
                retJ.islogin = 1;
            }
            callback && callback(retJ);
        })
    };
    rhdapi.login = function( callback ){
        openlogin(1);
    };
    rhdapi.gotoTender= function( callback) {
        api.closeWin();
    };
    var _post = rhdapi.getPost;
    rhdapi.getPost= function(data, callback){
        api.getPrefs({
            key: 'token'
        }, function(ret, err){
            var token =  "";
            if (ret.value != null && ret.value !=''){
                token = ret.value ;
            }
            data.token = token;
            _post(data, callback);
        })
    };
};
ready =  function(){
    if (isread == 1) {
        return false;
    }
    isread = 1;
    var getnum;
    var getarr=["5元现金","10元现金","50元话费","1G流量","32G U盘","50元代金券","30元代金券","15元代金券"];
    var islogin =0;
    if (typeof api === 'object') {

    }

    rhdapi.checklogin(function(s){
        islogin = s.islogin;
        if(islogin == 1){
            //我的获奖记录
          rhdapi.getPost(    // weixin/?user&q=get_share_ajax&alias=estival&methodname=get_myreward
                {"query_site":"user",
                    "q":"get_share_ajax",
                    "type":"active",
                    "alias":"estival",
                    "methodname":"get_myreward"
                },
                function(ret){
                    ret = ret.data;
                    if(ret.code == 1){
                        var getReward = '';
                        var len = ret.data.length;
                        var num;
                        for(var i=0;i<len;i++){
                            num = i+1;
                            getReward+='<p><span style="width:30%;">'+num+'</span><span style="width:40%;">'+ret.data[i].reward+'</span><span style="width:30%;">'+getday(ret.data[i].addtime)+'</span></p>';
                        }
                        $("#getReward").html(getReward);

                    }else {
                        if(res.msg!='获取列表成功'){
                            alert(ret.msg);
                        }

                    }

                });

            //满就送记录
            setTimeout(function () {
                rhdapi.getPost(    // weixin/?user&q=get_share_ajax&alias=estival9&methodname=get_myreward
                    {
                        "query_site":"user",
                        "q":"get_share_ajax",
                        "type":"active",
                        "alias":"estival9",
                        "methodname":"get_myreward"
                    },
                    function(ret){
                        ret = ret.data;
                        if(ret.code == 0){
                            var send = '';
                            send+='<p><span style="width:25%;">3月标</span><span style="width:40%;">'+ret.data[3].tender+'</span><span style="width:35%;">'+ret.data[3].reward+'</span></p>';
                            send+='<p><span style="width:25%;">6月标</span><span style="width:40%;">'+ret.data[6].tender+'</span><span style="width:35%;">'+ret.data[6].reward+'</span></p>';
                            send+='<p><span style="width:25%;">12月标</span><span style="width:40%;">'+ret.data[12].tender+'</span><span style="width:35%;">'+ret.data[12].reward+'</span></p>';
                            $("#send").html(send);

                            var moneys =parseFloat(ret.data[3].reward)+parseFloat(ret.data[6].reward)+parseFloat(ret.data[12].reward);
                            var  money= moneys.toFixed(2);
                            $('.money1').text(money+'元');

                        }else {
                            alert(ret.msg);

                        }

                    });
            }, 2000);

        }else{
            $('.dl').show();
            $('.dl1').hide();


        }
    });



    //抽奖
    $('.heada').on("tap",function(){
        if (islogin == '0') {
            rhdapi.alert("您还未登录,请先登录！");
            return false;
        }

        $(this).addClass('headb').siblings().removeClass('headb') ;
        rhdapi.getPost(    // weixin/?user&q=get_share_ajax&alias=estival&methodname=get_reward1
            {
                "query_site":"user",
                "q":"get_share_ajax",
                "type":"active",
                "alias":"estival",
                "methodname":"get_reward1"
            },
            function(res){
                res = res.data;

                if(res.code == 11){
                    //未抽中
                    layer.closeAll();
                    layer.open({
                        content: '<img id="close" src="/dyweb/dythemes/rhd/actives/estival/phone/images/close.png">'+
                        '<div style="position:relative;">' +
                        '<img src="/dyweb/dythemes/rhd/actives/estival/phone/images/tc2.png" width="100%" height="100%">'+
                        '<img id="huoqu" src="/dyweb/dythemes/rhd/actives/estival/phone/images/huoqu.png">'+
                        '</div>',
                        shadeClose: false
                    });

                }else if(res.code == 8){
                    alert("抱歉，该活动已经结束");

                }else if(res.code==9){
                    alert("参数错误");

                }else if(res.code == 10){
                    alert("抱歉，您不符合抽奖条件");

                }else{
                    switch(res.code){
                        case 0:
                            getnum=res.code;
                            //alert(getnum);
                            break;
                        case 1:
                            getnum=res.code;
                            break;
                        case 2:
                            getnum=res.code;
                            break;
                        case 3:
                            getnum=res.code;
                            break;
                        case 4:
                            getnum=res.code;
                            break;
                        case 5:
                            getnum=res.code;
                            break;
                        case 6:
                            getnum=res.code;
                            break;
                        case 7:
                            getnum=res.code;
                            break;
                    }
                    layer.closeAll();
                    layer.open({
                        content: '<img id="close" src="/dyweb/dythemes/rhd/actives/estival/phone/images/close.png">'+
                        '<div style="position:relative;">' +
                        '<img src="/dyweb/dythemes/rhd/actives/estival/phone/images/zhongj.png" width="100%" height="100%">'+
                        '<span class="huojiang">恭喜您获得<span>'+getarr[getnum]+'奖励</span>'+
                        '<img id="agin" src="/dyweb/dythemes/rhd/actives/estival/phone/images/agin.png">'+
                        '<img id="kan" src="/dyweb/dythemes/rhd/actives/estival/phone/images/kan.png">'+
                        '</div>',
                        shadeClose: false
                    });
                }


            });


    });



    //点击跳登录
    $('.dddd').on('tap',function(){
     rhdapi.login(function (r) {
         if (r.islogin == '1') {
             $('.dl1').show();
             $('.dl').hide();
         } else {
             $('.dl').show();
             $('.dl1').hide();
         }
     });
    });

    //立即投资
    $('.touzi').live("tap",function(){
        $('.layermbox').addClass('dis');
        rhdapi.gotoTender();
    });

    //点击关闭弹窗
    $('#close').live("tap",function(){
        $('.layermbox').addClass('dis');
        //location.reload();
    });
    //再砸一次
    $('#agin').live("tap",function(){
        $('.layermbox').addClass('dis');
        location.reload();
    });
    //立即查看
    $('#kan').live("tap",function(){
        window.location.href="/weixin/home.html#user/hongbao";
    });
    //立即获取
    $('#huoqu').live("tap",function(){
        $('.layermbox').addClass('dis');
        rhdapi.gotoTender();
    });
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
};




