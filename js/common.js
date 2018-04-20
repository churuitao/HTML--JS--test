

// 获取元素的样式
function getStyle(obj,name) {
    if(obj.currentStyle)
        return obj.currentStyle[name];
    else
        return getComputedStyle(obj,false)[name];
}
//获取当前滑轮位置
function getScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    }else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}

function onload_toTop() {
    //toTop按钮
    var oToTop = document.getElementById('toTop');
    oToTop.onmouseover = function () {
        oToTop.style.backgroundPositionY="-60px";       //改变totop背景图片的位置
    }
    oToTop.onmouseout = function () {
        oToTop.style.backgroundPositionY="0px";       //改变totop背景图片的位置
    }
}
window.onscroll = function () {
    var totop=document.getElementById('toTop');
    var consult=document.getElementById('consult');
    bufferMove(consult,'top',Math.round(document.documentElement.clientHeight/2-(parseInt( getStyle(consult,'height'))/2)+getScrollTop()));
    if(getScrollTop()>150){
        showToTop(totop);
    }else{
        hiddenToTop(totop);
    }
}

window.onload=function () {
    onload_toTop();
    onload_slide();
    onload_nav();
}

