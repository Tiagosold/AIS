<?php
/**
 * Created by PhpStorm.
 * User: tiago
 * Date: 31/03/2017
 * Time: 15:51
 */
require_once dirname(__FILE__) . '/../connection/dbconnect.php';

function changeAssociateState($params){
    $response = array();
    $idAssociate = $params['idAssociate'];
    $quotas = $params['quotas'];
    $date = date('d-m-Y');
    $state = 1;
    $finalData = date('d-m-Y', strtotime('+ '.$quotas.' years'));

    $connection = dbConnect();
    $query = "UPDATE utilizador SET estado='$state', dataInicio='$date', dataFinal='$finalData' WHERE idUtilizador='$idAssociate';";
    $result = mysql_query($query, $connection) or die(mysql_error());

    if($result){
        $response['cod'] = 200;
        $response['error'] = FALSE;
        $response['msg'] = mysql_insert_id();
    }else {
        $response['cod'] = 500;
        $response['error'] = TRUE;
        $response['msg'] = mysql_error($connection);
    }
}

function getAssociates($params){
    $response = array();

    $connection = dbConnect();
    $query = "Select * From utilizador, curso Where utilizador.idCurso = curso.idcurso ";
    $result = mysql_query($query, $connection) or die(mysql_error());

    if ($result) {
        while ($associate = mysql_fetch_array($result)) {
            $response[] = $associate;
        }
        $response['cod'] = 200;
    } else {
        $response['cod'] = 500;
        $response['error'] = TRUE;
        $response['msg'] = mysql_error($conn);
    }
    return $response;
}