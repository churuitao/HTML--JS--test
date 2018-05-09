$("#main").waterfall({
    itemClass: ".box",
    minColCount: 2,
    spacingHeight: 10,
    resizeable: true,
    ajaxCallback: function(success, end) {
        var data = {"data": [
            { "src": "03.jpg" }, { "src": "04.jpg" }, { "src": "02.jpg" }, { "src": "05.jpg" }, { "src": "01.jpg" }, { "src": "06.jpg" }
        ]};
        var str = "";
        var templ = '<div class="box" style="opacity:0;filter:alpha(opacity=0);"><div class="pic"><img src="../img/{{src}}" /></div></div>'

        for(var i = 0; i < data.data.length; i++) {
            str += templ.replace("{{src}}", data.data[i].src);
        }
        $(str).appendTo($("#main"));
        success();
        end();
    }
});
