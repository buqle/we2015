var isread = 0;
var click = false;
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

ready = function(){
    if (isread == 1) {
        return false;
    }
    isread = 1;

    var islogin = 0;
    if (typeof api === 'object') {

    }
    rhdapi.checklogin(function(s){
        islogin = s.islogin;
    });

    //立即投资
    $('.Touzi').on('tap',function(){
        rhdapi.gotoTender();
    });

    //立即兑换
    $('.Duihuan').on('tap',function(num){
        num = $(this).attr('id');
        if (islogin == '0') {
            denglu();
            return false;
        }
        if(click){
            return;
        }
        click = true;

            rhdapi.getPost(    //  /weixin/?user&q=get_share_ajax&alias=autumn&methodname=exchangeCheck&reward_key=2
                {
                    "query_site":"user",
                    "q":"get_share_ajax",
                    "alias":"autumns",
                    "methodname":"exchangeCheck",
                    "reward_key":num
                },
                function(ret){
                    ret = ret.data;
                    click = false;
                    if(ret.code == 0){
                        $("body").append('<div class="tanchuang"></div>'+
                            '<div class="tc-box tc-box-01">'+
                            '<img class="xx" src="/dyweb/dythemes/rhd/actives/autumns/phone/images/x.png">'+
                            '<img class="uu" src="/dyweb/dythemes/rhd/actives/autumns/phone/images/ss.png">'+
                            '<div class="tt"></div>'+
                            '<p class="tt-txt">你是否确认兑换此商品？</p>'+
                            '<div class="yy"><div class="yes left">是</div><div class="no right">否</div></div>' +
                            '<div class="tt-bt">立即查看</div>'+
                            '</div>');

                        $('.yes').die().live('tap',function(){      //是
                            if(click){
                                return;
                            }
                            click = true;
                            rhdapi.getPost(    //  /weixin/?user&q=get_share_ajax&alias=autumn&methodname=exchangeReward&reward_key=2
                                {
                                    "query_site":"user",
                                    "q":"get_share_ajax",
                                    "alias":"autumns",
                                    "methodname":"exchangeReward",
                                    "reward_key":num
                                },
                                function(ret){
                                    click=false;
                                    if(ret.code==0){
                                        $('.tt-txt').addClass('tt-txt1').text('您已兑换成功！请前往个人中心查看或填写实物收货地址。如有疑问，可联系您的专属客服。');
                                        $('.yy').hide();
                                        $('.tt-bt').show();
                                    }else{
                                        return;
                                    }
                                })
                        });
                    }else if(ret.code == 1){
                        $("body").append('<div class="tanchuang"></div>'+
                            '<div class="tc-box tc-box-01">'+
                            '<img class="xx" src="/dyweb/dythemes/rhd/actives/autumns/phone/images/x.png">'+
                            '<img class="uu" src="/dyweb/dythemes/rhd/actives/autumns/phone/images/ss.png">'+
                            '<div class="tt"></div>'+
                            '<p class="tt-txt tt-txt1">您目前的金叶子尚不足兑换该商品，快去赚金叶拿心仪奖品吧！</p>'+
                            '<div class="tt-bt1">立即去赚</div>'+
                            '</div>');
                    }else{
                        alert(ret.msg);
                    }
                });
    });

    //立即查看
    $('.tt-bt').live('tap',function(){
        window.location.href='/weixin/home.html#user';
    });

    //立即去赚
    $('.tt-bt1').live('tap',function(){
        rhdapi.gotoTender();
    });

    //首页目前金叶子数量(我的投资记录)
    if (islogin == '0') {
    }else{
        rhdapi.getPost({
            "query_site":"user",
            "q":"get_share_ajax",
            "alias":"autumns",
            "methodname":"get_mytender",
        },function(ret){
            ret = ret.data;
            if(ret.code == '0'){
                var Num = ret.total;
                $("#jinyezi").text(Num);
            }else{
                alert(ret.msg);
            }
        });
    }



    //实时兑奖记录
    rhdapi.getPost(    // weixin/?user&q=get_share_ajax&alias=autumn&methodname=get_newly
        {
            "query_site":"user",
            "q":"get_share_ajax",
            "alias":"autumns",
            "methodname":"get_newly"
        },
        function(ret){
            ret = ret.data;
            if(ret.code == 0 || ret.code == -1){
                var duijiang = '';
                var len = ret.data.length;
                for(var i=0;i<len;i++){
                    duijiang+='<p><span>'+ret.data[i].username+'</span><span>'+ret.data[i].reward+'</span><span>'+getday(ret.data[i].addtime)+'</span></p>';
                }
                $("#duijiang").html(duijiang);
            }else {
                    alert(ret.msg);
            }

        });

   //我的投资记录
    $('.touzi').on('tap',function(){
        if (islogin == '0') {
            denglu();
            return false;
        }

        if(click){
            return;
        }
        click = true;

        rhdapi.getPost(    //weixin/?user&q=get_share_ajax&alias=autumn&methodname=get_mytender
            {
                "query_site":"user",
                "q":"get_share_ajax",
                "alias":"autumns",
                "methodname":"get_mytender",
            },
            function(ret){
                ret = ret.data;
                click = false;
                if(ret.code == 0){
                    var num = ret.total;
                    $("body").append('<div class="tanchuang"></div>'+
                        '<div class="tc-box">'+
                        '<img class="xx" src="/dyweb/dythemes/rhd/actives/autumns/phone/images/xx.png">'+
                        '<div class="liip_s liip_s1">'+
                        '<div class="header"><img class="img6" src="/dyweb/dythemes/rhd/actives/autumns/phone/images/11.png"></div>'+
                        '<div class="heads heads-01"><span>投资时间</span><span>标的时长</span><span>投资金额/元</span><span>所得金叶子</span></div>'+
                        '<div class="dl1">'+
                        '<div class="lun-slilld lun-slilld-01" id="touzi">'+
                        '</div></div>' +
                        '<p class="rr">你目前的金叶子：<span class="shulixang">'+num+'</span>片</p>'+
                        '</div>'+
                        '</div>');

                    var touzi = '';
                    var len = ret.data.length;
                    for(var i=0;i<len;i++){
                        touzi+='<p><span>'+getday(ret.data[i].addtime)+'</span><span>'+ret.data[i].period+'</span><span>'+ret.data[i].account+'</span><span>'+ret.data[i].leaf+'</span></p>';
                    }
                    $("#touzi").html(touzi);

                }else {
                    alert(ret.msg);
                }

            });

    });
    //我的兑换记录
    $('.duihuan').on('tap',function(){
        if (islogin == '0') {
            denglu();
            return false;
        }
        if(click){
            return;
        }
        click = true;
        rhdapi.getPost(    //weixin/?user&q=get_share_ajax&alias=autumn&methodname=get_myreward
            {
                "query_site":"user",
                "q":"get_share_ajax",
                "alias":"autumns",
                "methodname":"get_myreward"
            },
            function(ret){
                ret = ret.data;
                click = false;
                if(ret.code == 0){
                    var num =ret.total;
                    $("body").append('<div class="tanchuang"></div>'+
                        '<div class="tc-box">'+
                        '<img class="xx" src="/dyweb/dythemes/rhd/actives/autumns/phone/images/xx.png">'+
                        '<div class="liip_s liip_s1">'+
                        '<div class="header"><img class="img6" src="/dyweb/dythemes/rhd/actives/autumns/phone/images/12.png"></div>'+
                        '<div class="heads"><span>兑换商品</span><span>兑换时间</span><span>所用金叶子</span></div>'+
                        '<div class="dl1">'+
                        '<div class="lun-slilld" id="myduihuan">'+
                        '</div></div>' +
                        '<p class="rr">你目前的金叶子:<span class="sl">'+num+'</span>片</p>'+
                        '</div>'+
                        '</div>');

                    var myduihuan = '';
                    var len = ret.data.length;
                    for(var i=0;i<len;i++){
                        myduihuan+='<p><span>'+getday(ret.data[i].addtime)+'</span><span>'+ret.data[i].reward+'</span><span>'+ret.data[i].leaf+'</span></p>';
                    }
                    $("#myduihuan").html(myduihuan);

                }else {
                    alert(ret.msg);
                }

            });
    });


    function denglu(){
        $("body").append('<div class="tanchuang"></div>'+
            '<div class="tc-box tc-box-01">'+
            '<img class="xx" src="/dyweb/dythemes/rhd/actives/autumns/phone/images/x.png">'+
            '<div class="tt"></div>'+
            '<p class="tt-txt">您还没有登录,请先登录！</p>'+
            '<div class="yy"><div class="yess left">是</div><div class="no right">否</div></div>' +
            '</div>');
        $('.yess').on('tap',function(){
            rhdapi.login();
        });
    }
    //关闭弹窗
   $(document).on('tap',".xx",showShare);
    $('.no').live('tap',showShare);
    function showShare(){
        $('.tanchuang').remove();
        $('.tc-box').remove();
    }

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
