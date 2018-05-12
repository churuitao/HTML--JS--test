//运动JS
//包含 ：获取样式  弹性运动   缓冲运动


function onload_nav() {
    var oNav = document.getElementsByTagName('nav')[0];
    var aLi = oNav.getElementsByTagName('li');
    var oDiv = oNav.getElementsByTagName('div')[0];
    //初始化导航栏移动改变oDiv的位置
    for(var i=0;i<aLi.length;i++){
        (function(index){   //立即执行函数
            aLi[i].onmouseover = function(){
                elasticMove(oDiv,32+index*(aLi[0].offsetWidth+14));
            };
            aLi[i].onmouseout=function () {
                elasticMove(oDiv,32);
            }
        })(i);
    }
}

//弹性运动
var left=32;            //设置oDiv left 初始偏移默认值
var speed=0;            //设置oDiv 初始移动速度
function elasticMove(obj,size) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        speed+=(size-left)/6;       //计算速度（越小越弹）
        speed*=0.7;        //减速
        left+=speed;        //改变left值
        obj.style.left = left+'px';
        if(Math.round(speed)==0&&Math.round(left)==size){
            clearInterval(obj.timer);
        }
    },25);
}
//缓冲运动[兼容]
function bufferMove(obj, attr, iTarget)
{
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        var temp=0;

        if(attr=='opacity')
            temp=Math.round(parseFloat(getStyle(obj, attr))*100);
        else
            temp=parseInt(getStyle(obj, attr));

        var speed=(iTarget-temp)/6;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);

        if(temp==iTarget){
            clearInterval(obj.timer);
        } else{
            if(attr=='opacity'){
                obj.style.filter='alpha(opacity:'+(temp+speed)+')';
                obj.style.opacity=(temp+speed)/100;
            }else{
                obj.style[attr]=temp+speed+'px';
            }
        }
    }, 30);
}

//注册切换效果运动
function loginMove(obj,attr,speed) {
    clearInterval(obj.timer);
    var trans = 0;
    var loginMain = document.getElementById('login-main');
    var oFrom = loginMain.getElementsByTagName('form');
    obj.timer=setInterval(function (){
        if(trans==90){
            clearInterval(obj.timer);
            if(getStyle(oFrom[0],'display')=='block'){
                intoRegister();
                clearLogin();
            }
            else{
                backLogin();
                clearegister();
            }
            obj.timer=setInterval(function (){
                if(trans==0){
                    clearInterval(obj.timer);
                }else{
                    setStyle(obj,'transform','rotate'+attr+'('+(--trans)+'deg)');
                }
            },speed);
        }else{
            setStyle(obj,'transform','rotate'+attr+'('+(++trans)+'deg)');
        }
    },speed);
}


//显示返回顶部按钮
function showToTop(obj) {
    bufferMove(obj,'opacity',100);
}
function hiddenToTop(obj) {
    bufferMove(obj,'opacity',0);
}


//返回页面顶部
var to_Top=null;
function toTop() {
    to_Top=setInterval(function () {
        console.log(document.documentElement.scrollTop);
        if(document.documentElement.scrollTop>0){
            document.documentElement.scrollTop-=20;
        }else{
            clearInterval(to_Top);
        }
    },10);
}
//拖拽任意框信息框
function oDivmove (div){
    var oDiv=document.getElementById(div);
    var disX=0;
    var disY=0;
    oDiv.onmousedown=function (ev){
        var oEvent=ev||event;
        disX=oEvent.clientX-oDiv.offsetLeft;
        disY=oEvent.clientY-oDiv.offsetTop;
        document.onmousemove=function (ev){
            var oEvent=ev||event;
            var left=oEvent.clientX-disX;
            var top=oEvent.clientY-disY;
            if(left<0){
                left=0;
            }else if(left>document.body.offsetWidth-oDiv.offsetWidth) {
                left=document.body.offsetWidth-oDiv.offsetWidth;
            }
            if(top<0)
            {
                top=0;
            }
            else if(top>window.screen.availHeight-oDiv.offsetHeight){
                top=window.screen.availHeight-oDiv.offsetHeight
            }
            oDiv.style.left=left+'px';
            oDiv.style.top=top+'px';
        };
        //鼠标松开事件结束
        document.onmouseup=function (){
            document.onmousemove=null;
            document.onmouseup=null;
        };
        return false;           //阻止firefox的BUG
    };
};

//bss
function bbsmove (sign){
    var bbs=document.getElementById('bbs');
    var bbshead = document.getElementById('bbs-head');
    var disX=0;
    var disY=0;
    if(sign==false){
        bbshead.onmousedown=null;
        return;
    }else{
        bbshead.onmousedown=function (ev){
            var oEvent=ev||event;
            disX=oEvent.clientX-bbs.offsetLeft;
            disY=oEvent.clientY-bbs.offsetTop;
            document.onmousemove=function (ev){
                var oEvent=ev||event;
                var left=oEvent.clientX-disX;
                var top=oEvent.clientY-disY;
                if(left<0){
                    left=0;
                }else if(left>document.body.offsetWidth-bbs.offsetWidth) {
                    left=document.body.offsetWidth-bbs.offsetWidth;
                }
                if(top<0)
                {
                    top=0;
                }
                else if(top>window.screen.availHeight-bbs.offsetHeight){
                    top=window.screen.availHeight-bbs.offsetHeight
                }
                bbs.style.left=left+'px'; 
                bbs.style.top=top+'px';
            };
            //鼠标松开事件结束
            document.onmouseup=function (){
                document.onmousemove=null;
                document.onmouseup=null;
            };
            return false;           //阻止firefox的BUG
        };
    }
};

