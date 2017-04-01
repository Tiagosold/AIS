/**
 * Created by tiago on 24/03/2017.
 */

function myFunction() {
    window.alert('Teste');
}
$(document).ready(function () {
    $("#login").click(function () {
        var jsonData;
        window.alert("hello");
        var para = document.createElement("p");
        var node = document.createTextNode("This is new.");
        para.appendChild(node);

        $.ajax(
            {
                type: "POST",
                url: "http://localhost/wordpress/wp-content/themes/illdy/bd/functions/login.php",
                dataType: 'json',
                data: {
                    //object: 'login',
                    //function: 'validateLogin',
                    email: $('#email').val(),
                    password: $('#password').val();

                }
                statusCode: {
                    200: function(response){
                        jsonData = response;
                        $.get("http://localhost/wordpress/wp-content/themes/illdy/session.php", {
                                email:jsonData.email,
                                idType:jsonData.idType,
                            //    idPatient: jsonData.idPatient,
                            //    healthProfessional: jsonData.healthProfessional,
                            //    idHealthProfessional: jsonData.idHealthProfessional,
                            //    name:jsonData.name,
                            //    lastName: jsonData.lastName,
                            //    developmentProfessional: jsonData.developmentProfessional
                            },
                            function(){
                                window.location.href = 'http://localhost/wordpress/quem-somos/';
                            });

                    },
                    401: function(){
                        alert("Password Incorreta");
                    },
                    404: function(){
                        alert("E-mail Incorreto");
                    },
                    400: function(){
                        console.log("");
                    }
                }

            });

    });

});
