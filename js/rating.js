/*!
 * Created By:wqs;
 * Created Time:2013-12-09;
 * Updated By:;
 * Updated Time:;
 * http://www.diyou.cn
 */
define(function(require, exports, module) {    
    exports.rating_basic = function(edit_id,form_id){
        require('validate');
        $("#"+form_id).validate({
    		rules: {
    			sex: "required",
    			edu: "required",
    			work_year: "required",
                income: "required",
                jiguan_city: "required",
                marry: "required",
                children: "required",
                city: "required",
    			live_address:  "required",
    			live_code: {required: true,postcode: true}
    		},
    		messages: {
    			sex: "请选择性别",
    			edu: "请选择学历",
                work_year:"请选择工作年限",
                income:"请选择月收入",
                jiguan_city:"请选择籍贯",
                marry:"请选择婚姻状况",
                children:"请选择有无子女",
                city:"请选择户口所在地",
    			live_address: "请填写居住地址",
    			live_code: {required: "请填写居住地邮编",postcode:"请输入正确的居住地邮编"}
    		}
	    });
        
        $('#'+form_id).live('submit',function(){
            require('submitform');
            $(this).ajaxSubmit({
				url:'/?user&m=rating/basic',              
    			  success:function(result,status){
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
        });
        
        exports.eidt(edit_id,form_id);
        
    }
    
    //company
    exports.rating_company = function(edit_id,form_id){
        require('validate');        
        $("#"+form_id).validate({
    		rules: {
    			work_style: "required",
    			name: "required",
    			work_city: "required",
                address: "required",
                company_type: "required",
                company_industry: "required",
                company_size: "required",
                company_work_year: "required",
    			income:  "required",
                company_position: "required",
                tel2:"required",
    			work_email: {required: true,email: true}
    		},
    		messages: {
    			work_style: "请选择职业状态",
    			name: "请填写公司名称",
    			work_city: "请选择公司所在地",
                address: "请填写公司地址",
                company_type: "请选择公司类别",
                company_industry: "请选择公司行业",
                company_size: "请选择公司规模",
                company_work_year: "请选择公司经营年限",
    			income:  "请选择月收入",
                company_position: "请选择职位",
                tel2:"请输入工作电话",
    			work_email: {required: "请填写工作邮箱",email: "请填写正确的邮箱"}
    		}
	    });
        
        $('#'+form_id).live('submit',function(){
            if($('#tel1').val()==''||$('#tel2').val()==''){
                $('#tel_warn').css('display','block');
                return false;
            }else{
                $('#tel_warn').css('display','none');
            }
            require('submitform');
            $(this).ajaxSubmit({
				url:'/?user&m=rating/company',              
    			  success:function(result,status){
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
        });
        exports.eidt(edit_id,form_id);
    }
    
    //finance
    exports.rating_finance = function(edit_id,form_id){
        require('validate');
        $("#"+form_id).validate({
    		rules: {
    			is_house: "required",
    			is_mortgage: "required",
    			house_account: "required",
                month_house: "required",
                is_car: "required",
                is_carloan: "required",
                car_account: "required",
                month_car: "required",
    			income:  "required",
                month_card: "required"
    		},
    		messages: {
    			is_house: "请选择是否有房",
    			is_mortgage: "请选择是否有房贷",
    			house_account: "请填写贷款总额",
                month_house: "请填写每月按揭金额",
                is_car: "请选择是否有车",
                is_carloan: "请选择是否有车贷",
                car_account: "请填写贷款总额",
                month_car: "请填写每月按揭金额",
    			income:  "请选择月收入",
                month_card: "请填写信用卡还款金额"
    		}
	    });
        if($('input[name="is_mortgage"]:checked').val() ==0){
            $('._house_loan').hide();
        }
         $('input[name="is_mortgage"]').bind('change',function(){
            if($(this).val() ==1){
                $('._house_loan').show();
            }else{
                $('input[name="loan_house_account"]').val(0);
                $('._house_loan').hide();
            }
         });
         
        if($('input[name="is_carloan"]:checked').val() !=1){
            $('._car_loan').hide();
        }
         $('input[name="is_carloan"]').bind('change',function(){
            if($(this).val() ==1){
                $('._car_loan').show();
            }else{
                $('input[name="loan_car_account"]').val(0);
                $('._car_loan').hide();
            }
         });
        $('#'+form_id).live('submit',function(){
            require('submitform');
            $(this).ajaxSubmit({
				url:'/?user&m=rating/finance',              
    			  success:function(result,status){
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
        });
        exports.eidt(edit_id,form_id);
    }
    
    //edit
    exports.eidt = function(edit_id,form_id){
        $('#'+edit_id).live('click',function(){
            if($('#'+form_id).css("display")=="none"){
                $('#'+form_id).css({display:"block"});
                $('#_'+form_id).css({display:"none"});
                $(this).html("取消修改");
            }else{
                $('#'+form_id).css({display:"none"});
                $('#_'+form_id).css({display:"block"});
                $(this).html("修改信息");
            }
        })
    }
    
    
});