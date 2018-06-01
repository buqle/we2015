define(function(require, exports, module) {
   //秒杀列表页
    exports.malldie = function(){
        window.timer = {
            _queue : [],
            _times : [],
            start:function(time, borrow_nid) {
                if (this._queue[borrow_nid] != undefined) return false;
                this._queue[borrow_nid] = 0;
                var timesID =  setInterval(function(){
                    var getbackSecond = time - timer._queue[borrow_nid];
                    if (getbackSecond >=0) {
                        var day = Math.floor(getbackSecond / (60 * 60 * 24));
                        var hour = Math.floor(getbackSecond / (60 * 60)) - (day * 24);
                        var minute = Math.floor(getbackSecond / 60) - (day * 24 * 60) - (hour * 60);
                        var second = Math.floor(getbackSecond) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                        timer._queue[borrow_nid]++;
                        if (day < 10) day = "0" +day;
                        if (hour < 10) hour = "0" + hour;
                        if (minute < 10) minute = "0" + minute;
                        if (second < 10) second = "0" + second;
                        var cc='';
                        cc+='<p><b>'+ day +'</b>:<b>'+ hour +'</b>:<b>'+ minute +'</b>:<b>'+second+'</b></p>'
                        cc+='<span>即将开始</span>'
                        $("div[borrow="+borrow_nid+"]").html(cc);
                    } else {
                        clearInterval(timer._times[borrow_nid]);
                        //
                    }
                }, 1000);
                this._times[borrow_nid] = timesID;
            }

        };
        $(function(){
            var page = 1,batch = '',callback = '.miaodie_cont2',epages ='';

            var initPagination = function(allPage) {

                // 创建分页
                $("#Pagination").pagination(allPage, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    callback: pageselectCallback,
                    items_per_page:1, //每页显示1项
                    prev_text:'上一页',
                    next_text:'下一页'
                });
            };

            function pageselectCallback(page_index, jq){
                page = (page_index+1);
                getList2(batch,callback,false,epages)
//			var new_content = $("#hiddenresult div.result:eq("+page_index+")").clone();
//			$("#Searchresult").empty().append(new_content); //装载对应分页的内容
                return false;
            };

            $('.miaodie_cont1 span').each(function(){
                $(this).click(function(){
                    $(this).addClass('spantit').siblings().removeClass('spantit')
                    batch=$(this).attr('att-id'),page=1,epages=$(this).attr('epages');
                    getList2(batch,'.miaodie_cont2', true,epages);
                });
                if($(this).index()==0){
                    $(this).click();
                }
            });


            //倒计时
            function getList2(batch,callback, isintpage,epages){
                var htccc=$("<div class='loading_now' style=' text-indent: 4em; height: 200px; line-height: 100px;width: 100%;'>正在加载中,请耐心等待...</div>");
                $(callback).html(htccc);
                $.getJSON('/?user&q=public&type=get_seckil_integral_item_list&page='+page+'&epage='+epages+'&batch='+batch+'',function(ret){
                    if(ret.code == 0){
                        var surelen = ret.data.list.length;
                        var sure = '';
                        var sure1='';
                        for (var i =0 ; i < surelen; i++) {
                            sure +='<dl class="clearff">';
                            sure+='<dt class="lefton subcont_warp">';
                            sure+='<div class="subcont">';
                            sure+='<img src="'+ret.data.list[i].image+'" alt="">';
                            sure+='</div>';
                            sure+='</dt>';
                            sure+='<dd class="lefton">';
                            sure+='<div class="miaodiedd1">';
                            sure+='<h4>'+ret.data.list[i].name+'</h4>';
                            if(ret.data.list[i].batch==1){
                                sure+='所有用户均可参与';
                            }else if(ret.data.list[i].batch==2){
                                sure+='成功投资过的用户可参与';
                            }
                            sure+='</div>';
                            sure+='<div class="miaodiedd2">';
                            if(ret.data.list[i].address==1){
                                sure+='<h4>市场价格</h4>';
                                sure+='<strong class="lineth">￥'+ret.data.list[i].account+'</strong>元（可秒杀'+ret.data.list[i].number+'个）';
                            }else {
                                sure+='<h4>可秒杀</h4>';
                                sure+=''+ret.data.list[i].number+'个'
                            }
                            sure+='</div>';
                            sure+='<div class="miaodiedd3 clearff">';
                            sure+='<div class="miaodie_left lefton">';
                            sure+='<p>积分兑换：<i>'+ret.data.list[i].old_integral+'</i></p>'
                            sure+='<p>秒杀积分：<span>'+ret.data.list[i].integral+'</span></p>';
                            sure+='</div>';
                            var stringTime = ret.data.list[i].start;
                            var stringTime2 =stringTime.replace(/-/,"/").replace(/-/, '/').replace(/-/, '/');
                            var timestamp2 = new Date(stringTime2)/1000;
                            if(timestamp2>ret.data.list[i].now){
                                sure+='<div class="miaodie_btn miaodie_btns righton" time1="'+ret.data.list[i].now+'" time2="'+timestamp2+'" borrow="'+ret.data.list[i].id+'">';

                                sure+='</div>';
                            }else {
                                sure+='<div class="miaodie_btn righton" time3="'+ret.data.list[i].status+'">';
                                if(ret.data.list[i].status==2){
                                    sure+='<span>已结束</span>';
                                }else{
                                    sure+='<a href="/malldie/a' + ret.data.list[i].id + '.html?'+ret.data.list[i].id+'" target="_blank" id="miao-dies">立即秒杀</a>';
                                }
                                sure+='</div>';
                            }

                            sure+='</div>';
                            sure+='</dd>';
                            sure+='</dl>';
                        };
                        $(callback).html(sure);
                        if(batch==3){
                            $('#Pagination').show()
                        }else {
                            $('#Pagination').hide()
                        }
                        if (isintpage) {

                            initPagination(ret.data.total_page);
                        }
                        sure1+='<p style="font-size: 20px;color: #52acf7;text-align: center;line-height: 200px;">此类型暂无产品，敬请期待！</p>'
                        if(surelen==0){
                            $(callback).html(sure1);
                        };
                        $('.miaodie_btn').each(function(){
                            if($(this).attr('time2')>$(this).attr('time1')){
                                timer.start(new Number($(this).attr('time2'))-new Number($(this).attr('time1')),$(this).attr('borrow'));
                            }
                        });

                        $('.miaodie_btn').find('a').each(function(){
                            $(this).unbind();
                            $(this).click(function(){
                                if(user_id==0){
                                    diyou.use('dialogs',function(dia){dia.dialog('用户登录','/?user&q=login&type=ajax')});
                                    return false;
                                }else if(user_id>0&&trust_status==0) {
                                    jDialog.alert('请开通上海银行存管');
                                    return false;
                                }
                            })
                        });


                    }else{
                        jDialog.alert(ret.msg);
                    }
                });
            };
        })
    }
    //秒杀详情页
    exports.malldiecont= function(){
        $(function(){
            //公用ID
            var url = window.location.search;
            var url2 =parseInt(url.replace('?',''));
            $('.btn_redeem').attr('nid',url2);
            //记录
            function getMore(){
                $.getJSON('/?user&q=public&type=get_secki_log&id='+$('.btn_redeem').attr('nid')+'',function(ret){
                    if(ret.code==0){
                        var html = '';
                        var len = ret.data.list.length;
                        for(var i=0; i<len; i++){
                            html += '<p><span>'+ret.data.list[i].addtime+'</span><span>'+ret.data.list[i].username+'</span></p>';
                        }
                        $('.piplist2').html(html);
                        $('.piplist2').find('p:even').css('background','#f8f8f8');
                    }
                    else {
                        jDialog.alert(ret.msg);
                    }
                },'json');


                //详情
                $.getJSON('/?user&q=public&type=get_integral_item_one&id='+$('.btn_redeem').attr('nid')+'&itemtype=1',function(ret){
                    if(ret.code==0){
                        $('#udui_name2').text(ret.data.data.name);
                        $('#udui_account2').text('市场价格：'+ret.data.data.account+'元');
                        $('#old_integral2').text(ret.data.data.old_integral);
                        $('#udui_integral2').text(ret.data.data.integral).attr('fen',ret.data.data.user_integral);
                        if(ret.data.data.batch==1){
                            $('#udui_integral2').next('em').text('（所有用户均可参加）')
                        }else {
                            $('#udui_integral2').next('em').text('（成功投资过的用户可参与）')
                        }
                        $('.goum_redeem2').text('可秒杀：'+ret.data.data.number+'件');
                        $('.btn_redeem').attr('cun',ret.data.data.number)
                        $('.img-contim').find('img').attr('src',ret.data.data.image);
                        $('.metric_redeem').html(ret.data.data.html);


                    }else {
                        jDialog.alert(ret.msg);
                    }
                },'json');
            };
            getMore();


            //秒杀
            var times =undefined;
            $('.btn_redeem').click(function(){
                var nId= $(this).attr('nid');
                var bI1=parseInt($('#udui_integral2').attr('fen'));
                var bI2=parseInt($('#udui_integral2').text());
                if(bI1<bI2){
                    var dialogs = jDialog.dialog({
                        title : '温馨提示',
                        content : $("#qingkuang2").html(),
                        height:300,
                        width:568
                    });
                    return false;
                }else if($(this).attr('cun')==0){
                    var dialogs = jDialog.dialog({
                        title : '温馨提示',
                        content : $("#qingkuang4").html(),
                        height:300,
                        width:568
                    });
                    return false;
                }else {
                    if (times) {
                        clearInterval(times);
                        $('.shenqing').find('span').html('10');
                    }
                    var dialogs = jDialog.dialog({
                        title : '温馨提示',
                        content : $("#qingkuang1").html(),
                        height:150,
                        width:280,
                        events:{
                            close:function(){
                                clearInterval(times);
                            }
                        }
                    });
                    times = window.setInterval(function(){
                        var sen = $('.shenqing').find('span').html();
                        if(sen== 0){
                            clearInterval(times)
                            jDialog.close();
                            $.getJSON('/?user&m=integral/exchange/seckill&id='+nId+'',function(ret){
                                if(ret.code==0){
                                    $.getJSON('/?users&m=users/address&type=get_user_address',function(ret){
                                        if(ret.code==1){
                                            var surelen = ret.data.length;
                                            if(surelen==0){
                                                var dialogs = jDialog.dialog({
                                                    title : '温馨提示',
                                                    content : $("#qingkuang3").html(),
                                                    height:300,
                                                    width:568
                                                });
                                            }else {
                                                jDialog.alert('恭喜你，秒杀成功。');
                                                getMore();
                                            }
                                        }else {
                                            jDialog.alert(ret.msg);
                                        }
                                    }, 'json');

                                }else {
                                    jDialog.alert(ret.msg);
                                }
                            },'json');

                        }
                        sen= sen * 1 - 1;
                        $('.shenqing').find('span').html(sen);

                    }, 1000);
                }

            });
        });
    }

})