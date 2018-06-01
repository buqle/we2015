//窗体关闭事件
var clwf = function(name) {
	api.closeWin({
		name : 'win_' + name,
	});
	api.closeFrame({
		name : 'frm_' + name
	});
}
//文件是否存在
function readfile(path) {
	api.readFile({
		path : path
	}, function(ret, err) {
		if (ret.status) {
			return true;
		} else {
			return false;
		}
	});
}

//进行登录或注册
//0.代表普通打开，1代表用户中心窗口打开，2代表邀请打开，
var openlogin = function(stauts) {
	api.getPrefs({
		key : 'token'
	}, function(ret, err) {
		var v = ret.value;
		if (v == '') {
			api.openFrame({
				name : 'login',
				url : 'widget://html/common/login.html',
				bgColor : 'rgda(0,0,0,0)',
				rect : {
					x : 0,
					y : 0,
					w : 'auto',
					h : 'auto'
				},
				pageParam : {
					stauts : stauts,
				},
				animation : {
					type : "push", //动画类型（详见动画类型常量）
					subType : "from_top", //动画子类型（详见动画子类型常量）
					duration : 500
				}
			});
		} else {
			dialog.die();
			api.toast({
				msg : '您已经登录'
			});
		}
	});
}
//打开分享页面
var openshare = function(url) {
	api.openFrame({
		name : 'share',
		url : 'widget://html/common/share_rhd.html',
		bgColor : 'rgda(0,0,0,0)',
		rect : {
			x : 0,
			y : 0,
			w : 'auto',
			h : 'auto'
		},
		pageParam : {
			url : url,
		},
		animation : {
			type : "push", //动画类型（详见动画类型常量）
			subType : "from_top", //动画子类型（详见动画子类型常量）
			duration : 500
		}
	});
}
//打开红包页面
//var openred = function() {
//	api.openFrame({
//		name : 'red',
//		url : 'widget://html/common/red_rhd.html',
//		bgColor : 'rgda(0,0,0,0.2)',
//		rect : {
//			x : 0,
//			y : 0,
//			w : 'auto',
//			h : 'auto'
//		},
//		animation : {
//			type : "push", //动画类型（详见动画类型常量）
//			subType : "from_top", //动画子类型（详见动画子类型常量）
//			duration : 500
//		}
//	});
//}
//加载动画是否打开
var load = false;
//加载动画
var dialog = {
	init : function() {
		api.openFrame({
			name : 'loading',
			url : 'widget://html/common/loading.html',
			rect : {
				x : 0,
				y : 0,
				w : 'auto',
				h : 'auto'
			}
		});
		load = true;
	},
	die : function() {
		api.closeFrame({
			name : 'loading'
		});
		load = false;
	}
};
//打开网页窗口
var openweb = function(title, url) {
	api.openWin({
		name : 'win_webpage',
		url : 'widget://html/common/win_webpage.html',
		bounces : false,
		pageParam : {
			title : title,
			url : url
		},
		delay : 300,
		animation : {
			duration : 400
		}
	});
}
//进度条
var jindu = function(id, num) {
	var ColorArray = ['red', 'blue', 'green', 'yellow', 'purple'];
	var colorIndex = Math.floor(Math.random() * ColorArray.length);
	$('.progress-stripes').text('////////////////////////////////////////////////');
	function setSkin(skin) {
		$('.loader').attr('class', 'loader ' + skin);
	}

	setSkin(ColorArray[colorIndex]);
	$progress = $('#progress' + id);
	$percent = $('#percentage' + id);
	$progress.animate({
		width : num + '%'
	}, 1000, function() {
		$percent.text(num + '%');
	});
}
/**
 *AJAX封装
 */
var HOST_URL = 'http://www.ronghedai.com';

function ajaxRequest(url, method, param, callBack) {
	if (!param || param == '') {
		param = {};
	}
	api.ajax({
		url : 'http://www.ronghedai.com' + url,
		method : method,
		cache : true,
		timeout : 2000,
		data : {
			values : param
		}
	}, function(ret, err) {
		if (ret) {
			if (ret.code == '-1') {
				api.toast({
					msg : ret.msg
				});
				dialog.die();
				api.removePrefs({
					key : 'token'
				});
				api.removePrefs({
					key : 'username'
				});
				$api.rmStorage('rhdlock');
				api.refreshHeaderLoadDone();
				openlogin(1);
			} else {
				callBack(ret, err);
				//var num = Math.random(0, 10000);
				//var num = num * 1000;
				//if (num < 50) {
				//	openred();
				//}
			}
		} else {
			dialog.die();
			api.refreshHeaderLoadDone();
			api.toast({
				msg : err.msg
			});
		}
	});
}

//获取sesion
var sesionid;
function getsesion() {
	var url = '/dyapp/?user&q=indexinfo';
	var param = {
		type : 'session_id'
	};
	ajaxRequest(url, 'post', param, function(ret) {
		if (ret.code == 0) {
			sesionid = ret.data;
		}
	});
}