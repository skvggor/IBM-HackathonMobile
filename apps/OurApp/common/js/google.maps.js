"use strict";

var googleMaps;

googleMaps = function() {
  navigator.geolocation.getCurrentPosition(function(position){
    var infowindow, conteudoInfoWindow, estilosMapa, localizacoes, localizacao, mapOptions, mapa, iconeMarcador, marcador;

    localizacao = [];
    marcador = [];
    mapOptions = [];
    mapa = [];
    marcador = [];
    infowindow = [];
    conteudoInfoWindow = [];

    // TODO...
    conteudoInfoWindow[0] =
        "<div class='infowindow'>" +
          "<div class='nome-empresa'>" +
            "<p><b>Você está aqui</b></p>" +
          "</div>" +
        "</div>";

    conteudoInfoWindow[1] =
        "<div class='infowindow'>" +
          "<div class='nome-empresa'>" +
            "<p><b>Hostel Bella Paulista</b></p>" +
          "</div>" +
          "<div class='endereco-mapa'>" +
            "<p>" +
              "Avenida Paulista, 1260<br />" +
              "Bela Vista - São Paulo - SP. <br />" +
              "CEP: 01323-001" +
            "</p>" +
          "</div>" +
        "</div>";

    conteudoInfoWindow[2] =
        "<div class='infowindow'>" +
          "<div class='nome-empresa'>" +
            "<p><b>Restaurante Bernardino</b></p>" +
          "</div>" +
          "<div class='endereco-mapa'>" +
            "<p>" +
              "Avenida Bernadino de Campos, 227<br />" +
              "São Paulo - SP. <br />" +
              "CEP: 04004-050" +
            "</p>" +
          "</div>" +
        "</div>";

    estilosMapa = [
        {
          stylers: [
            { hue: "#DDFFAA" },
            { saturation: 100 }
          ]
        }, {
          featureType: "road.local",
          elementType: "labels",
          stylers: [
            { lightness: 0 },
            { visibility: "on" }
          ]
        }, {
          featureType: "road",
          elementType: "labels",
          stylers: [
            { visibility: "on" }
          ]
        }
    ];

    iconeMarcador = 'images/icon-map.png';

    localizacoes = [
        [position.coords.latitude, position.coords.longitude],
        ["-23.573741", "-46.642304"],
        ["-23.574991", "-46.641798"]
    ];
  
    mapOptions = {
        center: new google.maps.LatLng(localizacoes[0][0], localizacoes[0][1]),
        zoom: 17,
        minZoom: 15,
        maxZoom: 18,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    mapa = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    mapa.setOptions({styles: estilosMapa});

    jQuery.each(localizacoes, function(i) {
      localizacao[i] = new google.maps.LatLng(localizacoes[i][0], localizacoes[i][1]);

      marcador[i] = new google.maps.Marker({
          position: localizacao[i],
          title: "Lugar qualquer",
          icon: iconeMarcador
      });

      marcador[i].setMap(mapa);
      marcador[i].setAnimation(google.maps.Animation.DROP);

      infowindow[i] = new google.maps.InfoWindow({
          content: conteudoInfoWindow[i]
      });
  
      google.maps.event.addListener(marcador[i], 'click', function () {
        var expr;

        expr = marcador[i].getAnimation() !== null
               ? marcador[i].setAnimation(null)
               : marcador[i].setAnimation(google.maps.Animation.BOUNCE);

        expr = infowindow[i].getMap()
               ? infowindow[i].close()
               : infowindow[i].open(mapa, marcador[i]);
      });
    });
  });
}

google.maps.event.addDomListener(window, 'load', googleMaps);