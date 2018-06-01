var banner_slide = function(DivId,BtnId){
	var divbtn = $('#'+BtnId);
	var oDiv = $("#"+DivId);
	var oLi = $('#'+DivId+' ul li');
	var oLiLength = oLi.length;
	var abtn='';
	for(var i=0;i<oLiLength;i++){
		if(i==0){
			abtn = '<a href="javascript:void(0)" class="active"></a>';
		}else{
			abtn = '<a href="javascript:void(0)" class=""></a>';
		}
		divbtn.append(abtn);
	}
	var oUl = $('#'+DivId+' ul')
	var aImg = $('#'+DivId+' ul li img')
	var aA = $('#'+BtnId+' a');
	var imgWidth = 1920;

	var clesetInter,iNow = 0;
	oUl.css({'width':imgWidth+'px'});
	aImg.eq(0).css({"display":"block"});
	var autoslide =false;
	function toResize(){
		var viewWidth = document.documentElement.clientWidth;
		if(viewWidth>1000)
		{
			for(var i=0;i<oLiLength;i++)
			{aImg.eq(i).css({"left":-(imgWidth - viewWidth)/2 + 'px'})}
		}
	}
	toResize();
	window.onresize = function(){toResize()}

	aA.live('click',function(){
		clearInterval(clesetInter);
		aA.removeClass("active");
		$(this).addClass("active");
		iNow = aA.index($(this));
		$("#"+DivId+" ul li img").css({"display":"none"});
		$("#"+DivId+" ul li img").eq(iNow).stop().fadeIn(1000);
		if(autoslide){
			clesetInter = setInterval(torun,4000);
		}
	});
	function torun(){
		iNow++
		if(iNow < oLiLength){aA.eq(iNow).trigger('click')}
		else{iNow = 0;aA.eq(iNow).trigger('click')}
	}
	oDiv.hover(function(){
		autoslide=false;
		clearInterval(clesetInter);
	},function(){
		autoslide=true;
		clesetInter = setInterval(torun,4000);
	}).trigger('mouseleave');
}
banner_slide('banner_slide','banner_btn');
window.timer = {
	_queue : [],
	_times : [],
	start:function(time, borrow_nid) {
		if (this._queue[borrow_nid] != undefined) return false;
		this._queue[borrow_nid] = 0;
		var timesID =  setInterval(function(){
			var getbackSecond = time - timer._queue[borrow_nid];
			if (getbackSecond >=0) {
				var day = Math.floor(getbackSecond / (60 * 60 * 24));
				var hour = Math.floor(getbackSecond / (60 * 60)) - (day * 24);
				var minute = Math.floor(getbackSecond / 60) - (day * 24 * 60) - (hour * 60);
				var second = Math.floor(getbackSecond) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
				timer._queue[borrow_nid]++;
				if (day < 10) day = "0" +day;
				if (hour < 10) hour = "0" + hour;
				if (minute < 10) minute = "0" + minute;
				if (second < 10) second = "0" + second;
				$('.on_dl dd').eq(borrow_nid).html('<b>'+ day +'</b>:<b>'+ hour +'</b>:<b>'+ minute +'</b>:<b>'+second+'</b>');
			} else {
				clearInterval(timer._times[borrow_nid]);
				//
			}
		}, 1000);
		this._times[borrow_nid] = timesID;
	}

};


$(function(){

	//是否签到
	if(user_id>0){
		function qianGet(){
			$.getJSON('/?user&m=integral/user/get_user_sgin',function(ret){
				if(ret.code==0){
					var list=ret.data.list;
					var num=new Number(ret.data.self_integral).toFixed(0)
					$('#qiandao-interg').text(num)
					var arr=[];
					for(var i in list){
						arr.push(list[i]);
					};
					// console.log(arr[0])
					if(arr[0]==0){
						$('.qiandao-pip').text('今日签到：'+ret.data.integral+'积分');
						$('#qiandao').attr('tergrl',ret.data.integral)
						$('#qiandao').text('签到')
					}else {
						$('.qiandao-pip').text('明日签到：'+ret.data.integral2+'积分');
						$('#qiandao').text('已签到');
						$('#qiandao-interg').text(num);
					}

				}else {
					jDialog.alert(ret.msg);
				}
			},'json');
		}
		qianGet()
	};


	//记录
	$.getJSON('/?user&q=public&type=get_public_integral_log',function(ret){
		if(ret.code==0){
			var html = '';
			var len = ret.data.list.length;
			for(var i=0; i<len; i++){
				html += '<p><span>'+ret.data.list[i].username+'</span><span  class="uu_mm">'+ret.data.list[i].integral+'</span><span>'+ret.data.list[i].remark+'</span></p>';
			}
			$('#marqueebox').html(html);
		}
		else {
			jDialog.alert(ret.msg);
		}
	},'json');

	$('#qiandao').click(function(){
		if(user_id>0&&trust_status==0) {
			jDialog.alert('开通上海银行即可签到');
			return false;
		}else if($('#qiandao').text()=='已签到'){
			jDialog.alert('已签到');
			return false;
		}else{
			$('#qiandao').text('正在签到');
			$.getJSON('/?user&m=integral/user/newsgin',function(ret){
				if(ret.code==0){
					$('#qiandao').text('已签到');
					qianGet()
				}else {
					$('#qiandao').text('已签到')
					jDialog.alert(ret.msg);
				}
			},'json');
		}

	});

	//签到记录
	function  getDte(year, month){
		var myDate = new Date(year,1,1);
		myDate.setMonth(month);
		var tempDate = myDate;
		myMonth = myDate.getMonth();
		$('#directionte1ida'). text(myDate.getFullYear() + '-' + parseInt(myDate.getMonth() + 1));
		tempDate.setDate(1);
		tempDate.setDate(-tempDate.getDay());
		curr_year = year;
		curr_month = month;
		var hTml='';
		for( var i=0;i<42;i++){
			tempDate.setDate(tempDate.getDate()+1);
			var yy=tempDate.getFullYear();
			var mm=parseInt(tempDate.getMonth()+1)<10 ?'0'+parseInt(tempDate.getMonth()+1):parseInt(tempDate.getMonth()+1);
			var dds=tempDate.getDate() < 10  ? '0'+ tempDate.getDate() : tempDate.getDate();

			var all=yy+'-'+mm+'-'+dds
			if (tempDate.getMonth() != myMonth) {
				hTml+='<li class="sssss" name="'+all+'">'+tempDate.getDate()+'</li>'
			} else {
				hTml+='<li  name="'+all+'">'+tempDate.getDate()+'</li>'
			}
		}
		var hTmlc=$("<div class='loading_now' style=' text-indent: 4em; line-height: 220px;width: 100%;padding-top: 50px;'>正在加载中,请耐心等待...</div>");
		$('.table_integ').html(hTmlc);
		$.getJSON('/?user&m=integral/user/get_user_sgin',function(ret){
			$('.table_integ').html(hTml);
			if(ret.code==0){
				var htm2='<p>您已签到<i>'+ret.data.serial+'</i>天，连续签到5天以上，每日再签到均可获</p><p>得10积分。明日签到可获<i>'+ret.data.integral2 +'</i>积分。</p>'
				$('.integral_boxcst-rc2').html(htm2);
				var obj=ret.data.list
				for(var i in obj){
					if(obj[i]==1){
						// console.log(obj[i])
						$("[name="+i+"]").addClass('qiandaoclass')
					}
				};
			}else {
				jDialog.alert(ret.msg);
			}
		},'json');

	}
	$('#qiandao-jlu').click(function(event){
		if(user_id>0){
			var myDate = new Date($('#directionte1ida').attr('now')*1000);
			getDte(myDate.getFullYear(), myDate.getMonth());
			event.stopPropagation();
			$('.integral_boxcside').show();
			return false;
		}else {
			diyou.use('dialogs',function(dia){dia.dialog('用户登录','/?user&q=login&type=ajax')});
			return false;
		}
	});
	$('.integral_boxcside').click(function(event){
		event.stopPropagation();
		$('.integral_boxcside').show();
		return false
	})
	$(document).click(function(){
		$('.integral_boxcside').hide();
	});

	//秒杀
	var nowTime=$('.dynamicscont').find('a').attr('nowtime');
	function getTime(){
		var time1=new Date(parseInt(nowTime)*1000);
		var time2=time1.getHours();
		var time3=time1.getMinutes() < 10  ? '0'+ time1.getMinutes() : time1.getMinutes();
		return time2.toString()+time3.toString();
	}
	var time4=getTime();
	//console.log(time4)
	var arrm=['930','1430','0000'];
	var battime=''
	if(new Number(time4)>=new Number(arrm[1])){
		battime='2'
	}else  if(new Number(time4)>=new Number(arrm[0])&&new Number(time4)<new Number(arrm[1])){
		battime='1'
	}else if(new Number(time4)>=new Number(arrm[2])&&new Number(time4)<new Number(arrm[0])){
		battime='4'
	}
	getmiao(battime);
	function getmiao(batch){
		var htccc=$("<div class='loading_now' style=' line-height: 124px; padding-top: 56px;border: 1px solid #927dbe;'>正在加载中,请耐心等待...</div>");
		$('.dynamicsc_side').html(htccc);

		$.getJSON('/?user&q=public&type=get_seckil_integral_item_list&page=1&epage=2&batch='+batch+'',function(ret){
			if(ret.code == 0){
				var surelen = ret.data.list.length;
				var sure = '';
				var sure1='';
				for (var i =0 ; i < surelen; i++) {
					sure +='<dl class="on_dl">';
					sure+='<dt>';
					sure +='<h4>'+ret.data.list[i].name+'</h4>';
					sure+='<p>积分兑换：<i>'+ret.data.list[i].old_integral+'</i></p>';
					sure+='<p>秒杀积分：'+ret.data.list[i].integral+'</p>';
					sure+='</dt>';
					var stringTime = ret.data.list[i].start;
					var stringTime2 =stringTime.replace(/-/,"/").replace(/-/, '/').replace(/-/, '/');
					var timestamp2 = new Date(stringTime2)/1000;
					if(timestamp2>ret.data.list[i].now){
						sure+='<dd time1="'+ret.data.list[i].now+'" time2="'+timestamp2+'" class="ddclodd">'
						sure+='</dd>'
					}else {
						sure+='<dd>'
						if(ret.data.list[i].status==2){
							sure+='<span>已结束</span>'
						}else {
							sure+='<a href="/malldie/a' + ret.data.list[i].id + '.html?'+ret.data.list[i].id+'" target="_blank" id="miao-dies">秒杀中</a>'
						}
						sure+='</dd>'
					}
					sure+='<h5></h5>'
					sure+='</dl>';
					sure+='<dl  class="on_dl2">'
					sure+='<dt><img src="'+ret.data.list[i].image+'" alt=""></dt>'
					sure+='</dl>'

				}
				$('.dynamicsc_side').html(sure);

				sure1+='<p style="font-size: 20px;color: #52acf7;text-align: center;line-height: 180px;border: 1px solid #927dbe;">此类型暂无产品，敬请期待！</p>'
				if(surelen==0){
					$('.dynamicsc_side').html(sure1);
				};
				$('.on_dl dd').each(function(index){
					if($(this).attr('time2')>$(this).attr('time1')){
						timer.start($(this).attr('time2')-$(this).attr('time1'),index);
					}
				})


			}else{
				jDialog.alert(ret.msg);
			}
		});
	};


	$('#marqueebox p:odd').css({'float':'right'})



	$('#btn_login1').each(function(){
		$(this).click(function(){
			if(user_id==0){
				diyou.use('dialogs',function(dia){dia.dialog('用户登录','/?user&q=login&type=ajax')});
				return false;
			}
		})
	});

	//列表
	setTimeout(function(){
		getUrl(5,'#list_puto4','','');//卡券
		getUrl('','#list_puto1','','1');//优选产品
	},1000)
	setTimeout(function(){
		getUrl('','#list_puto2','1','');//混合
		getUrl(6,'#list_puto3','','');//精英座驾
	},2000);


	function getUrl(type,callback,is_index,optimization){
		var htccc=$("<div class='loading_now' style=' text-indent: 4em; height: 388px; line-height: 300px; width: 100%;'>正在加载中,请耐心等待...</div>");
		$(callback).html(htccc);
		$.getJSON('/?user&q=public&type=get_integral_item_list&item_type='+type+'&epage=3&is_index='+is_index+'&optimization='+optimization+'',function(ret){
			if(ret.code == 0){
				var surelen = ret.data.list.length;
				var sure = '';
				var sure1='';
				for (var i =0 ; i < surelen; i++) {
					sure +='<dl opt="'+ret.data.list[i].optimization+'">';
					sure+='<dt class="subcont_warp">';
					sure +='<div class="subcont">';
					sure+='<img src="'+ret.data.list[i].image+'" alt="">';
					sure+='</div>'
					sure+='</dt>';
					sure+='<dd>'
					sure+='<h4>'+ret.data.list[i].name+'</h4>';
					sure+='<p>市场价：￥'+ret.data.list[i].account+'</p>';
					sure+='<div class="dd_lefton clearff"><i>仅剩：'+ret.data.list[i].number+'</i>积分：'+ret.data.list[i].integral+'</div>';
					sure+='<a class="dd_btnhu" href="/mallist/a' + ret.data.list[i].id + '.html?'+ret.data.list[i].id+'" target="_blank">立即兑换</a>';
					sure+='</dd>'
					sure+='</dl>';

				}
				$(callback).html(sure);
				sure1+='<p style="font-size: 20px;color: #52acf7;text-align: center;line-height: 300px;">此类型暂无产品，敬请期待！</p>'
				if(surelen==0){
					$(callback).html(sure1);
				};
				$('.lefton dl:last').css({'border-right':'none'})
				$('.lefton dl dd').find('.dd_btnhu').each(function(){
					$(this).unbind();
					$(this).click(function(){
						if(user_id==0){
							diyou.use('dialogs',function(dia){dia.dialog('用户登录','/?user&q=login&type=ajax')});
							return false;
						}else if(user_id>0&&trust_status==0) {
							jDialog.alert('请开通上海银行存管');
							return false;
						}
					})
				})

			}else{
				jDialog.alert(ret.msg);
			}
		});
	};

	function startmarquee(lh,speed,delay,domID) {
		var p=false;
		var t;
		var o=document.getElementById(domID);
		// o.innerHTML=o.innerHTML;
		o.style.marginTop=0;
		o.onmouseover=function(){p=true;}
		o.onmouseout=function(){p=false;}
		function start(){
			t=setInterval(scrolling,speed);
			if(!p) o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
		}
		function scrolling(){
			if(parseInt(o.style.marginTop)%lh!=0){
				o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
				if(Math.abs(parseInt(o.style.marginTop))>=o.scrollHeight) o.style.marginTop=0;
			}else{
				clearInterval(t);
				setTimeout(start,delay);
			}
		}
		setTimeout(start,delay);
	}
	startmarquee(54,10,800,'marqueebox');


});