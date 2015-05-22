$(document).ready(ready);

//variabili globali 
var storedCourses;//lista dei corsi salvata sul browser del client per il guided tour
var id;//id del corso da visualizzare passato come parametro
var course;//campi del database del corso
var from;//da dove arriva il corso passato come parametro cat-all-basic-medium-advanced

function ready() {
    //recupero lista di corsi per il guided tour
    storedCourses = JSON.parse(localStorage["courses"]);
    //recupero i parametri passati con l'url
    from = getQueryVariable("from");
    id = getQueryVariable("id");
    console.log("corsi da navigare " + storedCourses);
    console.log("corso = " + id + " primo corso = " + storedCourses[0].id + " numero di corsi " + storedCourses.length + "from " + from);
    //in base a dove arrivo setto i parametri diversi in realtà adesso non è così:)
    if (from == "cat") {
        //chiamata ajax per recuperare le informazioni dal data base
        $.ajax({
            method: "POST",
            //passo come parametro l'id del corso da caricare
            data: {
                corso: id
            },
            crossDomain: true,
            url: "php/getCourse.php",
            success: function (response) {
                //chiamata ajax ha avuto successo allora carico tutto quello che c'è da caricare nella pagina
                console.log(JSON.parse(response));
                course = JSON.parse(response);
                $(".contiene").html("<div class='course' id='" + course[0].id + "'><h2>" + course[0].name + "</h2><h4>" + course[0].level + "</h2></div>");
                $(".contiene").html("<div class='course' id='" + course[0].id + "'><h2>" + course[0].name + "</h2><h4>" + course[0].level + "</h2></div>");

                $("#pannello-1 .panel-body").text(course[0].whoi);
                $("#pannello-2 .panel-body").text(course[0].what);
                $("#pannello-3 .panel-body").text(course[0].whos);
                $("#pannello-4 .panel-body").text(course[0].why);

                $(".first-slide").attr("src", "img/" + course[0].img1 + ".jpg");
                $(".second-slide").attr("src", "img/" + course[0].img2 + ".jpg");
                var schedule = course[0].schedule.split('|');
                for (var i = 0; i < schedule.length; i++) {
                    $('#g' + i).text(schedule[i]);
                }
                //cerco il corso all'interno della lista di corsi per il guided tour
                var pn;//variabile che mi dice nell'array il corso visualizzato per poter fare +1/-1 sul guided tour
                for (var i = 0; i < storedCourses.length; i++) {
                    if (storedCourses[i].id == id) {
                        pn = i;
                        break;
                    }

                }
                //setto next prev e turn back
                if (pn == 0) {

                } else {
                    $("#prev").attr("href", "course.html?id=" + storedCourses[+pn - +1].id + "&from=" + from);
                }

                if (pn == +storedCourses.length - +1) {

                } else {
                    $("#next").attr("href", "course.html?id=" + storedCourses[+pn + +1].id + "&from=" + from);
                }
                $("#back").text("back to " + course[0].category);
                $("#back").attr("href", "coursepercategory.html?cat=" + course[0].category);


            },
            error: function (request, error) {
                console.log("Error");
            }
        });
    } else {}




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