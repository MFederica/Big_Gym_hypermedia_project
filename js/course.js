$(document).ready(ready);

//variabili globali 
var storedCourses; //lista dei corsi salvata sul browser del client per il guided tour
var id; //id del corso da visualizzare passato come parametro
var course; //campi del database del corso
var from; //da dove arriva il corso passato come parametro cat-all-basic-medium-advanced

function ready() {
    //recupero lista di corsi per il guided tour
    storedCourses = JSON.parse(localStorage["courses"]);
    //recupero i parametri passati con l'url
    from = getQueryVariable("from");
    id = getQueryVariable("id");
    console.log("corsi da navigare " + storedCourses);
    console.log("corso = " + id + " primo corso = " + storedCourses[0].id + " numero di corsi " + storedCourses.length + "from " + from);
    //chiamata ajax per recuperare le informazioni dal data base
    $.ajax({
        method: "POST",
        //passo come parametro l'id del corso da caricare
        data: {
            corso: id
        },
        crossDomain: true,
        url: "http://biggympolimi.altervista.org/php/getCourse.php",
        success: function (response) {
            //chiamata ajax ha avuto successo allora carico tutto quello che c'è da caricare nella pagina
            console.log(JSON.parse(response));
            course = JSON.parse(response);
            //setto l'accordion
            $("#pannello-1 .panel-body").text(course[0].whoi);
            $("#pannello-2 .panel-body").text(course[0].what);
            $("#pannello-3 .panel-body").text(course[0].whos);
            $("#pannello-4 .panel-body").text(course[0].why);
            //setto le immagini per ora due
            $(".first-slide").attr("src", course[0].img1);
            $(".second-slide").attr("src", course[0].img2);
            $(".third-slide").attr("src", course[0].img3);
            //setto la room
            $("#room").html("<h2>Room: <a href='#'  id='roomlink'>" + course[0].room + "</a></h2>");
            //setto le schedule
            var schedule = course[0].schedule.split('|');
            for (var i = 0; i < schedule.length; i++) {
                $('#g' + i).text(schedule[i]);
            }
            //cerco il corso all'interno della lista di corsi per il guided tour
            var pn; //variabile che mi dice nell'array il corso visualizzato per poter fare +1/-1 sul guided tour
            for (var i = 0; i < storedCourses.length; i++) {
                if (storedCourses[i].id == id) {
                    pn = i;
                    break;
                }
            }
            //setto parte alta di info
            $("#namecourse").text(course[0].name + " - " + course[0].level);
            $("#categorycourse").text(course[0].category);
            //setto next prev e turn back
            if (pn == 0) {
                $("#prev").parent().attr("class", "disabled");
            } else {
                $("#prev").attr("href", "course.html?id=" + storedCourses[+pn - +1].id + "&from=" + from);
            }

            if (pn == +storedCourses.length - +1) {
                $("#next").parent().attr("class", "disabled");

            } else {
                $("#next").attr("href", "course.html?id=" + storedCourses[+pn + +1].id + "&from=" + from);
            }



            if (from == "cat") {
                $("#info").text(course[0].category.toUpperCase() + " COURSES");
                $("#back").text("back to " + course[0].category);
                $("#back").attr("href", "coursepercategory.html?cat=" + course[0].category);
            } else {
                $("#info").text(from.toLocaleUpperCase() + " COURSES");
                $("#back").text("back to " + from);
                $("#back").attr("href", "allcourses.html?lev=" + from);
            }
        },
        error: function (request, error) {
            console.log("Error");
        }
    });


    $.ajax({
        method: "POST",
        //passo come parametro l'id del corso da caricare
        data: {
            corso: id
        },
        crossDomain: true,
        url: "http://biggympolimi.altervista.org/php/getCourse.php",
        success: function (response) {
            //chiamata ajax ha avuto successo allora carico tutto quello che c'è da caricare nella pagina
            console.log(JSON.parse(response));
            course = JSON.parse(response);

            $("#instructor").html("<div class='col-xs-6 col-md-6'><div class='thumbnail'><div class='caption'><h4>Megan Fox</h4><p><a href='' class='label label-danger' rel='tooltip' title='Hi'>GoTo</a></p></div><img src='http://biggympolimi.altervista.org/img/instructors/instructor0.jpg' alt='...'></div></div>");

            $("[rel='tooltip']").tooltip();

            $('.thumbnail').hover(
                function () {
                    $(this).find('.caption').slideDown(250); //.fadeIn(250)
                },
                function () {
                    $(this).find('.caption').slideUp(250); //.fadeOut(205)
                }
            );
        },
        error: function (request, error) {
            console.log("Error");
        }
    });



    //funzione per recuperare i parametri dall'url
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