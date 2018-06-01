/*!
 * Created By:wqs;
 * Created Time:2013-11-11;
 * Updated By:wqs;
 * Updated Time:2013-11-11;
 * http://www.diyou.cn
 */
define(function(require, exports, module) {
     //help  list
    exports.helplist = function(nid){
        diyou.use("pagelist",function(p){p.pages('#content_list','/?ajax&t=help_list&type=list&nid='+nid)}); 
    }
    exports.articleslist = function(nid){
        diyou.use("pagelist",function(p){p.pages('#content_list','/?ajax&t=articles_list&type=list&nid='+nid)}); 
    }
});