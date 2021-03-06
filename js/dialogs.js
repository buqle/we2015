/*!
 * Created Date:2013.11.08
 * Created By:james;
 * Updated:2013.11.13;
 * Updated By:james;
 * http://www.diyou.cn
 */
 define(function(require, exports, module) {
		//弹出窗口的外框（全站通用）
		exports._dialog = function(){
		var $diyou_dialog = $(".diyou_dialog");
		var $diyou_dialog_msg = $("#diyou_dialog_warning");
		var $popBtn = $("#popBtn");
		var $dialog_main = $(".dialog_main");
		var $dialog_con = $(".dialog_con");

		var windowH = document.documentElement.clientHeight;
        if( $dialog_con.height() > windowH){$dialog_con.css({"max-height":windowH -50 +"px"})}
	    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) { //判断IE6
			$dialog_con.css({"height":windowH -50 +"px" })}
		var $maskLayer = $(".dialog_maskLayer");
		var $dialog_mainClose = $(".close");
		var $dialog_mainClose_msg = $(".close_msg");
		var $dialog_mainTop = -($dialog_main.outerHeight() / 2);
		var $dialog_mainLeft = -($dialog_main.outerWidth() / 2);
		var $pageH = $(document).height(); //IE6不支持height:100%，所以为遮罩背景设一个固定高度
        var sto = '';
	    var Drag_ID = $dialog_main,DragHead = $(".dialog_main h2");
    var moveable = false , moveX = 0,moveY = 0,moveTop=0,moveLeft = 0;
    var	cw = $(document).width(),ch = $(document).height()
     var	sw = Drag_ID.width(),sh = Drag_ID.height();

		DragHead.bind('mouseover',function(){
        DragHead.css({'cursor':'move'});
        });
        DragHead.bind('mousedown',function(e){
          moveable = true;
          e = window.event?window.event:e;
          var ol = Drag_ID.offset().left, ot = Drag_ID.offset().top-moveTop; 
          moveX = e.clientX-ol;
		  moveY = e.clientY-ot;      
        });
        $(document).bind('mousemove',function(e){
                if (moveable) {
				e = window.event?window.event:e;
				var x = e.clientX - moveX;
				var y = e.clientY - moveY;
					if ( x > 0 &&( x + sw < cw) && y > 0 && (y + sh < ch) ) {
						Drag_ID.offset({left:x,top:parseInt(y+moveTop)});
						Drag_ID.css({'margin':'auto'});
						}
					}
					})
		$(document).bind('mouseup',function(e){moveable = false;});
        Drag_ID.bind('onselectstart',function(e){return false;});
		
		//点击按钮后显示
		$maskLayer.css({ "height":$pageH });
		if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) { //判断IE6
			$dialog_main.css({ "position":"absolute","marginLeft":( $dialog_mainLeft ) }).show();
		}else{
			$dialog_main.css({ "marginTop":( $dialog_mainTop ),"marginLeft":( $dialog_mainLeft ) }).show();
		};

	    function cancelBubble(event) { //阻止事件冒泡
		        event.stopPropagation();
	    };
		function hideLyaerMsg(event) {
		       $diyou_dialog_msg.remove();
               if (sto!=''){
    	       clearTimeout(sto);
            }
	    };
	    function hideLyaer(event) {
		       $diyou_dialog.remove();
               if ($(this).attr("data-url")!="" && $(this).attr("data-url")!="undefined"){
                location.href=$(this).attr("data-url");
               }else
               if (sto!=''){
	       clearTimeout(sto);
        }
	    };
		$dialog_main.click(cancelBubble);
		$dialog_mainClose_msg.click(hideLyaerMsg);
	    $dialog_mainClose.click(hideLyaer);
	}
	
	exports.dialog = function(title,url,reply,tourl){	
	    $('.diyou_dialog').remove();
        if(typeof(tourl)=="undefined"){
			tourl='';	
		}
        var _cont ='<div class="diyou_dialog"><div class="dialog_main"><div class="dialog_tit"><h2>'+title+'</h2><i class="close" data-url='+tourl+'></i></div><div class="dialog_con"><div class="dialog_warning"><div class="dialog_loading">数据正在加载中······</div></div></div></div><div class="dialog_maskLayer"></div></div>';
		$('body').append(_cont);
        exports._dialog();
        if(url!=""){
			$.ajax({
				type: "GET",
				dataType: "html",
				url:url,
				success: function(data) {
					$('.dialog_con').html(data);            
					exports._dialog();
					
				}
			});	  	
        }else{
            $('.dialog_warning').html(reply);    
        }
        
    }
	
	exports.message = function(title,content){
	    $('.diyou_dialog').remove();
        var _cont ='<div class="diyou_dialog"><div class="dialog_main"><div class="dialog_tit"><h2>'+title+'</h2><i class="close"></i></div><div class="dialog_con">'+content+'</div></div><div class="dialog_maskLayer"></div></div>';
		$('body').append(_cont);
        exports._dialog();
	}
	
	
	exports.success = function(content,url){
	    $('.diyou_dialog').remove();
	    $('#diyou_dialog_warning').remove();
        var _cont ='<div class="diyou_dialog" id="diyou_dialog_warning"><div class="dialog_main"><div class="dialog_tit_msg"><i class="close_msg"></i></div><div class="dialog_con" ><div class="dialog_warning"><div class="dialog_success">'+content+'</div></div></div></div><div class="dialog_maskLayer"></div></div>';
		$('body').append(_cont);
        exports._dialog();
		if(typeof(url)=="undefined"){
			url='';	
		}
		if(url!=''){
			if (url=='this'){
				setTimeout("window.location.reload()",2000);
			}else{
                setTimeout("location.href='"+url+"'",2000);
			}
		}else{
            setTimeout("$('#diyou_dialog_warning').remove()",2000);
        }
       
    }

     
	exports.error = function(content,url){	
	    
	    $('.diyou_dialog').remove();
	    $('#diyou_dialog_warning').remove();
        var _cont ='<div class="diyou_dialog" id="diyou_dialog_warning"><div class="dialog_main"><div class="dialog_tit_msg"><i class="close_msg"></i></div><div class="dialog_con" ><div class="dialog_warning"><div class="dialog_error">'+content+'</div></div></div></div><div class="dialog_maskLayer"></div></div>';
		$('body').append(_cont);
        exports._dialog();
		if(typeof(url)=="undefined"){
			url='';	
			
		}
        if(url!=''){
			if (url=='this'){
               sto =  setTimeout("window.location.reload()",1500);
			}else{
			   sto = setTimeout("location.href='"+url+"'",1500);
			}
		}else{
             sto = setTimeout("$('#diyou_dialog_warning').remove()",1500);
        }
		return false;
    }
	
	//hsd
    exports.confirm = function(content,url){
	    $('.diyou_dialog').remove();	
	    $('#diyou_dialog_warning').remove();
        var _cont ='<div class="diyou_dialog" id="diyou_dialog_warning"><div class="dialog_main"><div class="dialog_tit_msg"><i class="close_msg"></i></div><div class="dialog_con" ><div class="dialog_warning"><div class="dialog_warn">'+content+'</div></div></div><div class="ui_buttons"><input  type="submit" value="确认" class="dialog_confirm"/> <input  type="submit" value="关闭" class="dialog_cancel"></div></div><div class="dialog_maskLayer"></div></div>';
		$('body').append(_cont);
        exports._dialog();
        $('.dialog_cancel').bind('click',function(){
			$('#diyou_dialog_warning').remove();
		})
		$('.dialog_confirm').click(function(){
			$.ajax({
				type: "GET",
				dataType: "text",
				url:url,
				success: function(data) {
                    exports.success('操作成功',"this");
					
				}
			});
		})
    }
    //提交确认后,依据后台处理的结果返回正确或错误信息  chenwei
    exports.confirm_success = function(content,url){
	    $('.diyou_dialog').remove();	
	    $('#diyou_dialog_warning').remove();
        var _cont ='<div class="diyou_dialog" id="diyou_dialog_warning"><div class="dialog_main"><div class="dialog_tit_msg"><i class="close_msg"></i></div><div class="dialog_con" ><div class="dialog_warning"><div class="dialog_warn">'+content+'</div></div></div><div class="ui_buttons"><input  type="submit" value="确认" class="dialog_confirm"/> <input  type="submit" value="关闭" class="dialog_cancel"></div></div><div class="dialog_maskLayer"></div></div>';
		$('body').append(_cont);
        exports._dialog();
        $('.dialog_cancel').bind('click',function(){
			$('#diyou_dialog_warning').remove();
		})
		$('.dialog_confirm').click(function(){
			$.ajax({
				type: "GET",
				dataType: "text",
				url:url,
				success:function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == '100')
    				{
                       exports.success(results.msg,"this");
    				}else{
                       exports.error(results.msg,"this");
                    }
                  }
			});
		})
    }
	
	//hsd
	exports.confirm_cancel = function(content,url){
	    $('.diyou_dialog').remove();	
	    $('#diyou_dialog_warning').remove();
        var _cont ='<div class="diyou_dialog" id="diyou_dialog_warning"><div class="dialog_main"><div class="dialog_tit_msg"><i class="close_msg"></i></div><div class="dialog_con" ><div class="dialog_warning"><div class="dialog_warn">'+content+'</div></div></div><div class="ui_buttons"><input  type="button" value="确认" class="dialog_confirm"/> <input  type="button" value="关闭" class="dialog_cancel"></div></div><div class="dialog_maskLayer"></div></div>';
		$('body').append(_cont);
        exports._dialog();
		$('.dialog_confirm').bind('click',function(){
			location.href =  url ;
		});
		$('.dialog_cancel').bind('click',function(){
			$('#diyou_dialog_warning').remove();
		})
    }
});