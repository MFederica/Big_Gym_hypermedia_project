$(document).ready(ready);

function ready(){
    console.log("I'm ready!");
    var id=1;
    
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "php/getAllCourses.php", //Relative or absolute path to file.php file
        success: function(response) {
            console.log("prima di response");
            console.log(JSON.parse(response));
            var courses=JSON.parse(response);
            console.log("dopo di response");
            
            var el="";
            for(var i=0;i<courses.length;i++){
                console.log(courses[i].nome);
                
                 el+="<div class='col-lg-4 col-sg-6 col-mg-6' id='c"+courses[i].id+"'><div class='well' id='w'><h3>"+courses[i].name+"-"+courses[i].level+"</h3><p><a href='"+courses[i].name+".html' class='thumbnail'><img class='img-rounded' src='img/"+courses[i].img+"'style='width:250px;height:200px'></img></a></p><p>"+courses[i].description+"</p></div></div>";   
                
                
            }
           
           //Qui aggiungo gli elementi dove vogliamo noi
            $("#courses-to-add").html(el);
        },
        
        error: function(request,error) 
        {
            console.log("Error");
        }
    });

}  