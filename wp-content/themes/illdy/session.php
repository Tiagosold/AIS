<?php
session_start();

if (isset($_GET['logout']) && isset($_SESSION['idType'])) {
    session_destroy();
    $url = '/wordpress';
    header("Location: $url");
}

if (isset($_GET['idType'])) {
        $email = $_GET['email'];
        $id = $_GET['idType'];
        $idAssociate = $_GET['idAssociate'];
        $_SESSION['email'] = $email;
        $_SESSION['idType'] = $id;
        $_SESSION['idAssociate'] = $idAssociate;

} /*elseif(isset($_GET['idPatient'])){
    $email = $_GET['email'];
    $id = $_GET['idPatient'];
    $name = $_GET['name'];
    $healthProfessional = $_GET['healthProfessional'];
    $lastName = $_GET['lastName'];
    $_SESSION['email'] = $email;
    $_SESSION['healthProfessional'] = $healthProfessional;
    $_SESSION['idPatient'] = $id;
    $_SESSION['name'] = $name;
    $_SESSION['lastName'] = $lastName;
} elseif(isset($_GET['idHealthProfessional'])){
    if($_GET['developmentProfessional'] == 1){
        $email = $_GET['email'];
        $id = $_GET['idHealthProfessional'];
        $name = $_GET['name'];
        $lastName = $_GET['lastName'];
        $_SESSION['email'] = $email;
        $_SESSION['idHealthProfessional'] = $id;
        $_SESSION['name'] = $name;
        $_SESSION['lastName'] = $lastName;
    }

}
/*
function confirmPatientOrDP(){
    if((!isset($_SESSION['idPatient'])) && (!isset($_SESSION['idHealthProfessional']))){
        redirect('../redirectUser.php');
    }
}
*/
function confirm_admin() {
    if ($_SESSION['idType'] != 1) {
        redirect('/wordpress/404.php');
    }
}

function confirmAssociate(){
    if($_SESSION['idType'] != 2){
        redirect('/../wordpress/404.php');
    }
}
/*

function confirmHealthProfessional(){
    if(!isset($_SESSION['idHealthProfessional'])){
        redirect('../redirectUser.php');
    }
}
*/
function redirect($url){
    header("Location: $url");
}

