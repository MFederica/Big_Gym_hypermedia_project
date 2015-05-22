$(document).ready(ready);

var courses;
var cat;

function ready() {
    cat = getQueryVariable("cat");
    console.log("cat = " + cat);
    $('#' + cat).toggleClass('active');

    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        data: {
            cat: cat
        },
        crossDomain: true,
        url: "php/getCourseCat.php",
        success: function (response) {
            console.log(JSON.parse(response));
            courses = JSON.parse(response);
            localStorage["courses"] = JSON.stringify(courses);
            console.log("numero corsi= " + courses.length + "numero pagine "+ Math.ceil(courses.length/6));
            var elle = "";
            if (courses.length <= 6) {
                for (var i = 0; i < courses.length; i++) {
                    elle += "<div class='course' id='" + courses[i].id + "'><h2>" + courses[i].name + "</h2><h4>" + courses[i].level + "</h2><span>" + courses[i].description + "</span></div><a href='corso.html?id="+courses[i].id+"'>vai al corso</a>";
                }
            } else {
                for (var i = 0; i < 6; i++) {
                    elle += "<div class='course' id='" + courses[i].id + "'><h2>" + courses[i].name + "</h2><h4>" + courses[i].level + "</h2><span>" + courses[i].description + "</span></div><a href='corso.html?id="+courses[i].id+"'>vai al corso</a>";
                }
            }
            $("#content").hide().html(elle).slideDown(1000);

            $('#page-selection').bootpag({
                total: Math.ceil(courses.length/6),
                page: 1
            })
        },
        error: function (request, error) {
            console.log("Error");
        }
    });

    $('#page-selection').bootpag({}).on("page", function (event, num) {

        var el = "";
        switch (num) {
        case 1:
            {
                if (courses.length <= 6) {
                    for (var i = 0; i < courses.length; i++) {
                        el += "<div class='course' id='" + courses[i].id + "'><h2>" + courses[i].name + "</h2><h4>" + courses[i].level + "</h2><span>" + courses[i].description + "</span></div><a href='corso.html?id="+courses[i].id+"'>vai al corso</a>";
                    }
                } else {
                    for (var i = 0; i < 6; i++) {
                        el += "<div class='course' id='" + courses[i].id + "'><h2>" + courses[i].name + "</h2><h4>" + courses[i].level + "</h2><span>" + courses[i].description + "</span></div><a href='corso.html?id="+courses[i].id+"'>vai al corso</a>";
                    }
                }
                $("#content").hide().html(el).slideDown(1000);
                break;
            }
        case 2:
            {
                if (courses.length <= 12) {
                    for (var i = 6; i < courses.length; i++) {
                        el += "<div class='course' id='" + courses[i].id + "'><h2>" + courses[i].name + "</h2><h4>" + courses[i].level + "</h2><span>" + courses[i].description + "</span></div><a href='corso.html?id="+courses[i].id+"'>vai al corso</a>";
                    }
                } else {
                    for (var i = 6; i < 12; i++) {
                        el += "<div class='course' id='" + courses[i].id + "'><h2>" + courses[i].name + "</h2><h4>" + courses[i].level + "</h2><span>" + courses[i].description + "</span></div><a href='corso.html?id="+courses[i].id+"'>vai al corso</a>";
                    }
                }
                $("#content").hide().html(el).slideDown(1000);
                break;
            }
        }
    });


    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }
}