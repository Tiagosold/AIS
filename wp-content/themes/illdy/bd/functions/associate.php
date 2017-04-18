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
    $id = $params['id'];

    $connection = dbConnect();
    if($id == 1) {
        $quotas = $params['quotas'];
        $date = date('d-m-Y');
        $state = 1;
        $finalData = date('d-m-Y', strtotime('+ '.$quotas.' years'));
        $query = "UPDATE utilizador SET estado='$state', dataInicio='$date', dataFinal='$finalData' WHERE idUtilizador='$idAssociate';";
    }elseif($id == 2){
        $image = $params['image'];
        $query = "UPDATE utilizador SET imagem='$image' WHERE idUtilizador='$idAssociate';";
    }
    $result = mysqli_query($connection,$query) or die(mysqli_error($connection));

    if($result){
        $response['cod'] = 200;
        $response['error'] = FALSE;
        $response['msg'] = 'All good';
    }else {
        $response['cod'] = 500;
        $response['error'] = TRUE;
        $response['msg'] = mysqli_error($connection);
    }
}

function getAssociates($params){
    $response = array();
    $id = $params['id'];
    $connection = dbConnect();
    if($id == 1) {
        $query = "Select * From utilizador, curso Where utilizador.idCurso = curso.idcurso and idTipoUtilizador = 2 ";
    }elseif($id == 2) {
        $idAssociate = $params['idAssociate'];
        $query = "Select * From utilizador, curso Where utilizador.idCurso = curso.idcurso and idUtilizador = $idAssociate";
    }
    $result = mysqli_query($connection,$query) or die(mysqli_error($connection));

    if ($result) {
        while ($associate = mysqli_fetch_array($result)) {
            $response[] = $associate;

        }$response['cod'] = 200;
    } else {
        $response['cod'] = 500;
        $response['error'] = TRUE;
        $response['msg'] = mysqli_error($connection);
    }
    return $response;
}