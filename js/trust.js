define(function(require, exports, module) {
    //资金托管的样式
     //银行卡
   exports.bank = function(){
        $('#add_bank').live('click',function(){
            diyou.use('dialogs',function(d){d.dialog('绑定银行卡','/?user&m=trust/bank&type=ok');});
            this.href="/?user&m=trust/bank/bindbank";
            return true;

        })
        $("a[data-type='remove_bank']").bind('click',function(){
            var url = '/?user&m=trust/bank/remove&id='+$(this).attr('data-nid');
             diyou.use('dialogs',function(dia){dia.confirm_success('是否确认删除银行卡，删除后提现需要重新绑定。',url,'','')});
        })
       //更新银行卡信息
       $('#update_banks').live('click', function(){
           if(trust_status=='error'){
               diyou.use('dialogs',function(dy){dy.error('你还没有托管账号,请先开通1！','/?user&m=trust/account')});
               return false;
           }
           diyou.use('dialogs',function(dy){dy.message('温馨提示', '数据正在处理中，请稍后！')});
           var toUrl = '/?user&m=trust/bank/list';
           $.getJSON('/?user&m=trust/update_bankcard',{}, function(response){
                if(response['code'] == '0') {
                    diyou.use('dialogs',function(dy){dy.success('更新成功！',toUrl)});

                } else {
                    diyou.use('dialogs',function(dy){dy.error(response['msg'], toUrl)});
                }
               return false;
           })
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
        		},submitHandler:function(form) {
    	    
					$(form).ajaxSubmit({
						 url:'/?user&m=trust/bank/new',              
						  success:function(result,status){
							var results = eval('('+result+')');
							if(results.code == '100')
							{
							   diyou.use('dialogs',function(dia){dia.success(results.msg,'/?user&m=trust/bank/list')});                  
							}else if(results.code == '101'){
								//null
							}else{
							   diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
							}
						  }

						
					})
					return false;
				}
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
					ajax_phone_code:"手机验证码不能为空"
        		},submitHandler:function(form) {
					  $(form).ajaxSubmit({
						success:function(result,status){
							var results = eval('('+result+')');
							if(results.code=='100'){
								diyou.use('dialogs',function(dia){dia.success(results.msg,'/?user&m=trust/bank/list')});
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
            if(phone_status !='1'){
                diyou.use('dialogs',function(dia){dia.error('你还未进行手机认证，请先认证','/?user&m=approve/safe')});
                return false;
            }
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
   
   
   //提现记录
   exports.cash_log = function(value){
        diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=trust/cash/log&type=list')});
        $("#status").change(function(){
            var _data = "&status="+$(this).val();
            diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=trust/cash/log&type=list'+_data)});
            return false;
        })
        
   }
   
    /*邮箱认证*/
    exports.email = function(form_id, warn_id) {
        require('validate');
        require('submitform');
        var first = true;
        $("#" + form_id).validate({
            errorPlacement: function(error, element) {
                error.appendTo(element.parent())
            },
            onfocusout: function(element) {
                $(element).valid();
                $('#' + warn_id).html('');
            },
            onkeyup: function(element) {
                $(element).valid();
                $('#' + warn_id).html('');
            },
            errorElement: 'span',
            rules: {
                email: {email: true, required: true}
            },
            messages: {
                email: {email: "邮箱格式不正确！", required: "请输入邮箱"}
            },
            submitHandler: function(form) {
                if (first == true) {
                    first = false;
                    $('#' + form_id).ajaxSubmit({
                        url: "/?user&m=trust/approve&type=checkemail",
                        success: function(result, status) {
                            var results = eval('(' + result + ')');
                            if (results.code == "success") {
                                diyou.use('dialogs', function(dia) {
                                    dia.dialog('资金托管认证注册', '/?user&m=trust/approve&type=status' + '&mail=' + $('#email').val() + '&mailurl=' + results.mailurl)
                                });
                            } else {
                                $("#email_warn").html(results.msg);
                                first = true;
                            }
                        }
                    });
                }
                return false;
            }
        });
    }
    /*邮箱重新发送*/
    exports.email_send = function(){
        $('#email_send_warning').hide();
        $('#send_email_active').bind('click',function(){
            var email_active=$('#email_active').val();  
            $.post("/?user&q=reg&type=email_active&action=resend",function(result){
                $('#email_send_warning').show();
                $('#login_email').hide();
                var results = eval('('+result+')');
                if(results.code=='success'){            
                    
                    exports.countDown(3, 'login_email');
                   
                    
                    
                }else{
                    $('#email_send_warning').html("<span>"+results.msg+"</span>");
                }
            });
        });
    }
    exports.countDown = function(secs,id) {
        $('#email_send_warning').html("<i></i><em>发送成功，请登录邮箱确认激活！</em>");
        if (--secs > 0) {
            setTimeout(function(){
                exports.countDown(secs,id);
            }, 1000);
        }
        else {
            $('#'+id).show();
        }
    }
    /*实名认证*/
    exports.realname = function(form_id, warn_id) {
        require('validate');
        $("#"+form_id).validate({
            onfocusout:function(element) {
                $(element).valid();
            },
            onkeyup:function(element) {
                $(element).valid();
            },
            rules: {
                card_id:{required: true, idcard: true},
                realname:{required: true,zh_ch: true}
            },
            messages:{
                card_id: {required: "请输入身份证号", idcard: "请输入正确的身份证号"},
                realname: {required: "请输入真实姓名", zh_ch: "请输入正确的姓名"}
            },
            submitHandler:function(form){
                diyou.use('index',function(dy){dy.setBtndisable('realname_sub','提交中...','#666666',true)})
                    $("#"+warn_id).html('');  
                    $(form).ajaxSubmit({
                    url: "/?user&m=trust/approve&type=realname",
                    type:"post",
                    dataType:"json",
                    success: function(results, status) {
                      //  var results = eval('('+result+')');
                        if (results.code == "success") {
                            diyou.use('dialogs', function(dia) {
                                dia.dialog('资金托管认证注册', '/?user&m=trust/approve&type=check')
                            });
                        } else {
                            $("#"+warn_id).html(results.msg);
                            diyou.use('index',function(dy){dy.setBtndisable('realname_sub','下一步','#0697DA',false)});
                        }
                   
                    }
                });
                return false;
            }
        });
    }

    /*手机认证*/
    exports.phone = function(form_id, warn_id) {
        require('validate');
       // require('submitform');
        $("#" + form_id).validate({
            errorPlacement: function(error, element) {
                error.appendTo(element.parent())
            },
            onfocusout: function(element) {
                $(element).valid();
                $('#' + warn_id).html('');
                $('#phone_error').html('');
            },
            onkeyup: function(element) {
                $(element).valid();
                $('#' + warn_id).html('');
                $('#phone_error').html('');
            },
            errorElement: 'span',
            rules: {
                phone: {phone: true, required: true},
                vericode: {required: true, number: true}
            },
            messages: {
                phone: {phone: "手机格式不正确，请重新输入", required: "请输入手机号码"},
                vericode: {required: "请输入手机验证码", number: "验证码格式不正确，请重新输入"}
            },
            submitHandler: function(form) {
                $('#' + form_id).ajaxSubmit({
                    url: "/?user&m=approve/phone&action=approve_send",
                    type:"post",
                    dataType:"json",
                    success: function(results, status) {
                        //var results = eval('(' + result + ')');
                        if (results.code == "success") {
                            $('#' + warn_id).html("验证成功");
                            diyou.use('dialogs', function(dia) {
                                dia.dialog('资金托管认证注册', '/?user&m=trust/approve&type=check')
                            });
                        } else {
                            
								$("#"+warn_id).html(results.msg);	
                           
                        }
                    }
                });
                return false;
            }
        });

    }
    /*获取手机验证码  可通用*/
    exports.get_phone_code = function(get_id, type, code_id) {
       $('#' + get_id).click(function() {
			if($("#phone").hasClass("error")){
			return false;
			}
            var _url = '';
            _url = '/?user&m=approve/phone&action=approve_code&type=' + type;
            $.ajax({
                type: 'post',
                url: _url,
                data: 'phone=' + $('#phone').val(),
                dataType: 'json',
                success: function(results) {
                   // var results = eval('(' + msg + ')');
                    if (results.code == 'success') {
                        diyou.use('index', function(dy) {
                            dy._get_vericode(get_id, code_id)
                        });
                        $('#' + get_id).attr('value', '发送成功');
                        $('#' + get_id).removeClass('get_verty_btn_dis');
                        $('#' + get_id).addClass('phone_min');
                    } else {
                       
                        $('#phone_error').html(results.msg);
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    diyou.use('dialogs', function(dia) {
                        dia.error('对不起发生错误了！', '')
                    });
                }

            })
        })
    }
    
    
    //recharge 
    exports.recharge = function(form_id){  
        if(trust_status=='error'){
            diyou.use('dialogs',function(dy){dy.error('请先开通汇付天下账号','/?user&m=trust/account');});
            return false;
        }
        $('#money').bind('blur',function(){
			diyou.use('users',function(dy){dy._check_input_text('money',"请输入金额")})
	    })
        

        $('#money').bind('blur',function(){
            var ac = $('#money').val();
            if(ac==""){
                $("#fee").html('￥0.00');
                $("#account").html('￥0.00');
            }else{
                    
                $.ajax({
                   type: 'get',
                   url: '/?user&m=trust/recharge/get_fee&type=recharge_success',
                   data: "account="+ac,
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
                            
                $.ajax({
                   type: 'get',
                   url: '/?user&m=trust/recharge/get_fee&type=recharge_success',
                   data: "account="+ac,
                   success: function(account){
                     $("#fee").html('￥'+account);
                     $("#account").html('￥'+Math.round((ac-parseFloat(account))*100)/100);
                   }
                });
            }
        })
        $('#'+form_id).live('submit',function(){
            diyou.use('users',function(dy){dy._check_input_text('money',"请输入金额")}) 
            if ($("#money").val()=="" ){
                return false;
            }
			diyou.use('dialogs',function(d){d.dialog('提示','/?user&m=trust/recharge&type=ok');});	
			return true;
                  
        });
        //银行信息开启隐藏
		$('#bank_show a').toggle(function(){
		   $('#bank_more').css({'display':'block'});
		},
		function(){
		   $('#bank_more').css({'display':'none'});
		})
    }
    
    
    //投标弹窗 wqs 12-13
    exports.tender = function() {
        $('#tender_all').click(function() {
            var borrow_account_wait = parseInt($('#borrow_account_wait').val());
            var user_balance = parseInt($('#user_balance').val());
            var tender_account = borrow_account_wait > user_balance ? user_balance : borrow_account_wait;
            $('#tender_money').val(tender_account);

            var _money = $('#tender_money').val();
            var borrow_nid = $('#borrow_nid').val();
            if (_money == '') {
                $('#income_all').html('￥0.00')
            }
            else {
                $.ajax({
                    type: "get",
                    url: '/?user&m=trust/tender/get_income',
                    data: '&account=' + _money + '&borrow_nid=' + borrow_nid,
                    cache: false,
                    success: function(data) {
                        if (data != "") {
                            var obj = eval("(" + data + ")");
                            $('#income_all').html('￥' + obj.all);
                            $('#interest').html(obj.lixi);
                            $('#award').html(obj.award);
                            var _display = '<ul><li><span>收款日</span><span>类型</span><span>收款金额</span></li>';
                            $.each(obj.list, function(i, _obj) {
                                _display += ' <li ';
                                if (i % 2 == 0) {
                                    _display += '';
                                }
                                if (_obj.type == "lixi") {
                                    _title = "利息";
                                } else if (_obj.type == "award") {
                                    _title = "奖励";
                                    _obj.date_time = "标审核通过";
                                }
                                _display += '><span>' + _obj.date_time + '</span><span>' + _title + '</span><span>￥' + _obj.account + '</span></li>';
                            })
                            _display += '</ul>';
                            $("#tender_detail").html(_display);
                        }
                    }
                });
            }
        })

        //开始投资
        $("#tender_new_form").bind("submit", function() {
            var acc = $("#tender_money").val();
            if (acc == '') {
                alert('投资金额不能为空');
                return false;
            }
            require("submitform");
            $("#tender_new_form").ajaxSubmit({
                success: function(result, status) {
                     var results = eval('(' + result + ')');
                    if (results.code == 'success') {
                        diyou.use('index', function(dy) {
                            dy._get_vericode(get_id, code_id)
                        });
                        $('#' + get_id).attr('value', '发送成功');
                        $('#' + get_id).removeClass('get_verty_btn_dis');
                        $('#' + get_id).addClass('phone_min');
                    } else {
                        diyou.use('dialogs', function(dia) {
                            $('#phone_warn').html(results.msg);
                            //dia.error(results.msg, '')
                        });
                    }
                    return false;
                }

            });
            return false; // cancel conventional submit
        })
    }

    //get income hsd
    exports.get_income = function() {
        $('#tender_money').bind('input propertychange', function() {
            var _money = $(this).val();
            var borrow_nid = $('#borrow_nid').val();

            if (parseInt($('#borrow_account_wait').val()) < parseInt(_money)) {
                $('#pssword_error').html('投资金额不能大于可投金额');
                return false;
            }
            if (_money == '') {
                $('#income_all').html('￥0.00')
            }
            else {
                $.ajax({
                    type: "get",
                    url: '/?user&m=borrow/tender',
                    data: '&p=get_income&account=' + _money + '&borrow_nid=' + borrow_nid,
                    cache: false,
                    success: function(data) {
                        if (data != "") {
                            var obj = eval("(" + data + ")");
                            $('#income_all').html('￥' + obj.all);
                            $('#interest').html(obj.lixi);
                            $('#award').html(obj.award);
                            var _display = '<ul><li><span>收款日</span><span>类型</span><span>收款金额</span></li>';
                            $.each(obj.list, function(i, _obj) {
                                _display += ' <li ';
                                if (i % 2 == 0) {
                                    _display += '';
                                }
                                if (_obj.type == "lixi") {
                                    _title = "利息";
                                } else if (_obj.type == "award") {
                                    _title = "奖励";
                                    _obj.date_time = "标审核通过";
                                }
                                _display += '><span>' + _obj.date_time + '</span><span>' + _title + '</span><span>￥' + _obj.account + '</span></li>';
                            })
                            _display += '</ul>';
                            $("#tender_detail").html(_display);
                        }
                    }
                });
            }
        });

        $("#tender_income").toggle(function() {
            $(".window_by_income_show").css({'display': 'block'});
            $(this).html("缩起收款明细");
        },
                function() {
                    $(".window_by_income_show").css({'display': 'none'});
                    $(this).html("展开收款明细");
                })
        $(document).ready(function() {
            $('#tender_money').trigger('input');
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
                   url: '/?user&m=trust/cash/get_fee',
                   data: "account="+ac,
                   success: function(account){
                     $("#fee").html('￥'+account);
                     $("#account").html('￥'+Math.round((ac-parseFloat(account))*100)/100);
                   }
                });
            }
        })
        $("#"+form_id).bind("submit", function() {
            var safe_code = $('#safe_code');
            if(safe_code.length >0 && $('#safe_code').val()==''){
                $('#safe_code_error').html('手机宝令不能为空');
                return false;
            }
        });
    }
});

