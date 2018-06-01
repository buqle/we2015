/*!
 * Created By:wqs;
 * Created Time:2013-11-11;
 * Updated By:wqs;
 * Updated Time:2013-11-11;
 * http://www.diyou.cn
 */
define(function(require, exports, module) {

    //默认为可以转让的债权
    exports.change_all = function (){
        //diyou.use("pagelist",function(p){p.pages('#users_change_list','/?user&m=borrow/change/lists')});
        $('#ur-change').click(function(){
            $('#transfer_turn2').show();
            $("#change_status").hide();
            $("#change_buy_status").hide();
            $('.transfer_forms').hide();
            $("#change_records").removeClass();
            $("#buys_records").removeClass();
            $('#ur-change').addClass('act_on');
            $('#users_change_list').hide();
        })
        function _change1(type){

            if (type=='now'){
                $("#change_nid option[value='now']").attr("selected", true);
            }else if (type=='can'){
                $("#change_nid option[value='can']").attr("selected", true);
            }else{
                $("#change_nid option:first").prop("selected", 'selected');
            }
            $("#change_records").removeClass().addClass("act_on");
            $("#buys_records").removeClass();
            $('#ur-change').removeClass();
            $("#change_status").show();
            $("#change_buy_status").hide();
            $('#transfer_turn2').hide();
            $('#users_change_list').show();
            diyou.use("pagelist",function(p){p.pages('#users_change_list','/?user&m=borrow/change/lists&status_nid='+type)});
        }
        function _change2(type){
            if (type=='recover_wait' ){
                $("#buy_nid option[value='recover_wait']").attr("selected", true);
            }else if (type=='recover_yes'){
                $("#buy_nid option[value='recover_yes']").attr("selected", true);
            }else{
                $("#buy_nid option:first").prop("selected", 'selected');
            }
            $("#buys_records").removeClass().addClass("act_on");
            $("#change_records").removeClass();
            $('#ur-change').removeClass();
            $("#change_status").hide();
            $('#transfer_turn2').hide();
            $("#change_buy_status").show();
            $('#users_change_list').show();
            diyou.use("pagelist",function(p){p.pages('#users_change_list','/?user&m=borrow/change/buy_list&status_nid='+type)});
        }


        $("#can_change").bind("click",function(){
            _change1('can');
        })
        $("#now_change").bind("click",function(){
            _change1('now');
        })
        $("#recover_change").bind("click",function(){
            _change2('recover_wait');
        })
        $("#recover_yes_change").bind("click",function(){
            _change2('recover_yes');
        })
        $("#change_records").bind("click",function(){
            _change1('');
        })
        $("#buys_records").bind("click",function(){
            _change2('');
        })

        $('.status_nid').change(function(){
            var _val  = $(this).children('option:selected').val();
            if ( $("#change_records").hasClass("hover")){
                diyou.use("pagelist",function(p){p.pages('#users_change_list','/?user&m=borrow/change/lists&status_nid='+_val)});
            }else{
                diyou.use("pagelist",function(p){p.pages('#users_change_list','/?user&m=borrow/change/buy_list&status_nid='+_val)});
            }
        })
    }
    
    //进行债权转让
	exports.change_list = function (){
		$(".change_borrow").bind("click",function(){
            var _id = $(this).attr("data-id");
            var _borrow_nid = $(this).attr("data-borrow-nid");
            jDialog.ajax('/?user&m=borrow/change/change&tender_id='+_id+'&borrow_nid='+_borrow_nid,{
                title:'进行债权转让',
                resize: true,
                width:500,
                height: 280
            });
        });
        $(".change_cancel").bind("click",function(){
            var _id = $(this).attr("data-id");
            var _borrow_nid = $(this).attr("data-borrow-nid");
            jDialog.ajax('/?user&m=borrow/change/cancel&tender_id='+_id+'&borrow_nid='+_borrow_nid,{
                title: '撤销债权转让',
                resize:true,
                width:385,
                height:150
            });
        });
        $(".change_web").bind("click",function(){
            var _id = $(this).attr("data-id");
            var _borrow_nid = $(this).attr("data-borrow-nid");
            jDialog.ajax('/?user&m=borrow/change/web&tender_id='+_id+'&borrow_nid='+_borrow_nid,{
                title: '转让给网站'
            });
        });
        
        $(".change_protocol").bind("click",function(){
             var _id = $(this).attr("data-id");
            var _url = '/?user&m=borrow/change/protocol&tender_id='+_id;
            jDialog.ajax(_url,{
                title:'债权协议书',
                resize:true,
                height:800,
                width:600
            })
             /**宽为100，高为400，距屏顶0象素，屏左0象素，无工具条，
             无菜单条，无滚动条，不可调整大小，无地址栏，无状态栏
             */
            //window.open(_url,'债权协议书','height=400,width=600,top=0,right=0,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no');
        });
	}
    
    //新债权转让
	exports.change_new = function (form_id,_id){
		$("#"+form_id).bind("submit",function(){
		  $('#change_error').html('');
            var rule = /^[0-9]+.?[0-9]*$/;　　//正整数 
	        var account=$("#account").val();
            if ($("#account").val()==''){
                	$('#change_error').html('转让金额不能为空');
           }else if (account<=0 || !rule.test(account)){
				$('#change_error').html('转让金额不正确');
            }else if ($("#paypassworr").val()==''){
                $('#change_error').html('支付密码不正确');
            }else{
    			require('submitform');
    			$("#"+form_id).ajaxSubmit({
					 success: function (result) {
						if(result==1){
                             diyou.use('dialogs',function(dia){dia.success('转让成功','this')});
						}else{
							$('#change_error').html(result);
						}
					}
				 });
            }
			 return false; 	
		})
	}
    //债权购买
    exports.change_buy=function(){
        //购买的弹框
        $(".debt_buy").bind("click",function(){
		 if(user_id==""){
                    diyou.use('dialogs',function(dia){
                        dia.dialog('请先登录','/?user&q=login&type=ajax')
                    });
                    return false;
                }else if(trust_status=='error'){
            diyou.use('dialogs',function(dy){dy.error('请先开通资金托管账号','/?user&m=trust/account')});
            return false;
            }
            else if(trust_authize=='error'){
            diyou.use('dialogs',function(dy){dy.error('请先二次授权','/?user&m=trust/account')});
            return false;
            }else{
            var _id = $(this).attr("data-id");
            var _borrow_nid = $(this).attr("data-borrow-nid");
            diyou.use('dialogs',function(dy){dy.dialog('购买债权','/?user&m=trust/change/buy&tender_id='+_id+'&borrow_nid='+_borrow_nid)})
			}
        })
        
        //开始购买
        $("#change_buy_form").bind("submit",function(){
           /* if ($("#paypassword").val()==""){
				$('#change_error').html('支付密码不能为空');
				return false;
			}*/ 
		/*	$("#change_buy_form").ajaxSubmit({
					 success: function (result) {
						if(result==1){
							diyou.use("dialogs",function(e){e.success('债权购买成功',"/index.php?user&m=borrow/change");});
                            return false;
						}else{
							$('#change_error').html(result);
                            return false;
						}
						return false;
					}
	
				 });
			 return false; 	*/
		})
    }
    
    //债权购买列表
    exports.change_buy_list = function(){
         //弹框
        $(".change_detail").bind("click",function(){
            var _id = $(this).attr("data-id");
            var _borrow_nid = $(this).attr("data-borrow-nid");
            diyou.use('dialogs',function(dy){dy.dialog('查看债权详情','/?user&m=borrow/change/detail&tender_id='+_id+'&borrow_nid='+_borrow_nid)})
        })
        
           
        $(".change_protocol").bind("click",function(){
             var _id = $(this).attr("data-id");
            var _url = '/?user&m=borrow/change/protocol&tender_id='+_id;
             /**宽为100，高为400，距屏顶0象素，屏左0象素，无工具条，
             无菜单条，无滚动条，不可调整大小，无地址栏，无状态栏
             */
            window.open(_url,'债权协议书','height=400,width=600,top=0,right=0,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no');
        });
    }
    
    /**撤销债权
    author:chenwei
    */
	exports.change_cancel = function (form_id){
		$("#"+form_id).bind("submit",function(){



			 $("#"+form_id).ajaxSubmit({
					 success: function (result) {
						if(result==1){
							diyou.use("dialogs",function(e){e.success('撤销成功','this');});
                            exports.fill_change_list(5);
                            
						}else{
							$('#change_error').html(result);
                            return false;
						}
						return false;
					}
	
				 });

			 return false; 	
		})
	}
    /**转让给网站
    author:chenwei
    */
    exports.change_web = function (form_id){
		$("#"+form_id).bind("submit",function(){
		   if($("#paypassword").val()==''){
                $("#change_error").html('请输入支付密码');
            }else{
			$("#"+form_id).ajaxSubmit({
					 success: function (result) {
						if(result==1){
							diyou.use("dialogs",function(e){e.success('转让给网站成功',"this");});
                            return false;
						}else{
							$('#change_error').html(result);
                            return false;
						}
						return false;
					}
	
				 });
        }
			 return false; 	
		})
	}
    
});