(function($, undefined) {
    var $this,
        cos = Math.cos,
        sin = Math.sin,
        PI = Math.PI,
        centerX,
        centerY,
        defualts = {
            width:240,
            height:240,
            border : 30,
            data:[{name:'', value:100, color : '#33B3EE'}]
        },
        opts;

    //融合配置项
    function init(){
        var ieNum = chkIENum();
        if (ieNum>8 || ieNum == 0) {
            createSGV();
        } else {
            createVML();
        }

    };
    $.fn.createAnnular = function(options) {
        opts = $.extend({}, defualts, options);
        $this = this,
            centerX = opts.width /2;
        centerY = opts.height / 2;
        init();
    };
    //ie9及其他浏览器
    var createSGV = function(){
        var $svg = $('<svg width="' + opts.width + '" height="' + opts.height + '" viewBox="0 0 ' + opts.width + ' ' + opts.height + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>')
            .appendTo($this),
            $paths = [],
            doughnutRadius = Min([opts.height / 2,opts.width / 2]) - 5,
            cutoutRadius = doughnutRadius * (75 / 100),
            segmentTotal = 0;
        var baseDoughnutRadius = doughnutRadius ,
            baseCutoutRadius = cutoutRadius;
        var $pathGroup = $(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
        $pathGroup.attr({opacity: 100}).appendTo($svg);
        for (var i = 0, len = opts.data.length; i < len; i++) {
            segmentTotal += opts.data[i].value;
            $paths[i] = $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
                .attr({
                    "stroke-width": 0,
                    "stroke": '#0C1013',
                    "fill": opts.data[i].color,
                    "data-order": i
                })
                .appendTo($pathGroup);

        }
        //draw each path
        var startRadius = -PI / 2,//-90 degree
            rotateAnimation = 1;
        for (var i = 0, len = opts.data.length; i < len; i++) {
            var segmentAngle = rotateAnimation * ((opts.data[i].value / segmentTotal) * (PI * 2)),
                endRadius = startRadius + segmentAngle,
                largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
                startX = centerX + cos(startRadius) * doughnutRadius,
                startY = centerY + sin(startRadius) * doughnutRadius,
                endX2 = centerX + cos(startRadius) * cutoutRadius,
                endY2 = centerY + sin(startRadius) * cutoutRadius,
                endX = centerX + cos(endRadius) * doughnutRadius,
                endY = centerY + sin(endRadius) * doughnutRadius,
                startX2 = centerX + cos(endRadius) * cutoutRadius,
                startY2 = centerY + sin(endRadius) * cutoutRadius;
            var cmd = [
                'M', startX, startY,//Move pointer
                'A', doughnutRadius, doughnutRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
                'L', startX2, startY2,//Draw line path(this line connects outer and innner arc paths)
                'A', cutoutRadius, cutoutRadius, 0, largeArc, 0, endX2, endY2,//Draw inner arc path
                'Z'//Cloth path
            ];
            $paths[i].attr("d", cmd.join(' '));
            startRadius += segmentAngle;
        }
    };
    //i6 to ie8
    function createVML(){
        document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
        var style = document.createStyleSheet();
        var VMLel = ['arc','group'];
        for (var i=0,l=VMLel.length;i<l;i++) {
            style.addRule('v\\:'+VMLel[i], "behavior: url(#default#VML);");
            style.addRule('v\\:'+VMLel[i], "antialias: true;");
        }
        var height = opts.height / 0.75;
        var width = opts.width / 0.75;
        var rotateAnimation = 0;
        $vGroup = $('<v:group style="height:' + height + 'pt;width:' + width + 'pt;top:30px;left:30px" coordsize="680,680"></v:group>')
            .appendTo($this);
        for (var i = 0, len = opts.data.length; i < len; i++) {
            var angle = parseInt(opts.data[i].value/100*360);
            $('<v:arc filled=false strokecolor="'+opts.data[i].color+'" strokeweight="'+(opts.border/1.3)+'px" style="position:relative;height:' + height + 'px;width:' + width + 'px;" StartAngle="'+rotateAnimation+'" EndAngle="'+(rotateAnimation+angle+1)+'" />')
                .appendTo($vGroup);
            rotateAnimation += angle;
        }
    };
    function chkIENum() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf ( "MSIE " );
        if ( msie > 0 ) {
            // If Internet Explorer, return version number
            return parseInt (ua.substring (msie+5, ua.indexOf (".", msie )));
        } else {
            // If another browser, return 0
            return 0;
        }
    };

    function Max(arr) {
        return Math.max.apply(null, arr);
    }
    function Min(arr) {
        return Math.min.apply(null, arr);
    }
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function CapValue(valueToCap, maxValue, minValue) {
        if (isNumber(maxValue) && valueToCap > maxValue) return maxValue;
        if (isNumber(minValue) && valueToCap < minValue) return minValue;
        return valueToCap;
    }
})(jQuery);