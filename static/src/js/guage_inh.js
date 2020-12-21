odoo.define('prueba_modulo.gauge.ihn', function(require) {
    'use strict';
    //var gauge_widget = require();
    //var GaugeWidget = core_form_widget.get()
    //odoo.prueba_modulo = function(instance, local){ local.xxx = ...;}

    var gauge_W = require('web_kanban_gauge.widget');
    var AbstractField = require('web.AbstractField');
    var field_registry = require('web.field_registry');
    var utils = require('web.utils');

    /**
     * options
     *
     * - max_value: maximum value of the gauge [default: 100]
     * - max_field: get the max_value from the field that must be present in the
     *   view; takes over max_value
     * - gauge_value_field: if set, the value displayed below the gauge is taken
     *   from this field instead of the base field used for
     *   the gauge. This allows to display a number different
     *   from the gauge.
     * - label: lable of the gauge, displayed below the gauge value
     * - label_field: get the label from the field that must be present in the
     *   view; takes over label
     * - title: title of the gauge, displayed on top of the gauge
     * - style: custom style
     */
        
    var GaugeWidget = gauge_W.extend({
        className: "oe_gauge",
        cssLibs: [
            '/web/static/lib/nvd3/nv.d3.css'
        ],
        jsLibs: [
            '/web/static/lib/nvd3/d3.v3.js',
            '/web/static/lib/nvd3/nv.d3.js',
            '/web/static/src/js/libs/nvd3.js'
        ],
    
        //--------------------------------------------------------------------------
        // Private
        //--------------------------------------------------------------------------
    
        /**
         * @override
         * @private
         */
        _render: function () {
            // parameters

            var value = _.isArray(val) && val.length ? val[val.length-1].value : val;
            // displayed value under gauge
            var gauge_value = value;
            if (this.nodeOptions.gauge_value_field) {
                gauge_value = this.recordData[this.nodeOptions.gauge_value_field];
            }
    
            // top title
            addText(title, 16, 0, -outerRadius-16).style("font-weight",'bold');
    
            // center value
            addText(utils.human_number(value, 1), fontSize, 0, -2).style("font-weight",'bold');
    
            // bottom label
            addText(0, 8, -(outerRadius+innerRadius)/2, 12);
            addText(label, 8, 0, 12);
            addText(utils.human_number(max_value, 1), 8, (outerRadius+innerRadius)/2, 12);
    
            // chart
            svg.append("path")
                .datum({endAngle: Math.PI/2})
                .style("fill", "#ffffff")
                .attr("d", arc);
    
            var foreground = svg.append("path")
                .datum({endAngle: 0})
                .style("fill", "hsl(0,90%,80%,70%,50%,40%)")
                .attr("d", arc);
       
            foreground.transition()
                .style("fill", "hsl(" + hue + ",90%,80%,70%,50%,40%)")
                .duration(1500)
                .call(arcTween, (ratio-0.5)*Math.PI);
    
            function arcTween (transition, newAngle) {
                transition.attrTween("d", function(d) {
                    var interpolate = d3.interpolate(d.endAngle, newAngle);
                    return function (t) {
                        d.endAngle = interpolate(t);
                        return arc(d);
                    };
                });
            } 
        },

    
    });
    alert("Gauge overriden");
    field_registry.add("gauge_2", GaugeWidget);
    
    return GaugeWidget;
    
});
        
        