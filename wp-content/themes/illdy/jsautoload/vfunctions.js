/**
 * Created by tiago on 09/04/2017.
 */

function validateInputs(id, text) {
    id.text('* ' + text);
    id.css('display', 'inline');
}

function hideValidation(id) {
    id.text('');
    id.css('display', 'hidden');
}

//random string
function randomize() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

$(document).keyup(function (e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        $('div.login_overlay').remove();
        $('#loginJQ').hide();
        $('div.registar_overlay').remove();
        $('#registarJQ').hide();
        $('div.forgotJQ_overlay').remove();
        $('#forgotJQ').hide();
        $('div.updateAssociate_overlay').remove();
        $('#updateAssociate').hide();
        $('div.profile_overlay').remove();
        $('#profile-information').hide();
    }
});

//Bring User profile

$(document).ready(function () {
    $('.perfil.menu-item a').mouseover(function () {
        $('#edit-clear').css('display', 'inline');
        getUserInfo();
        $('body').prepend('<div class="profile_overlay"></div>');
        $('[data-toggle="tooltip"]').tooltip();
        $('div.profile_overlay').on('click', function () {
            $('div.profile_overlay').remove();
            $('#profile-information').hide();
        });
    });
});


function bringYear(course, year) {
    course.change(function () {
        year.empty();
        year.append('<option value="0">Ano que frequenta</option>');
        if (course.val() === '1' || course.val() === '2') {
            year.append('<option value=1>1º</option>');
            year.append('<option value=2>2º</option>');
            year.append('<option value=3>3º</option>');
            year.append('<option value=4>4º</option>');
            year.append('<option value=5>5º</option>');
        } else if (course.val() === '3') {
            year.append('<option value=1>1º</option>');
            year.append('<option value=2>2º</option>');
        } else if (course.val() === '4') {
            year.append('<option value=1>1º</option>');
            year.append('<option value=2>2º</option>');
            year.append('<option value=3>3º</option>');
            year.append('<option value=4>4º</option>');
        }
    });
}


