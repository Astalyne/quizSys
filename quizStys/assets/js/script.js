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
    $('#chooseQuiz').addClass("hide")
    $('#quizpromo').addClass("hide")
    $('#firstQuiz').removeClass("hide")

}