<?php
require_once "config.php";
 
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    if (trim($request->first_name) == '') {
        return http_response_code(400);
    }

    $id = mysqli_real_escape_string($connect, trim($request->id));
    $email = mysqli_real_escape_string($connect, trim($request->email));
    $password = mysqli_real_escape_string($connect, trim($request->password));
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $first_name = mysqli_real_escape_string($connect, trim($request->first_name));
    $last_name = mysqli_real_escape_string($connect, trim($request->last_name));
    $full_name = "$first_name $last_name";
    $dob = mysqli_real_escape_string($connect, trim($request->dob));
    $country = mysqli_real_escape_string($connect, trim($request->country));
    $city = mysqli_real_escape_string($connect, trim($request->city));
    $address = mysqli_real_escape_string($connect, trim($request->address));
    $phone = mysqli_real_escape_string($connect, trim($request->phone));
    $description = mysqli_real_escape_string($connect, trim($request->description));


    if ($password != "") {
        $sql = "INSERT INTO users (id,email,password,first_name,last_name,full_name,dob,country,city,address,phone,created,description) 
        VALUES ('$id','$email','$hashed_password','$first_name','$last_name','$full_name','$dob','$country','$city',
        '$address','$phone',CURDATE(),'$description') ON DUPLICATE KEY UPDATE
        id = VALUES(id),
        email = VALUES(email),
        password = VALUES(password),
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        full_name = VALUES(full_name),
        dob = VALUES(dob),
        country = VALUES(country),
        city = VALUES(city),
        address = VALUES(address),
        phone = VALUES(phone),
        created = VALUES(created),
        description = VALUES(description)";
    }
    else {
        $sql = "INSERT INTO users (id,email,first_name,last_name,full_name,dob,country,city,address,phone,created,description) 
        VALUES ('$id','$email','$first_name','$last_name','$full_name','$dob','$country','$city',
        '$address','$phone',CURDATE(),'$description') ON DUPLICATE KEY UPDATE
        id = VALUES(id),
        email = VALUES(email),
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        full_name = VALUES(full_name),
        dob = VALUES(dob),
        country = VALUES(country),
        city = VALUES(city),
        address = VALUES(address),
        phone = VALUES(phone),
        created = VALUES(created),
        description = VALUES(description)";
    }

    if (mysqli_query($connect, $sql)) {
        $response['error'] = false;
        $response['data'] = $id == "" ? mysqli_insert_id($connect) : $id;
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