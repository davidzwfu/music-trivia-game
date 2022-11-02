<?php
require_once "config.php";
 
if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
}

$sql = "SELECT id,email,first_name,last_name,full_name,dob,country,city,address,phone,description FROM users WHERE id = $id LIMIT 1";

if($result = mysqli_query($connect, $sql)){
    if(mysqli_num_rows($result) > 0){
        if($row = mysqli_fetch_assoc($result)){
            $data['id'] = $row['id'];
            $data['email'] = $row['email'];
            $data['first_name'] = $row['first_name'];
            $data['last_name'] = $row['last_name'];
            $data['full_name'] = $row['full_name'];
            $data['dob'] = $row['dob'];
            $data['country'] = $row['country'];
            $data['city'] = $row['city'];
            $data['address'] = $row['address'];
            $data['phone'] = $row['phone'];
            $data['description'] = $row['description'];
        }
        echo json_encode($data);
    } 
} else{
    //echo "ERROR: Could not able to execute $sql. " . mysqli_error($connect);
}
    
mysqli_close($connect);
?>