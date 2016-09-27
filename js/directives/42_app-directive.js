

angular.module('DKAPP').directive('notifyuserSelectedDeliveryareaTextheaderDirective', notifyuserSelectedDeliveryareaTextheaderDirective);

function notifyuserSelectedDeliveryareaTextheaderDirective(LocationServices){
    return function(scope, element, attrs){
        LocationServices.notifyToUserForSelectedDeliveryarea();
    };
}

angular.module('DKAPP').directive('preloadProductImagesClass', preloadProductImagesClass);

function preloadProductImagesClass($timeout){
    return {
        restrict: 'C',
        link: function (scope, elm){
           $timeout(function(){
                $(elm).lazyload({
                    effect:'fadeIn',
                    effectspeed:100,
                    'skip_invisible':false
                });
            },0);
        }
    };
}

angular.module('DKAPP').directive('productQtyInputDirective', productQtyInputDirective);

function productQtyInputDirective($timeout){
    return {
        link: function ($scope, $el, $attrs){
            $el.numeric(
                {
                    "allowMinus":false, 
                    "allowThouSep":false, 
                    "allowLeadingSpaces":false, 
                    "startWith":"1",
                    "allowDecSep":false
                }
            );
        }
    };
}

angular.module('DKAPP').directive('productMsgboxDirective', productMsgboxDirective);

function productMsgboxDirective($timeout){
    return {
        link: function ($scope, $el, $attrs){
            $el.alphanum(
                {
                    "maxLength":40,
                    "allowOtherCharSets":false,
                    "allow":''
                }
            );
        }
    };
}


angular.module('DKAPP').directive('loadDklogoImagesDirective', loadDklogoImagesDirective);

function loadDklogoImagesDirective(){
    return function(scope, element, attrs){
        loadDkLogoImages(element);
        scope.$on('resize::resize', function() {
            loadDkLogoImages();
        });
    };
}

angular.module('DKAPP').directive('loadPartyorderImagesDirective', loadPartyorderImagesDirective);

function loadPartyorderImagesDirective(){
    return function(scope, element, attrs){
        loadPartyOrderImages(element);
        scope.$on('resize::resize', function() {
            loadPartyOrderImages();
        });
    };
}

angular.module('DKAPP').directive('loadCoperatetieupImagesDirective', loadCoperatetieupImagesDirective);

function loadCoperatetieupImagesDirective(){
    return function(scope, element, attrs){
        loadCoperateTieupImages(element);
        scope.$on('resize::resize', function() {
            loadCoperateTieupImages();
        });
    };
}

angular.module('DKAPP').directive('loadCustomizeorderImagesDirective', loadCustomizeorderImagesDirective);

function loadCustomizeorderImagesDirective(){
    return function(scope, element, attrs){
        loadCustomizeOrderImages(element);
        scope.$on('resize::resize', function() {
            loadCustomizeOrderImages();
        });
    };
}


// CJ defined this function 2016-07-10
function loadDkLogoImages(){
    if($('.dkLogoImgClass').length===1){
        if(deviceWidth>=300 && deviceWidth<=399){
            $('.dkLogoImgClass').attr('src', "images/dk/dklogo/dessertskhazanalogo-290|129.png");
        }
        if(deviceWidth>=400){
            $('.dkLogoImgClass').attr('src', "images/dk/dklogo/dessertskhazanalogo-290|129.png");
        }
    }
}

// CJ defined this function 2016-07-10
function loadPartyOrderImages(){
    if($('.partyOrderImgClass').length===1){
        if(deviceWidth>=300 && deviceWidth<=399){
            $('.partyOrderImgClass').attr('src', "images/dk/homebanner/hb_partyorderbg-288|124.png");
        }
        if(deviceWidth>=400){
            $('.partyOrderImgClass').attr('src', "images/dk/homebanner/hb_partyorderbg-588|253.png");
        }
    }
}

// CJ defined this function 2016-07-10
function loadCoperateTieupImages(){
    if($('.coperateOrderImgClass').length===1){
        if(deviceWidth>=300 && deviceWidth<=399){
            $('.coperateOrderImgClass').attr('src', "images/dk/homebanner/hb_corporatepartybg-288|124.png");
        }
        if(deviceWidth>=400){
            $('.coperateOrderImgClass').attr('src', "images/dk/homebanner/hb_corporatepartybg-588|253.png");
        }
    }
}

// CJ defined this function 2016-07-10
function loadCustomizeOrderImages(){
    if($('.customizeOrderImgClass').length===1){
        if(deviceWidth>=300 && deviceWidth<=399){
            $('.customizeOrderImgClass').attr('src', "images/dk/homebanner/hb_customizeOrder-588|253.png");
        }
        if(deviceWidth>=400){
            $('.customizeOrderImgClass').attr('src', "images/dk/homebanner/hb_customizeOrder-588|253.png");
        }
    }
}

angular.module('DKAPP').directive('customerBreadcrumbDirective', customerBreadcrumbDirective);

function customerBreadcrumbDirective(){
    return function(scope, element, attrs){
        // customer product breadcrumb fetch
        scope.customerBreadCrumbOnWebApp = getCustomerBreadcrumb();
    };
}

angular.module('DKAPP').directive('scrollHorizontallyDessertsproducttypelistViewproductlevel', scrollHorizontallyDessertsproducttypelistViewproductlevel);

function scrollHorizontallyDessertsproducttypelistViewproductlevel(){
    return function(scope, element, attrs){
        if(scope.$last){
            setTimeout(function(){
                if($('#vpd_shopStoreServedAllDessertsProductScrollerWrapperDivId').length>0){
                    var existingOwlOptions = {
                        navigation:false,
                        paginationSpeed:1000,
                        goToFirstSpeed:2000,
                        transitionStyle:"fade"
                    };
                    var owlObj = $("#vpd_shopStoreServedAllDessertsProductScrollerWrapperDivId").data('owlCarousel');
                    if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                        owlObj.reinit(existingOwlOptions);
                    }else{
                        $("#vpd_shopStoreServedAllDessertsProductScrollerWrapperDivId").owlCarousel(existingOwlOptions);
                    }
                }
            }, 1);
        }
    };
}


angular.module('DKAPP').directive('horizontallyScrollableStoreinfo', horizontallyScrollableStoreinfo);

function horizontallyScrollableStoreinfo(){
    return function(scope, element, attrs){
        // apply horizontal scrolling features
        setTimeout(function(){
            if($('#horizontallyScrollableStoreInfoDivId').length>0){
                var existingOwlOptions = {
                    navigation:false,
                    paginationSpeed:1000,
                    goToFirstSpeed:2000,
                    transitionStyle:"fade",
                    autoHeight:false
                };
                var owlObj = $("#horizontallyScrollableStoreInfoDivId").data('owlCarousel');
                if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                    owlObj.reinit(existingOwlOptions);
                }else{
                    $("#horizontallyScrollableStoreInfoDivId").owlCarousel(existingOwlOptions);
                }
            }
        }, 1);
    };
}

angular.module('DKAPP').directive('horizontallyScrollableDessertstypelistStorelevel', horizontallyScrollableDessertstypelistStorelevel);

function horizontallyScrollableDessertstypelistStorelevel(){
    return function(scope, element, attrs){
        if(scope.$last){
            // apply horizontal scrolling features
            setTimeout(function(){
                if($('#storeCanServeDessertsTypeListScrollableWrapperDivId').length>0){
                    var existingOwlOptions = {
                        navigation:false,
                        paginationSpeed:1000,
                        goToFirstSpeed:2000,
                        transitionStyle:"fade"
                    };
                    var owlObj = $("#storeCanServeDessertsTypeListScrollableWrapperDivId").data('owlCarousel');
                    if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                        owlObj.reinit(existingOwlOptions);
                    }else{
                        $("#storeCanServeDessertsTypeListScrollableWrapperDivId").owlCarousel(existingOwlOptions);
                    }
                }
            }, 1);
        }
    };
}

angular.module('DKAPP').directive('horizontallyScrollableProducttypeProductcategorylistStorelevel', horizontallyScrollableProducttypeProductcategorylistStorelevel);

function horizontallyScrollableProducttypeProductcategorylistStorelevel(){
    return function(scope, element, attrs){
        if(scope.$first){
            $(element).addClass('storeEachRequestedProductCategoryContainerLIClass');
        }
        if(scope.$last){
            // apply horizontal scrolling features
            setTimeout(function(){
                if($('#storeProductTypeAllCategoryContainerDivId').length>0){
                    var existingOwlOptions = {
                        navigation:false,
                        paginationSpeed:1000,
                        goToFirstSpeed:2000,
                        transitionStyle:"fade"
                    };
                    var owlObj = $("#storeProductTypeAllCategoryContainerDivId").data('owlCarousel');
                    if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                        owlObj.reinit(existingOwlOptions);
                    }else{
                        $("#storeProductTypeAllCategoryContainerDivId").owlCarousel(existingOwlOptions);
                    }
                }
            }, 1);
        }
    };
}

angular.module('DKAPP').directive('maxheightProductboxwidgetCshopstorelevel', maxheightProductboxwidgetCshopstorelevel);

function maxheightProductboxwidgetCshopstorelevel(){
    return function(scope, element, attrs){
        if(scope.$last){
            // apply max height css on element
            setTimeout(function(){
                applyMaxHeightCssOnAllProductBoxWidget('cshopstore_productBoxWidgetDivClass');
            }, 1);
            scope.$on('resize::resize', function() {
                applyMaxHeightCssOnAllProductBoxWidget('cshopstore_productBoxWidgetDivClass');
            });
        }
    };
}


// CJ defined this function 2016-07-18 
function applyMaxHeightCssOnAllProductBoxWidget(applyMaxheightOnElementClassName){
    var maxHeight = 0;
    var allProductBoxWidgetElementObj = document.getElementsByClassName(applyMaxheightOnElementClassName);
    if(allProductBoxWidgetElementObj.length>0 && allProductBoxWidgetElementObj!==null){
        // iterate each element to get max height
        for(var elmentIndex = 0; elmentIndex< allProductBoxWidgetElementObj.length; elmentIndex++){
            var currentIteratedElementHeight = $(allProductBoxWidgetElementObj[elmentIndex]).height();
            if (currentIteratedElementHeight>maxHeight){
                maxHeight = currentIteratedElementHeight;
            }
        }
    }
    if(maxHeight>0){
        // $("."+applyMaxheightOnElementClassName).css({"height":maxHeight+"px"});
    }
}

angular.module('DKAPP').directive('horizontallyScrollableOrdercartAllsectionheaderDirective', horizontallyScrollableOrdercartAllsectionheaderDirective);

function horizontallyScrollableOrdercartAllsectionheaderDirective(){
    return function(scope, element, attrs){
        setTimeout(function(){
            if($('#uca_ordercartAllSectionHeaderContainerDivId').length>0){
                var existingOwlOptions = {
                    navigation:false,
                    paginationSpeed:1000,
                    goToFirstSpeed:2000,
                    transitionStyle:"fade"
                };
                var owlObj = $("#uca_ordercartAllSectionHeaderContainerDivId").data('owlCarousel');
                if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                    owlObj.reinit(existingOwlOptions);
                }else{
                    $("#uca_ordercartAllSectionHeaderContainerDivId").owlCarousel(existingOwlOptions);
                }
            }
        }, 1);
    };
}

angular.module('DKAPP').directive('horizontallyScrollablePartyorderAllsectionheaderDirective', horizontallyScrollablePartyorderAllsectionheaderDirective);

function horizontallyScrollablePartyorderAllsectionheaderDirective(){
    return function(scope, element, attrs){
        setTimeout(function(){
            if($('#po_AllSectionHeaderContainerDivId').length>0){
                var existingOwlOptions = {
                    navigation:false,
                    paginationSpeed:1000,
                    goToFirstSpeed:2000,
                    transitionStyle:"fade"
                };
                var owlObj = $("#po_AllSectionHeaderContainerDivId").data('owlCarousel');
                if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                    owlObj.reinit(existingOwlOptions);
                }else{
                    $("#po_AllSectionHeaderContainerDivId").owlCarousel(existingOwlOptions);
                }
            }
        }, 1);
    };
}

angular.module('DKAPP').directive('scrollHorizontallyCustomizeorderAllsectionheaderDirective', scrollHorizontallyCustomizeorderAllsectionheaderDirective);

function scrollHorizontallyCustomizeorderAllsectionheaderDirective(){
    return function(scope, element, attrs){
        setTimeout(function(){
            if($('#co_AllSectionHeaderContainerDivId').length>0){
                var existingOwlOptions = {
                    navigation:false,
                    paginationSpeed:1000,
                    goToFirstSpeed:2000,
                    transitionStyle:"fade"
                };
                var owlObj = $("#co_AllSectionHeaderContainerDivId").data('owlCarousel');
                if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                    owlObj.reinit(existingOwlOptions);
                }else{
                    $("#co_AllSectionHeaderContainerDivId").owlCarousel(existingOwlOptions);
                }
            }
        }, 1);
    };
}

angular.module('DKAPP').directive('scrollHorizontallyShareoffersAllsectionheaderDirective', scrollHorizontallyShareoffersAllsectionheaderDirective);
    
function scrollHorizontallyShareoffersAllsectionheaderDirective(){    
    return function(scope, element, attrs){
        setTimeout(function(){
            if($('#uca_shareoffersAllSectionHeaderContainerDivId').length>0){
                var existingOwlOptions = {
                    navigation:false,
                    paginationSpeed:1000,
                    goToFirstSpeed:2000,
                    transitionStyle:"fade"
                };
                var owlObj = $("#uca_shareoffersAllSectionHeaderContainerDivId").data('owlCarousel');
                if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                    owlObj.reinit(existingOwlOptions);
                }else{
                    $("#uca_shareoffersAllSectionHeaderContainerDivId").owlCarousel(existingOwlOptions);
                }
            }
        }, 1);
    };
}

angular.module('DKAPP').directive('orderDeliverydateInputDirective', orderDeliverydateInputDirective);

function orderDeliverydateInputDirective($timeout){
    return {
        link: function ($scope, $el, $attrs){
            var cdate = new Date();
            $($el).datepicker({
                minDate:cdate,
                dateFormat:'yy-mm-dd',
                changeMonth:true,
                changeYear:true
            });
        }
    };
}

angular.module('DKAPP').directive('attachValidationNameinputDirective', attachValidationNameinputDirective);

function attachValidationNameinputDirective($timeout){
    return {
        link: function ($scope, $el, $attrs){
            $($el).alphanum({
                "disallow":".", 
                "allowNumeric":false, 
                "allowOtherCharSets":false,
                "allowSpace":true,
                "maxLength":25
            });
        }
    };
}

angular.module('DKAPP').directive('attachValidationMobileinputDirective', attachValidationMobileinputDirective);

function attachValidationMobileinputDirective($timeout){
    return {
        link: function ($scope, $el, $attrs){
            $($el).numeric({
                "allowPlus":false,
                "allowMinus":false, 
                "allowThouSep":false,
                "allowDecSep":false,
                "allowLeadingSpaces":false, 
                "maxDigits":"10", 
                "startMinDigitWith":"5"
            });
        }
    };
}

angular.module('DKAPP').directive('attachValidationOtpcodeinputDirective', attachValidationOtpcodeinputDirective);

function attachValidationOtpcodeinputDirective($timeout){
    return {
        link: function ($scope, $el, $attrs){
            $($el).alphanum({
                "disallow":".", 
                "allowSpace":false,
                "allowNumeric":true, 
                "allowOtherCharSets":false,
                "maxLength":6
            });
        }
    };
}

angular.module('DKAPP').directive('attachValidationPwdinputDirective', attachValidationPwdinputDirective);

function attachValidationPwdinputDirective($timeout){
    return {
        link: function ($scope, $el, $attrs){
            $($el).alphanum({
                "disallow":".", 
                "allowSpace":false,
                "allowNumeric":true, 
                "allowOtherCharSets":false,
                "maxLength":10
            });
            $($el).bind("cut copy paste",function(e){
                e.preventDefault();
            });
            $($el).on("contextmenu",function(e){
                return false;
            });
        }
    };
}

angular.module('DKAPP').directive('attachValidationBirthdateinputDirective', attachValidationBirthdateinputDirective);

function attachValidationBirthdateinputDirective($timeout){
    return {
        link: function ($scope, $el, $attrs){
            var cdate = new Date();
            $($el).datepicker({
                maxDate:cdate,
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true
            });
        }
    };
}

angular.module('DKAPP').directive('attachValidationTitleinputDirective', attachValidationTitleinputDirective);

function attachValidationTitleinputDirective($timeout){
    return {
        link: function ($scope, $el, $attrs){
            $($el).alphanum({
                "disallow":".", 
                "allowNumeric":false, 
                "allowOtherCharSets":false,
                "allowSpace":true,
                "maxLength":60
            });
        }
    };
}

angular.module('DKAPP').directive('attachValidationNumberinputDirective', attachValidationNumberinputDirective);

function attachValidationNumberinputDirective($timeout){
    return {
        link: function ($scope, $el, $attrs){
            $($el).numeric({
                "allowPlus":false,
                "allowMinus":false, 
                "allowThouSep":false,
                "allowDecSep":false,
                "allowLeadingSpaces":false, 
                "maxDigits":"6",
                "startMinDigitWith":"5"
            });
        }
    };
}

angular.module('DKAPP').directive('attachValidationDateinputDirective', attachValidationDateinputDirective);

function attachValidationDateinputDirective($timeout){
    return {
        link: function ($scope, $el, $attrs){
            var cdate = new Date();
            $($el).datepicker({
                minDate:cdate,
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true
            });
        }
    };
}

angular.module('DKAPP').directive('attachValidationBudgetamtinputDirective', attachValidationBudgetamtinputDirective);

function attachValidationBudgetamtinputDirective($timeout){
    return {
        link: function ($scope, $el, $attrs){
            $($el).numeric({
                "allowPlus":false,
                "allowMinus":false, 
                "allowThouSep":false,
                "allowDecSep":false,
                "allowLeadingSpaces":false, 
                "maxDigits":"6",
                "startMinDigitWith":"5"
            });
        }
    };
}