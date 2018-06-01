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

    //满就送Top10
    rhdapi.getPost(    // weixin/?user&q=get_share_ajax&alias=million&methodname=get_tops
        {
            "query_site":"user",
            "q":"get_share_ajax",
            "alias":"million",
            "methodname":"get_tops"
        },
        function(ret){
            ret = ret.data;
            if(ret.code == 0 || ret.code == -1){
                var top10 = '';
                var len = ret.data.length;
                for(var i=0;i<len;i++){
                    var num = i+1;
                    top10+='<p><span style="width:20%;">'+num+'</span><span style="width:30%;">'+ret.data[i].username+'</span><span>'+ret.data[i].prizes+'</span><span>'+ret.data[i].addtime+'</span></p>';
                }
                $("#top10").html(top10);
            }else {
                alert(ret.msg);
            }

        });

    // 实时投资榜
    rhdapi.getPost(    // weixin/?user&q=get_share_ajax&alias=million&methodname=get_newly
        {
            "query_site":"user",
            "q":"get_share_ajax",
            "alias":"million",
            "methodname":"get_newly"
        },
        function(ret){
            ret = ret.data;
            if(ret.code == 1 || ret.code == -1){
                var Touzi = '';
                var len = ret.data.length;
                for(var i=0;i<len;i++){
                    Touzi+='<p><span>'+ret.data[i].username+'</span><span>'+ret.data[i].tender+'</span><span>'+ret.data[i].month+'</span><span>'+ret.data[i].addtime+'</span></p>';
                }
                $("#Touzi").html(Touzi);
            }else {
                alert(ret.msg);
            }

        });

    //满就送我的获奖记录
    $('.Jilu').on('tap',function(){
        if (islogin == '0') {
            denglu();
            return false;
        }

        if(click){
            return;
        }
        click = true;

        rhdapi.getPost(    //weixin/?user&q=get_share_ajax&alias=million&methodname=get_myreward
            {
                "query_site":"user",
                "q":"get_share_ajax",
                "alias":"million",
                "methodname":"get_myreward",
            },
            function(ret){
                ret = ret.data;
                click = false;
                if(ret.code == 0){
                    $("body").append('<div class="tanchuang"></div>'+
                        '<div class="tc-box">'+
                        '<img class="xx" src="/dyweb/dythemes/rhd/actives/million/phone/images/close.png">'+
                        '<div class="wwj"><img class="imjl" src="/dyweb/dythemes/rhd/actives/million/phone/images/jilu1_03.png"></div>'+
                        '<div class="wdjl">'+
                        '<div class="wdjl22">'+
                        '<div class="wwj"><p><span style="width:19.3%;">标的种类</span><span style="width:39.9%;">当前累计投资金额</span><span style="width:40%;border:none;">当前可得现金奖励</span></p></div>'+
                        '<div class="jilku">' +
                        '<p><span style="width:19.3%;">6月标</span><span class="b61" style="width:39.9%;"></span><span class="b62" style="width:40%;border:none;"></span></p>' +
                        '<p><span style="width:19.3%;">12月标</span><span class="b121" style="width:39.9%;"></span><span class="b122" style="width:40%;border:none;"></span></p>' +
                        '<p class="hfhghg" style="text-align:right;border:none;"></p>' +
                        '</div></div>'+
                        '</div>'+
                        '</div>');
                    var total = ret.data.total;
                    $('.b61').text(ret.data[6].tender+'元');
                    $('.b62').text(ret.data[6].reward+'元');
                    $('.b121').text(ret.data[12].tender+'元');
                    $('.b122').text(ret.data[12].reward+'元');

                    $('.hfhghg').text('累计获得奖励：'+total+'元');

                }else {
                    alert(ret.msg);
                }

            });

    });

    function denglu(){
        $("body").append('<div class="tanchuang"></div>'+
            '<div class="tc-box tc-box-01">'+
            '<img class="xx" src="/dyweb/dythemes/rhd/actives/million/phone/images/close.png">'+
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
