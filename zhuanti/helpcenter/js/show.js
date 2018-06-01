$(function(){
    $('.hub_center2c2 ul li').click(function(){
        var ind=$(this).index();
        $(this).addClass('act_on').siblings().removeClass('act_on');
        $('.hub_center2c3 ul li').eq(ind).addClass('act_on1').siblings().removeClass('act_on1');
        $('#helpssss').fadeIn(500);
        $('#hub_center2c3id1').fadeOut();
        $('.hub_center2c4').fadeOut(500);
    });
    var showDT = null;
    $('.hub_center2c3 dl dt').live('click',function () {
        $(this).find('span').toggleClass('bom')
        $(this).next().toggle();
        if (showDT != null && showDT !== this) {
            $(showDT).find('span').removeClass('bom')
            $(showDT).next().hide();
        }
        showDT = this;
    })

})