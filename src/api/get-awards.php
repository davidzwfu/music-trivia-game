<?php
require_once "config.php";

if (isset($_REQUEST['uid'])) {
    $uid = $_REQUEST['uid'];
    $data = array();
    $sql = "SELECT id,uid,event,name,date,rating,created FROM awards WHERE uid = $uid ORDER BY date DESC";

    if ($stmt = mysqli_prepare($connect, $sql)) {
        
        if ($result = mysqli_query($connect, $sql)) {
            if (mysqli_num_rows($result) > 0){
                $i = 0;
                while ($row = mysqli_fetch_assoc($result)) {
                    $data[$i]['id'] = $row['id'];
                    $data[$i]['uid'] = $row['uid'];
                    $data[$i]['event'] = $row['event'];
                    $data[$i]['name'] = $row['name'];
                    $data[$i]['date'] = $row['date'];
                    $data[$i]['rating'] = $row['rating'];
                    $data[$i]['created'] = $row['created'];
                    $i++;
                }
                echo json_encode($data);
            } 
        } 
        else {
            //echo "ERROR: Could not able to execute $sql. " . mysqli_error($connect);
        }
    }
}
    
mysqli_stmt_close($stmt);
mysqli_close($connect);
?>