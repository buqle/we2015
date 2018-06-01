/*!
 define(function(require, exports, module) {
		//banner slide
		exports.banner_slide = function(DivId,BtnId){
			  var oDiv = $("#"+DivId);
			  var oUl = $('#'+DivId+' ul')
			  var oLi = $('#'+DivId+' ul li');
			  var aImg = $('#'+DivId+' ul li img')
			  var aA = $('#'+BtnId+' a');
			  var imgWidth = 1920;  
			  var oLiLength = oLi.length;
			  var clesetInter,iNow = 0;      
			  oUl.css({'width':imgWidth+'px'});
			  aImg.eq(0).css({"display":"block"})
			  function toResize(){
				  var viewWidth = document.documentElement.clientWidth;
				  if(viewWidth>1000)
					  {
						  for(var i=0;i<oLiLength;i++)
						  {aImg.eq(i).css({"left":-(imgWidth - viewWidth)/2 + 'px'})}
					  }
			   }
			  toResize();
			  window.onresize = function(){toResize()}
			
			  aA.live('click',function(){
				   clearInterval(clesetInter);
				   aA.removeClass("active");
				   $(this).addClass("active");
				   iNow = aA.index($(this));
				   $("#"+DivId+" ul li img").css({"display":"none"});
				   $("#"+DivId+" ul li img").eq(iNow).stop().fadeIn(1000);
				   clesetInter = setInterval(torun,4000);
				  });
			 function torun(){
				iNow++
				if(iNow < oLiLength){aA.eq(iNow).trigger('click')}
				else{iNow = 0;aA.eq(iNow).trigger('click')}        
			 }
			 clesetInter = setInterval(torun,4000)          		 
	}
       
	   
	   
	   
	   //Register js
	   exports.register = function(form_id){
	    
	      //check email
          $('#email').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#email').bind('blur',function(){
			exports._check_email('email');
			})
		
      
	    //check username
		 $('#username').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })
		$('#username').bind('blur',function(){
		    exports._check_username('username');
		})
	              
		//check password strength		
            $('#password').bind('input propertychange',function(){ 
				exports._check_pwd_stg('password');
			    });

		//check the password 
			$('#password').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		    })
            $('#password').bind('blur',function(){
			  exports._check_pwd('password');
			})
        
        //check the confirm password
		$('#confirm_password').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		    })
        $('#confirm_password').bind('blur',function(){
			exports._check_con_pwd('password','confirm_password');
		})
        
		
		//referrer
		$('#referrer').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		    })
		
        //verify code 
		   $('#vericode').bind('blur',function(){
			 exports._check_vericode('vericode');
		   })
        
        //show the content of privacy
        $("#privacy").live('click',function(){
        var title = $(this).html();
        diyou.use('dialogs',function(dy){dy.dialog(title,'/privacy/index.html','','')});
        })		
		
        //the form of register submit
        $('#'+form_id).live('submit',function(){
		  exports._check_email('email');
          alerta(2);
		  exports._check_username('username');
		  exports._check_pwd('password');
		  exports._check_con_pwd('password','confirm_password');
		  exports._check_vericode('vericode');
          alert(2);
		  $('#dy_server').siblings('.user_warning_c').css({'display':'none'});
		  if(!($('#dy_server').attr('checked')))
		  { $('#dy_server').siblings('.user_warning_c').css({'display':'inline-block'});
          alert(1);
		    return false;
		  }
		  require('submitform');
		  $('#'+form_id).ajaxSubmit({
		    success:function(result,status){
		      alert(result);
			var results = eval('('+result+')');
				if(results.code=='success'){
		           $('#reg_sub').val('注册中...');
					window.location.href="/?user&q=reg&type=email";
				}else{
				    _code = results.code;
				    _msg = results.msg;
                    if(_code=='email'){
		               exports._check_email('email',_msg);
                    }else if(_code=='username'){
		               exports._check_username('username',_msg);
                    }else if(_code=='valicode'){
		               exports._check_vericode('vericode',_msg);
                    }else if(_code=='password'){
		               exports._check_pwd('password',_msg);
                    }
				    $('#reg_sub').attr('disabled',false);
				}
			}
		  });
		  return false;
		})
		}
      
	  
	   //login js
	   exports.login = function(form_id){
	   
		   //login name
		   $('#username').bind('focus',function(){
			  var username_note = '邮箱/用户名';
			  var username_val = $(this).val();
			  if(username_val == username_note)
			  {
				$(this).val('');
			  }
		   })
		   $('#username').bind('blur',function(){
			 var username_note = '邮箱/用户名';
			 var username_val = $(this).val();
			  if(username_val =='')
			  { 
				$(this).val(username_note);
			  }
		   })
		   
		  //the form of login submit
        $('#'+form_id).live('submit',function(){
		    var msgs=exports._check_log('username','password','vericode','login_warning');
			if(msgs!=''){
				return false;
			}
			require('submitform');
			$('#'+form_id).ajaxSubmit({
			  url:'/?user&q=login',
			  success:function(result,status){
			    var results = eval('('+result+')');
				if(results.code == '100')
				{
				  // alert(results.msg);
				   window.location.href="/?user";
				}
				else
				{
					$('#login_warning span').html(results.msg);
					//diyou.use('dialogs',function(dy){dy.error(results.msg,'')})
				}
			  }
			});
			return false;
		})
	   }
	   
	   
	   //get password back
	   exports.get_pwd = function(){
	      $('#get_pwd1').submit(function(){
		    var email_reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			var phone_reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
			var email_val = $('#email').val();
			var phone_val = $('#phone').val();
			var valicode_val = $('#valicode').val();
		    var msg = '';
			if(email_val == '' && phone_val == '')
			     { $('#warning').html('请至少输入一项内容');return false; }
			else 
			if(email_val != '' && !email_reg.test(email_val))
				 { $('#warning').html('邮箱格式不正确，请重新输入'); 
				   return false;
				 }
			else
            if(phone_val != '' && !phone_reg.test(phone_val))
                 {
				   $('#warning').html('手机号码格式不正确，请重新输入'); 
				   return false;
				 }
			else
            if(valicode_val == '')
                 {
				   $('#warning').html('验证码不能为空'); 
				   return false;
				 }	 
		    else{
				require('submitform');
				$('#get_pwd1').ajaxSubmit({
					success:function(result,status){
					  var results = eval('('+result+')');
						if(results.code == '100')
						{	
							window.location.href='/?user&q=getpwd&gettype=email&email='+email_val;
						}else if(results.code == '101'){
							window.location.href='/?user&q=getpwd&gettype=phone&phone='+phone_val;
						}
						else
						{
							diyou.use('dialogs',function(dy){dy.error(results.msg,'')})
						}
					}
				});
				return false;
            				 
		  }
		  })
         
		 //get the password back step2 ,by phone
		 $("#get_verty_btn").bind('click',function(){
		   var o=$("#get_verty_btn");
		 
		   $.ajax({ 
				type:"POST", 
				url:"/?user&q=getpwd&type=get_code", 
				data:"phone="+$("#ajax_phone").val(), 
				cache:false,
				success:function(msg){
					var results = eval('('+msg+')');
					if(results.code == '102'){
					  var wait=60;
					  var timeID=setInterval(function(){
					  if(wait==-1){
						   clearInterval(timeID);
						   o.removeClass('get_verty_btn_dis');
						   o.val("获取验证码");
						   o.removeAttr("disabled");
						  }
					  else{
						   o.val(wait+"秒后重新发送");wait--;
						   o.attr("disabled",true);
						   o.addClass('get_verty_btn_dis');
						   $('#phone_warning').html('短信验证码已发送到您的手机，请注意查收！')
						   }
							},1000);
					}else{
						diyou.use('dialogs',function(dy){dy.error(results.msg,'')})
					}
				}
			});
	     })
		 $('#get_pwd21').submit(function(){
		    var msg = '';
			var phonevalid=$('#phonevalid').val();
			if(phonevalid=='')
			{ msg = '请输入6位数验证码' }
			if(msg != '')
			{ $('#warning').html(msg);return false;}
            else
				{  
				   $.ajax({
					type:"POST", 
					url:"/?user&q=getpwd&type=phone_code", 
					data:"phone="+$("#ajax_phone").val()+"&phonevalid="+phonevalid, 
					cache:false,
					success:function(msg){
						var results = eval('('+msg+')');
						if(results.code == '103'){
							diyou.use('dialogs',function(dy){dy.success('验证成功','/?user&q=getpwd&dotype=phone&gettype=reset')})
						}else{
							diyou.use('dialogs',function(dy){dy.error(results.msg,'')})
						}
					}
				 });
				 return false;
				}				 
		  })
		 
		 //get the password back step3 ,reset password
		 $('#get_pwd3').submit(function(){
		    var msg = '';
			var password = $('#password').val();
			var pwd_reg = /(^.*?[a-zA-Z]+.*?\d+.*?$)|(^.*?\d+.*?[a-zA-Z]+.*?$)/;
			var comfirm_password = $('#comfirm_password').val();
			if(password == '')
			{ msg = '请输入6-15位字母、数字或其组合' }
			else
			if(!pwd_reg.test(password))
			{
			  msg = '密码不能为纯字符或含有中文';
			}
			else
			if(comfirm_password == '')
			{ msg = '确认密码不能为空' }
			else
			if(password != comfirm_password)
			{ msg = '两次输入的密码不一致！' }
			if(msg != '')
			{ $('#warning').html(msg);return false;}
            else
				{  
				   $.ajax({
					type:"POST", 
					url:"/?user&q=getpwd&type=changepwd", 
					data:"password="+password+"&comfirm_password="+comfirm_password+"&dotype="+$('#dotype').val(), 
					cache:false,
					success:function(msg){
						var results = eval('('+msg+')');
						if(results.code == '104'){
							diyou.use('dialogs',function(dy){dy.success('密码重设成功','/?user&q=login')})
							return false;
						}else{
							diyou.use('dialogs',function(dy){dy.error(results.msg,'')})
						}
					   
					}
				 });
				 return false;
				}				 
		  })
		  
         //check the comfirm password
        $('#confirm_password').bind('blur',function(){
			var pwd_val = $('#password').val();
			var com_pwd_val = $(this).val();
			if(pwd_val != com_pwd_val)
			{
			  $('#warning').html('两次输入的密码不一致');
		      return false;
			}
			else{   $('#warning').html('');
					return false;
				}
		})
        
        //submit get password btn
        $('#get_pwd').submit(function(){
		  $.ajax({
		    type:'GET',
		    url:'privacy.html',
			data:'{}',
			success:function(data){alert('suc');},
			error:function(){alert('err');}
		  })
		  
		})		
	   }
	   
	   //check the length of text
		exports._check_len = function(s) { 
			var l = 0; 
			var a = s.split(""); 
			for (var i=0;i<a.length;i++) { 
			if (a[i].charCodeAt(0)<299) { 
			l++; 
			} else { 
			l+=2; 
			} 
			} 
			return l; 
		}
       
	   //check the email
	   exports._check_email = function(email){
	     var email_reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		       var email = $('#'+email);
			   var email_val = email.val();
			   email.siblings('.msg_box').css({'display':'inline-block'});	
		 if(email_val == ''){
			      email.siblings('.msg_box').removeClass().addClass('msg_box error');
                  email.siblings('.msg_box').children('font').html('邮箱不能为空');
                  return false;					  
			   }
			 else{
			        if(!email_reg.test(email_val))
					 {  
					    email.siblings('.msg_box').removeClass().addClass('msg_box error'); 
					    email.siblings('.msg_box').children('font').html('请输入正确的邮箱');
                        return false;
					 }
				     else{   
				          $.getJSON('/?user&q=reg&type=chkemail&email='+email_val,function(result){
        			         if(result.code=='100'){
        			               email.siblings('.msg_box').removeClass().addClass('right msg_box');
				                   email.siblings('.msg_box').children('font').html('');
        			         }else{
        			               email.siblings('.msg_box').removeClass().addClass('error msg_box');
				                   email.siblings('.msg_box').children('font').html('邮箱已存在');
                                   return false;
        			         }
        			       });
				 
					 }
			   }
	   }
	   
	   //check the phone number
	   exports._check_phone = function(phone){
	     var phone = $('#'+phone)
	     var phone_val = phone.val();
         var phone_reg = /^1[3|4|5|8][0-9]\d{8,8}$/;
		 phone.siblings('.msg_box').css({'display':'inline-block'});	
		if(phone_val == '')
		 { 
		   phone.siblings('.msg_box').removeClass().addClass('msg_box error');
           phone.siblings('.msg_box').children('font').html('号码不能为空');
           return false;
		  }else
		 if(!phone_reg.test(phone_val))
				 { 
				   phone.siblings('.msg_box').removeClass().addClass('msg_box error');
                   phone.siblings('.msg_box').children('font').html('请输入正确的号码');
                    return false;
				 }
			 else{  
					phone.siblings('.msg_box').removeClass().addClass('right msg_box');
					phone.siblings('.msg_box').children('font').html('');
				 }
	   }
	   
	   //get the phone verify code
	   exports._get_vericode = function(get_verty_btn,phone_vericode){
	       var o=$('#'+get_verty_btn);
		   var vericode_txt = $('#'+phone_vericode)
		   var wait=60;
		   if(vericode_txt.val()==0)
	        {
			  var timeID=setInterval(function(){
		      if(wait==-1){
				   clearInterval(timeID);
				   o.removeClass('get_verty_btn_dis');
				   o.val("获取验证码");
				   o.removeAttr("disabled");
				  }
			  else{
			       o.val(wait+"秒后重新发送");wait--;
			       o.attr("disabled",true);
				   o.addClass('get_verty_btn_dis');
				   }
					},1000); 
            }
	   }
       
	   //check the phone verify code
	   exports._check_phone_veri = function(phone_vericode){
	      var vericode = $('#'+phone_vericode)
	      var vericode_val = vericode.val();
		  vericode.siblings('.msg_box').css({'display':'inline-block'});
		  if(vericode_val =='')
		  { vericode.siblings('.msg_box').css({'display':'inline-block'});
			vericode.siblings('.msg_box').children('i').removeClass('warning');
			vericode.siblings('.msg_box').children('i').addClass('error');
			vericode.siblings('.msg_box').children('font').addClass('user_f_c3').html('手机验证码不能为空');
		  }
		  else{
			 vericode.siblings('.msg_box').css({'display':'none'});
			
		  }
	   }
	   
	   //check the username
	   exports._check_username = function(username){
	     var username = $('#'+username);
	     var username_val = username.val();
         var username_len = exports._check_len(username_val);
		 username.siblings('.msg_box').css({'display':'inline-block'});
            var usernaem_reg = /^([0-9]){0,}$/	
			if(username_len < 4 || username_len > 16)
			{  
			  username.siblings('.msg_box').removeClass().addClass('msg_box error');
              username.siblings('.msg_box').children('font').html('4-16位字符,可包含中文,英文,数字');
			  return false;
			}
			else
			if(usernaem_reg.test(username_val))
			{ 
			  username.siblings('.msg_box').removeClass().addClass('msg_box error');
              username.siblings('.msg_box').children('font').html('用户名不能为纯数字');
			  return false;
			}
			else{
   
			       $.getJSON('/?user&q=reg&type=chkusername&username='+username_val,function(result){
			         if(result.code=='100'){
			             username.siblings('.msg_box').removeClass().addClass('msg_box right');
					     username.siblings('.msg_box').children('font').html('');
			         }else{
			             username.siblings('.msg_box').removeClass().addClass('msg_box error');
                         username.siblings('.msg_box').children('font').html('用户名已存在');
						 return false;
			         }
			       });
					
				}
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
						   case 1:pw_bar.css({'width':'70px','background':'#FF0000'});
						   break;
						   case 2:pw_bar.css({'width':'141px','background':'#FF9900'});
						   break;
						   case 3:pw_bar.css({'width':'212px','background':'#33CC00'});
						   break;
						   default:pw_bar.css({'width':'212px','background':'#33CC00'});
						  }
					 }
				return;
	   }
	   
	   //check the password 
	   exports._check_pwd = function(password){
	        var password = $('#'+password);
			var pwd_val = password.val();
			var pwd_len = 	exports._check_len(pwd_val);
			var pwd_reg = /(^.*?[a-zA-Z]+.*?\d+.*?$)|(^.*?\d+.*?[a-zA-Z]+.*?$)/;
            password.siblings('.msg_box').css({'display':'inline-block'});			
			if(pwd_len < 6 || pwd_len > 15)
			{  
			  password.siblings('.msg_box').removeClass().addClass('msg_box error');
              password.siblings('.msg_box').children('font').html('密码必须在6-15个字符之间');
              return false;
			}
			else
			if(!pwd_reg.test(pwd_val))
			{
			  password.siblings('.msg_box').removeClass().addClass('msg_box error');
              password.siblings('.msg_box').children('font').html('密码不能为纯字符或者含中文');
              return false;
			}
			else{   
			      password.siblings('.msg_box').removeClass().addClass('right msg_box');
				  password.siblings('.msg_box').children('font').html('')
                  return true;
				}
	   }
	   
	   //check the confirm password
	   exports._check_con_pwd = function(password,confirm_password){
	       var pwd = $('#'+password);
		   var con_pwd = $('#'+confirm_password);
		   var pwd_val = pwd.val();
		   var con_pwd_val = con_pwd.val();
		   con_pwd.siblings('.msg_box').css({'display':'inline-block'});
				if(pwd_val != con_pwd_val)
				{ 
				  con_pwd.siblings('.msg_box').removeClass().addClass('msg_box error');
                  con_pwd.siblings('.msg_box').children('font').html('两次密码不一致');
                  return false;
				}
			else{  
			if(pwd_val == '')
			 { 
			  con_pwd.siblings('.msg_box').removeClass().addClass('msg_box error');
              con_pwd.siblings('.msg_box').children('font').html('请先输入您的登录密码');
              return false;
			  }
			else
			{
			  con_pwd.siblings('.msg_box').removeClass().addClass('right msg_box');
			  con_pwd.siblings('.msg_box').children('font').html('');
			}	
		}
	   }
	   
	   //check the verify code
	   exports._check_vericode = function(vericode){
	      var vericode = $('#'+vericode)
	      var vericode_val = vericode.val();
		  vericode.siblings('.msg_box').css({'display':'inline-block'});
          
		  if(vericode_val =='')
		  { 
		    vericode.siblings('.msg_box').removeClass().addClass('msg_box error'); 
			vericode.siblings('.msg_box').children('font').html('验证码不能为空');
            return false;
		  }
		  else{
		      vericode.siblings('.msg_box').removeClass().addClass('right msg_box');
			 vericode.siblings('.msg_box').css({'display':'none'});
		  }
	   }
	   
	 //check the login form   
	exports._check_log = function(username,password,vericode,login_warning){
	      var username = $('#'+username);
		  var password = $('#'+password);
		  var vericode = $('#'+vericode);
	      var username_note = '邮箱/用户名';
		  var log_warning = $('#'+login_warning);
		  var warning_txt = log_warning.children('span');
		  var msgs = '';
		  if((username.val() == '') || (username.val() == username_note) || (password.val() == ''))
			 { msgs = '用户名或密码不能为空'}
		  else 
		  if((vericode.val() == '') && (vericode.val() !=undefined))
			 { msgs ='验证码不能为空'; }
		  if(msgs!='')
		  {  
			 warning_txt.html(msgs);
		  }
		  return msgs;
	}

	
	//email_active  
	exports.email_active = function(){
		$('#send_email_active').live('click',function(){
			var email_active=$('#email_active').val();  
			$.post("/index.php?user&q=reg&type=email_active",function(result){
				var results = eval('('+result+')');
				if(results.code=='100'){
					$('#email_send_warning').html("<span>发送成功，请登录邮箱确认激活！</span>");
				}else{
					$('#email_send_warning').html("<span>"+results.msg+"</span>");
				}
			});
		});
	}
	exports.email_active2 = function(){
		$('#send_email_active1').live('click',function(){
			var email_active=$('#email_active1').val();  
			$.post("/index.php?user&q=reg&type=email_active",function(result){
				var results = eval('('+result+')');
				if(results.code=='100'){
					$(this).parent('p').html("发送成功");
				}else{
					$(this).parent('p').html(results.msg);
				}
			});
		});
	}
	
    //read and agree the agreement
	exports._read_agreement = function(sub_btn,dy_server){
	var sub = $('#'+sub_btn);
	var dy_server = $('#'+dy_server);
	sub.bind('click',function(){
	    dy_server.attr('checked','checked');
	    $('.close').trigger('click');
	})
	}
	
	//borrow details js	  
	   exports.borrow = function(){
	     $('#tender_main_tit dl dd').live('click',function(){
		    var num = $('#tender_main_tit dl dd').index($(this));
			$('#tender_main_tit dl dd').removeClass('hover');
			$(this).addClass('hover');
			$('.j_tender_cont').css({'display':'none'});
			$('.j_tender_cont').eq(num).css({'display':'block'});
		 });
		 function slide(DivId,BtnId){
			 var oDiv = $('#'+DivId);
			 var oDl = $('#'+ DivId + ' dl');
			 var oDd = $('#'+ DivId + ' dl dd');
			 var oDdLen = oDd.length;
			 var oBtn = $('#'+ BtnId);
			 var oA = $('#'+ BtnId + ' a')
			 var DlWidth = oDdLen*oDd.width();
			 oDl.width(DlWidth);
			 var iNow = 0;
			 oA.eq(0).bind('click',function(){
			     iNow--;
				 if(iNow < 1)
				 {iNow = 0;$(this).removeClass('hover')}
				 var oDlLeft = iNow*oDd.width();
				 oDl.stop().animate({'left':-oDlLeft + 'px'},800);
				 if(iNow > 0 && iNow < oDdLen-1)
				 {oA.addClass('hover')}
			     });
			 oA.eq(1).bind('click',function(){
			     iNow++;
				 if(iNow > oDdLen -1 || iNow == oDdLen -1)
				 {iNow = oDdLen-1;$(this).removeClass('hover')}
				 var oDlLeft = iNow*oDd.width();
				 oDl.stop().animate({'left':-oDlLeft + 'px'},800);
				 if(iNow>0 && iNow < oDdLen-1)
				 {oA.addClass('hover')}
			     });	 
		 }
		 slide('data_verify','verify_btn');
		 function addNums(){
		    var oA = $('#' + oDiv + ' a');
			
		 }
	   }   
});/*!
 * Created By:james;
 * Created Time:2013-11-07;
 * Updated By:james;
 * Updated Time:2013-11-24;
 * http://www.diyou.cn
 */
 define(function(require, exports, module) {
		//banner slide
		exports.banner_slide = function(DivId,BtnId){
			  var oDiv = $("#"+DivId);
			  var oUl = $('#'+DivId+' ul')
			  var oLi = $('#'+DivId+' ul li');
			  var aImg = $('#'+DivId+' ul li img')
			  var aA = $('#'+BtnId+' a');
			  var imgWidth = 1920;  
			  var oLiLength = oLi.length;
			  var clesetInter,iNow = 0;      
			  oUl.css({'width':imgWidth+'px'});
			  aImg.eq(0).css({"display":"block"})
			  function toResize(){
				  var viewWidth = document.documentElement.clientWidth;
				  if(viewWidth>1000)
					  {
						  for(var i=0;i<oLiLength;i++)
						  {aImg.eq(i).css({"left":-(imgWidth - viewWidth)/2 + 'px'})}
					  }
			   }
			  toResize();
			  window.onresize = function(){toResize()}
			
			  aA.live('click',function(){
				   clearInterval(clesetInter);
				   aA.removeClass("active");
				   $(this).addClass("active");
				   iNow = aA.index($(this));
				   $("#"+DivId+" ul li img").css({"display":"none"});
				   $("#"+DivId+" ul li img").eq(iNow).stop().fadeIn(1000);
				   clesetInter = setInterval(torun,4000);
				  });
			 function torun(){
				iNow++
				if(iNow < oLiLength){aA.eq(iNow).trigger('click')}
				else{iNow = 0;aA.eq(iNow).trigger('click')}        
			 }
			 clesetInter = setInterval(torun,4000)          		 
	}
       
	   
	   
	   
	   //Register js
	   exports.register = function(form_id){
	      /* //register by email or phone 
	      $('#reg_type ul li').bind('click',function(){
		  $('#reg_type ul li').removeClass('hover');
		  $(this).addClass('hover');
		  var num = $('#reg_type ul li').index($(this));
		  if(num == 0){
		     $('#phone_div').css({'display':'none'});
		     $('#email_div').css({'display':'block'});
            $('#verify_code').css({'display':'block'});			 
		  }else{
		     $('#email_div').css({'display':'none'});
		     $('#phone_div').css({'display':'block'});
		     $('#verify_code').css({'display':'none'});
		  }
		  }) */
	      //check email
          $('#email').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })		  
	      $('#email').bind('blur',function(){
			exports._check_email('email','');
			})
		
        //check phone number is ok or not
		$('#phone').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })
		$('#phone').bind('blur',function(){
		   exports._check_phone('phone','');			   
		})
		
        //get the verify code of mobile phone
		$("#get_verty_btn").bind('click',function(){
		   exports._get_vericode('get_verty_btn','phone_vericode');
	     })
		
		//check the verify code of mobile phone
		$('#phone_vericode').bind('blur',function(){
			 exports._check_phone_veri('phone_vericode')
		   })
		
	    //check username
		 $('#username').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		  })
		$('#username').bind('blur',function(){
		    exports._check_username('username','');
		})
	              
		//check password strength		
            $('#password').bind('input propertychange',function(){ 
				exports._check_pwd_stg('password');
			    });

		//check the password 
			$('#password').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		    })
            $('#password').bind('blur',function(){
			  exports._check_pwd('password','');
			})
        
        //check the confirm password
		$('#confirm_password').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		    })
        $('#confirm_password').bind('blur',function(){
			exports._check_con_pwd('password','confirm_password','');
		})
        
		
		//referrer
		$('#referrer').bind('focus',function(){
		    $(this).siblings('.msg_box').css({'display':'inline-block'});
		    })
		
        //verify code 
		   $('#vericode').bind('blur',function(){
			 exports._check_vericode('vericode','');
		   })
        
        //show the content of privacy
        $("#privacy").live('click',function(){
        var title = $(this).html();
        diyou.use('dialogs',function(dy){dy.dialog(title,'/privacy/index.html','','')});
        })		
		
        //the form of register submit
        $('#'+form_id).live('submit',function(){
		  reg_email = exports._check_email('email','');
		 // reg_phone = exports._check_phone('phone','');
		  //reg_phone_vericode = exports._check_phone_veri('phone_vericode');
		  reg_username = exports._check_username('username','');
		  reg_password = exports._check_pwd('password','');
		  reg_password1 = exports._check_con_pwd('password','confirm_password');
		  reg_vericode = exports._check_vericode('vericode','');
          if (reg_email==false || reg_username==false || reg_password==false|| reg_password1==false || reg_vericode==false){
                return false;
            }
		  
		  $('#reg_sub').attr('disabled',true);
		  require('submitform');
		  $('#'+form_id).ajaxSubmit({
		    success:function(result,status){
			var results = eval('('+result+')');
				if(results.code=='success'){
		           $('#reg_sub').val('注册中...');
					window.location.href="/?user&q=reg&type=email";
				}else{
				    _code = results.code;
				    _msg = results.msg;
                    if(_code=='email'){
		               exports._check_email('email',_msg);
                    }else if(_code=='username'){
		               exports._check_username('username',_msg);
                    }else if(_code=='valicode'){
		               exports._check_vericode('vericode',_msg);
                    }else if(_code=='password'){
		               exports._check_pwd('password',_msg);
                    }
				    $('#reg_sub').attr('disabled',false);
				}
			}
		  });
		  return false;
		})
		}
      
	  
	   //login js
	   exports.login = function(form_id){
	   
		   //login name
		   $('#username').bind('focus',function(){
			  var username_note = '邮箱/用户名';
			  var username_val = $(this).val();
			  if(username_val == username_note)
			  {
				$(this).val('');
			  }
		   })
		   $('#username').bind('blur',function(){
			 var username_note = '邮箱/用户名';
			 var username_val = $(this).val();
			  if(username_val =='')
			  { 
				$(this).val(username_note);
			  }
		   })
		   
		  //the form of login submit
        $('#'+form_id).live('submit',function(){
		    var msgs=exports._check_log('username','password','vericode','login_warning');
			if(msgs!=''){
				return false;
			}
			require('submitform');
			$('#'+form_id).ajaxSubmit({
			  url:'/?user&q=login',
			  success:function(result,status){
			    var results = eval('('+result+')');
				if(results.code == '100')
				{
				  // alert(results.msg);
				   window.location.href="/?user";
				}
				else
				{
					$('#login_warning span').html(results.msg);
					//diyou.use('dialogs',function(dy){dy.error(results.msg,'')})
				}
			  }
			});
			return false;
		})
	   }
	   
	   
	   //get password back
	   exports.get_pwd = function(){
	      $('#get_pwd1').submit(function(){
		    var email_reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			var phone_reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
			var email_val = $('#email').val();
			var phone_val = $('#phone').val();
			var valicode_val = $('#valicode').val();
		    var msg = '';
			if(email_val == '' && phone_val == '')
			     { $('#warning').html('请至少输入一项内容');return false; }
			else 
			if(email_val != '' && !email_reg.test(email_val))
				 { $('#warning').html('邮箱格式不正确，请重新输入'); 
				   return false;
				 }
			else
            if(phone_val != '' && !phone_reg.test(phone_val))
                 {
				   $('#warning').html('手机号码格式不正确，请重新输入'); 
				   return false;
				 }
			else
            if(valicode_val == '')
                 {
				   $('#warning').html('验证码不能为空'); 
				   return false;
				 }	 
		    else{
				require('submitform');
				$('#get_pwd1').ajaxSubmit({
					success:function(result,status){
					  var results = eval('('+result+')');
						if(results.code == '100')
						{	
							window.location.href='/?user&q=getpwd&gettype=email&email='+email_val;
						}else if(results.code == '101'){
							window.location.href='/?user&q=getpwd&gettype=phone&phone='+phone_val;
						}
						else
						{
							diyou.use('dialogs',function(dy){dy.error(results.msg,'')})
						}
					}
				});
				return false;
            				 
		  }
		  })
         
		 //get the password back step2 ,by phone
		 $("#get_verty_btn").bind('click',function(){
		   var o=$("#get_verty_btn");
		 
		   $.ajax({ 
				type:"POST", 
				url:"/?user&q=getpwd&type=get_code", 
				data:"phone="+$("#ajax_phone").val(), 
				cache:false,
				success:function(msg){
					var results = eval('('+msg+')');
					if(results.code == '102'){
					  var wait=60;
					  var timeID=setInterval(function(){
					  if(wait==-1){
						   clearInterval(timeID);
						   o.removeClass('get_verty_btn_dis');
						   o.val("获取验证码");
						   o.removeAttr("disabled");
						  }
					  else{
						   o.val(wait+"秒后重新发送");wait--;
						   o.attr("disabled",true);
						   o.addClass('get_verty_btn_dis');
						   $('#phone_warning').html('短信验证码已发送到您的手机，请注意查收！')
						   }
							},1000);
					}else{
						diyou.use('dialogs',function(dy){dy.error(results.msg,'')})
					}
				}
			});
	     })
		 $('#get_pwd21').submit(function(){
		    var msg = '';
			var phonevalid=$('#phonevalid').val();
			if(phonevalid=='')
			{ msg = '请输入6位数验证码' }
			if(msg != '')
			{ $('#warning').html(msg);return false;}
            else
				{  
				   $.ajax({
					type:"POST", 
					url:"/?user&q=getpwd&type=phone_code", 
					data:"phone="+$("#ajax_phone").val()+"&phonevalid="+phonevalid, 
					cache:false,
					success:function(msg){
						var results = eval('('+msg+')');
						if(results.code == '103'){
							diyou.use('dialogs',function(dy){dy.success('验证成功','/?user&q=getpwd&dotype=phone&gettype=reset')})
						}else{
							diyou.use('dialogs',function(dy){dy.error(results.msg,'')})
						}
					}
				 });
				 return false;
				}				 
		  })
		 
		 //get the password back step3 ,reset password
		 $('#get_pwd3').submit(function(){
		    var msg = '';
			var password = $('#password').val();
			var pwd_reg = /(^.*?[a-zA-Z]+.*?\d+.*?$)|(^.*?\d+.*?[a-zA-Z]+.*?$)/;
			var comfirm_password = $('#comfirm_password').val();
			if(password == '')
			{ msg = '请输入6-15位字母、数字或其组合' }
			else
			if(!pwd_reg.test(password))
			{
			  msg = '密码不能为纯字符或含有中文';
			}
			else
			if(comfirm_password == '')
			{ msg = '确认密码不能为空' }
			else
			if(password != comfirm_password)
			{ msg = '两次输入的密码不一致！' }
			if(msg != '')
			{ $('#warning').html(msg);return false;}
            else
				{  
				   $.ajax({
					type:"POST", 
					url:"/?user&q=getpwd&type=changepwd", 
					data:"password="+password+"&comfirm_password="+comfirm_password+"&dotype="+$('#dotype').val(), 
					cache:false,
					success:function(msg){
						var results = eval('('+msg+')');
						if(results.code == '104'){
							diyou.use('dialogs',function(dy){dy.success('密码重设成功','/?user&q=login')})
							return false;
						}else{
							diyou.use('dialogs',function(dy){dy.error(results.msg,'')})
						}
					   
					}
				 });
				 return false;
				}				 
		  })
		  
         //check the comfirm password
        $('#confirm_password').bind('blur',function(){
			var pwd_val = $('#password').val();
			var com_pwd_val = $(this).val();
			if(pwd_val != com_pwd_val)
			{
			  $('#warning').html('两次输入的密码不一致');
		      return false;
			}
			else{   $('#warning').html('');
					return false;
				}
		})
        
        //submit get password btn
        $('#get_pwd').submit(function(){
		  $.ajax({
		    type:'GET',
		    url:'privacy.html',
			data:'{}',
			success:function(data){alert('suc');},
			error:function(){alert('err');}
		  })
		  
		})		
	   }
	   
	   //check the length of text
		exports._check_len = function(s) { 
			var l = 0; 
			var a = s.split(""); 
			for (var i=0;i<a.length;i++) { 
			if (a[i].charCodeAt(0)<299) { 
			l++; 
			} else { 
			l+=2; 
			} 
			} 
			return l; 
		}
       
	   //check the email
	   exports._check_email = function(email,msg){
	     var email_reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		       var email = $('#'+email);
			   var email_val = email.val();
			   email.siblings('.msg_box').css({'display':'inline-block'});	
			if(msg!='' && msg!='undefined')
			{  
			  email.siblings('.msg_box').removeClass().addClass('msg_box error');
              email.siblings('.msg_box').children('font').html(msg);
			  return false;
			}else if(email_val == ''){
			      email.siblings('.msg_box').removeClass().addClass('msg_box error');
                  email.siblings('.msg_box').children('font').html('邮箱不能为空');
                  return false;					  
			   }
			 else{
			        if(!email_reg.test(email_val))
					 {  
					    email.siblings('.msg_box').removeClass().addClass('msg_box error'); 
					    email.siblings('.msg_box').children('font').html('请输入正确的邮箱');
                        return false;
					 }
				     else{   
				          $.getJSON('/?user&q=reg&type=chkemail&email='+email_val,function(result){
        			         if(result.code=='100'){
        			               email.siblings('.msg_box').removeClass().addClass('right msg_box');
				                   email.siblings('.msg_box').children('font').html('');
                                   return true;
        			         }else{
        			               email.siblings('.msg_box').removeClass().addClass('error msg_box');
				                   email.siblings('.msg_box').children('font').html('邮箱已存在');
                                   return false;
        			         }
        			       });
				 
					 }
			   }
	   }
	   
	   //check the phone number
	   exports._check_phone = function(phone){
	     var phone = $('#'+phone)
	     var phone_val = phone.val();
         var phone_reg = /^1[3|4|5|7|8][0-9]\d{8,8}$/;
		 phone.siblings('.msg_box').css({'display':'inline-block'});	
		if(phone_val == '')
		 { 
		   phone.siblings('.msg_box').removeClass().addClass('msg_box error');
           phone.siblings('.msg_box').children('font').html('号码不能为空');
           return false;
		  }else
		 if(!phone_reg.test(phone_val))
				 { 
				   phone.siblings('.msg_box').removeClass().addClass('msg_box error');
                   phone.siblings('.msg_box').children('font').html('请输入正确的号码');
                    return false;
				 }
			 else{  
					phone.siblings('.msg_box').removeClass().addClass('right msg_box');
					phone.siblings('.msg_box').children('font').html('');
                     return true;
				 }
	   }
	   
	   //get the phone verify code
	   exports._get_vericode = function(get_verty_btn,phone_vericode){
	       var o=$('#'+get_verty_btn);
		   var vericode_txt = $('#'+phone_vericode)
		   var wait=60;
		   if(vericode_txt.val()==0)
	        {
			  var timeID=setInterval(function(){
		      if(wait==-1){
				   clearInterval(timeID);
				   o.removeClass('get_verty_btn_dis');
				   o.val("获取验证码");
				   o.removeAttr("disabled");
				  }
			  else{
			       o.val(wait+"秒后重新发送");wait--;
			       o.attr("disabled",true);
				   o.addClass('get_verty_btn_dis');
				   }
					},1000); 
            }
	   }
       
	   //check the phone verify code
	   exports._check_phone_veri = function(phone_vericode){
	      var vericode = $('#'+phone_vericode)
	      var vericode_val = vericode.val();
		  vericode.siblings('.msg_box').css({'display':'inline-block'});
		  if(vericode_val =='')
		  { vericode.siblings('.msg_box').css({'display':'inline-block'});
			vericode.siblings('.msg_box').children('i').removeClass('warning');
			vericode.siblings('.msg_box').children('i').addClass('error');
			vericode.siblings('.msg_box').children('font').addClass('user_f_c3').html('手机验证码不能为空');
		  }
		  else{
			 vericode.siblings('.msg_box').css({'display':'none'});
			
		  }
	   }
	   
	   //check the username
	   exports._check_username = function(username,msg){
	     var username = $('#'+username);
	     var username_val = username.val();
         var username_len = exports._check_len(username_val);
		 username.siblings('.msg_box').css({'display':'inline-block'});
            var usernaem_reg = /^([0-9]){0,}$/	
			if(username_len < 4 || username_len > 16)
			{  
			  username.siblings('.msg_box').removeClass().addClass('msg_box error');
              username.siblings('.msg_box').children('font').html('4-16位字符,可包含中文,英文,数字');
			  return false;
			}
			else
			if(usernaem_reg.test(username_val))
			{ 
			  username.siblings('.msg_box').removeClass().addClass('msg_box error');
              username.siblings('.msg_box').children('font').html('用户名不能为纯数字');
			  return false;
			}
			else{
   
			       $.getJSON('/?user&q=reg&type=chkusername&username='+username_val,function(result){
			         if(result.code=='100'){
			             username.siblings('.msg_box').removeClass().addClass('msg_box right');
					     username.siblings('.msg_box').children('font').html('');
                         return true;
			         }else{
			             username.siblings('.msg_box').removeClass().addClass('msg_box error');
                         username.siblings('.msg_box').children('font').html('用户名已存在');
						 return false;
			         }
			       });
					
				}
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
						   case 1:pw_bar.css({'width':'70px','background':'#FF0000'});
						   break;
						   case 2:pw_bar.css({'width':'141px','background':'#FF9900'});
						   break;
						   case 3:pw_bar.css({'width':'212px','background':'#33CC00'});
						   break;
						   default:pw_bar.css({'width':'212px','background':'#33CC00'});
						  }
					 }
				return;
	   }
	   
	   //check the password 
	   exports._check_pwd = function(password){
	        var password = $('#'+password);
			var pwd_val = password.val();
			var pwd_len = 	exports._check_len(pwd_val);
			var pwd_reg = /(^.*?[a-zA-Z]+.*?\d+.*?$)|(^.*?\d+.*?[a-zA-Z]+.*?$)/;
            password.siblings('.msg_box').css({'display':'inline-block'});			
			if(pwd_len < 6 || pwd_len > 15)
			{  
			  password.siblings('.msg_box').removeClass().addClass('msg_box error');
              password.siblings('.msg_box').children('font').html('密码必须在6-15个字符之间');
              return false;
			}
			else
			if(!pwd_reg.test(pwd_val))
			{
			  password.siblings('.msg_box').removeClass().addClass('msg_box error');
              password.siblings('.msg_box').children('font').html('密码不能为纯字符或者含中文');
              return false;
			}
			else{   
			      password.siblings('.msg_box').removeClass().addClass('right msg_box');
				  password.siblings('.msg_box').children('font').html('')
                  return true;
				}
	   }
	   
	   //check the confirm password
	   exports._check_con_pwd = function(password,confirm_password){
	       var pwd = $('#'+password);
		   var con_pwd = $('#'+confirm_password);
		   var pwd_val = pwd.val();
		   var con_pwd_val = con_pwd.val();
		   con_pwd.siblings('.msg_box').css({'display':'inline-block'});
				if(pwd_val != con_pwd_val)
				{ 
				  con_pwd.siblings('.msg_box').removeClass().addClass('msg_box error');
                  con_pwd.siblings('.msg_box').children('font').html('两次密码不一致');
                  return false;
				}
			else{  
			if(pwd_val == '')
			 { 
			  con_pwd.siblings('.msg_box').removeClass().addClass('msg_box error');
              con_pwd.siblings('.msg_box').children('font').html('请先输入您的登录密码');
              return false;
			  }
			else
			{
			  con_pwd.siblings('.msg_box').removeClass().addClass('right msg_box');
			  con_pwd.siblings('.msg_box').children('font').html('');
              return true;
			}	
		}
	   }
	   
	   //check the verify code
	   exports._check_vericode = function(vericode,msg){
	      var vericode = $('#'+vericode)
	      var vericode_val = vericode.val();
		  vericode.siblings('.msg_box').css({'display':'inline-block'});
          	if(msg!='' && msg!='undefined')
			{  
			   vericode.siblings('.msg_box').removeClass().addClass('msg_box error'); 
			vericode.siblings('.msg_box').children('font').html(msg);
			  return false;
			}else
		  if(vericode_val =='')
		  { 
		    vericode.siblings('.msg_box').removeClass().addClass('msg_box error'); 
			vericode.siblings('.msg_box').children('font').html('验证码不能为空');
            return false;
		  }
		  else{
		      vericode.siblings('.msg_box').removeClass().addClass('right msg_box');
			 vericode.siblings('.msg_box').css({'display':'none'});
             return true;
		  }
	   }
	   
	 //check the login form   
	exports._check_log = function(username,password,vericode,login_warning){
	      var username = $('#'+username);
		  var password = $('#'+password);
		  var vericode = $('#'+vericode);
	      var username_note = '邮箱/用户名';
		  var log_warning = $('#'+login_warning);
		  var warning_txt = log_warning.children('span');
		  var msgs = '';
		  if((username.val() == '') || (username.val() == username_note) || (password.val() == ''))
			 { msgs = '用户名或密码不能为空'}
		  else 
		  if((vericode.val() == '') && (vericode.val() !=undefined))
			 { msgs ='验证码不能为空'; }
		  if(msgs!='')
		  {  
			 warning_txt.html(msgs);
		  }
		  return msgs;
	}

	
	//email_active  
	exports.email_active = function(){
		$('#send_email_active').live('click',function(){
			var email_active=$('#email_active').val();  
			$.post("/index.php?user&q=reg&type=email_active",function(result){
				var results = eval('('+result+')');
				if(results.code=='100'){
					$('#email_send_warning').html("<span>发送成功，请登录邮箱确认激活！</span>");
				}else{
					$('#email_send_warning').html("<span>"+results.msg+"</span>");
				}
			});
		});
	}
	exports.email_active2 = function(){
		$('#send_email_active1').live('click',function(){
			var email_active=$('#email_active1').val();  
			$.post("/index.php?user&q=reg&type=email_active",function(result){
				var results = eval('('+result+')');
				if(results.code=='100'){
					$(this).parent('p').html("发送成功");
				}else{
					$(this).parent('p').html(results.msg);
				}
			});
		});
	}
	
    //read and agree the agreement
	exports._read_agreement = function(sub_btn,dy_server){
	var sub = $('#'+sub_btn);
	var dy_server = $('#'+dy_server);
	sub.bind('click',function(){
	    dy_server.attr('checked','checked');
	    $('.close').trigger('click');
	})
	}
	
	//borrow details js	  
	   exports.borrow = function(){
	     $('#tender_main_tit dl dd').live('click',function(){
		    var num = $('#tender_main_tit dl dd').index($(this));
			$('#tender_main_tit dl dd').removeClass('hover');
			$(this).addClass('hover');
			$('.j_tender_cont').css({'display':'none'});
			$('.j_tender_cont').eq(num).css({'display':'block'});
		 });
		 function slide(DivId,BtnId){
			 var oDiv = $('#'+DivId);
			 var oDl = $('#'+ DivId + ' dl');
			 var oDd = $('#'+ DivId + ' dl dd');
			 var oDdLen = oDd.length;
			 var oBtn = $('#'+ BtnId);
			 var oA = $('#'+ BtnId + ' a')
			 var DlWidth = oDdLen*oDd.width();
			 oDl.width(DlWidth);
			 var iNow = 0;
			 oA.eq(0).bind('click',function(){
			     iNow--;
				 if(iNow < 1)
				 {iNow = 0;$(this).removeClass('hover')}
				 var oDlLeft = iNow*oDd.width();
				 oDl.stop().animate({'left':-oDlLeft + 'px'},800);
				 if(iNow > 0 && iNow < oDdLen-1)
				 {oA.addClass('hover')}
			     });
			 oA.eq(1).bind('click',function(){
			     iNow++;
				 if(iNow > oDdLen -1 || iNow == oDdLen -1)
				 {iNow = oDdLen-1;$(this).removeClass('hover')}
				 var oDlLeft = iNow*oDd.width();
				 oDl.stop().animate({'left':-oDlLeft + 'px'},800);
				 if(iNow>0 && iNow < oDdLen-1)
				 {oA.addClass('hover')}
			     });	 
		 }
		 slide('data_verify','verify_btn');
		 function addNums(){
		    var oA = $('#' + oDiv + ' a');
			
		 }
	   }   
});