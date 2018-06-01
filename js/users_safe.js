/*!
 * Created By:james;
 * Created Time:2013-11-11;
 * Updated By:james;
 * Updated Time:2013-11-11;
 * http://www.diyou.cn
 */
 define(function(require, exports, module) {
	
    //safe_email
    exports.safe_email = function(form_id){
        
        $('#'+form_id).live('submit',function(){
             var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            isok= reg.test($("#email").val());
            if ($("#email").val()==''){
                $('#safe_email').html('邮箱不能为空');
            }else if (!isok) {
                $('#safe_email').html('邮箱错误');
            }else{
                
                require('submitform');
                $(this).ajaxSubmit({
                      url:"/?user&m=approve/email&action=send_email",
        			  success:function(result,status){
        			    var results = eval('('+result+')');
        				if(results.code == 'success')
        				{
        				     $('#safe_email').html(results.msg+"<a class='a_link' href='"+results.mailurl+"' target='_blank'>点此登录</a>");
        				    //diyou.use('dialogs',function(dy){dy.dialog('提示','/?user&m=approve/safe&type=email_success_notice')});
        				     //diyou.use('dialogs',function(dia){dia.success('激活邮件已经发送到你的新邮箱，请注意查收','')}); 
                            
                        }else{
        				   $('#safe_email').html(results.msg);
                        }
                      }
    			});
         }
            return false;
        });
    }
    
    //email_edit
    exports.safe_email_edit =function(form_id){
        $("#get_valicode").click(function(){
             $.ajax({
                type: "GET",
                url: "/?user&m=approve/email&action=update_send"
            });
             diyou.use('index',function(dy){dy._get_vericode('get_valicode','valicode')});
        })
        $('#'+form_id).submit(function(){
            var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            isok= reg.test($("#email").val());
            if ($("#valicode").val()==''){
                $('#email_error').html('验证码不能为空');
            }else if ($("#email").val()==''){
                $('#email_error').html('邮箱不能为空');
            }else if (!isok) {
                $('#email_error').html('邮箱错误');
            }else{
              $('#email_error').html('');
                require('submitform');
                $(this).ajaxSubmit({
                      url:"/?user&m=approve/email&action=update_email_new",
        			  success:function(result,status){
        			    var results = eval('('+result+')');
        				if(results.code == 'success')
        				{
        				    $('#email_error').html("激活邮件已经发送到你的新邮箱，请注意查收,<a class='a_link' href='"+results.emailurl+"' target='_blank'>点此登录</a>");
                           //diyou.use('dialogs',function(dia){dia.success('激活邮件已经发送到你的新邮箱，请注意查收','')}); 
                        }else{
        				   $('#email_error').html(results.msg);
                        }
                      }
    			});
            }
            return false;
        });
       
    }
    
	
	//email_active  
	exports.email_send = function(){
		$('#send_email_active').bind('click',function(){
			var email_active=$('#email_active').val();  
			$.post("/?user&q=reg&type=email_active",function(result){
				var results = eval('('+result+')');
				if(results.code=='success'){
					$('#email_send_warning').html("<span>发送成功，请登录邮箱确认激活！</span>");
				}else{
					$('#email_send_warning').html("<span>"+results.msg+"</span>");
				}
                //3秒 后event
                setTimeout(function(){$('#email_send_warning').html('<a href="" class="user_bg_c1">登录邮箱激活</a>')},3000);
			});
		});
	}
    
    
    exports.phone = function(form_id){
        $('#'+form_id).bind('submit',function(){
            $('#phone_warn').html('');
           var phone_reg = /^1[3|4|5|8][0-9]\d{8,8}$/;
            if ($("#phone_new").val()==''){
                $("#phone_warn").html('手机号不能为空');
            }else if(!phone_reg.test($("#phone_new").val())){
             $("#phone_warn").html('手机号格式不正确');
            } else if ($("#phone_code").val()==''){
                $("#phone_warn").html('验证码不能为空');
            }else{
                require('submitform');
                $(this).ajaxSubmit({
                      url:"/?user&m=approve/phone&action=approve_send",
        			  success:function(result,status){
        			    var results = eval('('+result+')');
        				if(results.code == 'success')
        				{
                           diyou.use('dialogs',function(dia){dia.success(results.msg,'this')});  
                        }else{
        				   $('#phone_warn').html(results.msg);
                        }
                      }
    			});
            }
            return false;
        });
        
        $('#get_phone_code').click(function(){
            $('#phone_warn').html('');
            var phone_reg = /^1[3|4|5|8][0-9]\d{8,8}$/;
            if ($("#phone_new").val()==''){
                $("#phone_warn").html('手机号不能为空');
            }else if(!phone_reg.test($("#phone_new").val())){
             $("#phone_warn").html('手机号格式不正确');
            } else{
               $.ajax({
                　　type:'post',            
                　　url:'/?user&m=approve/phone&action=approve_code',  
                    data:'phone='+$('#phone_new').val(), 
                　　dataType:'text', 
                　　success:function(msg){
                        var results = eval('('+msg+')');
                        if(results.code == 'success'){
                            //$('#get_phone_code').attr('value','发送成功');
                            diyou.use('index',function(dy){dy._get_vericode('get_phone_code','phone_code')});
                        }else{
                            $("#phone_warn").html(results.msg);
                        }
                　　},            
                　　error:function(){
                        diyou.use('dialogs',function(dia){dia.error('对不起发生错误了！','')});
                    }
                })
               }
        });
    }

     //phone  approve
     exports.phone_edit = function(form_id){

         $('#'+form_id).bind('submit',function(){
             $('#phone_warn').html('');
             if ($("#phone_code").val()==""){
                 $('#phone_warn').html('请输入验证码');
             }else{
                 require('submitform');
                 var url='/?user&m=approve/phone&action=unbund_send';
                 $(this).ajaxSubmit({
                     url:url,
                     success:function(result,status){
                         var results = eval('('+result+')');
                         if(results.code == 'success')
                         {
                             //jDialog.alert('发送成功！')
                             $("#form_change").show();
                             $("#phone_edit").hide();
                             // diyou.use('dialogs',function(dia){dia.success('手机解绑成功，你可以重新绑定','this')});
                         }else{
                             $('#phone_warn').html(results.msg);
                         }
                     }
                 });
             }
             return false;
         });

         $('#get_phone_code').click(function(){
             $('#phone_warn').html('');
             $.ajax({
                 type:'post',
                 url:'/?user&m=approve/phone&action=unbund_code',
                 dataType:'text',
                 success:function(msg){
                     var results = eval('('+msg+')');
                     if(results.code == 'success'){
                         $('#get_phone_code').attr('value','发送成功');
                         diyou.use('index',function(dy){dy._get_vericode('get_phone_code','phone_code')});
                     }else{
                         $("#phone_warn").html(results.msg);
                     }
                 },
                 error:function(){
                     diyou.use('dialogs',function(dia){dia.error('对不起发生错误了！','')});
                 }
             })
         });
     }
    
    exports.phone_safeclose = function(form_id){
        $('#'+form_id).bind('submit',function(){
            $('#phone_warn').html('');
            if ($("#safe_code").val()==""){
                $('#safe_code_error').html('请输入手机宝令');
            }else{
                require('submitform');
                $(this).ajaxSubmit({
                      url:"/?user&m=approve/phone&action=phone_safeclose",
        			  success:function(result,status){
        			    var results = eval('('+result+')');
        				if(results.code == 'success')
        				{
                           diyou.use('dialogs',function(dia){dia.success('手机宝令关闭成功，你可以重新开通','/?user&m=approve/safe')});        
                        }else{
        				   $('#safe_code_error').html(results.msg);
                        }
                      }
    			});
            }
            return false;
        });
        
        
    }
    exports.get_paypassword = function(form_id){
        $('#get_phone_code').click(function(){
           $.ajax({
            　　type:'post',            
            　　url:'/?user&m=approve/phone&action=send&type=getpaypwd',   
            　　dataType:'text', 
            　　success:function(msg){
                    var results = eval('('+msg+')');
                    if(results.code == 'success'){
                        diyou.use('index',function(dy){dy._get_vericode('get_phone_code','phone_code')});
                        $('#get_phone_code').attr('value','发送成功');
                        $("#password_warn").html("短信验证码已发送，请注意查收手机！");
                    }else{
                        $("#password_warn").html(results.msg);
                    }
            　　},            
            　　error:function(){
                    diyou.use('dialogs',function(dia){dia.error('对不起发生错误了！','')});
                }
            
            })
        });
        $('#phone_code').bind('keyup',function(){
		  $('#password_warn').html('');
		});
        $('#'+form_id).live('submit',function(){
            $('#password_warn').html('');
            if($('#phone_code').val()==""){
                 $('#password_warn').html("*验证码不能为空");
                 return false;
            }            
            require('submitform');
            $(this).ajaxSubmit({
                  url:"/?user&m=users/getpaypwd",
    			  success:function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == 'success')
    				{
                       diyou.use('dialogs',function(dia){dia.dialog("重新设置支付密码",'/?user&m=approve/safe&type=paypwd_reset&id='+results.id)});                  
                    
                    }else{
    				   $('#password_warn').html(results.msg);
                    }
                  }
			});
            return false;
        });
    
   }
   
   
   
	
	//修改支付密码
	exports.update_paypassword = function(form_id){
		$('#newpassword').bind('input propertychange',function(){ 
				diyou.use("index",function(i){i._check_pwd_stg('newpassword')});
		});
          
        require('validate');
        $("#"+form_id).validate({
		    onfocusout:function(element) {$(element).valid()},
            onkeyup:function(element) {$(element).valid()},
			errorElement:'span',
    		rules: {
    			oldpassword: "required",
                newpassword: {required: true,rangelength:[6,15],checkpassword:true,noequalTo:'#oldpassword'},
    			newpassword1: {required: true,equalTo: "#newpassword"}
    		},
    		messages: {
    			oldpassword: "请输入原密码",
                newpassword: {required: "请输入新密码",rangelength: "长度在6-15位英文、数字或下划线组合",checkpassword:"密码格式不正确,必须由英文、数字或下划线组成",noequalTo:'密码不能与原密码相同'},
    			newpassword1: {required: "请再次输入新密码",equalTo: "请输入相同的密码"}
    		}
	    });
        $('#oldpassword').bind('keyup',function(){
		  $('#error').html('');
		});
        $('#newpassword').bind('keyup',function(){
		  $('#error').html('');
		});
        $('#newpassword1').bind('keyup',function(){
		  $('#error').html('');
		});
		$('#'+form_id).live('submit',function(){
            $('#error').html('');
            require('submitform');
            $(this).ajaxSubmit({
                  url:"/?user&m=users/paypwd",
    			  success:function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == '100')
    				{
                       diyou.use('dialogs',function(dia){dia.success(results.msg,'this')});                  
                    }else if(results.code == '101'){
                        //null
                    }else{
    				   $('#error').html(results.msg);
                    }
                  }
			});
            return false;
        });
        
        /*设置登录密码 第三方 qq sina用户 wqs*/
        $('#set_password').click(function(){
            window.location.href="/?user&q=api&type=qq&action=bind";
            return true;
        })
		
	}
    
    
   
   exports.set_paypassword = function(form_id){
       
        $('#'+form_id).bind('submit',function(){
            if ($("#newpaypwd").val()==""){
                $("#password_warn").html("新支付密码不能为空");
            }else if ($("#newpaypwd").val().length<6 || $("#newpaypwd").val().length>15){
                $("#password_warn").html("密码在6位到15位之间");
            }else if ($("#_newpaypwd").val()!=$("#newpaypwd").val()){
                $("#password_warn").html("两次密码不一样");
            }else if ($("#phone_code").val()==''){
                $("#password_warn").html("验证码不能为空");
            }else{
                $('#password_warn').html('');                     
                require('submitform');
                $('#'+form_id).ajaxSubmit({
                      url:"/?user&m=users/setpaypwd&id="+$("#_id").val(),
        			  success:function(result,status){
        			    var results = eval('('+result+')');
        				if(results.code == 'success')
        				{
                           diyou.use('dialogs',function(dia){dia.success(results.msg,'')});   
                        }else{
        				   $('#password_warn').html(results.msg);
                        }
                      }
    			});
            }
            return false;
        });
    
   }
   
   //手机认证
   exports.approve_phone = function(class_id){
        $('.'+class_id).click('click',function(){
            diyou.use('dialogs',function(dy){dy.dialog('手机认证','/?user&m=approve/safe&type=phone')});
        })
   }
});