const name = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,12}$/;
const email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const tel  = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
const pass=/^[\w]{6,18}$/;

var codeName='';
var userName='';
$(document).ready(function () {
    $('#uname input').bind('input propertychange',function() {
        var temp = $('#uname input').val();
        if(temp!=''){
            var uname=document.getElementById('uname');
            if(!name.test(temp)){
                setStyle(uname,'border',' 1px solid #f00');
            }else{
                setStyle(uname,'border',' 1px solid #ccc');
            }
        }
    })
    $('#uemail input').bind('input propertychange',function() {
        var temp = $('#uemail input').val();
        if(temp!=''){
            var uemail=document.getElementById('uemail');
            if(!email.test(temp)){
                setStyle(uemail,'border',' 1px solid #f00');
            }else{
                setStyle(uemail,'border',' 1px solid #ccc');
            }
        }
    })
    $('#utel input').bind('input propertychange',function() {
        var temp = $('#utel input').val();
        if(temp!=''){
            var utel=document.getElementById('utel');
            if(!tel.test(temp)){
                setStyle(utel,'border',' 1px solid #f00');
            }else{
                setStyle(utel,'border',' 1px solid #ccc');
            }
        }
    })
    $('#upass input').bind('input propertychange',function() {
        var temp = $('#upass input').val();
        if(temp!=''){
            var upass=document.getElementById('upass');
            if(temp.length<6||temp.length>16){
                setStyle(upass,'border',' 1px solid #f00');
            }else{
                setStyle(upass,'border',' 1px solid #ccc');
            }
        }
    })
    $('#upass1 input').bind('input propertychange',function() {
        var temp = $('#upass1 input').val();
        if(temp!=''){
            var upass1=document.getElementById('upass1');
            if(temp.length<6||temp.length>16){
                setStyle(upass1,'border',' 1px solid #f00');
            }else{
                setStyle(upass1,'border',' 1px solid #ccc');
            }
        }
    });
    $('#ucode input').bind('input propertychange',function() {
        var temp = $('#ucode input').val();
        if(temp!=''){
            var ucode=document.getElementById('ucode');
            var input = ucode.getElementsByTagName('input')[0];
            if(temp.length!=4){
                setStyle(input,'border',' 1px solid #f00');
            }else{
                setStyle(input,'border',' 1px solid #ccc');
            }
        }
    });
    $('#loginname input').bind('input propertychange',function() {
        var temp = $('#loginname input').val();
        var loginname=document.getElementById('loginname');
        var input = loginname.getElementsByTagName('input')[0];
        if(temp==''){
            setStyle(loginname,'border',' 1px solid #f00');
        }else{
            setStyle(loginname,'border',' 1px solid #ccc');
        }
    });
    $('#loginpass input').bind('input propertychange',function() {
        var temp = $('#loginpass input').val();
        var loginpass=document.getElementById('loginpass');
        var input = loginpass.getElementsByTagName('input')[0];
        if(temp==''){
            setStyle(loginpass,'border',' 1px solid #f00');
        }else{
            setStyle(loginpass,'border',' 1px solid #ccc');
        }
    });
    $('#upass input').keyup(function () {
        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        var enoughRegex = new RegExp("(?=.{6,}).*", "g");

        if (false == enoughRegex.test($(this).val())) {
            $('#level').removeClass('pw-weak');
            $('#level').removeClass('pw-medium');
            $('#level').removeClass('pw-strong');
            $('#level').addClass(' pw-defule');
            //密码小于六位的时候，密码强度图片都为灰色
        }
        else if (strongRegex.test($(this).val())) {
            $('#level').removeClass('pw-weak');
            $('#level').removeClass('pw-medium');
            $('#level').removeClass('pw-strong');
            $('#level').addClass(' pw-strong');
            //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强
        }
        else if (mediumRegex.test($(this).val())) {
            $('#level').removeClass('pw-weak');
            $('#level').removeClass('pw-medium');
            $('#level').removeClass('pw-strong');
            $('#level').addClass(' pw-medium');
            //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
        }
        else {
            $('#level').removeClass('pw-weak');
            $('#level').removeClass('pw-medium');
            $('#level').removeClass('pw-strong');
            $('#level').addClass('pw-weak');
            //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的
        }
        return true;
    });
});

//清除登陆页面input
function clearLogin() {
    var login =document.getElementById('login-login');
    var input = login.getElementsByTagName('input');
    for (var i in input) {
        input[i].value='';
    }
    setStyle(document.getElementById('loginname'),'border','1px solid #ccc');
    setStyle(document.getElementById('loginpass'),'border','1px solid #ccc');
}
//清除注册页面input
function clearegister() {
    var login =document.getElementById('login-register');
    var input = login.getElementsByTagName('input');
    var level =document.getElementById('level');
    var ucode = document.getElementById('ucode');
    var udodeinput = ucode.getElementsByTagName('input')[0];
    for (var i in input) {
        input[i].value='';
    }
    setStyle(document.getElementById('uname'),'border','1px solid #ccc');
    setStyle(document.getElementById('uemail'),'border','1px solid #ccc');
    setStyle(document.getElementById('utel'),'border','1px solid #ccc');
    setStyle(document.getElementById('upass'),'border','1px solid #ccc');
    setStyle(document.getElementById('upass1'),'border','1px solid #ccc');
    setStyle(udodeinput,'border','1px solid #ccc');
    level.className = 'pw-strength';
}
//本地缓存添加用户
function addUser(name,info) {
    if(localStorage.getItem(name)){
        return false;
    }
    localStorage.setItem(name,info);
    return true;
}
