$(document).ready(ready);

var courses; //lista corsi
var lev; //livello dei corsi

function ready() {
    //recupero dall'url il parametro della categoria da visualizzare 
    lev = getQueryVariable("lev");
    console.log("lev = " + lev);
    //setta ad attivo la categoria per evidenziarla nell'html--->aggiunge la classe active alla classe lev

    $('#' + lev).parent().attr("class", "active");
    //Recupero i corsi
    $.ajax({
        method: "POST",
        //Parametro per la query
        data: {
            lev: lev
        },
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://biggympolimi.altervista.org/php/getCourseLev.php", //Relative or absolute path to file.php file DA CAMBIARE

        success: function (response) {
            console.log(JSON.parse(response));
            courses = JSON.parse(response);
            
            $("title").text("Big Gym " + lev + " courses");
            
            //salvo la lista di corsi da visulizzare nel browser del client così per il guided tour dopo non devo richiamare il server
            localStorage["courses"] = JSON.stringify(courses);
            console.log("numero corsi= " + courses.length + "numero pagine " + Math.ceil(courses.length / 6));

            var elle1 = "";
            var elle2 = "";
            //inizializzo la pagina con i corsi della pagina uno l'if è perchè se ho meno di 6 corsi devo visualizzare fino a maxlenght
            if (courses.length <= 6) {
                for (var i = 0; i < courses.length; i++) {
                    if (i < 3) {
                        elle1 += addElement(elle1, i);
                    } else {
                        elle2 += addElement(elle2, i);
                    }
                }
            } else {
                for (var i = 0; i < 6; i++) {
                    if (i < 3) {
                        elle1 += addElement(elle1, i);
                    } else {
                        elle2 += addElement(elle2, i);
                    }
                }
            }
            $("#row1").hide().html(elle1).slideDown(2000);
            $("#row2").hide().html(elle2).slideDown(2000);


            //plugin bootpag
            $('#page-selection').bootpag({
                total: Math.ceil(courses.length / 6),
                page: 1
            })
        },
        error: function (request, error) {
            console.log("Error");
        }
    });

    //plugin boot pag che permette di passare tra le pagine quando si clicca praticamente basta controllare il numero della pagina e caricare i corrispondenti elementi della lista di corsi da visualizzare
    $('#page-selection').bootpag({}).on("page", function (event, num) {

        var el1 = "";
        var el2 = "";
        switch (num) {
        case 1:
            {
                if (courses.length <= 6) {
                    for (var i = 0; i < courses.length; i++) {
                        if (i < 3) {
                            el1 += addElement(el1, i);
                        } else {
                            el2 += addElement(el2, i);
                        }
                    }
                } else {
                    for (var i = 0; i < 6; i++) {
                        if (i < 3) {
                            el1 += addElement(el1, i);
                        } else {
                            el2 += addElement(el2, i);
                        }
                    }
                }
                $("#row1").hide().html(el1).slideDown(2000);
                $("#row2").hide().html(el2).slideDown(2000);
                break;
            }
        case 2:
            {
                if (courses.length <= 12) {
                    for (var i = 6; i < courses.length; i++) {
                        if (i < 3) {
                            el1 += addElement(el1, i);
                        } else {
                            el2 += addElement(el2, i);
                        }
                    }
                } else {
                    for (var i = 6; i < 12; i++) {
                        if (i < 9) {
                            el1 += addElement(el1, i);
                        } else {
                            el2 += addElement(el2, i);
                        }
                    }
                }
                $("#row1").hide().html(el1).slideDown(2000);
                $("#row2").hide().html(el2).slideDown(2000);
                break;
            }
        }
    });

    //funzione per recuperare i parametri dell'url
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

    $("#collapselevel").text(lev);

    function addElement(elements, i) {
        elements = "<div class='col-md-4' id='" + courses[i].id + "'><div class='well' id='w'><h3 class='text-center'>" + courses[i].name + " - " + courses[i].level + "</h3><p><a href='course.html?id=" + courses[i].id + "&from="+lev+"' class='thumbnail'><img class='responsive' src='" + courses[i].img1 + "'</img></a></p><p class='text-center'>" + courses[i].description + "</p></div></div>"; //Occhio URL immagini da cambiare
        return (elements);
    }
}