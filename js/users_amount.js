/*!
 * Created By:wqs;
 * Created Time:2013-11-11;
 * Updated By:wqs;
 * Updated Time:2013-11-11;
 * http://www.diyou.cn
 */
define(function(require, exports, module) {
     exports.user_borrow_amount_apply = function(form_id){
        
            diyou.use("pagelist",function(p){p.pages('#amount_list','/?user&m=borrow/loan/myamount&type=list')});
           
            
            
            $('#amount_account').bind('blur',function(){
                diyou.use('users',function(dia){dia._check_input_text('amount_account','请填写申请额度')});   
    		})
            
            $('#'+form_id).bind('submit',function(){
                diyou.use('users',function(dia){dia._check_input_text('amount_account','请填写申请额度')});  
                require('submitform');
    			$('#'+form_id).ajaxSubmit({
				  url:'/?user&m=borrow/loan/myamount',
    			  success : function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == '100')
    				{
                       diyou.use('dialogs',function(dia){dia.success(results.msg,'this')});                  
    				}else if(results.code == '2'){
    				   diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                    }else if(results.code == '101'){
                    }else{
    				   diyou.use('dialogs',function(dia){dia.error(results.msg,'')});
                    }
                    return false;
                  }
    			});
                return false;
            });
        }
        
        //额度记录
        exports.user_borrow_amount_log = function(con_id){
        
            diyou.use("pagelist",function(p){p.pages('#'+con_id,'/?user&m=borrow/loan/amount_log&type=list')});
           
        }
});