odoo.define('prueba_modulo.gauge_2', function(require) {
    'use strict';

    console.log("Self_gauge", self);
    var gauge = new JustGage({
        id: "gauge_widget", // the id of the html element
        value: 10,
        min: 0,
        max: 100,
        decimals: 0,
        gaugeWidthScale: 0.6,
        customSectors: {
            percents: true, // lo and hi values are in %
            ranges: [{
              color : "#0000ff", //azul
              lo : 0,
              hi : 39
            },
            {
              color : "#006400", //verde
              lo : 40,
              hi : 49
            },
            {
              color : "#ffff00", //amarillo
              lo : 50,
              hi : 69
            },
            {
              color : "#ffa420", //naranja
              lo : 70,
              hi : 89
            },
            {
              color : "##f80000", //rojo
              lo : 90,
              hi : 95
            }            
        ]
          },
          donut: true,
          counter: False,
          title: "Progreso",
          symbol: '%',
          pointer: true,
          pointerOptions: {
            toplength: -15,
            bottomlength: 10,
            bottomwidth: 12,
            color: '#8e8e93',
            stroke: '#ffffff',
            stroke_width: 3,
            stroke_linecap: 'round'
          },

    });

// update the value randomly
setInterval(() => {
gauge.refresh(Math.random() * 100);
}, 5000)



})