
angular.module('DKAPP').directive('showUserselecteddeliveryareatextheaderDirective', showUserselecteddeliveryareatextheaderDirective);

function showUserselecteddeliveryareatextheaderDirective(LocationServices){
    return function(scope, element, attrs){
        LocationServices.showUserSelectedDeliveryAreaTextHeader();
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

angular.module('DKAPP').directive('viewProductqtyinputDirective', viewProductqtyinputDirective);

function viewProductqtyinputDirective($timeout){
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

angular.module('DKAPP').directive('viewProductmsginputDirective', viewProductmsginputDirective);

function viewProductmsginputDirective($timeout){
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

angular.module('DKAPP').directive('orderProductqtyinputDirective', orderProductqtyinputDirective);

function orderProductqtyinputDirective($timeout){
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

angular.module('DKAPP').directive('scrollHorizontallyDessertsproducttypelistDashboardlevel', scrollHorizontallyDessertsproducttypelistDashboardlevel);

function scrollHorizontallyDessertsproducttypelistDashboardlevel(){
    return {
        link:function(scope, element, attrs){
            if(scope.$last){
                setTimeout(function(){
                    // apply horizontal scrolling features
                    if($('#dl_DeliveryAreabasedDkServedAllDessertsScrollerWrapperDivId').length>0){
                        var existingOwlOptions = {
                            navigation:false,
                            paginationSpeed:1000,
                            goToFirstSpeed:2000,
                            transitionStyle:"fade",
                            itemsScaleUp:true
                        };
                        var owlObj = $("#dl_DeliveryAreabasedDkServedAllDessertsScrollerWrapperDivId").data('owlCarousel');
                        if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                            owlObj.reinit(existingOwlOptions);
                        }else{
                            $("#dl_DeliveryAreabasedDkServedAllDessertsScrollerWrapperDivId").owlCarousel(existingOwlOptions);
                        }
                    }
                }, 1);
            }
        }
    };
}

angular.module('DKAPP').directive('maxheightProductboxwidgetDashboardlevel', maxheightProductboxwidgetDashboardlevel);

function maxheightProductboxwidgetDashboardlevel(){
    return function(scope, element, attrs){
        if(scope.$last){
            // apply max height css on element
            setTimeout(function(){
                applyMaxHeightCssOnAllProductBoxWidget('dl_productBoxWidgetDivClass');
            }, 1);
            scope.$on('resize::resize', function() {
                applyMaxHeightCssOnAllProductBoxWidget('dl_productBoxWidgetDivClass');
            });
        }
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

angular.module('DKAPP').directive('scrollHorizontallyDessertsproducttypelistAllproductlevel', scrollHorizontallyDessertsproducttypelistAllproductlevel);

function scrollHorizontallyDessertsproducttypelistAllproductlevel(){
    return function(scope, element, attrs){
        if(scope.$last){
            setTimeout(function(){
                if($('#vap_deliveryAreabasedDkServedAllDessertsScrollerWrapperDivId').length>0){
                    var existingOwlOptions = {
                        navigation:false,
                        paginationSpeed:1000,
                        goToFirstSpeed:2000,
                        transitionStyle:"fade"
                    };
                    var owlObj = $("#vap_deliveryAreabasedDkServedAllDessertsScrollerWrapperDivId").data('owlCarousel');
                    if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                        owlObj.reinit(existingOwlOptions);
                    }else{
                        $("#vap_deliveryAreabasedDkServedAllDessertsScrollerWrapperDivId").owlCarousel(existingOwlOptions);
                    }
                }
            }, 1);
        }
    };
}

angular.module('DKAPP').directive('scrollHorizontallyDessertsproducttypeProductcategorylistAllproductlevel', scrollHorizontallyDessertsproducttypeProductcategorylistAllproductlevel);

function scrollHorizontallyDessertsproducttypeProductcategorylistAllproductlevel(){
    return function(scope, element, attrs){
        if(scope.$first){
            $(element).addClass('vap_eachRequestedProductCategoryLabelLIClass');
        }
        if(scope.$last){
            setTimeout(function(){
                if($('#vap_productAllCategoryContainerDivId').length>0){
                    var existingOwlOptions = {
                        navigation:false,
                        paginationSpeed:1000,
                        goToFirstSpeed:2000,
                        transitionStyle:"fade"
                    };
                    var owlObj = $("#vap_productAllCategoryContainerDivId").data('owlCarousel');
                    if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                        owlObj.reinit(existingOwlOptions);
                    }else{
                        $("#vap_productAllCategoryContainerDivId").owlCarousel(existingOwlOptions);
                    }
                }
            }, 1);
        }
    };
}

angular.module('DKAPP').directive('maxheightProductboxwidgetAllproductslevel', maxheightProductboxwidgetAllproductslevel);

function maxheightProductboxwidgetAllproductslevel(){
    return function(scope, element, attrs){
        if(scope.$last){
            // apply max height css on element
            setTimeout(function(){
                applyMaxHeightCssOnAllProductBoxWidget('vap_productBoxWidgetDivClass');
            }, 1);
            scope.$on('resize::resize', function() {
                applyMaxHeightCssOnAllProductBoxWidget('vap_productBoxWidgetDivClass');
            });
        }
    };
}


angular.module('DKAPP').directive('scrollHorizontallyCshopstoresummaryinfo', scrollHorizontallyCshopstoresummaryinfo);

function scrollHorizontallyCshopstoresummaryinfo(){
    return function(scope, element, attrs){
        // apply horizontal scrolling features
        setTimeout(function(){
            if($('#cshopStoreSummaryInfoWrapperDivId').length>0){
                var existingOwlOptions = {
                    navigation:false,
                    paginationSpeed:1000,
                    goToFirstSpeed:2000,
                    transitionStyle:"fade",
                    autoHeight:false
                };
                var owlObj = $("#cshopStoreSummaryInfoWrapperDivId").data('owlCarousel');
                if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                    owlObj.reinit(existingOwlOptions);
                }else{
                    $("#cshopStoreSummaryInfoWrapperDivId").owlCarousel(existingOwlOptions);
                }
            }
        }, 1);
    };
}


angular.module('DKAPP').directive('scrollHorizontallyDessertsproducttypelistCshopstorelevel', scrollHorizontallyDessertsproducttypelistCshopstorelevel);

function scrollHorizontallyDessertsproducttypelistCshopstorelevel(){
    return function(scope, element, attrs){
        if(scope.$last){
            // apply horizontal scrolling features
            setTimeout(function(){
                if($('#cshopStoreServedAllDessertsProductScrollerWrapperDivId').length>0){
                    var existingOwlOptions = {
                        navigation:false,
                        paginationSpeed:1000,
                        goToFirstSpeed:2000,
                        transitionStyle:"fade"
                    };
                    var owlObj = $("#cshopStoreServedAllDessertsProductScrollerWrapperDivId").data('owlCarousel');
                    if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                        owlObj.reinit(existingOwlOptions);
                    }else{
                        $("#cshopStoreServedAllDessertsProductScrollerWrapperDivId").owlCarousel(existingOwlOptions);
                    }
                }
            }, 1);
        }
    };
}


angular.module('DKAPP').directive('scrollHorizontallyDessertsproducttypeProductcategorylistCshopstorelevel', scrollHorizontallyDessertsproducttypeProductcategorylistCshopstorelevel);

function scrollHorizontallyDessertsproducttypeProductcategorylistCshopstorelevel(){
    return function(scope, element, attrs){
        if(scope.$first){
            $(element).addClass('cshopstore_eachRequestedProductCategoryLIClass');
        }
        if(scope.$last){
            // apply horizontal scrolling features
            setTimeout(function(){
                if($('#cShopStoreProductAllCategoryContainerDivId').length>0){
                    var existingOwlOptions = {
                        navigation:false,
                        paginationSpeed:1000,
                        goToFirstSpeed:2000,
                        transitionStyle:"fade"
                    };
                    var owlObj = $("#cShopStoreProductAllCategoryContainerDivId").data('owlCarousel');
                    if(owlObj!==false && owlObj!==undefined && owlObj!==''){
                        owlObj.reinit(existingOwlOptions);
                    }else{
                        $("#cShopStoreProductAllCategoryContainerDivId").owlCarousel(existingOwlOptions);
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

angular.module('DKAPP').directive('scrollHorizontallyOrdercartAllsectionheaderDirective', scrollHorizontallyOrdercartAllsectionheaderDirective);

function scrollHorizontallyOrdercartAllsectionheaderDirective(){
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

angular.module('DKAPP').directive('scrollHorizontallyPartyorderAllsectionheaderDirective', scrollHorizontallyPartyorderAllsectionheaderDirective);

function scrollHorizontallyPartyorderAllsectionheaderDirective(){
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