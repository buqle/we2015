/*!
 * Created By:wqs;
 * Created Time:2013-11-11;
 * Updated By:wqs;
 * Updated Time:2013-11-11;
 * http://www.diyou.cn
 */
define(function(require, exports, module) {
     //qq  sina wqs 12-13
   exports.api_event = function(cancel_sina,bind_sina,cancel_qq,bind_qq){
        //qq 绑定
        $('#'+bind_qq).click(function(){
            /*$.get("/?user&q=api&type=qq&action=_bind",function(result){
				if(result==1){
					diyou.use("dialogs",function(e){e.success("绑定成功",'this',"");});
				}else{
					diyou.use("dialogs",function(e){e.error("绑定失败","");});
				}
			});*/
            window.location.href="/?user&q=api&type=qq&action=login";
        })
        //qq解绑
        $('#'+cancel_qq).click(function(){
            $.get("/?user&q=api&type=qq&action=cancel",function(result){
				if(result==1){
					diyou.use("dialogs",function(e){e.success("解绑成功",'this',"");});
				}else{
					diyou.use("dialogs",function(e){e.error("解绑失败","");});
				}
			});
        })
        //sina 绑定
        $('#'+bind_sina).click(function(){
            /*$.get("/?user&q=api&type=sina&action=_bind",function(result){
				if(result==1){
					diyou.use("dialogs",function(e){e.success("绑定成功",'this',"");});
				}else{
					diyou.use("dialogs",function(e){e.error("绑定失败","");});
				}
			});*/
            window.location.href="/?user&q=api&type=sina&action=login";
       })
        //sina 解绑
        $('#'+cancel_sina).click(function(){
            $.get("/?user&q=api&type=sina&action=cancel",function(result){
				if(result==1){
					diyou.use("dialogs",function(e){e.success("解绑成功",'this',"");});
				}else{
					diyou.use("dialogs",function(e){e.error("解绑失败","");});
				}
			});
        })
        
   }
   
   //api_reg
   exports.api_reg = function(form_id){
        //require('validate');  
        require('submitform');   
         $('#email').bind('focus',function(){
	     $(this).siblings('.msg_box').css({'display':'inline-block'});
	  }).bind('blur',function(){
		      exports._check_email('email');
		});
        //check password strength		
        $('#password').bind('input propertychange',function(){ 
            diyou.use('users_check',function(c){c._check_pwd_stg('password')});
		}).bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		 }).bind('blur',function(){
		  diyou.use('users_check',function(c){c._check_pwd('password')});
		})  
        //check the confirm password
		$('#confirm_password').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		}).bind('blur',function(){
			diyou.use('users_check',function(c){c._check_con_pwd('password','confirm_password')});
		})
        //check username
		 $('#username').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  }).bind('blur',function(){
		      exports._check_username('username');
		})
          $('#'+form_id).submit(function(){
                $('#'+form_id).ajaxSubmit({                  
        			  success:function(result,status){
        			        var results = eval('('+result+')');
                            if(results.code == "success"){
                                diyou.use('dialogs',function(dia){dia.success(results.msg,'/')});
                            }else{
                                diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                            }
                      }
        			});
                 return false;
          })  
        /*$("#"+form_id).validate({
            errorPlacement:function(error,element){error.appendTo(element.parent())},
            onfocusout:function(element) {$(element).valid();$('#'+warn_id).html('');},
            onkeyup:function(element) {$(element).valid();$('#'+warn_id).html('');},
            errorElement:'span',
    		rules: {
    			email: {email:true,required:true},
                username:{required:true},
                password:{required:true,checkpassword:true},
                confirm_password:{required:true,checkpassword:true,equalTo:"#password"}
    		},
    		messages: {
    			email: {email:"邮箱格式不正确！",required:"请输入邮箱"},
                username:{required:"请输入用户名"},
                password:{required:"请输入用户名",checkpassword:"密码必须在6-15个字符之间"},
                confirm_password:{required:"请输入用户名",checkpassword:"密码必须在6-15个字符之间",equalTo:"两次输入密码不一致"}
    		},
            submitHandler:function(form) {                
                $('#'+form_id).ajaxSubmit({                  
    			  success:function(result,status){
    			        var results = eval('('+result+')');
                        if(results.code == "success"){
                            diyou.use('dialogs',function(dia){dia.success(results.msg,'/')});
                        }else{
                            diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                        }
                  }
    			});
                 return false;
             }
	    });*/
        //next
        $('#next').click(function(){
            diyou.use('dialogs',function(dia){dia.dialog('手机认证','/?user&m=approve/safe&type=loan_approve_dialog_email&action=two')});
        })
   }
   
    exports._check_email = function(_email){
    	   var email_reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
           var email = $('#'+_email);
    	   var email_val = email.val();
		   if(email_val == ''){
		      diyou.use('users_check',function(c){c._check_error(_email,'邮箱不能为空')});
                  return false;					  
			   }
			 else{
		        if(!email_reg.test(email_val)) {  
		            diyou.use('users_check',function(c){c._check_error(_email,'邮箱格式不正确')});
                   return false;
				 }
			     else{   
			          $.getJSON('/?user&q=reg&type=_chkemail&email='+email_val,function(result){
    			         if(result.code=='100'){
    			             diyou.use('users_check',function(c){c._check_right(_email)});    			             
                              return true;
    			         }else{
    			             diyou.use('users_check',function(c){c._check_error(_email,'邮箱已存在')});
                               return false;
    			         }
    			       });
			 
				 }
			   }
	   }
       
       exports._check_username = function(_username){
	     var username = $('#'+_username);
	     var username_val = username.val();
         var username_len = diyou.use('users_check',function(c){c._check_len(username_val)});
         var username_reg = /^([0-9]){0,}$/	
			if(username_len < 4 || username_len > 16)
			{  
              diyou.use('users_check',function(c){c._check_error(_username,'4-16位字符,可包含中文,英文,数字')});
			  return false;
			}
			else
			if(username_reg.test(username_val))
			{ 
			  diyou.use('users_check',function(c){c._check_error(_username,'用户名不能为纯数字')});
			  return false;
			}
			else{
		       $.getJSON('/?user&q=reg&type=_chkusername&username='+username_val,function(result){
		         if(result.code=='100'){
		             diyou.use('users_check',function(c){c._check_right(_username)});
                     $("#reg_email").show();//用户名可以注册的时候才出现邮箱的填写框
                     return true;
		         }else{
                    diyou.use('users_check',function(c){c._check_error(_username,'用户名已存在')});
					return false;
		         }
		       });
				
			}
	   }
});