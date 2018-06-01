/*!
 * Created By:james;
 * Created Time:2013-11-11;
 * Updated By:james;
 * Updated Time:2013-11-11;
 * http://www.diyou.cn
 */
 define(function(require, exports, module) {
	
	//ahui  
	exports.account_log = function(account_type){
        //日期选择器
        require("datepicker");
        $(".date_picker").live("click",function(){
            WdatePicker();
        })
        var account_Url;
        if(account_type == 'account_log'){
            account_Url = '/?user&m=users/old&data_type=account_log&type=list';
        }else if(account_type == 'home'){
            account_Url = '/?user&m=users/old&data_type=home&type=list';
        }else {
            account_Url = '/?user&m=account/log/log&type=list';
        }
        diyou.use("pagelist",function(p){p.pages('#content_box',account_Url)});
        
        $("#sou_form").submit(function(){
            var _data = "&dotime1="+$("#dotime1").val()+"&dotime2="+$("#dotime2").val()+"&account_type="+$("#account_type").val();
            diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=account/log/log&type=list'+_data)});
            return false;
        }) 
	}
    
    //recharge 
    exports.recharge = function(form_id){        
        $('#money').bind('blur',function(){
			diyou.use('users',function(dy){dy._check_input_text('money',"请输入金额")})            
	    })
        $('#valicode').bind('blur',function(){
			diyou.use('users',function(dy){dy._check_input_text('valicode',"请输入验证码")})
	    })
        $('#money').bind('blur',function(){
            var ac = $('#money').val();
            if(ac==""){
                $("#fee").html('￥0.00');
                $("#account").html('￥0.00');
            }else{
                var payment_nid=$('input[name=payment1]').val();//取得支付接口的nid  
                var p="";
                $("input[name=rechar_bank]").each(function() {  
                    if ($(this).attr("checked")) {  
                         p = $(this).val(); 
                    }  
                });  
               
                if(p=="gopay" || p=="alipay" || p=="baopay"){
                    payment_nid = p;
                }              
                $.ajax({
                   type: 'get',
                   url: '/?user&m=account/recharge/get_fee&type=recharge_success',
                   data: "account="+ac+"&payment_nid="+payment_nid,
                   success: function(account){
                     $("#fee").html('￥'+account);
                     $("#account").html('￥'+Math.round((ac-parseFloat(account))*100)/100);
                   }
                });
            }
            
        })
        $('input[name=rechar_bank]').change(function(){
            var ac = $('#money').val();
            if(ac==""){
                $("#fee").html('￥0.00');
                $("#account").html('￥0.00');
            }else{
                var payment_nid=$('input[name=payment1]').val();//取得支付接口的nid  
                var p="";
                $("input[name=rechar_bank]").each(function() {  
                    if ($(this).attr("checked")) {  
                         p = $(this).val(); 
                    }  
                });  
               
                if(p=="gopay" || p=="alipay" || p=="baopay"){
                    payment_nid = p;
                }              
                $.ajax({
                   type: 'get',
                   url: '/?user&m=account/recharge/get_fee&type=recharge_success',
                   data: "account="+ac+"&payment_nid="+payment_nid,
                   success: function(account){
                     $("#fee").html('￥'+account);
                     $("#account").html('￥'+Math.round((ac-parseFloat(account))*100)/100);
                   }
                });
            }
        })
        $('#'+form_id).live('submit',function(){
            diyou.use('users',function(dy){dy._check_input_text('money',"请输入金额")}) 
            diyou.use('users',function(dy){dy._check_input_text('valicode',"请输入验证码")})
            if ($("#money").val()=="" || $("#valicode").val()==""){
                return false;
            }
            require('submitform');
            $('#'+form_id).ajaxSubmit({
              async:false,
			  success : function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == 'success')
    				{
                       //if(results.url != ''){
							diyou.use('dialogs',function(d){d.dialog('提示','/?user&m=account/recharge&type=ok');});	
							window.open(results.url);
					//	}else{
						//	diyou.use('dialogs',function(d){d.message('提示','充值已提交，请等待管理员审核');});	
					//	}	
                    }else if(results.code == 'valicode'){
                        $("#valicode_error").html(results.msg);
                    }else if(results.code == 'account'){
                        $("#money_error").html(results.msg);
                    }else{
    				   diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                    }
                    return false;
                  }
			});
            return false;   
        });
        //银行信息开启隐藏
		$('#bank_show a').toggle(function(){
		   $('#bank_more').css({'display':'block'});
		},
		function(){
		   $('#bank_more').css({'display':'none'});
		})
    }
    
    //提现 
    exports.cash = function(form_id){  
       $('#money').bind('blur',function(){
            var ac = $('#money').val();
            if(ac==""){
                $("#fee").html('￥0.00');
                $("#account").html('￥0.00');
            }else{               
                $.ajax({
                   type: 'get',
                   url: '/?user&m=account/recharge/get_fee&type=cash',
                   data: "account="+ac,
                   success: function(account){
                     $("#fee").html('￥'+account);
                     $("#account").html('￥'+Math.round((ac-parseFloat(account))*100)/100);
                   }
                });
            }
            
        })
        $('#ajax_phone_code').bind('keyup',function(){
            if($('#ajax_phone_code').val()==""){
                $('#cash_warn').html("验证码不能为空");
            }else{
                $('#cash_warn').html("");
            }
			
		  })  
        require('validate');           
        $("#"+form_id).validate({
            errorElement:'span',
    		rules: {
    			money: "required",
    			paypassword: "required"
    		
    		},
    		messages: {
    			money: "请填提现金额",
    			paypassword: "请填写支付密码"
    			
    		}
	    });
        
        $('#'+form_id).live('submit',function(){
            if($('#ajax_phone_code').val()==""){
                $('#cash_warn').html("验证码不能为空");
                return false;
            }
            require('submitform');
            $(this).ajaxSubmit({
                  url:"/?user&m=account/cash/new",
    			  success:function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == '100')
    				{
                       diyou.use('dialogs',function(dia){dia.success(results.msg,'/?user&m=account/cash/cash_log')});                  
                    }else if(results.code == '101'){
                        //null
                    }else if(results.code == '1'){
                        $('#cash_warn').html(results.msg);
    				   //diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                    }else{
                        diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                    }
                  }
    			});
                return false;
         });
         
         $('.get_verty_btn').live('click',function(){
            $.ajax({
                url:"/?user&m=approve/phone&action=send&type=cash_new",
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
   //充值记录
   exports.account_recharge_log = function(){
        diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=account/recharge/recharge_log&type=list')});
        $("#status").change(function(){
            var _data = "&status="+$(this).val();
            diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=account/recharge/recharge_log&type=list'+_data)});
            return false;
        })
        
   }
   //提现记录
   exports.account_cash_log = function(value){
        diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=account/cash/cash_log&type=list')});
        $("#status").change(function(){
            var _data = "&status="+$(this).val();
            diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=account/cash/cash_log&type=list'+_data)});
            return false;
        })
        //取消提现
        $("a[data-type="+value+"]").live('click',function(){ 
            $.getJSON('/?user&m=account/cash/cancel_cash&id='+$(this).attr('data-id'),function(result){
    	         if(result.code=='success'){
    	              diyou.use('dialogs',function(dy){dy.success(result.msg,'this')});
    	         }else{
    	              diyou.use('dialogs',function(dy){dy.error(result.msg,'')});                      
    	         }
                 return false;
	       });
        })
   }
});