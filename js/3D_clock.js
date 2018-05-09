function onload_clock() {
    var clock = document.getElementById('clock-3D');
    var clock_items = clock.getElementsByTagName('ul');
    var clock_items_item=clock.getElementsByTagName('li');
    var myDate = new Date();
    var date_temp = new Array();    //把时间用数组存起来
    date_temp[0]=parseInt(myDate.getHours()/10);
    date_temp[1]=myDate.getHours()%10;
    date_temp[2]=minute1=parseInt(myDate.getMinutes()/10);
    date_temp[3]=minute2=myDate.getMinutes()%10;
    date_temp[4]=second1=parseInt(myDate.getSeconds()/10);
    date_temp[5]=second2=myDate.getSeconds()%10;
    setInterval(function () {
        myDate = new Date();//获取系统当前时间
        if(date_temp[0]!=parseInt(myDate.getHours()/10)){
            date_temp[0]=parseInt(myDate.getHours()/10);
        }
        if( date_temp[1]!=myDate.getHours()%10){
            date_temp[1]=myDate.getHours()%10;
        }
        if(date_temp[2]!=parseInt(myDate.getMinutes()/10)){
            date_temp[2]=parseInt(myDate.getMinutes()/10);
        }
        if(date_temp[3]!=myDate.getMinutes()%10){
            date_temp[3]=myDate.getMinutes()%10;
        }
        if( date_temp[4]!=parseInt(myDate.getSeconds()/10)){
            date_temp[4]=parseInt(myDate.getSeconds()/10);
        }
        if(date_temp[5]!=myDate.getSeconds()%10){
            date_temp[5]=myDate.getSeconds()%10;
        }
        for(var i=0;i<36;i++){
            clock_items_item[i].innerHTML='<span>'+date_temp[parseInt(i/6)]+'</span>'
        }
    },1000);

}
