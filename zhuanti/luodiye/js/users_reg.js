define(function (require, exports, module) {
    //Register js
    exports.register = function (form_id) {
        $("#privacy").live('click', function () {
            var title = $(this).html();
            diyou.use('dialogs', function (dy) {
                dy.dialog(title, '/privacy/index.html', '', '')
            });
        })
        require('validate');
        var validator = $('#' + form_id).validate({
            errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            },
            errorElement: "em",
            success: 'valid',
            rules: {
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    phone: true
                },
                username: {
                    required: true,
                    //rangelength: [4, 16],
                    checklenght: [4, 16],
                    noAllNumber: true,
                    noSpecialStr: true
                },
                password: {
                    required: true,
                    noAllNumber: true,
                    noAllStr: true,
                    rangelength: [6, 15]
                },
                confirm_password: {
                    required: true,
                    equalTo: "#password"
                },
                valicode: {
                    required: true,
                    rangelength: [4, 4],
                    remote: {
                        url: '/?plugins&q=check_imgcode',
                        type: "post",
                        dataType: 'json',
                        data: {
                            valicode: function () {
                                return $("#vericode").val();
                            }
                        }
                    }
                },
                invite_username: {
                    rangelength: [4, 16],
                    noAllNumber: true,
                    noSpecialStr: true
                },
                service: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: "邮箱不能为空",
                    email: "邮箱格式错误"
                },
                phone: {
                    required: "手机号码不能为空",
                    phone: "手机格式错误"
                },
                username: {
                    required: "用户名不能为空",
                    //rangelength: "请输入4-16位的中文、英文、数字"
                    //2015-7-20 Forest
                    checklenght: "请输入4-16位的中文、英文、数字"
                },
                password: {
                    required: "密码不能为空",
                    rangelength: "请输入6-15位的英文、数字组合"
                },
                confirm_password: {
                    required: "确认密码不能为空",
                    equalTo: "两次密码不一致"
                },
                valicode: {
                    required: "请填写验证码",
                    rangelength: "验证码错误",
                    remote: "验证码错误"
                },
                invite_username: {
                    rangelength: "推荐人不存在",
                    noAllNumber: "推荐人不存在",
                    noSpecialStr: "推荐人不存在"
                },
                service: {
                    required: "请同意我们的条款"
                }
            },
            submitHandler: function (form) {

                if ($('.phone_bgColor').is(":hidden")) {

                    $('.phone_num').text($('#phone').val());
                    $.post('/?user&q=reg&type=send_code',{
                        phone:$('#phone').val(),
                        valicode: $('#vericode').val()
                    },function(ret){
                        if (ret.code == '0') {
                            $('.phone_bgColor').show();
                        } else {
                            alert(ret.msg);
                            $('.phone_bgColor').hide();
                        }
                    }, 'json');
                    return false;
                }

                /*diyou.use('index', function (dy) {
                    dy.setBtndisable('reg_sub', '注册中...', '#666666', true);
                });*/
                var string;
                var pass_word = $('#password').val();
                var confirm_password = $('#confirm_password').val();

                $("#code_txt").html("");
                if ($("#vericode1").val() == "") {
                    $("#code_txt").html("请输入验证码");
                    return false;
                }else {
                    require("encypt");
                    string = encypt();

                    $(form).ajaxSubmit({
                        url: "/?user&q=reg",
                        type: "post",
                        dataType: 'json',
                        data: {password: string, confirm_password: string},
                        success: function (results) {
                            if (results.code == 'success') {
                                alert('注册成功！！');
                                window.location.href = '/?user#users/home';
                            } else {
                                $('#password').val(pass_word);
                                $('#confirm_password').val(confirm_password);
                                if (results.msg == undefined) {
                                    alert(results[0].msg);
                                } else {
                                    alert(results.msg);
                                }

                                return false;
                            }

                        }
                    });

                }

                return false;
            }
        });
        $('#password').bind('input propertychange', function () {
            diyou.use('users_check', function (c) {
                c._check_pwd_stg('password');
            });
        });
        require('cookie');
        if ($.cookie("judge") == "back") {
            $("#username").val($.cookie("username"));
            if ($.cookie("referrer")) {
                $("#invite_username").val($.cookie("referrer"));
            }
            var aIndex = $.cookie("aIndex") || 0;
        }
        exports.radio_sel(aIndex);
        exports.show_reg();
    };

    exports.radio_sel = function (aIndex) {
        var radioA = $(".radio_select a");
        if (aIndex) {
            radioA.eq(aIndex).addClass("selected").siblings().removeClass("selected");
            radioA.eq(aIndex).children('input')
                    .attr({"checked": true, "disabled": false})
                    .end().siblings().children('input')
                    .attr({"checked": false, "disabled": true});
        }

        radioA.click(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            $(this).children('input')
                    .attr({"checked": true, "disabled": false})
                    .end().siblings().children('input')
                    .attr({"checked": false, "disabled": true});
        });

    };

    exports.show_reg = function () {
        var style = 0;
        $(".tab_info").click(function () {
            if (!style) {
                $(this).html("使用邮箱注册");
                $("#reg_txt").html("手机信息认证");
                $("#em_style").hide();
                $("#em_style input[type=text]").val("");
                $("#ph_style").show();
                $("#reg_type").val("phone");
                style = 1;
            }
            else {
                $(this).html("使用手机注册");
                $("#reg_txt").html("邮箱信息认证");
                $("#em_style").show();
                $("#ph_style").hide();
                $("#ph_style input[type=text]").val("");
                $("#reg_type").val("email");

                style = 0;
            }
        });
        if ($.cookie("judge") == "back") {
            $("a.tab_info").trigger('click');
        }
    }

    exports.get_phone_code = function (id) {
        $('#' + id).bind('click', function () {
            var phone_val = $('#phone').val();
            var _url = '/?user&q=reg&type=send_code';
            $.ajax({
                type: 'post',
                url: _url,
                data: 'phone=' + $('#phone').val(),
                dataType: 'text',
                success: function (msg) {
                    var results = eval('(' + msg + ')');
                    if (results.code == 'success') {
                        exports._get_vericode(id);
                    } else {
                        diyou.use('dialogs', function (dia) {
                            dia.error(results.msg, '')
                        });
                    }
                    },
                error: function () {
                    diyou.use('dialogs', function (dia) {
                        dia.error('对不起发生错误了！', '')
                    });
                }

            });

        });
    };

    exports._get_vericode = function (get_verty_btn) {
        var o = $('#' + get_verty_btn);
        var wait = 60;
        var timeID = setInterval(function () {
            if (wait == -1) {
                clearInterval(timeID);
                o.removeClass('get_verty_dis');
                o.val("获取验证码");
                o.removeAttr("disabled");
            }
            else {
                o.val(wait + "秒后重新发送");
                wait--;
                o.attr("disabled", true);
                o.addClass('get_verty_dis');
            }
        }, 1000);
    };


    exports.reg_phone_form = function (form_id) {
        $('#' + form_id).submit(function () {

            $("#code_txt").html("");
            if ($("#vericode1").val() == "") {
                $("#code_txt").html("请输入验证码");
                return false;
            } else {
                require('submitform');
                $(this).ajaxSubmit({
                    url: "/?user&q=reg&type=phone_active",
                    success: function (data, status) {
                        var results = eval('(' + data + ')');
                        if (results.code == 'success') {
                            var url = window.location.search;
                            var loc= url.substring(url.lastIndexOf('=')+1, url.length);
                            var username = $('#username').val();
                            $.getJSON('/?return&module=users&q=count&reg_type='+loc+'&username='+username,{},function(){});
                            $("#code_txt").html('<script type="text/javascript" src="http://aw.kejet.net/t?p=nX&c=Bx"></script>');

                            $('.phone_bgColor').css({'display': 'none'});
                            setTimeout(function(){
                                //window.location.href="http://www.ronghedai.com";
                            },3000);
                            alert('恭喜你，注册成功！');
                            //window.location.href="http://www.ronghedai.com";
                        } else {
                            $("#code_txt").html(results.msg);
                        }
                    }
                });
            }

            return false;
        });

    };
});