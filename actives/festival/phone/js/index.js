var isread = 0;
ready = function(){
    if (isread == 1) {
        return false;
    }
    isread = 1;

    var islogin = 0;
    if (typeof api === 'object') {

    }
    chouNums();

    rhdapi.checklogin(function(s){
        islogin = s.islogin;
        if(islogin == 1){
            //立即投资
            setTimeout(function(){
                checkchance();
            },500);

            //获得花数
            setTimeout(function(){
                getFlower();
            },500);


            //立即抽奖
            $('.choujiang').on('click',function(){
                $('.numss').text('0');
                getLevel();  //抽奖
            });

            //立即投资
            $('.ljtz').live('click',function(){
                var date = new Date().getTime()/1000;
                if($(this).attr('class').indexOf('litz1')>-1){
                    if(date>1494864000){
                        getRewards(2,'活动已经结束');
                    }else{
                        rhdapi.gotoTender();
                    }
                }else{
                    rhdapi.gotoTender();
                }
            });

             //母亲节个人投资记录http://newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=mother&methodname=get_self_reward
            $('#mother').on('click',function(){
                rhdapi.getPost({
                    "query_site":"user",
                    "q":"get_share_ajax",
                    "alias":"mother",
                    "methodname":"get_self_reward"
                },function(ret){
                    ret = ret.data;
                    if(ret.code == 0){
                        var motherHtml='',len=ret.data.length;
                        for(var i=0;i<len;i++){
                            motherHtml +='<p><span>'+ret.data[i].flower+'</span><span>'+ret.data[i].num+'</span><span class="tc7">'+ret.data[i].money+'</span><span>'+ret.data[i].reward+'</span></p>'
                        }
                        motherPopup();
                        $('.tc8').show();
                        $('.tc9').html(motherHtml);
                        scroll();
                        $('.mothers1').text(ret.total);
                        $('.mothers2').text(ret.level);
                    }else if(ret.code == -1){
                        $('.mt1').text('用户');
                        login('登录超时,是否去登录');
                    }
                })
            });

            //端午节：http://newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=boat&methodname=get_self_reward
            $('.fs35s').on('click',function(){
                rhdapi.getPost({
                    "query_site":"user",
                    "q":"get_share_ajax",
                    "alias":"boat",
                    "methodname":"get_self_reward"
                },function(ret){
                    ret = ret.data;
                    if(ret.code == 0){
                        var boatHtml ='';
                        boatHtml += '<p><span>3月标</span><span>'+ret.data[3].times+'</span><span>'+ret.data[3].tender+'</span></p>';
                        boatHtml += '<p><span>6月标</span><span>'+ret.data[6].times+'</span><span>'+ret.data[6].tender+'</span></p>';
                        boatHtml += '<p><span>12月标</span><span>'+ret.data[12].times+'</span><span>'+ret.data[12].tender+'</span></p>';
                        boatPopup();
                        $('.tc8').show();
                        $('.tc9').html(boatHtml);
                        $('.mothers1').text(ret.total);
                        $('.mothers2').text(ret.level);
                    }else if(ret.code==-1){
                        login('登录超时,是否去登录');
                    }
                })
            });

            //加息：http://newtrust.ronghedai.com/?user&q=get_share_ajax&alias=jiaxi&methodname=getmylist
            $('#jiaxi').on('click',function(){
                rhdapi.getPost({
                    "query_site":"user",
                    "q":"get_share_ajax",
                    "alias":"jiaxi",
                    "methodname":"getmylist"
                },function(ret){
                    ret = ret.data;
                    if(ret.code == 0){
                        var jaixiHtml ='',len=ret.data.length;
                        for(var i =0;i<len;i++){
                            jaixiHtml += '<p><span class="tc7">'+ret.data[i].name+'</span><span class="tc7s">'+ret.data[i].nub+'</span><span class="tc7ss">'+ret.data[i].account+'</span><span class="tc7sss">'+ret.data[i].reward+'</span></p>';
                        }
                        tenderPopup();
                        $('.tc8').show();
                        $('.tc9').html(jaixiHtml);
                        scroll();
                        $('.mothers1').text(ret.total);
                        $('.mothers2').text(ret.level);
                    }else if(ret.code ==-1){
                        login('登录超时,是否去登录');
                    }
                },'json')
            })
        }

        if(islogin == 0) {

            //立即投资
            $('.ljtz').on('click',function(){
                login('你还未登录，是否去登录？');
            });

            //立即抽奖
            $('.choujiang').on('click',function(){
                login('你还未登录，是否去登录？');
            });

            //端午
            $('.fs35s').on('click',function(){
                boatPopup();
                $('.tc8s').show();
                $('.tc66').hide();
            });

            //母亲
            $('#mother').on('click',function(){
                motherPopup();
                $('.tc8s').show();
                $('.tc66').hide();
            });

            //加息
            $('#jiaxi').on('click',function(){
                tenderPopup();
                $('.tc8s').show();
                $('.tc66').hide();
            });

            //用户名
            $('.mt1').text('用户');

            //抽奖机会
            $('.change').html('登录即可查看您的抽奖机会');
        }
    });

    function chouNums(){
        //目前抽奖人数:http://newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=festival&methodname=get_newly
        rhdapi.getPost({
            "query_site":"user",
            "q":"get_share_ajax",
            "alias":"festival",
            "methodname":"get_newly",
        },function(ret){
            ret = ret.data;
            if(ret.code==0){
                $('.nums').text(ret.total);
            }

        },'json');
    }
    //用户剩余机会
    function checkchance(){
        //http://newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=festival&methodname=checkchance
        rhdapi.getPost({
            "query_site":"user",
            "q":"get_share_ajax",
            "alias":"festival",
            "methodname":"checkchance",
        },function(ret){
            ret = ret.data;
            if(ret.code == 0){
                $('.numss').text('1');
            }
        },'json')
    }

    //转盘转动
    function routes(animateTo,text){
        $('.routes').rotate({
            angle:0,
            animateTo:animateTo,
            duration:5000,
            callback:function(){
                getRewards(1,text);
            }
        })
    }

    //获取奖等级
    function getLevel(){
        //518活动之乐抽奖:newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=festival&methodname=get_reward
       rhdapi.getPost({
           "query_site":"user",
           "q":"get_share_ajax",
           "alias":"festival",
           "methodname":"get_reward",
       },function(ret){
           ret = ret.data;
           if(ret.code==0){
               var level = Number(ret.msg);
               var num = 2880;
               switch (level){
                   case 0:
                       num = 3038;
                       routes(num,ret.data);
                       chouNums();//目前抽奖人次
                       break;
                   case 1:
                       num = 3125;
                       routes(num,ret.data);
                       chouNums();//目前抽奖人次
                       break;
                   case 2:
                       num=2948;
                       routes(num,ret.data);
                       chouNums();//目前抽奖人次
                       break;
                   case 3:
                       num = 3215;
                       routes(num,ret.data);
                       chouNums();//目前抽奖人次
                       break;
                   case 4:
                       num = 2992;
                       routes(num,ret.data);
                       chouNums();//目前抽奖人次
                       break;
                   case 5:
                       num = 3170;
                       routes(num,ret.data);
                       chouNums();//目前抽奖人次
                       break;
                   case 6:
                       num = 3080;
                       routes(num,ret.data);
                       chouNums();//目前抽奖人次
                       break;
                   case 7:
                       num = 2903;
                       routes(num,ret.data);
                       chouNums();//目前抽奖人次
                       break;
               }
           }else if(ret.code == 12){
               getRewards(2,ret.msg);
           }else if(ret.code==-1){
               login('登录超时,是否去登录');
           }else if(ret.code == 11){
               alert(ret.msg);
           }else if(ret.code == 13){
               getRewards(0,'');
           }else if(ret.code == 2){
               getRewards(2,ret.msg);
           }

       },'json');


    }

    //抽奖弹窗
    function getRewards(num,text){
        if(num == 1){
            $('body').append(
                '<div class="tanchuang"></div>'+
                '<div class="box box1">'+
                '<div class="cj1"><img class="cj6" src="/dyweb/dythemes/rhd/actives/festival/phone/images/cj2.png"></div>'+
                '<div class="cj2">' +
                '<img class="cj3" src="/dyweb/dythemes/rhd/actives/festival/phone/images/cj1.png">'+
                '<div class="cj4">' +
                '<p>恭喜您获得</p>'+
                '<p class="cj5">'+text+'</p>'+
                '</div>'+
                '</div>'+
                '</div>'
            );
        }else if(num == 0){
            $('body').append(
                '<div class="tanchuang"></div>'+
                '<div class="box box1">'+
                '<div class="cj1"><img class="cj6" src="/dyweb/dythemes/rhd/actives/festival/phone/images/cj2.png"></div>'+
                '<div class="cj2">' +
                '<img class="cj3" src="/dyweb/dythemes/rhd/actives/festival/phone/images/cj1.png">'+
                '<div class="cj4">' +
                '<p class="getchange">获得抽奖机会<span style="color:#F79A53;">《《《</span></p>'+
                '</div>'+
                '</div>'+
                '</div>'
            );
        }else if(num == 2){
            $('body').append(
                '<div class="tanchuang"></div>'+
                '<div class="box box1">'+
                '<div class="cj1"><img class="cj6" src="/dyweb/dythemes/rhd/actives/festival/phone/images/cj2.png"></div>'+
                '<div class="cj2">' +
                '<img class="cj3" src="/dyweb/dythemes/rhd/actives/festival/phone/images/cj1.png">'+
                '<div class="cj4">' +
                '<p class="getchange">'+text+'</p>'+
                '</div>'+
                '</div>'+
                '</div>'
            );
        }

        $('.getchange').live('click',function(){
            rhdapi.gotoTender();
        })
    }


    //获得的花数：http://newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=mother&methodname=my_reward
    function getFlower(){
        rhdapi.getPost({
            "query_site":"user",
            "q":"get_share_ajax",
            "alias":"mother",
            "methodname":"my_reward",
        },function(ret){
            ret = ret.data;
            if(ret.code == 0){
                $('.mt1').text(ret.data.username);
                $('.mt2').text(ret.data[3]);
                $('.mt3').text(ret.data[6]);
                $('.mt4').text(ret.data[12]);
            }else if(ret.code == -1){
                $('.mt1').text('用户');
            }
        },'json');
    }


    //母亲节我的记录弹窗
    function motherPopup(){
        $('body').append(
            '<div class="tanchuang"></div>'+
            '<div class="box">'+
                '<div class="tc1">' +
                    '<div class="tc2">' +
                        '<img class="close" src="/dyweb/dythemes/rhd/actives/festival/phone/images/close.png">'+
                        '<div class="tc3">我的记录</div>'+
                        '<div class="tc4">' +
                            '<div class="tc5">' +
                                '<div style="clear:both;"></div>'+
                                '<div class="tc6"><span>鲜花种类</span><span>鲜花数量</span><span class="tc7">投资金额/元</span><span>获得奖励</span></div>'+
                                '<div class="tc8" style="display:none;">' +
                                    '<div class="tc9">' +

                                    '</div>'+
                                '</div>'+
                                '<div class="tc8s" style="display:none;">' +
                                '<div class="tc11">立即登录</div>'+
                                '</div>'+
                                '<div class="tc6 tc66">累计投资总额：<i class="mothers1">0</i>(元)</div>'+
                                '<div class="tc6 tc66">累计获得奖励：<i class="mothers2">0</i>(元)</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        )
    }

    //端午节我的记录弹窗
    function boatPopup(){
        $('body').append(
            '<div class="tanchuang"></div>'+
            '<div class="box" style="width:15rem;height:11.5rem;left:50%;top:50%;margin-left:-7.5rem;margin-top:-5.75rem;">'+
            '<div class="tc1 tc1s">' +
            '<div class="tc2">' +
            '<img class="close" src="/dyweb/dythemes/rhd/actives/festival/phone/images/close.png">'+
            '<div class="tc3">我的记录</div>'+
            '<div class="tc4">' +
            '<div class="tc5">' +
            '<div style="clear:both;"></div>'+
            '<div class="tc6"><span>月标种类</span><span>投资笔数/笔</span><span>投资金额/元</span></div>'+
            '<div class="tc8" style="display:none;">' +
                '<div class="tc9">' +

                '</div>'+
            '</div>'+
            '<div class="tc8s" style="display:none;">' +
            '<div class="tc11">立即登录</div>'+
            '</div>'+
            '<div class="tc6 tc66">累计投资总额：<i class="mothers1">0</i>(元)</div>'+
            '<div class="tc6 tc66">累计获得奖励：<i class="mothers2">0</i>(元)</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'
        )
    }

    //518我的记录弹窗
    function tenderPopup(){
        $('body').append(
            '<div class="tanchuang"></div>'+
            '<div class="box">'+
            '<div class="tc1 tc1ss">' +
            '<div class="tc2">' +
            '<img class="close" src="/dyweb/dythemes/rhd/actives/festival/phone/images/close.png">'+
            '<div class="tc3">我的记录</div>'+
            '<div class="tc4">' +
            '<div class="tc5">' +
            '<div style="clear:both;"></div>'+
            '<div class="tc6"><span class="tc7">投资标的</span><span class="tc7s">投资<br/>笔数</span><span class="tc7ss">投资金额</span><span class="tc7sss">获得奖励</span></div>'+
            '<div class="tc8" style="display:none;">' +
                '<div class="tc9">' +

                '</div>'+
            '</div>'+
            '<div class="tc8s" style="display:none;">' +
            '<div class="tc11">立即登录</div>'+
            '</div>'+
            '<div class="tc6 tc66">累计投资总额：<i class="mothers1"></i>(元)</div>'+
            '<div class="tc6 tc66">累计获得奖励：<i class="mothers2"></i>(元)</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'
        )
    }

    setTimeout(function(){
        jiaxiList();
    },500);

    //标列表:http://newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=jiaxi&methodname=Get_borrow_List
    function jiaxiList(){
        rhdapi.getPost({
            "query_site":"user",
            "q":"get_share_ajax",
            "alias":"jiaxi",
            "methodname":"Get_borrow_List",
        },function(ret){
            ret = ret.data;
            if(ret.code == 0){
                var tenderHtml='',len=ret.data.length;
                for(var i =0;i<len;i++){
                    tenderHtml+='<div '+(ret.data[i].borrow_account_scale == 100.00? ' class="fs38 fs38s"' : 'class="fs38"')+'>\
                                <div style="clear:both;"></div>\
                                   <div class="fs39">\
                                        <div class="fs40">'+ret.data[i].name+'</div>\
                                        <div class="fs41">\
                                            <p>加息</p>\
                                            <p>5.18%</p>\
                                        </div>\
                                   </div>\
                                 <div style="clear:both;"></div>\
                                <ul class="fs42">\
                                    <li class="fs45">\
                                        <p><span class="fs43">'+ret.data[i].borrow_apr+'</span>%</p>\
                                        <p>年化利率</p>\
                                    </li>\
                                    <li>\
                                        <p><span class="fs44">'+ret.data[i].borrow_period+'</span>个月</p>\
                                        <p>期限</p>\
                                     </li>\
                                </ul>\
                                <div class="fs46"><div class="fs47" style="width:'+ret.data[i].borrow_account_scale+'%"></div></div>\
                                <p class="fs48">总额：'+Number(ret.data[i].account).toFixed(2)+'/剩余：'+Number(ret.data[i].borrow_account_wait).toFixed(2)+'</p>\
                                <div class="fs50 tender-bottom" id="'+i+'">\
                                    <img class="fs51" src="/dyweb/dythemes/rhd/actives/festival/phone/images/29.png" '+(ret.data[i].borrow_account_scale == 100.00? ' ' : 'style="display:none"')+'>\
                                    <div class="fs49 tender-bottoma"></div>\
                                </div>\
                            </div>';
                    checkMount(ret.data[i],'tender-bottoma');

                }

                $('.fs37').html(tenderHtml);

            }
        },'json');
    }

    window.tenderattr=[];

    function checkMount(tender,className){

         var that = this,
            NowTime = tender.now_time,
            callBackArr = [],
            timeID = 0,
            backTime = 0,
            className ='',
            buttonText='',
            tenderinit=[];

        switch(tender.borrow_status_nid){
            case 'loan':
                if(tender.count_down =='1' && tender.now_time >= NowTime){
                    tender.tender_time = 1493373600;
                    var times = tender.tender_time - NowTime;
                    daojishi(times,className);
                    //callBackArr.push(function(key){
                    //    if(times < 0){
                    //        buttonText ='立即投资';
                    //        className = 'tender-touzi';
                    //        callBackArr.splice(key, 1);
                    //        that.callBackID = -1;
                    //    }else{
                    //        times --;
                    //        buttonText ='开标倒计时'+getTime(times);
                    //        className = 'tender-kaibiao';
                    //
                    //    }
                    //});
                    //
                    //if(timeID === 0){
                    //    timeID = setInterval(function(){
                    //        callBackArr.map(function(item,key){
                    //            item(key);
                    //            backTime++;
                    //        });
                    //        if(callBackArr.length < 1){
                    //            clearInterval(timeID);
                    //            timeID = 0;
                    //        }
                    //    },1000);
                    //}
                }else if(tender.borrow_account_scale == '100.00'){
                    buttonText ='满标待审';
                    className = 'tender-manbiao';
                    $(className).html(buttonText);
                }else{
                    buttonText ='立即投资';
                    className = 'tender-touzi';
                    $(className).html(buttonText);
                }
            break;
            case 'full':
                buttonText ='满标待审';
                className = 'tender-manbiao';
                $(className).html(buttonText);
            break;
            case 'repay':
                buttonText ='还款中';
                className = 'tender-manbiao';
            break;
            case 'repay_yes':
                buttonText ='已还完';
                className = 'tender-manbiao';
            break;
            case 'late':
                buttonText ='已过期';
                className = 'tender-manbiao';
            break;
            case 'roam_now':
                buttonText ='流转中';
                className = 'tender-manbiao';
            break;
            case 'roam_yes':
                buttonText ='已回购';
                className = 'tender-manbiao';
            break;
            case 'roam_no':
                buttonText ='回购中';
                className = 'tender-manbiao';
            break;
        }
    }

    function daojishi(times,className){
        var aa = setInterval(function(){
            if(times <= 0){
                clearInterval(aa);
                buttonText ='立即投资';
                className = 'tender-touzi';
                $(className).html(buttonText);
            }else{
                times--;
                buttonText ='开标倒计时'+getTime(times);
                className = 'tender-kaibiao';
                $(className).html(buttonText);
            }
        },1000)
    }

    function getTime (diff) {
        var df = diff,
            d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (df >= 0) {
            d = Math.floor(df / (60 * 60 * 24));
            h = Math.floor(df / (60 * 60)) - (d * 24);
            m = Math.floor(df / 60) - (d * 24 * 60) - (h * 60);
            s = Math.floor(df) - (d * 24 * 60 * 60) - (h * 60 * 60) - (m * 60);
        }
        if (s < 10) {
            s = '0' + s
        }
        if (m < 10) {
            m = '0' + m
        }
        if (h < 10) {
            h = '0' + h
        }
        if (d < 10) {
            d = '0' + d
        }
        return d + ':' + h + ':' + m + ':' + s;
    }


    //加息立即投资
    $('.tender-bottom').live('click',function(){
        var date = new Date().getTime()/1000;
        if(date>1495296000){
            getRewards(2,'活动已经结束');
        }else{
           var innerHtml = $('.tender-bottoma').eq($(this).attr('id'));
            if(innerHtml.attr('class').indexOf('tender-kaibiao')>-1){
                getRewards(2,'投资还未开始');
            }else if(innerHtml.attr('class').indexOf('tender-manbiao')>-1){
                getRewards(2,'投资已经结束');
            }else if(innerHtml.attr('class').indexOf('tender-touzi')>-1){
                rhdapi.gotoTender();
            }

        }
    });
    $('.tc11').live('click',function(){
        showShare();
        rhdapi.login();
    });

    //是否去登录
    function login(message){

        $('body').append(
            '<div class="tanchuang"></div>'+
            '<div class="box box1">'+
            '<div class="cj1"><img class="cj6" src="/dyweb/dythemes/rhd/actives/festival/phone/images/cj2.png"></div>'+
            '<div class="cj2">' +
            '<img class="cj3" src="/dyweb/dythemes/rhd/actives/festival/phone/images/cj1.png">'+
            '<div class="cj4">' +
                '<p class="dl">'+message+'</p>'+
                '<div class="yes">是</div>'+
                '<div class="noo">否</div>'+
            '</div>'+
            '</div>'+
            '</div>'
        );

        $('.yes').live('click',function(){
            showShare();
            rhdapi.login();
        });

        $('.noo').live('click',function(){
            showShare();
        });

    }

    //关闭弹窗
    $('.cj6').live('click',showShare);
    $('.close').live('click',showShare);
    function showShare(){
        $('.tanchuang').remove();
        $('.box').remove();
        $('.box1').remove();
        routes(0);
    }

    //内容滚动
    function scroll(){
        var $this = $('.tc9');
        var scrollTimer;
        scrollTimer = setInterval(function(){
            scrollNews( $this );
        }, 2000 );
    }
    function scrollNews(obj){
        var $self = obj;
        var lineHeight = $self.find("p:first").height();
        $self.animate({ "margin-top" : -lineHeight +"px" },500 , function(){
            $self.css({"margin-top":"0px"}).find("p:first").appendTo($self);
        });
    }

    $(function(){
        var date = new Date().getTime()/1000;
        if(date>1495036800){
            $('.fs55').hide();
            $('.fsten').show();
        }else{
            $('.fsten').hide();
            $('.fs55').show();
            $('.section5').addClass('changeP');
        }
    })
};



