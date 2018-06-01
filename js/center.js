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
        var catID = 82;
        if (locals[1] != undefined) {
            switch (locals[1]){
                case 'box-222':
                    catID = 666;
                    break;
                case "box-333":
                    catID = 999;
                    break;
            }
            $("#map > li > a").removeClass('current');
            $('a[data-id="'+catID+'"]').addClass('current')
            if(catID == 82){
                $('.about-page-tonehs').css('display','block');
            }
        }
        exports._about_list(catID);
        if($('.currentpage').hasClass('current')){
            $('.about-page-tonehs').css('display','block');
        }
    }
    //列表页
    exports._about_list = function(page_id){
        _data = '&t=about_ajax&id='+page_id;
        $.ajax({
        url: "/?ajax",
        data: _data,
        success: function(data){
            $(".box").html(data);
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