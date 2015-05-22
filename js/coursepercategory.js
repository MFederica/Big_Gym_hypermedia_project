$(document).ready(ready);

var courses;//lista dei corsi da visualizzare
var cat;//categoria di cui visualizzare i corsi

function ready() {
    //recupero dall'url il parametro della categoria da visualizzare 
    cat = getQueryVariable("cat");
    console.log("cat = " + cat);
    //setta ad attivo la categoria per evidenziarla nell'html--->aggiunge la classe active alla classe cat
    $('#' + cat).toggleClass('active');
    //chiamata ajax per recuperare i corsi da visualizzare
    $.ajax({
        method: "POST",
        //parametro da passare per la query
        data: {
            cat: cat
        },
        crossDomain: true,
        url: "php/getCourseCat.php",
        success: function (response) {
            console.log(JSON.parse(response));
            courses = JSON.parse(response);
            //salvo la lista di corsi da visulizzare nel browser del client così per il guided tour dopo non devo richiamare il server
            localStorage["courses"] = JSON.stringify(courses);
            console.log("numero corsi= " + courses.length + "numero pagine "+ Math.ceil(courses.length/6));
            var elle = "";
            //inizializzo la pagina con i corsi della pagina uno l'if è perchè se ho meno di 6 corsi devo visualizzare fino a maxlenght
            if (courses.length <= 6) {
                for (var i = 0; i < courses.length; i++) {
                    elle += "<div class='course' id='" + courses[i].id + "'><h2>" + courses[i].name + "</h2><h4>" + courses[i].level + "</h2><span>" + courses[i].description + "</span></div><a href='course.html?id="+courses[i].id+"&from=cat'>vai al corso</a>";
                }
            } else {
                for (var i = 0; i < 6; i++) {
                    elle += "<div class='course' id='" + courses[i].id + "'><h2>" + courses[i].name + "</h2><h4>" + courses[i].level + "</h2><span>" + courses[i].description + "</span></div><a href='course.html?id="+courses[i].id+"&from=cat'>vai al corso</a>";
                }
            }
            $("#content").hide().html(elle).slideDown(1000);
            //plugin bootpag che gestisce da solo le pagine, nello specifico sto inizializzando il numero di pagine come l'intero superiore della divisione tra il numero di corsi e 6 perchè ci sono 6 corsi per pagina--->da decidere quanti
            $('#page-selection').bootpag({
                total: Math.ceil(courses.length/6),
                page: 1
            })
        },
        error: function (request, error) {
            console.log("Error");
        }
    });
    //plugin boot pag che permette di passare tra le pagine quando si clicca praticamente basta controllare il numero della pagina e caricare i corrispondenti elementi della lista di corsi da visualizzare
    $('#page-selection').bootpag({}).on("page", function (event, num) {

        var el = "";
        switch (num) {
        case 1:
            {
                if (courses.length <= 6) {
                    for (var i = 0; i < courses.length; i++) {
                        el += "<div class='course' id='" + courses[i].id + "'><h2>" + courses[i].name + "</h2><h4>" + courses[i].level + "</h2><span>" + courses[i].description + "</span></div><a href='course.html?id="+courses[i].id+"&from=cat'>vai al corso</a>";
                    }
                } else {
                    for (var i = 0; i < 6; i++) {
                        el += "<div class='course' id='" + courses[i].id + "'><h2>" + courses[i].name + "</h2><h4>" + courses[i].level + "</h2><span>" + courses[i].description + "</span></div><a href='course.html?id="+courses[i].id+"&from=cat'>vai al corso</a>";
                    }
                }
                $("#content").hide().html(el).slideDown(1000);
                break;
            }
        case 2:
            {
                if (courses.length <= 12) {
                    for (var i = 6; i < courses.length; i++) {
                        el += "<div class='course' id='" + courses[i].id + "'><h2>" + courses[i].name + "</h2><h4>" + courses[i].level + "</h2><span>" + courses[i].description + "</span></div><a href='course.html?id="+courses[i].id+"&from=cat'>vai al corso</a>";
                    }
                } else {
                    for (var i = 6; i < 12; i++) {
                        el += "<div class='course' id='" + courses[i].id + "'><h2>" + courses[i].name + "</h2><h4>" + courses[i].level + "</h2><span>" + courses[i].description + "</span></div><a href='course.html?id="+courses[i].id+"&from=cat'>vai al corso</a>";
                    }
                }
                $("#content").hide().html(el).slideDown(1000);
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
}