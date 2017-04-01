<?php
/**
 * Created by PhpStorm.
 * User: tiago
 * Date: 19/03/2017
 * Time: 20:05
 */
require_once dirname(__FILE__) . '/configs.php';

/*
 * função que faz a conexão com a base de dados
 */

function dbConnect() {
    $conn = mysql_connect(MYSQL_SERVER, MYSQL_USERNAME, MYSQL_PASSWORD);
    if ($conn) {
        mysql_select_db(MYSQL_DATABASE, $conn);
        mysql_query("SET NAMES utf8");
    }

    return $conn;
}