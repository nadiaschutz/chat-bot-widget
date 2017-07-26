//wrapping out the code inside the function
$(function () {
    //var index is the id of the message
    var INDEX = 0;
    //generate messages on submit click
    $("#chat-submit").click(function (e) {
        e.preventDefault();
        var msg = $("#chat-input__text").val();
        //if there is no string button send shoudn't work
        if (msg.trim() == '') {
            return false;
        }
        //call generate message function
        generate_message(msg, 'self');
        var buttons = [
            {
                name: 'Existing User',
                value: 'existing'
        },
            {
                name: 'New User',
                value: 'new'
        }
      ];
        // bot answering back
        setTimeout(function () {
            generate_message(msg, 'bot');
            //time out animation for the bot answering back
        }, 1000)

    })

    function generate_message(msg, type) {
        //var index is the id of each message id =id+1
        INDEX++;
        var str = "";
        if (type == 'self') {
            str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
            str += "          <div class=\"cm-msg-text\">";
            str += msg;
            str += "          <\/div>";
            str += "        <\/div>";

        } else {
            str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
            str += "<span class=\"msg-avatar\">";
            str += "<i class=\"material-icons\">android<\/i>"
            str += "          <\/span>";
            str += "          <div class=\"cm-msg-text\">";
            str += msg;
            str += "          <\/div>";
            str += "        <\/div>";

        }


        //send the string to chat-log window
        $(".chat-logs").append(str);
        //message animation to show up on the screen with 500mls delay
        $("#cm-msg-" + INDEX).hide().fadeIn(500);

        //remove text from the input 
        if (type == 'self') {
            $("#chat-input__text").val('');
        }
        //auto scroll 
        $(".chat-logs").stop().animate({
            scrollTop: $(".chat-logs")[0].scrollHeight
        }, 1000);
    }


    /*toggle animations*/
    $("#chat-circle").click(function () {
        $("#chat-circle").hide('scale');
        $(".chat-box").show('scale');
        $(".chat-box-welcome__header").show('scale');
    })

    $(".chat-box-toggle").click(function () {
        $("#chat-circle").show('scale');
        $(".chat-box").hide('scale');
        $(".chat-box-welcome__header").hide('scale');
        $("#chat-box__wraper").hide('scale');
    })
    $(".chat-input__text").click(function () {
        $(".chat-box-welcome__header").hide();
        $("#chat-box__wraper").show();
    })

})
