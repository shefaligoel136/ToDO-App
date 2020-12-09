$(document).ready(function(){
    $(".taskbox").mouseover(function(){
        $(this).find(".category").css({
            "backgroundColor":"orange"
        });
    });

    $(".taskbox").mouseout(function(){
        $(this).find(".category").css({
            "backgroundColor":"brown",
        });
    });

    $("#color-red").on('click',function(){
        var selected = new Array();
        if($('input:checkbox:checked').length>0){
            $('input[type=checkbox]:checked').each(function(){
                selected.push($(this).attr('id'));
            });
            sendResponse(selected);
        }
    });

    function sendResponse(selected){
        $.ajax({
            type:'post',
            url:'/delete-task',
            data:{selected:selected},
            success:function(data){
                location.reload();
            }
        });
    }
});


// var colors = ['red', 'blue', 'yellow', 'lightgrey', 'darkorchid', 'black', 'orange', 'deeppink', 'green', 'purple', 'saddlebrown', 'lightseagreen', 'deepskyblue', 'firebrick', 'crimson'];

//  var box = $("#category");

//  $("#color-black").click(function(e) {
//      box.append('<div class="box" style="background-color: ' + colors[Math.floor(Math.random()*15)] + '"></div>');
//  });

// //  <% colorIs = colors[Math.floor(Math.random()*15)]%>
// //                     <script>
// //                         console.log("hi")
// //                         $("#category").css({"backgroundColor":'<%= colorIs%>'});
// //        