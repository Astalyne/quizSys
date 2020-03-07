$(document).ready(function () {

    $('#stid').on('input', function () {
        if (checkContactDetails())
            $('#addbtn').removeClass("hide")
        else
            $('#addbtn').addClass("hide")

    });
});
function checkContactDetails() {
    var name = $('#stid').val();
    var nameTest = new RegExp(/^[a-zA-Z0-9 ]{8,10}$/);
    var nameResult = nameTest.test(name);

    if (nameResult == false) {
        $('#badinput').removeClass("hide")
    }
    else {
        $('#badinput').addClass("hide")


        return true;
    }

}
function startQuiz1() {
    window.location.replace("quiz1.html");

}
var i = 1;

startTimer("2:01");


var last = false,
    checked = false;

fetchQuestion1();
clearOtherSections('.group-one');
var totalScores = [0, 0, 0]
function nextq() {
    var questionList = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];


    if (i >= 1 && i < 5) {

        $('.' + questionList[i - 1]).addClass('hide');

        i++;
        $('.' + questionList[i - 1]).removeClass('hide');
        fetchQuestion1();
    }
    else if (i >= 6 && i < 8) {
        $('.' + questionList[i - 1]).addClass('hide');

        i++;
        $('.' + questionList[i - 1]).removeClass('hide');
        fetchQuestion2();
    }
    else if (i >= 9 && i < 10) {
        $('.' + questionList[i - 1]).addClass('hide');

        i++;
        $('.' + questionList[i - 1]).removeClass('hide');
    }
};

function prevq() {
    var questionList = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];

    if (i > 1 && i <= 5) {
        $('.' + questionList[i - 1]).addClass('hide');
        $('.' + questionList[i - 2]).removeClass('hide');

        i--;

        fetchQuestion1();
    }
    else if (i > 6 && i <= 8) {
        $('.' + questionList[i - 1]).addClass('hide');
        $('.' + questionList[i - 2]).removeClass('hide');

        i--;
        fetchQuestion2();
    }
    else if (i > 9 && i <= 10) {
        $('.' + questionList[i - 1]).addClass('hide');
        $('.' + questionList[i - 2]).removeClass('hide');

        i--;
        fetchQuestion3();
    }
};

function fetchQuestion1() {

    var questionList = ['question1', 'question2', 'question3', 'question4', 'question5'];
    var q1Answers = ['Hydrogen Sulphide', 'Oxygen', 'Carbon Dioxide', 'Nitrogen'];
    var q2Answer = ['Bromine', 'Phosporous', 'Chlorine', 'Hellium'];
    var q3Answers = ['Magnesium', 'Copper', 'Iron', 'Calcium'];
    var q4Answers = ['Graphite', 'Sillicon', 'Charcoal', 'Phosphorous'];
    var q5Answers = ['Mercury', 'Tin', 'Lead', 'Zinc'];
    var allAnswers = [q1Answers, q2Answer, q3Answers, q4Answers, q5Answers];

    clearOtherSections('.group-one');

}

function fetchQuestion2() {
    clearOtherSections('.group-two');


}

function fetchQuestion3() {
    clearOtherSections('.group-three');
    /* -------- Making answers draggable -------- */
    $(".draggable").draggable();
    chosenAnswers = []; // clear previous answers (if any)
    $(".droppable").droppable({
        drop: function (event, ui) {
            chosenAnswers.push(Number(ui.draggable.attr("value")));
            $(this).addClass("ui-state-highlight")
        },
        out: function (event, ui) {
            chosenAnswers.pop();
            $(this).removeClass("ui-state-highlight")
        }
    });

}

function clearOtherSections(groupNumber) {
    $(".group-one, .group-two, .group-three").css('display', 'none');
    $(groupNumber).css('display', 'block');
}



function startTimer(time) {
    var interval = setInterval(function () {
        var timer = time.split(':');
        var minutes = parseInt(timer[0], 10);
        var seconds = parseInt(timer[1], 10);

        --seconds;
        minutes = (seconds < 0) ? --minutes : minutes;

        if (minutes < 0) {
            nextSection();
            last = false;
            checked = false;
            return clearInterval(interval);
        }

        seconds = (seconds < 0) ? 59 : seconds;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        //minutes = (minutes < 10) ?  minutes : minutes;
        $('.countdown').html(minutes + ':' + seconds);
        time = minutes + ':' + seconds;
    }, 1000);

}

function nextSection() {
    // if (in first section) => second section
    if (i < 6) {
        i = 6;
        fetchQuestion2();
        startTimer("2:01");
    }

    // if (in second section) => third section
    else if (i < 9) {
        i = 9;
        fetchQuestion3();
        startTimer("1:01");
    }

    else {
        getAnswers()

    }
}
function getAnswers() {
    var g1 = 0;
    var g2 = 0;
    var g2 = 0;

    if ($('#rb1').is(':checked')) {
        g1++;
    }

    if ($('#rb21').is(':checked')) {
        g1++;
    }
    if ($('#rb31').is(':checked')) {
        g1++;
    }
    if ($('#rb41').is(':checked')) {
        g1++;
    }
    if ($('#rb51').is(':checked')) {
        g1++;
    }
    totalScores[0] = g1;

    if ($('#cb1').is(':checked')) {
        g2++;
    }
    if ($('#cb12').is(':checked')) {
        g2++;
    }

    if ($('#cb21').is(':checked')) {
        g2++;
    }
    if ($('#cb22').is(':checked')) {
        g2++;
    }

    if ($('#cb31').is(':checked')) {
        g2++;
    }
    if ($('#cb32').is(':checked')) {
        g2++;
    }
    totalScores[1] = g2;
    totalScores[2] = 2;
    result(totalScores)

}
function result(totalScores) {

    setTimeout(function () {
        window.location.href = "done.html";
    }, 2000);

}
var total = totalScores[0] + totalScores[1] + totalScores[2]

$("#points").html(total);


function printAndSend() {



    Email.send({
        SecureToken: "bc2ae3d3-3de5-47ab-8683-ec4953efa355",
        To: $('#email').val,
        From: "virqsaud@gmail.com",
        Subject: "Your total score",
        Body: "Greetings " + "!\n This is your Score.\n" + "14/18"
    });

    window.print();
    alert("Email is sent successfully.");



}