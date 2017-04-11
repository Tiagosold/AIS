/**
 * Created by tiago on 09/04/2017.
 */

function validateInputs(id, text){
    id.text('* ' + text);
    id.css('display','inline');
}

function hideValidation(id){
    id.text('');
    id.css('display','hidden');
}

//random string
function randomize()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 15; i++ )
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
    }
});