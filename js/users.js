/*!
 * Created By:james;
 * Created Time:2013-11-11;
 * Updated By:james;
 * Updated Time:2013-11-11;
 * http://www.diyou.cn
 */
 define(function(require, exports, module) {
		exports.apply_vip = function(form_id,vip_fee,balance){
			var vip_fee_val = $('#'+vip_fee).val();
			var balance_val = $('#'+balance).val();
			$('#'+form_id).live('submit',function(){
			     if(parseInt(vip_fee_val)>0 && trust !='1'){
			         jDialog.alert('您还没有开通存管账户，请先开通');
                     return false;
			     }
             
			     /*if($('#paypassword').val()==""){
			         $('#vip_warning_c').html('*交易密码不能为空');
			         return false;
			     }*/
				if(parseInt(balance_val)<parseInt(vip_fee_val)){
                    jDialog.alert('当前可用金额不足，请先进行充值',{
                        events : {
                            close : function(evt){
                                location.hash='account/recharge';
                            }
                        }
                    })
                    return false;
				}else{
					require('submitform');
                    var w = window.open();
					$('#'+form_id).ajaxSubmit({
					  success:function(result,status){
						var results = eval('('+result+')');
                          if(results.ret == '0')
						{
                            jDialog.close();
                            w.document.write(results.data);
                            jDialog.alert('申请已经提交等待审核！');
						}else{
                            w.close();
                            jDialog.alert(results.msg)
						}
					  }
					});
					return false;
				}
			});
            //设置交易密码  wqs  12-18
            $('.set_pwd').bind('click',function(){
                diyou.use('dialogs',function(dy){dy.dialog('请先设置支付密码','/?user&m=approve/safe&type=paypwd_new')});
				return false;
            })
		}
        
       
        
        /*wqs 借款人用户中心 申请额度*/
        
        exports._user_borrow_amount_list = function(page){
             $.ajax({
                url: "/?user&m=borrow/loan/myamount_list",
                data: "page="+page,
                success: function(data){
                    $(".main_box_cont").html(data);
                    
                }
            });
        }
       
        exports._check_input_text = function(id,content){
                var id = $('#'+id);
        	   var id_val = id.val();
        	   if( id_val == '')
        		  {
                    id.siblings('.user_warning_c').html(content);
        			return false;
        		  }
        	  else{
        			id.siblings('.user_warning_c').html('');
        		  }	  
        }
		
		//消息提醒设置 cfc
    exports.remind_set = function(form_id){
        $("#"+form_id).bind('submit',function(){
			
            require('submitform');
             $("#"+form_id).ajaxSubmit({
                    url : "/?user&m=remind/set",
        			success: function (result, status) {
        				var results = eval('('+result+')');
						if(results.code == '100'){
						  diyou.use('dialogs',function(dy){dy.success(results.msg,'')})
						}
						else{	
							diyou.use('dialogs',function(dy){dy.error(results.msg,'')})
						}
        				return false;
        			}
    		  });
              return false; 
        });         
    }
	
    //wqs
    exports.avatar = function(form_id){
        $('.cancle').click(function(){
            $('.diyou_dialog').remove();
            $('#diyou_dialog_warning').remove();
        });
        $('#'+form_id).bind('submit',function(){
             if($('#avatar').val()== ''){
                $('#warn').html('请选择上传头像');
                return false;
            }
            $('#upload_btn_avatar').val("上传中...");
            require('submitform');
            $(this).ajaxSubmit({              
    			  success:function(result,status){
                    $('#upload_btn_avatar').val("上传");
    			    var results = eval('('+result+')');
    				if(results.code == '100')
    				{
                       diyou.use('dialogs',function(dia){dia.success(results.msg,'this')});                  
                    }else if(results.code == '101'){
                        //null
                    }else{
                         
                        $('#warn').html(results.msg);
    				  
                    }
					return false;
                  }
			});
            return false;         
        })
    }
    	//安全中心  cfc
	exports.safe_center = function(realname,email,phone,pwd,setpaypwd,getpaypwd,editpaypwd,avatar){
        $('#'+realname).live('click',function(){
            if(trust_status=='error'){
                diyou.use('dialogs',function(dy){dy.error('请先开通汇付天下账号','/?user&m=trust/account')});
                return false;
            }			
            diyou.use('dialogs',function(dy){dy.dialog('实名认证','/?user&m=approve/safe&type=realname')});
		});	

		$('#'+email).live('click',function(){
		  if(trust_status=='error'){
                diyou.use('dialogs',function(dy){dy.error('请先开通汇付天下账号','/?user&m=trust/account')});
                return false;
          }
		  if(email_status==1){
		     diyou.use('dialogs',function(dy){dy.dialog('修改邮箱认证','/?user&m=approve/safe&type=update_email')}); 
		  }else{
		     diyou.use('dialogs',function(dy){dy.dialog('邮箱认证','/?user&m=approve/safe&type=email')}); 
		  }
			
		});
		
		$('#'+phone).live('click',function(){
		   if(trust_status=='error'){
                diyou.use('dialogs',function(dy){dy.error('请先开通汇付天下账号','/?user&m=trust/account')});
                return false;
           }
		   if(phone_status==1){
		      diyou.use('dialogs',function(dy){dy.dialog('手机解绑','/?user&m=approve/safe&type=edit_phone')});
		   }else{
		      diyou.use('dialogs',function(dy){dy.dialog('手机认证','/?user&m=approve/safe&type=phone')});
		   }
			
		});
		$('#phone_safeclose').live('click',function(){
			diyou.use('dialogs',function(dy){dy.dialog('关闭手机宝令','/?user&m=approve/safe&type=phone_safeclose')});
		});
		$('#'+pwd).live('click',function(){
			diyou.use('dialogs',function(dy){dy.dialog('修改密码','/?user&m=approve/safe&type=pwd')});
		});
		
		$('#'+setpaypwd).live('click',function(){
			diyou.use('dialogs',function(dy){dy.dialog('设置支付密码','/?user&m=approve/safe&type=paypwd_new')});
		});
		$('#'+editpaypwd).live('click',function(){
			diyou.use('dialogs',function(dy){dy.dialog('修改支付密码','/?user&m=approve/safe&type=paypwd_edit')});
		});
		$('#'+getpaypwd).live('click',function(){
			diyou.use('dialogs',function(dy){dy.dialog('找回支付密码','/?user&m=approve/safe&type=paypwd_set')});
		});
        
        //avatar
        $('.'+avatar).live('click',function(){
            diyou.use('dialogs',function(dy){dy.dialog('上传头像','/?user&m=users/avatar')});
        })
    }
    
    //u_safe_realname
    exports.safe_real = function(form_id){
        require('validate');
        $("#"+form_id).validate({
    		rules: {
    			sex: "required",
                card_pic1: "required",
                card_pic2: "required",
                card_id: {required: true,idcard: true},
    			realname: {required: true,zh_ch: true}
    		},
    		messages: {
    			sex: "请选择性别",
                card_pic1: "请选择身份证图片",
                card_pic2: "请选择身份证图片",
                card_id: {required: "请输入身份证号",idcard: "请输入正确的身份证号"},
    			realname: {required: "请输入真实姓名",zh_ch: "请输入正确的姓名"}
    		},
			errorPlacement:function(error,element) {  error.appendTo(element.parent());
            }
	    });
        
        $('#'+form_id).submit(function(){
            require('submitform');
            $(this).ajaxSubmit({
                  url:"/?user&m=approve/realname",
                  dataType : "text",
    			  success:function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == '100')
    				{    				     
    				    if(phone_status!=1){
    				       diyou.use('dialogs',function(dia){dia.dialog('提示','/?user&m=approve/realname&type=dialog')});
    				       // diyou.use('dialogs',function(dia){dia.confirm_cancel(results.msg,'/?user&m=approve/recharge')});  
    				    }else{
    				        diyou.use('dialogs',function(dia){dia.success(results.msg,'this')});  
    				    }                     
                       //diyou.use('dialogs',function(dia){dia.confirm_cancel(results.msg,'/?user&m=approve/recharge')});               
                    }else if(results.code == '101'){
                        //null
                    }else{
    				   $('#safe_real').html(results.msg);
                    }
                  }
			});
            return false;
        });
    }
    //phone  approve
    
	

    
	//james 用户中心左边目录栏切换  
	exports.menu_switch = function(){
	   $('#users_menu ul li .user_lf_link').bind('click',function(){
	    $(this).next('dl').css({'display':'block'});
	   })
	}
    
    
    exports.help_search = function(form_id){
        $('#'+form_id).live('submit',function(){
             if($('#help_search_name').val()==''){
                diyou.use('dialogs',function(dia){dia.error('搜索内容不能为空','')});
             return false;
             }
             $.ajax({
            　　type:'post',            
            　　url:'/?ajax&t=help_search_result',
                data:'_name='+$('#help_search_name').val(),      
            　　dataType:'text', 
            　　success:function(msg){
                        $('#help_search_result').html(msg);
                        $('#help_search_result').css('display','block');
            　　},error:function(){
                    diyou.use('dialogs',function(dia){dia.error('对不起发生错误了！','')});
                }
            })
                return false;
            });
        $(".help_keyword_links").each(function(index){ //取得整个页面的input值 
         $(this).click(function(){
             $.ajax({
            　　type:'post',
            　　url:'/?ajax&t=help_search_result',
                data:'_name='+$(this).attr('_name'),
            　　dataType:'text', 
            　　success:function(msg){
                        $('#help_search_result').html(msg);
                        $('#help_search_result').css('display','block');
            　　},error:function(){
                    diyou.use('dialogs',function(dia){dia.error('对不起发生错误了！','')});
                }
            });
            return false;
         });
   });
   }
   
   exports.edit_pwd = function(form_id){
        $('#new_pwd').bind('input propertychange',function(){
    	   diyou.use('index',function(dy){dy._check_pwd_stg('new_pwd')});
    	});
        require('validate');
        $("#"+form_id).validate({
    		rules: {
    			password_old: "required",
                new_pwd: {required: true,rangelength:[6,15],checkpassword:true},
    			_passwod: {required: true,equalTo: "#new_pwd"}
    		},
    		messages: {
    			password_old: "请输入原密码",
                new_pwd: {required: "请输入新密码",rangelength: "长度在6-15位英文、数字或下划线组合",checkpassword:"密码格式不正确,必须由英文、数字或下划线组成"},
    			_passwod: {required: "请再次输入新密码",equalTo: "请输入相同的密码"}
    		}
	    });
        $('#password_old').bind('keyup',function(){
		  $('#password_warn').html('');
		});
        $('#new_pwd').bind('keyup',function(){
		  $('#password_warn').html('');
		});
        $('#_passwod').bind('keyup',function(){
		  $('#password_warn').html('');
		});
        $('#'+form_id).live('submit',function(){
            $('#password_warn').html('');
            require('submitform');
            $(this).ajaxSubmit({
                  url:"/?user&m=users/userpwd",
    			  success:function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == '100')
    				{
                        jDialog.close();
                        jDialog.alert('修改成功');
                        return false;
                    }else if(results.code == '101'){
                        //null
                    }else{
    				   $('#password_warn').html(results.msg);
                    }
                  }
			});
            return false;
        });
    
   }
   
   
   //站内信
   exports.message = function(form_id){
        $('#allcheck').live('click',function(){
              if(document.getElementById("allcheck").checked){
                 $('input[data-type="aid"]').attr("checked",true);
              }else{
                 $('input[data-type="aid"]').attr("checked",false);
              }             
        })
        $('#_allcheck').live('click',function(){
            $('input[data-type="aid"]').attr("checked",true);
        })
        
		
	   $('.msg_read').live('click',function(){
	        if($(this).parent().siblings('.msg_cont').css('display') == 'none'){
			   $(this).parent().siblings('.msg_cont').css({'display':'block'});
			   var status=$(this).attr('data-status');
			   if(status==0){
				   $(this).removeClass('f_bold');
				   $(this).addClass('f_normal');
				   var id=$(this).attr('data-id');
				   var user_id=$(this).attr('user-id');
				   $.ajax({
					   type: 'get',
					   url: '/?user&m=message/viewed&action=viewed&id='+id+'&user_id='+user_id
					});
				}
				
			}
			else{
			   $(this).parent().siblings('.msg_cont').css({'display':'none'})
			}
		}) 
		
        $("#delete_msg").live('click',function(){
            require('submitform');
            $("#"+form_id).ajaxSubmit({
                url : "/?user&m=message/delete",
    			success: function (result, status) {                
    				var results = eval('('+result+')');
    				if(results.code == '100')
    				{
                       diyou.use('dialogs',function(dia){dia.success(results.msg,'this')});                  
                    }else if(results.code == '101'){
                        //null
                    }else{
    				  diyou.use('dialogs',function(dia){dia.error(results.msg,'')});    
                    }
    			}
		   });
		   return false; 
        })
        diyou.use("pagelist",function(p){p.pages('#msg_list','/?user&m=message/list&type=list')});
   }
  //chenwei 用户是否被禁止登录
	exports.check_block = function(){
	   if(user_id!=''){
            $.ajax({
    				type:"get",
    				url:'/?user&q=login&type=check_block',
    				data:'rnd='+Math.random(),
					cache:false,
    				success:function(data){
						if (data!=""){
							var results = eval("("+data+")");
							if(results.code=='blocked'){
                                // alert('对不起您的账户被锁定请联系在线客服！');
                                // location.href='/?user&q=login';
                                 diyou.use('dialogs',function(dia){dia.error('对不起您的账户被锁定请联系在线客服！','/?user&q=logout')});
                            }
						}
    				}
    			});
       }
	}
   
   
});