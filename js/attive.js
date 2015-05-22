



$(".category").on("click", function () {
    console.log("cliccato category");
    $(this).removeClass("category");
    $(this).addClass("categorySelected");
});


$(".categorySelected").on("click", function () {
    console.log("cliccato category");
    $(this).removeClass("categorySelected");
    $(this).addClass("category");
});