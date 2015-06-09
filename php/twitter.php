<?php
$id=$_POST['instructor'];
    $mysqli = new mysqli("localhost", "biggympolimi", "", "my_biggympolimi");
    if (mysqli_connect_errno()) { 
        echo "Error to connect to DBMS: ".mysqli_connect_error(); 
        exit(); 
    }else{
        $query = "SELECT link FROM instructor WHERE id='$id'";
        
        $result = $mysqli->query($query);
        if($result->num_rows >0)
        {
            $myArray = array();
            while($row = $result->fetch_array(MYSQL_ASSOC)) {
                $twitteruser = $row["link"];
            }
        	
        
        }
        $result->close();
        $mysqli->close();
    }

session_start();
require_once("twitteroauth/twitteroauth/twitteroauth.php"); //Path to twitteroauth library
 
 
$notweets = 10;
$consumerkey = "WXUpqgvCzo5BLVVWyYsxr8rCE";
$consumersecret = "BbBVLD7vUPdAYt21Xk8PC9u4dwHHKcwzn3QRG2cU8rIKli3MrW";
$accesstoken = "3295755011-1kMJ7yQB1X8cd3lV44xFUJqW7AjwyQQq4kEQahb";
$accesstokensecret = "wVpQb94Tv2wGtKXV1KIgFMNzWLVMT1ipxg2jfpXPfqqOj";
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);
 
echo json_encode($tweets);

?>
