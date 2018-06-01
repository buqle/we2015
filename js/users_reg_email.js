 define(function(require, exports, module) {
	$.fn.regEmail = function(options){
		var opts = $.extend({}, $.fn.regEmail.defaults, options);
		return this.each(function(){
			var $this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			var top = $this.offset().top + $this.height() + 6;
			var left = $this.offset().left;
			var $mailBox = $('<div id="mailBox" style="top:'+top+'px;left:'+left+'px;width:'+$this.width()+'px"></div>');
			$('body').append($mailBox);
			
			//设置高亮li
			function setEmailLi(index){
				$('#mailBox li').removeClass('cmail').eq(index).addClass('cmail');
			}
			//初始化邮箱列表
			var emails = o.emails;
			var init = function(input){
				//取消浏览器自动提示
				input.attr('autocomplete','off');
				//添加提示邮箱列表
				if(input.val()!=""){
					var emailList = '<ul>';
					for(var i = 0; i < emails.length; i++) {
						emailList += '<li>'+input.val()+'@'+emails[i]+'</li>';
					}
					emailList += '</ul>';
					$mailBox.html(emailList).show(0);
				}else{
					$mailBox.hide(0);
				}
                
				//添加鼠标事件
				$('#mailBox li').hover(function(){
					$('#mailBox li').removeClass('cmail');
					$(this).addClass('cmail');
				},function(){
					$(this).removeClass('cmail');
				})
                
			}
			//当前高亮下标
			var eindex = -1;
			//监听事件
			$this.focus(function(){
			    $this.siblings('.msg_box').hide(); 
				if($this.val().indexOf('@') == -1){
					init($this);
				}else{
					$mailBox.hide(0);
				}
			}).blur(function(){
			    $this.siblings('.msg_box').hide(); 
                $(document).off("click");
			 	$(document).on("click",function(event){
    				if($(event.target).is("li") && $(event.target).attr("class")=='cmail'){
                        $this.val($(event.target).html());
                        $mailBox.hide(0);
                        exports.check($this.val());
                        $(document).off("click");
    				}else{
                         $mailBox.hide(0);
                         exports.check($this.val());
    				     $(document).off("click");
    				}
    			})
			}).keyup(function(event){
				if($this.val().indexOf('@') == -1){
					//上键
					if(event.keyCode == 40){
						eindex ++;
						if(eindex >= $('#mailBox li').length){
							eindex = 0;
						}
						setEmailLi(eindex);
					//下键
					}else if(event.keyCode == 38){
						eindex --;
						if(eindex < 0){
							eindex = $('#mailBox li').length-1;
						}
						setEmailLi(eindex);
					//回车键
					}else if(event.keyCode == 13){
						if(eindex >= 0){
							$this.val($('#mailBox li').eq(eindex).html());
							$mailBox.hide(0);
						}
					}else{
						eindex = -1;
						init($this);
					}
				}else{
					$mailBox.hide(0);
				}
			//如果在表单中，防止回车提交
			}).keydown(function(event){
				if(event.keyCode == 13){
					return false;
				}
			});
		});
	}
	$.fn.regEmail.defaults = {
		emails:[]
	}
    exports.check = function(Val){
        if (Val!=''){
             $("#reg_email").hide();
             $("#reg_phone").hide();
            if(Val.indexOf('@') != -1){
                 diyou.use("users_check",function(e){e._check_email("email")});
                $("#reg_type").val("email");
            }
            
            
        }
    }
    
})