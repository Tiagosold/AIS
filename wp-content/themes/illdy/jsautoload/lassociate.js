/**
 * Created by tiago on 31/03/2017.
 */

function changeState(cont){
        $.ajax(
            {
                type: "POST",
                url: "/wordpress/wp-content/themes/illdy/bd/",
                dataType: 'json',
                data: {
                    object: 'associate',
                    function: 'changeAssociateState',
                    idAssociate: $('#id-associate'+cont).val(),
                    quotas: $('#quotas_admin'+cont).val()
                },
                statusCode: {
                    200: function () {
                        window.alert('Perfil atualizado');
                    },
                    500: function () {
                        alert('Erro na BD');
                    }
                }
            });
}