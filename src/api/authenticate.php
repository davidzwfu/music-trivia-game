<?php
require_once "config.php";

$requestMethod = $_SERVER['REQUEST_METHOD'];

switch($requestMethod) {
    case 'POST':
        $postdata = file_get_contents("php://input");
        if (isset($postdata) && !empty($postdata)) {
            $request = json_decode($postdata);
            $email = mysqli_real_escape_string($connect, trim($request->email));
            $password = mysqli_real_escape_string($connect, trim($request->password));

            $sql = "SELECT id,full_name,password FROM users WHERE email = ?";

            if ($stmt = mysqli_prepare($connect, $sql)) {
                mysqli_stmt_bind_param($stmt, "s", $email);

                if (mysqli_stmt_execute($stmt)) {
                    mysqli_stmt_store_result($stmt);
                    if (mysqli_stmt_num_rows($stmt) == 1) {                    
                        mysqli_stmt_bind_result($stmt, $id, $full_name, $hashed_password);
                        if (mysqli_stmt_fetch($stmt)) {
                            if (password_verify($password, $hashed_password)) {
                                require_once('jwt.php');

                                $exp = strtotime('+24 hours');
                                // Get our server-side secret key from a secure location.
                                $serverKey = '5f2b5cdbe5194f10b3241568fe4e2b24';
                                // create a token
                                $payloadArray = array();
                                $payloadArray['id'] = $id;
                                $payloadArray['full_name'] = $full_name;
                                $payloadArray['exp'] = $exp;
                                $token = JWT::encode($payloadArray, $serverKey);
                                // return to caller
                                $returnArray = array('token' => $token, 'id' => $id);
                                $jsonEncodedReturnArray = json_encode($returnArray);
                                echo $jsonEncodedReturnArray;
                            } 
                            else {
                                $returnArray = array('error' => "Incorrect password.");
                                $jsonEncodedReturnArray = json_encode($returnArray);
                                echo $jsonEncodedReturnArray;
                            }
                        }
                    }
                    else {
                        $returnArray = array('error' => 'Invalid email.');
                        $jsonEncodedReturnArray = json_encode($returnArray);
                        echo $jsonEncodedReturnArray;
                    }
                } 
                else {
                    $returnArray = array('error' => 'Could not process request.');
                    $jsonEncodedReturnArray = json_encode($returnArray);
                    echo $jsonEncodedReturnArray;
                }
            }
            mysqli_stmt_close($stmt);
        }    
        break;
    case 'GET':
        $token = null;
        
        if (isset($_GET['token'])) {$token = $_GET['token'];}
        if (!is_null($token)) {
            require_once('jwt.php');
            // Get our server-side secret key from a secure location.
            $serverKey = '5f2b5cdbe5194f10b3241568fe4e2b24';
            try {
                $payload = JWT::decode($token, $serverKey, array('HS256'));
                $returnArray = array('userId' => $payload->userId);
                if (isset($payload->exp)) {
                    $returnArray['exp'] = date(DateTime::ISO8601, $payload->exp);;
                }
            }
            catch(Exception $e) {
                $returnArray = array('error' => $e->getMessage());
            }
        } 
        else {
            $returnArray = array('error' => 'You are not logged in with a valid token.');
        }
        
        // return to caller
        $jsonEncodedReturnArray = json_encode($returnArray, JSON_PRETTY_PRINT);
        echo $jsonEncodedReturnArray;
        break;
    default:
        $returnArray = array('error' => 'You have requested an invalid method.');
        $jsonEncodedReturnArray = json_encode($returnArray);
        echo $jsonEncodedReturnArray;
}