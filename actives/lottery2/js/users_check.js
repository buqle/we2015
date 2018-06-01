/*!
 * Created By:ahui;
 * Created Time:2013-11-11;
 * http://www.diyou.cn
 */
 define(function(require, exports, module) {
    
   
	   //check the username
	  exports._check_username = function(_username){
	     var username = $('#'+_username);
	     var username_val = username.val();
         var username_len = exports._check_len(username_val);
         var username_reg = /^([0-9]){0,}$/;
		 var user_reg=/([^a-z0-9A-Z\u4E00-\u9FA5]|\s)+/;//不可包含空格和特殊字符
		 var all_reg=/[\uFF00-\uFFFF]/;//不包含全角
		 if(username_len < 4 || username_len > 16)
			{  
              exports._check_error(_username,'4-16位字符,可包含中文,英文,数字');
			  return false;
			}else
			if(all_reg.test(username_val)||user_reg.test(username_val))
			{  
              exports._check_error(_username,'不可包含空格、全角和特殊字符');
			  return false;
			}
			else
			if(username_reg.test(username_val))
			{ 
			  exports._check_error(_username,'用户名不能为纯数字');
			  return false;
			}			
			else{
		       $.getJSON('/?user&q=reg&type=chkusername&username='+encodeURIComponent(username_val),function(result){
		         if(result.code=='100'){
		             exports._check_right(_username);
                     $("#reg_email").show();//用户名可以注册的时候才出现邮箱的填写框
                     return true;
		         }else{
                    exports._check_error(_username,result.msg);
					return false;
		         }
		       });
				return false;
			}
	   }
     
        //check the phone number
        exports._check_phone = function(_phone){
         var phone = $('#'+_phone)
         var phone_val = phone.val();
         var phone_reg = /^1[3|4|5|7|8][0-9]\d{8,8}$/;	
        if(phone_val == '')
         { 
           exports._check_error(_phone,'手机号码不能为空');
           return false;
          }else if(!phone_reg.test(phone_val))
    		 { 
    		   exports._check_error(_phone,'手机号码格式不正确');
                return false;
    		 }
    	 else{  
    	    $.getJSON('/?user&q=reg&type=chkphone&phone='+phone_val,function(result){
	         if(result.code=='100'){
	             exports._check_right(_phone);
                $("#reg_phone").show();
                 return true;
	         }else{
                exports._check_error(_phone,'手机号已存在');
				return false;
	         }
	       });
    	 }
        }
	
	   //check the confirm password
	   exports._check_phone_code = function(_code,_con){
	       var code = $('#'+_code);
		   var code_val = code.val();
            if(_con!=''){
			     exports._check_error(_code,_con);
                  return false;
			 }else if(code_val == '')
			 { 
			     exports._check_error(_code,'手机验证码不能为空');
              return false;
			  }
			else
			{
			
			  exports._check_right(_code);
            
			}	
	   } 
	   //check the email
	   exports._check_email = function(_email){
    	   var email_reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
           var email = $('#'+_email);
    	   var email_val = email.val();
		   if(email_val == ''){
                  exports._check_error(_email,'邮箱不能为空');
                  return false;					  
			   }
			 else{
		        if(!email_reg.test(email_val)) {  
				   exports._check_error(_email,'邮箱格式不正确');
                   return false;
				 }
			     else{   
			          $.getJSON('/?user&q=reg&type=chkemail&email='+email_val,function(result){
    			         if(result.code=='100'){
    			              exports._check_right(_email);
                              return true;
    			         }else{
                               exports._check_error(_email,'邮箱已存在');
                               return false;
    			         }
    			       });
			 
				 }
			   }
	   }
       
      
	   //check the referrer
	   exports._check_referrer = function(_referrer){
    	    var referrer = $('#'+_referrer);
    	   var referrer_val = referrer.val();
		   if(referrer_val == ''){
		     exports._check_right(_referrer);
		   }
		   else{
		          $.getJSON('/?user&q=reg&type=chkusername&username='+encodeURIComponent(referrer_val),function(result){
			         if(result.code=='100'||result.code=='98'){
                          exports._check_error(_referrer,'用户不存在');
                           return false;
			         }else{
                           exports._check_right(_referrer,result.msg);
                          return true;
			         }
			       });
          }
	   }
        //check the password 
	   exports._check_pwd = function(_password){
	        var password = $('#'+_password);
			var pwd_val = password.val();
			var pwd_len = 	exports._check_len(pwd_val);
			var pwd_reg = /(^.*?[a-zA-Z]+.*?\d+.*?$)|(^.*?\d+.*?[a-zA-Z]+.*?$)/;		
			if(pwd_len < 6 || pwd_len > 15)
			{  
			  exports._check_error(_password,'密码必须在6-15个字符之间');
              return false;
			}
			else
			if(!pwd_reg.test(pwd_val))
			{
			 exports._check_error(_password,'密码不能为纯字符或者含中文');
              return false;
			}
			else{   
			     exports._check_right(_password);
                  return true;
				}
	   }
	   
	   //check the confirm password
	   exports._check_con_pwd = function(_password,_confirm_password){
	       var pwd = $('#'+_password);
		   var con_pwd = $('#'+_confirm_password);
		   var pwd_val = pwd.val();
		   var con_pwd_val = con_pwd.val();
				if(pwd_val != con_pwd_val)
				{ 
				     exports._check_error(_confirm_password,'两次密码不一致');
                  return false;
				}
			else{  
			if(pwd_val == '')
			 { 
			     exports._check_error(_confirm_password,'请先输入您的登录密码');
              return false;
			  }
			else
			{
			  exports._check_right(_confirm_password);
			}	
		}
	   } 
     
	//check the privacy
	exports._check_privacy = function(_privacy){
		var pri_check = $('#'+_privacy).attr('checked');
		if(pri_check=='checked'){
		    exports._check_right(_privacy);
		    
		}else{
		   exports._check_error(_privacy,'请先阅读并同意协议');
           return false;
		}
	}
	 
  exports._check_ph_vericode = function(_vericode){
	      var vericode = $('#'+_vericode);
	      var vericode_val = vericode.val();
          
		  if(vericode_val =='')
		  { 
		    exports._check_error(_vericode,'验证码不能为空');
            return false;
		  }
		  else{
		      exports._check_right(_vericode);
             
		      $.getJSON('/?user&q=reg&type=chkvericode&vericode='+vericode_val+'&reg_type='+ $('#reg_type').val(),function(result){
			         if(result.code=='100'){
			              exports._check_right(_vericode);
                          return true;
			         }else{
                           exports._check_error(_vericode,'验证码不正确');
                           return false;
			         }
			       });
                  
                   return true;
		  }
	   }  	 
	 
	   //check the verify code
	   exports._check_vericode = function(_vericode){
	      var vericode = $('#'+_vericode);
	      var vericode_val = vericode.val();
          
		  if(vericode_val =='')
		  { 
		    exports._check_error(_vericode,'验证码不能为空');
            return false;
		  }
		  else{
		      exports._check_right(_vericode);
             
		      $.getJSON('/?user&q=reg&type=chkvericode&vericode='+vericode_val+'&reg_type='+ $('#reg_type').val(),function(result){
			         if(result.code=='100'){
			              exports._check_right(_vericode);
                          return true;
			         }else{
                           exports._check_error(_vericode,'验证码不正确');
                           return false;
			         }
			       });
                  
                   return true;
		  }
	   }  
            
     exports._check_error = function(_name,_content){
         var __name = $('#'+_name);
		 __name.addClass("input_error");
        __name.siblings('.msg_box').removeClass().addClass('msg_box error');
        __name.siblings('.msg_box').children('font').html(_content);
		__name.siblings('.msg_box').css({'display':'inline-block'});
        return false;
     }
     
     exports._check_right = function(_name){
        var __name = $('#'+_name);
		__name.removeClass("input_error");
        __name.siblings('.msg_box').removeClass().addClass('msg_box right');
		__name.siblings('.msg_box').children('font').html('');
		__name.siblings('.msg_box').css({'display':'inline-block'});
        return true;
     }
     
     //check the length of text
  	exports._check_len = function(s) { 
			var l = 0; 
			var a = s.split(""); 
			for (var i=0;i<a.length;i++) { 
			if (a[i].charCodeAt(0)<299) { 
			l++; 
			} else { 
            //php中文的utf-8编码占3个字符
			l+=3; 
			} 
			} 
			return l; 
		}
        
   exports.get_phone_code = function(id){
        $('#'+id).bind('click',function(){
		var phone_reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
		var phone_val = $('#phone').val();		
		if(phone_val==''){
			 exports._check_error("phone",'手机号码不能为空');
			return false;
		}else
		if(phone_val != '' && !phone_reg.test(phone_val))
		{
		   exports._check_error("phone",'手机号码格式不正确');
		   return false;
		}else{
			var _url = '';
            _url = '/?user&q=reg&type=send_code';
            $.ajax({
            　　type:'post',            
            　　url:_url,
                data:'phone='+$('#phone').val(),      
            　　dataType:'text', 
            　　success:function(msg){
                    var results = eval('('+msg+')');

                    if(results.code == 'success'){
					
                        diyou.use('index',function(dy){dy._get_vericode(id,'vericode')});
                        //$('#'+id).attr('value','发送成功'); 
                       // $('#'+id).removeClass('get_verty_btn_dis');
                       // $('#'+id).addClass('phone_min');                   
                    }else{
                        diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                    }
            　　},            
            　　error:function(){
                    diyou.use('dialogs',function(dia){dia.error('对不起发生错误了！','')});
                }
            
            })
		}    
        })        
    }
	   //check the strength of the password
	  exports._check_pwd_stg = function(password){
	    //CharMode函数
			//测试某个字符是属于哪一类
			function CharMode(iN) {
			   if (iN>=48 && iN <=57) //数字
				return 1;
			   if (iN>=65 && iN <=90) //大写字母
				return 2;
			   if (iN>=97 && iN <=122) //小写
				return 4;
			   else
				return 8; //特殊字符
			};
			//bitTotal函数
			//计算出当前密码当中一共有多少种模式
			function bitTotal(num) {
			   modes=0;
			   for (i=0;i<4;i++) {
				if (num & 1) modes++;
				 num>>>=1;
				}
			   return modes;
			};
		    //checkStrong函数
			//返回密码的强度级别
			function checkStrong(sPW) {
			   if (sPW.length<=4)
				return 0; //密码太短
				Modes=0;
				for (i=0;i<sPW.length;i++) {
				 //测试每一个字符的类别并统计一共有多少种模式
				 Modes|=CharMode(sPW.charCodeAt(i));
			   }
			   return bitTotal(Modes);
			};
			
			var pwd = $('#'+password).val();
			var pw_bar = $('.pw_bar') ;
				if (pwd==null||pwd==''){
                    pw_bar.css({'width':'0px'})
                    }
			    else{
						 S_level=checkStrong(pwd);
						switch(S_level){
						   case 0:pw_bar.css({'width':'0px','background':'#FF0000'});
						   case 1:pw_bar.css({'width':'97px','background':'#FF0000'});
						   break;
						   case 2:pw_bar.css({'width':'195px','background':'#FF9900'});
						   break;
						   case 3:pw_bar.css({'width':'293px','background':'#33CC00'});
						   break;
						   default:pw_bar.css({'width':'293px','background':'#33CC00'});
						  }
					 }
				return;
	   }   
});