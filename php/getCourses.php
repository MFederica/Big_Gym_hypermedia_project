<?php
    $mysqli = new mysqli("localhost", "root", "", "big gym prova");
    if (mysqli_connect_errno()) { 
        echo "Error to connect to DBMS: ".mysqli_connect_error(); 
        exit(); 
    }else{
        $query = " SELECT * FROM courses  ";
        $result = $mysqli->query($query);
        if($result->num_rows >0)
        {
            $myArray = array();
            while($row = $result->fetch_array(MYSQL_ASSOC)) {
                $myArray[] = $row;
            }
            echo json_encode($myArray);
        }
        $result->close();
        $mysqli->close();
    }
?>