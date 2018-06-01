define(function (require, exports, module) {
    exports.borrow_content = function () {
        //金额输入框清
        exports.roam_new();
        exports.sub();
    }
    exports.sub = function(){
        $('#tender_login').on('click',function(){
            //$("#tender_form").submit();
            if (exports.identy() !=false){
                $("#tender_form").submit();
            }
        });
    }
    exports.identy = function () {
        if (user_id == "") {//登录弹窗 wqs 12-12
            diyou.use('dialogs', function (dia) {
                dia.dialog('请先登录', '/?user&q=login&type=ajax')
            });
            return false;
        }
        var money = $('#money').val();
        var dotime1 = $('#dotime1').val();
        if (dotime1 == '') {
            alert('预约时间不能为空');
            return false;
        }
        if (money == '') {
            alert('请输入预约金额');
            return false;
        }
        var availMoney = parseFloat($("#availMoney").attr("data-money"));
        var minMoney = parseFloat($("#MaxMin").attr("data-min"));
        var maxMoney = parseFloat($("#MaxMin").attr("data-max"));
        var maxValue;
        if (!maxMoney) {
            maxValue = availMoney;
        } else {
            maxValue = (availMoney < maxMoney) ? availMoney : maxMoney;
        }
    }
    
   
   
    exports.roam_new = function () {
        //开始投资
        $("#tender_form").bind("submit", function () {
            require("submitform");
            $("#tender_form").ajaxSubmit({
                success: function (result, status) {
                    if (result == 1) {
                        diyou.use('dialogs', function (dy) {
                            dy.success('恭喜您，预约成功！ 您的私人专属客服将会在2个工作日内跟您取得联系。', 'this')
                        })
                    } else {
                        diyou.use('dialogs', function (dy) {
                            dy.error(result, '')
                        })
                    }
                    return false;
                }

            });
            return false; // cancel conventional submit*/
        })
    }
  
    

})