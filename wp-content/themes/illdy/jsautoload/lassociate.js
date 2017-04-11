/**
 * Created by tiago on 31/03/2017.
 */

function changeState(cont) {
    $.ajax(
        {
            type: "POST",
            url: "/wordpress/wp-content/themes/illdy/bd/",
            dataType: 'json',
            data: {
                object: 'associate',
                function: 'changeAssociateState',
                id: '1',
                idAssociate: $('#id-associate' + cont).val(),
                quotas: $('#quotas_admin' + cont).val()
            },
            statusCode: {
                200: function () {
                    $('#panel-heading').empty();
                    $("#associates_table").empty();
                    $("#panel-body").empty();
                    getAssociates();
                    $('#dialogOK').text('Sócio confirmado com sucesso!');
                    $( "#dialogOK" ).dialog({
                        buttons: {
                            Ok: function () {
                                $(this).dialog("close");
                            }
                        }
                    })
                },
                500: function () {
                    alert('Erro na BD');
                }
            }
        });
}

//Update associate info
function getAssociate(cont) {
    $.ajax({
        type: "POST",
        url: "/wordpress/wp-content/themes/illdy/bd/",
        dataType: 'json',
        data: {
            object: 'associate',
            function: 'getAssociates',
            id: '2',
            idAssociate: $('#id-associate' + cont).val(),
        },
        statusCode:{
            200: function (response){
                var course = $('#course_register');
                var year = $('#year_register');
                $('body').prepend('<div class="updateAssociate_overlay"></div>');
                $('#email_register').val(response[0].email);
                $('#complete_name').val(response[0].nomeUtilizador);
                $('#regist_phone').val(response[0].telemovel);
                $( function() {
                    $( "#initial_date" ).datepicker({
                        changeMonth: true,
                        changeYear: true,
                        dateFormat: "dd-mm-yy"
                    });
                    $( "#final_date").datepicker({
                        changeMonth: true,
                        changeYear: true,
                        dateFormat: "dd-mm-yy"
                    });

                } );
                $('#hiddenID').val($('#id-associate' + cont).val());
                $('#initial_date').val(response[0].dataInicio);
                $('#final_date').val(response[0].dataFinal);
                $('#course_register').val(response[0].idCurso);
                $('#year_register').val(response[0].ano);
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
                $('#student_number').val(response[0].numeroAluno);
                $('#updateAssociate').fadeIn(500);
                $('div.updateAssociate_overlay, #updateAssociate a.close').on('click', function () {
                    $('div.updateAssociate_overlay').remove();
                    $('#updateAssociate').hide();
                });
            },
            500: function (){
                window.alert('Erro na BD');
            }
        }
    });
}

function updateAssociate(){
    $.ajax({
        type: "POST",
        url: "/wordpress/wp-content/themes/illdy/bd/",
        dataType: 'json',
        data: {
            object: 'login',
            function: 'addEditAssociate',
            id: '2',
            idAssociate: $('#hiddenID').val(),
            email: $('#email_register').val(),
            name: $('#complete_name').val(),
            phone: $('#regist_phone').val(),
            student_number: $('#student_number').val(),
            initialDate: $('#initial_date').val(),
            finalDate: $('#final_date').val(),
            course: $('#course_register').val(),
            year: $('#year_register').val()
        },
        statusCode: {
            201: function () {
                $('#panel-heading').empty();
                $("#associates_table").empty();
                $("#panel-body").empty();
                getAssociates();
                $('div.updateAssociate_overlay').remove();
                $('#updateAssociate').hide();
                $('#dialogOK').text('Perfil atualizado com sucesso!');
                $( "#dialogOK" ).dialog({
                    buttons: {
                        Ok: function () {
                            $(this).dialog("close");
                        }
                    }
                })
            },
            500: function () {
                validateInputs($('#yearmsg'), 'Erro no registo!');
                console.log("BD Error");
            },
            501: function () {
                validateInputs($('#emailmsg'), 'Introduziu um email inválido!');
            },
            502: function () {
                validateInputs($('#emailmsg'), 'Email já existe!');            }
        }
    });
}
$(document).ready(function () {
    $("#update").click(function () {
        var email = $('#email_register');
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
        //validate phone number
        if (!re4.test($('#regist_phone').val())) {
            validateInputs($('#phonemsg'), 'Introduza um número de telemóvel válido!');
        } else {
            hideValidation($('#phonemsg'));
            count = count + 1;
        }
        //validate student number
        if (!re1.test($('#student_number').val())) {
            validateInputs($('#studentmsg'), 'Introduza um número de aluno válido!');
        } else {
            hideValidation($('#studentmsg'));
            count = count + 1;
        }
        //validate course
        if ($('#course_register').val() === '0') {
            validateInputs($('#coursemsg'), 'Selecione o curso!');
        } else {
            hideValidation($('#coursemsg'));
            count = count + 1;
        }
        //validate year
        if ($('#year_register').val() === '0') {
            validateInputs($('#yearmsg'), 'Selecione o ano que frequenta!');
        } else {
            hideValidation($('#yearmsg'));
            count = count + 1;
        }
        if (count == 6) {
            updateAssociate();
        }
    });
});
