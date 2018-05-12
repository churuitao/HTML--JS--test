

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
    if(Math.random()>0.5) {
        //效果1
        setStyle(oLi[index],'width',0);
        bufferMove(oLi[index],'width',840);
    }else{
        //效果2
        setStyle(oLi[index],'height',0);
        bufferMove(oLi[index], 'height', 310);
    }
}

//显示inidex值对应的按钮
function show_point(obj,index) {
    for (var i=0;i<obj.length;i++){
        if(i%2!=0)
            setStyle(obj[i],'opacity',0);
    }
    setStyle(obj[(index)*2+1],'opacity',1);
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


    
    //给五个点加点击事件
    for(var i=0;i<oBut.length;i++){
        oBut[i].index=i;
        oBut[i].onclick=function () {
            if (now_point==this.index) return;
            now_point=this.index;
            show_point(oImg,now_point);
            nextPage(oLi,4-now_point);
        }
    }
    //给左右加按键
    prev.onclick=function () {
        if(--now_point<0)now_point=4;
        show_point(oImg,now_point);
        nextPage(oLi,4-now_point);
    }
    next.onclick=function () {
        if(++now_point>4)now_point=0;
        show_point(oImg,now_point);
        nextPage(oLi,4-now_point);
    }
}


// 显示/隐藏留言面板
var isBbs=false;
function onBbs() {
    var bbs = document.getElementById('bbs');
    var sign = bbs.getElementsByTagName('span')[0];
    if(isBbs){
        bufferMove(bbs,'bottom',-365);
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
        sign.style.backgroundPositionX = -120+'px';
        isConsult=true;
    }
}

//显示咨询面板
function showBbs(){
    var bbs = document.getElementById('bbs');
    var span = bbs.getElementsByTagName('span');4
    console.log(document.body.clientHeight/2);
    setStyle(bbs,'top','auto');
    setStyle(bbs,'bottom',window.screen.availHeight /2-parseInt(getStyle(bbs,'height'))/2+'px');
    setStyle(bbs,'left',document.body.offsetWidth/2-parseInt(getStyle(bbs,'width'))/2+'px');
    setStyle(span[0],'display','none');
    setStyle(span[1],'display','inline');
    bbsmove(true);
}
//隐藏咨询面板
function hiddrnBbs(){
    var bbs = document.getElementById('bbs');
    var span = bbs.getElementsByTagName('span');
    setStyle(bbs,'top','auto');                     //取消top的
    setStyle(bbs,'bottom',-365+'px');
    setStyle(bbs,'left',0+'px');
    setStyle(span[0],'display','inline');
    setStyle(span[1],'display','none');

    var bbs = document.getElementById('bbs');
    var sign = bbs.getElementsByTagName('span')[0]; 
    bufferMove(bbs,'bottom',-365);
    sign.innerHTML = '+';
    isBbs = false;
    bbsmove(false);
}

//自动切换页面（轮播图）
var auto_timer=null;
function onload_automatic() {
    var slide= document.getElementById('slide');
    var oUl = slide.getElementsByTagName('ul')[0];
    var oLi = oUl.getElementsByTagName('li');
    var slide_menu = document.getElementById('slide_menu');
    var oBut = slide_menu.getElementsByTagName('a');
    var oImg = slide_menu.getElementsByTagName('img');
    auto_timer=setInterval(function () {
        if(++now_point>4)now_point=0;
        show_point(oImg,now_point);
        nextPage(oLi,4-now_point);
    },5000);
}

//手风琴效果
var product_now = 0;
function onload_product() {
    var product = document.getElementById('product');
    var items = product.getElementsByTagName('li');
    var oDiv = product.getElementsByTagName('div');
    for(var i=0;i<items.length;i++){
        items[i].index=i;
        items[i].onmouseover=function (){
            if(product_now!=this.index){
                bufferMove(items[product_now],'width',160);
                //取消上次的格式
                setStyle(oDiv[1+(product_now*5)],'display','block');
                setStyle(oDiv[2+(product_now*5)],'display','none');
                setStyle(oDiv[4+(product_now*5)],'display','none');
                setStyle(items[product_now],'background','');
                //设置这次的格式
                setStyle(oDiv[1+(this.index*5)],'display','none');
                setStyle(oDiv[2+(this.index*5)],'display','block');
                setStyle(oDiv[4+(this.index*5)],'display','block');
                setStyle(items[this.index],'background','url("img/producet_bg_'+product_now+'.jpg")');

                bufferMove(this,'width',270);
            }
            product_now=this.index;
        }
    }
}

//显示登陆页面
function showLogin() {
    var login = document.getElementById('login');
    setStyle(login,'display','flex');
    setStyle(login,'top',getScrollTop()+'px');
    changeCode();
}

//隐藏登陆页面
function hiddenLogin() {
    var login = document.getElementById('login');
    var loginMain = document.getElementById('login-main');
    // if(getEventObject()==login)          //判断事件的对象
    setStyle(login,'display','none');
    //取消改变过的东西
    clearInterval(loginMain.timer);
    setStyle(loginMain,'transform','rotateX(0deg)');
    backLogin();
    clearLogin();
}

//页面反转效果
function registerMove() {
    var loginMain = document.getElementById('login-main');
    loginMove(loginMain,'Y',5);
}

//显示注册页面
function intoRegister() {
    var loginMain = document.getElementById('login-main');
    var oFrom = loginMain.getElementsByTagName('form');
    var oP = loginMain.getElementsByTagName('p')[0];
    oP.innerHTML='注册';
    setStyle(oFrom[0],'display','none');
    setStyle(oFrom[1],'display','block');
    setStyle(loginMain,'height','532px');
    setStyle(loginMain,'background','url("img/loginbg2.jpg") no-repeat');
}
//显示登陆页面
function backLogin() {
    var loginMain = document.getElementById('login-main');
    var oFrom = loginMain.getElementsByTagName('form');
    var oP = loginMain.getElementsByTagName('p')[0];
    oP.innerHTML='登陆';
    setStyle(oFrom[1],'display','none');
    setStyle(oFrom[0],'display','block');
    setStyle(loginMain,'height','300px');
    setStyle(loginMain,'background','url("img/loginbg1.jpg") no-repeat');
}
//随机验证码
function changeCode() {
    var loginMain = document.getElementById('login-main');
    var imgCode = loginMain.getElementsByTagName('i')[0];
    setStyle(imgCode,'background','url(code/'+getImgCode()+') 0% 0% / 80px 30px')
}
//从JSON中随机获取一个图片
function getImgCode() {
    var temp = parseInt(Math.random()*(getJsonLength(imgCode)));
    codeName=eval('imgCode.'+'url'+temp).substring(0,4);
    return eval('imgCode.'+'url'+temp);
}

//注册验证及注册
function clickRegister() {
    var register=document.getElementById('login-register');
    var input = register.getElementsByTagName('input');
    var uname=document.getElementById('uname');
    var uemail=document.getElementById('uemail');
    var utel=document.getElementById('utel');
    var upass=document.getElementById('upass');
    var upass1=document.getElementById('upass1');
    if(input[5].value!='') {
        if (codeName != input[5].value.toLocaleLowerCase()) {
            alert("验证码错误");
            input[5].value = '';
            changeCode();
            return;
        }
    }else{
        setStyle(input[5],'border','1px solid rgb(255, 0, 0)');
        alert("验证码为空");
        return;
    }
    if(input[0].value!=''){
        if(!name.test(input[0].value)){
            alert("呢称输入错误！\n3-12个字符，不含有特殊字符");
            return;
        }
    }else{
        setStyle(uname,'border','1px solid rgb(255, 0, 0)');
        alert("呢称为空");
        return;
    }
    if(input[1].value!=''){
        if(!email.test(input[1].value)){
            alert("邮箱输入错误！");
            return;
        }
    }else{
        setStyle(uemail,'border','1px solid rgb(255, 0, 0)');
        alert("邮箱为空");
        return;
    }
    if(input[2].value!=''){
        if(!tel.test(input[2].value)){
            alert("电话输入错误！");
            return;
        }
    }else{
        setStyle(utel,'border','1px solid rgb(255, 0, 0)');
        alert("电话为空");
        return;
    }
    if(input[3].value!=''){
        if(!pass.test(input[3].value)){
            alert("密码输入错误\n6-18为字符组成，不能含有特殊字符");
            return;
        }
    }else{
        setStyle(upass,'border','1px solid rgb(255, 0, 0)');
        alert("密码为空");
        return;
    }
    if(input[4].value==''){
        setStyle(upass1,'border','1px solid rgb(255, 0, 0)');
        alert("确认密码为空");
        return;
    }
    if(input[3].value!=input[4].value){
        setStyle(upass,'border','1px solid rgb(255, 0, 0)');
        setStyle(upass1,'border','1px solid rgb(255, 0, 0)');
        alert('两次输入密码不一致!');
        return;
    }
    var info={
        "phone":input[2].value,
        "email":input[1].value,
        "pass": hex_md5(input[0].value+input[3].value),
        "static":false
    }
    if(addUser(input[0].value,JSON.stringify(info))){
        alert("注册成功！请登陆。");
        registerMove();
    }else{
        alert("该用户名已存在，请重新输入");
        setStyle(uname,'border','1px solid rgb(255, 0, 0)');
    }
}
//登陆
function user_login(log) {
    var login = document.getElementById('login-login');
    var input = login.getElementsByTagName('input');
    var loginname = document.getElementById('loginname');
    var loginpass = document.getElementById('loginpass');

    if(localStorage.getItem(input[0].value)){
        var info = eval('(' + localStorage.getItem(input[0].value) + ')');
        if(hex_md5(input[0].value+input[1].value)==info.pass){
            if(info.static==true){
                alert(input[0].value+"用户已经登陆！！！");
            }else{
                info.static=true;
                localStorage.setItem(input[0].value,JSON.stringify(info));
                setStyle(document.getElementById('login'),'display','none');
                alert("登陆成功");
                userName=input[0].value;
                setStyle(document.getElementById('user'),'display','none');
                setStyle(document.getElementById('loginuser'),'display','block');
                clearLogin();
            }
        }else{
            setStyle(loginpass,'border','1px solid rgb(255, 0, 0)');
            alert("密码错误！！！")
        }
    }else{
        setStyle(loginname,'border','1px solid rgb(255, 0, 0)');
        setStyle(loginpass,'border','1px solid rgb(255, 0, 0)');
        alert("该用户不存在！！！")
    }
}

//显示用户信息
function showInfo() {
    if(userName=='') {
        alert("系统检测到您未登陆，请先登陆！")
        setStyle(document.getElementById('user'),'display','block');
        setStyle(document.getElementById('loginuser'),'display','none');
        showLogin();
    }else if(localStorage.getItem(userName)==null){
        alert("系统刚刚走神了，即将刷新页面");
        location.reload([false]);  //强制刷新当前页面，false 从缓存读取  true  从服务器读取
    }else{
        var info = document.getElementById('userinfo');
        var span = info.getElementsByTagName('span');
        var userinfo = JSON.parse(localStorage.getItem(userName));
        setStyle(info, 'display', 'block');
        setStyle(info, 'top', getScrollTop() + window.screen.availHeight / 2 - parseInt(getStyle(info, 'height')) / 2 + 'px');
        setStyle(info, 'left', parseInt(document.body.offsetWidth / 2 - parseInt(getStyle(info, 'width')) / 2) + 'px');
        span[0].innerHTML='用户名：'+userName;
        span[1].innerHTML='邮&emsp;箱：'+userinfo.email;
        span[2].innerHTML='手机号：'+userinfo.phone;
    }
}
//关闭用户信息
function hiddenInfo() {
    var info =document.getElementById('userinfo');
    setStyle(info,'display','none');
}
//更改密码
function changePass() {
    alert("该功能后期开放，敬请期待。")
}
//退出登陆
function exitLogin() {
    if(userName=='') {
        alert("系统检测到您未登陆，请先登陆！")
        setStyle(document.getElementById('user'),'display','block');
        setStyle(document.getElementById('loginuser'),'display','none');
        showLogin();
    }
    if(localStorage.getItem(userName)==null) {
        alert("系统刚刚走神了，即将刷新页面");
        location.reload([false]);  //强制刷新当前页面，false 从缓存读取  true  从服务器读取
    }else{
        var userinfo = JSON.parse(localStorage.getItem(userName));
        var infotemp={
            "phone":userinfo.phone,
            "email":userinfo.email,
            "pass": userinfo.pass,
            "static":false
        }
        setStyle(document.getElementById('userinfo'),'display','none');
        localStorage.setItem(userName,JSON.stringify(infotemp));
        userName='';
        setStyle(document.getElementById('user'),'display','block');
        setStyle(document.getElementById('loginuser'),'display','none');
        alert("退出登陆成功！");
    }
}

