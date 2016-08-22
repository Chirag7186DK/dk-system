
// resizeWindowDirective
app.directive('resizeWindowDirective', function($window){
    return {
        link:function(scope){
            // caculate height, width
            function onResize(e){
                isWindowResize = 'Y';
                deviceWidth = parseInt($(window).width());
                deviceHeight = parseInt($(window).height());
                console.log("on resize deviceWidth=>"+deviceWidth+", deviceHeight=>"+deviceHeight);
                // Namespacing events with name of directive + event to avoid collisions
                scope.$broadcast('resize::resize');
            }
            // clean up process
            function cleanUp() {
                angular.element($window).off('resize', onResize);
            }
            // bind resize on window
            angular.element($window).on('resize', onResize);
            scope.$on('$destroy', cleanUp);
        }
    };
});

// scrollWindowDirective
app.directive('scrollWindowDirective', function($window){
    return {
        link:function(scope){
            function onScroll(e){
                // Namespacing events with name of directive + event to avoid collisions
                scope.$broadcast('scroll::scroll');
            }
            // clean up process
            function cleanUp() {
                angular.element($window).off('scroll', onScroll);
            }
            // bind scroll on window
            angular.element($window).on('scroll', onScroll);
            scope.$on('$destroy', cleanUp);
        }
    };
});

// scrollToTopBtnClass
app.directive("scrollToTopBtnClass", function($window){
    return {
        restrict: 'C',
        link: function($scope, $el, $attrs){
            $scope.isShowScrollToTopBtnWebAppPage = false;
            // listening scroll event
            $scope.$on('scroll::scroll', function(){
                // console.log("scrollToTopBtnClass=>"+$window.pageYOffset);
                if($window.pageYOffset>=300){
                    $scope.isShowScrollToTopBtnWebAppPage = true;
                    $el.click(function(){
                        $('html,body').animate({
                            scrollTop:0
                        });
                    });
                }else{
                    $scope.isShowScrollToTopBtnWebAppPage = false;
                }
                $scope.$apply();
            });
        }
    };
});

// for onBodyScrollClass
app.directive("onBodyScrollClass", function($window){
    return {
        restrict: 'C',
        link: function($scope, $el, $attrs){
            $scope.stickNtStickWebAppHeaderClass = 'notStickFHeaderContainerDivClass';
            $scope.$on('scroll::scroll', function(){
                if($window.pageYOffset>=12){
                    //$scope.stickNtStickWebAppHeaderClass = 'stickFHeaderContainerDivClass';
                }else{
                    //$scope.stickNtStickWebAppHeaderClass = 'notStickFHeaderContainerDivClass';
                }
                $scope.$apply();
            });
        }
    };
});

// showCustomerDeliveryCityAreaDessertsProductTypeTextForHeaderDivClass
app.directive("showCustomerDeliveryCityAreaDessertsProductTypeTextForHeaderDivClass", function($window){
    return {
        restrict: 'C',
        link: function($scope, $el, $attrs){
            $scope.isShowCustomerDeliveryCityAreaDessertsProductTypeTextForHeader = false;
            $scope.customerDeliveryCityAreaDessertsProductTypeTextForHeader = '';
            $scope.$on('scroll::scroll', function(){
                if($window.pageYOffset>=12){
                    var msgStr = getCustomerDeliveryCityAreaDessertsProductTypeTextForHeader();
                    if(msgStr!=='' && msgStr!==undefined && msgStr!==false){
                        //$scope.isShowCustomerDeliveryCityAreaDessertsProductTypeTextForHeader = true;
                        //$scope.customerDeliveryCityAreaDessertsProductTypeTextForHeader = msgStr;
                    }
                }else{
                    $scope.isShowCustomerDeliveryCityAreaDessertsProductTypeTextForHeader = false;
                    $scope.customerDeliveryCityAreaDessertsProductTypeTextForHeader = '';
                }
                $scope.$apply();
            });
        }
    };
});


// images pre loading directive
app.directive('preloadProductImagesClass', function($timeout) {
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
});

// viewProductqtyinputDirective
app.directive('viewProductqtyinputDirective', function($timeout){
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
});


// viewProductmsginputDirective
app.directive('viewProductmsginputDirective', function($timeout){
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
});

// OrderProductqtyinputDirective
app.directive('orderProductqtyinputDirective', function($timeout){
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
});


// loadDklogoImagesDirective
app.directive('loadDklogoImagesDirective', function(){
    return function(scope, element, attrs){
        loadDkLogoImages(element);
        scope.$on('resize::resize', function() {
            loadDkLogoImages();
        });
    };
});


// loadPartyorderImagesDirective
app.directive('loadPartyorderImagesDirective', function(){
    return function(scope, element, attrs){
        loadPartyOrderImages(element);
        scope.$on('resize::resize', function() {
            loadPartyOrderImages();
        });
    };
});

// loadCoperatetieupImagesDirective
app.directive('loadCoperatetieupImagesDirective', function(){
    return function(scope, element, attrs){
        loadCoperateTieupImages(element);
        scope.$on('resize::resize', function() {
            loadCoperateTieupImages();
        });
    };
});

// loadCustomizeorderImagesDirective
app.directive('loadCustomizeorderImagesDirective', function(){
    return function(scope, element, attrs){
        loadCustomizeOrderImages(element);
        scope.$on('resize::resize', function() {
            loadCustomizeOrderImages();
        });
    };
});


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

// customerBreadcrumbDirective
app.directive('customerBreadcrumbDirective', function(){
    return function(scope, element, attrs){
        // customer product breadcrumb fetch
        scope.customerBreadCrumbOnWebApp = getCustomerBreadcrumb();
    };
});

// scrollHorizontallyDessertsproducttypelistDashboardlevel
app.directive('scrollHorizontallyDessertsproducttypelistDashboardlevel', function(){
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
});

// maxheightProductboxwidgetDashboardlevel
app.directive('maxheightProductboxwidgetDashboardlevel', function(){
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
});

// scrollHorizontallyDessertsproducttypelistViewproductlevel
app.directive('scrollHorizontallyDessertsproducttypelistViewproductlevel', function(){
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
});

// scrollHorizontallyDessertsproducttypelistAllproductlevel
app.directive('scrollHorizontallyDessertsproducttypelistAllproductlevel', function(){
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
});


// scrollHorizontallyDessertsproducttypeProductcategorylistAllproductlevel
app.directive('scrollHorizontallyDessertsproducttypeProductcategorylistAllproductlevel', function(){
    return function(scope, element, attrs){
        if(scope.$first){
            $(element).addClass('vap_eachRequestedProductCategoryLabelDivClass');
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
});

// maxheightProductboxwidgetAllproductslevel
app.directive('maxheightProductboxwidgetAllproductslevel', function(){
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
});

// scrollHorizontallyCshopstoresummaryinfo
app.directive('scrollHorizontallyCshopstoresummaryinfo', function(){
    return function(scope, element, attrs){
        // apply horizontal scrolling features
        setTimeout(function(){
            if($('#cshopStoreSummaryInfoWrapperDivId').length>0){
                var existingOwlOptions = {
                    navigation:false,
                    paginationSpeed:1000,
                    goToFirstSpeed:2000,
                    transitionStyle:"fade",
                    autoHeight:true
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
});

// scrollHorizontallyDessertsproducttypelistCshopstorelevel
app.directive('scrollHorizontallyDessertsproducttypelistCshopstorelevel', function(){
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
});

// scrollHorizontallyDessertsproducttypeProductcategorylistCshopstorelevel
app.directive('scrollHorizontallyDessertsproducttypeProductcategorylistCshopstorelevel', function(){
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
});

// maxheightProductboxwidgetCshopstorelevel
app.directive('maxheightProductboxwidgetCshopstorelevel', function(){
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
});

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

// scrollTopWhenDisplayRenderingFinishedDessertsproductlist
app.directive('scrollTopWhenDisplayRenderingFinishedDessertsproductlist', function(){
    return function(scope, $element, attrs){
        if(scope.$last){
            /*
                var windowTopPos = angular.element('#dl_DeliveryAreabasedDkServedAllDessertsContainerDivId').offset().top;
                $('html,body').animate({
                    scrollTop:windowTopPos
                });
            */
        }
    };
});

// scrollVerticallyOrdercartitemrequestedList
app.directive('scrollVerticallyOrdercartitemrequestedList', function(){
    return function(scope, $element, attrs){
        if(scope.$last){
            /* slim scroll feature attached here */
            if($('#dropdown_odrcartAllItemRequestedDivId').length>0){
                $('#dropdown_odrcartAllItemRequestedDivId').slimscroll({
                    height:'200px',
                    allowPageScroll:false,
                    railVisible:true,
                    start:'top',
                    color:'#00B9F5',
                    alwaysVisible: true,
                    distance:'0px',
                    size:'6px'
                });
            }
        }
    };
});


// scroll-horizontally-ordercart-allsectionheader-directive
app.directive('scrollHorizontallyOrdercartAllsectionheaderDirective', function(){
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
});

// scroll-horizontally-partyorder-allsectionheader-directive
app.directive('scrollHorizontallyPartyorderAllsectionheaderDirective', function(){
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
});