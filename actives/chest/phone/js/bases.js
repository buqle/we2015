/**
 * Created by Administrator on 2016/8/16.
 */
(function(w,j){
        var base = {
            _token: undefined,
            _getToken: function () {
                if (base._token === undefined) {
                    var token = w.localStorage.getItem("token");
                    if (token !== null || token != "" || token != "null") {
                        base._token = token;
                    }
                }
                return base._token
            },
            _getPost: function (data, callback) {

                //if (data.token == undefined) {
                //    var token = base._getToken();
                //    if (token == undefined || token == '') {
                //        token = ''
                //    }
                //    data.token = token;
                //}
                j.post('/weixin/?user' + base._objectToUrl(data), {}, function (r) {
                    callback && callback({data:r});
                }, 'json');


            },
            _objectToUrl: function (param, key, encode) {
                if (typeof param == null) return '';
                var paramStr = '';
                var t = typeof(param);
                if (t == 'string' || t == 'number' || t == 'boolean') {
                    paramStr += key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
                } else {
                    for (var i in param) {
                        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                        paramStr += "&" + base._objectToUrl(param[i], k, encode);

                    }
                }
                return paramStr;
            }
        };
        var weixinApi = {
            checklogin: function (callback) {
                var token = base._getToken();
                var ret = {islogin: 0};
                if (token !== undefined && token != '' && token !== null) {
                    ret.islogin = 1;
                }
                callback && callback(ret);
            },
            login: function () {
                window.location.href = "/weixin/home.html#login";
            },
            gotoTender: function () {
                window.location.href = '/weixin/home.html#tender';
            },
            gotoUser: function () {
                window.location.href = '/weixin/home.html#user';
            },
            alert: function (message) {
                w.alert(message);
            },
            confirm: function (message, callback) {
                var ret = {click: 'n'};
                var confret = w.confirm(message);
                if (callback !== undefined) {
                    if (confret == true) {
                        ret.click = 'y'
                    }
                    callback(ret)
                }
            },
            getPost: function (data, callback) {
                base._getPost(data, callback)
            },
            appshare: function (data, callback) {

            }
        };
        w.rhdapi = weixinApi;
        /*w.addEventListener("load", function () {
            if (typeof ready == 'function') ready();
        }, false);*/
        w.onload = function(){
            setTimeout(function () {
                if (typeof ready == 'function') ready();
            },1000);

        }
})(window,$);
