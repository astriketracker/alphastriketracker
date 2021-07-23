$(document).ready(function() {
    var u = $('#asunit_temp');
    
    var con = $('.aspage');
    $('#asform').css('display','none');

    for (var i=0; i<con.length; i++) {
        for (var j=0; j<8; j++) {
            var uu = u.clone();
            uu.attr("data-offset",j.toString());
            uu.attr("data-page",i.toString());            
            uu.attr("id", "as"+i+"_"+j);
            uu.click(handleClick);
            con[i].append(uu[0]);
        }
    }    
    u.css('display','none');

    if (isiOS()) {
        $('body').addClass("ios");
    }
});

var stats = {};
var currentKey = "";

function setProp(type, value) {
    window.event.stopPropagation();
    window.event.preventDefault();
    
    stats[currentKey][type] = value;
    var statLine = $("#as"+currentKey+" .as"+type);
    var s = "";
    for (var i=0; i<value;i++) {
        s+="⦿"; //⬤ ⦿
    }
    statLine.html(s);
}

function closeForm() {
    window.event.stopPropagation();
    window.event.preventDefault();
    $('#asform').css('display','none');
    clearAsSelected();
}

function handleClick(ev) {
    var key=getkey(ev.currentTarget);
    if (key=="undefined_undefined") {
        return;
    }
    ev.stopPropagation();
    ev.preventDefault();
    currentKey =key;
    console.log(key);
    $('#asform').css('display','block');

    clearAsSelected();
    $("#as"+currentKey).addClass("asSelected");

    if (parseInt($(ev.currentTarget).attr('data-offset')) % 2 == 0) {
        $('#asform').css('left','383px');
    } else {
        $('#asform').css('left','31px');
    }
    
    if (typeof stats[key]=="undefined") {
        stats[key] = {
            "A":0,
            "S":0,
            "HS":0,
            "Engine":0,
            "FC":0,            
            "MP":0,
            "Weapons":0,
        }
    }
}

function clearAsSelected() {
    $('.asunit').removeClass("asSelected");
}

function getkey(target) {
    return $(target).attr('data-page')+"_"+$(target).attr('data-offset');
}

function isiOS() {
    return !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
}