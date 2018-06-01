var isread = 0;
var click = false;
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
    });

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
                "alias":"autact",
                "methodname":"get_myreward"
            },
            function(ret){
                ret = ret.data;
                if(ret.code == 0){
                    var ciation = '';
                    var len = ret.data.length;
                    for(var i=0;i<len;i++){
                        ciation+='<p><span>'+ret.data[i].name+'</span><span>'+ret.data[i].tender+'</span><span>'+getday(ret.data[i].addtime)+'</span></p>';
                    }
                    $("#ciation").html(ciation);
                }else {
                    alert(ret.msg);
                }

            });

    }

    //登陆

    $('.denglu').on('tap',function(){
        rhdapi.login();
    });

    //立即投资
    $('.bb').on('tap',function(){
       dianji('.bb');
    });
    $('.bb1').on('tap',function(){
        dianji('.bb1');
    });

    function dianji(classname){
        if($(classname).html().indexOf('倒计时')>-1){
            alert('该标还未开启！')
        }else if($(classname).html().indexOf('立即投标')>-1){
            rhdapi.gotoTender();
        }else if($(classname).attr('class').indexOf('jieshu')>-1){
            alert("投资已经结束！");
        }
    }




    //20点
    $('#listN2').on('tap',function(){
        $(this).addClass('current');
        $('#listN1').removeClass('current');
        $('#list2').show();
        $('#list1').hide();
        daijishi(1478865600,'.bb1');
    });
    //15点
    $('#listN1').on('tap',function(){
        $(this).addClass('current');
        $('#listN2').removeClass('current');
        $('#list1').show();
        $('#list2').hide();
    });

    //标的状态
    rhdapi.getPost(    //weixin/?user&q=get_share_ajax&alias=autact&methodname=borrow_status
        {
            "query_site":"user",
            "q":"get_share_ajax",
            "alias":"autact",
            "methodname":"borrow_status"
        },
        function(ret){
            ret = ret.data;
            if(ret.code == 0){
                console.log(ret.data);
                for(var i=0;i<ret.data.length;i++){
                    if (ret.data[i].borrow_account_scale === "100.00"){
                        $("[data-name="+ret.data[i].name+"]").addClass('jieshu');
                        $("[data-name="+ret.data[i].name+"]").html('已结束');
                    }
                }
            }else {

            }
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


    //秒转换成时、分、秒
    function formatSeconds(value) {
        var theTime = parseInt(value);// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        if(theTime > 60) {
            theTime1 = parseInt(theTime/60);
            theTime = parseInt(theTime%60);
            if(theTime1 > 60) {
                theTime2 = parseInt(theTime1/60);
                theTime1 = parseInt(theTime1%60);
            }
        }
        var result = ""+parseInt(theTime);
        if(theTime1 > 0) {
            result = ""+parseInt(theTime1)+":"+result;
        }
        if(theTime2 > 0) {
            result = ""+parseInt(theTime2)+":"+result;
        }
        return result;
    }

    //倒计时
    $(function(){
        daijishi(1478847600,'.bb');
    });

    function daijishi(start,className){
        var date = (new Date().getTime()/1000);
        var time = start - date;
        var times = setInterval(function(){
            if(time <= 0){
                clearInterval(times);
                $(className).html('立即投资');
            }else{
                time--;
                $(className).html("倒计时"+formatSeconds(time));
            }
        },1000)
    }

};
