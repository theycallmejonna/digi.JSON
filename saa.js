// haetaan säätiedot Helsingistä ja Tampereelta OpenWeather API:sta
fetch('https://api.openweathermap.org/data/2.5/group?id=658225,634963&units=metric&lang=fi&appid=665ecd56dfc08dbb50feb8b8f5034e28')
    
    // muunnetaan vastaus JSON-muotoon
    .then(function (response) {
        return response.json();
    }) 
    
    // muunnetaan vastaus JSONiksi
    .then(function (data) {
        naytaSaa(data); // Kutsutaan sää-funktiota
    })

    // jos tuli jokin virhe
    .catch(function (error) {
        document.getElementById("saa").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>" + error;
    });

// funktio säätietojen käsittelyyn
function naytaSaa(data) {
    var teksti = "";

    for (var i = 0; i < data.list.length; i++) {
        var kaupunki = data.list[i].name;
        var saakuvaus = data.list[i].weather[0].description;
        var lampotila = data.list[i].main.temp.toFixed(1) + "°C"; // näytetään vastaus kahden desimaalin tarkkuudella
        var tuuli = data.list[i].wind.speed.toFixed(1) + " m/s"; // näytetään vastaus kahden desimaalin tarkkuudella

        // lisätään sääemojit säätilan perusteella
        var saaemoji = "";
        if (saakuvaus.includes("selkeä") || saakuvaus.includes("aurinko")) {
            saaemoji = "☀️";
        } else if (saakuvaus.includes("pilvi")) {
            saaemoji = "☁️";
        } else if (saakuvaus.includes("sade") || saakuvaus.includes("sadetta")) {
            saaemoji = "🌧️";
        } else if (saakuvaus.includes("ukkonen")) {
            saaemoji = "⛈️";
        } else if (saakuvaus.includes("sumu")) {
            saaemoji = "🌫️";
        } else {
            saaemoji = "🌍"; // yleisemoji, jos ei sovi muihin kategorioihin
        }

        teksti = teksti + "<div class='saa-box'>";
        teksti = teksti + "<h3>" + kaupunki + "</h3>";
        teksti = teksti + "<p>Sää: " + saakuvaus + " " + saaemoji + "</p>";
        teksti = teksti + "<p>Lämpötila: " + lampotila + "</p>";
        teksti = teksti + "<p>Tuulen nopeus: " + tuuli + "</p>";
        teksti = teksti + "</div>";
    }

    document.getElementById("saa").innerHTML = teksti;
}
