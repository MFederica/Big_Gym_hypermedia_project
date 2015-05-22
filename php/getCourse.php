<?php


    $cor = $_POST['corso'];
    $mysqli = new mysqli("localhost", "root", "", "big gym prova");
    if (mysqli_connect_errno()) { 
        echo "Error to connect to DBMS: ".mysqli_connect_error(); 
        exit(); 
    }else{
        $query = " SELECT * FROM courses WHERE courses.id ='$cor'";
        
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