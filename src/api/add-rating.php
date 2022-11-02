<?php
require_once "config.php";
 
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    if (trim($request->id) == '') {
        return http_response_code(400);
    }

    $id = mysqli_real_escape_string($connect, trim($request->id));
    $rating = mysqli_real_escape_string($connect, trim($request->rating));
    if ($rating == "") $rating = "NULL";

    $sql = "UPDATE awards SET rating=$rating WHERE id = '$id'";

    if (mysqli_query($connect, $sql)) {
        $response['error'] = false;
        $response['data'] = "";
    }
    else {
        $response['error'] = true;
        $response['data'] = mysqli_error($connect);
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}
mysqli_close($connect);

?>