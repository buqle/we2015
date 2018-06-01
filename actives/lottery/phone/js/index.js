var isread = 0;
var getnum = 0;
var click = false;
var baseurl="http://www.ronghedai.com/";
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
            nowIntergal();
        }

        if(islogin == 0){
            $("#dlck").html('登录即可查看');
        }
    });



    //fanhui
    $('.fanhuiaaa').on('tap',function(){
        window.history.go(-1);
    });

    setTimeout(function(){
        //实时中奖记录
        rhdapi.getPost({
            "query_site":"user",
            "q":"appnew",
            "type":"get_reward_list",
        },function(ret){
            ret = ret.data;
            if(ret.code==0){
                var len = ret.data.data.length;
                var reward ='';
                for(var i =0;i<len;i++){
                    reward +='<p><span class="a6">'+ret.data.data[i].username+'</span><span class="a7">'+ret.data.data[i].name+'</span><span class="a6">'+getday(ret.data.data[i].addtime)+'</span></p>'
                }
                $('#numm').html(ret.data.total);
                $('#reward').html(reward);
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

    //当前积分
    function nowIntergal(){
        rhdapi.getPost({
            "query_site":"user",
            "q":"appnew",
            "type":"get_one_reward",
        },function(ret){
            alert(ret);
            ret = ret.data;
            if(ret.code==0){
                if(ret.data.check == 1){
                    $("#B").show();
                    $('#A').html('抽奖');
                    $("#A").addClass('p-first-child1-2').removeClass('p-first-child1-1');
                }
                $("#dlck").html(ret.data.integral);
            }
        },'json');
    }

    //当前中奖人次
    function getRewardsNum(){
        rhdapi.getPost({
            "query_site":"user",
            "q":"appnew",
            "type":"get_reward_list",
        },function(ret){
            ret = ret.data;
            if(ret.code==0){
                $('#numm').html(ret.data.total);
            }
        },'json');
    }

    /**
     *
     * num 0:实物弹窗   index 0：华为手机  1：鼠标
     * num 1：非中奖弹窗  index 0：谢谢参与  1：积分不足
     * num 3：非实物中奖弹窗
     */
    function tanchuang(num,index){
        switch(num){
            case 0:
                $('body').append(
                    '<div class="tanchuang"></div>'+
                    '<div class="box">'+
                    '<img class="c55" src="/dyweb/dythemes/rhd/actives/lottery/phone/images/11032.png"/>'+
                    '<div class="c8"><div class="c4-1">恭喜您，抽中'+getarr[getnum]+'</div></div>'+
                    '<div class="c66666">'+
                    '<div class="c66">'+
                    '<img style="display:none" id="L1" src="/dyweb/dythemes/rhd/actives/lottery/phone/images/11041.png"/>'+
                    '<img style="display:none" id="L2" src="/dyweb/dythemes/rhd/actives/lottery/phone/images/shubiao.png"/>'+
                    '</div>'+
                    '</div>'+
                    '<div class="c3-1 c33-1" id="L7">添加收获地址</div>'+
                    '</div>'
                );
                if(index == 0){
                    $("#L1").show();
                }else{
                    $("#L2").show();
                }
                $("#lottery div.col").removeClass("col_active");
                nowIntergal();
                getRewardsNum();
                break;
            case 1:
                $('body').append(
                    '<div class="tanchuang"></div>'+
                    '<div class="c2">'+
                    '<p class="c4-22" id="L3">谢谢参与，继续努力~</p>'+
                    '<img class="c5-1" src="/dyweb/dythemes/rhd/actives/lottery/phone/images/11031.png"/>'+
                    '<div style="display:none" id="L4" class="c3-1">我知道了</div>'+
                    '<div style="display:none" id="L5" class="c3-1">获取积分</div>'+
                    '</div>'
                );
                if(index==0){
                    $("#L3").html('谢谢参与，继续努力~');
                    $("#L4").show();
                }else{
                    $("#L3").html('很遗憾，您的积分不足！');
                    $("#L5").show();
                }
                $("#lottery div.col").removeClass("col_active");
                nowIntergal();
                break;
            case 3:
                $('body').append(
                    '<div class="tanchuang"></div>'+
                    '<div class="c2">'+
                    '<div class="c4-1" style="text-align: center;padding-top: 2rem;margin: 0 auto;width: 8rem;">恭喜您，抽中'+getarr[getnum]+'</div>'+
                    '<div class="c3-1" id="L6">我知道了</div>'+
                    '</div>'
                );
                $("#lottery div.col").removeClass("col_active");
                nowIntergal();
                getRewardsNum();
                break;
        }
    }

    //关闭弹窗

    $("#L4").live('tap',showShare); //我知道了
    $('#L6').live('tap',showShare);//我知道了
    function showShare(){
        $('.tanchuang').remove();
        $('.c2').remove();
    }

    //添加收货地址

    $('#L7').live('tap',function(){
        //跳转到addshouhuo
        //window.location.href='http://www.ronghedai.com/newwx/home.html#/user/shouhuo';
        window.open('http://www.ronghedai.com/newwx/home.html#/user/shouhuo',"_top");
    });

    //如何获取积分
    $('#L5').live('tap',function(){
        //window.location.href='http://www.ronghedai.com/newwx/home.html#/qiandao/shopdescription';
        window.open('http://www.ronghedai.com/newwx/home.html#/qiandao/shopdescription',"_top");
    });

    var getarr=["","华为4G手机","40积分","100元投资红包","80积分","雷柏无线鼠标","50元投资红包","谢谢参与","160积分"];
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
                if(getnum==1){
                    tanchuang(0,0);
                }else if(getnum==5){
                    tanchuang(0,1);
                }else if(getnum == 7 ){
                    tanchuang(1,0);
                }else if(getnum==10){
                    tanchuang(1,1);
                }else{
                    tanchuang(3,0);
                }

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
        rhdapi.getPost({
            "query_site":"user",
            "q":"appnew",
            "type":"get_reward"
        },function(ret){
            ret = ret.data;
            if(ret.code==0){
                var Lucky = ret.data.lucky;
                switch(Lucky){
                    case 0:
                        alert('参数错误');
                        break;
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
                    case 10:
                        getnum = 10;
                        break;
                    case 11:
                        alert('抽奖失败');
                        break;
                }
            }else if(ret.code=="-1"){
                alert('登录超时！');
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
                    alert('您还未登录，请先登录！');
                    rhdapi.login();
                    return false;
                }
                getLuck();
                //alert("系统正在调试，请稍后重试！");
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


