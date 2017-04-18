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
                bringYear(course, year);
/*           course.change(function () {
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
                */
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

function updateAssociate(int){
    if(int == 2) {
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
                    $("#dialogOK").dialog({
                        buttons: {
                            Ok: function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                },
                500: function () {
                    validateInputs($('#yearmsg'), 'Erro no registo!');
                    console.log("BD Error");
                },
                501: function () {
                    validateInputs($('#emailmsg'), 'Introduziu um email inválido!');
                },
                502: function () {
                    validateInputs($('#emailmsg'), 'Email já existe!');
                }
            }
        });
    }else if(int == 1) {
        $.ajax({
            type: "POST",
            url: "/wordpress/wp-content/themes/illdy/bd/",
            dataType: 'json',
            data: {
                object: 'login',
                function: 'addEditAssociate',
                id: '1',
                idAssociate: $('#hiddenAssociateId').val(),
                email: $('#email_register').val(),
                name: $('#complete_name').val(),
                phone: $('#regist_phone').val(),
                student_number: $('#student_number').val(),
                course: $('#course_register').val(),
                year: $('#year_register').val()
            },
            statusCode: {
                201: function () {
                    $('div.profile_overlay').remove();
                    $('#profile-information').hide();
                    $('#userBody').empty();
                    $('.panel-title').empty();
                    $('#dialog-associate').text('Perfil atualizado com sucesso!');
                    $("#dialog-associate").dialog({
                        buttons: {
                            Ok: function () {
                                $(this).dialog("close");
                                $('body').prepend('<div class="profile_overlay"></div>');
                                $('#edit-clear').css('display', 'inline');
                                $('#confirm-info').css('display', 'none');
                                $('div.profile_overlay').on('click', function () {
                                    $('div.profile_overlay').remove();
                                    $('#profile-information').hide();
                                });
                                getUserInfo();
                            }
                        }
                    });
                },
                500: function () {
                    validateInputs($('#yearmsg'), 'Erro no registo!');
                    console.log("BD Error");
                },
                501: function () {
                    validateInputs($('#emailmsg'), 'Introduziu um email inválido!');
                },
                502: function () {
                    validateInputs($('#emailmsg'), 'Email já existe!');
                }
            }
        });
    }
}

//For user Associate
function getUserInfo(){
    var jsonData;
    if($('#hiddenControl').val() != '') {
        $('#userBody').empty();
        $('#image-place').empty();
        $.ajax({
            type: "POST",
            url: "/wordpress/wp-content/themes/illdy/bd/",
            dataType: 'json',
            data: {
                object: 'associate',
                function: 'getAssociates',
                id: '2',
                idAssociate: $('#hiddenAssociateId').val()
            },
            statusCode: {
                200: function (response) {
                    jsonData = response[0];
                    $('.panel-title').text(jsonData.nomeUtilizador);
                    if(jsonData.imagem != null && jsonData.imagem != ''){
                        $('#image-place').append('<img alt="User Pic" src="wp-content/themes/illdy/uploads/'+jsonData.imagem+'" class="img-circle img-responsive" style="width:75px; height:75px">')
                    }else{
                        $('#image-place').append('<img alt="User Pic" src="wp-content/themes/illdy/uploads/default.png" class="img-circle img-responsive" style="width:75px; height:75px">');
                    }
                    $('#userBody').append('<tr><td>Email:</td><td id="email_register">' + jsonData.email + '</td></tr>');
                    $('#userBody').append('<tr><td>Curso:</td><td id="coursee_register"><input hidden id="hiddenCourse" value="'+jsonData.idCurso+'">' + jsonData.designacao + '</td></tr>');
                    $('#userBody').append('<tr><td>NºEstudante:</td><td id="student_number">' + jsonData.numeroAluno + '</td></tr>');
                    $('#userBody').append('<tr><td>Ano:</td><td id="yearr_register"><input hidden id="hiddenYear" value="'+jsonData.ano+'">' + jsonData.ano + 'º ano</td></tr>');
                    $('#userBody').append('<tr><td>Telemóvel:</td><td id="regist_phone">' + jsonData.telemovel + '</td></tr>');
                    $('#userBody').append('<tr><td>Sócio desde:</td><td>' + jsonData.dataInicio + '</td></tr>');
                    $('#userBody').append('<tr><td>Sócio até:</td><td>' + jsonData.dataFinal + '</td></tr>');
                    $('#confirm-info').css('display','none');
                    $('#profile-information').fadeIn(500);
                    $('#hiddenControl').val('');
                },
                500: function () {
                    alert('Não foi possivel carregar os dados');
                }
            }
        });
    }else {
        $('#profile-information').fadeIn(500);
    }
}

//Bring edit Associate for USER ASSOCIATE
$(document).ready(function(){
   $('#edit-button').click(function(){
       $('#hiddenControl').val('something');
       var name = $('.panel-title').text();
       var email = $('#email_register').text();
       var course = $('#hiddenCourse').val();
       var numberS = $('#student_number').text();
       var year = $('#hiddenYear').val();
       var phone = $('#regist_phone').text();
       $('.panel-title').empty();
       $('#confirm-info').css('display', 'inline');
       $('#edit-clear').css('display', 'none');
       $('.panel-title').append('<input id="complete_name" type="text" value="'+name+'"><div id="namemsg" style="color:Red; font-size:75%; display:none"></div>');
       $('#userBody').empty();
       $('#userBody').append('<tr><td style="vertical-align:middle;">Email:</td><td><input id="email_register" type="email" value="'+email+'"><div id="emailmsg" style="color:Red; font-size:75%; display:none"></div> </td></tr>');
       $('#userBody').append('<tr><td style="vertical-align:middle;">Curso:</td><td id="coursee_register"><div class="select-style"><select id="course_register"> <option value="0">Selecione o curso que frequenta</option> <option value="1">MIEGSI</option> <option value="2">MIEGSI-PL</option> <option value="3">MSI</option> <option value="4">PDTSI</option> </select></div>    <div id="coursemsg" style="color:Red; font-size:75%; display:none"></div> </td></tr>');
       $('#course_register').val(course);
       $('#userBody').append('<tr><td style="vertical-align:middle;">NºEstudante:</td><td><input id="student_number" type="text" value="'+numberS+'"> <div id="studentmsg" style="color:Red; font-size:75%; display:none"></div> </td></tr>');
       $('#userBody').append('<tr><td style="vertical-align:middle;">Ano:</td><td id="yearr_register"><div class="select-style"><select id="year_register" placeholder="Ano" name="ano"><option value="0">Ano que frequenta</option><option value="1">1º</option><option value="2">2º</option><option value="3">3º</option><option value="4">4º</option> <option value="5">5º</option></select></div>    <div id="yearmsg" style="color:Red; font-size:75%; display:none"></div> </td></tr>');
       $('#year_register').val(year);
       bringYear($('#course_register'), $('#year_register'));
       $('#userBody').append('<tr><td style="vertical-align:middle;">Telemóvel:</td><td><input id="regist_phone" type="tel" value="'+phone+'"><div id="phonemsg" style="color:Red; font-size:75%; display:none"></div></td> </tr>');
       confirmation(1);
   });
});

//update associate information ADMIN SIDE
$(document).ready(function () {
    $("#update").click(function () {
        validateAssociate(2);
    });
});


//Validate associate update fields
function validateAssociate(int) {
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
        updateAssociate(int);
    }
}

//confirm changes ASSOCIATE SIDE
function confirmation(int) {
    $('body').confirmation({
        selector: '[data-toggle="confirmation"]',
        title: 'Tens a certeza?',
        placement: 'left',
        btnOkLabel: 'Sim',
        btnCancelLabel: 'Não',
        onConfirm: function (event) {
            validateAssociate(int)
        }
    });
}

//Go back to profile
$(document).ready(function(){
   $('#profile-again').click(function(){
       $('#profile-information').hide();
       $('#edit-clear').css('display', 'inline');
       getUserInfo();
   });
});

//Change image
$(document).on('change', ':file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
    $('#image-selected').empty();
    $(':file').on('fileselect', function(event, numFiles, label) {
        if(numFiles == 1) {
            $('#image-selected').text(label);
            $('#change-image').css('display', 'inline');
        }else {
            alert('Selecione só um ficheiro!');
        }
    });
});

$(document).ready(function() {
    $('form').ajaxForm(function() {
        $('#hiddenControl').val('hello');
        $('#profile-information').hide();
        $('#change-image').css('display', 'none');
        $('#image-selected').text('');
        getUserInfo();
    });
});