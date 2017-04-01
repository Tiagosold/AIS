<?php
/**
 * Created by PhpStorm.
 * User: tiago
 * Date: 20/03/2017
 * Time: 23:32
 */

require_once dirname(__FILE__) . '/../connection/dbconnect.php';

function validateLogin($params)
{
    $response = array();
    $email = $params['email'];
    $pass = $params['password'];
    $conn = dbConnect();
    $query = "SELECT * FROM utilizador WHERE email='$email'";
    $result = mysql_query($query, $conn) or die(mysql_error());

    if (mysql_num_rows($result) === 1) {
        $fetch = mysql_fetch_array($result);
        $dbPass = $fetch['password'];
        $idType = $fetch['idTipoUtilizador'];
   //     $name = $fetch['name'];
   //     $lastName = $fetch['lastName'];
        $email = $fetch['email'];
        if ($dbPass == $pass) {
            $response['msg'] = "validation success";
            $response['error'] = FALSE;
            $response['idType'] = $idType;
    //        $response['name'] = $name;
            $response['email'] = $email;
    //        $response['lastName'] = $lastName;
            $response['cod'] = 200;

        }else {
            $response['msg'] = "validation fail";
            $response['error'] = TRUE;
            $response['cod'] = 404;
        }
    }else {
        $response['msg'] = "validation fail";
        $response['error'] = TRUE;
        $response['cod'] = 401;

    }
    mysql_close($conn);
    return $response;
}

function addEditAssociate($params){
    $response = array();
    $connection = dbConnect();
    $id = $params['id'];
    $email = $params['email'];
    $password = $params['password'];
    $phone = $params['phone'];
    $course = $params['course'];
    $year = $params['year'];
    $quotas = $params['quotas'];
    $name = $params['name'];
    $student_number = $params['student_number'];
    $user_type = $params['user_type'];

    $teste = "SELECT * From utilizador Where email='$email'";
    $resultTest = mysql_query($teste, $connection) or die(mysql_error());

    if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
        if(mysql_num_rows($resultTest) === 0) {
            if ($id === '0') {
                $query = "INSERT INTO utilizador (password, email, telemovel,ano,idCurso,"
                    . " numeroCotas, idTipoUtilizador, estado, dataFinal, nomeUtilizador, numeroAluno) "
                    . "VALUES ('$password', '$email', '$phone','$year','$course', '$quotas', '$user_type', '0', '0', '$name', '$student_number')";
            }
            $result = mysql_query($query, $connection);
            if ($result) {
                $response['cod'] = 201;
                $response['error'] = FALSE;
                $response['msg'] = mysql_insert_id();
            } else {
                $response['cod'] = 500;
                $response['error'] = TRUE;
                $response['msg'] = mysql_error($connection);
            }
        }else {
            $response['cod'] = 502;
            $response['error'] = TRUE;
            $response['msg'] = mysql_error($connection);
        }
    }else {
        $response['cod'] = 501;
        $response['error'] = TRUE;
        $response['msg'] = mysql_error($connection);
    }
    mysql_close($connection);
    return $response;
}

