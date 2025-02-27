function kerro(data) {
    var teksti = "";

    // toteutuksen nimi
    teksti = "<h1>" + data.toteutus.nimi + "</h1>";

    // osallistujat
    teksti = teksti + "<p><b>Osallistujien lukumäärä:</b> " + data.toteutus.osallistujat.lukumaara + "</p>";
    teksti = teksti + "<h3>Osallistujat</h3><ul>";
    for (var i in data.toteutus.osallistujat.nimet) {
        teksti = teksti + "<li>" + data.toteutus.osallistujat.nimet[i] + "</li>";
    }
    teksti = teksti + "</ul>";

    // ajankohta
    teksti = teksti + "<p><b>Alkamisaika:</b> " + data.toteutus.ajankohta.alku + "</p>";
    teksti = teksti + "<p><b>Loppumisaika:</b> " + data.toteutus.ajankohta.loppu + "</p>";
    teksti = teksti + "<p><b>Kesto viikkoina:</b> " + data.toteutus.ajankohta.kesto_viikkoina + "</p>";

    // kuva (oikeassa paikassa)
    if (data.toteutus.kuva && data.toteutus.kuva.startsWith("http")) {
        teksti = teksti + '<img src="' + data.toteutus.kuva + '" alt="JSON-kuva" width="300" onerror="this.onerror=null; this.src=\'fallback.jpg\';"><br>';
    } else {
        teksti = teksti + "<p><b>Kuvaa ei voitu ladata.</b></p>";
    }

    // kirjoitetaan teksti HTML-elementtiin
    document.getElementById("vastaus").innerHTML = teksti;
}

// haetaan JSON-tiedosto
fetch('https://theycallmejonna.github.io/digi.JSON/toteutus.json')

    // muunnetaan vastaus JSON-muotoon
    .then(function (response) {
        return response.json();
    })

    // käsitellään muunnettu JSON-vastaus
    .then(function (responseJson) {
        // kutsutaan funktiota ja välitetään sille JSON-vastaus
        kerro(responseJson);
    })

    // jos tuli jokin virhe
    .catch(function (error) {
        document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
    });
