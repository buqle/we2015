$(function(){

	$('.navlist li:first').addClass('headna').addClass('headnc');
	$('.navlist li:gt(0)').addClass('headnb');
	$('.navlist li:last').css('margin-right','0');
	$('.navlist li').mouseover(function(){
		$(this).addClass('headnc').siblings().removeClass('headnc')
	});
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




})