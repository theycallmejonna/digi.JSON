// haetaan tiedot
fetch('https://api.visittampere.com/api/v1/visittampere/event/published/all/?format=json&lang=fi')

// muunnetaan vastaus JSON-muotoon
.then(function (response) { 
    return response.json();
})

// käsitellään muunnettu (eli JSON-muotoinen) vastaus
.then(function (responseJson) {

// kutsutaan funktiota ja välitetään sille JSON-vastaus
    tapahtumat(responseJson);
})

// jos tuli jokin virhe
.catch(function (error) { 
    document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan </p>" + error;
});

// tapahtumat-funktio JSON-datan käsittelyyn
function tapahtumat(data) {
    var teksti = "";
    teksti = "<h1>Tampereella tapahtuu</h1>";
    for (var i = 0; i < data.length; i++) {
        teksti = teksti + "<h3>" + data[i].name + "</h3>";
        teksti = teksti + "<p>" + data[i].description + "</p>";
        teksti = teksti + "<p> <a href='" + data[i].url + "' target='_blank'>" + data[i].url + "</a></p>";
    }
    document.getElementById("vastaus").innerHTML = teksti; // Päivitetään oikea elementti
}
