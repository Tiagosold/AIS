/**
 * Created by tiago on 24/03/2017.
 */
//Função para trazer a página de Login
$(document).ready(function () {
    $(".header-button-one").click(function () {
        $('div.registar_overlay').remove();
        $('#registarJQ').hide();
        $('body').prepend('<div class="login_overlay"></div>');
        $('#loginJQ').fadeIn(500);
        $('div.login_overlay, #loginJQ a.close').on('click', function () {
            $('div.login_overlay').remove();
            $('#loginJQ').hide();
        });

    });

});

//Função para trazer a página de Registar
$(document).ready(function () {
    $(".registarJQ").click(function () {
        $('div.login_overlay').remove();
        $('#loginJQ').hide();
        $('body').prepend('<div class="registar_overlay"></div>');
        $('#registarJQ').fadeIn(500);
        $('div.registar_overlay, #registarJQ a.close').on('click', function () {
            $('div.registar_overlay').remove();
            $('#registarJQ').hide();
        });
    });

});

//Função para os utilizadores iniciarem sessão
$(document).ready(function () {
    $("#login").click(function () {
        var jsonData;
        $.ajax(
            {
                type: "POST",
                url: "/wordpress/wp-content/themes/illdy/bd/",
                dataType: 'json',
                data: {
                    object: 'login',
                    function: 'validateLogin',
                    email: $('#email').val(),
                    password: $('#password').val()
                },
                statusCode: {

                    200: function (response) {

                        jsonData = response;
                        $.get("/wordpress/wp-content/themes/illdy/session.php", {
                                email: jsonData.email,
                                idType: jsonData.idType
                            },
                            function () {
                                window.location.href = '/wordpress/';
                            });

                    },
                    401: function () {
                        alert('Email não existe');
                    },
                    404: function () {
                        alert('Password incorreta');
                    },
                    400: function () {
                        console.log("");
                    }
                }
            });

    });

});

//Function to add associates
function addEditAssociate() {
    if ($('#password_register').val() === $('#confirm_password').val()) {
        $.ajax({
            type: "POST",
            url: "/wordpress/wp-content/themes/illdy/bd/",
            datatype: "json",
            data: {
                object: 'login',
                function: 'addEditAssociate',
                id: '0',
                email: $('#email_register').val(),
                password: $('#password_register').val(),
                phone: $('#regist_phone').val(),
                course: $('#course_register').val(),
                year: $('#year_register').val(),
                quotas: $('#quotas').val(),
                name: $('#complete_name').val(),
                student_number: $('#student_number').val(),
                user_type: $('#user_type').val()
            },
            statusCode: {
                201: function () {
                    alert('Conta registada com sucesso, aguarde confirmação do administrador');
                },
                500: function () {
                    window.alert('Erro no registo');
                    console.log("BD Error");
                },
                501: function () {
                    window.alert('Email inválido');
                },
                502: function () {
                    window.alert('Email já está registado');
                }
            }
        });
    } else {
        window.alert('Introduziu passwords diferentes');
    }
}

//Function to confirm data on register
$(document).ready(function () {
    $('#registo').click(function () {
        var pass = $('#password_register');
        var email = $('#email_register');
        var type = $('#user_type');
        re1 = /[0-9]/;
        re2 = /[a-z]/;
        if (email.val() === "") {
            window.alert('Introduza um email');
        } else if ($('#complete_name').val() === '') {
            window.alert('Erro: Introduza o seu nome');
        } else if (pass.val().length < 6) {
            alert("Erro: Password deve conter 6 letras no mínimo!");
            pass.focus();
        } else if (pass.val() == email.val()) {
            alert("Erro: Password deve ser diferente da email!");
            pass.focus();
        } else if (!re1.test(pass.val())) {
            alert("Erro: Password deve conter, no mínimo, um número!");
            pass.focus();
        } else if (!re2.test(pass.val())) {
            alert("Erro: Password deve conter, no mínimo, uma letra minuscula!");
            pass.focus();
        } else if (type.val() === '0') {
            window.alert('Erro: Introduza o tipo de utilizador!');
        } else if ($('#course_register').val() === '0') {
            window.alert('Erro: Não introduziu o curso');
        } else if ($('#student_number').val() === '' && type.val() === '1') {
            window.alert('Erro: Introduza um número de aluno');
        } else if ($('#year_register').val() === '0' && type.val() === '1') {
            window.alert('Erro: Introduza o ano que frequenta');
        } else if ($('#quotas').val() === '0' && type.val() === '1') {
            window.alert('Erro: Introduza o número de quotas');
        } else {
            addEditAssociate();
        }
    });
});

//Função para box do Ano
$(document).ready(function () {
    var course = $('#course_register');
    var year = $('#year_register');
    var quotas = $('#quotas');
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
    })
});

//Mudar box quotas
$(document).ready(function () {
    var course = $('#course_register');
    var year = $('#year_register');
    var quotas = $('#quotas');
    year.change(function () {
        quotas.empty();
        quotas.append('<option value=0>Número de quotas</option>');
        quotas.append('<option value=1>1</option>');
        quotas.append('<option value=2>2</option>');
        if (course.val() === '1' || course.val() === '2') {
            if (year.val() === '1') {
                quotas.append('<option value=3>3</option>');
                quotas.append('<option value=4>4</option>');
                quotas.append('<option value=5>5</option>');
            } else if (year.val() === '2') {
                quotas.append('<option value=4>3</option>');
                quotas.append('<option value=5>4</option>');
            } else if (year.val() === '3') {
                quotas.append('<option value=4>3</option>');
            } else if (year.val() === '5') {
                quotas.empty();
                quotas.append('<option value=0>Número de quotas</option>');
                quotas.append('<option value=1>1</option>');
            }
        } else if (course.val() === '3') {
            if (year.val() === '2') {
                quotas.empty();
                quotas.append('<option value=0>Número de quotas</option>');
                quotas.append('<option value=1>1</option>');
            }
        } else if (course.val() === '4') {
            if (year.val() === '1') {
                quotas.append('<option value=3>3</option>');
                quotas.append('<option value=4>4</option>');
            } else if (year.val() === '2') {
                quotas.append('<option value=4>3</option>');
            } else if (year.val() === '4') {
                quotas.empty();
                quotas.append('<option value=0>Número de quotas</option>');
                quotas.append('<option value=1>1</option>');
            }
        }
    })
});

$(document).ready(function () {
    var course = $('#course_register');
    var year = $('#year_register');
    var quotas = $('#quotas');
    year.click(function () {
        if (course.val() === "0") {
            window.alert('Escolha o curso primeiro!');
        }
    });
    quotas.click(function () {
        if (course.val() === "0") {
            window.alert('Escolha o curso primeiro!');
        } else if (year.val() === "0") {
            window.alert('Escolha o ano primeiro!');
        }
    });
});

$(document).keyup(function (e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        $('div.login_overlay').remove();
        $('#loginJQ').hide();
        $('div.registar_overlay').remove();
        $('#registarJQ').hide();
    }
});

$(document).ready(function () {
    var type = $('#user_type');
    type.change(function () {
        if (type.val() === '2') {
            $('.hidden-div').fadeIn(500);
        //    $('#registarJQ .close').css('margin', '-615px 0 0 175px');
        } else if (type.val() === '3') {
            $('.hidden-div').fadeOut(0);
            $('#student_number').val("");
            $('#year_register').val("0");
            $('#quotas').val("0");
       //     $('#registarJQ .close').css('margin', '-483px 0px 0 175px');
        }
    });
});

/*function hide(){
 var year = document.getElementById('year_register');
 var quotas = document.getElementById('quotas');
 year.style.visibility = 'hidden';
 quotas.style.visibility = 'hidden';
 }

 function show(){
 var year = document.getElementById('year_register');
 var quotas = document.getElementById('quotas');
 year.style.visibility = 'visible';
 quotas.style.visibility = 'visible';
 }*/
