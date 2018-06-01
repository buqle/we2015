define(function(require, exports, module) {
   //兑换列表页
    exports.mallist = function(){
        $(function(){

            var page = 1,type = '',callback = '.cargo-listc3',order='';

            var initPagination = function(allPage) {

                // 创建分页
                $("#Pagination").pagination(allPage, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    callback: pageselectCallback,
                    items_per_page:1, //每页显示1项
                    prev_text:'前一页',
                    next_text:'下一页'
                });
            };

            function pageselectCallback(page_index, jq){
                page = (page_index+1);
                getList(type,callback,false,'')
//			var new_content = $("#hiddenresult div.result:eq("+page_index+")").clone();
//			$("#Searchresult").empty().append(new_content); //装载对应分页的内容
                return false;
            }

            function addClass(obj1,obj2){
                $(obj1).find(obj2).click(function(){
                    $(this).addClass('spantit').siblings().removeClass('spantit')
                });
            };
            addClass('.cargo-listc2 dt','span')
            addClass('.cargo-listc1','span');
            var hash = window.location.hash;
            var indexe = parseInt(hash.replace('#',''));
            $('.cargo-listc1 span').each(function(){
                $(this).click(function(){
                    type=$(this).attr('att-id'),page=1;
                    getList(type,'.cargo-listc3', true,'');
                });
                if($(this).index()==0&&hash==''){
                    $(this).click();
                }
            });
            if(hash!=''){
                $('.cargo-listc1 span').eq(indexe).click()
            }

            $('.cargo-listc2 span').each(function(){
                $(this).click(function(){
                    type=$('.cargo-listc1 span.spantit').attr('att-id'),page=1;
                    order=($(this).index())+1
                    getList(type,'.cargo-listc3', true,order);
                });

            });

            $('#seache-btn').click(function(){
                reSearch();
            });

            function  reSearch(){
                var t = $('#seache').val();
                if (t.length < 1) {
                    $(this).unbind()
                    jDialog.alert('请输入搜索词');
                    return false;
                }else {
                    getList(type,'.cargo-listc3', true,'');
                }
            }
            document.onkeydown = function(e){
                var ev = document.all ? window.event : e;
                if(ev.keyCode==13) {
                    reSearch();
                }
            }

            function getList(type,callback, isintpage,order){
                var htccc=$("<div class='loading_now' style=' text-indent: 4em; height: 388px; line-height: 300px; width: 100%;'>正在加载中,请耐心等待...</div>");
                $(callback).html(htccc);
                $.getJSON('/?user&q=public&type=get_integral_item_list&item_type='+type+'&page='+page+'&epage=12&order='+order+'&item_name='+$('#seache').val()+'',function(ret){
                    if(ret.code == 0){
                        var surelen = ret.data.list.length;
                        var sure = '';
                        var sure1='';
                        for (var i =0 ; i < surelen; i++) {
                            sure +='<dl>';
                            sure+='<dt class="subcont_warp">';
                            sure+='<a  href="/mallist/a' + ret.data.list[i].id + '.html?'+ret.data.list[i].id+'" target="_blank" class="subcont">'
                            sure+='<img src="'+ret.data.list[i].image+'" alt="">';
                            sure+='</a>'
                            sure+='</dt>';
                            sure+='<dd>'
                            sure+='<h4>'+ret.data.list[i].name+'</h4>';
                            sure+='<p>市场价：￥'+ret.data.list[i].account+'</p>';
                            sure+='<div class="dd_lefton clearff"><i>仅剩：'+ret.data.list[i].number+'</i>积分：'+ret.data.list[i].integral+'</div>';
                            sure+='</dd>'
                            sure+='</dl>';
                        }
                        $(callback).html(sure);
                        if (isintpage) {

                            initPagination(ret.data.total_page);
                        }
                        sure1+='<p style="font-size: 20px;color: #52acf7;text-align: center;line-height: 200px;">此类型暂无产品，敬请期待！</p>'
                        if(surelen==0){
                            $(callback).html(sure1);
                        };
                        //$('.cargo-listc3 dl').not(':nth-of-type(4)').css('border-right','1px solid #c9c9c9')
                        $('.cargo-listc3 dl').find('a').each(function(){
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
    //兑换详情页
    exports.mallistcont= function(){
        $(function(){
            var url = window.location.search;
            var url2 =parseInt(url.replace('?',''));
            $('.btn_redeem').attr('nid',url2);
            $('.btn_redeem').hide();
            function aGin(){
                $.getJSON('/?user&q=public&type=get_integral_item_one&id='+$('.btn_redeem').attr('nid')+'&itemtype=0',function(ret){
                    $('.btn_redeem').show();
                    if(ret.code==0){
                        $('.btn_redeem').attr('int-address',ret.data.data.address);
                        $('#udui_name').text(ret.data.data.name);
                        $('#udui_account').text('市场价格：'+ret.data.data.account+'元');
                        $('#old_integral').text(ret.data.data.integral);
                        $('#udui_integral').text(parseInt(ret.data.data.discount*ret.data.data.integral)).attr('v2',ret.data.data.user_integral);
                        $('#udui_level').text(ret.data.data.level);
                        $('#udui_number').text(ret.data.data.number);
                        $('#img-contim').find('img').attr('src',ret.data.data.image);
                        $('.metric_redeem').html(ret.data.data.html);
                        $('#dui_inputy').change(function(){
                            if( $('#dui_inputy').val()>=parseInt(ret.data.data.number)){
                                jDialog.alert('不能超过库存');
                                return false;
                            }

                        }).keypress(function(e){
                            if (e.keyCode < 48 || e.keyCode>57) {
                                return false;
                            }

                        });
                        var i=1;
                        var pase=parseInt($('#dui_inputy').val())
                        $('#jia_btn').click(function(){
                            var pase=parseInt($('#dui_inputy').val());
                            if(pase==1){
                                i++;
                                $('#dui_inputy').val(i);
                                $('#jian_btn').removeClass('not-currpos')
                            }else if(pase>=ret.data.data.number){
                                if(ret.data.data.number==0){
                                    jDialog.alert('库存不足')
                                    return false;
                                }
                                jDialog.alert('不能超过库存')
                                return false;
                            }else {
                                var cc= pase+1;
                                $('#dui_inputy').val(cc);
                            }
                        });
                        $('#jian_btn').click(function(){
                            var pase=parseInt($('#dui_inputy').val())
                            if(pase<=ret.data.data.number&&pase<=1){
                                if(pase<=1) {
                                    $(this).addClass('not-currpos');
                                    return false;
                                }
                                i--;
                                $('#dui_inputy').val(i);
                            }else {
                                $(this).removeClass('not-currpos');
                                var cc= pase-1;
                                $('#dui_inputy').val(cc);
                            }
                        });

                        if(pase<=1) {
                            $('#jian_btn').addClass('not-currpos');
                            return false;
                        }else {
                            $('#jian_btn').removeClass('not-currpos');
                        }

                    }else {
                        jDialog.alert(ret.msg);
                    }
                },'json');
            }
            aGin();
            //兑换
            $('.btn_redeem').click(function(){
                var thiss2=$(this);
                if(thiss2.hasClass('oneetit')){
                    return false;
                }
                var nId= $('.btn_redeem').attr('nid');
                var Num=$('#dui_inputy').val();
                var pase=parseInt($('#dui_inputy').val());
                var pase2=new Number($('#udui_number').text());
                var v1=parseInt($('#udui_integral').text());
                var v2=parseInt($('#udui_integral').attr('v2'))
                if(pase>pase2){
                    if(pase2==0){
                        jDialog.alert('库存不足');
                        return false;
                    }
                    jDialog.alert('不能超过库存');
                    return false;
                }else if(Num=='') {
                    jDialog.alert('兑换数量不能为空');
                    return false;
                }else if(v1>v2){
                    jDialog.alert('积分不足');
                }else if(thiss2.attr('int-address')==1){
                    $.getJSON('/?users&m=users/address&type=get_user_address',function(ret){
                        if(ret.code==1){
                            var surelen = ret.data.length;
                            if(surelen==0){
                                var dzhi1 = jDialog.dialog({
                                    title : '温馨提示',
                                    content : $("#qingkuang2").html(),
                                    height:300,
                                    width:568

                                });
                            }else{
                                var dzhi2 = jDialog.dialog({
                                    title : '温馨提示',
                                    content : $("#qingkuang3").html(),
                                    height:300,
                                    width:568
                                });
                                var sure = '';
                                for (var i =0 ; i < surelen; i++) {
                                    sure+='<p><input type="radio" chec="'+ret.data[i].stauts+'" id="ssssss" name="ssssss"  value="'+ret.data[i].address_id+'" '+(ret.data[i].stauts == '1'? 'checked="checked"' : '')+'>'+ret.data[i].iaddress+'</p>'
                                }
                                $('.dizhi2cont').html(sure);
                                $('.qingcon2').find('span').click(function(){
                                    var addries=$('input[name="ssssss"]:checked ').val();
                                    dzhi2.close();
                                    if($(this).hasClass('oneetit')){
                                        return false;
                                    }
                                    var thiss=$(this);
                                    thiss.addClass('oneetit');
                                    $.getJSON('/?user&m=integral/exchange/exchange&id='+nId+'&number='+Num+'&address='+addries+'',function(ret){
                                        if(ret.code==0){
                                            jDialog.alert('兑换成功');
                                            thiss.removeClass('oneetit');
                                            aGin();
                                        }else {
                                            jDialog.alert(ret.msg);
                                        }
                                    },'json');
                                })

                            }
                        }else {
                            jDialog.alert(ret.msg);
                        }
                    }, 'json');
                }else {
                    var dialogs = jDialog.dialog({
                        title : '温馨提示',
                        content : $("#qingkuang1").html(),
                        height:300,
                        width:568
                    });
                    $('.qingcon2').find('#shibtn').click(function(){
                        $('.btn_redeem').removeClass('oneetit');
                        if($(this).hasClass('oneetit')){
                            return false;
                        }
                        var thiss=$(this);
                        thiss.addClass('oneetit');
                        $.getJSON('/?user&m=integral/exchange/exchange&id='+nId+'&number='+Num+'',function(ret){
                            if(ret.code==0){
                                jDialog.alert('兑换成功');
                                thiss.removeClass('oneetit');
                                aGin()
                            }else {
                                jDialog.alert(ret.msg);
                            }
                        },'json');
                    })
                    $('.qingcon2 span').click(function(){
                        dialogs.close();
                    });
                }

            })
        })
    }

})