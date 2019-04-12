 
(function (){

    var timestamp=(Date.parse(new Date()))/1000;

    $.extend({
        countdownClock:function(endTime, nowTime,idName){
            var endTime = endTime;
            var nowTime = nowTime;
            var leave   = endTime - nowTime;  

            if (leave <= 0) {
                 var lastTime = '剩余：<em><span class="red-color">0</span>天<span class="red-color">0</span>小时<span class="red-color">0</span>分<span class="red-color">0</span>秒</em>';
            }else {
                var day    = Math.floor(leave / 86400);
                var hour   = Math.floor(leave / 3600) - (day * 24);
                var minute = Math.floor(leave / 60) - (day * 1440) - (hour * 60);
                var second = leave - (day * 86400) - (hour * 3600) - (minute * 60);
                

                var lastTime = '剩余：<em><span class="red-color">'+day+'</span>天<span class="red-color">'+hour+'</span>小时<span class="red-color">'+minute+'</span>分<span class="red-color">'+second+'</span>秒</em>';	                
            }
            $(idName).html(lastTime);
            endTime-- ;  
            if(leave >0){
            setTimeout("$.countdownClock('"+endTime+"', '"+nowTime+"', '" + idName + "')", 1000);
            }
        }

    });  
    // 团购倒计时
    window.onload=function (){
        $(".tuan-slide .tuan-pro-top .time").each(function(i){
            var idName  = ".tuan-slide .tuan-pro-top .time:eq(" + i + ")";
            var nowTime = timestamp;  // 现在时间 
            var endTime = $(this).attr("endtime");   // 结束时间
            $.countdownClock(endTime, nowTime, idName);
        });
    };
    // 关闭窗口
    $.extend({
        closeWindowBox : function(eventId){
            $("#"+eventId).hide();
            //如果是欢迎光临，则需要记录cookie
            if(eventId == 'zp-welcome-store'){
                openDove();
                var url     = baseDetailUrl + "c=Ajax_DetailLeft&a=SetCookie&callback=?&t="+Math.random();
                $.getJSON(url);
            }
        }
    });

    
})(); 
    
    