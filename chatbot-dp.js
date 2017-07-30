//wrapping out the code inside the function
$(function () {
    const testing = false;

    const url = "https://prodbm-dot-deeppixel-corebot.appspot.com";
    //const url = "";
    const serversecret = "XIV97UQ8HCFP718X";
    const sessionkey = generateSessionKey();
    const DPID = "9cb6c6b8-1055-4417-b5c7-e19aaae95ff4";

    const build = testing ? "dist" : "dist";
    const MAX_SINGLE_REPLY_COUNT = 120;

    const TOP_THRESHOLD = 0.9;
    const BOTTOM_THRESHOLD = 0.6;

    var lastmsg = "";
    var lastcrm = "";

    var msg = "";
    var bot_msg;

    function callbot(message) {


        /*var endpoint = url + "/webapi?dpid=" + "DPID2110030512812706336545" + "&phrase=" + encodeURIComponent(message) + "&channel=" + sessionkey + "&threshold=" + TOP_THRESHOLD;*/
        var endpoint = url + "/webapi?dpid=" + DPID + "&phrase=" + encodeURIComponent(message) + "&channel=" + sessionkey + "&threshold=" + TOP_THRESHOLD;

        console.log('url: ' + endpoint);

        $.ajax({
            type: "get",
            async: false,
            url: endpoint,
            dataType: "jsonp",
            //jsonp: "jsonCallback",
            //jsonpCallback: "jsonCallback",
            success: function (response) {

                console.log("Bot responded with: ");
                console.log(response);
                //Query the jQuery object for the values
                bot_msg = response.data.response;
                console.log(bot_msg);

                generate_message(bot_msg, 'bot');



            },
            error: function (response) {
                console.log(response);
                var pixelResponse = {
                    score: 1,
                    match: 'Service Status',
                    response: 'The service is currently unavaliable ',
                    matchId: 0,
                };
                addPixelMessage(pixelResponse, true);
            }
        });
    }



    function callCrm(message) {

       /* lastcrm = message;*/


        //var phrase = getLastHistory();
        var endpoint = url + "/crmapi?dpid=" + DPID + "&phrase=" + encodeURIComponent(message) + "&channel=" + sessionkey + "&threshold=" + TOP_THRESHOLD;


        console.log('callCrm url: ' + endpoint);

        $.ajax({
            type: "get",
            async: false,
            url: endpoint,
            dataType: "jsonp",
            //jsonp: "jsonCallback",
            //jsonpCallback: "jsonCallback",
            success: function (response) {




                console.log("Bot Crm msg: ");
                console.log(response);



                // if($status){
                //     $status.removeClass(fa_loading).addClass("success").addClass(fa_success);
                // }
                /* toggleLoader(false);
 toggleChatMenu(false);
 addPixelMessage(response.data);*/
            },
            error: function (response) {
                console.log(response);
                var pixelResponse = {
                    score: 1,
                    match: 'Service Status',
                    response: 'The service is currently unavaliable ',
                    matchId: 0,
                };

                addPixelMessage(pixelResponse, true);
            }
        });
    }



    //var index is the id of the message
    var INDEX = 0;
    //generate messages on submit click
    $("#chat-submit").click(function (e) {
        e.preventDefault();
        msg = $("#chat-input__text").val();
        //if there is no string button send shoudn't work
        if (msg.trim() == '') {
            return false;
        }
        //call generate message function
        generate_message(msg, 'self');
        /*var buttons = [
    {
        name: 'Existing User',
        value: 'existing'
        },
    {
        name: 'New User',
        value: 'new'
        }
      ];*/
        //send the message to bot

        callCrm(msg);
        callbot(msg);

        // bot answering back


        /*setTimeout(function () {
            generate_message(msg, 'bot');
            //time out animation for the bot answering back
        }, 1000)*/

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

    function guid() {

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function generateSessionKey() {

        var sessiondate = new Date().getTime();
        var sessionkey = 'xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (sessiondate + Math.random() * 16) % 16 | 0;
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        return sessionkey;
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
