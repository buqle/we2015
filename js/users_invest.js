/*!
 * Created By:wqs;
 * Created Time:2013-11-11;
 * Updated By:wqs;
 * Updated Time:2013-11-11;
 * http://www.diyou.cn
 */
define(function(require, exports, module) {
    exports.invest_info = function(_type){
        require("datepicker");
        $(".date_picker").live("click",function(){
            WdatePicker();
        })
        /*if(_type == 'all'){
            diyou.use("pagelist",function(p){p.pages('#content_list','/?user&m=borrow/invest&type=list')});
        }else{
            diyou.use("pagelist",function(p){p.pages('#content_list','/?user&m=borrow/invest&type=list&status_type=tender')});
        }
        $("#sou_form").submit(function(){
            var _data = "&dotime1="+$("#dotime1").val()+"&dotime2="+$("#dotime2").val()+"&borrow_type="+$("#borrow_type").val()+"&status_type="+$("#status_type").val();
         
            diyou.use("pagelist",function(p){p.pages('#content_list','/?user&m=borrow/invest&type=list'+_data)});
            return false;
        }) */
        var getUrl;
        if (_type == 'tender_list') {
            getUrl = '/?user&m=users/old&data_type=tender_list&type=list';

        } else {
            getUrl = '/?user&m=borrow/invest&type=list';
        }
        diyou.use("pagelist",function(p){p.pages('#content_list',getUrl)});
        //收款详细
        $('#view_detail').live('click',function(){
            diyou.use("dialogs",function(d){d.dialog('查看投资明细',"/?user&m=borrow/tender")});
            return false;
        })

        //投标中筛选
        $("#tendering").click(function(){
            var _data = "&dotime1="+$("#dotime1").val()+"&dotime2="+$("#dotime2").val()+"&borrow_type="+$("#borrow_type").val()+"&status_type=tender";         
            diyou.use("pagelist",function(p){p.pages('#content_list',getUrl+_data)});
            $('#status_type').find("option[value=tender]").attr('selected','true');
            return false;
        })
        //回收中筛选
        $("#recovering").click(function(){
            var _data = "&dotime1="+$("#dotime1").val()+"&dotime2="+$("#dotime2").val()+"&borrow_type="+$("#borrow_type").val()+"&status_type=recover";         
            diyou.use("pagelist",function(p){p.pages('#content_list','/?user&m=borrow/invest&type=list'+_data)});
            $('#status_type').find("option[value=recover]").attr('selected','true');
            return false;
        })
        //逾期筛选
        $("#lated").click(function(){
            var _data = "&dotime1="+$("#dotime1").val()+"&dotime2="+$("#dotime2").val()+"&borrow_type="+$("#borrow_type").val()+"&status_type=lating";         
            diyou.use("pagelist",function(p){p.pages('#content_list','/?user&m=borrow/invest&type=list'+_data)});
            $('#status_type').find("option[value=lating]").attr('selected','true');
            return false;
        })

        $('#content_list').on('click','.ckmx',function(){
            var url = $(this).attr('href');
            var dialog = jDialog.ajax(url,{
                title: '查看投资明细'
            })
            return false;
        })


    }
    //待收详细
    exports.invest_repay_wait = function(recover_type){
       require("datepicker");
        $(".date_picker").live("click",function(){
            WdatePicker();
        })
        var recoverUrl;
        if(recover_type == 'recover_list'){
            recoverUrl = '/?user&m=users/old&data_type=recover_list&type=list'
        }else {
            recoverUrl = '/?user&m=borrow/invest/now&type=list';
        }
        diyou.use("pagelist",function(p){p.pages('#vdcontent_list',recoverUrl)});
        $("#vdsou_form").submit(function(){
            var _data = "&dotime1="+$("#dotime1").val()+"&dotime2="+$("#dotime2").val()+"&keywords="+$("input[name='keywords']").val();
            diyou.use("pagelist",function(p){p.pages('#vdcontent_list','/?user&m=borrow/invest/now&type=list'+_data)});
            return false;
        }) 
    }
    //回款详情
    exports.tender_detail = function(){

    }
    
    //协议书下载 wqs 2013-12-19
    exports.tender_protocol = function(view_id,down_id){
        $('#'+view_id).on('click',function(){
            var url = "/?ajax&t=users_protocol&borrow_nid="+$(this).attr('data-nid')+"&type="+$(this).attr('data-type')+"&id="+$(this).attr('data-id'); //转向网页的地址;
            var name = "协议书查看"; //网页名称，可为空;
            var iWidth = window.screen.availWidth-150; //弹出窗口的宽度;
            var iHeight = window.screen.availHeight-150; //弹出窗口的高度;
            var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
            var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
            var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
            if(isChrome){
                window.open (url,name,'height=600,width=500,top=0,left=450,toolbar=no,menubar=no,scrollbars=yes, resizable=no,location=no, status=no')
            }else{
                showModalDialog(url,name,'',"dialogWidth="+iWidth+"px;dialogHeight="+iHeight+"px;dialogLeft="+iLeft+"px");
            }
            return false;
        })
        $('#'+down_id).bind('click',function(){
            if(confirm("温馨提示：文档打开密码为您的认证手机号码!")){
                window.location.href = "/?user&m=borrow/protocol/down_protocol&borrow_nid="+$(this).attr('data-nid')+"&type="+$(this).attr('data-type')+"&id="+$(this).attr('data-id');
            }
        })
    }
});