// lakalaivan liikennekameran ID
var lakalaivaID = "C04507"; // Lakalaivan aseman tunnus

// haetaan kaikki liikenneasemat ja suodatetaan lakalaivan asema
fetch("https://tie.digitraffic.fi/api/weathercam/v1/stations")
    .then(function (response) {
        return response.json();
    }) 
    
    // muunnetaan vastaus JSONiksi
    .then(function (data) {
        var lakalaivaAsema = data.features.find(function (asema) {
            return asema.properties.id === lakalaivaID;
        });

        if (lakalaivaAsema) {
            naytaKamerat(lakalaivaAsema);
        } else {
            document.getElementById("kamerat").innerHTML = "<p>Lakalaivan liikennekameraa ei löytynyt.</p>";
        }
    })
    .catch(function (error) {
        document.getElementById("kamerat").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>" + error;
    });

// funktio lakalaivan liikennekamerakuvien käsittelyyn
function naytaKamerat(asema) {
    var teksti = "";

    if (!asema.properties.presets || asema.properties.presets.length === 0) {
        teksti += "<p>Ei liikennekamerakuvia saatavilla.</p>";
    } else {
        for (var i = 0; i < asema.properties.presets.length; i++) {
            var kameraID = asema.properties.presets[i].id;
            var kuvaUrl = "https://weathercam.digitraffic.fi/" + kameraID + ".jpg"; // kameran kuvan URL
            var aika = new Date(asema.properties.dataUpdatedTime).toLocaleString("fi-FI"); // päivitysaika

            teksti = teksti + "<div class='kamera-box'>";
            teksti = teksti + "<h3>Lakalaiva - Kamera " + kameraID + "</h3>";
            teksti = teksti + "<p><strong>Päivitetty:</strong> " + aika + "</p>";
            teksti = teksti + "<img src='" + kuvaUrl + "' alt='Liikennekamera' class='kamera-kuva'>";
            teksti = teksti + "</div>";
        }
    }

    document.getElementById("kamerat").innerHTML = teksti;
}
