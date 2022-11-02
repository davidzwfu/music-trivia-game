<?php
require_once "config.php";

if (isset($_REQUEST['type'])) {
    $type = $_REQUEST['type'];
    $ageMin = $_REQUEST['ageMin'];
    $ageMax = $_REQUEST['ageMax'];
    $region = $_REQUEST['region'];
    $country = $_REQUEST['country'];
    $data = array();
    if ($ageMin == 'null')
        $ageMin = 0;
    if ($ageMax == 'null')
        $ageMax = 1000;
    if ($type == 'null')
        $type = '';
    if ($region == 'null')
        $region = '';
    if ($country == 'null')
        $country = '';
    // if ($age == "")
    //     $age_sql = "";
    // else if (strpos($age, '-') != false) {
    //     $split = explode('-', $age);
    //     $age_sql = " AND TIMESTAMPDIFF(YEAR,dob,CURDATE()) BETWEEN " . $split[0] . " AND " . $split[1];
    // }
    // else
    //     $age_sql = " AND TIMESTAMPDIFF(YEAR,dob,CURDATE()) = '$age'";
    $sql = "SELECT u.id,full_name,description,city,country,TIMESTAMPDIFF(YEAR,dob,CURDATE()) AS age,SUM(rating) as rating FROM users u 
        LEFT JOIN awards a ON u.id = a.uid 
        WHERE type LIKE '%$type%' AND country LIKE '%$country%' AND TIMESTAMPDIFF(YEAR,dob,CURDATE()) BETWEEN '$ageMin' AND '$ageMax' 
        GROUP BY u.id ORDER BY rating DESC LIMIT 50";
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
                    $data[$i]['age'] = $row['age'];
                    $data[$i]['description'] = $row['description'];
                    $data[$i]['type'] = "User";
                    $data[$i]['city'] = $row['city'];
                    $data[$i]['country'] = $row['country'];
                    $data[$i]['rating'] = $row['rating'];
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