<?php
require_once "config.php";

if(empty($username_err) && empty($password_err) && empty($confirm_password_err)){
        
    // Prepare an insert statement
    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    $username = "josephchoi";
    $password = "7y8u9ioo!!";
    
    if($stmt = mysqli_prepare($connect, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "ss", $param_username, $param_password);
        
        // Set parameters
        $param_username = $username;
        $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
        
        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            // Redirect to login page
            echo "Registration successful.";
        } else{
            echo "Something went wrong. Please try again later.";
        }
    }
        
    // Close statement
    mysqli_stmt_close($stmt);
}

mysqli_close($connect);
?>