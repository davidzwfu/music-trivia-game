<?php
require_once "config.php";

$data = array();
$sql = "SELECT a.id,a.uid,a.event,a.name,a.date,a.rating,a.created,full_name,SUM(a2.rating) as user_rating FROM awards a 
    INNER JOIN users u ON a.uid = u.id LEFT JOIN awards a2 ON u.id = a2.uid GROUP BY a.id ORDER BY rating,a.created";

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
                $data[$i]['full_name'] = $row['full_name'];
                $data[$i]['user_rating'] = $row['user_rating'];
                $i++;
            }
            echo json_encode($data);
        } 
    } 
    else {
        //echo "ERROR: Could not able to execute $sql. " . mysqli_error($connect);
    }
}
    
mysqli_stmt_close($stmt);
mysqli_close($connect);
?>