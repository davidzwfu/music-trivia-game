<?php
require_once "config.php";
 
if (isset($_REQUEST['id']) && !empty($_REQUEST["id"])) {
    $id = $_REQUEST['id'];

    $sql = "DELETE FROM users WHERE id = ? LIMIT 1";

    if($stmt = mysqli_prepare($connect, $sql)){
        mysqli_stmt_bind_param($stmt, "i", $id);
        
        if (mysqli_stmt_execute($stmt)) {
            $response['error'] = false;
            $response['data'] = "";
        }
        else {
            $response['error'] = true;
            $response['data'] = mysqli_error($connect);
        }
    }
} 
else {
    $response['error'] = true;
    $response['data'] = "ERROR: invalid id";
}
header('Content-Type: application/json');
echo json_encode($response);

mysqli_close($connect);
?>