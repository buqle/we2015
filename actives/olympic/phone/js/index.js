var isApp = false;
function getToken(){
    if (isApp) {
        api.getPrefs({
            key: 'token'
        }, function(ret, err){
            v = ret.value;
        })
    } else {
        v = localStorage.getItem('token');
    }
}
getToken();
apiready = function(){ //app
    isApp = true;
}
function callLogin(){
    if(isApp == true){
        api.closeWin();
    }else {
        window.location.href = 'http://www.ronghedai.com/weixin/home.html#tender';
    }
}
if(v ==null || v==''){
    $(".denglu1").addClass('dp');
    $(".heji").addClass('dp');
    $(".denglu").removeClass('dp');
}
function denglu(){
    window.location.href="/weixin/home.html#login";
}
//个人获奖记录
$.ajax({
    url:'/weixin/?user&q=get_share_ajax&alias=olympic&methodname=get_self&token='+v,
    dataType:'json',
    type:'get',
    success:function(ret){
        if(ret.code==0){
            var list = ret.data.length;
            var html='',
                jeTotal= new Number(0),
                jlTotal=new Number(0);
            for(var i =0;i<list;i++){
                html+='<p><span>'+ret.data[i].name+'</span><span style="width:18%;">'+ret.data[i].check+'月标</span><span style="width:22%;">'+ret.data[i].addtime+'</span><span>'+ret.data[i].money+'</span><span>'+ret.data[i].reward+'</span></p>';
                console.log(ret.data[i].money);
                jeTotal += Number(ret.data[i].money);
                jlTotal +=Number(Number(ret.data[i].reward).toFixed(2));
            }
            console.log(jlTotal);
            $("#wdjl").html(html);
            $(".je-total").text(jeTotal+"元");
            $(".jl-total").text(jlTotal+"元");

        }else{
            if (ret.msg != '登录超时') {
                alert(ret.msg);
            }
        }
    }

});


