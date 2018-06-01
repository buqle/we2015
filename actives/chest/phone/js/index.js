var isread = 0;
var click = false;
ready = function(){
    if (isread == 1) {
        return false;
    }
    isread = 1;

    var islogin = 0;
    if (typeof api === 'object') {

    }
    /**************活动首页的内容******************/

    //活动首页活动指南中的开宝箱
    $(".a5").on('tap',function(){
        window.location.href="/active/chest/index.html";
    });

 function checkChestCode(code){
     switch(code){
         //对换码输入正确的情况
         case 0:
             $('body').append(
                 '<div class="tanchaung"></div>'+
                 '<div class="box1">' +
                 '<img class="a17 a17-1" src="/dyweb/dythemes/rhd/actives/chest/phone/images/15.png">'+
                 '<img class="a16-1" src="/dyweb/dythemes/rhd/actives/chest/phone/images/40_03.png">'+
                 '<div class="a14-1">' +
                 '<input class="a20" type="text" id="text1" maxlength="11" placeholder="请输入手机号">'+
                 '<div class="a21" id="tips"></div>'+
                 '<div class="a18-2 a18-1" id="huoqu">我要开宝箱</div>'+
                 '</div>'+
                 '</div>'
             );
             break;
         case 1:
             //兑换码失效
             $('body').append(
                 '<div class="tanchaung"></div>'+
                 '<div class="box1" style="height:7.5rem;">' +
                 '<img class="a17 a17-1" src="/dyweb/dythemes/rhd/actives/chest/phone/images/15.png">'+
                 '<img class="a16-1" src="/dyweb/dythemes/rhd/actives/chest/phone/images/40_03.png">'+
                 '<div class="a14-1">' +
                 '<img class="a19" src="/dyweb/dythemes/rhd/actives/chest/phone/images/20.png">'+
                 '<p class="a15-1">兑换码失败，无效的兑换码</p>'+
                 '<div class="a18 a18-1">我知道了</div>'+
                 '</div>'+
                 '</div>'
             );
             break;
         case 2:
             // 兑换码重复
             $('body').append(
                 '<div class="tanchaung"></div>'+
                 '<div class="box1">' +
                 '<img class="a17 a17-1" src="/dyweb/dythemes/rhd/actives/chest/phone/images/15.png">'+
                 '<img class="a16-1" src="/dyweb/dythemes/rhd/actives/chest/phone/images/40_03.png">'+
                 '<div class="a14-1">' +
                 '<p class="a15-1">此兑换码重复使用</p>'+
                 '<div class="a18 a18-1">我知道了</div>'+
                 '</div>'+
                 '</div>'
             );
             break;
     }
 }

    //激活
    $('.a8').on('tap',function(){
        var dhMark = $('#duihuanma')[0].value;
        if(dhMark==''){
            alert('兑换码不允许为空');
        }else{
            //在这里进行激活按钮三种情况的处理
            rhdapi.getPost({
                "query_site":"user",
                "q":"set_red",
                "chest_code":dhMark,
                "type":"check_chest_code"
            },function(ret){
                ret = ret.data;
                if(ret.code==0){
                    checkChestCode(0);
                    localStorage.setItem('chestCode',dhMark);
                }else if(ret.code==1){
                    checkChestCode(1);
                }else if(ret.code==2){
                    checkChestCode(2);
                }else{
                    alert(ret.msg);
                }
            },'json')
        }

    });

    //我要开宝箱
    $('#huoqu').live('tap',function(){
        var phoneTest = /^1[3578]\d{9}$/;
        var phone = document.getElementById('text1').value;
        if (phone === '') {
            $('#tips').html("手机号不能为空");
        }else if (!(phoneTest.test(phone))) {
            $('#tips').html("手机号格式错误");
        }else{
            $('#tips').html("");
            rhdapi.getPost({
                "query_site":"user",
                "q":"set_red",
                "phone":phone,
                "type":"get_chest_phone_code"
            },function(ret){
                ret = ret.data;
                if(ret.code==0){
                    localStorage.setItem('phone',phone);
                    closeTanchuang();
                    //输入信息正确后点击我要开宝箱
                   if(ret.data==0){
                       //1.新用户=>输入验证码 =>开宝箱页面（在本页面弹出获取金币数的弹窗，无操作5s后自动关闭）
                       localStorage.setItem('hasCode',0);
                       $('body').append(
                           '<div class="tanchaung"></div>'+
                           '<div class="box1">' +
                           '<img class="a17 a17-1" src="/dyweb/dythemes/rhd/actives/chest/phone/images/15.png">'+
                           '<img class="a16-1" src="/dyweb/dythemes/rhd/actives/chest/phone/images/40_03.png">'+
                           '<div class="a14-1">' +
                           '<input class="a20" type="text" id="text2" maxlength="11" placeholder="请输入验证码">'+
                           '<div class="a22" id="Invatime"></div>'+
                           '<div class="a21" id="tips"></div>'+
                           '<div class="a18-2 a18-1" id="dajiang">大奖拿来</div>'+
                           '</div>'+
                           '</div>'
                       );
                       checkSendTime(60);
                   }else if(ret.data==1){
                       // 2。老用户=>开宝箱页面（在本页面弹出获取金币数的弹窗，无操作5s后自动关闭）
                       localStorage.setItem('hasCode',1);
                       localStorage.setItem('yzms','');
                       localStorage.setItem('token',ret.token);
                       gold();
                       daojishi(5);

                   }
                }else{
                    alert(ret.msg);
                }
            },'json');



        }
    });
    //大奖拿来
    $("#dajiang").live('tap',function(){
        var yzm = document.getElementById('text2').value;
        if(yzm==''){
            $('#tips').html("验证码不能为空");
        }else{
            //如果验证码输入正确
            localStorage.setItem('yzms',yzm);
            closeTanchuang();
            gold();
            daojishi(5);
        }
    });

    //验证码倒计时
    function checkSendTime(time){
        var Invatimes = document.getElementById('Invatime');
        var Countdown = setInterval(function(){
            if(time<=0){
                clearInterval(Countdown);
                Invatimes.innerHTML='';
            }else{
                time--;
                Invatimes.innerHTML=time+'s';
            }
        },1000)
    }


    //兑换规则
    $('.a11').on('tap',function(){
        $('body').append(
            '<div class="tanchaung"></div>'+
                '<div class="box">' +
                    '<img class="a17" src="/dyweb/dythemes/rhd/actives/chest/phone/images/15.png">'+
                    '<img class="a16" src="/dyweb/dythemes/rhd/actives/chest/phone/images/18_03.png">'+
                    '<div class="a14">' +
                    '<p class="a15">1、怎样获得兑换码？</p>'+
                    '<p>关注“融和贷”微信公众账号，参与每日微信答题活动，后台回复当日问题正确答案，答对即可获取当日兑换码。</p>'+
                    '<p class="a15">2、一个用户一天内最多可以兑换几次兑换码？</p>'+
                    '<p>一个兑换码每人每天只能兑换一次，不能重复兑换。</p>'+
                    '<p class="a15">3、兑换码的有效期？</p>'+
                    '<p>每日微信答题获得的兑换码仅限此条微信推送当天24：00前有效。</p>'+
                    '</div>'+
                '</div>'
        )
    });

    //关闭弹窗
    $('.a17').live('tap',function(){
        closeTanchuang()
    });
    $(".a18").live('tap',function(){
        closeTanchuang()
    });

    function closeTanchuang(){
        $('.tanchaung').remove();
        $('.box').remove();
        $('.box1').remove();
        $('.box3').remove();
    }

    //活动详情
    $('.a12').on('tap',function(){
        $('body').append(
            '<div class="tanchaung"></div>'+
            '<div class="box">' +
            '<img class="a17" src="/dyweb/dythemes/rhd/actives/chest/phone/images/15.png">'+
            '<img class="a16" src="/dyweb/dythemes/rhd/actives/chest/phone/images/44_03.png">'+
            '<div class="a14">' +
            '<p>1、活动时间：2016年12月01日—2016年12月18日；</p>'+
            '<p>2、活动对象：仅限活动期间参与“融和贷”微信公众号“答题活动”的用户参加；</p>'+
            '<p>3、如在活动中发现问题，可在“融和贷”微信公众号上咨询（例：金币显示不正确等）；</p>'+
            '<p>4、此活动奖励与其他活动奖励并存；</p>'+
            '<p>5、此活动最终解释权归融和贷所有。</p>'+
            '<div class="a18">我知道了</div>'+
            '</div>'+
            '</div>'
        )
    });

    //获得金币数
    function gold(){
        rhdapi.getPost({
            "query_site":"user",
            "q":"set_red",
            "phone":localStorage.getItem('phone'),
            "has":localStorage.getItem('hasCode'),
            "phonecode":localStorage.getItem('yzms'),
            "chest_code":localStorage.getItem('chestCode'),
            "type":"check_chest_phone_code"
        },function(ret){
            ret = ret.data;
            if(ret.code==0){
                if(localStorage.getItem('hasCode')=='0'){
                    localStorage.setItem('token',ret.data.token);
                }
                $('body').append(
                    '<div class="tanchaung"></div>'+
                    '<div class="box1">' +
                    '<img class="a17 a17-1 a1888 a18888" src="/dyweb/dythemes/rhd/actives/chest/phone/images/15.png">'+
                    '<img class="a16-1" src="/dyweb/dythemes/rhd/actives/chest/phone/images/43_03.png">'+
                    '<div class="a14-1">' +
                    '<p class="a15-1">恭喜您获得<span class="ddd"></span>金币</p>'+
                    '<div class="a18 a18-1 a1888 a18888">我知道了</div>'+
                    '</div>'+
                    '</div>'
                );
                $('.ddd').text(ret.data.gold);
            }else if(ret.code==2){
                alert(ret.msg);
                window.location.href='/active/chest/index.html';
            }else{
                alert(ret.msg);
            }

        },'json');

    }


    /**************开宝箱页面的内容******************/
    if(window.location.href.indexOf('.ronghedai.com/active/chest/index.html')>-1){
            rhdapi.checklogin(function(s){
                islogin = s.islogin;
                var html ='';
                if(islogin =='1'){
                    //获取用户拥有金币
                    rhdapi.getPost({
                        "query_site":"user",
                        "q":"set_red",
                        "type":"get_user_gold",
                        "token":localStorage.getItem('token')
                    },function(ret){
                        ret = ret.data;
                        if(ret.code==0){
                            if(ret.data.gold==false || ret.data.gold=="false"){
                                $('.b5').text("0");
                            }else{
                                $('.b5').text(ret.data.gold);
                            }
                        }else if(ret.code==-1){
                            //我的账户
                            $('.b666').on('tap',function(){
                                alert('登录超时');
                            })
                        }
                    });

                    //我的账户
                    $('.b666').on('tap',function(){
                        rhdapi.getPost({
                            "query_site":"user",
                            "q":"set_red",
                            "type":"get_user_gold",
                            "token":localStorage.getItem('token')
                        },function(ret){
                            ret = ret.data;
                            if(ret.code==0){
                                var pageData=[];
                                for(var i in ret.data.log){
                                    html = '<p class="a27"><span class="a28">'+ret.data.log[i].data+'</span><span class="a29">获得'+ret.data.log[i].gold+'金币</span></p>';
                                    pageData.push(html);
                                }
                                $('body').append(
                                    '<div class="tanchaung"></div>'+
                                    '<div class="box1 box4">' +
                                    '<img class="a17 a17-1" src="/dyweb/dythemes/rhd/actives/chest/phone/images/15.png">'+
                                    '<img class="a16-1" src="/dyweb/dythemes/rhd/actives/chest/phone/images/40_03.png">'+
                                    '<p class="a40">总金币:<span class="a41">0</span>个</p>'+
                                    '<div class="a24">' +
                                    '<div class="a25 current" id="jinbi">我的金币</div>'+
                                    '<div class="a25" id="jiangpin">我的奖品</div>'+
                                    '</div>'+
                                    '<div class="a14-1" style="padding:0rem;width:12.1rem;">' +
                                    '<div class="a26">' +
                                    '<div  id="aaa"></div>'+
                                    '<div class="a30">' +
                                    '<div class="a30-1"></div>'+
                                    '</div>'+
                                    '</div>'+
                                    '<div class="a26"style="display:none;padding:0.5rem 0rem;">' +
                                    '<div id="bbb"></div>'+
                                    '</div>'+
                                    '</div>'+
                                    '</div>'
                                );
                                var Count=pageData.length;
                                var PageSize = 6;//设置每页示数目
                                var PageCount=Math.ceil(Count/PageSize);//计算总页数
                                var currentPage = 1;//当前页，默认为1；
                                //造个简单的分页按钮
                                var pageN='<span class="a31 a31-t">《</span>';
                                for(var i=1;i<=PageCount;i++){
                                    if(PageCount<=7){
                                        if(i==1){
                                            pageN+='<span class="a32 currents" selectPage="'+i+'" >'+i+'</span>';
                                        }else{
                                            pageN+='<span class="a32" selectPage="'+i+'" >'+i+'</span>';
                                        }
                                    }else{
                                        if(i==1){
                                            pageN+='<span class="a32 currents" selectPage="'+i+'" >'+i+'</span>';
                                        }else if(i==PageCount || i==PageCount-1 || i==PageCount-2 || i==2 || i==3){
                                            pageN+='<span class="a32" selectPage="'+i+'" >'+i+'</span>';
                                        }else{
                                            pageN+='<span selectPage="'+i+'" style="border:none;">.</span>';
                                        }
                                    }


                                }
                                pageN+='<span class="a31 a31-b">》</span>';
                                pageN+='<span class="a33"><input type="text" id="yeshu"/></span><span class="a33 a33-s" style="background:#F66261;color:#fff;">go</span>';
                                $('.a30-1').html(pageN);
                                //显示默认页（第一页）
                                var html = '';
                                if(Count<6){
                                    PageSize = Count;
                                }
                                for(i=(currentPage-1)*PageSize;i<PageSize*currentPage;i++){
                                    html += pageData[i];
                                }
                                $('#aaa').html(html);


                                function selectContent(selectPage){
                                    var html = '';
                                    for(i=(selectPage-1)*PageSize;i<PageSize*selectPage;i++){
                                        if (i >= Count){
                                            break;
                                        }
                                        html += pageData[i];
                                    }
                                    $('#aaa').html(html);
                                }

                                //显示选择页的内容
                                $('.a32').live('tap',function(){
                                    var selectPage=$(this).attr('selectPage');
                                    $(this).addClass('currents').siblings().removeClass('currents');
                                    selectContent(selectPage);
                                });

                                //去第几页
                                $('.a33-s').live('tap',function(){
                                    if($('#yeshu')[0].value=='' || isNaN( $('#yeshu')[0].value )){
                                        alert('请您输入正确的数据！');
                                    }else if($('#yeshu')[0].value>PageCount){
                                        alert('没有此页！');
                                    }else{
                                        var selectPage=$('#yeshu')[0].value;
                                        selectContent(selectPage);
                                    }
                                });

                                //上一页
                                $('.a31-t').live('tap',function(){
                                    var curlH = $('.currents');
                                    var selectPage= curlH.attr('selectPage');
                                    if(selectPage >1){
                                        selectPage--;
                                        curlH.removeClass('currents');
                                        curlH.prev().addClass('currents');
                                        selectContent(selectPage);
                                    }

                                });

                                //下一页
                                $('.a31-b').live('tap',function(){
                                    var curlH = $('.currents');
                                    var selectPage=curlH.attr('selectPage');
                                    if(selectPage<PageCount){
                                        selectPage++;
                                        curlH.removeClass('currents');
                                        curlH.next().addClass('currents');
                                        selectContent(selectPage);
                                    }

                                });

                                $('.a41').text(ret.data.gold);
                            }else if(ret.code==-1){
                                //我的账户
                                $('.b666').on('tap',function(){
                                    alert('登录超时');
                                })
                            }
                        });
                    });

                    //开启宝箱
                    $('.b3').on('tap',function(){
                        num = $(this).attr('id');
                        if(num==1){
                            texts='铜';
                        }else if(num==2){
                            texts='银';
                        }else if(num==3){
                            texts='金';
                        }else if(num==4){
                            texts='钻';
                        }
                        rhdapi.getPost({
                            "query_site":"user",
                            "q":"set_red",
                            "chest_number":num,
                            "type":"open_chest",
                            "token":localStorage.getItem('token')
                        },function(ret){
                            ret = ret.data;
                            if(ret.code==0){
                                $('body').append(
                                    '<div class="tanchaung"></div>'+
                                    '<div class="box1">' +
                                    '<img class="a17 a17-1 a1888" src="/dyweb/dythemes/rhd/actives/chest/phone/images/15.png">'+
                                    '<img class="a16-1" src="/dyweb/dythemes/rhd/actives/chest/phone/images/43_03.png">'+
                                    '<div class="a14-1">' +
                                    '<p class="a15-1 a15-11">成功打开<span class="ggg"></span>宝箱</p>'+
                                    '<p class="a15-1">恭喜您获得<span class="ddd ddd-1"></span></p>'+
                                    '</div>'+
                                    '</div>'
                                );

                                $('.ggg').text(texts);
                                $('.ddd-1').text(ret.data);
                            }else if(ret.code==1){
                                $('body').append(
                                    '<div class="tanchaung"></div>'+
                                    '<div class="box1" style="background:none;">' +
                                    '<img class="a17 a17-1 a1888" style="top:-2rem;" src="/dyweb/dythemes/rhd/actives/chest/phone/images/15.png">'+
                                    '<img class="a77" src="/dyweb/dythemes/rhd/actives/chest/phone/images/26.png">'+
                                    '</div>'
                                );
                            }else if(ret.code==-1){
                                alert('登录超时');
                                //rhdapi.login();
                            }

                        },'json')
                    });

                }else{
                    $('.b5').text('0');
                    $('.b666').on('tap',function(){
                        alert("您还未登录，请先登录再来查看吧！");
                    });

                    $('.b3').on('tap',function(){
                        alert('您的账户还未激活，请到首页激活后再来拿奖品吧！');
                    })
                }
            });
    }

//我的奖品
    $('#jiangpin').live('tap',function(){
        rhdapi.getPost({  ///weixin/?user&q=set_red&type=get_chest_user_reward
            "query_site":"user",
            "q":"set_red",
            "type":"get_chest_user_reward",
            "token":localStorage.getItem('token')
        },function(ret){
            ret = ret.data;
            if(ret.code==0){
                var len = ret.data.list.length;
                var htmls='';
                for(var i =0;i<len;i++){
                    if(ret.data.list[i].type=='加息券'){
                        if(ret.data.list[i].status==0){
                            htmls+='<div class="a34 A"><p class="a36">加息券</p><p class="a37">'+ret.data.list[i].remark+'</p><p class="a38">'+ret.data.list[i].limit+'</p><div class="a35"></div></div>';
                        }else if(ret.data.list[i].status==1){
                            htmls+='<div class="a34 B"><p class="a36">加息券</p><p class="a37">'+ret.data.list[i].remark+'</p><p class="a38">'+ret.data.list[i].limit+'</p><div class="a35-s"></div></div>';
                        }
                    }else if(ret.data.list[i].type=='融和君说'){
                        if(ret.data.list[i].status==0){
                            htmls+='<div class="a34" id="ronghejun"><p class="a38 a38-1">'+ret.data.list[i].limit+'</p><div class="a35-1"></div></div>';
                        }else if(ret.data.list[i].status==1){
                            htmls+='<div class="a34 B"><p class="a38 a38-1">'+ret.data.list[i].limit+'</p><div class="a35-1-s"></div></div>';
                        }
                    }else if(ret.data.list[i].type=='话费'){
                        if(ret.data.list[i].remark.indexOf('1元')>-1 || ret.data.list[i].remark.indexOf('2元')>-1){
                            if(ret.data.list[i].status==0){
                                htmls+='<div class="a34"><p class="a36">'+ret.data.list[i].remark+'</p><p class="a37">即时充值,24小时到账</p><div class="a35-f"></div></div>';
                            }else if(ret.data.list[i].status==1){
                                htmls+='<div class="a34"><p class="a36">'+ret.data.list[i].remark+'</p><p class="a37">即时充值,24小时到账</p><div class="a35-f-1"></div></div>';
                            }

                        }else{
                            if(ret.data.list[i].status==0){
                                htmls+='<div class="a34 A"><p class="a36">'+ret.data.list[i].remark+'</p><p class="a37">'+ret.data.list[i].limit+'</p><div class="a35-f-s"></div></div>';
                            }else if(ret.data.list[i].status==1){
                                htmls+='<div class="a34 B"><p class="a36">'+ret.data.list[i].remark+'</p><p class="a37">'+ret.data.list[i].limit+'</p><div class="a35-f-ss"></div></div>';
                            }
                        }
                    }else if(ret.data.list[i].type=='现金红包'){
                        if(ret.data.list[i].status==0){
                            htmls+='<div class="a34 E"><p class="a37">'+ret.data.list[i].limit+'</p><div class="a35-2"></div></div>';
                        }else if(ret.data.list[i].status==1){
                            htmls+='<div class="a34 B"><p class="a37">'+ret.data.list[i].limit+'</p><div class="a35-2-s"></div></div>';
                        }
                    }
                }
                $('#bbb').html(htmls);
            }
        },'json')
    })
    //点击券
    $('.A').live('tap',function(){
        rhdapi.gotoTender();
    });

    $('.B').live('tap',function(){
        alert('已经使用！');
    });
    $('.E').live('tap',function(){
        window.location.href='http://www.ronghedai.com/dyapp/active/voucher/index.html';
    });

    //点击融和君邀请卷
    $('#ronghejun').live('tap',function(){
        closeTanchuang();
        $('body').append(
            '<div class="tanchaung tanchuang333"></div>'+
            '<div class="box box333" style="height:13rem;">' +
            '<img class="a17" src="/dyweb/dythemes/rhd/actives/chest/phone/images/15.png">'+
            '<img class="a16" style="top:-4.9rem;" src="/dyweb/dythemes/rhd/actives/chest/phone/images/27_03.png">'+
            '<div class="a14-2">' +
            '<p>1、福利专享，只给融和君！</p>'+
            '<p>2、凡参与该采访的客户，在专访图文推送当天，投资6月标的总收益翻倍！</p>'+
            '<p>3、因参与人数比较多，请您及时添加微信报名！</p>'+
            '<img class="bb20" src="/dyweb/dythemes/rhd/actives/chest/phone/images/erweima.png">'+
            '</div>'+
            '</div>'
        )
    });
    //5s倒计时关闭弹窗
    function daojishi(time){
        var timer = setInterval(function(){
            if(time<=0){
                clearInterval(timer);
                closeTanchuang();
                window.location.href='/active/chest/index.html';
            }else{
                --time;
            }
        },1000);

    }

    //关闭弹窗
    $('.a1888').live('tap',function(){
        closeTanchuang();
        //changeUrl();
    });
    $('.a18888').live('tap',function(){
        window.location.href='/active/chest/index.html';
    });


    //改变url地址 防止刷新页面时再次弹窗金币弹窗
    function changeUrl(){
        var state = {
            title: document.title,
            url: document.location.href,
            otherkey: null
        };
        if(state.url.indexOf('#bao')>-1){
            history.replaceState(state, document.title, window.location.href.slice(0,window.location.href.indexOf('#')));
        }

    }

    //分享得3金币
    $('.a555').on('tap',function(){
        $('body').append(
            '<div class="tanchaung tanchuang1"></div>'+
            '<div class="box3">' +
            '<img class="a23" src="/dyweb/dythemes/rhd/actives/chest/phone/images/21.png">'+
            '</div>'
        );
    });

    //点击任意处关闭分享
    $(document).on('tap',".tanchuang1",closeTanchuang);
    $(document).on('tap',".box3",closeTanchuang);

    $(document).on('tap','.tanchuang333',closeTanchuang);
    $(document).on('tap','.box333',closeTanchuang);

    //活动规则
    $('.b66').on('tap',function(){
        $('body').append(
            '<div class="tanchaung"></div>'+
            '<div class="box box2">' +
            '<img class="a17" src="/dyweb/dythemes/rhd/actives/chest/phone/images/15.png">'+
            '<img class="a16" src="/dyweb/dythemes/rhd/actives/chest/phone/images/20_03.png">'+
            '<div class="a14-2">' +
            '<p>1、 ①单次6金币，可获得1次开铜宝箱的机会；</p>'+
            '<p>②单次9金币，可获得1次开银宝箱的机会；</p>'+
            '<p>③单次15金币，可获得1次开金宝箱的机会；</p>'+
            '<p>④单次66金币，可获得1次开钻石宝箱的机会。</p>'+
            '<p>2、活动奖品：1、2、5、10元话费，现金红包，投资加 息券，“融和君说”邀请券，华为nova，iPhone7 plus……除现金红包外，本活动所有奖励均在活动期间内有效；</p>'+
            '<p>3、加息券使用规则：默认为符合加息券要求的首次投资使用。（例：获得加息券后第一次投资3月标1万元就默认使用3月标加息券，一张券只能使用一次）</p>'+
            '<p>4、奖励发放方式：①1元/2元话费说明：奖励在领取后1个工作日内发放，具体到账时间以话费余额为准（部分运营商无充值短信提示）；170/171号段无法进行充值；</p>'+
            '<p>②5元话费说明：用户在微信端投资≥100元可额外获得5元话费奖励，话费奖励在用户领取后24小时内到账，如遇逾期请联系相关运营商；</p>'+
            '<p>③10元话费说明：用户在微信端投资≥500元可额外获得10元话费奖励，话费奖励在用户领取后24小时内到账，如遇逾期请联系相关运营商；</p>'+

            '<p> ④现金红包：奖励即时到账，获得和使用规则与现有网站规则一致</p>'+
            '<p>⑤投资加息券：奖励在满标复审后五个工作日内金额将直充用户汇付账户，可投资可取现。</p>'+
            '<p>⑥若抽中实物奖品，用户可直接联系客服（微信号：ronghedai888），实物奖品在活动结束第五天发放，具体到货时间以快递签收时间为准，所提交信息仅用于奖品邮寄，不作其他用途；中奖用户自中奖日起3个工作日内，未联系微信客服发送邮寄地址等信息的，则视为自动放弃；</p>'+
            '<p>⑦获得融和君说邀请券，参与活动6月标收益翻倍，因参与人数多，请及时添加“融和君说”微信报名。</p>'+
            '<p>5、活动期间，参与活动的用户有且只有一次分享获得3金币的机会；</p>'+
            '<p>6、此活动最终解释权归融和贷所有。</p>'+
            '</div>'+
            '<div class="a18">我知道了</div>'+
            '</div>'
        )
    });

    //按钮切换
    $('.a25').live('tap',function(){
        var index = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        $('.a26').eq(index).show().siblings().hide();
        if(index==1){
            $('.a40').css('display','none');
        }else{
            $('.a40').css('display','block');
        }
    });

    //所有人的奖励列表
    rhdapi.getPost({
        "query_site":"user",
        "q":"set_red",
        "type":"get_chest_reward_list"
    },function(ret){
        ret = ret.data;
        if(ret.code==0){
            var len = ret.data.list.length;
            var html='';
            for(var i = 0;i<len;i++){
                html+='<p><span class="b11">'+ret.data.list[i].phone+'</span><span class="b12">'+ret.data.list[i].remark+'</span><span class="b12">'+ret.data.list[i].addtime+'</span></p>'
            }
            $('.b10').html(html);
        }
    },'json');

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


    //分享
    var share = 1;
    function getweichat(){
        var token = localStorage.getItem('token');
        $.ajax({
            url:'/weixin/?user&q=set_red&type=set_ches_share',
            type:'get',
            dataType: 'json',
            data:{
                token: token
            },
            success: function(request){
                alert('分享成功！');
                if (share == 1) {
                    $('body').append(
                        '<div class="tanchaung"></div>'+
                        '<div class="box1">' +
                        '<img class="a17 a17-1 a1888" src="/dyweb/dythemes/rhd/actives/chest/phone/images/15.png">'+
                        '<img class="a16-1" src="/dyweb/dythemes/rhd/actives/chest/phone/images/43_03.png">'+
                        '<div class="a14-1">' +
                        '<p class="a15-1">恭喜您获得<span class="ddd">3</span>金币</p>'+
                        '<div class="a18 a18-1 a1888">我知道了</div>'+
                        '</div>'+
                        '</div>'
                    );
                    var num = parseInt($('.b5').text());
                    num = num +3;
                    $('.b5').text(num);
                }


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
    var rhdTitle = '这活动有毒！每天叫醒我的不是梦想，是开宝箱！！！';
    var rhdLink = 'http://www.ronghedai.com/dyapp/active/chest/index.html';
    var rhdDesc="";
    wx.ready(function(){
        wx.onMenuShareAppMessage({
            title: rhdTitle,
            desc: rhdDesc,
            link: rhdLink,
            imgUrl:'http://www.ronghedai.com/dyweb/dythemes/rhd/actives/chest/phone/images/fenxiang.png',
            success: function () {
                getweichat();
                setTimeout(function(){
                    share =2;
                },1000);
            }
        });
        wx.onMenuShareTimeline({
            title: rhdTitle,
            desc: rhdDesc,
            link: rhdLink,
            imgUrl:'http://www.ronghedai.com/dyweb/dythemes/rhd/actives/chest/phone/images/fenxiang.png',
            success: function () {
                getweichat();
                setTimeout(function(){
                    share =2;
                },1000);

            }

        });

        wx.onMenuShareQQ({
            title: rhdTitle, // 分享标题
            desc: rhdDesc, // 分享描述
            link: rhdLink, // 分享链接
            imgUrl:'http://www.ronghedai.com/dyweb/dythemes/rhd/actives/chest/phone/images/fenxiang.png',
            success: function () {
                getweichat();
                setTimeout(function(){
                    share =2;
                },1000);
            }
        });

        wx.onMenuShareWeibo({
            title: rhdTitle, // 分享标题
            desc: rhdDesc, // 分享描述
            link: rhdLink, // 分享链接
            imgUrl:'http://www.ronghedai.com/dyweb/dythemes/rhd/actives/chest/phone/images/fenxiang.png',
            success: function () {
                getweichat();
                share =2;
            }
        });

        wx.onMenuShareQZone({
            title: rhdTitle, // 分享标题
            desc: rhdDesc, // 分享描述
            link: rhdLink, // 分享链接
            imgUrl:'http://www.ronghedai.com/dyweb/dythemes/rhd/actives/chest/phone/images/fenxiang.png',
            success: function () {
                getweichat();
                setTimeout(function(){
                    share =2;
                },1000);
            }
        });

    })


};

//箱子抖动
var index=0;
setInterval(function()
{
    var TheArray = ["0","1","3","2"];//定义数组变量
    var ss = index%4;
    $('.b3-1').removeClass("b3-1");
    $('.b3').eq(TheArray[ss]).addClass("b3-1");
    index++;
},5000);



