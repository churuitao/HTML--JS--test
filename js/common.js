var imgCode = {
    "url0": "5hhs.jpeg",
    "url1": "6yzs.jpeg",
    "url2": "7fru.jpeg",
    "url3": "9pfh.jpeg",
    "url4": "9z2p.jpeg",
    "url5": "37pb.jpeg",
    "url6": "63fn.jpeg",
    "url7": "68gd.jpeg",
    "url8": "awxw.jpeg",
    "url9": "bf5x.jpeg",
    "url10": "bysu.jpeg",
    "url11": "c3hj.jpeg",
    "url12": "c9ka.jpeg",
    "url13": "d4wh.jpeg",
    "url14": "djhp.jpeg",
    "url15": "ea98.jpeg",
    "url16": "fxnv.jpeg",
    "url17": "g4xh.jpeg",
    "url18": "gama.jpeg",
    "url19": "hw2w.jpeg",
    "url20": "jdry.jpeg",
    "url21": "kjdr.jpeg",
    "url22": "m7tc.jpeg",
    "url23": "mcg5.jpeg",
    "url24": "nzvr.jpeg",
    "url25": "p52e.jpeg",
    "url26": "pd7f.jpeg",
    "url27": "pd63.jpeg",
    "url28": "t4eh.jpeg",
    "url29": "tty2.jpeg",
    "url30": "ve8y.jpeg",
    "url31": "vemx.jpeg",
    "url32": "vnqd.jpeg",
    "url33": "w9pb.jpeg",
    "url34": "wyju.jpeg",
    "url35": "y9c9.jpeg",
    "url36": "yxwv.jpeg",
    "url37": "zebx.jpeg",
}
//获取json字符串的长度
function getJsonLength(jsonData) {
    var length=0;
    for(var ever in jsonData) {
        length++;
    }
    return length;
}
//获取event事件对象
function getEventObject() {
    var event = window.event||arguments[0];
    target = event.srcElement||event.target;
    return target;
}


// 获取元素的样式
function getStyle(obj,name) {
    if(obj.currentStyle)
        return obj.currentStyle[name];
    else
        return getComputedStyle(obj,false)[name];
}
//设置元素css样式[兼容性强]
function setStyle(obj, name, value) {
    obj.style['Webkit'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
    obj.style['Moz'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
    obj.style['ms'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
    obj.style['O'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
    obj.style[name]=value;
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
function toTopHover() {
    var oToTop = document.getElementById('toTop');
    oToTop.style.backgroundPositionY="-60px";       //改变totop背景图片的位置
}
function toTophide() {
    var oToTop = document.getElementById('toTop');
    oToTop.style.backgroundPositionY="0px";       //改变totop背景图片的位置
}
//随机出现流星
var startAppearMeteor=null;
function onload_meteor(){
    var timeout=parseInt(Math.random()*2000+1000);
    startAppearMeteor=setTimeout(function timeoutFun() {
        appearMeteor();
        timeout=parseInt(Math.random()*2000+1000);
        startAppearMeteor=setTimeout(timeoutFun,timeout);
    },timeout)
}
//生成流星
function appearMeteor() {
    var body = document.getElementsByTagName('body')[0];
    var type = (parseInt(Math.random()*3));
    var x = parseInt(Math.random()*300+50);
    var y = parseInt(Math.random()*50+1222);
    var width;
    var height;
    if(type==0){
        width=66;
        height=22;
    }else if(type==1){
        width=60;
        height=18;
    }else{
        width=47;
        height=12;
    }
    var meteor = document.createElement("div");
    setStyle(meteor,'position','fixed');
    setStyle(meteor,'background','url(img/lx'+(type+1)+'.png) no-repeat');
    setStyle(meteor,'width',width+'px');
    setStyle(meteor,'height',height+'px');
    setStyle(meteor,'top',x+'px');
    setStyle(meteor,'left',y+'px');
    body.appendChild(meteor);
    meteorMove(meteor,x,y)
}
//流星消失
function disappearMeteor(obj) {
    var body = document.getElementsByTagName('body')[0];
    bufferMove(obj,'opacity',0);
    setTimeout(function () {
        body.removeChild(obj);
    },500);
}

//流星移动
function meteorMove(obj,x,y){
    var body = document.getElementsByTagName('body')[0];
    var speed = parseInt(Math.random()*2+2);
    var end = parseInt(Math.random()*600+50);
    var timer = setInterval(function () {
        x+=speed*0.25;
        y-=speed;
        setStyle(obj,'top',x+'px');
        setStyle(obj,'left',y+'px');
        if(parseInt(getStyle(obj,'left'))<end){
            disappearMeteor(obj);
            clearInterval(timer);
        }
    },20);
}

//所有加载时候的要执行的函数
window.onload=function () {
    onload_nav();
    onload_automatic();
    onload_slide();
    onload_clock();
    onload_product();
    onload_meteor();
    onload_userinfomove();
    //阻止默认冒泡事件
    var login =document.getElementById('login-main');
    login.onclick=function (ev) {
        var oEvent = ev || event;
        if(oEvent.cancelBubble)
            oEvent.cancelBubble = true;
        else
            oEvent.stopPropagation();
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

//阻止浏览器的默认行为
function stopDefault(e) {
    //阻止默认浏览器动作(W3C)
    if ( e && e.preventDefault )
        e.preventDefault();
    //IE中阻止函数器默认动作的方式
    else
        window.event.returnValue = false;
    return false;
}

window.onbeforeunload=function(e){
    var userinfo = JSON.parse(localStorage.getItem(userName));
    var infotemp={
        "phone":userinfo.phone,
        "email":userinfo.email,
        "pass": userinfo.pass,
        "static":false
    }
    localStorage.setItem(userName,JSON.stringify(infotemp));
}



//获取和失去焦点 另一种方法
// window.onblur=function () {
//     clearInterval(startAppearMeteor);
// }
// window.onblur=function () {
//     onload_meteor();
// }
