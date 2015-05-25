<?php


    $lev = $_POST['lev'];
    $mysqli = new mysqli("localhost", "root", "", "prova");
    if (mysqli_connect_errno()) { 
        echo "Error to connect to DBMS: ".mysqli_connect_error(); 
        exit(); 
    }else{
        //If sul parametro per selezionare la query da fare
        if($lev=='basic'||$lev=='medium'||$lev=='advanced') {
        $query = " SELECT id,name,level,description,img1 FROM course WHERE course.level ='$lev' ORDER BY course.name"; 
        }else {
        $query = " SELECT id,name,level,description,img1 FROM course ORDER BY course.name,course.levelnumber";
        }
        $result = $mysqli->query($query);
        if($result->num_rows >0)
        {
            $myArray = array();
            while($row = $result->fetch_array(MYSQL_ASSOC)) {
                $myArray[] = array_map("utf8_encode",$row);
            }
            echo json_encode($myArray);
        }
        $result->close();
        $mysqli->close();
    }
?>