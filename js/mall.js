define(function(require, exports, module) {
    exports.goods_list = function(){
		exports._mall_list(0);
		
		$("#mall_menu a").click(function(){ 
		  $(this).parents("ul").find('input').removeAttr("checked");
		  $(this).find('input').attr("checked",'checked');
		  if($(this).hasClass("mall_menu_link")){
				exports.menu_switch();
		  }
          exports._mall_list(0);
	   })
	   
	   $(".money_excerpt a").click(function(){
		 $('#mygolds').val('');
          $(this).parent().find('a').removeClass("active");
		  $(this).parent().find('input').removeAttr("checked");
		  $(this).addClass('active');
		  $(this).find('input').attr("checked",'checked');
          exports._mall_list(0);
	   })
	   
	   
       $("#my_credit_goods").click(function(){ 
          exports._credit_mall_list(0);
	   })
	   
	   $(".mall_menu_li a").click(function(){ 
		  $('#mygolds').val('');
		  $(this).parent().find('input').removeAttr("checked");
		  $(".mall_menu_li a").removeClass("m_f_c1");
		  $(this).find('input').attr("checked",'checked');
		  $(this).addClass('m_f_c1');
          exports._mall_list(0);
	   })
	   
	   $(".mall_pro_sub").click(function(){ 
		  $('#mygolds').val('');
		  $('input:radio[name="golds_rank"]').removeAttr("checked");
		  $(".money_excerpt a").removeClass("active");
          exports._mall_list(0);
	   })
	   
	}
    
	exports._mall_list = function(page){
		var _goods_name=$('#goodsname').val();
		var _golds1=$('#golds1').val();
		var _golds2=$('#golds2').val();	
		var _mygolds=$('#mygolds').val();		
        var _golds_rank=$('input:radio[name="golds_rank"]:checked').val();
		var _type_nid=$('input:radio[name="type_nid"]:checked').val();
		if(_goods_name==undefined){_goods_name='';}
		if(_golds1==undefined){_golds1='';}
		if(_mygolds==undefined||parseInt(_mygolds)<=0){_golds1='';}
		if(_golds2==undefined){_golds2='';}
		if(_golds_rank==undefined){_golds_rank='';}
		if(_type_nid==undefined){_type_nid='';}
        _data = '&t=mall_goods_list&page='+page+'&name='+_goods_name+'&nid='+_type_nid+'&golds_rank='+_golds_rank+'&golds1='+_golds1+'&golds2='+_golds2+'&mygolds='+_mygolds;
		
        $.ajax({
			url: "/?ajax",
			data: _data,
			success: function(data){
				$("#main_box_cont").html(data);  
			}
        });
    }
    /*exports._credit_mall_list = function(page){
        var _golds_rank=exports._calculate_credit_rank($('#credit_use').html());
		var _type_nid=$('input:radio[name="type_nid"]:checked').val();
		var _goods_name='';
		if(_golds_rank==undefined){_golds_rank='';}
		if(_type_nid==undefined){_type_nid='';}
        _data = '&t=mall_goods_list&page='+page+'&name='+_goods_name+'&nid='+_type_nid+'&golds_rank='+_golds_rank;
		
        $.ajax({
        url: "/?ajax",
        data: _data,
        success: function(data){
            $("#main_box_cont").html(data);  
        }
        });
    }
    exports._calculate_credit_rank = function(credit){
        credit = parseInt(credit);
        if(credit>0 && credit<=2000){
            return 1;
        }else if(credit>2000 && credit<=3000){
            return 2;
        }else if(credit>3000 && credit<=5000){
            return 3;
        }else if(credit>5000 && credit<=10000){
            return 4;
        }else if(credit>10000 && credit<=20000){
            return 5;
        }else if(credit>20000){
            return 6;
        }
        return 0;
    }  */
    //列表页
    exports.pages = function(){
        require("pages");
         $("#pages").pagination($("#pages").attr('data-total'), {
            callback: pageselectCallback,//PageCallback() 为翻页调用次函数。
            prev_text: "<",
            next_text: ">",
            items_per_page: parseInt($("#pages").attr('data-epage')), //每页的数据个数
            num_display_entries: 5, //两侧首尾分页条目数
            current_page: parseInt($("#pages").attr('data-page')),   //当前页码
            //current_page:0,
            num_edge_entries: 2,
            load_first_page:false
        });
        function pageselectCallback(page_id, jq) {
            exports._mall_list(page_id);
            return false;
        }
    }
	
	//立即兑换
	/*exports.exchange = function(){
	  $('#exchange_now').bind('click',function(){
			var ecredit=$(this).attr('data-ecredit');
			var ucredit=$(this).attr('data-ucredit');
			var goods_id = $('#goods_id').val();
			
            if(user_id==''){
				diyou.use('dialogs',function(dia){dia.dialog('用户登录','/?user&q=login&type=ajax')});
				return false;
			}else if(parseInt(ecredit)>parseInt(ucredit)){
				 diyou.use('dialogs',function(dia){dia.error('您的积分不足','')});
			}else{
				var num=$('#exchange_num').val();
			    diyou.use('dialogs',function(dia){dia.dialog('商品兑换','/?user&m=mall/exchange/new&num='+num+'&goods_id='+goods_id)});
			
			}
            
	    
	  })
	}*/
	
		//立即兑换
	exports.exchange = function(){
	  $('#exchange_now').bind('click',function(){
			
			var goods_id = $('#goods_id').val();
			var num=$('#exchange_num').val();				
			var my_money=parseInt($("#my_money").attr("data-money"));
			var pay_money=parseInt($("#pay_money").attr("data-golds"));
			var pay_all=pay_money*num;
            if(user_id==''){
				diyou.use('dialogs',function(dia){dia.dialog('用户登录','/?user&q=login&type=ajax')});
				return false;
			}else if(my_money<pay_all){
					 diyou.use('dialogs',function(dia){dia.error('您的积分不足')});	
return false;					 
				}
				else{
			    diyou.use('dialogs',function(dia){dia.dialog('商品兑换','/?user&m=mall/exchange/new&num='+num+'&goods_id='+goods_id)});
			
			}
            
	    
	  })
	}
	
	//立即兑换弹窗表单提交 hsd
	exports.exchange_form = function(form_id){
	    require('submitform');
	    require('validate');           
        $("#"+form_id).validate({
            errorPlacement:function(error,element){error.appendTo(element.parent())},
            onfocusout:function(element) {$(element).valid()},
            onkeyup:function(element) {$(element).valid()},
            errorElement:'span',
    		rules: {
    			username: {required: true},
    			realname: {required: true,zh_ch: true},
                phone:{required: true,phone: true},
                num:{required: true,digits:true},    		
                post_code:{required: true,postcode:true},    		
                address:{required: true}    		
    		},
    		messages: {
    			username: {required: "请输入用户名"},
    			realname: {required: "请输入真实姓名",zh_ch: "请输入正确的姓名"},
                phone:{required: "请输入手机号",phone: "请输入正确的手机号"},
                num:{required: '请输入兑换数量',digits:'请输入正确的数量格式'},    		
                post_code:{required: '请输入邮政编码',postcode:'请输入正确的邮政编码'},    		
                address:{required: '请输入收货地址'}  
    		},submitHandler:function(form) {
              $(form).ajaxSubmit({
			    url:'/?user&m=mall/exchange/new&q=exchange_now',
				success:function(result,status){
    			    var results = eval('('+result+')');
    				if(results.code == 'success')
    				{
                       diyou.use('dialogs',function(dia){dia.success(results.msg,'this')});
					   location.href=results.url;
                    }else{
    				   $('#exchange_warn').html(results.msg);
                    }
				}
			  })
			  }
	    })
	}
	
	exports.golds_log = function(){  
        diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=mall/golds/log&type=list')});
        
	}
	
	exports.exchange_log = function(){  
        diyou.use("pagelist",function(p){p.pages('#exchange_box','/?user&m=mall/exchange/log&type=list')});
        
	}
	
	exports.exchange_golds = function(){
		//监听积分兑换积分输入事件
		$('#exchange_credit').bind('input propertychange',function(){	
			var credit_input = $(this).val();
			var multi = $(this).attr('data-nid');
			var credit = (credit_input/multi).toFixed(2);
			$('#golds_val').html(credit);
			var ex_golds = parseInt(credit);
			var ex_credit = ex_golds*multi;
			var max_credit = parseInt($(this).attr('data-max'));
			if(credit_input!=''){
				if(credit_input>max_credit){
					$('#ex_warn').addClass('hid');
					$('#ex_error').removeClass('hid');
					$('#exchange_now').attr('disabled','disabled').addClass('disabled_bg');
				}else{
					$("#exchange_now").removeAttr('disabled').removeClass('disabled_bg');
					$('#ex_error').addClass('hid');
					$('#ex_warn').removeClass('hid');
					$('#ex_golds').html(ex_golds);
					$('#ex_credit').html(ex_credit);
				}	
			}else{
				$('#ex_warn').addClass('hid');
				$('#ex_error').addClass('hid');
				$('#ex_golds').html(0);
				$('#ex_credit').html(0);
				$("#exchange_now").removeAttr('disabled').removeClass('disabled_bg');
			}
		})
		
		//点击立即兑换
		$('#exchange_now').bind('click',function(){
			var ex_golds = $('#ex_golds').html();
			var ex_credit =	$('#ex_credit').html();
			diyou.use('dialogs',function(dia){dia.dialog('确定兑换','/?user&m=mall/golds/exchange&action=confirm&credit='+ex_credit+'&golds='+ex_golds)});
		});
		
		//确认是否兑换
		require('submitform');
		$('#exchange_con').bind('submit',function(){
			$(this).ajaxSubmit({
				url:'/?user&m=mall/golds/exchange&action=confirm',
				success:function(result,status){
					var obj = eval("("+result+")");
					if(obj.code=='success'){
						diyou.use('dialogs',function(dy){dy.success('兑换成功','/?user&m=mall/golds/exchange')})
					}else{
						diyou.use('dialogs',function(dy){dy.error(obj.msg,'')})
					}
				}
			});
			return false;
		})
		
		//取消兑换
		$('#exchange_cancel').bind('click',function(){
			$('.diyou_dialog').remove();
		})
	}
	
	//兑换商城左侧栏目切换 hsd
	
	//兑换商城左侧栏目切换 hsd
	exports.menu_switch = function(){
	    $('#mall_menu ul li .mall_menu_link').bind('click',function(){
		var dl_dis = $(this).next('dl').css('display');
		if(dl_dis == 'none'){
		    $('#mall_menu ul li dl').css({'display':'none'});
		    $(this).next('dl').css({'display':'block'});
		}else{
		    $(this).next('dl').css({'display':'none'});
		}
	   });
	   
	   $('.mall_menu_dd a').bind('click',function(){
	    $('.mall_menu_dd a').removeClass('act');
	    $(this).addClass('act');
	    })
	
	}
	/*
	exports.menu_switch = function(obj){
		var dl_dis = obj.next('dl').css('display');
		if(dl_dis == 'none'){
		    $('#mall_menu ul li dl').css({'display':'none'});
			$('#mall_menu ul li a').removeClass("on");
			obj.addClass("on");
		    obj.next('dl').css({'display':'block'});
		}

	   
	   $('.mall_menu_dd a').bind('click',function(){
	    $('.mall_menu_dd a').removeClass('act');
	    $(this).addClass('act');
	    })
	
	}
	*/
	
	exports.cont_ajax = function(){
	    $(function(){
			var _type_nid=$('input:radio[name="type_nid"]:checked'); 
			var dl_dis = _type_nid.parents('dl').css('display');
			if(dl_dis == 'none'){
				$('#mall_menu ul li dl').css({'display':'none'});
				_type_nid.parents('dl').css({'display':'block'});
			}else{
				_type_nid.parents('dl').css({'display':'none'});
			}
		})
	}
//积分商城的图片切换
exports.goods_tab=function(){
	require('superSlide');
	$(".dy_gallery").slide({ mainCell:".bd ul",effect:"leftLoop",autoPlay:true });
	$(".mall-bottom").slide({titCell:".menr ul",mainCell:".hd ul",autoPage:true,effect:"leftLoop",autoPlay:true,vis:4,scroll:1});
	
	}
	
	//积分商城首页的幻灯滚动 hsd
		exports.mbanner_slide = function(DivId,BtnId){
			  var divbtn = $('#'+BtnId);
			  var oLi = $('#'+DivId+' ul li');
			  var oLiLength = oLi.length;
			  for(var i=0;i<oLiLength;i++){
				var abtn = '<a href="javascript:void(0)" class=""></a>';
				divbtn.append(abtn);
			  }
			  var oDiv = $("#"+DivId);
			  var oUl = $('#'+DivId+' ul')
			  var aImg = $('#'+DivId+' ul li img');
			  var aA = $('#'+BtnId+' a');
			  var imgWidth = 980;  
			  var clesetInter,iNow = 0;      
			  oUl.css({'width':imgWidth+'px'});
			  aImg.eq(0).css({"display":"block"})
			  
			  aA.live('click',function(){
				   clearInterval(clesetInter);
				   aA.removeClass("active");
				   $(this).addClass("active");
				   iNow = aA.index($(this));
				   $("#"+DivId+" ul li img").css({"display":"none"});
				   $("#"+DivId+" ul li img").eq(iNow).stop().fadeIn(1000);
				   clesetInter = setInterval(torun,4000);
				  });
			 function torun(){
				iNow++
				if(iNow < oLiLength){aA.eq(iNow).trigger('click')}
				else{iNow = 0;aA.eq(iNow).trigger('click')}        
			 }
			 clesetInter = setInterval(torun,4000)          		 
	}

		exports.play = function(){
			var i=0; //图片标识
var img_num=$(".img_ul").children("li").length; //图片个数
$(".img_ul li").hide(); //初始化图片	
play();
$(function(){
	 $(".img_hd ul").css("width",($(".img_hd ul li").outerWidth(true))*img_num); //设置ul的长度
	 
	 $(".bottom_a").css("opacity",0.7);	//初始化底部a透明度
	 //$("#play").css("height",$("#play .img_ul").height());
	 if (!window.XMLHttpRequest) {//对ie6设置a的位置
	 $(".change_a").css("height",$(".change_a").parent().height());}
	 $(".change_a").focus( function() { this.blur(); } );
	 $(".bottom_a").hover(function(){//底部a经过事件
		 $(this).css("opacity",1);	
		 },function(){
		$(this).css("opacity",0.7);	 
			 });
	 $(".change_a").hover(function(){//箭头显示事件
		 $(this).children("span").show();
		 },function(){
		 $(this).children("span").hide();
			 });
	 $(".img_hd ul li").click(function(){
		 i=$(this).index();
		 play();
		 });
	 $(".prev_a").click(function(){
		 //i+=img_num;
		 i--;
		 //i=i%img_num;
		 i=(i<0?0:i);
		 play();
		 }); 
	 $(".next_a").click(function(){
		 i++;
		 //i=i%img_num;
		 i=(i>(img_num-1)?(img_num-1):i);
		 play();
		 }); 
	 }); 
function play(){//动画移动	
	var img=new Image(); //图片预加载
	img.onload=function(){img_load(img,$(".img_ul").children("li").eq(i).find("img"))};
	img.src=$(".img_ul").children("li").eq(i).find("img").attr("src");
	//$(".img_ul").children("li").eq(i).find("img").(img_load($(".img_ul").children("li").eq(i).find("img")));
	
	$(".img_hd ul").children("li").eq(i).addClass("on").siblings().removeClass("on");
	if(img_num>7){//大于7个的时候进行移动
		if(i<img_num-3){ //前3个
		$(".img_hd ul").animate({"marginLeft":(-($(".img_hd ul li").outerWidth()+4)*(i-3<0?0:(i-3)))});
		}
		else if(i>=img_num-3){//后3个
			$(".img_hd ul").animate({"marginLeft":(-($(".img_hd ul li").outerWidth()+4)*(img_num-7))});
			}
	}
	if (!window.XMLHttpRequest) {//对ie6设置a的位置
	$(".change_a").css("height",$(".change_a").parent().height());}
	}
function img_load(img_id,now_imgid){//大图片加载设置 （img_id 新建的img,now_imgid当前图片）
    
    if(img_id.width/img_id.height>1)
	{
		if(img_id.width >=$("#play").width()) $(now_imgid).width($("#play").width());
		}
	else {
		if(img_id.height>=500) $(now_imgid).height(500);
		}
		$(".img_ul").children("li").eq(i).show().siblings("li").hide(); //大小确定后进行显示
	}
function imgs_load(img_id){//小图片加载设置
	if(img_id.width >=$(".img_hd ul li").width()){img_id.width = 80};
	//if(img_id.height>=$(".img_hd ul li").height()) {img_id.height=$(".img_hd ul li").height();}
	}
	}
})