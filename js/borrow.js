/*!
 * Created By:wqs;
 * Created Time:2013-11-29;
 * Updated By:;
 * Updated Time:;
 * http://v4.diyou.cc
 */
 define(function(require, exports, module) {
    /*验证用户点击是否有邮箱认证和对应的标种额度*/
	exports.check_borrow = function(){
        $(".borrow_now").live('click',function(){
            var amount = $(this).attr('data-amount');  
            var type = $(this).attr('data-type');         
            if(user_id==''){
                diyou.use('dialogs',function(dia){dia.dialog('用户登录','/?user&q=login&type=ajax')});
                return false;
			}/*else if(email_status!=1){
				diyou.use('dialogs',function(dia){dia.error('您还没激活邮箱,请先激活！','/?user&m=approve/safe')});
                return false;
            }*/else if(realname_status==-1){
                require('cookie');
				$.cookie('amount_type',type,{ expires: 1/24 ,path:'',domain:window.location.host});
				diyou.use('dialogs',function(dia){dia.error('您还没实名认证请先认证','/?user&m=borrow/loan/new&p=credit')});
                return false;
            }else if(realname_status==0){
                require('cookie');
				$.cookie('amount_type',type,{ expires: 1/24 ,path:'',domain:window.location.host});
				diyou.use('dialogs',function(dia){dia.error('您的实名认证已提交，请等待审核通过后发布借款','')});
                return false;
            }
            else if(realname_status==2){
                require('cookie');
				$.cookie('amount_type',type,{ expires: 1/24 ,path:'',domain:window.location.host});
				diyou.use('dialogs',function(dia){dia.error('您的实名认证审核不通过，请重新提交','/?user&m=borrow/loan/new&p=credit')});
                return false;
            }else if(phone_status!=1){
                //添加手机认证判断  chenwei
                diyou.use('dialogs',function(dia){dia.error('您还没手机认证,请先认证！','/?user&m=approve/safe')});
                return false;
            }else if(parseInt(amount)>0){
                return true;
			}else if(type=="worth"&&parseInt(amount)==0){
                diyou.use('dialogs',function(dia){dia.error('您的净值额度不够不能发布借款','')});
			}else if(parseInt(amount)==0 && type!="second"){
                diyou.use('dialogs',function(dia){dia.error('您当前没有借款额度请先申请！','/?user&m=borrow/amount&type_nid='+type)});
                return false;
			}else{
                return true;
			}
            return false;
        }); 
        $('li.moouse').hover(function(){
            $(this).addClass('hover');
        },function(){
            $(this).removeClass('hover');
        })
    }
    
    /*borrow_loan_relaname*/
    exports.loan_realname = function(form_id){
        if(user_id==''){
            diyou.use('dialogs',function(dia){dia.dialog('用户登录','/?user&q=login&type=ajax')});
            return false;
		}/*else if(email_status!=1){
			diyou.use('dialogs',function(dia){dia.error('您还没激活邮箱,请先激活！','/?user&m=approve/safe')});
            return false;
        }*/
        
        $('#realname').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	    $('#realname').bind('blur',function(){
            
			exports._check_realname('realname');
			});
		$('#card_id').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	    $('#card_id').bind('blur',function(){
            exports._check_idcard('card_id');
            var idcard = $(this);
            if(idcard.siblings('.msg_box').hasClass('right')){
                $.ajax({
            　　type:'get',            
            　　url:'/?user&m=approve/realname&type=check_id_number',
                data:'card_id='+$(this).val(),      
            　　dataType:'text', 
            　　success:function(msg){
                    var results = eval('('+msg+')');
                    if(results.code == '100'){
                         idcard.siblings('.msg_box').removeClass().addClass('msg_box error');
                         idcard.siblings('.msg_box').children('font').html(results.msg);
                         return false;
                    }
            　　},            
            　　error:function(){
                    diyou.use('dialogs',function(dia){dia.error('对不起发生错误了！','')});
                }
            })
            }
            
			
			});
		
        
        $('#'+form_id).live('submit',function(){
            // diyou.use('index',function(dy){dy._check_username()});
            require('submitform');
			$('#'+form_id).ajaxSubmit({
			  url:'/?user&m=borrow/loan/new&p=credit',
              dataType:'text',
			  success:function(result,status){
			    var results = eval('('+result+')');
				if(results.code == 'success')
				{
                   diyou.use('dialogs',function(dia){dia.success(results.msg,'/?user&m=borrow/loan/new&p=info')});                  
				}else if(results.code == '2'){
				   diyou.use('dialogs',function(dia){dia.error(results.msg,'/?user&m=account/recharge')});
                }else{
                    url = '';
				   diyou.use('dialogs',function(dia){dia.error(results.msg,url)});
                }
              }
			});
            return false;
        });
    }
    
    /*borrow_loan_info*/
    exports.loan_info = function(form_id){  
          $('#sex').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#sex').bind('blur',function(){
			exports._check_sex('sex');
		  })            
          $('#edu').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#edu').bind('blur',function(){
			exports._check_select('edu','请选择学历');
		  })
          $('#work_year').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#work_year').bind('blur',function(){
			exports._check_select('work_year','请选择工作年限');
		  })
          $('#income').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#income').bind('blur',function(){
			exports._check_select('income','请选择月收入');
		  })
          $('#jiguan_city').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#jiguan_city').bind('blur',function(){
			exports._check_select('jiguan_city','请选择籍贯');
		  })
          $('#marry').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#marry').bind('blur',function(){
			exports._check_select('marry','请选择婚姻状况');
		  })
          $('#children').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#children').bind('blur',function(){
			exports._check_select('children','请选择子女状况');
		  })
          $('#city').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#city').bind('blur',function(){
			exports._check_select('city','请选择户口所在地');
		  })
          $('#live_address').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#live_address').bind('blur',function(){
			exports._check_select('live_address','请填写居住地址');
		  })
          $('#live_tel2').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#live_tel2').bind('blur',function(){
			exports._check_input_phone('live_tel1','live_tel2','居住地电话','phone');
		  })
          $('#live_tel1').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#live_tel1').bind('blur',function(){
			exports._check_input_phone('live_tel1','live_tel2','居住地电话','phone');
		  })
          $('#live_code').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#live_code').bind('blur',function(){
			exports._check_input_num('live_code','居住地邮编','code');
		  })
          
          $('#linkman2').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#linkman2').bind('blur',function(){
			exports._check_realname('linkman2');
		  })
          $('#linkman3').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#linkman3').bind('blur',function(){
			exports._check_realname('linkman3');
		  })
          
          $('#relationship2').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#relationship2').bind('blur',function(){
			exports._check_select('relationship2','请选择关系');
		  })
          $('#relationship3').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#relationship3').bind('blur',function(){
			exports._check_select('relationship3','请选择关系');
		  })
          
          $('#phone2').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#phone2').bind('blur',function(){
			diyou.use('index',function(dy){dy._check_phone('phone2')});
		  })
          $('#phone3').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#phone3').bind('blur',function(){
			diyou.use('index',function(dy){dy._check_phone('phone3')});
		  })          
        
            $('#'+form_id).live('submit',function(){
                exports._check_sex('sex');
                exports._check_input_text('edu','请选择学历');
                exports._check_input_text('work_year','请选择工作年限');
                exports._check_input_text('income','请选择月收入');
                exports._check_input_text('jiguan_city','请选择籍贯');
                exports._check_input_text('marry','请选择婚姻状况');
                exports._check_input_text('children','请选择子女状况');
                exports._check_input_text('city','请选择户口所在地');
                exports._check_input_text('live_address','请填写居住地址');
                exports._check_input_phone('live_tel1','live_tel2','居住地电话','phone');
                exports._check_input_num('live_code','居住地邮编','code');
                exports._check_realname('linkman2');
                exports._check_realname('linkman3');
                exports._check_input_text('relationship2','请选择关系');
                exports._check_input_text('relationship3','请选择关系');
                diyou.use('index',function(dy){dy._check_phone('phone2')});
                diyou.use('index',function(dy){dy._check_phone('phone3')});
                
                require('submitform');
    			$('#'+form_id).ajaxSubmit({
    			  url:'/?user&m=borrow/loan/new&p=info',
    			  success:function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == '100')
    				{
                       diyou.use('dialogs',function(dia){dia.success(results.msg,'/?user&m=borrow/loan/new&p=company')});                  
    				}else if(results.code == '2'){
    				   diyou.use('dialogs',function(dia){dia.error(results.msg,'/?user&m=account/recharge')});
                     }else if(results.code == '101'){
                        //empty error
                    }else{
    				   diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                    }
                  }
    			});
                return false;
            });
            exports.back('submit');
    }
    /*loan_info_company*/
    exports.loan_info_company = function(form_id){
        $('#work_style').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#work_style').bind('blur',function(){
			exports._check_select('work_style','请选择职业状态');
		})
        $('#name').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#name').bind('blur',function(){
			exports._check_input_text('name','请填写公司名称');
		})        
        $('#work_city').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#work_city').bind('blur',function(){
			exports._check_select('work_city','请选择公司所在地');
		})
        $('#address').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#address').bind('blur',function(){
			exports._check_input_text('address','请填写公司所在地');
		})
        $('#company_type').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#company_type').bind('blur',function(){
			exports._check_input_text('company_type','请选择公司类别');
		})
        $('#company_industry').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#company_industry').bind('blur',function(){
			exports._check_input_text('company_industry','请选择公司行业');
		})
        $('#company_size').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#company_size').bind('blur',function(){
			exports._check_input_text('company_size','请选择公司规模');
		})
        $('#work_year').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#work_year').bind('blur',function(){
			exports._check_input_text('work_year','请选择公司年限');
		})
        $('#income').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#income').bind('blur',function(){
			exports._check_input_text('income','请选择月收入');
		})
        $('#company_position').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#company_position').bind('blur',function(){
			exports._check_input_text('company_position','请选择职位');
		})
        $('#tel').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#tel').bind('blur',function(){
			exports._check_phone('tel','公司电话');
		})
        $('#work_email').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#work_email').bind('blur',function(){
			 exports._check_email('work_email','工作邮箱');
		})
        $('#company_work_year').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#company_work_year').bind('blur',function(){
			exports._check_input_text('company_work_year','请选择公司经营年限');
		})
          
        $('#'+form_id).live('submit',function(){
            exports._check_input_text('work_style','请选择职业状态');
            exports._check_input_text('name','请填写公司名称');
            exports._check_input_text('work_city','请选择公司所在地');
            exports._check_input_text('company_type','请选择公司类别');
            exports._check_input_text('company_industry','请选择公司行业');
            exports._check_input_text('company_size','请选择公司规模');
            exports._check_input_text('work_year','请选择公司年限');
            exports._check_input_text('income','请选择月收入');
            exports._check_input_text('company_position','请选择职位');
            exports._check_phone('tel','公司电话');
            exports._check_input_text('address','请填写公司地址');
            exports._check_email('work_email','工作邮箱');
            exports._check_input_text('company_work_year','请选择公司经营年限');
                require('submitform');
    			$('#'+form_id).ajaxSubmit({
    			  url:'/?user&m=borrow/loan/new&p=company',
    			  success:function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == '100')
    				{
                       diyou.use('dialogs',function(dia){dia.success(results.msg,'/?user&m=borrow/loan/new&p=finance')});                  
    				}else if(results.code == '2'){
    				   diyou.use('dialogs',function(dia){dia.error(results.msg,'/?user&m=account/recharge')});
                    }else if(results.code == '101'){
                        //null
                    }else{
    				   diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                    }
                  }
    			});
                return false;
            });
            exports.back('return');
    }
    /*loan_info_finance*/
    exports.loan_info_finance = function(form_id){
	   $('#house_account').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#house_account').bind('blur',function(){
			exports._check_input_num('house_account','贷款总额','money');
		})
        $('#month_house').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#month_house').bind('blur',function(){
			exports._check_input_num('month_house','每月按揭金额','money');
		})
        $('#car_account').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#car_account').bind('blur',function(){
			exports._check_input_num('car_account','贷款总额','money');
		})
        $('#month_car').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#month_car').bind('blur',function(){
			exports._check_input_num('month_car','每月按揭金额','money');
		})
        $('#month_card').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#month_card').bind('blur',function(){
			exports._check_input_num('month_card','每月信用卡还款金额','money');
		})
        
        $('#'+form_id).live('submit',function(){
            exports._check_input_num('house_account','贷款总额','money');
            exports._check_input_num('month_house','每月按揭金额','money');
            exports._check_input_num('car_account','贷款总额','money');
            exports._check_input_num('month_car','每月按揭金额','money');
            exports._check_input_num('month_card','每月信用卡还款金额','money');
                require('submitform');
    			$('#'+form_id).ajaxSubmit({
    			  url:'/?user&m=borrow/loan/new&p=finance',
    			  success:function(result,status){
    			    var results = eval('('+result+')');
                    var _amount_type = $.cookie('amount_type');
                    if(_amount_type ==''||typeof(_amount_type)=='undefined'){
                        var _amount_url = '/?user&m=borrow/amount';
                    }else{
                        var _amount_url = '/?user&m=borrow/amount&type_nid='+_amount_type;
                    }
    				if(results.code == '100')
    				{
                       diyou.use('dialogs',function(dia){dia.success(results.msg,_amount_url)});                  
    				}else if(results.code == '2'){
    				   diyou.use('dialogs',function(dia){dia.error(results.msg,'/?user&m=account/recharge')});
                    }else if(results.code == '101'){
                    }else{
    				   diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                    }
                  }
    			});
                return false;
            });
            exports.back('return');
    }
    
    exports.back = function(id){
        $('#'+id).live('click',function(){
                history.go(-1);
        });
    }
    
   
    
    /*额度申请*/
    exports.amount_apply = function(form_id){
        
        /*$('#amount_account').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#amount_account').bind('blur',function(){
			exports._check_input_text('amount_account','请填写申请额度');
		})
        
        $('#amount_type').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		})		  
	    $('#amount_type').bind('blur',function(){
			exports._check_select('amount_type','请选择申请类型');
		})*/
        
        $("input[name=amount_type]").change(function(){  
            $.ajax({
            　　type:'get',            
            　　url:'/?user&m=borrow/amount/one',
                data:'type='+$(this).val(),      
            　　dataType:'text', 
            　　success:function(data){
                    var results = eval('('+data+')');                    
                    if(results.code == '100'){
                        $('.bor_notice').html('您目前的总信用额度：<b class="num">'+results.all+'</b>元，可用信用额度：<b class="num">'+results.use+'</b>元，冻结信用额度：<b class="num">'+results.frost+'</b>元');
                    }else{                        
                        diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                    }
            　　},            
            　　error:function(){
                    diyou.use('dialogs',function(dia){dia.error('对不起发生错误了！','')});
                }            
            })            
        });
        
        $('#'+form_id).live('submit',function(){
            exports._check_input_text('amount_account','请填写贷款总额');           
            require('submitform');
    			$('#'+form_id).ajaxSubmit({
    			  url:'/?user&m=borrow/amount/apply',
    			  success:function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == '100')
    				{
                       diyou.use('dialogs',function(dia){dia.success(results.msg,'/?user&m=borrow/loan/new&p=approve')});                  
    				}else if(results.code == '2'){
    				   diyou.use('dialogs',function(dia){dia.error(results.msg,'/?user&m=account/recharge')});
                    }else if(results.code == '101'){
                        //empty error
                    }else{
                        
    				   diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                    }
                  }
    			});
            return false;
        });
        exports.back('return');
    }
    
    /*loan_approve*/
    exports.loan_approve = function(form_id){
        $("a[data-type='upload']").live('click',function(){
            var url = '/?user&m=borrow/loan/uploads&nid='+$(this).attr('data-nid');
             diyou.use('dialogs',function(dia){dia.dialog('图片上传',url,'','')});
        })
        $('#loan_approve_realbtn').live('click',function(){
            window.open('/?user&m=approve/safe');
            //diyou.use('dialogs',function(dy){dy.dialog('实名认证','/?user&m=approve/safe&type=realname')});
        });
    }
    /*loan_new*/
	exports.loan_change_new = function(form_id){
		if(realname_status != 1){
             diyou.use('dialogs',function(dy){dy.error('请先进行实名认证','/?user&m=approve/safe')});
             return false;
        }
		 require('validate');
jQuery.validator.addMethod("relMoney", function(value, element) {
    var amin = $('#amin').val();
    var amax = $('#amax').val();
	var accMul=parseInt($("#accMul").val());
    var flagValue=(parseFloat($('#account').val())> parseFloat(amax) || parseFloat($('#account').val()) < parseFloat(amin) || (parseFloat($('#account').val())%accMul))
    return this.optional(element) || (!flagValue);
}, "请填写正确的借款金额");

jQuery.validator.addMethod("relScale", function(value, element) {
	var aprmin = $('#aprmin').val();
    var aprmax = $('#aprmax').val();
    var flagValue=(parseFloat($('#borrow_apr').val())> parseFloat(aprmax) || parseFloat($('#borrow_apr').val()) < parseFloat(aprmin))
    return this.optional(element) || (!flagValue);
}, "请填写正确年利率");

jQuery.validator.addMethod("maxVal", function(value, element) {
	var flagValue=false;
	var minValue=parseInt($("#tender_account_min").val());
	var maxValue=parseInt($("#tender_account_max").val());
	if(maxValue==0){
		flagValue=false;
		}else if(maxValue<minValue){
		flagValue=true;}
		
    return this.optional(element) || (!flagValue);
}, "最高投标金额不能小于最小投标金额");

jQuery.validator.addMethod("scaleVal", function(value, element) {
	var aw_txt=$('#award_scale').val();
	var scale_min=parseFloat($('#award_scale_min').val());
	var scale_max=parseFloat($('#award_scale_max').val());
    var award_scale = parseFloat($('#award_scale').val());
    var flagValue=(award_scale>scale_max || award_scale<scale_min)
    return this.optional(element) || (!flagValue);
}, "请填写正确的借款金额比例");

jQuery.validator.addMethod("accountVal", function(value, element) {
	var ac_txt=$('#award_account').val();
    var award_account = parseFloat($('#award_account').val());
	var acc_min=parseFloat($('#award_account_min').val());
	var acc_max=parseFloat($('#award_account_max').val());
    var flagValue=(award_account>acc_max || award_account<acc_min)
    return this.optional(element) || (!flagValue);
}, "请填写正确的奖励金额");

jQuery.validator.addMethod("digitVal", function(value, element) {
	 var amin = $('#account_min').val();
     var flagValue=((parseFloat($('#account').val())%amin))
    return this.optional(element) || (!flagValue);
}, "请输入整数位，且大于0并为借款金额整除");
//按季还款方式的切换
$('#borrow_style').change(function(){
    var borrow_style = $(this).children('option:selected').val();
    if(borrow_style == 'season'){
        $('#period_season').show();
        $('#period').hide();
    }else{
        $('#period_season').hide();
        $('#period').show();
    }
});
        $("#"+form_id).validate({
			onfocusout:function(element) {
				$(element).valid();
			},
			onkeyup:function(element) {
				$(element).valid();
			},
    		rules: {
    			name: "required",
				borrow_use:"required",
				account:{required:true,digits:true,relMoney:true},
				borrow_apr:{required:true,decimals:true,relScale:true},
				borrow_style:"required",
				borrow_period:"required",
				borrow_season:"required",
				borrow_valid_time:"required",
				tender_account_min:"required",
				tender_account_max:{required:true,maxVal:true},
				award_scale:{required:true,decimals:true,scaleVal:true},
				borrow_contents:"required",
				award_account:{required:true,decimals:true,accountVal:true},
				account_min:{required:true,digitVal:true},
				voucher:"required",
				vouch_style:"required",
				_borrow_contents:"required",
				borrow_account:"required",
				borrow_account_use:"required",
				risk:"required",				
				valicode:{
					required:true,
					rangelength:[4,4],
					remote:{
						url:'/?plugins&q=check_imgcode',
						type: "post",
						dataType:'json',
						data: {                     
							valicode: function() {
								return $("#vericode").val();
							}
						}
					}
				}
    		},
    		messages: {
    			name: "请填写借款标题",
				borrow_use:"请选择借款用途",
				account:{required:"请填写借款金额",digits:"请填写整数金额",relMoney:"请填写正确的借款金额"},
				borrow_apr:{required:"请填写年利率",decimals:"请输入两位小数以内的值",relScale:"请填写正确年利率"},
				borrow_style:"请选择还款方式",
				borrow_period:"请选择借款期限",
				borrow_season:"请选择借款期限",
				borrow_valid_time:"请选择筹标期限",
				tender_account_min:"请选择最低投标金额",
				tender_account_max:{required:"请选择最低投标金额",maxVal:"最高投标金额不能小于最小投标金额"},
				award_scale:{required:"请填写借款金额比例",decimals:"请输入两位小数以内的值",scaleVal:"请填写正确的借款金额比例"},
				borrow_contents:"请填写借款描述",
				award_account:{required:"请填写借款金额",decimals:"请输入两位小数以内的值",accountVal:"请填写正确的奖励金额"},
				account_min:{required:"请填写最小流转单位",digitVal:"请输入整数位，且大于0并为借款金额整除"},
				voucher:"请填写担保机构",
				vouch_style:"请填写反担保方式",
				_borrow_contents:"请填写借款方商业概述",
				borrow_account:"请填写借款方资产情况",
				borrow_account_use:"请填写借款方资金用途",
				risk:"请填写风险控制措施",				
				valicode:{
					required:"验证码不能为空",
					rangelength:"请输入4位验证码",
					remote:"验证码错误"
				}
    		},
			errorPlacement: function(error, element) {  
    		error.appendTo(element.parent());},
			errorElement:"em",
			success:"valid",	
			submitHandler:function(form) {
				$(form).ajaxSubmit({
    			  url:'/?user&m=borrow/loan/new',
    			  success:function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == '100')
    				{
                       diyou.use('dialogs',function(dia){dia.success(results.msg,'/?user&m=borrow/count')});                  
    				}else if(results.code == '101'){
    				}else if(results.code == '13'){//验证码错误
                       $('#error_warn').html(results.msg);
                    }else{
                        $('#error_warn').html(results.msg);
                    }
                  }
    			});
            return false;
				}
	    });
		 $('#borrow_style').on("change",function(){
            var x = $(this).val();
            if (x=='season'){			
				$("#period_season").show();
				$("#period").hide();				
			}else{
				$("#period_season").hide();
				$("#period").show();
			}
        })
		 $("input[name='award_status']").on('click',function(){
             $("#award_account_id").hide();
               $("#award_scale_id").hide();
               $("#award_false_id").hide();
               if ($(this).val()==2){
                 $("#award_scale_id").show();
                 $("#award_false_id").show();
               }else if ($(this).val()==1){
                $("#award_account_id").show();
                $("#award_false_id").show();
               }
        }) 
		}
	
   
	//check real name
    exports._check_realname = function(realname){
      var realname = $('#'+realname);
	  var realname_val = realname.val();
	  var realname_reg = /[^\u4e00-\u9fa5]/;
      realname.siblings('.msg_box').css({'display':'inline-block'});
	  if(realname_reg.test(realname_val) || realname_val == '')
		  {
			realname.siblings('.msg_box').removeClass().addClass('msg_box error');
            realname.siblings('.msg_box').children('font').html('请输入真实姓名');
			return false;
		  }
	  else{
	        realname.siblings('.msg_box').removeClass().addClass('right msg_box');
			realname.siblings('.msg_box').children('font').html('');
		  }	  
    }
    
    //check sex
    exports._check_sex = function(sex){
      var sex = $('#'+sex);
	  var sex_val = sex.val();
      sex.siblings('.msg_box').css({'display':'inline-block'});
	  if(sex_val == '')
		  {
			sex.siblings('.msg_box').removeClass().addClass('msg_box error');
            sex.siblings('.msg_box').children('font').html('请选择性别');
			return false;
		  }
	  else{
	        sex.siblings('.msg_box').removeClass().addClass('right msg_box');
			sex.siblings('.msg_box').children('font').html('');
		  }	  
    }
    
    //check email
    exports._check_email = function(email,content){
	   var email_reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
       var email = $('#'+email);
	   var email_val = email.val();
	   email.siblings('.msg_box').css({'display':'inline-block'});	
	   if(email_val == ''){
	      email.siblings('.msg_box').removeClass().addClass('msg_box error');
          email.siblings('.msg_box').children('font').html(content+'不能为空')						  
	   }
	   else	if(!email_reg.test(email_val))
	  {  
	    email.siblings('.msg_box').removeClass().addClass('msg_box error'); 
	    email.siblings('.msg_box').children('font').html('请输入正确的'+content)
	  }else{
	   email.siblings('.msg_box').removeClass().addClass('right msg_box');
		email.siblings('.msg_box').children('font').html('')
	  }
    }
    //check phone
    exports._check_phone = function(phone,content){
     var phone = $('#'+phone)
     var phone_val = phone.val();
     var phone_reg = /^(010|02\d{1}|0[3-9]\d{2})-\d{7,9}(-\d+)?$/;
     var phone_reg1 = /^[0-9]*$/;
	 phone.siblings('.msg_box').css({'display':'inline-block'});	
	if(phone_val == '')
	 { 
	   phone.siblings('.msg_box').removeClass().addClass('msg_box error');
       phone.siblings('.msg_box').children('font').html(content+'不能为空');
	  }else
	 if(!phone_reg.test(phone_val) && !phone_reg1.test(phone_val))
			 { 
			   phone.siblings('.msg_box').removeClass().addClass('msg_box error');
               phone.siblings('.msg_box').children('font').html('请输入正确的'+content);
			 }
		 else{  
				phone.siblings('.msg_box').removeClass().addClass('right msg_box');
				phone.siblings('.msg_box').children('font').html('')
			 }
   }
    
    //check select
    exports._check_select = function(id,content){
      var id = $('#'+id);
	  var id_val = id.val();
	  if(id_val == '')
		  {
			id.siblings('.msg_box').removeClass().addClass('msg_box error');
            id.siblings('.msg_box').children('font').html(content);
			return false;
		  }
	  else{
	        id.siblings('.msg_box').removeClass().addClass('right msg_box');
			id.siblings('.msg_box').children('font').html('');
		  }	  
    }
    //check _check_input_num
    exports._check_input_num = function(id,content,reg){
        var id = $('#'+id)
	    var id_val = id.val();
        
        if(reg=='phone'){
            var id_reg = /^0(([1,2]\d)|([3-9]\d{2}))\d{7,8}$/;
        }else if(reg=="code"){
            var id_reg =/^[0-9]{6,6}$/;   
        }else if(reg=='money'){
            var id_reg = /^([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;
        }else{
            var id_reg = /^[0-9]*$/;
        }
		
		id.siblings('.msg_box').css({'display':'inline-block'});	
		if(id_val == '')
		 { 
		   id.siblings('.msg_box').removeClass().addClass('msg_box error');
           id.siblings('.msg_box').children('font').html(content+'不能为空');
		  }else
		 if(!id_reg.test(id_val))
				 { 
				   id.siblings('.msg_box').removeClass().addClass('msg_box error');
                   id.siblings('.msg_box').children('font').html('请输入正确的'+content);
				 }
			 else{  
					id.siblings('.msg_box').removeClass().addClass('right msg_box');
					id.siblings('.msg_box').children('font').html('')
				 }
	   
    }
    //check phone
    exports._check_input_phone = function(id1,id2,content,reg){
        var id1 = $('#'+id1)
        var id2 = $('#'+id2)
	    var id_val = id1.val()+id2.val();
        if(reg=='phone'){
            var id_reg = /^0(([1,2]\d)|([3-9]\d{2}))\d{7,8}$/;
        }else if(reg=="code"){
            var id_reg =/^[a-zA-Z0-9 ]{3,12}$/;        
        }else{
            var id_reg = /^[0-9]*$/;
        }
		
		id1.siblings('.msg_box').css({'display':'inline-block'});	
		if(id_val == '')
		 { 
		   id1.siblings('.msg_box').removeClass().addClass('msg_box error');
           id1.siblings('.msg_box').children('font').html(content+'不能为空');
		  }else
		 if(!id_reg.test(id_val))
				 { 
				   id1.siblings('.msg_box').removeClass().addClass('msg_box error');
                   id1.siblings('.msg_box').children('font').html('请输入正确的'+content);
				 }
			 else{  
					id1.siblings('.msg_box').removeClass().addClass('right msg_box');
					id1.siblings('.msg_box').children('font').html('')
				 }
	   
    }
    
    //check  name
    exports._check_input_text = function(realname,content){
      var realname = $('#'+realname);
	  var realname_val = realname.val();
	  var realname_reg = /[^\u4e00-\u9fa5]/;
      realname.siblings('.msg_box').css({'display':'inline-block'});
	  if( realname_val == '')
		  {
			realname.siblings('.msg_box').removeClass().addClass('msg_box error');
            realname.siblings('.msg_box').children('font').html(content);
			return false;
		  }
	  else{
	        realname.siblings('.msg_box').removeClass().addClass('right msg_box');
			realname.siblings('.msg_box').children('font').html('');
		  }	  
    }
    
    //upload
    exports.upload_load = function(id,form_id){
        $('#'+form_id).submit(function(){
                var l = $('input[data-value="image"]').length;               
                if(parseInt(l)<=0){
                    var sub = $('#submit');
                    sub.siblings('.msg_box').css({'display':'inline-block'});
                    sub.siblings('.msg_box').removeClass().addClass('msg_box error');
                    sub.siblings('.msg_box').children('font').html('请先上传文件或确认文件格式是否正确');
                }
                require('submitform');
    			$('#'+form_id).ajaxSubmit({
    			  url:'/?user&m=borrow/loan/uploads',
    			  success:function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == '100')
    				{
                       diyou.use('dialogs',function(dia){dia.success(results.msg,'this')});
                    }else if(results.code == '101'){
                        //empty error
                    }else{
    				   diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                    }
                  }
    			});
                return false;
          });
          
          
        $("#"+id).pluploadQueue({
    		// General settings
    		runtimes : 'html5,gears,flash,silverlight,browserplus,html4',
            url : '/?user&m=users/upload&code=05473503890b7f115ccfbda2510fbc95',
    		chunk_size: '1mb',
    		rename : true,
    		dragdrop: true,    		
    		filters : {
    			// Maximum file size
    			max_file_size : '2mb',
    			// Specify what files to browse for
    			mime_types: [
    				{title : "Image files", extensions : "jpg,gif,png"},
    				{title : "Zip files", extensions : "zip"}
    			]
    		},
            init:{
                FileUploaded: function(up, file, info) {
                    //判断文件大小 chenwei
                    if( file.size > 512*1024 ){
                        alert("单张图片大小不能大于512kb,请重新上传");
                        $('#uploader_filelist').html('');
                        return false;
                    }
                    var results = eval('('+info.response+')');
                    var input_var = document.createElement("input");
                    var form_var  = document.getElementById(form_id);                  
                    input_var.type="hidden";
                    input_var.name="image[]";
                    input_var.setAttribute('data-value','image');
                    input_var.value=results.result+'|'+file.size;
                    form_var.appendChild(input_var);
                }
    
            },
    		// Resize images on clientside if we can
    		//resize : {width : 320, height : 240, quality : 90},    
    		flash_swf_url : '/dyplugins/dyplupload/Moxie.swf'
    	});
        
        
    }
	
   //check chinese id card
   exports._check_idcard = function(card_id){
            var idcard = $('#'+card_id);
			var idcard_val = idcard.val();
				// 构造函数，变量为15位或者18位的身份证号码
			function clsIDCard(CardNo) {
			  this.Valid=false;
			  this.ID15='';
			  this.ID18='';
			  this.Local='';
			  if(CardNo!=null)this.SetCardNo(CardNo);
			}
			// 设置身份证号码，15位或者18位
			clsIDCard.prototype.SetCardNo = function(CardNo) {
			  this.ID15='';
			  this.ID18='';
			  this.Local='';
			  CardNo=CardNo.replace(" ","");
			  var strCardNo;
			  if(CardNo.length==18) {
				pattern= /^\d{17}(\d|x|X)$/;
				if (pattern.exec(CardNo)==null)return;
				strCardNo=CardNo.toUpperCase();
			  } else {
				pattern= /^\d{15}$/;
				if (pattern.exec(CardNo)==null)return;
				strCardNo=CardNo.substr(0,6)+'19'+CardNo.substr(6,9)
				strCardNo+=this.GetVCode(strCardNo);
			  }
			  this.Valid=this.CheckValid(strCardNo);
			}
			// 校验身份证有效性
			clsIDCard.prototype.IsValid = function() {
			  return this.Valid;
			}
			// 返回生日字符串，格式如下，1981-10-10
			clsIDCard.prototype.GetBirthDate = function() {
			  var BirthDate='';
			  if(this.Valid)BirthDate=this.GetBirthYear()+'-'+this.GetBirthMonth()+'-'+this.GetBirthDay();
			  return BirthDate;
			}
			// 返回生日中的年，格式如下，1981
			clsIDCard.prototype.GetBirthYear = function() {
			  var BirthYear='';
			  if(this.Valid)BirthYear=this.ID18.substr(6,4);
			  return BirthYear;
			}
			// 返回生日中的月，格式如下，10
			clsIDCard.prototype.GetBirthMonth = function() {
			  var BirthMonth='';
			  if(this.Valid)BirthMonth=this.ID18.substr(10,2);
			  if(BirthMonth.charAt(0)=='0')BirthMonth=BirthMonth.charAt(1);
			  return BirthMonth;
			}
			// 返回生日中的日，格式如下，10
			clsIDCard.prototype.GetBirthDay = function() {
			  var BirthDay='';
			  if(this.Valid)BirthDay=this.ID18.substr(12,2);
			  return BirthDay;
			}
			// 返回性别，1：男，0：女
			clsIDCard.prototype.GetSex = function() {
			  var Sex='';
			  if(this.Valid)Sex=this.ID18.charAt(16)%2;
			  return Sex;
			}
			// 返回15位身份证号码
			clsIDCard.prototype.Get15 = function() {
			  var ID15='';
			  if(this.Valid)ID15=this.ID15;
			  return ID15;
			}
			// 返回18位身份证号码
			clsIDCard.prototype.Get18 = function() {
			  var ID18='';
			  if(this.Valid)ID18=this.ID18;
			  return ID18;
			}
			// 返回所在省，例如：上海市、浙江省
			clsIDCard.prototype.GetLocal = function() {
			  var Local='';
			  if(this.Valid)Local=this.Local;
			  return Local;
			}
			clsIDCard.prototype.GetVCode = function(CardNo17) {
			  var Wi = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
			  var Ai = new Array('1','0','X','9','8','7','6','5','4','3','2');
			  var cardNoSum = 0;
			  for (var i=0; i<CardNo17.length; i++)cardNoSum+=CardNo17.charAt(i)*Wi[i];
			  var seq = cardNoSum%11;
			  return Ai[seq];
			}
			clsIDCard.prototype.CheckValid = function(CardNo18) {
			  if(this.GetVCode(CardNo18.substr(0,17))!=CardNo18.charAt(17))return false;
			  if(!this.IsDate(CardNo18.substr(6,8)))return false;
			  var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
			  if(aCity[parseInt(CardNo18.substr(0,2))]==null)return false;
			  this.ID18=CardNo18;
			  this.ID15=CardNo18.substr(0,6)+CardNo18.substr(8,9);
			  this.Local=aCity[parseInt(CardNo18.substr(0,2))];
			  return true;
			}
			clsIDCard.prototype.IsDate = function(strDate) {
			  var r = strDate.match(/^(\d{1,4})(\d{1,2})(\d{1,2})$/);
			  if(r==null)return false;
			  var d= new Date(r[1], r[2]-1, r[3]);
			  return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[2]&&d.getDate()==r[3]);
			}
    var checkFlag = new clsIDCard(idcard_val);
			if (!checkFlag.IsValid()) {
				idcard.siblings('.msg_box').removeClass().addClass('msg_box error');
                idcard.siblings('.msg_box').children('font').html('请输入正确的身份证号');
				return false;
			}else{
				idcard.siblings('.msg_box').removeClass().addClass('right msg_box');
				idcard.siblings('.msg_box').children('font').html('');
			}
    }
   
    
     //borrow details js	 hsd 
   exports.borrow_tabchange = function () {
       $('#tender_main_tit dd').bind('click', function () {
           var num = $('#tender_main_tit dd').index($(this));
           $('#tender_main_tit dd').removeClass('hover');
           $(this).addClass('hover');
           $('.j_tender_cont').css({ 'display': 'none' });
           $('.j_tender_cont').eq(num).css({ 'display': 'block' });
       });
       function slide(DivId, BtnId, mar_r) {
           var oDiv = $('#' + DivId);
           var oDivbox = $('#' + DivId + ' .fancy_box');
           var oBoxA = oDivbox.children('a');
           var oBoxALen = oBoxA.length;
           var oBtn = $('#' + BtnId);
           var oA = $('#' + BtnId + ' a')
           var oDivboxwidth = oBoxALen * (oBoxA.width() + mar_r);
           var num_all = $('#num_all');
           var num_now = $('#num_now');
           num_all.html(oBoxALen);
           num_now.html('1');
           oDivbox.width(oDivboxwidth);
           var iNow = 0;
           oA.eq(0).bind('click', function () {
               iNow--;
               if (iNow < 1)
               { iNow = 0; $(this).removeClass('hover') }
               var oDivboxLeft = iNow * (oBoxA.width() + mar_r);
               oDivbox.stop().animate({ 'left': -oDivboxLeft + 'px' }, 500);
               if (iNow > 0 && iNow < oBoxALen - 1)
               { oA.addClass('hover') }
               num_now.html(iNow + 1);
           });
           oA.eq(1).bind('click', function () {
               iNow++;
               if (iNow > oBoxALen - 1 || iNow == oBoxALen - 1)
               { iNow = oBoxALen - 1; $(this).removeClass('hover') }
               var oDivboxLeft = iNow * (oBoxA.width() + mar_r);
               oDivbox.stop().animate({ 'left': -oDivboxLeft + 'px' }, 500);
               if (iNow > 0 && iNow < oBoxALen - 1)
               { oA.addClass('hover') }
               num_now.html(iNow + 1);
           });
       }
       slide('data_verify', 'verify_btn', 30);
   }

 //exports.fancy_box = function () {
   //    $(document).ready(function () {
     //     $(".fancybox").fancybox();
       //})
 //}

 exports.panduan = function () {
     if (roam_account == 0) {
     $(".decrease").css("cursor", "default");
     $(".increase").css("cursor", "default");
     }
 }
 
//借款申请 liurui 14/11/24
exports.company_loan = function(form_id){
	
	//发送手机验证码
	 
	require('validate');
	var user_id = $("#user_id").val();
	//发送手机验证码
	$("#send_phonevalid").bind("click",function(){
		var phoneInput = $("#phone");
		var phone = phoneInput.val();
		if(!phoneInput.valid()){
			phoneInput.focus();
		}else{
			$("#send_phonevalid").addClass("get_verty_btnDis");
			diyou.use('index',function(dy){dy.setBtndisable('send_phonevalid','发送中...','#666666',true)});
			$.ajax({
				url:"/?user&m=approve/phone&action=send&type=borrow_apply&q=approve&phone="+phone,
				dataType:"text",
				type:'get',
				success:function(data){
					var results = eval('('+data+')');
					if(results.code == 'success'){
						exports._get_vericode('send_phonevalid',function(){
							diyou.use('index',function(dy){dy.setBtndisable('send_phonevalid','获取验证码','#ffeda6',false)});
						});
					}else{
						diyou.use('index',function(dy){dy.setBtndisable('send_phonevalid','获取验证码','#ffeda6',false)});
					}
				}                
			})
		}
	});
		 
	$("#borrow_style").bind("change",function(){
		if($("#borrow_style").val()=='endday'){
			$("#tipsData").html("(天)");
		}else{
			$("#tipsData").html("(月)");
		}
	});
	jQuery.validator.addMethod("muit3", function(value, element) {
		if($("#borrow_style").val()=='season'){
		var style=value%3;
		}   
		    return this.optional(element) || (!style);
		}, "请输入3的倍数");     
	 $("#"+form_id).validate({
			onkeyup:function(element){
				$(element).valid();
			},
            rules: {
				realname:{
					required:true,
					zh_ch:true,
					minlength:2
				},
				phone: {required:true,phone:true},                
				phoneCode:"required",
                work_city: "required",
                borrow_style: "required",
				titles: {required:true,maxlength:25},
                account:{required:true,number:true,decimals:true,min:0},                
                borrow_period:{required:true,digits:true,min:0,muit3:true},
                borrow_apr:{required:true,decimals:true,min:0},
                email: {required:true,email:true},
                contents: {required:true,maxlength:200},
				valicode:{
					required:true,
					rangelength:[4,4],
					remote:{
						url:'/?plugins&q=check_imgcode',
						type: "post",
						dataType:'json',
						data: {                     
							valicode: function() {
								return $("#valicode").val();
							}
						}
					}
				}
            },
            messages: {
            	realname:{
					required:"请输入您的真实姓名",
					zh_ch:"姓名格式只能为中文",
					minlength:"姓名不能少于两位"
				},
				phone: {required:"请输入手机号",phone:"请输入正确的手机号"},                
				phoneCode:"请输入手机验证码",
                work_city: "请选择所在城市",
                borrow_style: "请选择还款方式",
				titles: {required:"请输入项目名称",maxlength:"不能超过25个汉字"},
				account:{required:"请输入借款金额",number:"请输入正确的金额",decimals:"金额不能超过两位小数",min:"请输入正确的金额"},                
                borrow_period:{required:"请输入借款期限",digits:"请输入正确的借款期限",min:"请输入正确的借款期限",muit3:"请输入3的倍数"},
                borrow_apr:{required:"请输入年化回报率",decimals:"年化回报率不能超过两位小数",min:"请输入正确的年化回报率"},
                email: {required:"请输入邮箱",email:"请输入正确的邮箱"},
                contents: {required:"请填写详细描述",maxlength:"不能超过200个汉字"},
				valicode:{
					required:"请填写验证码",
					rangelength:"请输入4位验证码",
					remote:"验证码错误"
				}
            },
            errorPlacement:function(error,element) {
            	error.appendTo(element.parent());
                },
            errorElement:'em',
			success: "valid",
            submitHandler:function(form){
				 $(form).ajaxSubmit({
				 url:'/?user&m=borrow/apply/borrow_apply&q=borrow',   
				  success:function(result,status){
					var results = eval('('+result+')');
					if(results.code == '100')
					{
					   diyou.use('dialogs',function(dia){dia.success(results.msg,'/?user&m=borrow/loanapply/loanapply_log')});
					}else{
					   diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
					}
				  }
			});
            return false;
                }
        });
}
exports._get_vericode = function(get_verty_btn,callback){
	       var o=$('#'+get_verty_btn);
		   //var vericode_txt = $('#'+phone_vericode)
		   var wait=60;
		  	var timeID=setInterval(function(){
		      	if(wait==-1){
				   clearInterval(timeID);
				   $("#"+get_verty_btn).removeClass("get_verty_btnDis");
				   callback();
				  }
			  	else{
			       o.val(wait+"秒后重新发送");wait--;
				   }
			},1000); 
	   }
});
