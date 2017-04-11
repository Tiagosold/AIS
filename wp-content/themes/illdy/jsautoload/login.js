/**
 * Created by tiago on 24/03/2017.
 */
//Função para trazer a página de Login
$(document).ready(function () {
    $(".header-button-one").click(function () {
        $('div.registar_overlay').remove();
        $('#registarJQ').hide();
        $('div.forgotJQ_overlay').remove();
        $('#forgotJQ').hide();
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
        $('div.forgotJQ_overlay').remove();
        $('#forgotJQ').hide();
        $('body').prepend('<div class="registar_overlay"></div>');
        $('#registarJQ').fadeIn(500);
        $('div.registar_overlay, #registarJQ a.close').on('click', function () {
            $('div.registar_overlay').remove();
            $('#registarJQ').hide();
        });
    });

});

//Bring forgotten password layout
$(document).ready(function () {
    $(".forgotJQ").click(function () {
        $('div.login_overlay').remove();
        $('#loginJQ').hide();
        $('body').prepend('<div class="forgotJQ_overlay"></div>');
        $('#forgotJQ').fadeIn(500);
        $('div.forgotJQ_overlay, #forgotJQ a.close').on('click', function () {
            $('div.forgotJQ_overlay').remove();
            $('#forgotJQ').hide();
        });
    });

});

//Bring new password layout
function newPass() {
    $(document).ready(function () {
        $('body').prepend('<div class="newPassJQ_overlay"></div>');
        $('#newPassJQ').fadeIn(500);
        $('div.newPassJQ_overlay, #newPassJQ a.close').on('click', function () {
            $('div.newPassJQ_overlay').remove();
            $('#newPassJQ').hide();
        });
    });
}


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
                    password: $('#password').val(),
                    id: 0
                },
                statusCode: {

                    200: function (response) {
                        jsonData = response;
                        $.get("/wordpress/wp-content/themes/illdy/session.php", {
                                email: jsonData.email,
                                idType: jsonData.idType
                            },
                            function () {
                                window.location.href = '../wordpress/wp-content/themes/illdy/redirect_user.php';
                            });
                    },
                    401: function () {
                        validateInputs($('#lemailmsg'), 'Email não existe!');
                    },
                    404: function () {
                        validateInputs($('#lpasswordmsg'), 'Password incorreta!');
                    },
                    400: function () {
                        console.log();
                    },
                    403: function () {
                        validateInputs($('#lpasswordmsg'), 'Ainda não validou a conta!');
                    },
                    405: function () {
                        validateInputs($('#lpasswordmsg'), 'A conta ainda não foi confirmada pelo administrador!');
                    }
                }
            });

    });

});

//Function to add associates
function addEditAssociate() {
    var random = randomize();
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
                user_type: $('#user_type').val(),
                random: random
            },
            statusCode: {
                201: function () {
                    validateInputs($('#confirmsg'), 'Conta criada com sucesso, aguarde um pouco!');
                    $.post("/wordpress/confirmar-registo", {
                            email: $('#email_register').val(),
                            random: random,
                            regist: 0
                        },
                        function () {
                            $('#validateFirst').append('Enviamos-lhe um email para validar a sua conta!');
                            window.location.href = '/wordpress/confirmar-registo?foo=1';
                        });
                },
                500: function () {
                    validateInputs($('#quotasmsg'), 'Erro a registar!');
                    console.log("BD Error");
                },
                501: function () {
                    validateInputs($('#emailmsg'), 'Email inválido!');
                },
                502: function () {
                    validateInputs($('#quotasmsg'), 'Email e/ou NºAluno já está registado!');
                }
            }
        });
    } else {
        validateInputs($('#confirmmsg'), 'Introduziu passwords diferentes!');
    }
}

//Function to validate fields on register
$(document).ready(function () {
    $('#registo').click(function () {
        var pass = $('#password_register');
        var email = $('#email_register');
        var type = $('#user_type');
        var name = $('#complete_name');
        var count = 0;
        re1 = /[0-9]/;
        re2 = /^[a-z\s]+$/i;
        re3 = /[a-z]/;
        re4 = /^[0-9]+$/;
        //validate email
        if (email.val() === "") {
            validateInputs($('#emailmsg'), 'Introduza um email!');
        } else {
            hideValidation($('#emailmsg'));
            count = count + 1;
        }
        //validate name
        if (name.val() === '') {
            validateInputs($('#namemsg'), 'Introduza o seu nome!');
        } else if (!re2.test(name.val())) {
            validateInputs($('#namemsg'), 'Nome não pode conter números ou carateres especiais!');
        } else {
            hideValidation($('#namemsg'));
            count = count + 1;
        }
        //validate password
        if (pass.val().length < 6) {
            validateInputs($('#passwordmsg'), 'Password deve conter 6 letras no mínimo!');
        } else if (pass.val() == email.val()) {
            validateInputs($('#passwordmsg'), 'Password deve ser diferente do Email!');
        } else if (!re1.test(pass.val())) {
            validateInputs($('#passwordmsg'), 'Password deve conter pelo menos um número!');
        } else if (!re3.test(pass.val())) {
            validateInputs($('#passwordmsg'), 'Password deve conter pelo menos uma letra minúscula!');
        } else {
            hideValidation($('#passwordmsg'));
            count = count + 1;
        }
        //validate phone number
        if (!re4.test($('#regist_phone').val())) {
            validateInputs($('#phonemsg'), 'Introduza um número de telemóvel válido!');
        } else {
            hideValidation($('#phonemsg'));
            count = count + 1;
        }
        //validate user
        if (type.val() === '0') {
            validateInputs($('#usermsg'), 'Selecione o tipo de utilizador!');
        } else {
            hideValidation($('#usermsg'));
            count = count + 1;
        }
        //validate course
        if ($('#course_register').val() === '0') {
            validateInputs($('#coursemsg'), 'Selecione o curso!');
        } else {
            hideValidation($('#coursemsg'));
            count = count + 1;
        }
        //validate student number
        if (!re1.test($('#student_number').val()) && type.val() === '2') {
            validateInputs($('#studentmsg'), 'Introduza um número de aluno válido!');
        } else {
            hideValidation($('#studentmsg'));
            count = count + 1;
        }
        //validate year
        if ($('#year_register').val() === '0' && type.val() === '2') {
            validateInputs($('#yearmsg'), 'Selecione o ano que frequenta!');
        } else {
            hideValidation($('#yearmsg'));
            count = count + 1;
        }
        //validate quotas
        if ($('#quotas').val() === '0' && type.val() === '2') {
            validateInputs($('#quotasmsg'), 'Selecione o número de quotas!');
        } else {
            hideValidation($('#quotasmsg'));
            count = count + 1;
        }
        if (count == 9) {
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
        quotas.empty();
        quotas.append('<option value=0>Número de quotas</option>');
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
        if (course.val() === '1' || course.val() === '2') {
            if (year.val() === '1') {
                quotas.append('<option value=1>1</option>');
                quotas.append('<option value=2>2</option>');
                quotas.append('<option value=3>3</option>');
                quotas.append('<option value=4>4</option>');
                quotas.append('<option value=5>5</option>');
            } else if (year.val() === '2') {
                ;
                quotas.append('<option value=1>1</option>');
                quotas.append('<option value=2>2</option>');
                quotas.append('<option value=4>3</option>');
                quotas.append('<option value=5>4</option>');
            } else if (year.val() === '3') {
                quotas.append('<option value=1>1</option>');
                quotas.append('<option value=2>2</option>');
                quotas.append('<option value=4>3</option>');
            } else if (year.val() === '4') {
                quotas.append('<option value=1>1</option>');
                quotas.append('<option value=2>2</option>');
            } else if (year.val() === '5') {
                quotas.append('<option value=1>1</option>');
            }
        } else if (course.val() === '3') {
            if (year.val() === '1') {
                quotas.append('<option value=1>1</option>');
                quotas.append('<option value=2>2</option>');
            } else if (year.val() === '2') {
                quotas.append('<option value=1>1</option>');
            }
        } else if (course.val() === '4') {
            if (year.val() === '1') {
                quotas.append('<option value=1>1</option>');
                quotas.append('<option value=2>2</option>');
                quotas.append('<option value=3>3</option>');
                quotas.append('<option value=4>4</option>');
            } else if (year.val() === '2') {
                quotas.append('<option value=1>1</option>');
                quotas.append('<option value=2>2</option>');
                quotas.append('<option value=3>3</option>');
            } else if (year.val() === '3') {
                quotas.append('<option value=1>1</option>');
                quotas.append('<option value=2>2</option>');
            } else if (year.val() === '4') {
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
            validateInputs($('#yearmsg'), 'Escolha o curso primeiro!');
        } else {
            hideValidation($('#yearmsg'));
        }
    });
    quotas.click(function () {
        if (course.val() === "0") {
            validateInputs($('#quotasmsg'), 'Escolha o curso primeiro!');
        } else {
            hideValidation($('#quotasmsg'));
        }
        if (year.val() === "0") {
            validateInputs($('#quotasmsg'), 'Escolha o ano primeiro!');
        } else {
            hideValidation($('#quotasmsg'));
        }
    });
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

function validateUser(random) {
    $.ajax({
        type: "POST",
        url: "/wordpress/wp-content/themes/illdy/bd/",
        datatype: "json",
        data: {
            object: 'login',
            function: 'validateUser',
            random: random
        },
        statusCode: {
            201: function () {
                $('#validateShow').append('Conta registada com sucesso!');
            },
            500: function () {
                $('#validateShow').append('Erro a validar a conta');
                console.log("BD Error");
            }
        }
    });
}

$(document).ready(function () {
    $("#forgot").click(function () {
        var jsonData;
        if ($('#email_forgot').val() != '') {
            $.ajax({
                type: "POST",
                url: "/wordpress/wp-content/themes/illdy/bd/",
                datatype: "json",
                data: {
                    object: 'login',
                    function: 'validateLogin',
                    email: $('#email_forgot').val(),
                    id: 1
                },
                statusCode: {
                    200: function (response) {
                        var jsonData = JSON.parse(response);
                        $.post("/wordpress/confirmar-registo", {
                            forgot: '0',
                            email: jsonData.email,
                            random: jsonData.random,
                            idAssociate: jsonData.idAssociate
                        });
                        $('div.forgotJQ_overlay').remove();
                        $('#forgotJQ').hide();
                        $('#dialogOK').text('Enviamos para o seu email o pedido de recuperação de password!');
                        $( "#dialogOK" ).dialog({
                            buttons: {
                                Ok: function () {
                                    $(this).dialog("close");
                                }
                            }
                        });
                    },
                    401: function () {
                        validateInputs($('#femailmsg'), 'Email não existe');
                    }
                }
            });

        } else {
            validateInputs($('#femailmsg'), 'Introduza um email!');
        }
    });
});

$(document).ready(function () {
    $('#newPass').click(function () {
        re1 = /[0-9]/;
        re3 = /[a-z]/;
        var pass = $('#password_register');
        var confirmPass = $('#confirm_password');
        var count = 0;
        if (pass.val() !== confirmPass.val()) {
            validateInputs($('#confirmmsg'), 'Introduziu passwords diferentes');
        } else {
            hideValidation($('#confirmmsg'));
            count = count + 1;
        }
        //validate password
        if (pass.val().length < 6) {
            validateInputs($('#passwordmsg'), 'Password deve conter 6 letras no mínimo!');
        } else if (!re1.test(pass.val())) {
            validateInputs($('#passwordmsg'), 'Password deve conter pelo menos um número!');
        } else if (!re3.test(pass.val())) {
            validateInputs($('#passwordmsg'), 'Password deve conter pelo menos uma letra minúscula!');
        } else {
            hideValidation($('#passwordmsg'));
            count = count + 1;
        }
        if (count == 2) {
            if($('#idNewPass').val() != "") {
                $.ajax({
                    type: "POST",
                    url: "/wordpress/wp-content/themes/illdy/bd/",
                    dataType: 'json',
                    data: {
                        object: 'login',
                        function: 'changePassword',
                        idAssociate: $('#idNewPass').val(),
                        password: $('#password_register').val(),
                        random: $('#randomNewPass').val()
                    },
                    statusCode: {
                        201: function () {
                            $('div.newPassJQ_overlay').remove();
                            $('#newPassJQ').hide();
                            $('#dialogOK').text('Password alterada com sucesso!');
                            $( "#dialogOK" ).dialog({
                                buttons: {
                                    Ok: function () {
                                        $(this).dialog("close");
                                    }
                                }
                            })
                        },
                        500: function () {
                            console.log();
                        },
                        501: function () {
                            console.log()
                        }
                    }
                });
            }else {
                validateInputs($('#confirmmsg'), 'Mudança de password não está associada a nenhuma conta!');
            }
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
