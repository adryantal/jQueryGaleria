$(function () {

    kepgaleria(); //article tagben jelenjenek meg a képek


});

//a képeadatait egy tömbben tároljuk

var kepTomb = [
    {
        eleresi_ut: "galeria/lalaria.jpg",
        cim: "Lalaria",
        leiras: "Lalaria, Skiathos"

    },

    {
        eleresi_ut: "galeria/falassarna.jpg",
        cim: "Falassarna",
        leiras: "Falassarna, Kréta"

    },

    {
        eleresi_ut: "galeria/loutro1.jpg",
        cim: "Loutro",
        leiras: "Loutro, Kréta"

    },

    {
        eleresi_ut: "galeria/loutro2.jpg",
        cim: "Loutro",
        leiras: "Loutro, Kréta"

    }

];

function kepgaleria() {
    //nagy kép esetében induláskor a kepTomb 0. indexű elemének értékei jelenjenek meg
    kepCsere(0);

//    var kepTomb = ["galeria/lalaria.jpg", "galeria/falassarna.jpg", "galeria/loutro1.jpg", "galeria/loutro2.jpg"];


    //objektumok

//    var kep1={
//        eleresi_ut: "galeria/lalaria.jpg",
//        cim: "Lalaria",
//        leiras: "Lalaria, Skiathos"       
//        
//    };
//    
//     var kep2={
//        eleresi_ut: "galeria/falassarna.jpg",
//        cim: "Falassarna",
//        leiras: "Falassarna, Kréta"       
//        
//    };
//    
//     var kep3={
//        eleresi_ut: "galeria/loutro1.jpg",
//        cim: "Loutro",
//        leiras: "Loutro, Kréta"       
//        
//    };
//    
//    var kep4={
//        eleresi_ut: "galeria/loutro2.jpg",
//        cim: "Loutro",
//        leiras: "Loutro, Kréta"       
//        
//    };

//  var kepTomb = [kep1, kep2, kep3, kep4];




    //kis képek betöltése

    for (var i = 0; i < kepTomb.length; i++) {
        var elem = '<div> <img data-id="' + i + '" src="' + kepTomb[i].eleresi_ut + '" alt=""/><h3>' + kepTomb[i].cim + '</h3><p>' + kepTomb[i].leiras + '</p></div>';
        $("article").append(elem); //beszúrok egy data ID-t a képek azonosítása végett
    }

    $("article div img").mouseover(kepKiemel);
    $("article div img").mouseleave(kepKiemelLe);

//bármely kisképre kattintva az ahhoz tart. nagy kép jelenjen meg 
//le kell kérdezni, hanyadik képre kattintottunk
//ha tudjuk, akkor a nagy kép helyén megjelenítjük az adott képobjektumot

    $("article div img").click(kepBetolt);
    //$("section button").eq(0).click(balraLeptet);
    $("#bal").mouseover(gombKiemel);
    $("#bal").mouseleave(gombKiemelLe);
    $("#bal").click(balraLeptet);

    $("#jobb").mouseover(gombKiemel);
    $("#jobb").mouseleave(gombKiemelLe);
    //$("section button").eq(1).click(jobbraLeptet);
    $("#jobb").click(jobbraLeptet);


}


function kepKiemel() {
    $(this).addClass("kep_kiemel");
    var index = $(this).attr("data-id"); //lekérem a mouseover-t kiváltó kép data id-ját
    $("article div").eq(index).addClass("article_div_kiemel"); //az azzal megegyező indexű tárolóhoz stílust adok
    
    
}

function kepKiemelLe() {
    $(this).removeClass("kep_kiemel");
    var index = $(this).attr("data-id");
    $("article div").eq(index).removeClass("article_div_kiemel");
}

function gombKiemel() {
    $(this).addClass("gomb_kiemel");
}

function gombKiemelLe() {
    $(this).removeClass("gomb_kiemel");
}



function jobbraLeptet() {
    var e_ut = $("#nagyKep img").attr("src");  //lekérdezem az aktuális nagy kép elérési útját
    var index = kepIndexKeres(e_ut); //megkeresem az indexét
    if (index < kepTomb.length - 1) {
        kepCsere(index + 1); //amennyiben nem a legutolsó képen állok, akkor a köv. indexű képre váltok
    }
}

function balraLeptet() {
    var e_ut = $("#nagyKep img").attr("src");  //lekérdezem az aktuális nagy kép elérési útját
    var index = kepIndexKeres(e_ut); //megkeresem az indexét
    if (index > 0) {
        kepCsere(index - 1); //amennyiben nem a legelső képen állok, akkor az előző indexű képre váltok
    }
}


function kepIndexKeres(eleresiut) { //adott kép elérési útja, mint bemenő paraméter alapján visszaadja a kép indexét a képtömbben
    var index = 0;
    var i = 0;
    var nem_egyezik = true;
    while (i <= kepTomb.length - 1 && nem_egyezik) {
        if (kepTomb[i].eleresi_ut === eleresiut) {
            index = i;
            nem_egyezik = false;
        }
        i++;
    }
    return index;
}



function kepBetolt() {
    var index = $(this).attr("data-id"); //lekérdezem az eseményt kiváltó elem ID-ját
    console.log(index);
    kepCsere(index);
}

function kepCsere(mire) {
    $("#nagyKep h3").html(kepTomb[mire].cim);
    $("#nagyKep p").text(kepTomb[mire].leiras); //lehet text-tel, mert nem kép
    $("#nagyKep img").attr("src", kepTomb[mire].eleresi_ut);

}