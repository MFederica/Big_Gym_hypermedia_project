<?php


    $cat = $_POST['cat'];
    $mysqli = new mysqli("localhost", "biggympolimi", "", "my_biggympolimi");
    if (mysqli_connect_errno()) { 
        echo "Error to connect to DBMS: ".mysqli_connect_error(); 
        exit(); 
    }else{
        $query = " SELECT id,name,level,description,img1 FROM course WHERE course.category ='$cat' ORDER BY course.name,course.levelnumber";
        
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