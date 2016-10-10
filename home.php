
<div ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('home');">
    
    <!-- delivery city area desserts product -->
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 deliveryCityAreaDessertsContainerDivClass">

        <!-- tag lines -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 deliveryCityAreaDessertsTagLinesContainerDivClass">
            <p class="deliveryCityAreaDessertsTagLinesPClass">
                Celebrate your <i>CELEBRATIONS</i> with us, we are coming with <i>DESSERTS</i>
            </p>
        </div>

        <!-- delivery city list -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 deliveryCityListContainerDivClass">
            <div id="deliveryCityListWrapperDivId" ng-controller="LocationController" ng-init="loadDeliveryCityList('home')" class="col-xs-12 col-sm-12 col-md-5 col-lg-5 deliveryCityListWrapperDivClass">
                <span class="deliveryCityLblSClass">Choose delivery city</span>
                <select id='deliveryCityListSelectCtrlId' class="selectpicker show-menu-arrow show-tick" data-size="5" data-width="100%" data-live-search="true" title="Choose delivery city"></select>
            </div>
        </div>

        <!-- delivery area list -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 deliveryAreaListContainerDivClass" ng-show="isUserChangedDeliveryCity">
            <div id="deliveryAreaListWrapperDivId" class="col-xs-12 col-sm-12 col-md-5 col-lg-5 deliveryAreaListWrapperDivClass">
                <span class="deliveryAreaLblSClass">Choose delivery area</span>
                <select id="deliveryAreaListSelectCtrlId" class="selectpicker show-menu-arrow show-tick" data-size="5" data-show-subtext='true' data-width="100%" data-live-search="true" title="Choose delivery area"></select>
            </div>
        </div>

        <!-- desserts type list -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 deliveryAreaDessertsTypeListContainerDivClass" ng-show="isUserChangedDeliveryArea">
            <div id="deliveryAreaDessertsTypeListWrapperDivId" class="col-xs-12 col-sm-12 col-md-5 col-lg-5 deliveryAreaDessertsTypeListWrapperDivClass">
                <span class="deliveryAreaDessertsTypeListLblSClass">Choose desserts</span>
                <select id="deliveryAreaDessertsTypeListSelectCtrlId" class="selectpicker show-menu-arrow show-tick" data-size="5" data-show-subtext='true' data-width="100%" data-live-search="true" title="Choose desserts"></select>
            </div>
        </div>

    </div>

    <!-- create horizontally space div between -->
    <div style='display:none;' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

    <!-- offers/promotion -->
    <div style='display:none;' class="col-xs-12 col-sm-12 col-md-12 col-lg-12 whatIsDessertsKhazanaMainContainerDivClass">
        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 dkPartyOrderContainerDivClass">
            <div class='dkPartyOrderWrapperDivClass'>
                <p class='partyOrderPClass' title='Click to request for party orders'>
                    <span>OFFERS / PROMOTION</span>
                </p>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 dkCustomizeDessertsOrderContainerDivClass">
            <div class='dkCustomizeDessertsOrderWrapperDivClass'>
                <p class='customizeOrderPClass' title='Click to request for customize orders'>
                    <span>WE SERVED AT LOCATION</span>
                </p>
            </div>
        </div>
    </div>

    <!-- what is desserts khazana -->
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 whatIsDessertsKhazanaMainContainerDivClass">
        <p class='whatIsDessertskhazanaTitlePClass'>
            <span>The Many Ways For Your Celebration </span>
        </p>
        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 dkPartyOrderContainerDivClass">
            <div class='dkPartyOrderWrapperDivClass'>
                <img src='#' class='partyOrderImgClass' load-partyorder-images-directive>
                <p ng-controller="PartyOrdersController" ng-click="redirectToViewPartyOrderRequest()" class='partyOrderPClass' title='Click to request for party orders'>
                    <span>PARTY ORDERS</span>
                </p>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 dkCustomizeDessertsOrderContainerDivClass">
            <div class='dkCustomizeDessertsOrderWrapperDivClass'>
                <img src='#' class='customizeOrderImgClass' load-customizeorder-images-directive>
                <p ng-controller="CustomizeOrdersController" ng-click="redirectToViewCustomizeOrderRequest()" class='customizeOrderPClass' title='Click to request for customize orders'>
                    <span>CUSTOMIZE ORDER</span>
                </p>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 dkCoperateSpecialOffersContainerDivClass">
            <div class='dkCoperateSpecialOffersWrapperDivClass'>
                <img src='#' class='coperateOrderImgClass' load-coperatetieup-images-directive>
                <p ng-controller="CorporateTieupController" ng-click="redirectToViewCorporateTieupRequest()" class='corporateOrderPClass' title='Click to request for corporate tie-up'>
                    <span>CORPORATE TIE-UP</span>
                </p>
            </div>
        </div>
    </div>

    <!-- refresh web application data -->
    <div id='refreshUserWebAppDataDivId' ng-init="CommonServicesObj.refreshWebAppData()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>

</div>    