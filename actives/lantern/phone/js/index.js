var isread = 0;
var getnum = 0;
var click = false;
var baseurl="http://www.ronghedai.com/";
var texts = '';
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
        //判断当天是否为第一次抽奖
        if(islogin == 1){
            luckyDraw();

            //我的记录
            $('.lantern12').on('tap',function(){
                rhdapi.getPost({        //http://newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=lantern&methodname=get_my_reward
                    "query_site":"user",
                    "q":"get_share_ajax",
                    "alias":"lantern",
                    "methodname":"get_my_reward"
                },function(ret){
                    ret = ret.data;
                    if(ret.code==0){
                        var len = ret.data.length;
                        var rewards ='';
                        for(var i =0;i<len;i++){
                            rewards+='<p class="lantern20"><span>'+ret.data[i].remark+'</span><span>'+ret.data[i].addtime+'</span></p>';
                        }
                        $('body').append(
                            '<div class="tanchuang"></div>'+
                            '<div class="box">'+
                            '<img class="lantern15" src="/dyweb/dythemes/rhd/actives/lantern/phone/images/19.png"/>'+
                            '<img class="lantern22" src="/dyweb/dythemes/rhd/actives/lantern/phone/images/18.png"/>'+
                            '<div class="lantern16">'+
                            '<img class="lantern21" src="/dyweb/dythemes/rhd/actives/lantern/phone/images/12_01.png"/>'+
                            '<div class="lantern17"><span class="lantern18">获得奖品</span><span class="lantern18">获得时间</span></div>'+
                            '<div class="lantern19">'+
                            '<div class="lantern19-1">'+

                            '</div>'+
                            '</div>'+
                            '</div>'+

                            '</div>'
                        );

                        $('.lantern19-1').html(rewards);

                    }

                },'json')



            });

            //投资即享
            $('.lantern4').on('tap',function(){
                rhdapi.gotoTender();
            });

            //立即投资
            $('.lantern11').on('tap',function(){
                rhdapi.gotoTender();
            })
        }

        if(islogin == 0) {
            $("#lantern4").show();
            $("#lantern4").on('tap',function(){
                login();
            });

            //我的记录未登录
            $('.lantern12').on('tap', function () {
                login();
            });

            //投资即享未登录
            $('.lantern4').on('tap',function(){
                login();
            });

            //立即投资未登录
            $('.lantern11').on('tap',function(){
                login();
            });
        }
    });


    //是否去登录
    function login(){
        if(confirm('您还未登录，请先登录')){
            rhdapi.login();
        }else{

        }
    }


    //获取个人抽奖次数
    function luckyDraw(){           //http://newtrust.ronghedai.com/weixin /?user&q=get_share_ajax&alias=lantern&methodname=get_changce
        rhdapi.getPost({
            "query_site":"user",
            "q":"get_share_ajax",
            "alias":"lantern",
            "methodname":"get_changce"
        },function(ret){
                ret = ret.data;
                if(ret.code == 0){
                    if(ret.data == '0'){
                        $("#lantern2").show();
                        $("#lantern1").hide();
                    }else{
                        $("#lantern1").show();
                        $("#lantern2").hide();
                        $('.lantern7').text(ret.data);
                    }

                }else if(ret.code==-1){
                    if(confirm('登录超时，请重新登录！')){
                        rhdapi.login();
                    }else{
                        $("#lantern4").show();
                        $("#lantern4").on('tap',function(){
                            login();
                        });
                    }
                }
        },'json')
    }

    //投资赚取抽奖机会
    $('#lantern3').on('tap',function(){
        rhdapi.gotoTender();
    });


    setTimeout(function(){
        //实时榜单
        rhdapi.getPost({        //http://newtrust.ronghedai.com/weixin?user&q=get_share_ajax&alias=lantern&methodname=get_reward_list
            "query_site":"user",
            "q":"get_share_ajax",
            "alias":"lantern",
            "methodname":"get_reward_list",
            "token":""
        },function(ret){
            ret = ret.data;
            if(ret.code==0){
                var len = ret.data.length;
                var reward ='';
                for(var i =0;i<len;i++){
                    reward +='<p><span class="a6">'+ret.data[i].username+'</span><span class="a7">'+ret.data[i].remark+'</span><span class="a6">'+ret.data[i].addtime+'</span></p>'
                }
                $('#reward').html(reward);
                var H = 0;
                var shengyuH = len;
                var aa = setInterval(function(){

                    if(len >5){
                        if(shengyuH <=5 ){
                            $('#reward').css('marginTop','0rem');
                            $('#reward').css({'transition':'margin-top 0.1s','-o-transition':'margin-top 0.1s','-webkit-transition':'margin-top 0.1s','-moz-transition':'margin-top 0.1s'});
                            H=0;
                            shengyuH = len;
                        }else{
                            $('#reward').css({'transition':'margin-top 1s','-o-transition':'margin-top 1s','-webkit-transition':'margin-top 1s','-moz-transition':'margin-top 1s'});
                            $('#reward').css('marginTop','-'+H+'rem');
                            H+=1.2;
                            shengyuH--;
                        }
                    }

                },1500);
            }
        },'json');
    },500);



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


    //关闭弹窗
    $('.lantern22').live('tap',showShare);
    $('.lanterns7').live('tap',showShare);

    function showShare(){
        $('.tanchuang').remove();
        $('.box').remove();
    }


    var getarr=["","l1.png","nuan.png","xin.png","chun.png","he.png","qi.png","ying.png","men.png"];
    var getText=["","家融、心和、业兴、人美！","一年满是暖心事儿！","让您的新思想迸发新势力！","给自己一个微笑，让心如沐春光！","和大家，谐万事，谱华章！","运气、财气、和气，满身喜气！","今日有盈，仍需不忘初心！","跃龙门，开新门，门门精彩！",];

    //获得奖励弹窗
    function openChest(num,text){
        $('body').append(
            '<div class="tanchuang"></div>'+
            '<div class="box">'+
            '<div class="lanterns1">' +
            '<img class="lanterns2" src="/dyweb/dythemes/rhd/actives/lantern/phone/images/13.png"/>'+
            '<div class="lanterns3">' +
            '<img class="lanterns4" src="/dyweb/dythemes/rhd/actives/lantern/phone/images/'+getarr[num]+'"/>'+
            '<p class="lanterns5">'+getText[num]+'</p>'+
            '<p class="lanterns5">—为祝福加财气—</p>'+
            '</div>'+
            '<div class="lanterns6">恭喜您获得'+text+'奖励！</div>'+
            '<div class="lanterns7"></div>'+

            '</div>'+

            '</div>'
        );
    }

    //无抽奖机会弹窗
    function noChange(){
        $('body').append(
            '<div class="tanchuang"></div>'+
            '<div class="box">'+
            '<div class="lanterns1">' +
            '<img class="lanterns2" src="/dyweb/dythemes/rhd/actives/lantern/phone/images/12.png"/>'+
            '<div class="lanterns3">' +
            '<p class="lanterns5" style="padding-top:3rem;">很遗憾，您目前没有猜灯谜机会。</p>'+
            '<p class="lanterns5" id="lanterns5" style="padding-top:1rem;color:#C71A25;font-size:0.6rem;">去投资获取机会>></p>'+
            '</div>'+
            '<div class="lanterns7"></div>'+

            '</div>'+

            '</div>'
        );
    }

    $('#lanterns5').live('tap',function(){
        rhdapi.gotoTender();
    });

    function roll(){
        lottery.times += 1;
        lottery.roll();
        if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index+1) {
            //console.log(lottery.times +'-----'+ lottery.cycle+10 +'--'+ lottery.prize +'----'+lottery.index);
            clearTimeout(lottery.timer);
            lottery.prize=0;
            lottery.times=0;
            click=false;
            setTimeout(function(){
                openChest(getnum,texts);
                $("#lottery div.col").removeClass("col_active");
                luckyDraw();
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
    function getLuck(){
        rhdapi.getPost({        //http://newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=lantern&methodname=open_chest
            "query_site":"user",
            "q":"get_share_ajax",
            "alias":"lantern",
            "methodname":"open_chest"
        },function(ret){
            ret = ret.data;
            if(ret.code==0){
                var Lucky = ret.msg;
                texts = ret.data;
                switch(Lucky){
                    case 1:
                        getnum =1;
                        start();
                        break;
                    case 2:
                        getnum =2;
                        start();
                        break;
                    case 3:
                        getnum =3;
                        start();
                        break;
                    case 4:
                        getnum =4;
                        start();
                        break;
                    case 5:
                        getnum =5;
                        start();
                        break;
                    case 6:
                        getnum =6;
                        start();
                        break;
                    case 7:
                        getnum =7;
                        start();
                        break;
                    case 8:
                        getnum =8;
                        start();
                        break;
                }
            }else if(ret.code==-1){
                alert('登录超时！');
                login();
            }else if(ret.code ==1){
                if(ret.msg=="没有抽奖次数"){
                    noChange();
                }else{
                    alert(ret.msg);
                }

            }
        },'json');


    }
//立即抽奖

    var click=false;
    var start = null;
    $(function(){
        lottery.init('lottery');
        start = function () {
            if (click) {
                return false;
            } else {
                lottery.speed = 100;
                roll();
                click = true;
                return false;
            }
        };
        $(".ljcj").on('tap',function() {
            rhdapi.checklogin(function (s) {
                islogin = s.islogin;
                if (islogin == '0') {
                    login();
                    return false;
                }
                getLuck();
            });
        });
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


