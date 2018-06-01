/*!
 * Created By:james;
 * Created Time:2013-11-11;
 * Updated By:james;
 * Updated Time:2013-11-11;
 * http://www.diyou.cn
 */
 define(function(require, exports, module) {
	
	//ahui 还款明细  
	exports.repay_detail = function(){
        //日期选择器
        require("datepicker");
        $(".date_picker").live("click",function(){
            WdatePicker();
        })
        diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=borrow/repay/detail&type=list')});
        
        $("#repay_form").submit(function(){
            var _data = "&dotime1="+$("#dotime1").val()+"&dotime2="+$("#dotime2").val()+"&borrow_name="+$("#borrow_name").val();
            diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=borrow/repay/detail&type=list'+_data)});
            return false;
        }) 
	}
    
	//ahui 还款弹框
	exports.repay_now = function(){
		$('#jdialog-ajax').on('click', '.repay_now', function () {
			jDialog.close();
			var borrow_nid = $(this).attr("data-borrow-nid");
			var id = $(this).attr("data-id");
			jDialog.ajax('/?user&m=borrow/repay/view&borrow_nid=' + borrow_nid + '&id=' + id, {
				title: '我要还款',
				height: 250,
				width: 450
			});
		})
	}
	//ahui 还款弹框
	exports.repay_advance = function(){
	   $('.repay_advance').click(function(){
	       var  borrow_nid= $(this).attr("data-borrow-nid");
	       	diyou.use('dialogs',function(dy){dy.dialog('我要提前还款','/?user&m=borrow/repay/view_advance&borrow_nid='+borrow_nid,'','')});
        })
	}
    //用户还款
	exports.borrow_repay = function(form_id){

		alert(11);return;
        $('#pays_password').click(function(){
            diyou.use('dialogs',function(dy){dy.dialog('请先设置支付密码','/?user&m=approve/safe&type=paypwd_new')});
		})
		$("#repay_form").on("submit",function(){	
			if ($("#paypassword").val()==""){
				$("#paypassword_error").html('支付密码不能为空');
				return false;
			}
            $.ajax({
            　　type:'post',            
            　　url:'/?user&m=borrow/repay/view',
                data:'borrow_nid='+$("input[name='borrow_nid']").val()+'&repay_period='+$("input[name='repay_period']").val()+'&repay_id='+$("input[name='repay_id']").val()+'&paypassword='+$("input[name='paypassword']").val(),
            　　dataType:'text', 
            　　success:function(result){
                        if(result==1){
							diyou.use("dialogs",function(dia){dia.success('还款成功','this')});
                            
						}else{
						  $("#paypassword_error").html(result);
						}
            　　},error:function(){
                    diyou.use('dialogs',function(dia){dia.error('对不起发生错误了！','')});
                }
            });
            /**
            require('submitform');
			$("#repay_form").ajaxSubmit({
					 success: function (result) {
						if(result==1){
							diyou.use("dialogs",function(dia){dia.success('还款成功','')});
                            
						}else{
						  $("#paypassword_error").html(result);
						}

					},error: function (e){
                    alert(e);
                    }
	
				 });
             */
			 return false; 	
		})
        
	}
    
    
    //用户提前还款
	exports.borrow_repay_advance = function(form_id){
        $('#pays_password').click(function(){
            diyou.use('dialogs',function(dy){dy.dialog('请先设置支付密码','/?user&m=approve/safe&type=paypwd_new')});
		})
		$("#repay_form_advance").on("submit",function(){	
			if ($("#paypassword").val()==""){
				$("#paypassword_error").html('支付密码不能为空');
				return false;
			}
            $.ajax({
            　　type:'post',            
            　　url:'/?user&m=borrow/repay/view_advance',
                data:'borrow_nid='+$("input[name='borrow_nid']").val()+'&paypassword='+$("input[name='paypassword']").val(),
            　　dataType:'text', 
            　　success:function(result){
                        if(result=='success'){
							diyou.use("dialogs",function(dia){dia.success('还款成功','this')});
						}else{
						  $("#paypassword_error").html(result);
						}
            　　},error:function(){
                    diyou.use('dialogs',function(dia){dia.error('对不起发生错误了！','')});
                }
            });
			 return false; 	
		})
        
	}
	//ahui 还款借款  
	exports.borrow_count = function(){
        //日期选择器
        require("datepicker");
        $(".date_picker").live("click",function(){
            WdatePicker();
        })
        $(".borrow_view").live("click",function(){
            var borrow_nid = $(this).attr("data-borrow-nid");
            diyou.use('dialogs',function(dy){dy.dialog('还款明细','/?user&m=borrow/repay/views&borrow_nid='+borrow_nid,'','')});

    
        })

		//查看记录
		$('#content_box').on('click', '#ck_jl', function () {
			var url = ($(this).attr('href'));
			var dialog = jDialog.ajax(url, {
				title: '查看借款记录',
				width: 1000,
				height: 500
			})
			return false;
		});
		//撤回
		$('#content_box').on('click', '.borrow_cancel', function () {
			var url = $(this).attr('data-url');
			var dialog = jDialog.confirm('您确定要撤回！',{
				handler : function(button,dialog) {
					$.http.get(url,{},function(){
						jDialog.alert('撤回成功！');
					});
					dialog.close();
				}
			},{
				handler : function(button,dialog) {
					dialog.close();
				}
			});


		})


        var status_type = $("#status_type").val();
        if(status_type == ''){
            var order       = 'addtime_desc';
        }else{
            var order   = '';
        }
         diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=borrow/count&type=list&status_type='+status_type+'&order='+order)});
        
        $("#sou_form").submit(function(){
            var status_type = $("#status_type").val();
            if(status_type == ''){
                var order       = 'addtime_desc';
            }else{
                var order   = '';
            }
            var _data = "&dotime1="+$("#dotime1").val()+"&dotime2="+$("#dotime2").val()+"&borrow_type="+$("#borrow_type").val()+"&status_type="+status_type+'&order='+order;
            diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=borrow/count&type=list'+_data)});
            return false;
        }) 
        
        //正在招标中
        $("#borrow_loan").click(function(){
            diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=borrow/count&type=list&status_type=loan')});
            $('#status_type').find("option[value=loan]").attr('selected','true');
            return false;
        })
        //还款中
        $("#borrow_repay").click(function(){
            diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=borrow/count&type=list&status_type=repay')});
            $('#status_type').find("option[value=repay]").attr('selected','true');
            return false;
        })
        //逾期
        $("#borrow_late").click(function(){
            diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=borrow/count&type=list&status_type=late')});
            $('#status_type').find("option[value=late]").attr('selected','true');
            return false;
        })
	}
    
    //wqs 12-20 撤回操作
    exports.borrow_cancel = function(value){
        $("a[data-option="+value+"]").live('click',function(){ 
            diyou.use('dialogs',function(dia){dia.confirm_cancel("是否进行撤销操作？",'/?user&m=borrow/cancel&borrow_nid='+$(this).attr('data-nid'))});
        })
        
    }
    
    
    
   	exports.borrow_auto = function(form_id,tender_account,borrow_credit_first,borrow_credit_last,timelimit_month_first,timelimit_month_last,apr_first,apr_last){
	
	   $('#'+form_id).live('submit',function(){
			var tender_account_val=$('#'+tender_account).val();
			var borrow_credit_first_val=$('#borrow_credit_first').val();
			var borrow_credit_last_val=$('#borrow_credit_last').val();
			var timelimit_month_first_val=$('#'+timelimit_month_first).val();
			var timelimit_month_last_val=$('#'+timelimit_month_last).val();
			var apr_first_val=$('#'+apr_first).val();
			var apr_last_val=$('#'+apr_last).val();
			
			if(tender_account_val==''){
				diyou.use('dialogs',function(dy){dy.error('借出金额不能为空','')});
				return false;
			}
			else if(tender_account_val==0){
                diyou.use('dialogs',function(dy){dy.error('借出金额不能为0','')});
                return false;
            }
			else if((parseInt(tender_account_val)%50)!=0){
				diyou.use('dialogs',function(dy){dy.error('借出金额必须为50的倍数','')});
				return false;
			}else if(parseInt(borrow_credit_first_val)>parseInt(borrow_credit_last_val)){
				diyou.use('dialogs',function(dy){dy.error('信用等级输入有错','')});
				return false;
			}else if(parseInt(timelimit_month_first_val)>parseInt(timelimit_month_last_val)){
				diyou.use('dialogs',function(dy){dy.error('借款期限填写有错','')});
				return false;
			}else if(parseInt(apr_first_val)>parseInt(apr_last_val)){
				diyou.use('dialogs',function(dy){dy.error('借款利率填写有错','')});
				return false;
			}else{
				require('submitform');
				$('#'+form_id).ajaxSubmit({
				  url:"/?user&m=borrow/auto",
				  success:function(result,status){
					var results = eval('('+result+')');
					if(results.code == '100'){
					  diyou.use('dialogs',function(dy){dy.success(results.msg,'this')})
					}
					else{	
						diyou.use('dialogs',function(dy){dy.error(results.msg,'')})
					}
					
				  }
				});
				return false;
			}
            return false;
		});
		
    }
    
});