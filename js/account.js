/*!
 * Created By:wqs;
 * Created Time:2013-11-29;
 * Updated By:;
 * Updated Time:;
 * http://v4.diyou.cc
 */
 define(function(require, exports, module) {
    
   //银行卡
   exports.bank = function(){
        $('#add_bank').live('click',function(){
            if(parseInt(realname_status)!=1){
                diyou.use('dialogs',function(dia){dia.dialog('提示','/?user&m=account/cash/dialog&type=real')});
                return false;
            }
            if(parseInt(phone_status)!=1){
                diyou.use('dialogs',function(dia){dia.dialog('提示','/?user&m=account/cash/dialog&type=phone')});
                return false;
            }
            location.href="/?user&m=account/bank/new";
            return false;
        })        
        
   }
   //add bank
   exports.bank_new = function(form_id){ 
            require('validate');
            $("#"+form_id).validate({
        		rules: {
        			bank: "required",
        			city: "required",
        			branch: "required",
        			account: {
        				required: true,
        				bank_num: true
        			},
        			confirm_account: {
        				required: true,
        				bank_num: true,
        				equalTo: "#account"
        			}
        		},
        		messages: {
        			bank: "请选择银行",
        			city: "请选择开户地",
                    branch:"请填写开户行",
        			account: {
        				required: "请填写银行卡号",
                        bank_num:"请输入正确的卡号"
        			},
        			confirm_account: {
        				required: "请再次输入银行卡号",
        				bank_num:"请输入正确的卡号",
                        equalTo:"您输入的卡号不一致"
        			}
        		}
    	    });
        $('#'+form_id).live('submit',function(){
             require('submitform');
            $(this).ajaxSubmit({
				url:'/?user&m=account/bank/new',              
    			  success:function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == '100')
    				{
                       diyou.use('dialogs',function(dia){dia.success(results.msg,'/?user&m=account/bank/list')});                  
                    }else if(results.code == '101'){
                        //null
                    }else{
    				   diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                    }
                  }
    			});
                return false;
            });
   }
   
    //edit bank
   exports.bank_edit = function(form_id){
            require('submitform');   
            require('validate');
            $("#"+form_id).validate({
			    onfocusout:function(element) {$(element).valid()},
                onkeyup:function(element) {$(element).valid()},
			    errorElement:'span',
                errorPlacement:function(error,element){error.appendTo(element.parent())},
        		rules: {
        			bank: "required",
        			city: "required",
        			branch: "required",
					now_account: {
        				required: true,
        				bank_num: true
        			},
        			account: {
        				required: true,
        				bank_num: true
        			},
        			confirm_account: {
        				required: true,
        				bank_num: true,
        				equalTo: "#account"
        			},
					paypassword:"required",
					ajax_phone_code:"required"
        		},
        		messages: {
        			bank: "请选择银行",
        			city: "请选择开户地",
                    branch:"请填写开户行",
        			now_account: {
        				required: "请填写当前银行卡号",
                        bank_num:"请输入正确的当前卡号"
        			},
					account: {
        				required: "请填写银行卡号",
                        bank_num:"请输入正确的卡号"
        			},
        			confirm_account: {
        				required: "请再次输入银行卡号",
        				bank_num:"请输入正确的卡号",
                        equalTo:"您输入的卡号不一致"
        			},
					paypassword:"交易密码不能为空",
					ajax_phone_code:"手机验证码不能为空"
        		},submitHandler:function(form) {
					  $(form).ajaxSubmit({
						  url:'/?user&m=account/bank/new',
						success:function(result,status){
							var results = eval('('+result+')');
							if(results.code=='100'){
								diyou.use('dialogs',function(dia){dia.success(results.msg,'/?user&m=account/bank/list')});
							}else if(results.code=='101'){
								diyou.use('dialogs',function(dia){dia.error('参数错误','')});
							}else if(results.code=='3'){
                                $('#phoneverify').html(results.msg);
                                $('#phoneverify').css({'display':''});
                            }else if(results.code=='2'){
                                $('#paypassword_v').html(results.msg);
                                $('#paypassword_v').css({'display':''});
                            }else if(results.code=='1'){
                                $('#now_account_w').html(results.msg);
                                $('#now_account_w').css({'display':''});
							}else{
							    diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
							}
						}
					  })
            }
    	    });
			
			$('.get_verty_btn').live('click',function(){
            $.ajax({
                url:"/?user&m=approve/phone&action=send&type=bank_new",
                dataType:"text",
                type:'get',
                success:function(data){
                    var results = eval('('+data+')');
                    if(results.code == 'success'){
                        diyou.use('index',function(dy){dy._get_vericode('send_phonevalid','ajax_phone_code')});
                        $('#send_phonevalid').attr('value','发送成功');
                        //diyou.use('dialogs',function(dia){dia.success(results.msg,'this')});
                    }else{
                       $('#cash_warn').html(results.msg);
                    }
                }                
            })  
         })
      
   }
   
  
   //提现
   exports.cash_new = function(form_id){
        
   }
   
   //资金记录
   exports.account_log = function(){
        //分页
         require("pages");
         $("#pages").pagination($("#pages").attr('data-total'), {
            callback: true,//PageCallback() 为翻页调用次函数。
            prev_text: "<",
            next_text: ">",
            items_per_page: $("#pages").attr('data-epage'), //每页的数据个数
            num_display_entries: 5, //两侧首尾分页条目数
            current_page: $("#pages").attr('data-page'),   //当前页码
            num_edge_entries: 10,
            load_first_page:false,
            link_to:'/?user&m=account/log/log&page=__id__'
        });            
        function pageselectCallback(page_id, jq) {
            //exports._user_borrow_amount_list(page_id);
            return true;
        }
        exports._account_log_list(0);
        
        $('#search').live('click',function(){
            var account_type = $('#account_type').val();
            var page = $("#pages").attr('data-page');
            $.ajax({
                url: "/?ajax&t=users_account_log&account_type"+account_type,
                data: "page="+page,
                success: function(data){
                    $(".main_box_cont").html(data);
                    
                }
            });
        })
        $('#recharge').live('click',function(){
            location.href = "/?user&m=account/recharge/new";
            return false;
        })
        $('#cash').live('click',function(){
            location.href = "/?user&m=account/cash/new";
            return false;
        })
   }
   exports._account_log_list = function(page){
        $.ajax({
            url: "/?user&m=account/log/log",
            data: "page="+page,
            success: function(data){
                $(".main_box_cont").html(data);
                
            }
        });
   }
});
