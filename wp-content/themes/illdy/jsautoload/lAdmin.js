/**
 * Created by tiago on 31/03/2017.
 */

$(document).ready(function () {
    $('.panel-default').css("visibility", "hidden");
    $("#partners_view").on('click', function () {
        if($('.panel-default').css('visibility') == 'visible'){
            $('.panel-default').css("visibility", "hidden");
        }else {
            $('#panel-heading').empty();
            $("#associates_table").empty();
            $("#panel-body").empty();
            getAssociates();
        }
    });
});

function getAssociates() {
    var estado;
    var teste;
    $.ajax({
        type: "POST",
        url: "/wordpress/wp-content/themes/illdy/bd/",
        dataType: 'json',
        data: {
            object: 'associate',
            function: 'getAssociates'
        },
        statusCode: {
            200: function(response){
                $('#panel-heading').append('<h3 class="panel-title">Sócios</h3>');
                $("#panel-body").append('<table id="associates_table" class="table table-striped table-hover"></table>');
                $("#associates_table").append('<thead><tr id="hello"></tr></thead>');
                var titles = ['Nome', 'NºAluno', 'Email', 'Telemóvel', 'Ano', 'Curso', 'Inicio', 'Fim', 'Estado'];
                var counting = 0;
                for (i=0; i<titles.length;i++) {
                    $('#hello').append('<th>'+titles[i]+'</th>');
                }
                $("#associates_table").append('<tbody id=bodyT></tbody>');
                for (i=0; i<response.length;i++){
                    $('#bodyT').append('<tr id="associate'+counting+'"></tr>');
                    $('#associate'+counting).append('<td style="width:17.5%">'+response[i].nomeUtilizador+'</td>');
                    $('#associate'+counting).append('<td style="width:6%">'+response[i].numeroAluno+'</td>');
                    $('#associate'+counting).append('<td style="width:22.5%">'+response[i].email+'</td>');
                    $('#associate'+counting).append('<td style="width:9%">'+response[i].telemovel+'</td>');
                    $('#associate'+counting).append('<td style="width:5%">'+response[i].ano+'º</td>');
                    $('#associate'+counting).append('<td style="width:8%">'+response[i].designacao+'</td>');
                    $('#associate'+counting).append('<td style="width:9%">'+response[i].dataInicio+'</td>');
                    $('#associate'+counting).append('<td style="width:9%">'+response[i].dataFinal+'</td>');
                    if(response[i].estado === '1'){
                        estado = '<span class="glyphicon glyphicon-ok" aria-hidden="true">';
                    }else {
                        estado = '<button id="validateAssociate"'+counting+' type="button" onclick="changeState('+counting+')"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';
                    }
                    $('#associate'+counting).append('<td style="width:7%">'+estado+'</td>');
                    $('#associate'+counting).append('<input id="'+counting+'" type="hidden" value="'+counting+'"/>')
                    $('#associate'+counting).append('<input id="quotas_admin'+counting+'" type="hidden" value="'+response[i].numeroCotas+'"/>')
                    $('#associate'+counting).append('<input id="id-associate'+counting+'" type="hidden" value="'+response[i].idUtilizador+'"/>')
                    counting++;
                }
                $('#associates_table').DataTable({
                    "pageLength": 10,
                    "language": {
                        "lengthMenu": "Mostrar _MENU_ registos por página",
                        "zeroRecords": "Nenhum registo encontrado",
                        "info": "Página _PAGE_ de _PAGES_",
                        "infoEmpty": "Nenhum registo disponivel",
                        "infoFiltered": "(Filtrado de _MAX_ registos)",
                        "paginate": {
                            "previous": "Anterior",
                            "next": "Próximo"
                        },
                        "search": "Pesquisa"
                    }
                });
                $('.panel-default').css("visibility", "visible");
            },
            500: function(response){
                window.alert(response.msg);
            }
        }
    });
}