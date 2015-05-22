$(document).ready(ready);

var storedCourses;
var id;
var course;
var from;

function ready() {

    storedCourses = JSON.parse(localStorage["courses"]);
    from = getQueryVariable("from");
    id = getQueryVariable("id");
    console.log("corsi da navigare " + storedCourses);
    console.log("corso = " + id + " primo corso = " + storedCourses[0].id + " numero di corsi " + storedCourses.length + "from " + from);
    if (from == "cat") {
        $.ajax({
            method: "POST",
            //dataType: "json", //type of data
            data: {
                corso: id
            },
            crossDomain: true,
            url: "php/getCourse.php",
            success: function (response) {
                console.log(JSON.parse(response));
                course = JSON.parse(response);
                $(".contiene").html("<div class='course' id='c" + course[0].id + "'><h2>" + course[0].name + "</h2><h4>" + course[0].level + "</h2></div>");

                $("#pannello-1 .panel-body").text(course[0].whoI);
                $("#pannello-2 .panel-body").text(course[0].what);
                $("#pannello-3 .panel-body").text(course[0].whoP);
                $("#pannello-4 .panel-body").text(course[0].why);

                $(".first-slide").attr("src", "img/" + course[0].img1 + ".jpg");
                $(".second-slide").attr("src", "img/" + course[0].img2 + ".jpg");
                var schedule = course[0].schedule.split('/');
                for (var i = 0; i < schedule.length; i++) {
                    $('#g' + i).text(schedule[i]);
                }

                var pn;
                for (var i = 0; i < storedCourses.length; i++) {
                    if (storedCourses[i].id == id) {
                        pn = i;
                        break;
                    }

                }

                if (pn == 0) {

                } else {
                    $("#prev").attr("href", "corso.html?id=" + storedCourses[+pn - +1].id + "&from=" + from);
                }

                if (pn == +storedCourses.length - +1) {

                } else {
                    $("#next").attr("href", "corso.html?id=" + storedCourses[+pn + +1].id + "&from=" + from);
                }
                $("#back").text("back to " + course[0].category);
                $("#back").attr("href", "corsi.html?cat=" + course[0].category);


            },
            error: function (request, error) {
                console.log("Error");
            }
        });
    } else {}





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