<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Methods");

$hostname = "tristandb.db.11818998.afd.hostedresource.net";
$username = "tristandb";
$database = "tristandb";
$db_password = "Tristan90!";
$connect = mysqli_connect($hostname, $username, $db_password, $database);

if (mysqli_connect_errno()) {
    die('<p>Failed to connect to MySQL</p>');
}
?>