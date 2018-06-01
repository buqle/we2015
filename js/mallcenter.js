define(function(require, exports, module) {
   //我的积分
    exports.mallcenter = function(){
        $(function(){
            $.getJSON('/?user&m=integral/user/get_user_level',function(ret){
                if(ret.code == 0){
                    $('.user-infotu2').text(ret.data.users.integral );
                    $('.user-infotu3').text(ret.data.users.integral_used);
                    $('.user-infotu4').text(ret.data.users.next_level);
                    console.log(ret.data.users.level)
                    /*var pasen1=parseInt($('.user-infotu3').text());
                     var pasen2=parseInt($('.user-infotu4').text());
                     var pase=pasen1+pasen2;
                     if(pase<=10000){
                     $('.user-infotu5').text(1)
                     }else if(pase<=50000){
                     $('.user-infotu5').text(2)
                     }else if(pase<=200000){
                     $('.user-infotu5').text(3)
                     }else if(pase<=500000){
                     $('.user-infotu5').text(4)
                     }else if(pase<=800000){
                     $('.user-infotu5').text(5)
                     }else if(pase<=1000000){
                     $('.user-infotu5').text(5)
                     }*/
                    if(ret.data.users.level==0){
                        $('.user-infotu5').text(1);
                    }else  if(ret.data.users.level==1){
                        $('.user-infotu5').text(2);
                        $('.over_bgs li:eq(0)').find('i,span').addClass('sp-apra');
                    }else  if(ret.data.users.level==2){
                        $('.user-infotu5').text(3);
                        $('.over_bgs li:eq(1)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(0)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(0)').find('em').addClass('emclass')
                    }else  if(ret.data.users.level==3){
                        $('.user-infotu5').text(4);
                        $('.over_bgs li:eq(1)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(0)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(2)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(1)').find('em').addClass('emclass')
                    }else  if(ret.data.users.level==4){
                        $('.user-infotu5').text(5);
                        $('.over_bgs li:eq(1)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(0)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(2)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(3)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(2)').find('em').addClass('emclass')
                    }else  if(ret.data.users.level==5){
                        $('.user-infotu5').text(6);
                        $('.over_bgs li:eq(1)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(0)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(2)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(3)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(4)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(3)').find('em').addClass('emclass')
                    }else  if(ret.data.users.level==6){
                        $('.over_bgs li:eq(1)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(0)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(2)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(3)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(4)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(5)').find('i,span').addClass('sp-apra');
                        $('.over_bgs li:eq(4)').find('em').addClass('emclass')
                    }

                }else{
                    jDialog.alert(ret.msg);
                }
            });


            var page = 1,type = '';

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
                getuser(type,false)
                return false;
            }

            $('.mcenter_tit').find('span').each(function(){
                $(this).click(function(){
                    $(this).addClass('spantit').siblings().removeClass('spantit');
                    var href=['/?user&m=integral/user/get_getlog','/?user&m=integral/user/get_uselog'];
                    type=href[$(this).index()],page=1;
                    getuser(type,true);
                });
                if($(this).index()==0){
                    $(this).click()
                }
            });

            function getuser(type,isintpage,call){
                $.getJSON(''+type+'&page='+page+'&epage=5',function(ret){
                    if(ret.code == 0){
                        var surelen = ret.data.list.length;
                        var sure = '';
                        sure+='<tr>';
                        if(type=='/?user&m=integral/user/get_getlog') {
                            sure += '<th width="260">来源</th>';
                        }else if(type=='/?user&m=integral/user/get_uselog'){
                            sure += '<th width="260">使用</th>';
                        }
                        sure+='<th width="285">积分</th>';
                        sure+='<th width="220">时间</th>';
                        sure+='<th width="385">详情</th>';
                        sure+='</tr>';
                        for (var i =0 ; i < surelen; i++) {
                            sure +='<tr>';
                            sure+='<td><span>'+ret.data.list[i].source+'</span></td>';
                            if(type=='/?user&m=integral/user/get_getlog'){
                                sure+='<td><i>+'+ret.data.list[i].integral+'</i></td>';
                            }else if(type=='/?user&m=integral/user/get_uselog'){
                                sure+='<td><i>'+ret.data.list[i].integral+'</i></td>';
                            }
                            sure+='<td>'+ret.data.list[i].addtime+'</td>';
                            sure+='<td>'+ret.data.list[i].remark+'</td>';
                            sure+='</tr>';
                        }
                        $('.clact').html(sure);
                        if (isintpage) {
                            initPagination(ret.data.total_page);
                        }

                    }else{
                        jDialog.alert(ret.msg);
                    }
                });
            };
        });
    }

})