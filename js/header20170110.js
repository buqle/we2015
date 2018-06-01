$(function(){

	$('.navlist li:first').addClass('headna').addClass('headnc');
	$('.navlist li:gt(0)').addClass('headnb');
	$('.navlist li:last').css('margin-right','0');
	$('.navlist li').mouseover(function(){
		$(this).addClass('headnc').siblings().removeClass('headnc')
	});
	$('.navlist li:eq(2)').css({'width':'104px','text-indent':'8px'})
	//$('.navlist li:eq(2)').find('a').css({'background':'#ffd602','width':'100%','display':'inline-block'})

	function getUrlArgStr(){
		var url = window.location.pathname;
		var url2 = window.location.search;
		if (url.indexOf("invest") != -1) {
			$('.navlist li:eq(3)').addClass('headnc').siblings().removeClass('headnc')

		}else if(url.indexOf("rendition") != -1){
			$('.navlist li:eq(1)').addClass('headnc').siblings().removeClass('headnc')
		}else if(url.indexOf("reser") != -1){
			$('.navlist li:eq(2)').addClass('headnc').siblings().removeClass('headnc')
		}else if(url.indexOf("borrow") != -1){
			$('.navlist li:eq(4)').addClass('headnc').siblings().removeClass('headnc')
		}else if(url.indexOf("mobile") != -1){
			$('.navlist li:eq(5)').addClass('headnc').siblings().removeClass('headnc')
		}else if(url2.indexOf("q=login") != -1){
			$('.navlist li:eq(6)').addClass('headnc').siblings().removeClass('headnc')
		}else  if(url2.indexOf("q=login")!= -1 || url2.indexOf("?user")!= -1){
			$('.navlist li:eq(6)').addClass('headnc').siblings().removeClass('headnc')
		}
	}
	getUrlArgStr();

	$('.fl_contnew dl').hover(function(){
		$(this).find('dd').fadeIn(100);
	},function(){
		$(this).find('dd').fadeOut(100);
	});


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

					$("div[stt="+borrow_nid+"]").html('<p class="clearbs"><b>'+ day +'</b><b style="margin-right: 50px;">'+ hour +'</b><b>'+ minute +'</b><b>'+second+'</b></p>');
				} else {
					clearInterval(timer._times[borrow_nid]);
					//
				}
			}, 1000);
			this._times[borrow_nid] = timesID;
		}

	};
	$(function(){
		var nowTime=$('.zhou-banner').attr('nowtime');
		var start=$('.zhou-banner').attr('start');
		function getTime(){
			var time1=new Date(parseInt(nowTime)*1000);
			var time2=time1.getDate();
			return time2;
		}
		var time4=getTime();
		//实时
		function setFun(){
			$.http.get('/?user&q=get_share_ajax&alias=cele&methodname=gettendercount', {}, function(ret){
				if (ret.code == 0){
					var len1=ret.data.all.split('');

					var len2=ret.data.account.split('');
					for(var i=0;i<len1.length;i++){
						$('.all-left i').eq(i).text(len1[i]);
					};
					for(var i=0;i<len2.length;i++){
						$('.aount-ledt i').eq(i).text(len2[i])
					}
				}
			}, 'json');
		};
		var srtu=null;
		if(time4>9 && time4<13){
			$('.zhou-banner2').show();
		}else if(time4>=13&&time4<16) {
			$('.zhou-banner3').show();
			setFun()
			srtu=setInterval(function(){
				setFun()
			},60000);
		}
		if(start>nowTime){
			var time=new Number(start-nowTime)
			timer.start(time, $('.zhou-banner-a').attr('stt'));
		}




		function shake(o){
			var $panel = $("."+o);
			box_left = ($('.large_cashcont2').height() -  $panel.height()) /1;
			$panel.css({'top': box_left,'position':'absolute'});
			$panel.animate({top:box_left-(8)},550);
			$panel.animate({top:box_left+(8)},550);
		}

		var set=null;
		if(time4 > 9 &&time4<16){
			shake('z-year2');
			set= setInterval(function(){
				shake('z-year2');
				//console.log('21')
			},1000);
		}else {
			clearInterval(set)
		}
		$('.z-year2').click(function(){
			$('.z-year2').stop(true);
			clearInterval(set);
			$(this).animate({top:'59%'},550,function(){
				$(this).fadeOut(20);
				var box_left = ($('.large_cashcont2').height())/2;
				for(var i=1; 4>=i; i++){
					$('.z-year3').animate({top:box_left-(8)},60);
					$('.z-year3').animate({top:box_left+(8)},60);
				}
				setTimeout(function(){
					$('.z-year1').animate({top:'-300%'},1000);
					$('.z-year3').delay(90).animate({top:'-300%'},900,function(){
						$('#large_cashbgdx').fadeOut(20);
						$('#large_cashcont1dx').fadeOut(20);
						$('html, body').animate({scrollTop: 0}, 80);
					});
				},5000)
			});

		});




	});
	var hayden = getCookie('name');
	if(hayden == 'hayden'){
		$('#large_cashbgdx').remove();
		$('#large_cashcont1dx').remove();
	}
	var username=document.cookie.split(";")[0].split("=")[1];
	function setCookie(name,value){
		document.cookie = name + "="+ escape (value)
	}
	function getCookie(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}
	var nowTime=$('.zhou-banner').attr('nowtime');
	var date = new Date(parseInt(nowTime)).getTime();
	console.log(date)
	if(date > 1483977600 && date < 1484496000){

		$('.z-year2').click(function(){
			setCookie("name","hayden");
		})
	}else {
		$('#large_cashbgdx').remove();
		$('#large_cashcont1dx').remove();
	}

})