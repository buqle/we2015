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
        if (islogin == '0') {
            $('.denglu').show();
            $('.denglu1').hide();
        }else{
            //我的记录
            $('.denglu1').show();
            $('.denglu').hide();
            rhdapi.getPost(    //weixin/?user&q=get_share_ajax&alias=autact&methodname=get_myreward
                {
                    "query_site":"user",
                    "q":"get_share_ajax",
                    "alias":"point",
                    "methodname":"get_myreward"
                },
                function(ret){
                    ret = ret.data;
                    if(ret.code == 0){
                        var ciation = '';
                        var len = ret.data.length;
                        ciation+='<p><span class="a16">三月标</span><span class="a17">'+Math.round(ret.data[3].tender)+'</span><span class="a17">'+ret.data[3].reward+'</span></p>';
                        ciation+='<p><span class="a16">六月标</span><span class="a17">'+Math.round(ret.data[6].tender)+'</span><span class="a17">'+ret.data[6].reward+'</span></p>';
                        ciation+='<p><span class="a16">十二月标</span><span class="a17">'+Math.round(ret.data[12].tender)+'</span><span class="a17">'+ret.data[12].reward+'</span></p>';
                        $("#ciation").html(ciation);
                        $('.a14').text(ret.data.total.tender);
                        $('.a15').text(ret.data.total.reward);
                    }else {
                        alert(ret.msg);
                    }

                });

        }
    });

    //按钮切换
    $('.a3').on('tap',function(){
        $(this).addClass('current').siblings().removeClass('current');
        changeContext(this.id);
    });

    //切换索引
    function changeContext(obj) {
        switch(obj){
            case "a1":
                changeIndex(0);
                break;
            case "a2":
                changeIndex(1);
                break;
            case "a3":
                changeIndex(2);
                break;
        }
    }

    //根据索引切换样式
    function changeIndex(index){
        for(var i=0; i<$('.section4').length;i++){
            if($('.section4')[i] != $('.section4')[index]){
                $('.section4')[i].className='section4';
            }else{
                $('.section4')[i].className='section4 active';
            }
        }
    }

    //登陆

    $('.denglu').on('tap',function(){
        rhdapi.login();
    });

    //立即投资
    $('.a13').on('tap',function(){
       rhdapi.gotoTender();
    });




    function getday(time) {
        var date = new Date();
        date.setTime(time * 1000);
        Y = date.getFullYear() + '/';
        M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1) + '/';
        D = date.getDate()+'   ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = (date.getSeconds() + 1 < 10 ? '0' + (date.getSeconds() + 1) : date.getSeconds() + 1);
        time = h + m + s;
        return time;
    }

};
