 define(function(require, exports, module) {
	 exports.login = function(form_id,type){	 	
		//the form of login submit		
        $('#'+form_id).bind('submit',function(){
			require('submitform');	
			diyou.use('index',function(dy){dy.setBtndisable('log_sub','登录中...','#666666',true)});
			var string;
			var pass_word = $('#password').val();
			require("encypt");
			string = encypt();
			$('#login_warning span').html('');
			$('#'+form_id).ajaxSubmit({
			  url:'/?user&q=login',
				data: {password: string},
			  success:function(result,status){
			    var results = eval('('+result+')');
				if(results.code == '100'){
                  if (type=='this'){
                    history.go(0);
                  }else{
                       if(results.reg_trust=='error'){
                            window.location.href="/?user&m=trust/approve";
                            return false;
                       }
				       window.location.href="/?user&user_role="+results.user_role;
                  }
				}else if(results.code == '101'){
					$('.ccto_none').show();
					diyou.use('index',function(dy){dy.setBtndisable('log_sub','登录','#0697DA',false)});
					$('#login_warning span').html(results.msg);
				}else {
					$("#valicode").trigger("click");
					diyou.use('index',function(dy){dy.setBtndisable('log_sub','登录','#0697DA',false)});	
					$('#login_warning span').html(results.msg);
					//diyou.use('dialogs',function(dy){dy.error(results.msg,'')})
				}
			  }
			});
			return false;
		})
	   }

	   
	   
});