function kerro(data){
    var teksti = ""; 

    // Toteutuksen nimi
    teksti = "<h1>" + data.toteutus.nimi + "</h1>"; 
    
    // Osallistujat
    teksti += "<p><b>Osallistujien lukumäärä:</b> " + data.toteutus.osallistujat.lukumaara + "</p>";
    teksti += "<h3>Osallistujat</h3><ul>";
    for (var i in data.toteutus.osallistujat.nimet) {
        teksti += "<li>" + data.toteutus.osallistujat.nimet[i] + "</li>";
    }
    teksti += "</ul>";
    
    // Ajankohta
    teksti += "<p><b>Alkamisaika:</b> " + data.toteutus.ajankohta.alku + "</p>";
    teksti += "<p><b>Loppumisaika:</b> " + data.toteutus.ajankohta.loppu + "</p>";
    teksti += "<p><b>Kesto viikkoina:</b> " + data.toteutus.ajankohta.kesto_viikkoina + "</p>";
    
    // Kuva
    teksti += '<img src="' + data.toteutus.kuva + '" alt="JSON-kuva" width="300"><br>';
    
    // Kirjoitetaan teksti HTML-elementtiin
    document.getElementById("vastaus").innerHTML = teksti;
}    

// Haetaan JSON-tiedosto
fetch('https://example.com/digitekniikat.json')
    .then(response => response.json())
    .then(responseJson => {
        kerro(responseJson);
    })
    .catch(error => {
        document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
    });
