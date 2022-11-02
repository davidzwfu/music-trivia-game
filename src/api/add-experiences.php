<?php
require_once "config.php";
 
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $sql = "INSERT INTO experiences (id,uid,company,title,from_date,to_date) VALUES ";
    $request = json_decode($postdata);
    $ids = array();
    $count = 0;

    for ($x = 0; $x < count($request); $x++) {
        $id = mysqli_real_escape_string($connect, trim($request[$x]->id));
        $uid = mysqli_real_escape_string($connect, trim($request[$x]->uid));
        $company = mysqli_real_escape_string($connect, trim($request[$x]->company));
        $title = mysqli_real_escape_string($connect, trim($request[$x]->title));
        $from = mysqli_real_escape_string($connect, trim($request[$x]->from));
        $to = mysqli_real_escape_string($connect, trim($request[$x]->to));

        if ($company != "") {
            $count++;
            $sql .= "('$id','$uid','$company','$title','$from-01','$to-01'),";
            if ($id != "")
                array_push($ids, $id);
        }
    }
    $sql = rtrim($sql, ',');
    $sql .= " ON DUPLICATE KEY UPDATE 
    id = VALUES(id),
    uid = VALUES(uid),
    company = VALUES(company),
    title = VALUES(title),
    from_date = VALUES(from_date),
    to_date = VALUES(to_date)";

    $sql_not = count($ids) > 0 ? "AND id NOT IN (" . implode(',', $ids) . ")" : "";
    $sql2 = "DELETE FROM experiences WHERE uid = $uid $sql_not";
    mysqli_query($connect, $sql2);

    if ($count > 0) {
        if (mysqli_query($connect, $sql)) {
            $response['error'] = false;
            $response['data'] = "";
        }
        else {
            $response['error'] = true;
            $response['data'] = mysqli_error($connect);
        }
    }
    else {
        $response['error'] = false;
        $response['data'] = "";
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}
mysqli_close($connect);

?>