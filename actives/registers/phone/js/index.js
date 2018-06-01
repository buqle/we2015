/*! layer mobile-v1.7 弹层组件移动版 License LGPL http://layer.layui.com/mobile By 贤心 */
;!function(a){"use strict";var b=document,c="querySelectorAll",d="getElementsByClassName",e=function(a){return b[c](a)},f={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:!0},g={extend:function(a){var b=JSON.parse(JSON.stringify(f));for(var c in a)b[c]=a[c];return b},timer:{},end:{}};g.touch=function(a,b){var c;return/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent)?(a.addEventListener("touchmove",function(){c=!0},!1),void a.addEventListener("touchend",function(a){a.preventDefault(),c||b.call(this,a),c=!1},!1)):a.addEventListener("click",function(a){b.call(this,a)},!1)};var h=0,i=["layermbox"],j=function(a){var b=this;b.config=g.extend(a),b.view()};j.prototype.view=function(){var a=this,c=a.config,f=b.createElement("div");a.id=f.id=i[0]+h,f.setAttribute("class",i[0]+" "+i[0]+(c.type||0)),f.setAttribute("index",h);var g=function(){var a="object"==typeof c.title;return c.title?'<h3 style="'+(a?c.title[1]:"")+'">'+(a?c.title[0]:c.title)+'</h3><button class="layermend"></button>':""}(),j=function(){var a,b=(c.btn||[]).length;return 0!==b&&c.btn?(a='<span type="1">'+c.btn[0]+"</span>",2===b&&(a='<span type="0">'+c.btn[1]+"</span>"+a),'<div class="layermbtn">'+a+"</div>"):""}();if(c.fixed||(c.top=c.hasOwnProperty("top")?c.top:100,c.style=c.style||"",c.style+=" top:"+(b.body.scrollTop+c.top)+"px"),2===c.type&&(c.content='<i></i><i class="laymloadtwo"></i><i></i>'),f.innerHTML=(c.shade?"<div "+("string"==typeof c.shade?'style="'+c.shade+'"':"")+' class="laymshade"></div>':"")+'<div class="layermmain" '+(c.fixed?"":'style="position:static;"')+'><div class="section"><div class="layermchild '+(c.className?c.className:"")+" "+(c.type||c.shade?"":"layermborder ")+(c.anim?"layermanim":"")+'" '+(c.style?'style="'+c.style+'"':"")+">"+g+'<div class="layermcont">'+c.content+"</div>"+j+"</div></div></div>",!c.type||2===c.type){var k=b[d](i[0]+c.type),l=k.length;l>=1&&layer.close(k[0].getAttribute("index"))}document.body.appendChild(f);var m=a.elem=e("#"+a.id)[0];c.success&&c.success(m),a.index=h++,a.action(c,m)},j.prototype.action=function(a,b){var c=this;if(a.time&&(g.timer[c.index]=setTimeout(function(){layer.close(c.index)},1e3*a.time)),a.title){var e=b[d]("layermend")[0],f=function(){a.cancel&&a.cancel(),layer.close(c.index)};g.touch(e,f)}var h=function(){var b=this.getAttribute("type");0==b?(a.no&&a.no(),layer.close(c.index)):a.yes?a.yes(c.index):layer.close(c.index)};if(a.btn)for(var i=b[d]("layermbtn")[0].children,j=i.length,k=0;j>k;k++)g.touch(i[k],h);if(a.shade&&a.shadeClose){var l=b[d]("laymshade")[0];g.touch(l,function(){layer.close(c.index,a.end)})}a.end&&(g.end[c.index]=a.end)},a.layer={v:"1.7",index:h,open:function(a){var b=new j(a||{});return b.index},close:function(a){var c=e("#"+i[0]+a)[0];c&&(c.innerHTML="",b.body.removeChild(c),clearTimeout(g.timer[a]),delete g.timer[a],"function"==typeof g.end[a]&&g.end[a](),delete g.end[a])},closeAll:function(){for(var a=b[d](i[0]),c=0,e=a.length;e>c;c++)layer.close(0|a[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var a=document.scripts,c=a[a.length-1],d=c.src,e=d.substring(0,d.lastIndexOf("/")+1);c.getAttribute("merge")||document.head.appendChild(function(){var a=b.createElement("link");return a.href=e+"need/layer.css",a.type="text/css",a.rel="styleSheet",a.id="layermcss",a}())}()}(window);

//刷新图形验证码
$('#valimg').on("tap",function(){
    $(this).attr('src','/weixin/?user&q=valicode');
});


//获取验证码
function checkSendTime(time) {
    if (time <= 1) {
        $(".dxyzm").html("获取验证码").removeClass("disabled");

    } else {
        time = time -1;
        $(".dxyzm").html(time + "秒");
        setTimeout(function() {
            checkSendTime(time);
        },1000);
    }
}

//发送验证码
var hqyzm =0;
var display;
var telCode;
function getphoneCode (){
    hqyzm++;
    if(hqyzm>5){
        $('.www').show();
        telCode =  $('#yzm').val();
    }
   display = $('.www').css('display');
    if(telCode==''){
        layer.closeAll();
        layer.open({
            content: '图形验证码不能为空',
            btn:["我知道了"]
        });
    }else{
        var tel = $('#tel').val();
        if((!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(tel))){
            layer.closeAll();
            layer.open({
                content: '您填写有误，请重新输入',
                btn:["我知道了"]

            });
            return false;
        }else{
            $.ajax({
                url:'/weixin/?user&q=reg&type=sendRegCode&sendpassword='+1,
                dataType: 'json',
                data: {
                    phone: tel
                    //valicode:telCode
                },
                type: 'get',
                success: function (res){
                    if(res.code==0){
                        layer.closeAll();
                        layer.open({
                            content: '验证码发送成功，注意查收',
                            btn:["我知道了"]
                        });
                        checkSendTime(60);
                    }else{
                        layer.closeAll();
                        layer.open({
                            content: res.msg,
                            btn:["我知道了"]
                        });
                    }
                }
            })


        }
    }
}

//url转换
function getUrl(){
    var name,value;
    var url = window.location.href;
    var num=url.indexOf("?");
    url = url.substr(num+1);
    var arr= url.split("&");

    for(var i=0;i < arr.length;i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}
var Request = new getUrl();
var inviteUserid = Request.invite_userid;

//立即注册
var ljzc =0;
function zhuce(){
    ljzc++;
    if(display=='block'){
        telCode =  $('#yzm').val();
    }else{
        if(ljzc>5){
            $('.www').show();
            telCode =  $('#yzm').val();
        }
    }

    if(telCode==''){
        layer.closeAll();
        layer.open({
            content: '图形验证码不能为空',
            btn:["我知道了"]
        });
    }else{
        var tel = $('#tel').val();
        var passwordid = $('#password').val();
        setMaxDigits(262);
        key = new RSAKeyPair("10001", "10001", "C7E5B44A799824123BB40C56B7A0984C962C2BF110B671985E76003AEBF49A3E3E8EA9F8E986C81F01B314CE8496DADDA5D0172FC07A4083DE3C512B8CF36D16B23812421F7D21D81AE1C9512F7C3BA4B3EBBA68971ED7ECE4D25546BC7F48CF4D5DF527CAFF38EAE0E7E1A98D47AA3692853D14D2C2246111943618C67BCEFC3DA6E4D847283530F3C035C68E6B11019DE3E3C42B40EBCB47094196DFEDF76D366CEC433F8144B06356106510F28D9AB3619D680E7CADDE543B6EF762C0144F44CAF5C042BFC33EDD59E6CF0360279DA568F0DC0AEA529E2D20A6C59EEF0BBB8C24BC74B9D7FCDAF1B39F90124D8F0D27AD6D8802654676AC772268BFA825D7", 2048);
        localStorage.setItem('key',JSON.stringify(key));
        var password1= btoa(encryptedString(key, $('#password1').val(), RSAAPP.PKCS1Padding, RSAAPP.RawEncoding));
        //var password2= btoa(encryptedString(key, $('#password2').val(), RSAAPP.PKCS1Padding, RSAAPP.RawEncoding));
        $.ajax({
            url:"/weixin/?user&q=reg&type=weixinReg",
            data:{
                phone:tel,
                phonecode:passwordid,
                invite_userid:inviteUserid,
                password:password1,
                confirm_password:password1
                //type: 'app'
            },
            dataType:'json',
            type: 'post',
            success:function(ret){
                if($('#password1').val().length<6){
                    layer.closeAll();
                    layer.open({
                        content: '密码不能少于6位',
                        btn:["我知道了"]
                    });
                }else{
                    if(ret.code==0){
                        layer.closeAll();
                        layer.open({
                            content: '恭喜您，注册成功',
                            btn:["我知道了"],
                            yes: function(e){
                                layer.closeAll();
                                window.location.href = '/weixin/home.html#tender';
                            }
                        });
                    }else{
                        layer.closeAll();
                        layer.open({
                            content:ret.msg,
                            btn:["我知道了"]
                        });
                    }
                }

            }

        })
    }


}
