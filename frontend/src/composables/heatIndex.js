export default class {
    // utility functions
    toFahrenheit (celsius) {
        return (9 * celsius / 5 + 32);
    }
    toCelsius (fehrenheit) {
        return (5 * (fehrenheit - 32) / 9);
    }
    getType (input) {
        return ({}.toString.call(input).slice(8, -1));
    }

    // definition http://www.hpc.ncep.noaa.gov/html/heatindex_equation.shtml
    // input = {
    //     temperature: Number,  required
    //     humidity   : Number,  required
    //     fahrenheit : Boolean, optional
    // }
    calculate (input) {
        if (arguments.length === 0) {
            throw new Error("Invalid Argument. Need at least one.");
        }
        if (this.getType(input) !== 'Object') {
            throw new TypeError("Invalid Argument. Expecting 'Object'");
        }
        if (this.getType(input.temperature) !== 'Number' ||
        this.getType(input.humidity) !== 'Number') {
            throw new TypeError("Invalid Argument. temperature and humidity must be 'Number'");
        }

        var t = this.toFahrenheit(input.temperature) || 0,
            h = input.humidity || 0;

        if (input.fahrenheit) {
            t = input.temperature;
        }

        // Steadman's result
        var heatIndex = 0.5 * (t + 61 + (t - 68) * 1.2 + h * 0.094);

        // regression equation of Rothfusz is appropriate
        if (t >= 80) {
            var heatIndexBase = (-42.379                      +
                                   2.04901523 * t             +
                                  10.14333127         * h     +
                                  -0.22475541 * t     * h     +
                                  -0.00683783 * t * t         +
                                  -0.05481717         * h * h +
                                   0.00122874 * t * t * h     +
                                   0.00085282 * t     * h * h +
                                  -0.00000199 * t * t * h * h);
            // adjustment
            if (h < 13 && t <= 112) {
                heatIndex = heatIndexBase - (13 - h) / 4 * Math.sqrt((17 - Math.abs(t - 95)) / 17);
            } else if (h > 85 && t <= 87) {
                heatIndex = heatIndexBase + ((h - 85) / 10) * ((87 - t) / 5)
            } else {
                heatIndex = heatIndexBase;
            }
        }
        return (input.fahrenheit ? heatIndex : this.toCelsius(heatIndex));
    }
};
