/**
 * Created by Administrator on 2016/1/22.
 */
define(function (require, exports, module) {
    var oldhash;

    function reset(newhash) {
        loading();
        oldhash = newhash;
    }

    function loading() {
        $('#allMoney-tay').append('<div class="bgblack"><div class="loading_now" style="text-indent: 4em;">正在努力加载中，请耐心等待......</div></div>');
    }

    function loadend() {
        $('.bgblack').remove();
    }

    exports.hash = function () {
        hashRouter({
            'users/old&data_type=home,users/old&data_type=tender_list,users/old&data_type=account_log,users/old&data_type=recover_list,users/home,trust/recharge,trust/change,trust/cash,rating/basic,message/list,account/log,account/red,account/red2,account/red3,users/vip,users/myfriend,borrow/count,borrow/invest,borrow/invest/now,borrow/change,users/cust,users/cust_bank': function (hash) {
                reset(hash);
                $('#allMoney-tay').load('/?user&m=' + hash, function () {
                    loadend();
                });
            }
        });
        //alert(window.location.href.indexOf('#users/home'));
        var indexNum = window.location.href.indexOf('#');
        if ( indexNum === -1){
            window.location.href += '#users/home';
        }else {
            var indegLen = window.location.href.length;
            if((indegLen - indexNum) < 2){
                window.location.href += 'users/home';
            }

        }


    }


});