/*!
 * Created By:james;
 * Created Time:2013-11-11;
 * Updated By:james;
 * Updated Time:2013-11-11;
 * http://www.diyou.cn
 */
 define(function(require, exports, module) {
	
	//ahui  
	exports.credit_log = function(){   
        diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=credit/log&type=list&')});
	}
	//ahui  
	exports.attestations_log = function(){   
        diyou.use("pagelist",function(p){p.pages('#content_box','/?user&m=credit/log&type=list&credit_type=attestation')});
	}
    
    
});