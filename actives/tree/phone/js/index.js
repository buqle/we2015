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
            rhdapi.getPost({       //http://newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=tree&methodname=get_self_reward
                "query_site":"user",
                "q":"get_share_ajax",
                "alias":"tree",
                "methodname":"get_self_reward"
            },function(ret) {
                ret = ret.data;
                if(ret.code==0){
                    $('.tree20').show();
                    $('#text3').text(ret.username);
                    $('#text4').text(ret.total.toFixed(2));
                    $('#tree1 .treesss').eq(ret.level).show().siblings().hide();
                    treeTalking();

                }else if(ret.code==-1){
                    alert('登录超时');
                    $('.tree20').hide();
                    $('.tree11').css('top','3rem');
                    noLoginTalking();
                }

            },'json');

            //我的记录
            $('.tree20-1').on('tap',function(){
                rhdapi.getPost({       //http://newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=tree&methodname=get_self_reward
                    "query_site":"user",
                    "q":"get_share_ajax",
                    "alias":"tree",
                    "methodname":"get_self_reward"
                },function(ret){
                    ret = ret.data;
                    var treeHtml ='',tenderAll=0;
                    if(ret.code == 0){
                        tenderAll = Number(parseInt(ret.data[3].tender))+Number(parseInt(ret.data[6].tender))+Number(parseInt(ret.data[12].tender));
                        treeHtml += '<p class="tree16-2">\
                        <span class="tree15-3"><span style="width:98%" class="tree-bb">3月标</span></span>\
                        <span class="tree15-33"><span class="tree-bb" style="width: 98%;">'+ret.data[3].times+'</span></span>\
                        <span class="tree15-4"><span class="tree-bb">'+ret.data[3].tender+'</span></span>\
                        <span class="tree15-4 tree-bb">'+ret.data[3].reward+'</span>\
                        </p>';

                        treeHtml += '<p class="tree16-2">\
                        <span class="tree15-3"><span style="width:98%" class="tree-bb">6月标</span></span>\
                        <span class="tree15-33"><span class="tree-bb" style="width: 98%;">'+ret.data[6].times+'</span></span>\
                        <span class="tree15-4"><span class="tree-bb">'+ret.data[6].tender+'</span></span>\
                        <span class="tree15-4 tree-bb">'+ret.data[6].reward+'</span>\
                        </p>';

                        treeHtml += '<p class="tree16-2">\
                        <span class="tree15-3"><span style="width:98%" class="tree-bb">12月标</span></span>\
                        <span class="tree15-33"><span class="tree-bb" style="width: 98%;">'+ret.data[12].times+'</span></span>\
                        <span class="tree15-4"><span class="tree-bb">'+ret.data[12].tender+'</span></span>\
                        <span class="tree15-4 tree-bb">'+ret.data[12].reward+'</span>\
                        </p>';

                        ownReward();
                        $('#tree16-2').html(treeHtml);
                        $('#text1').text(tenderAll.toFixed(2));
                        $('#text2').text(ret.total.toFixed(2));
                    }else if(ret.code == -1){
                        if(confirm('登录超时，是否去登录!')){
                            rhdapi.login();
                        }else{

                        }
                    }else{
                        alert(ret.msg);
                    }
                },'json');
            });

        }

        if(islogin == 0) {
           noLoginTalking();
        }
    });
    //未登录对话框
    function noLoginTalking(){
        $('.treeTalk').text('主人，点我抢创收红利！');
        $('.tree13-2').addClass('fudong');
        $('.treeUp').on('tap',function(){
            login();
        });
        $('#tree1 .treesss').eq(0).show().siblings().hide();
    }
    //登录时的对话框
    function treeTalking(){
        var index=0;
        var treeTalk = ['主人，你想看我长大后的样子吗？','主人，我的果实可多了！','主人，你猜我开的花是什么颜色的？','我在这里等你哦'];
        $('.treeTalk').text(treeTalk[0]);
        setInterval(function()
        {
            if(index>3){index=0}
            $('.treeTalk').text(treeTalk[index]);
            index++;
        },30000);
        $('.tree11').css('top','4.2rem');
        $('.tree13-2').css('top','0rem');
        //马上长大
        $('.treeUp').on('tap',function(){rhdapi.gotoTender()});
    }

    //个人记录弹窗
    function ownReward(){
        $('body').append(
            '<div class="tanchuang"></div>'+
            '<div class="box1">'+
            '<div class="close">X</div>'+
            '<div class="tree15">'+
            '<div class="tree15-1">'+
            '<img src="/dyweb/dythemes/rhd/actives/tree/phone/images/13.png">'+
            '<div class="tree15-2">'+
            '<span class="tree15-3"><span style="width:98%" class="tree-b">月标种类</span></span>'+
            '<span class="tree15-33"><span class="tree-b" style="width:98%;">投资笔数</span></span>'+
            '<span class="tree15-4"><span class="tree-b">投资金额/元</span></span>'+
            '<span class="tree15-4 tree-b">创收红利/元</span>'+
            '</div>'+
            '<div class="tree16" style="height:6.5rem;">'+
            '<div class="tree16-1" id="tree16-2" style="height:3.9rem;overflow-y:auto;">'+

            '</div>'+
            '<p class="tree16-2" style="color:#fff;">'+
            '<span class="tree15-3" style="width:100%"><span class="tree-b" style="width:100%;">累计投资总额:<i id="text1">1000000</i>元</span></span>'+
            '</p>'+
            '<p class="tree16-2">'+
            '<span class="tree15-3" style="width:100%"><span class="tree-bb" style="width:100%;">累计创收红利:<i id="text2">1000000</i>元</span></span>'+
            '</p>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'
        )
    }

    //实时创收记录
    setTimeout(function(){
        rhdapi.getPost({            //http://newtrust.ronghedai.com/weixin/?user&q=get_share_ajax&alias=tree&methodname=get_newly
            "query_site":"user",
            "q":"get_share_ajax",
            "alias":"tree",
            "methodname":"get_newly",
            "token":""
        },function(ret){
            ret = ret.data;
            if(ret.code == 0){
                var len = ret.data.length;
                var tree16Html ='';
                for(var i =0;i<len;i++){
                    tree16Html += '<p class="tree16-2">'+
                    '<span class="tree15-3 jianju"><span style="width:98%" class="tree-bb">'+ret.data[i].username+'</span></span>'+
                    '<span class="tree15-4 jianju"><span class="tree-bb">'+ret.data[i].money+'</span></span>'+
                    '<span class="tree15-4 jianju"><span class="tree-bb">'+ret.data[i].reward+'</span></span>'+
                    '<span class="tree15-33 tree-bb jianju">'+ret.data[i].addtime+'</span>'+
                    '</p>';
                }
                if(len >0){
                    $('#slide1').html(tree16Html);
                    if(len >4){
                        scrollUp();
                    }
                }else{
                    $('#slide1').append(tree16Html);
                    scrollUp();
                }

            }

        },'json');
    },500);

    //滚动
    function scrollUp(){
        var speed=80;
        var slide=document.getElementById("slide");
        var slide2=document.getElementById("slide2");
        var slide1=document.getElementById("slide1");
        slide2.innerHTML=slide1.innerHTML;
        function Marquee(){
            if(slide2.offsetTop-slide.scrollTop<=1)
                slide.scrollTop-=slide1.offsetHeight;
            else{
                slide.scrollTop++
            }
        }

        var MyMar=setInterval(Marquee,speed);
    }


    //是否去登录
    function login(){
        if(confirm('您还未登录，请先登录')){
            rhdapi.login();
        }else{

        }
    }

    //关闭弹窗
    $('.tcK').live('tap',showShare);
    $('.close').live('tap',showShare);
    function showShare(){
        $('.tanchuang').remove();
        $('.box').remove();
        $('.box1').remove();
        localStorage.setItem('num','1');
    }

    //点击添加树摆动动画
    setInterval(function(){
        if($('.tress').hasClass('baidong')){
            $('.tress').removeClass("baidong");
        }
    },5000);

    $('.Trees').on('tap',function(){
        $(this).next().addClass('baidong');
    });


    $(function(){
        if(localStorage.getItem('num')=='1'){
            return;
        }else{
            $('body').append(
                '<div class="tanchuang"></div>'+
                '<div class="box">'+
                '<div class="tcK"></div>'+
                '<img class="tcText" src="/dyweb/dythemes/rhd/actives/tree/phone/images/12.png">'+
                '<img class="tcImg" src="/dyweb/dythemes/rhd/actives/tree/phone/images/10.png">'+
                '</div>'
            );
        }

    });






};


