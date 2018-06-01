var isread = 0;

apiready = function () {
    rhdapi.checklogin = function (callback) {
        api.getPrefs({
            key: 'token'
        }, function(ret, err){
            var retJ = {islogin:0};
            if (ret.value != null && ret.value !=''){
                retJ.islogin = 1;
            }
            callback && callback(retJ);
        })
    };
    rhdapi.login = function( callback ){
        openlogin(1);
    };
    rhdapi.gotoTender= function( callback) {
        api.closeWin();
    };
    var _post = rhdapi.getPost;
    rhdapi.getPost= function(data, callback){
        api.getPrefs({
            key: 'token'
        }, function(ret, err){
            var token =  "";
            if (ret.value != null && ret.value !=''){
                token = ret.value ;
            }
            data.token = token;
            _post(data, callback);
        })
    };
};


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
        if(islogin == 1){
            $('.dl1').show();
            rhdapi.getPost(    //  /weixin/?user&q=set_red&type=get_tandard_user
                {
                    "query_site":"user",
                    "q":"set_red",
                    "type":"get_tandard_user"
                },
                function(ret){
                    ret = ret.data;

                    if(ret.code == 0){

                        var tenders = '';

                        for(var i = 0, len = ret.list.length; i < len; i ++){
                            tenders += '<p><span>'+ret.list[i].name+'</span><span>'+ret.list[i].all_money+'</span><span>'+ret.list[i].reward+'</span><span>'+ret.list[i].addtime+'</span></p>';

                        }
                        $('#tenders').html(tenders);
                    }else {

                    }

                });

        }else{
            $('.dl1').hide();
        }

   });
    //登录
    $(".tz").on('tap',function(){
        rhdapi.login(function (r) {
            if (r.islogin == '1') {
                $('.dl1').show();
            } else {
                $('.dl1').hide();
            }
        });

    });

};

$(function(){
    var date = new Date().getTime()/1000;
    if(date>1483200000){
        $('#section1').show();
    }else {
        $('#section2').show();
    }
});
