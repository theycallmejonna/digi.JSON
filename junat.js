// haetaan Tampereen kautta kulkevat junat Digitrafficin API:sta
fetch("https://rata.digitraffic.fi/api/v1/live-trains/station/TPE?departing_trains=10&include_nonstopping=false")
    .then(function (response) {
        return response.json();
    }) 
    .then(function (data) {
        naytaJunat(data);
    })
    .catch(function (error) {
        document.getElementById("junat").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>" + error;
    });

// funktio junien tietojen käsittelyyn
function naytaJunat(data) {
    var teksti = "<h2>Junat, jotka kulkevat Tampereen kautta</h2>";

    for (var i = 0; i < data.length; i++) {
        var junaNro = data[i].trainNumber;
        var junatyyppi = data[i].trainCategory;
        var lahtoasema = data[i].timeTableRows[0].stationShortCode;
        var vika = data[i].timeTableRows.length - 1;
        var maaranpaa = data[i].timeTableRows[vika].stationShortCode;
        var lahtoaika = "";

        // käydään läpi aikataulut ja haetaan Tampereelta lähtevien junien tiedot
        for (var j = 0; j < data[i].timeTableRows.length; j++) {
            if (data[i].timeTableRows[j].stationShortCode == "TPE" && data[i].timeTableRows[j].type == "DEPARTURE") {
                var pvm = data[i].timeTableRows[j].scheduledTime;
                lahtoaika = pvm.substr(0, 10) + " kello: " + pvm.substr(11, 5);
                break;
            }
        }

        // näytetään vain Tampereelta lähtevät junat
        if (lahtoaika !== "") {
            teksti = teksti + "<div class='juna-box'>";
            teksti = teksti + "<h3>Juna " + junaNro + " (" + junatyyppi + ")</h3>";
            teksti = teksti + "<p><strong>Lähtöasema:</strong> " + lahtoasema + "</p>";
            teksti = teksti + "<p><strong>Määränpää:</strong> " + maaranpaa + "</p>";
            teksti = teksti + "<p><strong>Lähtöaika Tampereelta:</strong> " + lahtoaika + "</p>";
            teksti = teksti + "</div>";
        }
    }

    document.getElementById("junat").innerHTML = teksti;
}
