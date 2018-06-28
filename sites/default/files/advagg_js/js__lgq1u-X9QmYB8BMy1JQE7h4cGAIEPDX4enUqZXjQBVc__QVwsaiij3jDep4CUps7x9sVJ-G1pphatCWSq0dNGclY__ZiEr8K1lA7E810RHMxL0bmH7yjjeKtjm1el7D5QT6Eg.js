var CountryDataService = function () {
    this.countriesData = null;
};

CountryDataService.prototype.init = function (route) {
    var self = this;
    jQuery.get(route).done(function (data) {
        self.countriesData = jQuery.parseJSON(data);
    })
};
CountryDataService.prototype.getAll = function () {
    return this.countriesData
};
CountryDataService.prototype.getByCountry = function (countryISO2) {
    if (this.countriesData != null && countryISO2 in this.countriesData) {
        return this.countriesData[countryISO2];
    }
    return [];
};
;/**/
/**
 * Created by uimm6a on 05/02/2016.
 */
(function ($) {

    Drupal.behaviors.adobeTracking = {
        attach: function (context, settings) {

            var data = settings.adobeTracking;
            if(typeof(analitica) != "undefined") {
                var app = new analitica();
            }
            else {
                return;
            }

            if (data != undefined) {
                app.data = data;
                app.init();
            }
        }
    };
})(jQuery);
;/**/
