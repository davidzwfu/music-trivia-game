<?php
require_once "config.php";

if (isset($_REQUEST['search'])) {
    $search = $_REQUEST['search'];
    $data = array();
    $sql = "SELECT id,full_name,description FROM users WHERE full_name LIKE '%$search%' ORDER BY full_name ASC LIMIT 20";
    // $sql = "SELECT u.id,u.full_name,j.name FROM users u LEFT JOIN (SELECT c.name,c.uid FROM ( SELECT uid,name, MAX(from_date) AS from_date
    // FROM educations
    // GROUP BY uid) x JOIN educations c USING(uid,from_date)) j ON u.id = j.uid WHERE full_name LIKE '%$search%' ORDER BY full_name LIMIT 20";

    if ($stmt = mysqli_prepare($connect, $sql)) {
        //mysqli_stmt_bind_param($stmt, "s", $search);
        //if (mysqli_stmt_execute($stmt)) {
        if ($result = mysqli_query($connect, $sql)) {
            //$result = mysqli_stmt_get_result($stmt);
            if (mysqli_num_rows($result) > 0){
                $i = 0;
                while ($row = mysqli_fetch_assoc($result)) {
                    $data[$i]['id'] = $row['id'];
                    $data[$i]['name'] = $row['full_name'];
                    $data[$i]['description'] = $row['description'];
                    $data[$i]['type'] = "User";
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