<?php

class commonfunction{
    
    // CJ defined this function 2016-07-22
    public static function generateResponseDataForErrorOccured(){
        $rspDetails = array();
        $rspDetails["isExceptionOccured"] = 'TRUE';
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
    // CJ defined this function 2016-07-22
    public static function generateResponseDataForInvalidRequestParamKey(){
        $rspDetails = array();
        $rspDetails["isRequestParamKeyValid"] = 'FALSE';
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
    // CJ defined this function 2016-07-22
    public static function generateResponseDataForInvalidRequestParamKeyData(){
        $rspDetails = array();
        $rspDetails["isRequestParamKeyDataValid"] = 'FALSE';
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
    // CJ defined this function 2016-07-24
    public static function preparedSmsDataToSendAdminMembersForErrorOccuredOnServer($errorNo, $errorMsg, $errorFilePath, $errorLineNo, $otherVars){
        $retSmsSentStatus = false;
        if($errorNo!='' && $errorMsg!='' && $errorFilePath!='' && $errorLineNo !=''){
            // CJ think about sms/email services to send error reporting 
            global $isSendSmsEmailToAdminOnErrorOccured, $SentSmsOnErrorOccured;
            $adminMobileNosArr = $SentSmsOnErrorOccured;
            if($isSendSmsEmailToAdminOnErrorOccured=='Y' && count($adminMobileNosArr)>0){
                $smsMsgBody = "Sms Testing CJ";
                // $retSmsSentStatus = utils :: sendSMS(array("9975967186"), $smsMsgBody);
            }
        }
        return $retSmsSentStatus;
    }
    
    // CJ defined this function 2016-07-24
    public static function preparedEmailDataToSendAdminMembersForErrorOccuredOnServer($errorNo, $errorMsg, $errorFilePath, $errorLineNo, $otherVars){
        $retEmailSentStatus = false;
        if($errorNo!='' && $errorMsg!='' && $errorFilePath!='' && $errorLineNo !=''){
            // CJ think about sms/email services to send error reporting 
            global $isSendSmsEmailToAdminOnErrorOccured, $SentEmailOnErrorOccured;
            $adminEmailIdsArr = $SentEmailOnErrorOccured;
            if($isSendSmsEmailToAdminOnErrorOccured=='Y' && count($adminEmailIdsArr)>0){
                $toEmailIdArr = array('chirag.jain@digitaledu.net');
                $msgSubject = 'Email Testing CJ';
                $msgBody = 'Email Testing CJ';
                // $retEmailSentStatus = utils :: sendEmail($toEmailIdArr, $msgSubject, $msgBody);
            }
        }
        return $retEmailSentStatus;
    }
    
    
      
    // CJ defined this function 2016-07-23
    public static function preparedDataSendingEmailAboutPartyOrdersRequestReceiveFromCustomer($paramJsonData){
        $retEmailSentStatus = false;
        try{
            if(count($paramJsonData)>0 && $paramJsonData!=false){
                if(array_key_exists('name', $paramJsonData)
                    && array_key_exists('email', $paramJsonData)){
                    $toEmailIdArr = array('chirag.jain@digitaledu.net');
                    $msgSubject = 'Email Testing CJ';
                    $msgBody = 'Email Testing CJ';
                    $retEmailSentStatus = utils :: sendEmail($toEmailIdArr, $msgSubject, $msgBody);
                }
            }
        }catch(Exception $ex){
            $retEmailSentStatus = false;
        }
        return $retEmailSentStatus;
    }
    
    // CJ defined this function 2016-07-24
    public static function preparedDataSendingEmailAboutCustomizeOrdersRequestReceiveFromCustomer($paramJsonData){
        $retEmailSentStatus = false;
        try{
            if(count($paramJsonData)>0 && $paramJsonData!=false){
                if(array_key_exists('name', $paramJsonData)
                    && array_key_exists('email', $paramJsonData)){
                    $toEmailIdArr = array('chirag.jain@digitaledu.net');
                    $msgSubject = 'Email Testing CJ';
                    $msgBody = 'Email Testing CJ';
                    $retEmailSentStatus = utils :: sendEmail($toEmailIdArr, $msgSubject, $msgBody);
                }
            }
        }catch(Exception $ex){
            $retEmailSentStatus = false;
        }
        return $retEmailSentStatus;
    }
    
    // CJ defined this function 2016-07-24
    public static function preparedDataSendingEmailAboutCorporateTieupRequestReceiveFromCustomer($paramJsonData){
        $retEmailSentStatus = false;
        try{
            if(count($paramJsonData)>0 && $paramJsonData!=false){
                $paramJsonData['name'] = '';
                $paramJsonData['email'] = '';
                if(array_key_exists('name', $paramJsonData)
                    && array_key_exists('email', $paramJsonData)){
                    $toEmailIdArr = array('chirag.jain@digitaledu.net');
                    $msgSubject = 'Email Testing CJ';
                    $msgBody = 'Email Testing CJ';
                    $retEmailSentStatus = utils :: sendEmail($toEmailIdArr, $msgSubject, $msgBody);
                }
            }
        }catch(Exception $ex){
            $retEmailSentStatus = false;
        }
        return $retEmailSentStatus;
    }
    
    // CJ defined this function 2016-07-24
    public static function prepareParamDataForTrackingUserInfoAccessingWebsites($paramJsonData){
        if(count($paramJsonData)>0 && $paramJsonData!=false){
            $paramJsonData['user_sessionstarttime'] = time();
            $retUserGeoLocationDetails = utils :: getUserAccessingWebsiteGeoLocationDetails();
            $paramJsonData = array_merge($paramJsonData, $retUserGeoLocationDetails);
        }
        return $paramJsonData;
    }
    
    
    
    ////////////////./////////////// delivery city related code ////////////////////////////////
    
  
    // CJ defined this function 2016-09-02
    public static function getDeliveryCityListDetails($paramJsonData){
        $rspDetails = array();
        if(count($paramJsonData)>0 && $paramJsonData!=false){
            $rsltJsonArr = array();
            $rsltJsonArr['selectedDeliveryCityDetails'] = false;
            $rsltJsonArr['allCityList'] = false;
            // initial variable declare here
            $gcity_ids = $paramJsonData['city_ids'];
            $deliveryCityListDetailsArr = LocationDao::getCityList('', '');
            if(count($deliveryCityListDetailsArr)>0 && $deliveryCityListDetailsArr!=false){
                // iterate each delivery city details
                $isRequestedDeliveryCityMatched = false;
                for($eachIndex = 0; $eachIndex<count($deliveryCityListDetailsArr); $eachIndex++){
                    $deliveryCityListDetailsArr[$eachIndex]['cityIcon'] = 'fa fa-map-marker';
                    $deliveryCityListDetailsArr[$eachIndex]['isRequestedDeliveryCityMatched'] = 'N';
                    if($deliveryCityListDetailsArr[$eachIndex]['cityId']==$gcity_ids){
                        $isRequestedDeliveryCityMatched = true;
                        $deliveryCityListDetailsArr[$eachIndex]['isRequestedDeliveryCityMatched'] = 'Y';
                        // default selected delivery city to show
                        $rsltJsonArr['selectedDeliveryCityDetails'] = array(
                            "cityId"=>$gcity_ids,
                            "cityName"=>$deliveryCityListDetailsArr[$eachIndex]['cityName'],
                            "cityIcon"=>"fa fa-map-marker"
                        );
                    }
                }
                if($isRequestedDeliveryCityMatched==false){
                    /*
                        // default selected delivery city to show
                        $rsltJsonArr['defaultSelectedDeliveryCityDetails'] = array(
                            "cityId"=>$deliveryCityListDetailsArr[0]['cityId'],
                            "cityName"=>$deliveryCityListDetailsArr[0]['cityName'],
                            "cityIcon"=>"fa fa-map-marker"
                        );
                    */
                }
                $rsltJsonArr['allCityList'] = $deliveryCityListDetailsArr;
                $rspDetails["deliveryCityDetails"] =  $rsltJsonArr;
            }
        } 
        return $rspDetails;
    }
    
    
    ////////////////./////////////// delivery area related code ////////////////////////////////
    
    // CJ defined this function 2016-09-02
    public static function getDeliveryAreaListDetails($paramJsonData){
        $rspDetails = array();
        if(count($paramJsonData)>0 && $paramJsonData!=false){
            $rsltJsonArr = array();
            $rsltJsonArr['selectedDeliveryAreaDetails'] = false;
            $rsltJsonArr['allAreaList'] = false;
            // initial variable declare here
            $gcountry_ids = $paramJsonData['country_ids'];
            $gcity_ids = $paramJsonData['city_ids'];
            $garea_ids = $paramJsonData['area_ids'];
            $deliveryAreaListDetailsArr = LocationDao::getCountryCityAreaAffiliationList('', $gcountry_ids, $gcity_ids, '', '');
            if(count($deliveryAreaListDetailsArr)>0 && $deliveryAreaListDetailsArr!=false){
                // iterate each delivery area details
                $isRequestedDeliveryAreaMatched = false;
                for($eachIndex = 0; $eachIndex<count($deliveryAreaListDetailsArr); $eachIndex++){
                    $deliveryAreaListDetailsArr[$eachIndex]['areaIcon'] = 'fa fa-map-marker';
                    $deliveryAreaListDetailsArr[$eachIndex]['isRequestedDeliveryAreaMatched'] = 'N';
                    if($deliveryAreaListDetailsArr[$eachIndex]['areaId']==$garea_ids){
                        $isRequestedDeliveryAreaMatched = true;
                        $deliveryAreaListDetailsArr[$eachIndex]['isRequestedDeliveryAreaMatched'] = 'Y';
                        // default selected delivery area to show
                        $rsltJsonArr['selectedDeliveryAreaDetails'] = array(
                            "areaId"=>$deliveryAreaListDetailsArr[$eachIndex]['areaId'],
                            "areaName"=>$deliveryAreaListDetailsArr[$eachIndex]['areaName'],
                            "areaIcon"=>"fa fa-map-marker",
                            "ccaId"=>$deliveryAreaListDetailsArr[$eachIndex]['ccaId'],
                            "areaPincode"=>$deliveryAreaListDetailsArr[$eachIndex]['areaPincode']
                        );
                    }
                }
                if($isRequestedDeliveryAreaMatched==false){
                    // default selected delivery area to show
                    /*
                        $rsltJsonArr['defaultSelectedDeliveryAreaDetails'] = array(
                            "areaId"=>$deliveryAreaListDetailsArr[0]['areaId'],
                            "areaName"=>$deliveryAreaListDetailsArr[0]['areaName'],
                            "areaIcon"=>"fa fa-map-marker",
                            "ccaId"=>$deliveryAreaListDetailsArr[0]['ccaId'],
                            "areaPincode"=>$deliveryAreaListDetailsArr[0]['areaPincode']
                        );
                    */
                }
                $rsltJsonArr['allAreaList'] = $deliveryAreaListDetailsArr;
                $rspDetails["deliveryAreaDetails"] =  $rsltJsonArr;
            }
        } 
        return $rspDetails;
    }
 
    
    ///////////////// product filter type list related code /////////////////////
    
    // CJ defined this function 2016-07-12
    public static function preparedShopstoreFilterationData($shopstoreJsonData, $requestedStoreId=''){
        $allStoreWiseFilterDetailsArr = array();
        try{
            if(count($shopstoreJsonData)>0 && $shopstoreJsonData!=false){
                // iterate each shopsstores
                foreach($shopstoreJsonData as $eachStoresId=>$storeDetailsArr){
                    $isRequestedStoreMatched = 'N';
                    if($eachStoresId==$requestedStoreId){
                        $isRequestedStoreMatched = 'Y';
                    }
                    array_push($allStoreWiseFilterDetailsArr, 
                        array(
                            "shopStoresId"=>$eachStoresId,
                            "shopStoresTitle"=>$storeDetailsArr[0]['shopStoreTitle'],
                            "productTypeId"=>$storeDetailsArr[0]['productTypeId'],
                            "productTypeTitle"=>$storeDetailsArr[0]['productTypeTitle'],
                            "productTypeProductCategoryId"=>$storeDetailsArr[0]['productTypeProductCategoryId'],
                            "productTypeProductCategoryTitle"=>$storeDetailsArr[0]['productTypeProductCategoryTitle'],
                            "isRequestedStoreMatched"=>$isRequestedStoreMatched,
                            "totalProducts"=>count($storeDetailsArr)
                        )
                    );
                }
            }
        }catch(Exception $ex){
            $allStoreWiseFilterDetailsArr = false;
        }    
        if(count($allStoreWiseFilterDetailsArr)>0 && $allStoreWiseFilterDetailsArr!=false){
            return $allStoreWiseFilterDetailsArr;
        }else{
            return false;
        }
    }
    
    // CJ defined this function 2016-07-12
    public static function preparedProductPriceFilterationData($minPriceValue, $maxPriceValue, 
        $requestedProductPriceFilterArr = array(), $requestedProductPriceSortOn=''){
        
        $priceRangeArr = array();
        $priceGapValue = 399;
        if($minPriceValue!='' && $maxPriceValue!='' && $minPriceValue!=$maxPriceValue){
            $eachPriceValue = $minPriceValue;
            while($eachPriceValue<$maxPriceValue){
                if(($eachPriceValue + $priceGapValue + 1)<$maxPriceValue){
                    $isRequestedPriceRangeMatched = 'N';
                    if(in_array($eachPriceValue."_".($eachPriceValue + $priceGapValue), $requestedProductPriceFilterArr)){
                        $isRequestedPriceRangeMatched = 'Y';
                    }
                    array_push($priceRangeArr, 
                        array(
                            "priceRangeTitle"=>number_format($eachPriceValue)." - ".number_format($eachPriceValue + $priceGapValue),
                            "priceRangeValue"=>$eachPriceValue."_".($eachPriceValue + $priceGapValue), 
                            "isRequestedPriceRangeMatched"=>$isRequestedPriceRangeMatched
                        )
                    );
                    $eachPriceValue = $eachPriceValue + $priceGapValue + 1;
                }else{
                    $isRequestedPriceRangeMatched = 'N';
                    if(in_array(($eachPriceValue)."_".$maxPriceValue, $requestedProductPriceFilterArr)){
                        $isRequestedPriceRangeMatched = 'Y';
                    }
                    array_push($priceRangeArr, 
                        array(
                            "priceRangeTitle"=>number_format($eachPriceValue)." - ".$maxPriceValue, 
                            "priceRangeValue"=>$eachPriceValue."_".$maxPriceValue, 
                            "isRequestedPriceRangeMatched"=>$isRequestedPriceRangeMatched
                        )
                    );
                    $eachPriceValue = $maxPriceValue;
                }
            }
        }else{
            $isRequestedPriceRangeMatched = 'N';
            if(in_array($minPriceValue, $requestedProductPriceFilterArr)){
                $isRequestedPriceRangeMatched = 'Y';
            }
            array_push($priceRangeArr, 
                array(
                    "priceRangeTitle"=>$minPriceValue,
                    "priceRangeValue"=>$minPriceValue,
                    "isRequestedPriceRangeMatched"=>$isRequestedPriceRangeMatched
                )
            );
        }

        // price sorting data prepared
        $priceSortingOnListArr = array(
            array(
                "priceSortTitle"=>"Low to High",
                "priceSortValue"=>"lowtohigh",
                "isRequestedPriceSortedMatched"=>(($requestedProductPriceSortOn=='lowtohigh')?'Y':'N')
            ),
            array(
                "priceSortTitle"=>"High to Low",
                "priceSortValue"=>"hightolow",
                "isRequestedPriceSortedMatched"=>(($requestedProductPriceSortOn=='hightolow')?'Y':'N')
            )
        );
        
        $retArr = array();
        $retArr['sortingList'] = $priceSortingOnListArr;
        $retArr['rangeList'] = $priceRangeArr;
        return $retArr;
        
    }    
    
    // CJ defined this function 2016-07-12
    public static function preparedProductSizeFilterationData($productAllSizeArrJsonData, $requestedProductSizeFilterArr = array()){
        $retProductAllSizeRangeListArr = array();
        try{
            if(count($productAllSizeArrJsonData)>0 && $productAllSizeArrJsonData!=false){
                // iterate each size 
                for($eachIndex = 0; $eachIndex<count($productAllSizeArrJsonData); $eachIndex++){
                    $eachProductsize = $productAllSizeArrJsonData[$eachIndex];
                    $isRequestedSizeRangeMatched = 'N';
                    if(in_array($eachProductsize, $requestedProductSizeFilterArr)){
                        $isRequestedSizeRangeMatched = 'Y';
                    }
                    array_push($retProductAllSizeRangeListArr, 
                        array(
                            "sizeRangeTitle"=>$eachProductsize,
                            "sizeRangeValue"=>$eachProductsize,
                            "isRequestedSizeRangeMatched"=>$isRequestedSizeRangeMatched,
                            "totalProduct"=>""
                        )
                    );
                }
            }
        }catch(Exception $ex){
            $retProductAllSizeRangeListArr = false;
        }
        if(count($retProductAllSizeRangeListArr)>0 && $retProductAllSizeRangeListArr!=false){
            return $retProductAllSizeRangeListArr;
        }else{
            return false;
        }
    }    
    
    // CJ defined this function 2016-07-12
    public static function preparedProductDiscountFilterationData($minDiscountValue, $maxDiscountValue, 
        $requestedProductDiscountFilterArr = array(), $requestedProductDiscountSortOn=''){
        $productAllDiscountRangeArr = array();
        if($minDiscountValue!='' && $maxDiscountValue!='' && $minDiscountValue!=$maxDiscountValue){
            $discountGapValue = 15;
            // discount range data
            $eachDiscountValue = $minDiscountValue;
            while($eachDiscountValue<$maxDiscountValue){
                if(($eachDiscountValue + $discountGapValue + 1)<$maxDiscountValue){
                    $isRequestedDiscountRangeMatched = 'N';
                    if(in_array($eachDiscountValue."_".($eachDiscountValue + $discountGapValue), $requestedProductDiscountFilterArr)){
                        $isRequestedDiscountRangeMatched = 'Y';
                    }
                    array_push($productAllDiscountRangeArr, 
                        array(
                            "discountRangeTitle"=>number_format($eachDiscountValue)."% - ".number_format($eachDiscountValue + $discountGapValue)."%",
                            "discountRangeValue"=>$eachPriceValue."_".($eachDiscountValue + $discountGapValue), 
                            "isRequestedDiscountRangeMatched"=>$isRequestedDiscountRangeMatched
                        )
                    );
                    $eachDiscountValue = $eachDiscountValue + $discountGapValue + 1;
                }else{
                    $isRequestedDiscountRangeMatched = 'N';
                    if(in_array(($eachDiscountValue)."_".$maxDiscountValue, $requestedProductDiscountFilterArr)){
                        $isRequestedDiscountRangeMatched = 'Y';
                    }
                    array_push($productAllDiscountRangeArr, 
                        array(
                            "discountRangeTitle"=>number_format($eachDiscountValue)."% - ".$maxDiscountValue."%", 
                            "discountRangeValue"=>$eachDiscountValue."_".$maxDiscountValue, 
                            "isRequestedDiscountRangeMatched"=>$isRequestedDiscountRangeMatched
                        )
                    );
                    $eachDiscountValue = $maxDiscountValue;
                }
            }
        }else{
            $isRequestedDiscountRangeMatched = 'N';
            if(in_array($minDiscountValue, $requestedProductDiscountFilterArr)){
                $isRequestedDiscountRangeMatched = 'Y';
            }
            array_push($productAllDiscountRangeArr, 
                array(
                    "discountRangeTitle"=>number_format($minDiscountValue)."%", 
                    "discountRangeValue"=>$minDiscountValue, 
                    "isRequestedDiscountRangeMatched"=>$isRequestedDiscountRangeMatched
                )
            );
        }

        // sorting data preparing
        $discountSortingOnListArr = array(
            array(
                "discountSortTitle"=>"Low to High",
                "discountSortValue"=>"lowtohigh",
                "isRequestedDiscountSortedMatched"=>(($requestedProductDiscountSortOn=='lowtohigh')?'Y':'N')
            ),
            array(
                "discountSortTitle"=>"High to Low",
                "discountSortValue"=>"hightolow",
                "isRequestedDiscountSortedMatched"=>(($requestedProductDiscountSortOn=='hightolow')?'Y':'N')
            )
        );
        $retArr = array();
        $retArr['sortingList'] = $discountSortingOnListArr;
        $retArr['rangeList'] = $productAllDiscountRangeArr;
        return $retArr;
    }    
  
    
    
    ////////////////.///////////////  user related code ////////////////////////////////
    
    
    // CJ defined this function 2016-08-06
    public static function getUserSessionId(){
        $userSessionId = false;
        $lastUserSessionNo = UsersDao :: generateMaxSessionNo();
        if($lastUserSessionNo>=0){
            $lastUserSessionNo++;
            $sha1String = sha1($lastUserSessionNo.time()); 
            $userSessionId = "USID".$lastUserSessionNo.time().$sha1String;
            $statusLastAddedUserSessionNo = UsersDao :: addMaxUserSessionNo($lastUserSessionNo, $userSessionId);
            if($statusLastAddedUserSessionNo==false){
                $userSessionId = false;
            }
        }
        return $userSessionId;
    }
    
    // CJ defined this function 2016-08-11
    public static function getUserSessionDetails($paramJsonData){
        $userSessionDetailsData = array();
        if($paramJsonData!=false && count($paramJsonData)>0){
            $retUserLogDetailsData = UsersDao::getUserLogDetails($paramJsonData);
            if(count($retUserLogDetailsData)>0 && $retUserLogDetailsData!=false){
                $userSessionDetailsData = $retUserLogDetailsData;
            }
        }
        return $userSessionDetailsData;
    }
    
    
    // CJ defined this function 2016-08-01
    public static function getUserAsCustomerDashboardSummaryDataDetails($authenticatedUserJsonData){
        $retJsonData = array();
        // checking data length
        if(count($authenticatedUserJsonData)>0 && $authenticatedUserJsonData!=false){
            $user_sessionid = $authenticatedUserJsonData['user_sessionid'];
            $udblogId = $authenticatedUserJsonData['userLogId'];
            $explodedLoggedUsername = explode(" ", $authenticatedUserJsonData['userName']);
            $userAsCustomerInfoSectionListArr = array(
                array("displayTitle"=>"Personal Info", "hoverTitle"=>"Click here to see personal info details", "sectionName"=>"personalinfo"),
                array("displayTitle"=>"Change Password", "hoverTitle"=>"Click here to change your password details", "sectionName"=>"changepassword"),
                array("displayTitle"=>"Your Orders", "hoverTitle"=>"Click here to see your orders details", "sectionName"=>"ordercart"),
                array("displayTitle"=>"My Offers", "hoverTitle"=>"Click here to see your offers", "sectionName"=>"myoffers"),
                array("displayTitle"=>"Share Offers", "hoverTitle"=>"Click here to see your share offers", "sectionName"=>"shareoffers"),
                array("displayTitle"=>"Party Order", "hoverTitle"=>"Click here to see your party orders", "sectionName"=>"partyorder"),
                array("displayTitle"=>"Customize Order", "hoverTitle"=>"Click here to see your customize orders", "sectionName"=>"customizeorder")
            );
            $retJsonData['userDetails'] = array(
                "user_sessionid"=>$user_sessionid,
                "udblogId"=>$udblogId,
                "isUserLoggedInSession"=>"Y",
                "loggedUserName"=>$explodedLoggedUsername[0],
                "userSinceFrom"=>$authenticatedUserJsonData['userSinceFrom'],
                "userInfoAllSectionListArr"=>$userAsCustomerInfoSectionListArr
            );
        }
        return $retJsonData;
    }
    
    // CJ defined this function 2016-08-01
    public static function preparedDataToStoreInfoAbtTrackedUserAccessingWebsitesDetails($authenticatedUserJsonData){
        $retLastInsertedUserInfoTrackedId = false;
        if(count($authenticatedUserJsonData)>0 && $authenticatedUserJsonData!=false){
            // track user info accessing web app details
            $utawParamDetails = array();
            $utawParamDetails['is_loggedInUser'] = 'Y';
            $utawParamDetails['profile_id'] = $authenticatedUserJsonData['unmd5ProfileTypeId'];
            $utawParamDetails['user_id'] = $authenticatedUserJsonData['unmd5UserId'];
            $utawParamDetails['ipaddress'] = $_SERVER['REMOTE_ADDR'];
            $retLastInsertedUserInfoTrackedId = UsersDao :: addTrackUserInfoAccessingWebsitesDetails($utawParamDetails);
        }
        return $retLastInsertedUserInfoTrackedId;
    }
    
    // CJ defined this function 2016-08-01
    public static function preparedDataToStoreInfoAbtUserAsLog($authenticatedUserJsonData, $dkParamDataArr){
        $userLogNo = false;
        if(count($authenticatedUserJsonData)>0 && $authenticatedUserJsonData!=false){
            // fetch user max log no
            $userMaxLogNo = UsersDao::generateMaxUserLogNo();
            if($userMaxLogNo>=0){
                $sha1String = sha1($userMaxLogNo.time());
                $userLogNo = "ULNO".$userMaxLogNo.time().$sha1String;
            }else{
                $userLogNo = "ULNO".time().$sha1String;
            }
            // track user info accessing web app details
            $userInfoLogDetails = array();
            $userInfoLogDetails['user_id'] = $authenticatedUserJsonData['unmd5UserId'];
            $userInfoLogDetails['user_logno'] = $userLogNo;
            $userInfoLogDetails['user_sessionid'] = $dkParamDataArr['user_sessionid'];
            $userInfoLogDetails['user_sessionstarttime'] = $dkParamDataArr['usersession_starttimestamp'];
            $userInfoLogDetails['user_geolocationdetails'] = $_SERVER['REMOTE_ADDR'];
            $userInfoLogDetails['status'] = 'A';
            $lastInsertedUserInfoLogId = UsersDao :: addUserLogDetails($userInfoLogDetails);
            if($lastInsertedUserInfoLogId>0){}
        }
        return $userLogNo;
    }
    
    
    /////////////////////// coupon discount related code ////////////////////////////////
    
    
    // CJ defined this function 2016-08-13
    public static function checkDiscountCouponAvailableForUser($unMd5UserId, $subtotalOrderAmt, $retDataType='msgString'){
        $retData = array();
        // checking coupoun discount avilable or not for user
        $discountCouponDetailsArr = DiscountCouponDao :: getDiscountCouponAvailableForUser($unMd5UserId);
        if($discountCouponDetailsArr!=false && count($discountCouponDetailsArr)>0){
            // sorted on universally accepted
            $sortedOnUniversallyAvailableDiscountCouponArr = utils :: arraySort($discountCouponDetailsArr, array("isUniversallyAccepted"));
            if(count($sortedOnUniversallyAvailableDiscountCouponArr)>0 && $sortedOnUniversallyAvailableDiscountCouponArr!=false){
                if(array_key_exists('Y', $sortedOnUniversallyAvailableDiscountCouponArr)==true){
                    if($retDataType=='msgString' && count($sortedOnUniversallyAvailableDiscountCouponArr['Y'])==1){
                        $universallyAvailableDiscountCouponDetails = $sortedOnUniversallyAvailableDiscountCouponArr['Y'][0];
                        $universallyAvailableCouponDiscountMsgStr = commonfunction :: getMsgStringUniversallyAvailableDiscountCouponForUser($unMd5UserId, $subtotalOrderAmt, $universallyAvailableDiscountCouponDetails);
                        if($universallyAvailableCouponDiscountMsgStr!='' && $universallyAvailableCouponDiscountMsgStr!=false){
                            array_push($retData, $universallyAvailableCouponDiscountMsgStr);
                        }
                    }
                }
            }
            // check discount coupon available for logged user
            if($unMd5UserId!='' && $unMd5UserId!=false){
                // sorted on discount coupon available for logged user
                $sortedOnDiscountCouponAvailableForLoggedUserArr = utils :: arraySort($discountCouponDetailsArr, array("isDiscountCouponAvailableForLoggedUser"));
                if(count($sortedOnDiscountCouponAvailableForLoggedUserArr)>0 && $sortedOnDiscountCouponAvailableForLoggedUserArr!=false){
                    if(array_key_exists('Y', $sortedOnDiscountCouponAvailableForLoggedUserArr)==true){
                        if($retDataType=='msgString' && count($sortedOnDiscountCouponAvailableForLoggedUserArr['Y'])==1){
                            $discountCouponAvailableForLoggedUserDetails = $sortedOnDiscountCouponAvailableForLoggedUserArr['Y'][0];
                            $discountCouponAvailableForLoggedUserMsgStr = commonfunction :: getMsgStringAvailableDiscountCouponForLoggedUser($unMd5UserId, $subtotalOrderAmt, $discountCouponAvailableForLoggedUserDetails);
                            if($discountCouponAvailableForLoggedUserMsgStr!='' && $discountCouponAvailableForLoggedUserMsgStr!=false){
                                array_push($retData, $discountCouponAvailableForLoggedUserMsgStr);
                            }
                        }
                    }
                }
            }
        }
        if(count($retData)>0 && $retData!=false){
            return $retData;
        }else{
            return false;
        }
    }
    
    // CJ defined this function 2016-08-13
    public static function getMsgStringUniversallyAvailableDiscountCouponForUser($unMd5UserId, $subtotalOrderRequestedAmt, $universallyAvailableDiscountCouponDetails){
        $universallyAvailableCouponDiscountMsgStr = '';
        if($universallyAvailableDiscountCouponDetails!=false && count($universallyAvailableDiscountCouponDetails)>0){
            $promoCode = $universallyAvailableDiscountCouponDetails['dcgCode'];
            $promoTitle = $universallyAvailableDiscountCouponDetails['dcgTitle'];
            $isPercentageBased = $universallyAvailableDiscountCouponDetails['isPercentageBased'];
            $percentageBased = $universallyAvailableDiscountCouponDetails['percentageBased'];
            $isCashbackBased = $universallyAvailableDiscountCouponDetails['isCashbackBased'];
            $cashbackBased = $universallyAvailableDiscountCouponDetails['cashbackBased'];
            $aboveOrderAmt = $universallyAvailableDiscountCouponDetails['aboveOrderAmt'];
            $isDiscountCouponAvailableForLoggedUser = $universallyAvailableDiscountCouponDetails['isDiscountCouponAvailableForLoggedUser'];
            if($isPercentageBased=='Y' && $percentageBased>0 && $percentageBased!='' 
                && $isDiscountCouponAvailableForLoggedUser=='N'){
                $universallyAvailableCouponDiscountMsgStr = "Use promo code $promoCode for $promoTitle at $percentageBased % on above Rs $aboveOrderAmt order amount !";
            }else if($isCashbackBased=='Y' && $cashbackBased>0 && $cashbackBased!='' 
                && $isDiscountCouponAvailableForLoggedUser=='N'){
                $universallyAvailableCouponDiscountMsgStr = "Use promo code $promoCode for $promoTitle to get cashback $cashbackBased on above Rs $aboveOrderAmt order amount !";
            }
        }
        return $universallyAvailableCouponDiscountMsgStr;
    }
    
    // CJ defined this function 2016-08-13
    public static function getMsgStringAvailableDiscountCouponForLoggedUser($unMd5UserId, $subtotalOrderRequestedAmt, $discountCouponAvailableForLoggedUserDetails){
        $discountCouponAvailableForLoggedUserMsgStr = '';
        if($discountCouponAvailableForLoggedUserDetails!=false && count($discountCouponAvailableForLoggedUserDetails)>0){
            $promoCode = $discountCouponAvailableForLoggedUserDetails['dcgCode'];
            $promoTitle = $discountCouponAvailableForLoggedUserDetails['dcgTitle'];
            $isPercentageBased = $discountCouponAvailableForLoggedUserDetails['isPercentageBased'];
            $percentageBased = $discountCouponAvailableForLoggedUserDetails['percentageBased'];
            $isCashbackBased = $discountCouponAvailableForLoggedUserDetails['isCashbackBased'];
            $cashbackBased = $discountCouponAvailableForLoggedUserDetails['cashbackBased'];
            $aboveOrderAmt = $discountCouponAvailableForLoggedUserDetails['aboveOrderAmt'];
            $forUserId = $discountCouponAvailableForLoggedUserDetails['forUserId'];
            if($isPercentageBased=='Y' && $percentageBased>0 && $percentageBased!='' 
                && $forUserId!='' && $unMd5UserId!='' && $forUserId==$unMd5UserId){
                $discountCouponAvailableForLoggedUserMsgStr = "Use promo code $promoCode for $promoTitle at $percentageBased % on above Rs $aboveOrderAmt order amount !";
            }else if($isCashbackBased=='Y' && $cashbackBased>0 && $cashbackBased!=''
                && $forUserId!='' && $unMd5UserId!='' && $forUserId==$unMd5UserId){
                $discountCouponAvailableForLoggedUserMsgStr = "Use promo code $promoCode for $promoTitle to get cashback $cashbackBased on above Rs $aboveOrderAmt order amount !";
            }
        }
        return $discountCouponAvailableForLoggedUserMsgStr;
    }
    
    
    // CJ defined this function 2016-08-26
    public static function preparedDataToGetUserSharingDiscountCouponList($unMd5UserId){
        $userSharingAllDiscountCouponList = array();
        if($unMd5UserId!='' && ($unMd5UserId)>0){
            // fetch setup discount coupon list of user for sharing purpose
            $sharingDiscountCouponSetupListByUserArr = DiscountCouponDao :: getSharingDiscountCouponSetupListByUser($unMd5UserId, 'Y');
            if(count($sharingDiscountCouponSetupListByUserArr)>0 && $sharingDiscountCouponSetupListByUserArr!=false){
                // iterate each setup discount coupon list
                for($eachIndex = 0; $eachIndex<count($sharingDiscountCouponSetupListByUserArr); $eachIndex++){
                    // check how many times user has been shared discount coupon list to others
                    $discountCouponId = $sharingDiscountCouponSetupListByUserArr[$eachIndex]['dcgId'];
                    $shareLimit = $sharingDiscountCouponSetupListByUserArr[$eachIndex]['shareLimit'];
                    $countUserSharedDiscountCoupon = DiscountCouponDao :: getCountUserSharedDiscountCoupon($unMd5UserId, $discountCouponId);
                    if($countUserSharedDiscountCoupon>=0 && $countUserSharedDiscountCoupon!='FALSE'
                        && $countUserSharedDiscountCoupon<$shareLimit && $shareLimit>0){
                        
                        $promoCode = $sharingDiscountCouponSetupListByUserArr[$eachIndex]['dcgCode'];
                        $isPercentageBased = $sharingDiscountCouponSetupListByUserArr[$eachIndex]['isPercentageBased'];
                        $percentageBased = $sharingDiscountCouponSetupListByUserArr[$eachIndex]['percentageBased'];
                        $isCashbackBased = $sharingDiscountCouponSetupListByUserArr[$eachIndex]['isCashbackBased'];
                        $cashbackBased = $sharingDiscountCouponSetupListByUserArr[$eachIndex]['cashbackBased'];
                        $aboveOrderAmt = $sharingDiscountCouponSetupListByUserArr[$eachIndex]['aboveOrderAmt'];
                        $aboveOrderAmtLblText = 'on order amount';
                        $discountCouponMsg  = '';
                        if($aboveOrderAmt>0 && $aboveOrderAmt!=false){
                            $aboveOrderAmtLblText = " on above Rs $aboveOrderAmt order amount ";
                        }
                        if($isPercentageBased=='Y' && $percentageBased>0 && $percentageBased!=''){
                            $discountCouponMsg = "Share this promo code '$promoCode' to your friends/colleagues will get him/her $percentageBased% off $aboveOrderAmtLblText !";
                        }else if($isCashbackBased=='Y' && $cashbackBased>0 && $cashbackBased!=''){
                            $discountCouponMsg = "Share this promo code '$promoCode' to your friends/colleagues will get him/her cashback Rs $cashbackBased $aboveOrderAmtLblText !";
                        }
                        $sharingDiscountCouponSetupListByUserArr[$eachIndex]['displayDiscountCouponMsg'] = $discountCouponMsg;
                        $sharingDiscountCouponSetupListByUserArr[$eachIndex]['remainingShareLimt'] = ($shareLimit-$countUserSharedDiscountCoupon);
                        array_push($userSharingAllDiscountCouponList, $sharingDiscountCouponSetupListByUserArr[$eachIndex]);
                    }
                }
            }
        }
        return $userSharingAllDiscountCouponList;
    }
    
    
    // CJ defined this function 2016-08-28
    public static function preparedDataToGetUserSharedDiscountCouponList($unMd5UserId){
        $userSharedAllDiscountCouponList = array();
        if($unMd5UserId!='' && ($unMd5UserId)>0){
            // fetch setup discount coupon list of user for sharing purpose
            $sharingDiscountCouponSetupListByUserArr = DiscountCouponDao :: getSharingDiscountCouponSetupListByUser($unMd5UserId, 'N');
            if(count($sharingDiscountCouponSetupListByUserArr)>0 && $sharingDiscountCouponSetupListByUserArr!=false){
                // iterate each setup discount coupon list
                for($eachIndex = 0; $eachIndex<count($sharingDiscountCouponSetupListByUserArr); $eachIndex++){
                    // get other users list logged users has been shared discount coupon
                    $discountCouponId = $sharingDiscountCouponSetupListByUserArr[$eachIndex]['dcgId'];
                    $dataArr = DiscountCouponDao :: getUserSharedDiscountCouponOtherUsersList($unMd5UserId, $discountCouponId);
                    if(count($dataArr)>0 && $dataArr!=false){
                        array_push($userSharedAllDiscountCouponList,
                            array(
                                "dcgCode"=>$sharingDiscountCouponSetupListByUserArr[$eachIndex]['dcgCode'],
                                "shareLimit"=>$sharingDiscountCouponSetupListByUserArr[$eachIndex]['shareLimit'],
                                "expiredDateTime"=>$sharingDiscountCouponSetupListByUserArr[$eachIndex]['expiredDateTime'],
                                "countAllUserList"=>count($dataArr),
                                "sharedOffersAllUserDetails"=>$dataArr
                            )    
                        );
                    }
                }
            }
        }
        return $userSharedAllDiscountCouponList;
    }

    
    /////////////////// Rating/Review related code ////////////////////////////
    
    public static function addUserRatingReviewAbtProduct($paramJsonData){
        $retStatus = 'FALSE';
        // checking param data length
        if(count($paramJsonData)>0 && $paramJsonData!=false){
            // fetch unmd5 user data 
            $counterSuccess = 0;
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($paramJsonData);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $unMd5UserLoggedId = $userSessionDetailsData['unmd5UserId'];
                // store one by one rating/review question answer details 
                $userAllQuesAnwerRatingReviewAbtProductArr = $paramJsonData['userAllQuesAnwerRatingReviewAbtProductArr'];
                if(count($userAllQuesAnwerRatingReviewAbtProductArr)==4){
                    $userGrpNo = RatingReviewDao :: getMaxUserGrpNoFromRatingReviewAbtProduct();
                    if($userGrpNo<=0){
                        $userGrpNo = rand(0, 10000);
                    }
                    // iterate each 
                    for($eachIndex = 0; $eachIndex<count($userAllQuesAnwerRatingReviewAbtProductArr); $eachIndex++){
                        $userAllQuesAnwerRatingReviewAbtProductArr[$eachIndex]['user_id'] = $unMd5UserLoggedId;
                        $userAllQuesAnwerRatingReviewAbtProductArr[$eachIndex]['created_by'] = $unMd5UserLoggedId;
                        $userAllQuesAnwerRatingReviewAbtProductArr[$eachIndex]['group_no'] = $userGrpNo;
                        $lastInsertedRatingReviewAbtProductId = RatingReviewDao :: addUserRatingReviewAbtProduct($userAllQuesAnwerRatingReviewAbtProductArr[$eachIndex]);
                        if($lastInsertedRatingReviewAbtProductId>0){
                            $counterSuccess++;
                        }
                    }
                }
            }
            if($counterSuccess==4){
                $retStatus = 'TRUE';
            }
        }
        return $retStatus;
    }
    
    
    ///////////////////////// order cart related code //////////////////////////

    // CJ defined this function 2016-08-09
    public static function generateHumanReadableOrdercartId(){
        $humanReadableOrdercartId = 0;
        $lastOrderCartId = OrderCartDao :: generateMaxOrderCartId();
        if($lastOrderCartId>=0 && $lastOrderCartId!=''){
            $lastOrderCartId++;
        }else{
            $lastOrderCartId = 1;
        }
        $humanReadableOrdercartId = "ODR$lastOrderCartId".time();
        return $humanReadableOrdercartId;
    }
    
    // CJ defined this function 2016-08-13
    public static function prepareProductDataAndAddInOrderCart($paramJsonData){
        $isProductAddedInOrdercart = 'FALSE';
        if(count($paramJsonData)>0 && $paramJsonData!=false){
            
            $paramJsonData['created_datedtime'] = date('Y-m-d H:i:s');
            $lastRequestedOrdercartId = 0;
            $lastRequestedOrdercartStoreId = 0;
            
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($paramJsonData);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                
                $requestedUserSessionId = $userSessionDetailsData['user_sessionid'];
                $unmd5UserId = $userSessionDetailsData['unmd5UserId'];
                
                // checking for order cart related
                $dbOrdercartIdDetails = OrderCartDao :: getRequestedOrdercartIdUsingUserId($unmd5UserId);
                if($dbOrdercartIdDetails==false || count($dbOrdercartIdDetails)==0){
                    // generate human readable order cart id
                    $humanReadableNewOrdercartId = commonfunction :: generateHumanReadableOrdercartId();
                    $paramJsonData['order_cartid'] = $humanReadableNewOrdercartId;
                    $paramJsonData['user_id'] = $unmd5UserId;
                    $paramJsonData['user_sessionid'] = $requestedUserSessionId;
                    $lastRequestedOrdercartId = OrderCartDao :: addEntryInOrdercart($paramJsonData);
                }else if(count($dbOrdercartIdDetails)>0 && $dbOrdercartIdDetails!=false){
                    $lastRequestedOrdercartId = $dbOrdercartIdDetails['ordercartId'];
                    // update order cart 
                    if($dbOrdercartIdDetails['userSessionId']!=$requestedUserSessionId){
                        $updateOrdercartIdDataObj = array(
                            "id"=>$lastRequestedOrdercartId, 
                            "user_sessionid"=>$requestedUserSessionId,
                            "updated_by"=>$unmd5UserId
                        );
                        $updatedStatusOrdercart = OrderCartDao :: updateEntryInOrdercart($updateOrdercartIdDataObj);
                    }
                }
                
                // checking for order cart store related
                if($lastRequestedOrdercartId>0 && $lastRequestedOrdercartId!=false){
                    $ccaId = $paramJsonData['ccaId'];
                    $storeId = $paramJsonData['store_id'];
                    // checking order cart store id is already requested or not
                    $ordercartStoreId = getRequestedOrdercartStoreIdUsingOrdrcartIdStoreIdCCAId($lastRequestedOrdercartId, $storeId, $ccaId);
                    if($ordercartStoreId>0 && $ordercartStoreId!=false){
                        $lastRequestedOrdercartStoreId = $ordercartStoreId;
                        $paramJsonData['ordercart_storeid'] = $ordercartStoreId;
                    }else{
                        // add entry in order cart store
                        $paramJsonData['ordercart_id'] = $lastRequestedOrdercartId;
                        $paramJsonData['ccaId'] = $ccaId;
                        $paramJsonData['store_id'] = $storeId;
                        $paramJsonData['created_by'] = $unmd5UserId;
                        $lastRequestedOrdercartStoreId = OrderCartDao :: addEntryInOrdercartStore($paramJsonData);
                    }
                } 
                
                // finally storing item details
                if($lastRequestedOrdercartId>0 && $lastRequestedOrdercartId!=false 
                    && $lastRequestedOrdercartStoreId>0 && $lastRequestedOrdercartStoreId!=false){
                    $paramJsonData['ordercart_storeid'] = $lastRequestedOrdercartStoreId;
                    $lastInsertedProductInOrdercartStoreItemId = OrderCartDao :: addProductInOrdercartStoreItemDetails($paramJsonData);
                    if($lastInsertedProductInOrdercartStoreItemId>0 
                        && $lastInsertedProductInOrdercartStoreItemId!=false){
                        $isProductAddedInOrdercart = 'TRUE';
                    }
                }
                
            }
        }
        return $isProductAddedInOrdercart;
    }
    
    // CJ defined this function 2016-08-14
    public static function getRequestedOrdercartItemDetails($userId){
        $retDataArr = false;
        if($userId!='' && $userId!=false){
            // fetching requested order cart all items for given user
            $ordercartAllItemDetailsArr = OrderCartDao :: getRequestedOrdercartItemDetails($userId);
            if(count($ordercartAllItemDetailsArr)>0 && $ordercartAllItemDetailsArr!=false){
                $retDataArr = $ordercartAllItemDetailsArr;
            }
        }
        return $retDataArr;
    }
    
    // CJ defined this function 2016-08-15
    public static function getCancelledOrdercartItemDetails($userId){
        $retDataArr = false;
        if($userId!='' && $userId!=false){
            // fetching cancelled order cart all items by end user or admin members
            $ordercartAllItemDetailsArr = OrderCartDao :: getCancelledOrdercartItemDetails($userId);
            if(count($ordercartAllItemDetailsArr)>0 && $ordercartAllItemDetailsArr!=false){
                $retDataArr = $ordercartAllItemDetailsArr;
            }
        }
        return $retDataArr;
    }
    
    // CJ defined this function 2016-08-21
    public static function getAllOrderedOrdercartItemDetails($userId){
        $retDataArr = array();
        if($userId!='' && $userId!=false){
            // fetching cancelled order cart all items by end user or admin members
            $ordercartAllItemDetailsArr = OrderCartDao :: getAllOrderedOrdercartItemDetails($userId);
            if(count($ordercartAllItemDetailsArr)>0 && $ordercartAllItemDetailsArr!=false){
                // sorted on order cart no 
                $sortedOnCartnoAllItemDetailsArr = utils :: arraySort($ordercartAllItemDetailsArr, array("ordercartNo"));
                if(count($sortedOnCartnoAllItemDetailsArr)>0 && $sortedOnCartnoAllItemDetailsArr!=false){
                    // iterate each order cartno all item details arr
                    foreach($sortedOnCartnoAllItemDetailsArr as $ordercartNoKey=>$allOrderedItemDetailsArr){
                        array_push($retDataArr, 
                            array(
                                "ordercartNo"=>$ordercartNoKey,
                                "totalOrderedItems"=>count($allOrderedItemDetailsArr),
                                "orderedAllItemsDetailsArr"=>$allOrderedItemDetailsArr
                            )
                        );
                    }
                }
            }
        }
        return $retDataArr;
    }
    
    
    /////////////////////////////// party order related code ///////////////////
    
    // CJ defined this function 2016-08-21
    public static function generatePartyOrderNo(){
        $lastPartyOrderId = PartyOrdersDao :: generateMaxPartyOrderNo();
        if($lastPartyOrderId>=0 && $lastPartyOrderId!=''){
            $lastPartyOrderId++;
        }else{
            $lastPartyOrderId = 1;
        }
        $humanReadablePartyOrderNo = "POR$lastPartyOrderId".time();
        return $humanReadablePartyOrderNo;
    }
    
    // CJ defined this function 2016-08-22
    public static function getPartyOrderList($unMd5UserId){
        $retJsonData = false;
        if($unMd5UserId!='' && $unMd5UserId!=false){
            $partyOrderDetailsArr = PartyOrdersDao::getPartyOrderList($unMd5UserId);
            if(count($partyOrderDetailsArr)>0 && $partyOrderDetailsArr!=false){
                $retJsonData = $partyOrderDetailsArr;
            }
        }
        return $retJsonData;
    }
    
    
    //////////////////////// Customize order request ///////////////////////////
    
    // CJ defined this function 2016-08-21
    public static function generateCustomizeOrderNo(){
        $lastCustomizeOrderId = CustomizeOrdersDao :: generateMaxCustomizeOrderNo();
        if($lastCustomizeOrderId>=0 && $lastCustomizeOrderId!=''){
            $lastCustomizeOrderId++;
        }else{
            $lastCustomizeOrderId = 1;
        }
        $humanReadableCustomizeOrderNo = "COR$lastCustomizeOrderId".time();
        return $humanReadableCustomizeOrderNo;
    }
    
    // CJ defined this function 2016-08-22
    public static function getCustomizeOrderList($unMd5UserId){
        $retJsonData = false;
        if($unMd5UserId!='' && $unMd5UserId!=false){
            $customizeOrderDetailsArr = CustomizeOrdersDao::getCustomizeOrderList($unMd5UserId);
            if(count($customizeOrderDetailsArr)>0 && $customizeOrderDetailsArr!=false){
                $retJsonData = $customizeOrderDetailsArr;
            }
        }
        return $retJsonData;
    }
    
}
