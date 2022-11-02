<?php
require_once "config.php";
 
if (isset($_REQUEST['search'])) {
    $search = $_REQUEST['search'];
    if ($search != "")
        $limit = " LIMIT 10";
}

$customers = array();
$sql = "SELECT id,first_name,last_name,full_name,phone,email,address,city,province,postal_code FROM customers
    WHERE full_name LIKE '%$search%' OR phone LIKE '%$search%' OR email LIKE '%$search%' 
    ORDER BY full_name$limit";

if($stmt = mysqli_prepare($connect, $sql)){
    
    if($result = mysqli_query($connect, $sql)){
        if(mysqli_num_rows($result) > 0){
            $i = 0;
            while($row = mysqli_fetch_assoc($result)){
                $customers[$i]['id'] = $row['id'];
                $customers[$i]['first_name'] = $row['first_name'];
                $customers[$i]['last_name'] = $row['last_name'];
                $customers[$i]['full_name'] = $row['full_name'];
                $customers[$i]['phone'] = $row['phone'];
                $customers[$i]['email'] = $row['email'];
                $customers[$i]['address'] = $row['address'];
                $customers[$i]['city'] = $row['city'];
                $customers[$i]['province'] = $row['province'];
                $customers[$i]['postal_code'] = $row['postal_code'];
                $i++;
            }
            echo json_encode($customers);
        } 
    } else{
        //echo "ERROR: Could not able to execute $sql. " . mysqli_error($connect);
    }
}
    
mysqli_stmt_close($stmt);
mysqli_close($connect);
?>