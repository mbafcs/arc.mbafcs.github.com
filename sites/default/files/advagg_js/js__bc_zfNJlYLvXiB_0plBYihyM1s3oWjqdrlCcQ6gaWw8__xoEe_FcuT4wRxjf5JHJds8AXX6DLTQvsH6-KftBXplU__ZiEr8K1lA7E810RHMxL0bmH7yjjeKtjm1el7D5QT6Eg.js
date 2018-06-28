/**
 * @fileOverview Proyecto de gestión de la analítica del Grupo Planeta, proyecto ESLSCA
 *
 * @version     0.1
 *
 * @author      Alejo Almela Gonzalez
 * @copyright   Grupo Planeta S.A
 *
 */
'use strict';
/**
 * Creación del objeto analitica
 * Inicialización de los parámetros básicos.
 * @return null
 * */
var analitica = function () {
    this.name = 'analitica';
    this.version = '0.1';
    this.data = null;
    this.form = {
        id :'#planeta-cupon-form,#planeta-sa-form,#webform-client-form-15',
        isView: false,
        errors: '.help-block[data-fv-result="INVALID"]',
        isInitialize: false
    };
    this.pages= {
        page404 : '.page-404',
        thanks_si: 'thank_you_si',
        thanks_sa: 'thank_you_sa'
    };
    this.event = {
        typeEvent: null,
        action: null,
        location: null,
        virtual : null
    };
    this.path = {
        language: null,
        main_path: null,
        second_path : null,
        full_path: location.pathname
    };
    this.categories = {
        path: '#main.category .main-body .more-link',
        classes: '.category',
        id: 'data-id',
        position: 'data-position'
    };
    this.products = {
        classes: '#main',
        id: 'data-id',
        position: 'data-position'
    };
    this.product = {
        classes: '.product',
        attribute: 'data-id',
        tag: 'header'
    };
};
/**
 * Constructor de la aplicación.
 * @return null
 */
analitica.prototype.init =  function(){
    var me = this;
    var $ = jQuery;

    if (me.data != null && typeof(_satellite) != "undefined" && (_satellite != null || _satellite != undefined)) {
        me.setCampaing();
        me.setPage();
    }
    if ($(me.product.classes).length > 1 || me.data.page_type == me.pages.thanks_si || me.data.page_type == me.pages.thanks_sa){
        dataLayer.setProduct(me.data.as_id);
    }

    if (!me.form.isView) {
        if (me.data.course_title != undefined) {
            me.form.isView = me.formSeenEvent(me.form.isView, me.form.id, me.data.course_title);
        } else {
            me.form.isView = me.formSeenEvent(me.form.isView, me.form.id, me.data.page);
        }
    }
    var BreakException = {}; var i = 0;
    try {
        location.pathname.split('/').forEach(function (ele) {
            if (ele.length > 0) {
                if ((ele.includes("en") || ele.includes("fr") || ele.includes("es") || ele.includes("es-ES")) && i == 1) {
                    me.path.language = ele;
                } else if (i == 2) {
                    me.path.main_path = ele;
                } else {
                    me.path.second_path = ele;
                    throw BreakException;
                }
            }
            i++;
        });
    } catch(e){

    }
    me.blogSearchPage();
    me.makeMarkup();

    if($(me.categories.classes).length > 0)
        me.setProductInList();

    me.setTransaction();
    me.makeListeners();
};


/**
 * Función para obtener el formName necesario a enviar
 * @param str
 * @returns string
 */
analitica.prototype.getFormType = function(str) {
    var formName = 'form';
    switch(str) {
        case "planeta-cupon-form":
            formName = 'form_sa_1';
            break;
        case "planeta-sa-form":
            formName = 'form_sa_2';
            break;
        case "webform-client-form-15":
            formName = 'form_contact';
            break;
    }
    return formName;
};

/**
 * Función para sanitizar las url
 * @param str
 * @returns string sin caracteres prohibidos
 */
analitica.prototype.sanitizeString = function(str) {
    var res = str.toLowerCase();
    var i=0;
    res = res.trim();
    while (i < str.length) {
        res = res.replace(" ", "-");
        i++;
    }
    res = res.replace('#','/').replace('\'','').replace(/^.*\/\/[^\/]+/, '');
    return res;
};
/**
 * Función isEmpty, comprueba que el objeto no esté vacío.
 * @param obj
 * @returns true or false
 */
analitica.prototype.isEmpty = function(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
};
/**
 * Comprueba si el elemento esta en la zona visible de la pantalla
 * @param elem
 * @returns true or false
 */
analitica.prototype.isScrolledIntoView = function(elem) {
    var $ = jQuery;
    var elemento = elem;
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = elemento.offset().top;
    var elemBottom = elemTop + elemento.height();
    return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
};
/**
 * Comprueba que el formulario se ha visto el formulario
 * @param wasSeen
 * @param element
 * @param pageTitle
 * @returns {boolean}
 */
analitica.prototype.formSeenEvent = function(wasSeen, element, pageTitle) {
    var me = this;
    var $ = jQuery;
    if ($(element).length != 0) {

        var elements = [];
        $.each($(element), function() {
            elements.push($(this).attr('id'));
        });

        var doit = false;
        $.each(elements, function() {
            var formName = me.getFormType(this);
            if (me.isScrolledIntoView($("#"+this))) {
                dataLayer.setEvent('view',formName,pageTitle, 1,1);
                if($('#planeta-sa-form').length != 0) {
                    setTimeout(function(){}, 500);
                    dataLayer.setEvent('continue_sa', 'form', pageTitle, 1, 0);
                }
                _satellite.track('setEvent');
                doit = true;
            }
        });

        if(doit) {
            return (true);
        }

    }
    return(false);
};
/**
 * Crear los listeners de la aplicación.
 */
analitica.prototype.makeListeners = function(){
    var me = this;
    var $ = jQuery;
    $('.navbar-toggle').on('click',function(){
        me.event.typeEvent = "menu_mobile";
        me.event.action = $($(this).attr('data-target')).attr('aria-expanded') =='true' ? 'close' : 'open';
        me.event.location = "menu";
        me.setEvent();
    });
    $('.phone-header').on('click',function(){
        me.event.typeEvent = "contact";
        me.event.action = "telf_link";
        me.event.location = "call";
        me.setEvent();
    });
    $('.go-to-form .eslsca-button').on('click',function(){
        me.event.typeEvent = "call";
        me.event.action = "demanda_informacion";
        me.event.location = me.path.full_path;
        me.setEvent();
    });
    $('#desktop-header-menu, #ecole-menu').on('click', 'a', function(){
        me.event.typeEvent = "main_menu";
        me.event.action = $(this).attr('href');
        me.event.location = "menu";
        me.setEvent();
    });
    $('#top-menu, #campus-virtual').on('click', 'a', function(){
        me.event.typeEvent = "area_menu";
        me.event.action = $(this).attr('href');
        me.event.location = "menu";
        me.setEvent();
    });
    $('#eslsca-virtual-campus, #eslsca-link-social, #eslsca-corp').on('click', 'a', function(){
        me.event.typeEvent = "click";
        me.event.action = $(this).attr('href');
        me.event.location = "footer";
        me.setEvent();
    });
    $('#language').on('click', 'a', function () {
        me.event.typeEvent = "change";
        me.event.action = $(this).attr('hreflang');
        me.event.location = "language";
        me.setEvent();
    });
    $('#mbafcs-carousel .carousel-indicators').on('click', 'li', function () {
        me.event.typeEvent = "home_click";
        me.event.action = $(this).attr('data-slide-to') + ":" +$($('#mbafcs-carousel .carousel-inner .item')[$(this).attr('data-slide-to')]).find('.title-carousel').text();
        me.event.location = "slider";
        me.setEvent();
    });
    $('#mbafcs-carousel .box-carousel .box-button').on('click', '.link-button', function () {
        me.event.typeEvent = "home_link";
        var pos = $(this).parent().attr('data-position');
        me.event.action = (pos == undefined? 0 : pos) + ":" +$($('#mbafcs-carousel .owl-stage .owl-item.active')).find('.title-carousel').text();
        me.event.location = "slider";
        me.setEvent();
    });
    $('aside.presentation-menu').on('click', 'a', function () {
        me.event.typeEvent = "internal_menu";
        me.event.action = $('.presentation-title').text() + ":" + $(this).text();
        me.event.location = "menu";
        me.setEvent();
    });
    $('aside.category-menu').on('click', 'a', function () {
        me.event.typeEvent = "internal_menu";
        me.event.action = $('#desktop-header-menu li.active').text() + ":" + $(this).text();
        me.event.location = "menu";
        me.setEvent();
    });
    $('.download-document').on('click', function(){
        me.event.typeEvent = "click";
        me.event.action = $('.title_product').text();
        me.event.location =  "pdf_program";
        me.setEvent();
    });


    /** Eventos formulario, detección de errores y envio de los mismos.**/
    $(me.form.id).on('click','button[type=submit]', function(){
        var idForm = $(this).parents('form').attr("id");
        me.event.typeEvent = "try_send";
        me.event.location = me.getFormType(idForm);
        me.event.action = (me.data.course_title != undefined ? me.data.course_title : me.data.page);
        me.setEvent();
        var timerID = window.setTimeout(function(){
            clearTimeout(timerID);
            if ($(me.form.errors).length){
                me.event.typeEvent = "error";
                me.event.location = (me.data.page_type != me.pages.thanks_sa ? 'form' : 'form_sa_1');
                me.event.action = (me.data.course_title != undefined ? me.data.course_title : me.data.page);
                me.setEvent();
                setTimeout(function(){}, 1000);
                /** Campos erróneos concatenados, las 3 primeras letras de cada campo erróneo.**/
                me.event.typeEvent = "error_message";
                me.event.location = me.getFormType(idForm);
                me.event.action = '';
                $(me.form.errors).each(function(i){
                    if(i>0){
                        me.event.action += ':';
                    }
                    me.event.action += $(this).attr('data-fv-for').substring(0,3);
                });
                me.setEvent();
            }
        }, 500)
    }).on('click', 'a[data-toggle=modal]', function(){
        me.event.virtual =  me.path.full_path + '/virtual/' + me.sanitizeString($(this).text());
        me.setVirtual();
    }).on('click', '.form-item', function(){
        var idForm = $(this).parents('form').attr("id");
        if (!me.form.isInitialize){
            me.form.isInitialize = true;
            me.event.typeEvent = "start";
            me.event.location = me.getFormType(idForm);
            me.event.action = (me.data.course_title != undefined ? me.data.course_title : me.data.page);
            me.setEvent();
        }
    });

    // TODO check this listener (function setProductClick requires element, but and id number is sended)
    $(me.products.classes).on('click', 'a[data-id]', function () {
        //me.setProductClick($(this).attr(me.products.id));
        me.setProductClick(this);
    });

    $(me.categories.path).on('click', function(){
        me.setProductClick(this);
    });

    /** Blog **/
    $('#edit-search-api-viewed-wrapper').on('click', '#edit-submit-blog-view', function(){
        me.event.typeEvent = "search";
        me.event.action = 'blog_search';
        me.event.location =  $('#edit-search-api-viewed-wrapper input').val();
        me.setEvent();
    });
    $('#article-features-right').on('click', '.circle-icon', function(){
        me.event.typeEvent = "share";
        me.event.action = $(this).children('a').children('i').attr('class').replace('fa','').replace('fa-','');
        me.event.location =  me.path.full_path;
        me.setEvent();
    });
    $('.home-blog').on('click', 'a[data-position]', function(){
        if ($('.search-blog').length > 0){
            me.event.typeEvent =  "result_click";
            me.event.action = "blog_search";
            me.event.location = $('.result_search-blog').text() + ':' + $(this).attr('data-position') + ':' + $(this).attr('href');
            me.setEvent();
        }else{
            me.event.typeEvent =  "blog";
            me.event.action = $(this).text();
            me.event.location =  $(this).attr('data-position') + ':' + $(this).attr('href');
            me.setEvent();
        }
    });
    $('#eslsca-blog').on('click', 'a[data-position]', function(){
            me.event.typeEvent =  "blog";
            me.event.action = $(this).parents('.blog-content').children('.title_post').text().trim();
            me.event.location =  $(this).attr('data-position') + ':' + $(this).attr('href');
            me.setEvent();
    });

    /** virtuals **/
    $('#main.product .content .items, #main.programs .content .items ').on('click', '.header', function () {
        me.event.virtual = '/virtual/' + me.sanitizeString($(this).text());
        me.setVirtual();
    });
    $(window).scroll(function(){
        if (!me.form.isView && $(me.form.id).length > 0) {
            if (me.isScrolledIntoView($(me.form.id))) {
                dataLayer.setEvent('form','view',me.data.page, 1,1);
                try {
                    _satellite.track('setEvent');
                }catch (e){
                    console.log('Error in _satellite: [setEvent][form][view] ' + e );
                }
                me.form.isView = true;
            }
        }
    });
};
/**
 * Obtiene el parametro de la url
 * @param sParam
 * @returns valor del parámetro
 */
analitica.prototype.getUrlParameter = function(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
/**
 * Envia los datos del la página, si tiene o no campaña definida.
 */
analitica.prototype.setCampaing = function(){
    var me = this;
    me.data.term_content = me.getUrlParameter('utm_content');
    me.data.term_content = (me.data.term_content == undefined? "":me.data.term_content);
    var url = window.location.href;
    var params = url.split("?");

    if(params[1] != undefined){
        dataLayer.setCampaign(
            me.data.medium,
            me.data.source,
            me.data.publisher,
            me.data.campaign,
            me.data.term_analytics,
            me.data.term_content
        );
    } else {
        dataLayer.setCampaign(
            "",
            "",
            "",
            me.data.campaign,
            "",
            "");
    }
};
/**
 * Envia información a analitica de la página en la que estas navegando
 */
analitica.prototype.setPage = function(){
    var me = this;
    var $ = jQuery;
    if($(me.pages.page404).length != 0){
        me.data.page = 'path página no encontrada/error-404';
        me.data.page_type = 'error';
        dataLayer.setPage(
            me.data.page,
            me.data.page_type,
            'true',
            '404',
            me.data.referer,
            me.data.course_area,
            me.data.course_type,
            ''
        );
    } else {
        dataLayer.setPage(
            me.data.page,
            me.data.page_type,
            'false',
            '',
            me.data.referer,
            me.data.course_area,
            me.data.course_type,
            (me.data.page_type == me.pages.thanks_si || me.data.page_type == me.pages.thanks_sa ? me.data.country_id : '')
        );
    }

    try {
        _satellite.track('setPage');
    }catch (e){
        console.log('Error in _satellite: [setPage] ' + e );
    }
};
/**
 * Envia información del evento pulsado,
 * @requires makeListeners
 */
analitica.prototype.setEvent = function(){
    var me = this;
    var $ = jQuery;
    switch(me.event.typeEvent){
        case "try_send":
            _satellite.track('startCheckout');
        case "contact": // Click en telefono
        case "menu_mobile":
        case "main_menu":
        case "area_menu":
        case "click":
        case "change":
        case "home_click":
        case "home_link":
        case "internal_menu":
        case "error":
        case "error_message":
        case "start":
            dataLayer.setEvent(me.event.typeEvent, me.event.location, me.event.action, 1, 0);
            break;
        case "blog_search_success":
        case "result_click":
        case "search":
        case "call":
            dataLayer.setEvent(me.event.typeEvent, me.event.action ,me.event.location , 1, 0);
            break;
        case "blog":
            dataLayer.setEvent(me.event.location, me.event.typeEvent ,me.event.action , 1, 0);
            break;
        default:
            dataLayer.setEvent(me.event.typeEvent, me.event.action, 1, 0);
            break;
    }

    try {

        switch(me.event.typeEvent){
            case "start":
                _satellite.track('addProduct');
                break;
        }
        _satellite.track('setEvent');
    }catch (e){
        console.log('Error in _satellite: [setEvent][' +me.event.typeEvent+']['+me.event.location+ '][' + me.event.action +' ][' + e + ']' );
    }
    me.event.typeEvent = "";
    me.event.action = "";
    me.event.location = "";
};
/**
 * Captura los eventos de las páginas virtuales
 */
analitica.prototype.setVirtual = function(){
    var me = this;
    var $ = jQuery;
    dataLayer.setVirtualPage(me.path.full_path + me.event.virtual);
    try {
        _satellite.track('setVirtualPage');
    }catch (e){
        console.log('Error in _satellite: [setVirtualPage][' +me.path.full_path+'][' + me.event.virtual +' ][' + e + ']' );
    }
};
/**
 * Captura los click en productos
 * @param ele
 */
analitica.prototype.setProductClick = function(ele){
    var me = this;
    var $ = jQuery;
    dataLayer.setProductClick($(ele).attr(me.categories.position));
    try {
        _satellite.track('setProductClick');
    }catch (e){
        console.log('Error in _satellite: [setProductClick][' +$(ele).attr(me.categories.position) +']' );
    }
};
/**
 * Modifica el markup del sitio para las necesidades de analitica
 */
analitica.prototype.makeMarkup = function(){
    var me = this;
    var $ = jQuery;
    var i = 0;
    $(me.categories.path).each(function(){
        $(this).attr(me.categories.position, ++i);
    });
    i = 0;
    $('.blog-post-item').each(function(){
        i++;
        $(this).find('.field-name-title-field a').attr('data-position', i);
        $(this).find('.field-type-image a').attr('data-position', i);
    });
    if ( $('body.front').length > 0){
        var pos = 0;
        $('#mbafcs-carousel .box-carousel .box-button').each(function () {
            pos ++;
            $(this).attr(me.categories.position, pos);

        });
    }
};
/**
 * Revisa la página para ver si contiene productos y envia un a lista a la analitica
 */
analitica.prototype.setProductInList = function(){

    var $ = jQuery;
    var me = this;

    $('#main.category .more-link').each(function(){
        dataLayer. setProductInList('courses_offer', $(this).attr(me.categories.id), $(this).attr('data-position'));
    });
    _satellite.track('setProductList');
};
/**
 * Función para gestionar todos los eventos de transacción
 */
analitica.prototype.setTransaction = function () {
    var me = this;

    if (me.data.page_type == me.pages.thanks_si || me.data.page_type == me.pages.thanks_sa){

        dataLayer.setProduct(me.data.as_id);
        var price = me.data.course_price.replace(/[€/\s]/g, '');

        if(me.data.page_type == me.pages.thanks_sa){
            //dataLayer.setTransaction(me.data.leadId,price,me.data.campaign,'SA');
            dataLayer.setEvent('transaction_sa', 'ecommerce',me.data.leadId,1,0);
        }else{
            dataLayer.setTransaction(me.data.leadId,price,me.data.campaign);
            _satellite.track('setTransaction');
        }


    }
};
/**
 * Gestión de los eventos del blog que se lanzan al cargar la página.
 */
analitica.prototype.blogSearchPage = function(){
    var me = this;
    var $ = jQuery;
    if ($('.search-blog').length > 0){
        me.event.typeEvent = "blog_search_success";
        me.event.action = 'search';
        me.event.location =  $('.search-blog .result_search-blog').text();
        me.setEvent();
    }
};
;/**/
/**
 * @fileOverview Aplicación de proyecto ESLSCA-paris.fr Grupo Planeta,
 *
 * @version     0.1
 *
 * @author      Alejo Almela Gonzalez
 * @copyright   Grupo Planeta S.A
 */
'use strict';
var app = function () {
    this.name = 'app';
    this.version = '0.1';
    this.form = '#form';
    this.htmlCarousel=  [
        {
            "html": null,
            "tag": '.owl-carousel',
            "parent": '.profesores',
            "nav": true,
            "scrollPerPage": true,
            "navText": [
                "<i class='fa fa-chevron-left'></i>",
                "<i class='fa fa-chevron-right'></i>"
            ],
            "loop":true,
            "responsiveClass":true,
            "responsive":{
                0:{
                    "items":1
                },
                767:{
                    "items":2
                }
            }
        }
    ];
    this.path = {
        'language': null,
        'main_path': null,
        'second_path' : null,
        'full_path': location.pathname
    };
};
/**
 * changeClass: Método de cambio de clase de un target determinado
 * @param target
 * @param delClass
 * @param addClass
 */
app.prototype.changeClass = function(target, delClass, addClass){
    var $ = jQuery;
    $(target)
        .removeClass(delClass)
        .addClass(addClass);
};
/**
 * bodyHeight: Método que calcula el alto de la ventana para ajustarla al elemento de mayor tamaño
 */
app.prototype.bodyHeight = function(){
    var $= jQuery;
    if ($('.expanded') != undefined) {
        var body = $('.expanded').next();
        body = body.height() + 100;
        body += 'px';
    }
    else{
        body = '0px';
    }
    $('.expanded').parent().parent().attr('style', 'min-height:' + body);

};
/**
 * init: Contructor del objeto de ESLSCA
 */
app.prototype.init = function(){
    var me = this;
    var $ = jQuery;
    var i = 0; var BreakException = {};
    try {
        location.pathname.split('/').forEach(function (ele) {
            if (ele.length > 0) {
                if ((ele.includes("en") || ele.includes("fr") || ele.includes("es") || ele.includes("es-ES")) && i == 1) {
                    me.path.language = ele;
                } else if (i == 2) {
                    me.path.main_path = ele;
                } else {
                    me.path.second_path = ele;
                    throw BreakException;
                }
            }
            i++;
        });
    } catch(e){

    }
    if ($('.download-program').length > 0){
        me.downloadPDF();
    }
    if ($('.presentation-menu-box').length > 0){
        $('#top-menu li.first.leaf a').addClass('active');
    } else if($('.presentation-corporative2-box').length > 0){
         $('#top-menu li.menu-corporative2.leaf a').addClass('active');
        } else if ($('#main').attr('data-parent-nav') != undefined && $('#main').attr('data-parent-nav').length > 1) {
        $('#ecole-menu a, #desktop-header-menu a, #top-menu a').each(function() {
            if ($(this).attr('href').indexOf($('#main').attr('data-parent-nav')) >= 0){
                if (!$(this).hasClass('active')) {
                    $($(this).parent()).addClass('active');
                }
            }
        });
    }

    //hide price
    if (Cookies.get('hidePrice') === undefined && $('.hidePrice').length > 0 ){
        $('.hidePrice').removeClass('hide');
    }

    //carrousel
    if ($('#mbafcs-carousel').length > 0) {
        $(".owl-top").owlCarousel({
            dotsSpeed: 800,
            paginationSpeed: 800,
            loop: true,
            items: 1,
            autoplaySpeed: 800,
            autoplay: true
        });
        /**
         * Agrega contedor padre con la clase "container" en el Carousel de la Home
         */
        $('.owl-dots').addClass('container');
    }

    if (('#eslsca-comentary').length > 0) {
        $(".owl-bottom").owlCarousel({
            dotsSpeed: 800,
            paginationSpeed: 800,
            loop: true,
            items: 1,
            autoplaySpeed: 800,
            autoplay: true
        });
    }

    $(".carousel-blog-home").owlCarousel({
        margin:10,
        navText: false,
        responsiveClass:true,
        loop:false,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            1024:{
                items:1,
                mouseDrag: false,
                dots: false
            }
        }
    });

    me.swapItem();
    me.bodyHeight();
    me.makeListeners();
};
/**
 * Función que gestiona el cambio de item dependiende del tamaño de la pantalla
 */
app.prototype.swapItem = function () {
    var $ = jQuery;
    if($(window).width() < 992){
        $('#article-features-right').remove().appendTo('#article-rss');
    }
    else{
        $('#article-features-right').remove().appendTo('aside#form');
    }
};
/**
 * Constructor de los listeners de la aplicación
 */
app.prototype.makeListeners = function(){
    var me = this;
    var $ = jQuery;
    $('.go-to-form').on('click', 'a', function(eve){
        eve.preventDefault();
        if ($(this).attr('data-ref').length > 0){
            window.location.href = $(this).attr('data-ref');
        } else {
            me.scrollTo($(this).attr('href'), 300);
        }
    });
    $('#main.product .content .items .header, #main.programs .content .programs-box .header')
        .on('click', function(eve){
        	if ($(window).width() < 769 && $(this).parent().hasClass('programs-box')){
           		eve.preventDefault();
        	}
            if ($(this).hasClass('unexpanded')) {
                $('.header h2 div.subtitulo').addClass('hide');
                $('#main.product .content .items .header, #main.programs .content .programs-box .header').each(function(){
                    me.changeClass(this, 'expanded', 'unexpanded');
                    $(this).parent().parent().removeAttr('style');
                });
                me.changeClass(this, 'unexpanded', 'expanded');
                $(this).find('.subtitulo').removeClass('hide');
                if ($(window).width() > 768){
                    me.bodyHeight();
                }else if ($(window).width() < 769) {
                    me.scrollTo(this, 300);
                }
                if ($(this).attr('data-carousel')){
                    me.makeCarousel();
                }
            }
            else if ($('#main.product .content .items .header, #main.programs .content .programs-box .header').length > 1) {
                me.changeClass(this, 'expanded', 'unexpanded');
            }
    });
    $(window)
        .on('resize', function(){
            me.bodyHeight();
            me.swapItem();
        })
        .on('scroll', function(){
            if ($(window).width() < 960) {
                if ($('form.applicationform').length > 0 && $('form').isOnScreen()) {
                    $('.go-to-form').hide();
                } else {
                    $('.go-to-form').show();
                }
            }
        });

};
/**
 * makeCarousel: Metodo que construye el carousel de OwlCarousel, se tiene que recrear cada vez que está en un tab
 * ya que no puede calcular el tamaño en un tab oculto.
 */
app.prototype.makeCarousel = function(){
    var me = this;
    var $ = jQuery;
    me.htmlCarousel.forEach(function(element){
        if ($(element.tag).length > 0 && $(element.parent).length > 0 && element.html == null){
            element.html =  $(element.parent).html();
        }
        if (element.html != null && $(element.tag).length > 0 && $(element.parent).length > 0 ) {
            $(element.parent).html(element.html);

            $(element.tag).owlCarousel({
                items: element.items ,
                nav: element.nav,
                scrollPerPage: element.scrollPerPage,
                navText: element.navText,
                loop: element.loop,
                responsiveClass: element.responsiveClass,
                responsive: element.responsive
            });
        }
        me.bodyHeight();
    });


};
/**
 * scrollTo: Método de movimiento de la ventana.
 * @param ele
 * @param relPos
 */
app.prototype.scrollTo = function(ele, relPos){
    var $ = jQuery;
    var body = $('html, body');
    body.stop().animate({
        scrollTop: (jQuery(ele).offset().top )
    }, relPos);
};

/**
 * downloadPDF: Metodos relacionados con las pantallas de descarga el PDF
 */
app.prototype.downloadPDF = function(){
    var $ = jQuery;
    $('.download-program').on('click', 'a.download', function(){
        var target = $(this).attr('data-target');
        if (target !== undefined){
            $(this).addClass('hidden');
            $(target).removeClass('hidden');
        }
    });
    $('.download-program').on('click','.button-close', function(event){
        event.preventDefault();
        var target = $(this).attr('data-target');
        var parent = undefined;
        if (target !== undefined){
            $(target).addClass('hidden');
            parent = $(target).attr('data-parent');
            if (parent !== undefined){
                $(parent).removeClass('hidden');
            }
        }
    });
};

jQuery(function () {
    var m_app = new app();
    m_app.init();

});


(function($) {
  $(document).ready(function() {
    stlopd_checks_read_more($('#edit-checks-stlopd'));
  });

  function stlopd_checks_read_more($element) {
    $('.form-type-checkbox', $element).each(function() {
      var more = Drupal.t('Read more');
      var close = Drupal.t('Close');
      var labelText = $('label', this).text();
      $('label', this).contents().eq(1).wrap('<div class="raw"></div>')
      $('label', this).append('<strong class="readmore">' + more + '</strong>');
      $('.raw', this).append(' <strong class="readless">' + close + '</strong>');
      $(this).addClass('collapsed');
      $('.readmore', this).click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).closest('.form-type-checkbox').removeClass('collapsed').addClass('in');
      });
      $('.readless', this).click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).closest('.form-type-checkbox').removeClass('in').addClass('collapsed');
      });
    });
  }
}(jQuery));
;/**/
