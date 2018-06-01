/*!
 * Created By:ahui;
 * Created Time:2013-11-11;
 * Updated By:ahui;
 * Updated Time:2013-11-11;
 * http://www.diyou.cn
 */
 define(function(require, exports, module) {

    //列表页
    exports.pages = function(_var,_url){
        var _url = _url;
        var _var = _var;
        exports._list(0,_var,_url);
        exports._pages(_var,_url);
    }
    
    //列表页
    exports._list = function(page,_var,_url){
        $.ajax({
            url: _url,
            data: "page="+page,
            success: function(data){
                $(_var).html(data);
                 exports._pages(_var,_url);
            }
        })
    }
    
    //列表页
    exports._pages = function(_var,_url){
        require("pages");
         $("#pages").pagination($("#pages").attr('data-total'), {
            callback: pageselectCallback,//PageCallback() 为翻页调用次函数。
            prev_text: "<",
            next_text: ">",
            items_per_page: parseInt($("#pages").attr('data-epage')), //每页的数据个数
            num_display_entries: 3, //两侧首尾分页条目数
            current_page: parseInt($("#pages").attr('data-page')),   //当前页码
            //current_page:0,
            num_edge_entries: 5,
            load_first_page:false
        });
        function pageselectCallback(page_id, jq) {
            exports._list(page_id,_var,_url);
            return false;
        }
    }
});