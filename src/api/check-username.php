<?php
require_once "config.php";
 
if (isset($_REQUEST['email'])) {
    $email = $_REQUEST['email'];

    $sql = "SELECT id FROM users WHERE email = ? LIMIT 1";

    if($stmt = mysqli_prepare($connect, $sql)){
        mysqli_stmt_bind_param($stmt, "s", $email);
        
        if (mysqli_stmt_execute($stmt)) {
            mysqli_stmt_store_result($stmt);
            $response['error'] = false;
            if (mysqli_stmt_num_rows($stmt) == 1)
                $response['data'] = "1";
            else 
                $response['data'] = "0";
        }
        else {
            $response['error'] = true;
            $response['data'] = mysqli_error($connect);
        }
    }
    else {
        $response['error'] = true;
        $response['data'] = mysqli_error($connect);
    }
} 
else {
    $response['error'] = true;
    $response['data'] = "ERROR: invalid email";
}
header('Content-Type: application/json');
echo json_encode($response);

mysqli_close($connect);
?>