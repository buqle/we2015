/**
 * Created by Administrator on 2015/5/26.
 */

/*   $(function(){

 */




    $(function(){
    $(".map li ").mouseenter(function(){

    // alert($(this).index());
    $(this).find("a").eq(0).hide();
    $(this).find("a").eq(1).show();
    })
    $(".map li ").mouseleave(function(){

    // alert($(this).index());
    $(this).find("a").eq(0).show();
    $(this).find("a").eq(1).hide();
    })
    });
    // //鼠标滚动事件
    $(window).scroll(function(){
    if($(window).scrollTop()<1902){
    for(var i=0;i<$(".map li ").length;i++){
    if(i==0){
    $(".map li ").eq(0).find('a').eq(1).show();
    $(".map li ").eq(0).find('a').eq(0).hide();
    }else{
    $(".map li ").eq(i).find('a').eq(0).show();
    $(".map li ").eq(i).find('a').eq(1).hide();
    }
    }
    }else if($(window).scrollTop()<3504){
    for(var i=0;i<$(".map li ").length;i++){
    if(i==1){
    $(".map li ").eq(1).find('a').eq(1).show();
    $(".map li ").eq(1).find('a').eq(0).hide();
    }else{
    $(".map li ").eq(i).find('a').eq(0).show();
    $(".map li ").eq(i).find('a').eq(1).hide();
    }
    }
    }else if($(window).scrollTop()<5640){
    for(var i=0;i<$(".map li ").length;i++){
    if(i==2){
    $(".map li ").eq(2).find('a').eq(1).show();
    $(".map li ").eq(2).find('a').eq(0).hide();
    }else{
    $(".map li ").eq(i).find('a').eq(0).show();
    $(".map li ").eq(i).find('a').eq(1).hide();
    }
    }
    }else if($(window).scrollTop()<6792){
    for(var i=0;i<$(".map li ").length;i++){
    if(i==3){
    $(".map li ").eq(3).find('a').eq(1).show();
    $(".map li ").eq(3).find('a').eq(0).hide();
    }else{
    $(".map li ").eq(i).find('a').eq(0).show();
    $(".map li ").eq(i).find('a').eq(1).hide();
    }
    }
    }else if($(window).scrollTop()<8141){
    for(var i=0;i<$(".map li ").length;i++){
    if(i==4){
    $(".map li ").eq(4).find('a').eq(1).show();
    $(".map li ").eq(4).find('a').eq(0).hide();
    }else{
    $(".map li ").eq(i).find('a').eq(0).show();
    $(".map li ").eq(i).find('a').eq(1).hide();
    }
    }
    }else if($(window).scrollTop()<10263){
    for(var i=0;i<$(".map li ").length;i++){
    if(i==5){
    $(".map li ").eq(5).find('a').eq(1).show();
    $(".map li ").eq(5).find('a').eq(0).hide();
    }else{
    $(".map li ").eq(i).find('a').eq(0).show();
    $(".map li ").eq(i).find('a').eq(1).hide();
    }
    }
    }else if($(window).scrollTop()<13528){
    for(var i=0;i<$(".map li ").length;i++){
    if(i==6){
    $(".map li ").eq(6).find('a').eq(1).show();
    $(".map li ").eq(6).find('a').eq(0).hide();
    }else{
    $(".map li ").eq(i).find('a').eq(0).show();
    $(".map li ").eq(i).find('a').eq(1).hide();
    }
    }
    }else if($(window).scrollTop()<153251){
    for(var i=0;i<$(".map li ").length;i++){
    if(i==7){
    $(".map li ").eq(7).find('a').eq(1).show();
    $(".map li ").eq(7).find('a').eq(0).hide();
    }else{
    $(".map li ").eq(i).find('a').eq(0).show();
    $(".map li ").eq(i).find('a').eq(1).hide();
    }
    }
    }else if($(window).scrollTop()<16999){
    for(var i=0;i<$(".map li ").length;i++){
    if(i==8){
    $(".map li ").eq(8).find('a').eq(1).show();
    $(".map li ").eq(8).find('a').eq(0).hide();
    }else{
    $(".map li ").eq(i).find('a').eq(0).show();
    $(".map li ").eq(i).find('a').eq(1).hide();
    }
    }
    }else if($(window).scrollTop()<18444){

    for(var i=0;i<$(".map li ").length;i++){
    if(i==9){
    $(".map li ").eq(9).find('a').eq(1).show();
    $(".map li ").eq(9).find('a').eq(0).hide();
    }else{
    $(".map li ").eq(i).find('a').eq(0).show();
    $(".map li ").eq(i).find('a').eq(1).hide();
    }
    }
    }else if($(window).scrollTop()<20923){
    for(var i=0;i<$(".map li ").length;i++){
    if(i==10){
    $(".map li ").eq(10).find('a').eq(1).show();
    $(".map li ").eq(10).find('a').eq(0).hide();
    }else{
    $(".map li ").eq(i).find('a').eq(0).show();
    $(".map li ").eq(i).find('a').eq(1).hide();
    }
    }
    }else if($(window).scrollTop()<22540){
    for(var i=0;i<$(".map li ").length;i++){
    if(i==11){
    $(".map li ").eq(11).find('a').eq(1).show();
    $(".map li ").eq(11).find('a').eq(0).hide();
    }else{
    $(".map li ").eq(i).find('a').eq(0).show();
    $(".map li ").eq(i).find('a').eq(1).hide();
    }
    }
    }else if($(window).scrollTop()<23736){
    for(var i=0;i<$(".map li ").length;i++){
    if(i==12){
    $(".map li ").eq(12).find('a').eq(1).show();
    $(".map li ").eq(12).find('a').eq(0).hide();
    }else{
    $(".map li ").eq(i).find('a').eq(0).show();
    $(".map li ").eq(i).find('a').eq(1).hide();
    }
    }
    }
    });
