
<div ng-controller='dkSessionController' ng-init="loadDefaultDataInDkSession('checkout');">

    <!-- checkout info body -->
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 checkoutInfoBodyWrapperDivClass">

        <!-- customer bread crumb -->
        <ul class="customerBreadcrumbULClass list-inline">
            <li class='customerBreadcrumbLIClass'>
                <a ui-sref="/">
                    Home
                </a>
            </li>
            <li class='customerBreadcrumbLIClass'>
                |
            </li>
            <li class='customerBreadcrumbLIClass'>
                Checkout
            </li>
        </ul>

        <!-- create horizontally space div between -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

        <!-- checkout delivery address section -->
        <div ng-controller="OrderCartController" ng-init="loadStorewiseOrderSummaryForCheckoutProcess();" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 chkout_deliveryAddressSectionDivClass">
            <p class='chkout_deliveryAddressHeaderPClass'>
                <i class="fa fa-bus"></i> DELIVERY ADDRESS
            </p>
            <!-- each store order summary will be display -->
            <div ng-repeat="eachStoreOrderSummaryDataObj in allStorewiseOrderSummaryDataArrObj" data-ordercartstoreid="{{eachStoreOrderSummaryDataObj.ordercartStoreId}}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 chkout_eachStoreOrderSummaryDivClass">
                <p class="chkout_eachStoreBasicInfoLblPClass">
                    <i class="fa fa-smile-o"></i> Hey {{eachStoreOrderSummaryDataObj.shopStoreTitle}} store order 
                    will be deliver from '{{eachStoreOrderSummaryDataObj.storeLocatedAreaName}}' 
                    to '{{eachStoreOrderSummaryDataObj.deliveryAreaname}}' area
                </p>
                <p class='chkout_eachStoreOrderDeliveryAddressPClass'> 
                    Your delivery address
                    <textarea class="form-control chkout_deliveryAddressInputBoxClass" placeholder="Type delivery address">{{eachStoreOrderSummaryDataObj.deliveryaddress}}</textarea>                            
                </p>
                <p class='chkout_eachStoreOrderDeliveryDatePClass'> 
                    Your delivery date
                    <input order-deliverydate-input-directive type='text' class="form-control chkout_deliveryDateInputBoxClass" placeholder="Type delivery date" value='{{eachStoreOrderSummaryDataObj.deliverydate}}'>                          
                </p>
            </div>
            <p ng-if="allStorewiseOrderSummaryDataArrObj.length>0" class="chkout_orderDeliveryDetailsSaveBtnPClass">
                <button ng-click="checkOrderDeliveryAddressDataForUpdate('chkout_eachStoreOrderSummaryDivClass')" class='btn chkout_orderDeliveryDateSaveBtnClass'>
                    SAVE
                </button>
            </p>
        </div>

        <!-- create horizontally space div between -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

        <!-- checkout payment summary section -->
        <div ng-if="ordercartItemRequestedCount>0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 chkout_paymentSummarySectionDivClass">
            <p class='chkout_paymentSummaryHeaderPClass'>
                <i class="fa fa-money"></i> PAYMENT SUMMARY
            </p>
            <div ng-if="ordercartItemRequestedCount>0" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 chkout_paymentSummaryDivClass">
                <p>
                    Total Stores : {{totalStores}}
                </p>
                <p>
                    Subtotal Amt(Rs) : {{subtotalOrderAmt}}
                </p>
                <p>
                    Total Delivery Fee(Rs) : {{totalDeliveryFee}}
                </p>
                <p>
                    Total Amt(Rs) : {{totalOrderAmt}}
                </p>
                <p class="chkout_makePaymentBtnPClass">
                    <button class='btn chkout_makePaymentBtnClass'>
                        Make Payment
                    </button>
                </p>
            </div>
        </div>

    </div>

    <!-- create horizontally space div between -->
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 commonHorizontalSpaceDivClass"></div>

    <!-- refresh web application data -->
    <div id='refreshUserWebAppDataDivId' ng-controller="RefreshWebAppDataController" ng-init="refreshWebAppData()" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>

</div>