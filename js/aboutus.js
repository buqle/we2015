define(function(require, exports, module) {
    exports.init = function(){
        $('.currentpage').click(function(){
            $('.about-page-tonehs').css('display','block');
        });
        $('.currentpage1').click(function(){
            $('.about-page-tonehs').css('display','none');
        });
        $("#map > li > a").each(function(){
            $(this).click(function(){
                $("#map > li > a").removeClass('current');
                $(this).addClass('current');
                var _data_id = $(this).attr('data-id');
                exports._about_list(_data_id);
            });
        });
        var local = window.location.href;
        locals = local.split('#');

        var catID = 73;
        var joinTo = null;
        if (locals[1] != undefined) {
            switch (locals[1]){
                case 'box-1':
                    catID = 73;
                    break;
                case "box-2":
                    catID = 75;
                    break;
                case "box-3":
                    catID = 76;
                    break;
                case "box-4":
                    catID = 77;
                    break;
                case "box-5":
                    catID = 85;
                    break;
                case "box-6":
                    catID = 74;
                    break;
                case "box-7":
                    catID = 78;
                    break;
                case "box-8":
                    catID = 81;
                    break;
                case "box-9":
                    catID = 79;
                    break;
                case "box-10":
                    catID = 82;
                    break;
                case "box-11":
                    catID = 86;
                    break;
                default :
                    var hashRouter = locals[1].split("/");
                    if (hashRouter.length>1) {
                        catID = hashRouter[0];
                        joinTo = hashRouter[1];
                        catID = 86;
                    }
            }
            $("#map > li > a").removeClass('current');
            $('a[data-id="'+catID+'"]').addClass('current')
            if(catID == 75){
                $('.about-page-tonehs').css('display','block');
            }
        }
        exports._about_list(catID, joinTo);
        if($('.currentpage').hasClass('current')){
            $('.about-page-tonehs').css('display','block');
        }
    }
    //列表页
    exports._about_list = function(page_id, joinTo){
        _data = '&t=about_ajax&id='+page_id;
        $.ajax({
        url: "/?ajax",
        data: _data,
        success: function(data){
            $(".box").html(data);
            if (joinTo !=null) {
                var t = $("#ooperationid"+joinTo).offset().top;

                $('html, body').animate({scrollTop:(t-50)},1000);
            }
            $('.jrrhd').click(function(){
                if(user_id != ''){
                    window.location.href="/borrow/index.html";
                } else {
                    window.location.href="/?user&q=login";
                }
            });
        }
        });
    }

})