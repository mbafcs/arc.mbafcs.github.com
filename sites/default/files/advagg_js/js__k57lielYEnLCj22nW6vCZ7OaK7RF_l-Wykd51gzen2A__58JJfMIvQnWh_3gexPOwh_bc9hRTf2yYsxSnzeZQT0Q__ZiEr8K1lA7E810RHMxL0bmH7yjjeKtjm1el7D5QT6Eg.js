/**
 * Created by ujrmca on 14/01/2015.
 */
(function ($) {
    Drupal.behaviors.idiomaUpdater = {
        attach: function (context, settings) {
            $('select#course').change(function() {
                var check_idioma = false;
                var id = this.value,
                    radios_idioma = $('form.applicationform #idioma'),
                    idiomas = settings.idiomaUpdater.cursosidioma[id];

                radios_idioma.find("input").each(function(){
                    $(this).attr('disabled','disabled');
                    $(this).prop('checked', false);
                });
                if(idiomas != undefined) {

                    $.each(idiomas, function (index, value) {
                        var input = $('form.applicationform #idioma').find('input[value="' + value + '"]');
                        if (idiomas.length == 1) {
                            input.prop("checked", true);
                        }
                        input.removeAttr('disabled');
                    });

                    if (idiomas.length == 1) {
                        //formValidation.updateStatus("idioma", 'NOT_VALIDATED');
                        jQuery("#idioma.form-radios").removeClass("has-error").removeClass("has-successs");
                        jQuery("#idioma.form-radios i").hide();
                    }else{
                        check_idioma = true;
                    }
                }

                if(jQuery('#idioma').hasClass('hidden') && check_idioma){
                    jQuery('#idioma,input[name="idioma"]').removeClass('hidden');
                    jQuery('label[for="idioma"]').removeClass('element-invisible');
                }else{
                    jQuery('#idioma,input[name="idioma"]').addClass('hidden');
                    jQuery('label[for="idioma"]').addClass('element-invisible');
                }

                var formValidation = jQuery("form.applicationform").data("formValidation");
                
                if (formValidation.isValidField("idioma") != null)
                    formValidation.revalidateField("idioma");
            });
        }
    };
})(jQuery);;/**/
