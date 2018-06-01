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
	   $('.repay_now').click(function(){
	       var  borrow_nid= $(this).attr("data-borrow-nid");
	       var id = $(this).attr("data-id");
	       	diyou.use('dialogs',function(dy){dy.dialog('我要还款','/?user&m=borrow/repay/view&borrow_nid='+borrow_nid+'&id='+id,'','')});
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
       
	}
    
});