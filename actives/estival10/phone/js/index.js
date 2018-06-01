var isread = 0;
var click = false;
ready = function(){
    if (isread == 1) {
        return false;
    }
    isread = 1;

    var islogin = 0;
    if (typeof api === 'object') {

    }
    rhdapi.checklogin(function(s){
        islogin = s.islogin;
        if(islogin==1){
            $('.newyear10').on('tap',function(){
                //我的记录

                rhdapi.getPost({   //http://newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=estival10&methodname=get_myreward
                    "query_site":"user",
                    "q":"get_share_ajax",
                    "alias":"estival10",
                    "methodname":"get_myreward"
                },function(ret){
                    ret = ret.data;
                    if(ret.code==0){
                        $('body').append(
                            '<div class="tanchaung"></div>'+
                            '<div class="box">' +
                            '<img class="newyear14" src="/dyweb/dythemes/rhd/actives/estival10/phone/images/ny18_03.png">'+
                            '<img class="newyear20" src="/dyweb/dythemes/rhd/actives/estival10/phone/images/close.png">'+
                            '<img class="newyear12" src="/dyweb/dythemes/rhd/actives/estival10/phone/images/ny17_02.png">'+
                            '<div class="newyear3">'+
                            '<p class="newyear44"><span class="newyear5" style="line-height:2rem;">标的种类</span><span class="newyear5">当前投资<br/>笔数/笔</span><span class="newyear6">当前累计<br/>投资金额/元</span><span class="newyear6">当前可得<br/>现金奖励/元</span></p>'+
                            '<div class="newyear88">'+

                            '</div>'+
                            '<div>'+
                            '<p class="clear newyear19">累计获得奖金:<i class="clear money">0</i>元</p>'+
                            '</div>'
                        );
                        var newyear10 = '';
                            newyear10 +='<p><span class="newyear5">3月标</span><span class="newyear5">'+ret.data[3].check+'</span><span class="newyear6">'+ret.data[3].tender+'</span><span class="newyear6">'+ret.data[3].reward+'</span></p>';
                            newyear10 +='<p><span class="newyear5">6月标</span><span class="newyear5">'+ret.data[6].check+'</span><span class="newyear6">'+ret.data[6].tender+'</span><span class="newyear6">'+ret.data[6].reward+'</span></p>';
                            newyear10 +='<p><span class="newyear5">12月标</span><span class="newyear5">'+ret.data[12].check+'</span><span class="newyear6">'+ret.data[12].tender+'</span><span class="newyear6">'+ret.data[12].reward+'</span></p>';
                        $('.newyear88').html(newyear10);

                        $('.money').html(ret.data.total);

                    }else if(ret.code==-1){
                        alert('登录超时！');
                        rhdapi.login();
                    }
                },'json');
            })
        }else {
            $('.newyear10').on('tap',function(){
                if(confirm('您还没有登录，现在去登录')){
                    rhdapi.login();
                }
            })
        }
    });


    //实时榜单
    rhdapi.getPost({   //http://newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=estival10&methodname=get_tops
        "query_site":"user",
        "q":"get_share_ajax",
        "alias":"estival10",
        "methodname":"get_tops",
        "token":''
    },function(ret){
        ret = ret.data;
        if(ret.code==0){
            var newyear8 = '',len = ret.data.length;
            for(var i =0;i<len;i++){
                newyear8 +='<p><span class="newyear5">'+ret.data[i].username+'</span><span class="newyear6">'+ret.data[i].account+'</span><span class="newyear5">'+ret.data[i].borrow_period+'</span><span class="newyear6">'+ret.data[i].addtime2+'</span></p>';
            }
            $('.newyear8').html(newyear8);

            var H = 0;
            var aa = setInterval(function(){
                if(len >5){
                    if(H*20>=$('.newyear8').height()){
                        $('.newyear8').css('marginTop','0rem');
                        $('.newyear8').css({'transition':'margin-top 0.1s','-o-transition':'margin-top 0.1s','-webkit-transition':'margin-top 0.1s','-moz-transition':'margin-top 0.1s'});
                        H=0;
                    }else{
                        $('.newyear8').css({'transition':'margin-top 0.5s','-o-transition':'margin-top 0.5s','-webkit-transition':'margin-top 0.5s','-moz-transition':'margin-top 0.5s'});
                        $('.newyear8').css('marginTop','-'+H+'rem');
                        H+=1.2;

                    }
                }

            },1000);

        }
    },'json');

    //立即投资
    $('.newyear101').on('tap',function(){
        rhdapi.gotoTender();
    });






    //关闭弹窗
    $('.newyear20').live('tap',showShare);
    function showShare(){
        $('.tanchaung').remove();
        $('.box').remove();
    }



};
