<?php
require_once "config.php";
 
if (isset($_REQUEST['uid'])) {
    $uid = $_REQUEST['uid'];
    $data = array();
    $sql = "SELECT id,uid,company,title,from_date,to_date FROM experiences WHERE uid = $uid ORDER BY from_date DESC";

    if ($stmt = mysqli_prepare($connect, $sql)) {
        
        if ($result = mysqli_query($connect, $sql)) {
            if (mysqli_num_rows($result) > 0){
                $i = 0;
                while ($row = mysqli_fetch_assoc($result)) {
                    $data[$i]['id'] = $row['id'];
                    $data[$i]['uid'] = $row['uid'];
                    $data[$i]['company'] = $row['company'];
                    $data[$i]['title'] = $row['title'];
                    $data[$i]['from'] = substr($row['from_date'], 0, 7);
                    $data[$i]['to'] = substr($row['to_date'], 0, 7);
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