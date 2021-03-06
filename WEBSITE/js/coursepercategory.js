$(document).ready(ready);

var courses; //lista dei corsi da visualizzare
var cat; //categoria di cui visualizzare i corsi

function ready() {
    //recupero dall'url il parametro della categoria da visualizzare 
    cat = getQueryVariable("cat");
    console.log("cat = " + cat);
    //setta ad attivo la categoria per evidenziarla nell'html--->aggiunge la classe active alla classe cat
    console.log( $('#' + cat).parent());
    //chiamata ajax per recuperare i corsi da visualizzare
    $.ajax({
        method: "POST",
        //parametro da passare per la query
        data: {
            cat: cat
        },
        crossDomain: true,
        url: "http://biggympolimi.altervista.org/php/getCourseCat.php",
        success: function (response) {
            console.log(JSON.parse(response));
            courses = JSON.parse(response);
            $("title").text("Big Gym " + cat + " courses");
            
            //salvo la lista di corsi da visulizzare nel browser del client così per il guided tour dopo non devo richiamare il server
            localStorage["courses"] = JSON.stringify(courses);
            console.log("numero corsi= " + courses.length + "numero pagine " + Math.ceil(courses.length / 6));

            var elle1 = "";
            //inizializzo la pagina con i corsi della pagina uno l'if è perchè se ho meno di 6 corsi devo visualizzare fino a maxlenght
            if (courses.length <= 6) {
                for (var i = 0; i < courses.length; i++) {
                        elle1 += addElement(elle1, i);
                }
            } else {
                for (var i = 0; i < 6; i++) {
                        elle1 += addElement(elle1, i);
                }
            }
            $("#row1").hide().html(elle1).slideDown(2000);

            //plugin bootpag che gestisce da solo le pagine, nello specifico sto inizializzando il numero di pagine come l'intero superiore della divisione tra il numero di corsi e 6 perchè ci sono 6 corsi per pagina--->da decidere quanti
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
        switch (num) {
        case 1:
            {
                if (courses.length <= 6) {
                    for (var i = 0; i < courses.length; i++) {
                            el1 += addElement(el1, i);
                    }
                } else {
                    for (var i = 0; i < 6; i++) {
                            el1 += addElement(el1, i);
                    }
                }
                $("#row1").hide().html(el1).slideDown(2000);
                break;
            }
        case 2:
            {
                if (courses.length <= 12) {
                    for (var i = 6; i < courses.length; i++) {
                            el1 += addElement(el1, i);
                    }
                } else {
                    for (var i = 6; i < 12; i++) {
                            el1 += addElement(el1, i);
                    }
                }
                $("#row1").hide().html(el1).slideDown(2000);
                break;
            }
        }
    });

    //chiamata ajax per recuperare tutte le categorie 
    $.ajax({
        method: "POST",
        crossDomain: true,
        url: "http://biggympolimi.altervista.org/php/getCategories.php",
        success: function (response) {
            console.log(JSON.parse(response));
            var categories = JSON.parse(response);
            var lc = "";
            for (var i = 0; i < categories.length; i++) {
                lc += "<li><a href='coursepercategory.html?cat="+categories[i].name+" ' class='category' id='"+categories[i].name+"'>"+categories[i].name+"</a></li>";
            }
            $("#listacategory").html(lc);
            $('#' + cat).parent().attr("class", "active");
        },
        error: function (request, error) {
            console.log("Error");
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

    //titolo dinamico quando la sidenav è collassata
    $("#collapsecat").text(cat);

    //funzione che mi aggiunge elementi a una stringa
    function addElement(elements, i) {
        elements = "<div class='col-lg-4 col-md-6 col-xs-12' id='" + courses[i].id + "'><div class='well' id='w'><h3 class='text-center'>" + courses[i].name + " - " + courses[i].level + "</h3><p><a href='course.html?id=" + courses[i].id + "&from=cat' class='thumbnail'><img class='responsive' src='" + courses[i].img1 + "'></img></a></p><p class='text-center'>" + courses[i].description + "</p></div></div>";
        return (elements);
    }
}