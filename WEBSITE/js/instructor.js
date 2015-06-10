$(document).ready(ready);

//variabili globali 

var id; //id dell'istruttore da visualizzare passato come parametro
var instr; //campi del database dell'instr
var courses; //corsi insegnati dell'istruttore
var tweet;


function ready() {

    id = getQueryVariable("id");
    console.log(id);


    $.ajax({
        method: "POST",
        data: {
            instructor: id

        },
        //Costruisco la tabellina per i tweet
        crossDomain: true,
        url: "http://biggympolimi.altervista.org/php/twitter.php",
        success: function (response) {

            console.log(JSON.parse(response));
            tweet = JSON.parse(response);
            console.log(tweet);
            
             $("#tweet_title").html("Latest tweets");

            for (var i = 0; i < tweet.length; i++) {

                console.log(tweet[i].text);
                console.log(tweet[i].entities.hasOwnProperty('media'));
                if(!tweet[i].entities.hasOwnProperty('media'))  {
                        $("#tweet_body").append("<tr><td><table class='table'><tbody><tr class='inner_tr'><td class='inner_td'><img class='user-image' src='"+tweet[i].user.profile_image_url+"'></img></td><td class='inner_td'>"+ tweet[i].text + "</td></tr></tbody></table></td></tr>");

                    } else {
                        $("#tweet_body").append("<tr><td><table class='table'><tbody><tr class='inner_tr'><td class='inner_td'><img class='user-image' src='"+tweet[i].user.profile_image_url+"'></img></td><td class='inner_td'>"+ tweet[i].text + "</td></tr></tbody></table><img class='img-responsive' src='" + tweet[i].entities.media[0].media_url + "'></td></tr>");
                    }

                }
            
        }

    });


    $.ajax({
        method: "POST",
        //passo come parametro l'id del corso da caricare
        data: {
            instructor: id

        },
        crossDomain: true,
        url: "http://biggympolimi.altervista.org/php/getInstructor.php",
        success: function (response) {

            console.log(JSON.parse(response));
            instr = JSON.parse(response);
            console.log(instr);



            //Inizio con il nome
            $("#name").html(instr[0].name);
            $("title").text("Big Gym - " + instr[0].name);


            //Carico immagini galleria
            $(".first-slide").attr("src", instr[0].img1);
            $(".second-slide").attr("src", instr[0].img2);
            $(".third-slide").attr("src", instr[0].img3);

            //aggiungo nome biografia e paragrafo
            $("#bio").html("<h3>Biography</h3><p>" + instr[0].bio + "</p>");

            $("#qual").html("<h3>Professional qualifications</h3>");

            //Recupero qualification dal db
            var qual = instr[0].qualification.split('|');

            for (var i = 0; i < qual.length; i++) {
                $("#qual").append("<p>" + qual[i] + "</p>");
            }

            $("#award").html("<h3>Awards and prizes</h3>");

            //Recupero award dal DB e nel caso non ci siano faccio vedere la stringa corrispondente
            var award = instr[0].award.split('|');

            console.log(award);

            if (award[0] === "") {

                $("#award").append("<p>None aquired at the moment</p>");

            } else {

                for (var i = 0; i < award.length; i++) {
                    $("#award").append("<p>" + award[i] + "</p>");
                }

            }
            //inserisco titolo della sezione corsi insegnati
            $("#course").html("<h3 id='title-course'>Courses taught</h3>");


            //Secondo ajax per il recupero dei corsi e la creazione dei vari link
            $.ajax({
                method: "POST",
                //passo come parametro l'id del corso da caricare
                data: {
                    instructor: id

                },
                crossDomain: true,
                url: "http://biggympolimi.altervista.org/php/getCoursesByInstructor.php",
                success: function (response) {

                    courses = JSON.parse(response);
                    console.log(courses);


                    //Recupero le categorie dall'array
                    var categories = new Array();
                    for (var i = 0; i < courses.length; i++) {
                        categories[i] = courses[i].category;

                    }

                    console.log(categories);
                    var unique_cat = uniq(categories);
                    console.log(unique_cat);

                    //Ora che ho estratto le categorie comincio a disporre gli elementi nella pagina

                    for (var j = 0; j < unique_cat.length; j++) {

                        $("#course").append("<div class='row course-row' id='row" + j + "'><h3><a href='#'  id='catlink'>" + unique_cat[j] + "</a></h3></div>");

                        for (var z = 0; z < courses.length; z++) {
                            if (courses[z].category === unique_cat[j]) {

                                $("#row" + j).append(" <div class='col-lg-4 col-md-6 col-xs-6 course-image'><div class='thumbnail'><div class='caption'><h4>" + courses[z].name + "-" + courses[z].level + "</h4><p><a href='http://biggympolimi.altervista.org/course.html?id=" + courses[z].id + "&from=instr'class='label label-danger' rel='tooltip' title='Hi'>GoTo</a></p></div><img src='" + courses[z].img1 + "' alt='...'></div></div>");
                            }
                            $("[rel='tooltip']").tooltip();
                            $('.thumbnail').hover(
                                function () {
                                    $(this).find('.caption').slideDown(250); //.fadeIn(250)
                                },
                                function () {
                                    $(this).find('.caption').slideUp(250); //.fadeOut(205)
                                }
                            );
                        }
                    }

                }

            });
        }
    });


    //Serve per fare reize del widget dei tweet
    $(function () {
        // Bind the resize event. When any test element's size changes, update its
        // corresponding info div.
        $('#myCarousel').resize(function () {
            var elem = $("#myCarousel");

            // Update the info div width and height - replace this with your own code
            // to do something useful!
            console.log(elem.height());
            var tweet = $("#tweet");
            var table = $("#tweet_table");
            var body = $("#tweet_body");

            console.log("window:" + window.innerWidth);
            var window_widith = window.outerWidth;

            if (window_widith >= 995) {
                
                var height_new = elem.height() - 35;
                
                tweet.attr("height", elem.height());
                table.attr("height", height_new);
                body.attr("height", height_new);
                
                 
            } else {

                tweet.attr("height", "420px");
                table.attr("height", "385px");
                body.attr("height", "385px");
            }

        });

        // Update all info divs immediately. 
        $('#myCarousel').resize();

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

    //Funzione per estrarre le categorie e salvarle in un array
    function uniq(a) {
        return a.sort().filter(function (item, pos, ary) {
            return !pos || item != ary[pos - 1];
        })
    }

    function addLink() {



    }





}