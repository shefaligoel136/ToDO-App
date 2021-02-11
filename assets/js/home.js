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

    //  to strike a line when checkbox is checked 
    $('input[type=checkbox]').on('change', function(){
        
        if($(this).prop('checked')){
           $(this).parent().find(".tasks").css('text-decoration', 'line-through');
        }

        else {
            $(this).parent().find(".tasks").css('text-decoration', 'none');
        }

    });
        
    // this query is for getting the id's of all the tasks which are marked checked and are to be deleted
    $("#color-red").on('click',function(){
        var selected = new Array();
        if($('input:checkbox:checked').length>0){
            $('input[type=checkbox]:checked').each(function(){
                selected.push($(this).attr('id'));
            });
            sendResponse(selected); // for the ajax call
        }
    });

    // this function is to send the ids of checked elements to the entry point - index.js so that they can be deleted from the database
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
