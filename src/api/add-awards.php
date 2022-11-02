<?php
require_once "config.php";
 
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $sql = "INSERT INTO awards (id,uid,event,name,date) VALUES ";
    $request = json_decode($postdata);
    $ids = array();
    $count = 0;

    for ($x = 0; $x < count($request); $x++) {
        $id = mysqli_real_escape_string($connect, trim($request[$x]->id));
        $uid = mysqli_real_escape_string($connect, trim($request[$x]->uid));
        $event = mysqli_real_escape_string($connect, trim($request[$x]->event));
        $name = mysqli_real_escape_string($connect, trim($request[$x]->name));
        $date = mysqli_real_escape_string($connect, trim($request[$x]->date));

        if ($event != "" || $name != "") {
            $count++;
            $sql .= "('$id','$uid','$event','$name','$date'),";
            if ($id != "")
                array_push($ids, $id);
        }
    }
    $sql = rtrim($sql, ',');
    $sql .= " ON DUPLICATE KEY UPDATE 
    id = VALUES(id),
    uid = VALUES(uid),
    event = VALUES(event),
    name = VALUES(name),
    date = VALUES(date)";

    $sql_not = count($ids) > 0 ? "AND id NOT IN (" . implode(',', $ids) . ")" : "";
    $sql2 = "DELETE FROM awards WHERE uid = $uid $sql_not";
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