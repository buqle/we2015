/*!
 * Created By:wqs;
 * Created Time:2013-11-13;
 * Updated By:wqs;
 * Updated Time:2013-11-13;
 * http://www.diyou.cn
 */
define(function(require, exports, module) {
   //推广记录列表
   exports.spreads_log = function(suid){
        require("datepicker");
        $(".date_picker").live("click",function(){
            WdatePicker();
        })

        diyou.use("pagelist",function(p){p.pages('#content_loglist','/?user&m=spreads/log&type=loglist&user_id='+suid)});
        $("#logsou_form").submit(function(){
            var _data = "&dotime1="+$("#dotime1").val()+"&dotime2="+$("#dotime2").val()+"&username="+$("#username").val();

            diyou.use("pagelist",function(p){p.pages('#content_loglist','/?user&m=spreads/log&type=loglist'+_data)});
            return false;
        })
   }

     //推广列表
   exports.spreads_list = function () {
       $("#copy_btn").click(function () {

           var codeid;
           codeid = "invite";
           if (document.all) {
               var obj;
               obj = document.getElementById(codeid);
               window.clipboardData.setData("text", obj.innerText)
               alert("邀请链接地址复制成功，你可以直接复制发给你的好友");
           }
           else {
               alert("此功能只能在IE上有效\n\n请在文本域中用Ctrl+A选择再复制");
           }
       })
       diyou.use("pagelist", function (p) { p.pages('#content_list', '/?user&m=users/myfriend&type=list') });
        $("#spredlist").click(function(){
             diyou.use("pagelist",function(p){p.pages('#content_list','/?user&m=users/myfriend&type=list')});
        })

        //wqs 2014/7/8 推广申请结算
        $("#spread_settle").click(function(){
            var url = "/?user&m=spreads/settle";
            $.post(url,{user_id:user_id},function(result){
	           if(result!=1){
	               diyou.use("dialogs",function(e){e.error(result,"");});
	           }else{
	               diyou.use("dialogs",function(e){e.success("申请成功","this");});
	           }
	       });
        })
   }
   exports._spreads_list = function () {

       $("#sou_form").submit(function () {
           var _data = "&username=" + $("#username").val();
           diyou.use("pagelist", function (p) { p.pages('#content_list', '/?user&m=spreads/list&type=_list' + _data) });
           return false;
       })
   }

	//邀请管理 hsd
	exports.spreads_friend = function(){
		require('KeleyiClipboard');
		function init() {
		   var clip = null;
		   function $(id) { return document.getElementById(id); }

		   clip = new ZeroClipboard.Client();
		   clip.setHandCursor(true);

		   clip.addEventListener('load', function (client) {
			   debugstr("");
		   });

		   clip.addEventListener('mouseOver', function (client) {
			   // update the text on mouse over
			   clip.setText($('fe_text').value);
		   });

		   clip.addEventListener('complete', function (client, text) {
			   alert('已经成功复制粘贴到剪贴板');
		   });

		   clip.glue('d_clip_button', 'd_clip_container');

		}
		$('#d_clip_button').bind('click',function(){
			init()
		})
		init();
	}

});