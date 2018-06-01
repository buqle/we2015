var isread = 0;
var click = false;
//apiready = function () {
//    rhdapi.checklogin = function (callback) {
//        api.getPrefs({
//            key: 'token'
//        }, function(ret, err){
//            var retJ = {islogin:0};
//            if (ret.value != null && ret.value !=''){
//                retJ.islogin = 1;
//            }
//            callback && callback(retJ);
//        })
//    };
//    rhdapi.login = function( callback ){
//        openlogin(1);
//    };
//    rhdapi.gotoTender= function( callback) {
//        api.closeWin();
//    };
//    var _post = rhdapi.getPost;
//    rhdapi.getPost= function(data, callback){
//        api.getPrefs({
//            key: 'token'
//        }, function(ret, err){
//            var token =  "";
//            if (ret.value != null && ret.value !=''){
//                token = ret.value ;
//            }
//            data.token = token;
//            _post(data, callback);
//        })
//    };
//};


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
        if(islogin==1){
            //获取剩余抽奖次数
            setTimeout(function(){
                shengyu();
            },500);

            function shengyu(){
                rhdapi.getPost({
                    "query_site":"user",
                    "status":"0",
                    "q":"get_share_ajax",
                    //"token":"sdsdfs1111",
                    "methodname":"get_changce",
                    "alias":"actchristmas"
                },function(ret){
                    ret = ret.data;
                    if(ret.code==null){
                        var num = ret.data;
                        if(num==0){
                            $('.sd16').html("您没有抽奖机会，"+'<br/>'+"投资赚取抽奖机会");
                            $('.sd16').css({'line-height':'1rem'});
                            $('.sd16').on('tap',function(){
                                rhdapi.gotoTender();
                            })

                        }else{
                            $('.sd16').text('目前您还有'+num+'次抽奖机会');
                        }

                    }else if(ret.code==-1){
                        alert('登录超时');
                        rhdapi.login();
                    }
                },'json');
            }


            $('.sd14-1').swipeRight(function(){
                $('.sd14-1 img').removeClass('aaaa');
                $(this).addClass('sd14-2');
                $('.sd20').hide();
                $('.sd22').hide();
                rhdapi.getPost({
                    "query_site":"user",
                    "status":"0",
                    "q":"get_share_ajax",
                    //"token":"sdsdfs1111",
                    "methodname":"open_chest",
                    "alias":"actchristmas"
                },function(ret){
                    ret = ret.data;
                    if(ret.code==0){
                        openReward(ret.msg,ret.data);
                        shengyu();
                    }else if(ret.code==-1){
                            alert('登录超时');
                            rhdapi.login();
                    }else{
                        $('body').append(
                            '<div class="tanchaung"></div>'+
                            '<div class="box1">' +
                            '<img class="sdj1" src="/dyweb/dythemes/rhd/actives/actchristmas/phone/images/24.png">'+
                            '<img class="sdj2" src="/dyweb/dythemes/rhd/actives/actchristmas/phone/images/23.png">'+
                            '<img class="sdj4" src="/dyweb/dythemes/rhd/actives/actchristmas/phone/images/21.png">'+
                            '<div class="sdj3" style="text-align:center;">' +
                            '<p class="sdd1">很遗憾！您目前没有抽奖机会</p>'+
                            '<img class="sdd2" src="/dyweb/dythemes/rhd/actives/actchristmas/phone/images/25.png">'+
                            '</div>'+
                            '<div class="sdd3">去投资获取抽奖机会</div>'+
                            '</div>'
                        );

                        $('.sdd3').live('tap',function(){
                            rhdapi.gotoTender();
                        });
                    }
                },'json');
                setTimeout(function(){
                    $('.sd14-1 img').addClass('aaaa');
                    $('.sd14-1').removeClass('sd14-2');
                    $('.sd20').show();
                    $('.sd22').show();
                },2000);
            });


            //我的记录
            $('.sd17-1').on('tap',function(){
                rhdapi.getPost({
                    "query_site":"user",
                    "status":"0",
                    "q":"get_share_ajax",
                    //"token":"sdsdfs1111",
                    "methodname":"get_my_reward",
                    "alias":"actchristmas"
                },function(ret){
                    ret = ret.data;
                    if(ret.code==1){
                        var num1 =ret.msg;
                        var html1='',html2='',len=ret.data.length;
                        for(var i =0;i<len;i++){
                            html1+='<p><span>'+ret.data[i].remark+'</span></p>';
                            html2+='<p><span>'+ret.data[i].addtime+'</span></p>';
                        }
                        $('body').append(
                            '<div class="tanchaung"></div>'+
                            '<div class="box1">' +
                            '<img class="sdj1" src="/dyweb/dythemes/rhd/actives/actchristmas/phone/images/24.png">'+
                            '<img class="sdj2" src="/dyweb/dythemes/rhd/actives/actchristmas/phone/images/19.png">'+
                            '<img class="sdj4" src="/dyweb/dythemes/rhd/actives/actchristmas/phone/images/21.png">'+
                            '<div class="sdj5">' +
                            '<div class="sdj55">' +
                            '<p class="sdj8"><span class="sdj9">获得奖品</span><span>获得时间</span></p>'+
                            '<div class="sdj6">' +
                            '<div class="sdj7" id="jilu1">' +
                            '</div>'+
                            '<div class="sdj10"></div>'+
                            '<div class="sdj7" id="jilu2">' +
                            '</div>'+
                            '</div>' +
                            '</div>'+
                            '<p class="sdj13" style="display:none;">温馨提示：目前您还有<span class="sdj12">xx</span>次抽奖机会！</p>'+
                            '<p class="sdj13-1" style="display:none;">很遗憾！您目前没有抽奖机会</p>'+
                            '<p class="sdj13-2" style="display:none;">去投资获取抽奖机会>></p>'+
                            '</div>'+
                            '</div>'
                        );
                        if(num1==''){
                            $('.sdj13-1').show();
                            $('.sdj13-2').show();
                            $('.sdj13-2').on('tap',function(){
                                rhdapi.gotoTender();
                            })
                        }else{
                            $('.sdj13').show();
                            $('.sdj12').text(num1);
                        }

                        $('#jilu1').html(html1);
                        $('#jilu2').html(html2);

                    }else if(ret.code==-1){
                        alert('登录超时');
                        rhdapi.login();
                    }
                },'json')

            })



        }else{
            $('.sd16').text('登录查看我的抽奖机会');
            $('.sd16').on('tap',function(){
                rhdapi.login();
            });
            $('.sd17-1').on('tap',function(){
               alert('您还未登录！');
                rhdapi.login();
            });
            $('.sd14-1').swipeRight(function(){
                alert('您还未登录！');
                rhdapi.login();
            })
        }
    });


    //抽奖列表
    rhdapi.getPost({
        "query_site":"user",
        "status":"0",
        "q":"get_share_ajax",
        "methodname":"get_reward_list",
        "alias":"actchristmas"
    },function(ret){
        ret = ret.data;
        if(ret.code==null){
            var html='',len=ret.data.length;
            for(var i =0;i<len;i++){
                html+='<p><span class="sd11">'+ret.data[i].phone+'</span><span class="sd12">'+ret.data[i].remark+'</span><span class="sd11">'+ret.data[i].addtime+'</span></p>';
            }
            $('.sd10').html(html);
            var H = 0;
            var aa = setInterval(function(){
                //
                if(H*20>=$('.sd10').height()){
                    $('.sd10').css('marginTop','0rem');
                    $('.sd10').css({'transition':'margin-top 0.1s','-o-transition':'margin-top 0.1s','-webkit-transition':'margin-top 0.1s','-moz-transition':'margin-top 0.1s'});
                    H=0;
                }else{
                    $('.sd10').css({'transition':'margin-top 0.5s','-o-transition':'margin-top 0.5s','-webkit-transition':'margin-top 0.5s','-moz-transition':'margin-top 0.5s'});
                    $('.sd10').css('marginTop','-'+H+'rem');
                    H+=1.5;

                }
            },1000);

            localStorage.setItem('rewadList',JSON.stringify(ret.data));

        }else if(ret.code==-1){         //防止带token引起的登录超时
            var htmlss='';
            if(localStorage.getItem('rewadList') != null){
                var List = JSON.parse(localStorage.getItem('rewadList'));
                for(var i in List){
                    htmlss+='<p><span class="sd11">'+List[i].phone+'</span><span class="sd12">'+List[i].remark+'</span><span class="sd11">'+List[i].addtime+'</span></p>';
                }
                $('.sd10').html(htmlss);
                var H = 0;
                var aa = setInterval(function(){
                    if(H*20>=$('.sd10').height()){
                        $('.sd10').css('marginTop','0rem');
                        $('.sd10').css({'transition':'margin-top 0.1s','-o-transition':'margin-top 0.1s','-webkit-transition':'margin-top 0.1s','-moz-transition':'margin-top 0.1s'});
                        H=0;
                    }else{
                        $('.sd10').css({'transition':'margin-top 0.5s','-o-transition':'margin-top 0.5s','-webkit-transition':'margin-top 0.5s','-moz-transition':'margin-top 0.5s'});
                        $('.sd10').css('marginTop','-'+H+'rem');
                        H+=1.5;

                    }
                },1000);
            }

        }
    },'json');


    //活动规则
    $('.sd17-2').on('tap',function(){
        $('body').append(
            '<div class="tanchaung"></div>'+
            '<div class="box1">' +
                '<img class="sdj1" src="/dyweb/dythemes/rhd/actives/actchristmas/phone/images/24.png">'+
                '<img class="sdj2" src="/dyweb/dythemes/rhd/actives/actchristmas/phone/images/20.png">'+
                '<img class="sdj4" src="/dyweb/dythemes/rhd/actives/actchristmas/phone/images/21.png">'+
                '<div class="sdj3">' +
                    '<p>1、活动期间内每位用户单笔投资每满一万元（仅限3月标及以上）即有一次开礼盒机会！（举个例子：小明单笔投资125000元，将获得12次开礼盒机会。）</p>'+
                    '<p>2、卡券发放规则：用户所得流量、话费将在获得奖励后三个工作日内充入您的注册手机号中，具体到账时间以运营商到账时间为准；</p>'+
                    '<p>3、实物发放规则：实物奖励将在活动结束后七个工作日内安排发货（需在“我的红包—实物奖励”填写完整收货信息）；</p>'+
                    '<p>4、现金券发放规则：现金券奖励将在获得奖励后三个工作日内发放到您的汇付账户中，可投资，可提现。</p>'+
                '</div>'+
            '</div>'
        );
    });

    function openReward(num,text){
        $('body').append(
            '<div class="tanchaung"></div>'+
            '<div class="box1 box2">' +
            '<img class="sdj1 sdj1-1" src="/dyweb/dythemes/rhd/actives/actchristmas/phone/images/24.png">'+
            '<img class="sdj2" src="/dyweb/dythemes/rhd/actives/actchristmas/phone/images/23.png">'+
            '<img class="sdj4" src="/dyweb/dythemes/rhd/actives/actchristmas/phone/images/21.png">'+
            '<div class="sdj3" style="text-align:center;">' +
            '<p class="sdd1">开出好运！恭喜您获得<span class="sdd1-1">'+text+'</span>奖励！</p>'+
            '<div class="sdd4">' +
            '<div class="sdd4-1">' +
            '<div class="sdd4-2">' +
            '<img class="sdd5" src="">'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'
        );
        switch(num){
            case 0:
                $('.sdd5').attr('src','/dyweb/dythemes/rhd/actives/actchristmas/phone/images/11.png');
                break;
            case 1:
                $('.sdd5').attr('src','/dyweb/dythemes/rhd/actives/actchristmas/phone/images/16.png');
                break;
            case 2:
                $('.sdd5').attr('src','/dyweb/dythemes/rhd/actives/actchristmas/phone/images/10.png');
                break;
            case 3:
                $('.sdd5').attr('src','/dyweb/dythemes/rhd/actives/actchristmas/phone/images/14.png');
                break;
            case 4:
                $('.sdd5').attr('src','/dyweb/dythemes/rhd/actives/actchristmas/phone/images/13.png');
                break;
            case 5:
                $('.sdd5').attr('src','/dyweb/dythemes/rhd/actives/actchristmas/phone/images/8.png');
                break;
            case 6:
                $('.sdd5').attr('src','/dyweb/dythemes/rhd/actives/actchristmas/phone/images/7.png');
                break;

        }
    }

    //关闭弹窗
   $(document).on('tap',".xx",showShare);
    $('.sdj4').live('tap',showShare);
    function showShare(){
        $('.tanchaung').remove();
        $('.box1').remove();
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
