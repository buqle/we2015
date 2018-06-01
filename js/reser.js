$(function(){
	//预约详情
	var hashFun = $('#directionte1ida').attr('now');
	function GetDateStr(nS,AddDayCount) {
		var dd = new Date(parseInt(nS) * 1000);
		dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
		return dd.getDate();
	}


	function getLocalTime(nS) {
		var dd=new Date(parseInt(nS) * 1000);
		var y = dd.getFullYear();
		var m = dd.getMonth()+1;//获取当前月份的日期
		return y+"年"+m+"月";
	}


	$('.dire_tit i:eq(0)').text(GetDateStr(hashFun,0));
	$('.dire_tit i:eq(1)').text(GetDateStr(hashFun,1));
	$('.dire_tit span').text(getLocalTime(hashFun));
	$('.dire_tit i,.dire_ccont1 i').click(function(){
		$(this).addClass('classtt').siblings().removeClass('classtt');
		$('.dire_ccont2 p span,.ppt_yuyue span').text($('.dire_tit span').text())
		$('.dire_ccont2 p i:eq(0),.ppt_yuyue i:eq(0)').text($('.dire_tit').find('.classtt').text());
		$('.dire_ccont2 p b,.ppt_yuyue b').text($('.dire_ccont1').find('.classtt').text());
		var dd=$('.dire_ccont2 p span').text();
		var ee=$('.dire_ccont2 p i:eq(0)').text();
		var ff=$('.dire_ccont2 p b').text();
		var dds = dd.replace(/年/,"/").replace(/月/, '/');
		var gg=dds + ee +'/'+ ff ;
		var dates = new Date(gg)/1000;

		var dateme = new Date()/1000;
		// var minutes = dateme.getMinutes();
		if(dateme>dates && ff!=''){
			getTimes();
			return false;
		}

	});
	function getTimes(){
		$('.dire_ccont1 i').removeClass('classtt');
		jDialog.alert('预约时间已过')
	};
	var cc=['4','5','6'];
	var ccs=['1','2','3'];
	$('.dire_tit i:eq(1)').click(function(){
		for(var i=0;i<3;i++){
			$('.dire_ccont1 i').eq(i).attr('times',cc[i])
		};

	});
	$('.dire_tit i:eq(0)').click(function(){
		for(var i=0;i<3;i++){
			$('.dire_ccont1 i').eq(i).attr('times',ccs[i])
		};

	});

	//预约
	$('#rechargebtnids').click(function(){
		$('.directionte1_cbg').hide();
	})
	$('#rechargebtnid').click(function(){
		var jd=jDialog.alert('正在加载,请稍等');
		var tender_time=$('.dire_ccont1').find('.classtt').attr('times');
		if($('.dire_tit i').hasClass('classtt') && $('.dire_ccont1 i').hasClass('classtt')){
			$.getJSON('/?user&m=borrow/add_appointment/new&borrow_nid='+borrow_nid+'&tender_time='+tender_time+'',function(ret){
				if(ret.code==0){
					jd.close();
					var dialog = jDialog.dialog({
						title : '温馨提示',
						content : $("#directionte3id").html(),
						height:300,
						width:568

					});
					$('.directionte1_cbg').show();
					getUrlArgStr1();

				}else {
					jDialog.alert(ret.msg);
				}
			},'json');
		}else {
			jd.close();
			jDialog.alert('请选择您预约的开标时间');
		}


	});

	//取消预约

	function getUrlArgStr(){
		var url = window.location.search;
		if (url!='') {
			getUrlArgStr1()

		}
	}
	getUrlArgStr();

	function getUrlArgStr1(){
		var url = window.location.search;
		//if (url!='') {
		$('.loading_now').show();
		$('.reserva_side1sc').remove();
		$.getJSON('/?user&m=borrow/add_appointment/get_appointment&borrow_nid='+borrow_nid+'',function(ret){
			if(ret.code==0){
				$('.loading_now').remove();
				$('#reserva_side1id').show();
				$('.reserva_side1sc').remove();
				$('.directionte1_cbg').append('<p>您已选择过该标的开标时间！</p>')
			}
		});
		$.getJSON('/?user&q=public&type=get_appointment_list&limit=3&borrow_nid='+borrow_nid+'',function(ret){
			if(ret.code==0){
				var surelen = ret.data.list.length;
				for (var i =0 ; i < surelen; i++) {
					$('#reserva_side1id p span').text(ret.data.list[i].tendertime)
				}
			}
		});
		//完全取消预约
		$('#rechargebtnidss').click(function(){
			var dialog = jDialog.dialog({
				title : '温馨提示',
				content : $("#directionte3ids").html(),
				height:300,
				width:568

			});
			$('.btnbtncont span').click(function(){
				dialog.close();
			});
			$('.btnbtncont #foubtn1').click(function(){
				if($(this).hasClass('sujiectsbtn')){
					return false;
				};
				$(this).addClass('sujiectsbtn');
				$.getJSON('/?user&m=borrow/add_appointment/unappointment&borrow_nid='+borrow_nid+'',function(ret){
					if(ret.code==0){
						dialog.close();
						var dialogs = jDialog.dialog({
							title : '温馨提示',
							content : $("#directionte3ids2").html(),
							height:300,
							width:568

						});
						setTimeout(function(){
							window.location.href='/reser/index.html';
						},1100)

					}else {
						jDialog.alert(ret.msg)
					}
				});
			});
		});

		//}
	}



})



//预约列表
$(function(){

	getPost(9,2,6,'.reservacont2c')
	function getPost(limit,region, final,callback ){
		var htccc=$("<div class='loading_now' style='text-indent: 4em;'>正在加载中,请耐心等待...</div>");
		$(callback).html(htccc);
		$.getJSON('/?user&q=public&type=get_appointment_list&limit='+limit+'&region='+region+'&final='+final+'',function(ret){
			//callback && callback(ret);
			if(ret.code == 0){
				var surelen = ret.data.list.length;
				var sure = '';
				var sure1='';
				for (var i =0 ; i < surelen; i++) {
					if(ret.data.list[i].appointment=='已预约'){
						sure += '<dl class="ddborder">';
					}else {
						sure += '<dl id="cdldl">';
					}
					sure += '<dt><i class="iconfont iconfontcl2">&#xe617;</i>' + ret.data.list[i].name + '</dt>';
					sure += '<dd>';
					sure += '<div class="dd_titser">';
					sure += '年化率：<h4>'+(ret.data.list[i].borrow_apr)+'%</h4>';
					sure += '</div>';
					sure += '<div class="dd_contser1 clearbs">';
					sure += '<div class="dd_contl">';
					sure += '借款金额：<p><i>' + ret.data.list[i].account + '</i>元</p>';
					sure += '</div>';
					sure += '<div  class="dd_contr">';
					sure += '借款期限：<p><i>' + ret.data.list[i].borrow_period + '</i>个月</p>';
					sure += '</div>';
					sure+='</div>';
					if(ret.data.list[i].appointment=='预约中'){
						sure+='<div class="dd_contser2" id="dd_contser2is"><a href="/reser/a' + ret.data.list[i].borrow_nid + '.html"  borind="'+ret.data.list[i].borrow_nid+'">' + ret.data.list[i].appointment + '</a></div>';
					}else {
						sure+='<div class="dd_contser2" id="dd_contser2is"><a href="javascript:void(0);" borind="'+ret.data.list[i].borrow_nid+'" namesa="'+ret.data.list[i].username+'">' + ret.data.list[i].appointment + '</a></div>';
					}


					sure+='</dd>';
					sure+='</dl>';

				}
				$(callback).html(sure);
				sure1+='<p style="font-size: 20px;color: #52acf7;text-align: center;line-height: 200px;">此类型暂无产品，敬请期待！</p>'
				if(surelen==0){
					$(callback).html(sure1);
				}
				$('#cdldl .dd_contser2 a').each(function(){
					$(this).click(function(){
						if(user_id==0){
							diyou.use('dialogs',function(dia){dia.dialog('用户登录','/?user&q=login&type=ajax')});
							return false;
						}else if(trust_status==0) {
							jDialog.alert('请开通上海银行存管');
							return false;
						}
					});
				});


				$('.ddborder .dd_contser2 a').each(function(){
					$(this).click(function(){
						if(user_id==0){
							diyou.use('dialogs',function(dia){dia.dialog('用户登录','/?user&q=login&type=ajax')});
							return false;
						}
						if ($(this).attr("href") != 'javascript:void(0);'){
							return false;
						}
						var borrow_nid=$(this).attr('borind');
						var namesa=$(this).attr('namesa');
						var time_now=$(this).attr('time_now');
						$.getJSON('/?user&m=borrow/add_appointment/get_appointment&borrow_nid='+borrow_nid+'',function(ret){
							if(ret.code!=0){
								var dialog = jDialog.dialog({
									title : '温馨提示',
									content : $(".roomm_content").html(),
									height:260,
									width:568

								});
								return false;
							}else {
								//$(this).attr("href",'/reser/a' + borrow_nid + '.html');
								location.href = '/reser/a' + borrow_nid + '.html?'+namesa+'';
							}
						});
					});
				})




			}else{
				//alert(ret.msg);
			}
		});
	};


});
