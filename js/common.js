$(document).ready(init);

function init(ev) {
	var fns = [
	  {start: 0, end: 580, init: init1, enter: enter1},
		{start: 580, end: 1138, init: init2, enter: enter2},
		{start: 1138, end: 1570, init: init3, enter: enter3},
		{start: 1570, end: 2128, init: init4, enter: enter4},
		{start: 2128, end: 2686, init: init5, enter: enter5},
		{start: 2686, end: 3152, init: init6, enter: enter6}
  ];
	
	player(fns);
	addEvent(fns);
}

function initialize(fn) {
	player(fn);
}

function addEvent(fn) {
	$(window).on('scroll', fnScroll);
	$('.u_btn.totop').on('click', function () {
		fnToTop(fn);
	});
	
  $('.m_nav .msite').on('click', function () {
    $(this).find('.mpop').fadeToggle();
  });
}

function fnScroll() {
	var st = $(window).scrollTop();
	var $totop = $('.u_btn.totop');
	
	if (st < 2800) $totop.addClass('on');
	else $totop.removeClass('on');
}

function fnToTop(fn) {
	var st = $(window).scrollTop();
	var $totop = $('.u_btn.totop');
	var n = 0;
	
	if ($totop.hasClass('on')) {
		for (var i = 0, len = fn.length; i < len; i++) {
			if ((fn[i].start < st) && (fn[i].end > st) || (st == fn[i].start)) {
				n = i;
				break;
			}
		}
		
		n++;
			
		if (fn[n]) $('body, html').animate({scrollTop: fn[n].start}, 1000);
	} else {
		$('body, html').animate({scrollTop: 0}, 1000);
	}
}

function player(fn) {
	$(window).on('scroll', wheel);
	
	wheel();
	
	function wheel() {
		var st = $(window).scrollTop();
		var vh = document.documentElement.clientHeight;

		for (var i = 0; i < fn.length; i++) {
			if ((fn[i].start > st + vh) || (fn[i].end < st)) {
				fn[i].status = false;
			} else {
				if (fn[i].status) continue;
				else {
					fn[i].init && fn[i].init();
					if ((fn[i].start < Math.round(st + vh / 2))) {
						fn[i].enter && fn[i].enter();
					  fn[i].status = true;
					}
				}
			}
		}
	}
}

function init1() {
	$('.m_sen1').each(function(index, element) {
		var _this = this;
		
		// 初始化
		~function () {
			$('.g_hd').css({'top': '-100%'});
			
      $(_this).find('*').stop(true);
			$(_this).find('.tt,.tt1, .ct, .ct1, .bg .r1, .bg .r2, .bg .r3').hide();
			$(_this).find('.ct').css({'margin-top': '20px', 'opacity': 0});
			$(_this).find('.phone').css({'bottom': '110px'}); 
		}();

		
	});
}

function enter1(cb) {
	// 动画队列
	$('.m_sen1').each(function(index, element) {
		var _this = this;
		var times = 500;
		
    var _animList = [
		  anim1,
			anim2,
			anim3,
			anim4,
			anim5,
			anim6,
			mobile,
			cb
		];
		
		function anim1() {
			$('.g_hd').delay(0).animate({'top': '0'}, times);
			$(this).find('.bg').fadeIn(800, _take);
		}
		
		function anim2() {
			$(this).find('.bg .r1').delay(0).fadeIn(1000, _take);
		}
		
		function anim3() {
			$(this).find('.bg .r2').delay(0).fadeIn(1000, _take);
		}
		
		function anim4() {
			$(this).find('.bg .r3').delay(0).fadeIn(1000, _take);
		}
		
		function anim5() {
			$(this).find('.tt').delay(0).fadeIn(1000, _take);
		}
		function anim7() {
			$(this).find('.tt1').delay(0).fadeIn(1000, _take);
		}
		function anim6() {
			$(this).find('.ct').delay(0).show().animate({'margin-top': 0, 'opacity': 1}, 1000, _take);
		}
		function anim8() {
			$(this).find('.ct1').delay(0).show().animate({'margin-top': 0, 'opacity': 1}, 1000, _take);
		}
		function mobile() {
			var $phone = $(_this).find('.phone');
			var $box = $phone.find('.box');
			var $img = $box.find('img');
			
			var _list = [
			  function () {
					$phone.animate({'bottom': '110px'}, 1000, _take2);
				},
			  function () {
					$img.delay(2000).animate({'top': -($img.height() - $box.height()) + 'px'}, 8000, _take2);
				},
				function () {
					$img.delay(2000).animate({'top': 0}, 8000, _take);
				}
			];
			
			$(_this).queue('mobileanim', _list); 
    
		  var _take2 = function () {
        $(_this).dequeue('mobileanim'); 
      };
		
      _take2();
		}
		
		$(this).queue('animList', _animList); 
    
		var _take = function () {
      $(_this).dequeue('animList'); 
    };
		
    _take(); 

    // 停止动画
    //$('.m-cover').queue('animList', []);
		//$('.m-cover').clearQueue('slideList');
  });
}

function init2() {
	$('.m_sen2').each(function(index, element) {
		var _this = this;
		
		// 初始化
		~function () {
			$(_this).find('*').stop(true);
			$(_this).find('.sen .phone').css({'right': '100px'});
			$(_this).find('.sen .pbg').css({'right': '0'});
			//$(_this).find('.sen .ct, .sen .tt, .sen .btn').css({'margin-left': '500%', 'opacity': 0});
		}();
	});
}

function enter2(cb) {
	// 动画队列
	$('.m_sen2').each(function(index, element) {
		var _this = this;
		var times = 500;
		
		var _animList = [
		  anim1,
			cb
		];
		
		function anim1() {
			$(this).find('.sen .phone').delay(0).animate({'right': 0}, 1000);
			$(this).find('.sen .pbg').delay(0).animate({'right': '232px'}, 1000, _take);
		}
		
		$(this).queue('animList', _animList); 
    
		var _take = function () {
      $(_this).dequeue('animList'); 
    };
		
    _take();
	});
}

function init3() {
	$('.m_sen8').each(function(index, element) {
		var _this = this;
		
		// 初始化
		~function () {
			$(_this).find('*').stop(true);
			$(_this).find('.sen .phone1').css({'left': '100px'});
			$(_this).find('.sen .pbg1').css({'left': '0px'});
			//$(_this).find('.sen .ct, .sen .tt, .sen .btn').css({'margin-left': '500%', 'opacity': 0});
		}();
	});
}
function enter3(cb) {
	// 动画队列
	$('.m_sen8').each(function(index, element) {
		var _this = this;
		var times = 500;
		
		var _animList = [
		  anim1,
			cb
		];
		
		function anim1() {
			$(this).find('.sen .phone1').delay(0).animate({'left': 0}, 1000);
			$(this).find('.sen .pbg1').delay(0).animate({'left': '232px'}, 1000, _take);
		}
		
		$(this).queue('animList', _animList); 
    
		var _take = function () {
      $(_this).dequeue('animList'); 
    };
		
    _take();
	});
}

function init4() {
	$('.m_sen9').each(function(index, element) {
		var _this = this;
		
		// 初始化
		~function () {
			$(_this).find('*').stop(true);
			$(_this).find('.sen .phone').css({'right': '100px'});
			$(_this).find('.sen .pbg').css({'right': '0'});
			//$(_this).find('.sen .ct, .sen .tt, .sen .btn').css({'margin-left': '500%', 'opacity': 0});
		}();
	});
}

function enter4(cb) {
	// 动画队列
	$('.m_sen9').each(function(index, element) {
		var _this = this;
		var times = 500;
		
		var _animList = [
		  anim1,
			cb
		];
		
		function anim1() {
			$(this).find('.sen .phone').delay(0).animate({'right': 0}, 1000);
			$(this).find('.sen .pbg').delay(0).animate({'right': '232px'}, 1000, _take);
		}
		
		$(this).queue('animList', _animList); 
    
		var _take = function () {
      $(_this).dequeue('animList'); 
    };
		
    _take();
	});
}

function init5() {
	$('.m_sen10').each(function(index, element) {
		var _this = this;
		
		// 初始化
		~function () {
			$(_this).find('*').stop(true);
			$(_this).find('.sen .phone1').css({'left': '100px'});
			$(_this).find('.sen .pbg3').css({'left': '0px'});
			//$(_this).find('.sen .ct, .sen .tt, .sen .btn').css({'margin-left': '500%', 'opacity': 0});
		}();
	});
}
function enter5(cb) {
	// 动画队列
	$('.m_sen10').each(function(index, element) {
		var _this = this;
		var times = 500;
		
		var _animList = [
		  anim1,
			cb
		];
		
		function anim1() {
			$(this).find('.sen .phone1').delay(0).animate({'left': 0}, 1000);
			$(this).find('.sen .pbg3').delay(0).animate({'left': '253px'}, 1000, _take);
		}
		
		$(this).queue('animList', _animList); 
    
		var _take = function () {
      $(_this).dequeue('animList'); 
    };
		
    _take();
	});
}

function init6() {
	$('.m_sen5').each(function(index, element) {
		var _this = this;

		// 初始化
		~function () {
			$(_this).find('*').stop(true);
			$(_this).find('.tt, .ct').css({'margin-top': '20px', 'opacity': 0});
			$(_this).find('.u_btn').css({'margin-bottom': '0px', 'opacity': 0});
		}();
	});
}

function enter6(cb) {
	$('.m_sen5').each(function(index, element) {
		var _this = this;
		var times = 500;
		
		var _animList = [
			anim1,
			cb
		];
		
		function anim1() {
			$(this).find('.sen .tt').delay(500).animate({'margin-top': 0, 'opacity': 1}, 800);
			$(this).find('.sen .ct').delay(1000).animate({'margin-top': 0, 'opacity': 1}, 800);
			$(this).find('.sen .tt1').delay(500).animate({'margin-top': 0, 'opacity': 1}, 800);
			$(this).find('.sen .ct1').delay(1000).animate({'margin-top': 0, 'opacity': 1}, 800);
			$(this).find('.u_btn').delay(1500).animate({'margin-bottom': '-29px', 'opacity': 1}, {easing: 'easeOutElastic', duration: 1000, complete: _take});
		}
		
		$(this).queue('animList', _animList); 
    
		var _take = function () {
      $(_this).dequeue('animList'); 
    };
		
    _take();
	});
}

function rnd(under, over) {
  switch (arguments.length) {
    case  1: return parseInt(Math.random() * under + 1);
    case  2: return parseInt(Math.random() * (over - under + 1) + under);
    default: return; 
  }
}

function rndSort() {
	return Math.random() > .5 ? (-1) : 1;
}

function maxZ(obj) {
	var elms = (obj || document).getElementsByTagName('*'), z = 0, arr = [];
	
	for (var i = 0, len = elms.length; i < len; i++) {
		var z = parseInt(setStyle(elms[i], 'zIndex'));
		arr.push(isNaN(z) ? 0 : z);
	}
	
	return Math.max.apply(null, arr);
}