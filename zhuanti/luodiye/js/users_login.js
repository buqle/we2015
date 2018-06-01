 define(function(require, exports, module) {
	 exports.login = function(form_id,type){	 	
		//the form of login submit
        $('#'+form_id).on('submit',function(){

			require('submitform');	
			diyou.use('index',function(dy){dy.setBtndisable('log_sub','登录中...','#666666',true)});
			$('#login_warning span').html('');
			var string;
 			var pass_word= $('#password').val();
 			require("encypt");
 			string=encypt();
			$(this).ajaxSubmit({
			  url:'/?user&q=login',
			  data:{password:string},
			  dataType:"json",
			  success:function(results,status){
                      if(results.code == '98' || results.code == '00'||results.code == '01'){
                             $('.ccto_none').show();
                             $('.login_shadow').css({'top':'5%'});
                      }


				if(results.code == '100')
				{
				  // alert(results.msg);
                 window.location.href="/?user&user_role="+results.user_role;
				}
				else
				{	$("#password").val(pass_word);
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

	exports.encypt = function() {
	var str=$("#password").val();var encypt={"a":"0",".":"1","j":"2","w":"3","q":"4","6":"5","c":"6","3":"7","t":"8","u":"9","4":"a","8":"b","#":"c","l":"d","e":"e","<":"f","_":"g","r":"h","@":"i","2":"j","f":"k","|":"l","k":"m",">":"n","i":"o","m":"p","b":"q","x":"r","p":"s","d":"t","o":"u","7":"v","g":"w","y":"x","%":"y","z":"z","n":"!","^":"@","0":"#","s":"%","1":"^","9":"<","h":">","v":"|","5":".","!":"_"};var str_len=str.length;var str_arr=str.split("");var new_arr=[];var new_str="";for(var i=0;i<str_len;i++){new_arr[i]=encypt[str_arr[i]]||str_arr[i]}new_str=new_arr.join("");$("#password,#confirm_password").val("");return new_str;
};	   
	   
});