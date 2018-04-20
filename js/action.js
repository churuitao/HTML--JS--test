

//改变透明度
function chanOpa(obj,value) {
        obj.style.opacity=value;
}

//改变透明度[低速]
function chanOpa_low(obj,value) {
    bufferMove(obj,'opacity',value*100);
}

//到指定页面
function nextPage(oLi,index) {
    oLi[index].style.zIndex=nowIndex++;
    //效果1
    oLi[index].style.opacity=0;
    bufferMove(oLi[index],'opacity',100);
    //效果2
    // oLi[index].style.height=0;
    // bufferMove(oLi[index],'height',320);
}


var nowIndex=2;    //li的zIndex值
var now_point=0;       //当前页

function onload_slide() {
    var slide= document.getElementById('slide');
    var oUl = slide.getElementsByTagName('ul')[0];
    var oLi = oUl.getElementsByTagName('li');

    var slide_menu = document.getElementById('slide_menu');
    var oBut = slide_menu.getElementsByTagName('a');
    var oImg = slide_menu.getElementsByTagName('img');

    var prev =document.getElementById('prev_action');
    var next =document.getElementById('next_action');

    //显示inidex值对应的按钮
    function show_point(index) {
        for (var i=0;i<oImg.length;i++){
            if(i%2!=0)
                oImg[i].style.opacity=0;
        }
        oImg[(index)*2+1].style.opacity=1;
    }
    
    //给五个点加点击事件
    for(var i=0;i<oBut.length;i++){
        oBut[i].index=i;
        oBut[i].onclick=function () {
            if (now_point==this.index) return;
            now_point=this.index;
            show_point(now_point);
            nextPage(oLi,4-now_point);
        }
    }
    //给左右加按键
    prev.onclick=function () {
        if(--now_point<0)now_point=4;
        show_point(now_point);
        nextPage(oLi,4-now_point);
    }
    next.onclick=function () {
        if(++now_point>4)now_point=0;
        show_point(now_point);
        nextPage(oLi,4-now_point);
    }
}


// 显示/隐藏留言面板
var isBbs=false;
function onBbs(sign) {
    var bbs = document.getElementById('bbs');
    if(isBbs){
        bufferMove(bbs,'bottom',-363);
        sign.innerHTML = '+';
        isBbs = false;
    } else{
        bufferMove(bbs,'bottom',0);
        sign.innerHTML='-';
        isBbs=true;
    }
}

//  显示/隐藏咨询面板
var isConsult=false;
function onConsult(sign) {
    var consult = document.getElementById('consult');
    if(isConsult){
        bufferMove(consult,'right',-125);
        sign.style.backgroundPositionX =0+'px';
        isConsult = false;
    } else{
        bufferMove(consult,'right',0);
        sign.style.backgroundPositionX =-120+'px';
        isConsult=true;
    }
}

var timer=null;
function s(){
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(oTop > 0){
            scrollBy(0,-50);
            timer = requestAnimationFrame(fn);
        }else{
            cancelAnimationFrame(timer);
        }
    });
}



