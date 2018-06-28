///////////////////
//// - v.0.1 - ////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//*PLANETA DATALAYER API: Its file has been maked to manage all PLANETA sites information and to provide methods for fill
////////////////////// (SET ones),take (GET ones) and manage (HANDLE ones) data.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Changes log://///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 0.1  // 02/07/2015 - CEAC
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///OBJECT:DATALAYER/////////////////////////SUB-OBJECTS: ENVIRONMENT, PAGE, USER, INTERACTION, DEALER, PRODUCT/////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var dataLayer = function() {

    var digitalData = {

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //1// <<ENVIRONMENT>> Kind of enviroment.
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        environment: "",

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //2// <<PAGE>> Information about current page.
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        page: {
            info: {
                pageName: "",
                pageType: "",
                pageArea: "",
                pageStudies: "",
                pageForm: "",
                country: ""
            },
            properties: {
                isConversion: "false",
                isConversionSI: "false",
                isConversionSA: "false",
                isLanding: false,
                referrerType: ""
            },
            error: {
                isError: '',
                errorType: ''
            }
        },

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //3// <<USER>> Information about user.
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        user: {
            analyticsIdentifier: ""
        },

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //4// <<PRODUCT>> Information about product.
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        product: {
            main: {
                productName: "",
                productCode: "",
                productPrice: 0,
                productBrand: ""
            },
            attributes: {
                productCategory: "",
                productSubCategory: ""
            }
        },

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //5// <<CAMPAIGN>> Information about campaign
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        campaign: {
            main: {
                campaignMedium: "",
                campaignSource: "",
                campaignPublisher: "",
                campaignCampaign : "",
                campaignTerm: "",
                campaignContent: ""
            }
        },

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //6// <<TRANSACTION>> Information about transaction
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        transaction: {
            main: {
                transactionId: "",
                transactionTotalPrice: 0,
                transactionAffiliation: "",
                transactionType: "SI"
            }
        },

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //7// <<EVENT>> Information about event
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        event: {
            main: {
                eventCategory: "",
                eventAction: "",
                eventCategory: "",
                eventValue: 0
            }
        },

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //8// <<VIRTUAL PAGE>> Information about virtual page
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        virtualPage: {
            main: {
                virtualUrl: ""
            }
        },

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //9// <<PRODUCT LIST> Lists of products
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        productList: [],

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //10// <<PROMO> Promo
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        promo: {
            main: {
                promoId: "",
                promoName: "",
                promoImage: "",
                promoPage: ""
            }
        },

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //11// <<CUSTOM DIMENSION> Custom dimension
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        customDimension: {
            main: {
                customDimensionId: 0,
                customDimensionValue: ""

            }
        },

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //12// <<PRODUCT CLIKED> Product clicked
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        productClicked: 0,

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //13// <<PROMO CLIKED> Promo clicked
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        promoClicked: "",

        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //14// <<SOCIAL> Track social interactions
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*////////////////////////////////////////////////////////////////////////////////////////////////////////

        social: {
            main: {
                socialNet: "",
                socialAction: "",
                socialUrl: ""
            }
        }

    }; //DTM

    return {


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*Methods to fill values/////////////////OOOOOOO//////OOOOOOO//////OOOOOOO////////////////////////////////////////
        //////////////////////////////////////////O////////////O///////////////O///////////////////////////////////////////
        //////////////////////////////////////////OOOOOOO//////OOOOOOO/////////O///////////////////////////////////////////
        ////////////////////////////////////////////////O//////O///////////////O///////////////////////////////////////////
        //////////////////////////////////////////OOOOOOO//////OOOOOOO/////////O///////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:ENVIRONMENT////////////////////////////////////SUB-SUB-OBJECT: NONE//////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//1// - For inform about current enviroment (production/preproduction).
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setEnvironment: function (environment) {

            //environment
            digitalData.environment = environment;

        },
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:PAGE////////////////////////////////////SUB-SUB-OBJECT: PROPERTIES///////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//2// - For filling page's values
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setPage: function (pageName, pageType, isError, errorType, referrerType, pageArea, pageStudies, pageForm, country) {

            //info
            digitalData.page.info.pageName = pageName;
            digitalData.page.info.pageType = pageType;
            digitalData.page.info.pageArea = pageArea;
            digitalData.page.info.pageStudies = pageStudies;
            digitalData.page.info.pageForm = pageForm;
            digitalData.page.info.country = country;

            //properties
            if(pageType == 'thank_you_si') {
                digitalData.page.properties.isConversionSI = "true";
                digitalData.page.properties.isConversion = "true";
            }
            if(pageType == 'thank_you_sa'){
                digitalData.page.properties.isConversionSA = "true";
                digitalData.page.properties.isConversion = "true";
            }
            digitalData.page.properties.referrerType = referrerType;
            if(dataLayer.checkCookie('isLanding')) {
                digitalData.page.properties.isLanding = false;
            } else {
                dataLayer.setCookie('isLanding', true);
                digitalData.page.properties.isLanding = true;
            }

            //error
            digitalData.page.error.isError = isError;
            digitalData.page.error.errorType = errorType;

        },
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:USER////////////////////////////////////SUB-SUB-OBJECT: NONE/////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//3// - For filling user's values
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setUser: function (analyticsIdentifier) {

            //analyticsIdentifier
            digitalData.user.analyticsIdentifier = analyticsIdentifier;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:PRODUCT/////////////////////////////////////////SUB-SUB-OBJECT: MAIN, ATTRIBUTES/////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//4// - For filling product's values
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setProduct: function (productCode,productName,  productPrice, productBrand, productCategory, productSubCategory) {

            //main
            digitalData.product.main.productName = productName;
            digitalData.product.main.productCode = productCode;
            digitalData.product.main.productPrice = productPrice;
            digitalData.product.main.productBrand = productBrand;

            //category
            digitalData.product.attributes.productCategory = productCategory;

            //subcategory
            digitalData.product.attributes.productSubCategory = productSubCategory;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:CAMPAIGN//////////////////////////////SUB-SUB-OBJECT: MAIN///////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//5// - For filling campaign's values
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setCampaign: function (campaignMedium, campaignSource, campaignPublisher, campaignCampaign, campaignTerm, campaignContent) {

            //main
            digitalData.campaign.main.campaignMedium = campaignMedium;
            digitalData.campaign.main.campaignSource = (campaignSource == 'referrer') ? document.referrer : campaignSource;
            digitalData.campaign.main.campaignPublisher = campaignPublisher;
            digitalData.campaign.main.campaignCampaign = campaignCampaign;
            digitalData.campaign.main.campaignTerm = campaignTerm;
            digitalData.campaign.main.campaignContent = campaignContent;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:TRANSACTION///////////////////////////SUB-SUB-OBJECT: MAIN///////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//6// - For filling transaction's values
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setTransaction: function (transactionId, transactionTotalPrice, transactionAffiliation, transactionType) {

            //main
            digitalData.transaction.main.transactionId = transactionId;
            digitalData.transaction.main.transactionTotalPrice = transactionTotalPrice;
            digitalData.transaction.main.transactionAffiliation = transactionAffiliation;
            digitalData.transaction.main.typeTransaction = transactionType;
            if (transactionType == undefined) {
                digitalData.transaction.main.transactionType = 'SI';
            }else{
                digitalData.transaction.main.transactionType = transactionType;
            }

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:EVENT///////////////////////////SUB-SUB-OBJECT: MAIN/////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//7// - For filling events values
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setEvent: function (eventAction,eventCategory, eventLabel, eventValue, eventNonInteraction) {

            //main
            digitalData.event.main.eventCategory = eventCategory;
            digitalData.event.main.eventAction = eventAction;
            digitalData.event.main.eventLabel = eventLabel;
            digitalData.event.main.eventValue = eventValue;
            if(eventNonInteraction == undefined) {
                digitalData.event.main.eventNonInteraction = 0;
            } else {
                digitalData.event.main.eventNonInteraction = eventNonInteraction;
            }

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:VIRTUAL PAGE///////////////////////////SUB-SUB-OBJECT: MAIN//////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//8/ - For filling virtual page values
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setVirtualPage: function (virtualUrl) {

            //main
            digitalData.virtualPage.main.virtualUrl = virtualUrl;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:PRODUCT LIST///////////////////////////SUB-SUB-OBJECT: MAIN//////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//9/ - For filling product list
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setProductInList: function (listName, productCode,listPosition) {

            var product = {
                //product main
                main: {
                    //name : productName,
                    code : productCode
                    //price : productPrice,
                    //	brand : productBrand
                },
                //product attributes
                attributes: {
                    //category : productCategory,
                    //subCategory : productSubCategory
                },
                //product list
                list: {
                    name : listName,
                    position : listPosition = listPosition
                }
            };

            //push product in list
            digitalData.productList[listPosition - 1] = product;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:PROMO///////////////////////////SUB-SUB-OBJECT: MAIN/////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//10/ - For filling promo info
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setPromo: function (promoId, promoName, promoImage, promoPage) {

            //main
            digitalData.promo.main.promoId = promoId;
            digitalData.promo.main.promoName = promoName;
            digitalData.promo.main.promoImage = promoImage;
            digitalData.promo.main.promoPage = promoPage;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:CUSTOM DIMENSION///////////////////////////SUB-SUB-OBJECT: MAIN//////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//11/ - For filling custom dimension info
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setCustomDimension: function (dimensionId, dimensionValue) {

            //main
            digitalData.customDimension.main.customDimensionId = dimensionId;
            digitalData.customDimension.main.customDimensionValue = dimensionValue;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:PRODUCT CLIKED///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//12/ - For filling product clicked info
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setProductClick: function (productClickedPosition) {

            digitalData.productClicked = productClickedPosition;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:PROMO CLIKED/////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//13 - For filling promo clicked info
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setPromoClick: function (promoClicked) {

            digitalData.promoClicked = promoClicked;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:SOCIAL //////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //SET//14 - For filling social info
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setSocial: function (socialNet, socialAction, socialUrl) {

            digitalData.social.main.socialNet = socialNet;
            digitalData.social.main.socialAction = socialAction;
            digitalData.social.main.socialUrl = socialUrl;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*Help methods ///////O/////O//////OOOOOOO//////O////O//////OOOOOO///////O////////////OOOOOOO/////////////////////
        ///////////////////////O/////O//////O/////O//////O/O//O//////O/////O//////O////////////O///////////////////////////
        ///////////////////////OOOOOOO//////OOOOOOO//////O//O/O//////O/////O//////O////////////OOOOOOO/////////////////////
        ///////////////////////O/////O//////O/////O//////O///OO//////O/////O//////O////////////O///////////////////////////
        ///////////////////////O/////O//////O/////O//////O////O//////OOOOOO///////OOOOOOO//////OOOOOOO/////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//1// - Converts miliseconds to understable time (format d:|h:|m:|s:)
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        milisecondsToTime: function (miliseconds) {

            //time constructor
            var aux_dataLayer_seconds = Math.floor(miliseconds / 1000);
            var aux_dataLayer_minutes = Math.floor(aux_dataLayer_seconds / 60);
            aux_dataLayer_seconds = aux_dataLayer_seconds % 60;
            var aux_dataLayer_hours = Math.floor(aux_dataLayer_minutes / 60);
            aux_dataLayer_minutes = aux_dataLayer_minutes % 60;
            var aux_dataLayer_days = Math.floor(aux_dataLayer_hours / 24);
            aux_dataLayer_hours = aux_dataLayer_hours % 24;
            return 'd:' + aux_dataLayer_days    + '|' + 'h:' + aux_dataLayer_hours   + '|' +
                'm:' + aux_dataLayer_minutes + '|' + 's:' + aux_dataLayer_seconds ;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//2// - A simply counter that returns properties number contained into a object.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        objectLength: function (object) {

            //controller
            if (typeof object != 'object') {
                _satellite.notify('<<ERROR>> Object Length: Parameter provided is not an object.',3);
                return null;}

            else {  //auxiliar variables
                var aux_dataLayer_size = 0;
                var aux_dataLayer_replacer;

                //object counter
                for (aux_dataLayer_replacer in object) {
                    if (object.hasOwnProperty(aux_dataLayer_replacer)) aux_dataLayer_size++;}
                return aux_dataLayer_size};

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//3// - This method converts a object to a string.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        objectToString: function (object, spliter, equalizer, onlyValue) {

            //controller
            if (typeof object != 'object') {
                _satellite.notify('<<ERROR>> Object to String: Parameter provided is not an object.',3);
                return null;}

            else { if (typeof spliter   != 'string') { spliter   = ',' };
                if (typeof equalizer != 'string') { equalizer = '=' };

                //auxiliar variables
                var aux_dataLayer_string = '';
                var aux_dataLayer_incrementor = 0;
                var aux_dataLayer_counter = dataLayer.objectLength(object);

                //array constructor with value name
                if (!onlyValue) {
                    for (var aux_dataLayer_prop in object) {
                        aux_dataLayer_incrementor++;
                        aux_dataLayer_string += aux_dataLayer_prop + equalizer + object[aux_dataLayer_prop];
                        if (aux_dataLayer_incrementor < aux_dataLayer_counter) {
                            aux_dataLayer_string += spliter; }} return aux_dataLayer_string}

                //array constructor without value name
                else {for (var aux_dataLayer_prop in object) {
                    aux_dataLayer_incrementor++;
                    aux_dataLayer_string += object[aux_dataLayer_prop];
                    if (aux_dataLayer_incrementor < aux_dataLayer_counter) {
                        aux_dataLayer_string += spliter; }} return aux_dataLayer_string}};

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//4// - This method converts a object to an array.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        objectToArray: function (object, spliter, equalizer, onlyValue) {

            //controller
            if (typeof object != 'object') {
                _satellite.notify('<<ERROR>> Object to String: Parameter provided is not an object.',3);
                return null;}

            else { if (typeof spliter   != 'string') { spliter   = ',' };
                if (typeof equalizer != 'string') { equalizer = '=' };

                if (!onlyValue) { return (dataLayer.objectToString(object, spliter, equalizer)).split(spliter); }
                else { return (dataLayer.objectToString(object, spliter, equalizer, onlyValue)).split(spliter); }}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//5// - This method converts a string to an object.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        stringToObject: function (string, spliter, equalizer) {

            //controller
            if (typeof string != 'string') {
                _satellite.notify('<<ERROR>> String to Object: Parameter provided is not an string.',3);
                return null;}

            else { if (typeof spliter   != 'string') { spliter   = ',' };
                if (typeof equalizer != 'string') { equalizer = '=' };

                if (!string.search(spliter)) { return string; }

                //auxiliar variables
                else { var aux_dataLayer_object = {};
                    var aux_dataLayer_outer_array = string.split(spliter);

                    //object constructor
                    for (var i = 0, n = aux_dataLayer_outer_array.length; i < n; i++) {
                        var aux_dataLayer_insider_array = aux_dataLayer_outer_array[i].split(equalizer);
                        aux_dataLayer_object[aux_dataLayer_insider_array[0]] = aux_dataLayer_insider_array[1];}}
                return aux_dataLayer_object;}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//6// - This method converts a string to an array.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        stringToArray: function (string, spliter) {

            //controller
            if (typeof string != 'string') {
                _satellite.notify('<<ERROR>> String to Array: Parameter provided is not an string.',3);
                return null;}

            //auxiliar variables
            else { var aux_dataLayer_object = '';

                //array constructor
                if (typeof spliter != 'string') { spliter = ','; }
                if (!string.search(spliter)) { return string; }
                else { return aux_dataLayer_object = string.split(spliter);}}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//7// - This method searchs if an element is into an array.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        isInArray: function (array, element, strictly) {

            //controller
            if (typeof array != 'object' || typeof element != 'string') {
                _satellite.notify('<<ERROR>> Search element in array: Parameter provided is not an array.',3);
                return null;}

            else { if (typeof strictly  != 'boolean') { strictly  = false };

                //auxiliar variables
                var aux_dataLayer_element = '';
                var aux_dataLayer_strictly = !!strictly;

                //element searcher
                if (strictly) { for (aux_dataLayer_element in array) { if (array[aux_dataLayer_element] === element) { return true; }}}
                else { for (aux_dataLayer_element in array) { if (array[aux_dataLayer_element] === element) { return true; }}}
                return false;}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//8// - This method searchs if a sub object is into an object.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        isInObject: function (subObjectPath) {

            //auxiliar variable
            var aux_dataLayer_exists = false;

            //checker
            if (typeof subObjectPath == "string") {
                var aux_dataLayer_check = subObjectPath.split(".");
                var aux_dataLayer_checkName = "";

                for (var i=0; i < aux_dataLayer_check.length; i++){
                    aux_dataLayer_checkName += aux_dataLayer_check[i];
                    if (typeof eval(aux_dataLayer_checkName) == "undefined") { aux_dataLayer_exists = false; break;}
                    else { aux_dataLayer_exists = true; aux_dataLayer_checkName += ".";}}}

            else { _satellite.notify('<<ERROR>> Search sub object in object: Parameter provided is not an string.',3);
                aux_dataLayer_exists = false;}

            return aux_dataLayer_exists;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//9// - This method clean objects informed on string comma separated.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        cleanObjects: function (objectsString) {

            for (var i=0; i < dataLayer.stringToArray(objectsString,',').length; i++){
                var aux_dataLayer_stringToPath = eval ("(" + dataLayer.stringToArray(objectsString,',')[i]+ ")");
                if (typeof aux_dataLayer_stringToPath == 'object') { while(aux_dataLayer_stringToPath.length > 0) {aux_dataLayer_stringToPath.pop();}}
                if (typeof aux_dataLayer_stringToPath == 'string') { eval ('(' + dataLayer.stringToArray(objectsString,',')[i]   + ' = ' + '""' +')') }}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//10// - This method deletes cookies informed on string comma separated.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        deleteCookies: function (cookieString) {

            //cookie deleter bucle
            for (var i=0; i < dataLayer.stringToArray(cookieString,',').length; i++){
                dataLayer.deleteCookie(dataLayer.stringToArray(cookieString,',')[i]);}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//11// - This method allow to create a cookie, since through methods provided from Appmeasurment as well as
        /////////////    DTM cannot crate cross subdomains cookies (.domain.com). Also encode them.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setCookie: function (cookieName, cookieValue, cookieExpirationDays, domainScope, pathScope, isSecure) {

            //auxiliar variable
            var aux_dataLayer_specs;

            //checking if cookie name exists (mandatory)
            if (!cookieName || cookieName.match(/_+/i)) {
                _satellite.notify('<<ERROR>> Cookie setting up: Cookie name has not been provided or it is wrong (underscores are prohibited), therefore cookie has not been created',3) }

            //checking if cookie value exists (mandatory)
            else { if (!cookieValue) {
                _satellite.notify('<<ERROR>> Cookie setting up: Cookie value has not been provided, therefore cookie has not been created',3)}
            else {

                // checking domain scope if it's informed (optional)
                if (domainScope) {
                    if (domainScope == "site") {
                        typeof aux_dataLayer_specs == 'undefined' ? aux_dataLayer_specs = "a" : aux_dataLayer_specs = aux_dataLayer_specs + "a";
                        domainScope = '.' + (document.domain.split(".").slice(-2).join("."));}
                    else { if (domainScope == "subdomain") {
                        typeof aux_dataLayer_specs == 'undefined' ? aux_dataLayer_specs = "p" : aux_dataLayer_specs = aux_dataLayer_specs + "p";
                        domainScope = document.domain;}
                    else { domainScope = '';
                        _satellite.notify('<<WARNING>> Cookie setting up: Cookie expiration has been wrongly informed, expiration set up as session by default.',3)}}}
                else { typeof aux_dataLayer_specs == 'undefined' ? aux_dataLayer_specs = "a" : aux_dataLayer_specs = aux_dataLayer_specs + "a";
                    domainScope = '.' + (document.domain.split(".").slice(-2).join("."));}


                // checking path scope if it's informed (optional)
                if (pathScope) {
                    if (document.location.pathname.search(pathScope) == -1) {
                        pathScope = document.URL.substring(0, document.URL.lastIndexOf("/"));
                        _satellite.notify('<<ERROR>> Cookie setting up: Path provided has been wrongly informed, current path set up by default.',3);
                        aux_dataLayer_specs = aux_dataLayer_specs + (pathScope.split("/").length-1).toString();}}
                else { aux_dataLayer_specs = aux_dataLayer_specs + "0";}


                // checking secure flag if it's informed (optional)
                if (isSecure) {
                    if (typeof isSecure != "boolean") {
                        isSecure = false;
                        _satellite.notify('<<WARNING>> Cookie setting up: Cookie secure flag has been wrongly informed, secure set up as false by default.',3)}
                    isSecure === true ? aux_dataLayer_specs = aux_dataLayer_specs + "x" : aux_dataLayer_specs;}


                // checking expiration if it's informed (optional)
                if (cookieExpirationDays) {
                    if (typeof cookieExpirationDays == "number" || cookieExpirationDays == "session" || cookieExpirationDays == "visit") {
                        if (cookieExpirationDays == "session" ) { aux_dataLayer_specs = aux_dataLayer_specs + "s"; cookieExpirationDays = "";}

                        else { var aux_dataLayer_cookieDate = new Date;
                            if (cookieExpirationDays == "visit") { aux_dataLayer_specs = aux_dataLayer_specs + "v"; cookieExpirationDays = 0.020833333319999998;}
                            cookieExpirationDays === 730     ? aux_dataLayer_specs = aux_dataLayer_specs + "u" : aux_dataLayer_specs + "s";
                            cookieExpirationDays === 365     ? aux_dataLayer_specs = aux_dataLayer_specs + "y" : aux_dataLayer_specs + "d" + cookieExpirationDays;
                            aux_dataLayer_cookieDate.setTime( aux_dataLayer_cookieDate.getTime() + 24 * cookieExpirationDays * 60 * 60 * 1e3);
                            cookieExpirationDays = aux_dataLayer_cookieDate.toGMTString();}}
                    else { cookieExpirationDays = '';
                        _satellite.notify('<<WARNING>> Cookie setting up: Cookie expiration has been wrongly informed, expiration set up as session by default.',3)}}
                else { aux_dataLayer_specs = aux_dataLayer_specs + "s"; }


                // create a cookie
                document.cookie = encodeURIComponent("__" + aux_dataLayer_specs + "_" + cookieName)  +
                    "="                                                                +
                    encodeURIComponent(cookieValue)                                    +
                    (cookieExpirationDays ? "; expires=" +  cookieExpirationDays : "") +
                    (domainScope          ? "; domain=" + domainScope : "")            +
                    (pathScope            ? "; path=" + pathScope : "; path=/")        +
                    (isSecure == true     ? ";secure"  : '')                           + ";";}}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//12// - This method allow to read a cookie, returns a value or null.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        readCookie: function (cookieName) {

            //read cookie
            if (!cookieName) {
                _satellite.notify('<<ERROR>> Cookie reading: Cookie name has not been provided, therefore cookie cannot be readed.',3)}

            else { if (!dataLayer.checkCookie(cookieName)) { _satellite.notify('<<ERROR>> Cookie reading: Cookie does not exist.',3); return null;}
            else { if (!cookieName.match(/_+/i)) { cookieName = document.cookie.match("((^|\\s+)_{2}[a-z\\d]+_{1}" + cookieName + ")")[1].replace(/\s/g, '');}
                return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;}}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//13// - This method allow to delete a cookie.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        deleteCookie: function (cookieName) {

            //delete cookie
            if (!cookieName)  {
                _satellite.notify('<<ERROR>> Cookie deleting: Cookie name has not been provided, therefore cookie cannot be deleted.',3)}

            else { if (!dataLayer.checkCookie(cookieName)) { _satellite.notify('<<ERROR>> Cookie deleting: Cookie does not exist.',3);}
            else { if (!cookieName.match(/_+/i)) { cookieName = document.cookie.match("((^|\\s+)_{2}[a-z\\d]+_{1}" + cookieName + ")")[1].replace(/\s/g, '');}
                if (!dataLayer.checkCookie(cookieName)) { _satellite.notify('<<WARNING>> Cookie deleting: ' + cookieName + ' cookie does not exist, therefore cookie cannot be deleted.',3)}
                else { if (!cookieName.match(/_+/i)) {cookieName = document.cookie.match("((^|\\s+)_{2}[a-z\\d]+_{1}" + cookieName + ")")[1].replace(/\s/g, '');}

                    document.cookie = cookieName                                                                                                                           +
                        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT"                                                                                           +
                        (cookieName.charAt(2) === 'a' ? "; domain=" + '.' + document.domain.split(".").slice(-2).join(".") : "; domain=" + document.domain)  +
                        (cookieName.charAt(3) != '0'  ? "; path="   + document.location.pathname.match("((\/[^\/]+){" + cookieName.charAt(3) + "})")[1] : "; path=/");}}}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//14// - This method checks if cookie exists, returns true/false.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        checkCookie: function (cookieName) {

            //check cookie
            if (!cookieName) {
                _satellite.notify('<<ERROR>> Cookie checking: Cookie name has not been provided, therefore cookie cannot be checked.',3);}

            else { if (document.cookie.search(cookieName) != -1) {
                if (!cookieName.match(/_+/i)) { cookieName = document.cookie.match("((^|\\s+)_{2}[a-z\\d]+_{1}" + cookieName + ")")[1].replace(/\s/g, '');}
                return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);}
            else {return false}}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//15// - Resolving issue about across domain cookies. This method reads a 'cookie' query string parameter
        //////////////   'infcmp' in order to recharge cookies set from other domain (considered as a part of SEAT domains).
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        crossDomainCookie: function() {

            //checking if 'infcmp' parameter exist
            if (document.location.search != "" && document.location.search.split('?')[1].split('=')[0] == "infcmp") {
                var aux_dataLayer_cookieArray = decodeURIComponent(document.location.search.split('?')[1].split('=')[1]).split(',');

                //adding cookies
                for (i=0; i<aux_dataLayer_cookieArray.length; i++) {

                    dataLayer.setCookie (aux_dataLayer_cookieArray[i].split('=')[0].replace(/\s/g, ''),
                        aux_dataLayer_cookieArray[i].split('=')[1],
                        aux_dataLayer_cookieArray[i].split('=')[1].substr(0,3) == '_sdsat' ? 720 : "",
                        '.'.concat(document.domain.split(".").slice(-2).join(".")));}

                //cleaning URL
                var aux_dataLayer_uri = window.location.toString();
                if (aux_dataLayer_uri.indexOf("?") > 0) {
                    var aux_dataLayer_cleanUri = aux_dataLayer_uri.substring(0, aux_dataLayer_uri.indexOf("?"));
                    window.history.replaceState({}, document.title, aux_dataLayer_cleanUri);}}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//16// - Resolving issue about across domain cookies. This method reads a 'cookie' query string parameter
        //////////////   'infcmp' in order to recharge cookies set from other domain (considered as a part of SEAT domains).
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setItem: function (key, value, domain, path, expiration){

            if (!key || !value || !domain || !path || !expiration) {
                _satellite.notify('<<ERROR>> Set item: All method parameters have to be informed',3)}

            else {var aux_dataLayer_crossDomain = dataLayer.crossDomainItem(domain, path);

                if(aux_dataLayer_crossDomain.aux_dataLayer_supported){
                    var request = {id: ++aux_dataLayer_crossDomain.aux_dataLayer_id,type:'set',key: key,value: value,expiration: expiration},
                        data = {request: request};

                    if(aux_dataLayer_crossDomain.aux_dataLayer_iframeReady){
                        aux_dataLayer_crossDomain.aux_dataLayer_sendRequest(data);}

                    else{aux_dataLayer_crossDomain.aux_dataLayer_queue.push(data);}}}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//17// - Resolving issue about across domain cookies. This method reads a 'cookie' query string parameter
        //////////////   'infcmp' in order to recharge cookies set from other domain (considered as a part of SEAT domains).
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        readItem: function (key, callback, domain, path, expiration){

            if (!key || !callback || !domain || !path || !expiration) {
                _satellite.notify('<<ERROR>> Read item: All method parameters have to be informed',3)}

            else { var aux_dataLayer_crossDomain = dataLayer.crossDomainItem(domain, path);

                if(aux_dataLayer_crossDomain.aux_dataLayer_supported){
                    var request = {id: ++aux_dataLayer_crossDomain.aux_dataLayer_id,type: 'get',key: key,expiration: expiration},
                        data    = {request: request, callback:callback};

                    if(aux_dataLayer_crossDomain.aux_dataLayer_iframeReady){
                        aux_dataLayer_crossDomain.aux_dataLayer_sendRequest(data);}

                    else{aux_dataLayer_crossDomain.aux_dataLayer_queue.push(data);}}}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//18// - Resolving issue about across domain cookies. This method reads a 'cookie' query string parameter
        //////////////   'infcmp' in order to recharge cookies set from other domain (considered as a part of SEAT domains).
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        deleteItem: function (key, domain, path, expiration){

            if (!key || !domain || !path || !expiration) {
                _satellite.notify('<<ERROR>> Read item: All method parameters have to be informed',3)}

            else {var aux_dataLayer_crossDomain = dataLayer.crossDomainItem(domain, path);

                if(aux_dataLayer_crossDomain.aux_dataLayer_supported){
                    var request = {id: ++aux_dataLayer_crossDomain.aux_dataLayer_id,type: 'unset',key: key,expiration: expiration},
                        data    = {request: request};

                    if(aux_dataLayer_crossDomain.aux_dataLayer_iframeReady){
                        aux_dataLayer_crossDomain.aux_dataLayer_sendRequest(data);}

                    else{aux_dataLayer_crossDomain.aux_dataLayer_queue.push(data);}}}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//19// - Resolving issue about cross domain localStorage. This method allow to pass values across domains
        //////////////   thanks to a iframe tecnique. This iframe has to be stored on each domain that belongs at SEAT
        //////////////   environment.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        crossDomainItem: function(iframeDomain,iframePath) {

            //auxiliar variables
            var aux_dataLayer_iframe = null;
            var aux_dataLayer_iframeReady = false;
            var aux_dataLayer_origin = iframeDomain;
            var aux_dataLayer_path = iframePath;
            var aux_dataLayer_queue = [];
            var aux_dataLayer_requests = {};
            var aux_dataLayer_id = 0;
            var aux_dataLayer_supported = (function(){
                try{return window.postMessage && window.JSON && 'localStorage' in window && window['localStorage'] !== null;}
                catch(e){return false;}})();


            //private methods
            var aux_dataLayer_sendRequest = function(data){
                if(aux_dataLayer_iframe){
                    aux_dataLayer_requests[data.request.id] = data;
                    aux_dataLayer_iframe.contentWindow.postMessage(JSON.stringify(data.request), aux_dataLayer_origin); }};

            var aux_dataLayer_iframeLoaded = function(){
                aux_dataLayer_iframeReady = true;
                if(aux_dataLayer_queue.length){
                    for (var i=0, len=aux_dataLayer_queue.length; i < len; i++){
                        aux_dataLayer_sendRequest(aux_dataLayer_queue[i]);}
                    aux_dataLayer_queue = [];}};

            var aux_dataLayer_handleMessage = function(event){
                if(event.origin == aux_dataLayer_origin){
                    var data = JSON.parse(event.data);
                    if(typeof aux_dataLayer_requests[data.id]!= 'undefined'){
                        if(typeof aux_dataLayer_requests[data.id].deferred != 'undefined'){
                            aux_dataLayer_requests[data.id].deferred.resolve(data.value);}

                        if(typeof aux_dataLayer_requests[data.id].callback == 'function'){
                            aux_dataLayer_requests[data.id].callback(data.key, data.value);}
                        delete aux_dataLayer_requests[data.id];}}}


            //Making an iframe
            if(!aux_dataLayer_iframe && aux_dataLayer_supported){
                aux_dataLayer_iframe = document.createElement("iframe");
                aux_dataLayer_iframe.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;";
                document.body.appendChild(aux_dataLayer_iframe);

                if(window.addEventListener){
                    aux_dataLayer_iframe.addEventListener("load", function(){ aux_dataLayer_iframeLoaded(); }, false);
                    window.addEventListener("message", function(event){ aux_dataLayer_handleMessage(event) }, false);}

                else if(aux_dataLayer_iframe.attachEvent){
                    aux_dataLayer_iframe.attachEvent("onload", function(){ aux_dataLayer_iframeLoaded(); }, false);
                    window.attachEvent("onmessage", function(event){ aux_dataLayer_handleMessage(event) });}
                aux_dataLayer_iframe.src = aux_dataLayer_origin + aux_dataLayer_path;}

            return { aux_dataLayer_supported: aux_dataLayer_supported, aux_dataLayer_id: aux_dataLayer_id,
                aux_dataLayer_iframeReady: aux_dataLayer_iframeReady, aux_dataLayer_sendRequest: aux_dataLayer_sendRequest,
                aux_dataLayer_queue: aux_dataLayer_queue};

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//20// - This method mantains dataLayer updated, so it's called each time page is loaded, read cookies and
        //////////////   then pass it's values to digitalData object.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        updateValues: function (cookieList) {

            try {
                //auxiliar variable
                var aux_dataLayer_cookieList = dataLayer.stringToArray(cookieList,',');
                var aux_dataLayer_itemValue;

                //spliting array for identify each cookie and arrange variables for checking if cookie and object path exist
                for (i=0; i<aux_dataLayer_cookieList.length; i++) {
                    var aux_dataLayer_cookieValue = aux_dataLayer_cookieList[i].split('>')[0];
                    var aux_dataLayer_cookiePath  = aux_dataLayer_cookieList[i].slice(aux_dataLayer_cookieList[i].indexOf('>')+1, aux_dataLayer_cookieList[i].search('<') == -1 ?
                        aux_dataLayer_cookieList.length[i] : aux_dataLayer_cookieList[i].indexOf('<'));
                    //checking if cookie and object path exists
                    if ((dataLayer.checkCookie(aux_dataLayer_cookieValue) && dataLayer.isInObject(aux_dataLayer_cookiePath))) {
                        aux_dataLayer_cookieValue = dataLayer.readCookie(aux_dataLayer_cookieValue);

                        //checking if cookie is an array of values (always will be if have '|' parameter) and push values on data layer
                        if ((/\|/g).test(aux_dataLayer_cookieValue)) {
                            var aux_dataLayer_cookieArrayValue = aux_dataLayer_cookieValue.split('|');
                            aux_dataLayer_cookieArrayValue.pop();

                            //object requeries only a part of cookie array of values (String)
                            if (aux_dataLayer_cookieList[i].search('<') != -1) {
                                var aux_dataLayer_cookieArrayPart = aux_dataLayer_cookieList[i].split('<')[1];

                                //object requeries the last part (String)
                                if (isNaN(aux_dataLayer_cookieArrayPart)) {
                                    var aux_dataLayer_join =  aux_dataLayer_cookieArrayValue[Number(aux_dataLayer_cookieArrayValue.length -1)];
                                    eval ('(' + aux_dataLayer_cookiePath   + ' = ' + 'aux_dataLayer_join' +')');}

                                //object requeries a specific part (String)
                                else { for (j=0; j<aux_dataLayer_cookieArrayValue.length; j++) {
                                    var aux_dataLayer_join = aux_dataLayer_cookieArrayValue[Number(aux_dataLayer_cookieArrayPart)];
                                    eval ('(' + aux_dataLayer_cookiePath   + ' = ' + 'aux_dataLayer_join' +')')}}}

                            //Object requeries pushes cookie parts as arrays (Array)
                            else { for (j=0; j<aux_dataLayer_cookieArrayValue.length; j++) {
                                var aux_dataLayer_valorArray = dataLayer.stringToObject(aux_dataLayer_cookieArrayValue[j],';',':');
                                aux_dataLayer_cookiePath = aux_dataLayer_cookiePath.replace('datalayer','digitalData');
                                var aux_dataLayer_stringToPath = eval ("(" + aux_dataLayer_cookiePath + ")");
                                aux_dataLayer_stringToPath.push(aux_dataLayer_valorArray)}}}

                        //push values on data layer for non string arrays
                        else { var aux_dataLayer_cookieArrayValue = aux_dataLayer_cookieValue.split(',');
                            if (aux_dataLayer_cookieList[i].search('<') != -1) {
                                var aux_dataLayer_cookieArrayPart = aux_dataLayer_cookieList[i].split('<')[1];

                                //object requeries the last part (String)
                                if (isNaN(aux_dataLayer_cookieArrayPart)) {
                                    var aux_dataLayer_join =  aux_dataLayer_cookieArrayValue[Number(aux_dataLayer_cookieArrayValue.length -1)];
                                    eval ('(' + aux_dataLayer_cookiePath   + ' = ' + 'aux_dataLayer_join' +')');}

                                //object requeries a specific part (String)
                                else { for (j=0; j<aux_dataLayer_cookieArrayValue.length; j++) {
                                    var aux_dataLayer_join = aux_dataLayer_cookieArrayValue[Number(aux_dataLayer_cookieArrayPart)];
                                    eval ('(' + aux_dataLayer_cookiePath   + ' = ' + 'aux_dataLayer_join' +')')}}}

                            //Object requeries pushes cookie parts as arrays (Array)
                            else { for (j=0; j<aux_dataLayer_cookieArrayValue.length; j++) {
                                var aux_dataLayer_pathObjecte = aux_dataLayer_cookieList[i].split('>')[1];
                                var aux_dataLayer_stringToPath = eval ("(" + aux_dataLayer_pathObjecte + ")");
                                aux_dataLayer_stringToPath.push(aux_dataLayer_cookieArrayValue[j])}}}}}

            }catch(err) {console.log('ERROR: updateValues dataLayerMethod')}

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//21// - Get url vars
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getUrlVars: function () {

            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });
            return vars;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //HANDLE//22// - Get root domain
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getRootDomain: function (link, element) {

            var link_domain = null;

            if(!element) {
                var link_domain = document.createElement('a');
                link_domain.href = link;
            } else {
                link_domain = link;
            }

            var root_domain = link_domain.hostname.split('.');
            return root_domain[1] + "." + root_domain[2];

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //*Methods to take values/////////////////OOOOOOO//////OOOOOOO//////OOOOOOO////////////////////////////////////////
        //////////////////////////////////////////O////////////O///////////////O///////////////////////////////////////////
        //////////////////////////////////////////O///OOO//////OOOOOOO/////////O///////////////////////////////////////////
        //////////////////////////////////////////O/////O//////O///////////////O///////////////////////////////////////////
        //////////////////////////////////////////OOOOOOO//////OOOOOOO/////////O///////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:ENVIRONMENT//////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//1// - For getting enviroment variable.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getEnvironment: function() {

            //environment data
            environmentData = digitalData.environment;
            return environmentData;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:PAGE/////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//2// - For getting product information
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getPage: function() {

            //page data
            pageData = digitalData.page;
            return pageData;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:USER//////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//3// - For getting user information
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getUser: function() {

            //user data
            userData = digitalData.user;
            return userData;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:PRODUCT//////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//4// - For getting product information
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getProduct: function() {

            //product data
            productData = digitalData.product;
            return productData;

        },
        ///SUB-OBJECT:CAMPAIGN/////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//5// - For getting campaign information
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getCampaign: function() {

            //camapaign data
            campaignData = digitalData.campaign;
            return campaignData;

        },
        ///SUB-OBJECT:TRANSACTION//////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//6// - For getting transaction information
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getTransaction: function() {

            //transaction data
            transactionData = digitalData.transaction;
            return transactionData;

        },

        ///SUB-OBJECT:EVENT////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//7// - For getting event information
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getEvent: function() {

            //transaction data
            eventData = digitalData.event;
            return eventData;

        },

        ///SUB-OBJECT:VIRTUAL PAGE/////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//8// - For getting virtual page information
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getVirtualPage: function() {

            //transaction data
            virtualData = digitalData.virtualPage;
            return virtualData;

        },

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:PRODUCT LIST/////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//9// - For getting product list
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getProductList: function() {

            //product list data
            productListData = digitalData.productList;
            return productListData;

        },

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:PROMO////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//10// - For getting promo info
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getPromo: function() {

            //promo
            promo = digitalData.promo;
            return promo;

        },

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:CUSTOM DIMENSION/////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//11// - For getting custom dimension info
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getCustomDimension: function() {

            //custom dimension
            customDimension = digitalData.customDimension;
            return customDimension;

        },

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:PRODUCT CLICKED//////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//12// - For getting product clicked
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getProductClick: function() {

            //product cliked
            productClicked = digitalData.productClicked;
            return productClicked;

        },

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:PROMO CLICKED////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//13// - For getting promo clicked
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getPromoClick: function() {

            //promo cliked
            promoClicked = digitalData.promoClicked;
            return promoClicked;

        },
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///SUB-OBJECT:SOCIAL///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //GET//14// - For getting social info
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        getSocial: function() {

            //social
            social = digitalData.social;
            return social;

        },
    }
}();



jQuery(document).ready(function() {
    if(jQuery('#tellamamos-button').length) {
        jQuery('#tellamamos-button').click(function(){

            var boxes = jQuery('input[id=avisolegal-tellamamos]:checked');

            if(  (!isNaN(jQuery("#telefono-prelead").val())) && (jQuery("#telefono-prelead").val().length <= 9) && (boxes.length == 1)){

                ga('send', 'event', 'contact', 'call' , 'call_me_now', 1);

            }
            //var phone = document.getElementById('telefono-prelead').value;
        });
    }
});
;/**/
