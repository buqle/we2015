define(function(require, exports, module) {
    exports.approve = function() {
        var code = $('#code').val();
        if (code != '') {
            if (code == 100) {
                diyou.use('dialogs', function(dia) {
                    dia.dialog('邮箱认证', '/?user&m=trust/approve&type=ok')
                });
                return;
            } else if (code == 0 || code < 100) {
                diyou.use('dialogs', function(dia) {
                    dia.dialog('邮箱认证', '/?user&m=trust/approve&type=overtime&email=' + $('#email').val())
                });
                return;
            }
        }
        $.post('/?user&m=trust/approve', {action: 'action'}, function(result) {
            if (result.email_status == 1) {
                diyou.use('dialogs', function(dia) {
                    dia.dialog('邮箱认证', '/?user&m=trust/approve&type=email')
                });
                return;
            }
            if (result.realname_status == 1) {
                diyou.use('dialogs', function(dia) {
                    dia.dialog('实名认证', '/?user&m=trust/approve&type=realname')
                });
                return;
            }
            if (result.phone_status == 1) {
                diyou.use('dialogs', function(dia) {
                    dia.dialog('手机认证', '/?user&m=trust/approve&type=phone')
                });
                return;
            }
            if(result.success){
                window.location = '/?user&m=account/recharge/new';
            }
        }, 'json');
    }

    exports.approveClick = function(id, url) {
        $('#' + id).click(function() {
            if(url){
               diyou.use('users_approve',function(dy){dy.approve('success')});
            }else{
                diyou.use('dialogs', function(dia) {
                    dia.dialog('实名认证', '/?user&m=trust/approve&type=realname')
                });
            }
            return;
        });
        
    }
});