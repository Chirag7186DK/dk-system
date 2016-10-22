<?php

class commonfunction{
    
    public static function generateResponseDataForErrorOccured(){
        $rspDetails = array();
        $rspDetails["isExceptionOccured"] = 'FALSE';
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
    public static function generateResponseDataForInvalidRequestParamKey(){
        $rspDetails = array();
        $rspDetails["isRequestParamKeyValid"] = 'FALSE';
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
    public static function generateResponseDataForInvalidRequestParamKeyData(){
        $rspDetails = array();
        $rspDetails["isRequestParamKeyDataValid"] = 'FALSE';
        ComponentsJson::GenerateJsonAndSend($rspDetails);
    }
    
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
    
    public static function prepareParamDataForTrackingUserInfoAccessingWebsites($paramJsonData){
        if(count($paramJsonData)>0 && $paramJsonData!=false){
            $paramJsonData['user_sessionstarttime'] = time();
            $retUserGeoLocationDetails = utils :: getUserAccessingWebsiteGeoLocationDetails();
            $paramJsonData = array_merge($paramJsonData, $retUserGeoLocationDetails);
        }
        return $paramJsonData;
    }
    
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
                $rsltJsonArr['allCityList'] = $deliveryCityListDetailsArr;
                $rspDetails["deliveryCityDetails"] =  $rsltJsonArr;
            }
        } 
        return $rspDetails;
    }
    

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
                $rsltJsonArr['allAreaList'] = $deliveryAreaListDetailsArr;
                $rspDetails["deliveryAreaDetails"] =  $rsltJsonArr;
            }
        } 
        return $rspDetails;
    }
 
    
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
  
    
    public static function preparedDataToStoreInfoAbtTrackedUserAccessingWebsitesDetails($userJsonData){
        $retLastInsertedUserInfoTrackedId = false;
        if(count($userJsonData)>0 && $userJsonData!=false){
            $utawParamDetails = array();
            $utawParamDetails['is_loggedInUser'] = 'Y';
            $utawParamDetails['profile_id'] = $userJsonData['unmd5ProfileTypeId'];
            $utawParamDetails['user_id'] = $userJsonData['unmd5UserId'];
            $utawParamDetails['ipaddress'] = $_SERVER['REMOTE_ADDR'];
            $retLastInsertedUserInfoTrackedId = UsersDao :: addTrackUserInfoAccessingWebsitesDetails($utawParamDetails);
        }
        return $retLastInsertedUserInfoTrackedId;
    }
    
    
    public static function handlingUserSignInAuthentication($paramDataArr){
        $rspDetails = array();
        $rspDetails['userDetails']['isUserAccountActive'] = 'N';
        $rspDetails['userDetails']['msgStr'] = 'Invalid account details !!!';
        // checking param data length
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            $userEmailParamData = array();
            $userEmailParamData['email'] = $paramDataArr['email'];
            $userEmailParamData['pwd'] = $paramDataArr['pwd'];
            $userEmailParamData['status'] = "'A','Z'";
            $userJsonData = UsersDao :: getUserDetails($userEmailParamData);
            if(count($userJsonData)==1 && $userJsonData!=false){
                $userStatus = $userJsonData[0]['userStatus'];
                if($userStatus=='Z'){
                    $rspDetails['userDetails']['isUserAccountActive'] = 'N';
                    $rspDetails['userDetails']['msgStr'] = 'Your account is inactive, please call customer care no.s to make account active !!!';
                }else{
                    $rspDetails['userDetails']['isUserAccountActive'] = 'Y';
                    $rspDetails['userDetails']['msgStr'] = 'Authenticated user accessing web-app !!!';
                    $rspDetails['userDetails']['unmd5UserId'] = $userJsonData[0]['unmd5UserId'];
                    $rspDetails['userDetails']['user_sessionid'] = $paramDataArr['user_sessionid'];
                    $rspDetails['userDetails']['usersession_starttimestamp'] = $paramDataArr['usersession_starttimestamp'];
                    $rspDetails['userDetails']['userProfileTypeId'] = $userJsonData[0]['unmd5ProfileTypeId'];
                    $rspDetails['userDetails']['name'] = strtolower($userJsonData[0]['userName']);
                    $rspDetails['userDetails']['mobile'] = $userJsonData[0]['userMobile'];
                }
            }else{
                $rspDetails['userDetails']['msgStr'] = 'Invalid account details !!!';
            }
        } 
        return $rspDetails;
    }
    
    
    public static function handlingUserSigInAndOtpRequest($paramDataArr){
        $rspDetails = array();
        $rspDetails['userDetails']['msgStr'] = 'Please try again to generate OTP, clicking on resend button !!!';
        $rspDetails['userDetails']['isOtpCodeSent'] = 'N';
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            // sending otp code and storing purpose
            $otpCode = utils :: getRandomOtpcode('6');
            $mobileStr = "XXXXXX".substr($paramDataArr['mobile'], -4);
            $paramDataArr['otpcode'] = $otpCode;
            $paramDataArr['sent_onmedium'] = 'mobile';
            $paramDataArr['purposetype'] = 'signIn';
            // storing otp code
            $storedOTPCODEStatus = UsersDao :: addUserOtpcodeDetails($paramDataArr);
            // sending otp code
            $smsSentStatus = commonfunction :: preparedOtpcodeDataSendingToSignInUserMobile($paramDataArr['mobile'], $otpCode);
            $rspDetails['userDetails']['msgStr'] = "Enter One Time Password (OTP) sent to your mobile no.s $mobileStr and it will take 45 to 55 sec approx to reach at your message box & use temporary $otpCode otp code now !!!";
            $rspDetails['userDetails']['isOtpCodeSent'] = "Y";
        } 
        return $rspDetails;
    }
    
    public static function preparedOtpcodeDataSendingToSignInUserMobile($mobile, $otpcode){
        $smsSentStatus = true;
        if($mobile!='' && strlen($mobile)==10){
            $smsMsgBodyStr = trim("$otpcode is your login OTP for Desserts Khazana account.");
            $smsSentStatus = utils :: sendSMSSameContentOnBulkMobile(array($mobile), $smsMsgBodyStr);
        }
        return $smsSentStatus;
    }
    
    
    public static function handlingUserSignInSentOtpcode($paramDataArr){
        $rspDetails = array();
        $rspDetails['userDetails']['msgStr'] = 'Invalid One Time Password has been entered !!!';
        $rspDetails['userDetails']['isOtpCodeSent'] = 'Y';
        $rspDetails['userDetails']['isOtpCodeValidated'] = 'N';
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            $dataArr1 = UsersDao :: checkOtpCodeActiveForUserSignInAuth(
                $paramDataArr['user_sessionid'], $paramDataArr['name'],
                $paramDataArr['email'], $paramDataArr['mobile'], $paramDataArr['otpcode']);
            if(count($dataArr1)==1 && $dataArr1!=false){
                $rtOtpcodeStatusUpdated = UsersDao :: updateOtpCodeStatus($dataArr1[0]['otpcodeId']);
                if($rtOtpcodeStatusUpdated=='TRUE'){
                    $rspDetails['userDetails']['msgStr'] = 'Entered One Time Password has been matched !!!';
                    $rspDetails['userDetails']['isOtpCodeValidated'] = 'Y';
                    $rspDetails['userDetails']['usedOtpcodeId'] = $dataArr1[0]['otpcodeId'];
                }
            }
        } 
        return $rspDetails;
    }
    
    
    public static function makeUserAccountActiveAsSignedIn($paramDataArr){
        $rspDetails = array();
        $rspDetails['userDetails']['isUserAccountActive'] = 'N';
        $rspDetails['userDetails']['msgStr'] = 'Invalid account details !!!';
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            $rtDataArr1 = commonfunction :: handlingUserSignInAuthentication($paramDataArr);
            if($rtDataArr1['userDetails']['isUserAccountActive']=='Y'){
                $rtDataArr1['userDetails']['usedOtpcodeId'] = $paramDataArr['usedOtpcodeId'];
                $rtDataArr1['userDetails']['usersession_starttimestamp'] = time();
                $userLogNo = commonfunction :: preparedDataToStoreInfoAbtUserAsLog($rtDataArr1['userDetails']);
                if(strlen($userLogNo)>=20){
                    $rspDetails['userDetails']['isUserAccountActive'] = 'Y';
                    $rspDetails['userDetails']['user_sessionid'] = $paramDataArr['user_sessionid'];
                    $rspDetails['userDetails']['usersession_starttimestamp'] = $rtDataArr1['userDetails']['usersession_starttimestamp'];
                    $rspDetails['userDetails']['udblogId'] = $userLogNo;
                    $rspDetails['userDetails']['userProfileTypeId'] = $rtDataArr1['userDetails']['userProfileTypeId'];
                }
            }
        } 
        return $rspDetails;
    }
    
    
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
    
    
    public static function preparedDataToStoreInfoAbtUserAsLog($userJsonData){
        $userLogNo = false;
        if(count($userJsonData)>0 && $userJsonData!=false){
            $userMaxLogNo = UsersDao::generateMaxUserLogNo();
            if($userMaxLogNo>=0){
                $sha1String = sha1($userMaxLogNo.time());
                $userLogNo = "ULNO".$userMaxLogNo.time().$sha1String;
            }else{
                $userLogNo = "ULNO".time().$sha1String;
            }
            $userInfoLogDetails = array();
            $userInfoLogDetails['user_sessionid'] = $userJsonData['user_sessionid'];
            $userInfoLogDetails['user_sessionstarttime'] = $userJsonData['usersession_starttimestamp'];
            $userInfoLogDetails['user_logno'] = $userLogNo;
            $userInfoLogDetails['user_id'] = $userJsonData['unmd5UserId'];
            $userInfoLogDetails['otpcodeId'] = $userJsonData['usedOtpcodeId'];
            $userInfoLogDetails['user_geolocationdetails'] = $_SERVER['REMOTE_ADDR'];
            $userInfoLogDetails['status'] = 'A';
            $lastInsertedId = UsersDao :: addUserLogDetails($userInfoLogDetails);
            if($lastInsertedId>0 && $lastInsertedId!=''){}
        }
        return $userLogNo;
    }
    
    
    public static function getUserAsCustomerDashboardSummaryDataDetails($userJsonData){
        $retJsonData = array();
        // checking data length
        if(count($userJsonData)>0 && $userJsonData!=false){
            $user_sessionid = $userJsonData['user_sessionid'];
            $udblogId = $userJsonData['userLogId'];
            $explodedLoggedUsername = explode(" ", $userJsonData['userName']);
            $userAsCustomerInfoSectionListArr = array(
                array("displayTitle"=>"Personal Info", "hoverTitle"=>"Click here to see personal info details", "sectionName"=>"personalinfo"),
                array("displayTitle"=>"Change Password", "hoverTitle"=>"Click here to change your password details", "sectionName"=>"changepassword"),
                array("displayTitle"=>"Your Orders", "hoverTitle"=>"Click here to see your orders details", "sectionName"=>"ordercart"),
                // array("displayTitle"=>"My Offers", "hoverTitle"=>"Click here to see your offers", "sectionName"=>"myoffers"),
                // array("displayTitle"=>"Share Offers", "hoverTitle"=>"Click here to see your share offers", "sectionName"=>"shareoffers"),
                array("displayTitle"=>"Party Order", "hoverTitle"=>"Click here to see your party orders", "sectionName"=>"partyorder"),
                array("displayTitle"=>"Customize Order", "hoverTitle"=>"Click here to see your customize orders", "sectionName"=>"customizeorder")
            );
            $retJsonData['userDetails'] = array(
                "user_sessionid"=>$user_sessionid,
                "udblogId"=>$udblogId,
                "isUserLoggedInSession"=>"Y",
                "loggedUserName"=>$explodedLoggedUsername[0],
                "userSinceFrom"=>$userJsonData['userSinceFrom'],
                "userInfoAllSectionListArr"=>$userAsCustomerInfoSectionListArr
            );
        }
        return $retJsonData;
    }
    
    
    public static function handlingUserSignUpEmailAndOtpRequest($paramDataArr){
        $rspDetails = array();
        $rspDetails['msgStr'] = 'Email is already associated with us !!!';
        $rspDetails['isOtpCodeSent'] = 'N';
        $isSendOtpCode = 'N';
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            $userEmailParamData = array();
            $userEmailParamData['email'] = $paramDataArr['email'];
            $userEmailParamData['status'] = "'A','Z'";
            $dataArr1 = UsersDao :: getUserDetails($userEmailParamData);
            if(count($dataArr1)>0 && $dataArr1!=false){
                // sorting on status based
                $sortedOnStatusDataArr = utils::arraySort($dataArr1, array("userStatus"));
                if(array_key_exists('A', $sortedOnStatusDataArr)==true){
                    $rspDetails['msgStr'] = 'Email is already associated with us !!!';
                }else if(array_key_exists('Z', $sortedOnStatusDataArr)==true){
                    if(count($sortedOnStatusDataArr['Z'])==1){
                        $rspDetails['msgStr'] = 'Email-Id is already associated with us but your account is inactive, please call customer care no.s to make account active !!!';
                    }
                }
            }else{
                $isSendOtpCode = 'Y';
            }
            // sending otp code and storing purpose
            if($isSendOtpCode=='Y'){
                $otpCode = utils ::getRandomOtpcode('6');
                $mobileStr = "XXXXXX".substr($paramDataArr['mobile'], -4);
                $paramDataArr['otpcode'] = $otpCode;
                $paramDataArr['sent_onmedium'] = 'mobile';
                $paramDataArr['purposetype'] = 'signUp';
                // storing otp code
                $storedOTPCODEStataus = UsersDao :: addUserOtpcodeDetails($paramDataArr);
                // sending otp code
                // $smsSentStatus = commonfunction :: preparedOtpcodeDataSendingToSignUpUserMobile($paramDataArr['mobile'], $otpCode);
                $rspDetails['msgStr'] = "Enter One Time Password (OTP) sent to your mobile number $mobileStr and it will take 45 to 55 sec approx to reach at your message box & use temporary this $otpCode otp code now !!!";
                $rspDetails['isOtpCodeSent'] = "Y";
            }
        } 
        return $rspDetails;
    }
    
    public static function preparedOtpcodeDataSendingToSignUpUserMobile($mobile, $otpcode){
        $smsSentStatus = true;
        if($mobile!='' && strlen($mobile)==10){
            $smsMsgBodyStr = "Your one time password for activating your Desserts Khazana account is $otpcode";
            $smsSentStatus = utils :: sendSMSSameContentOnBulkMobile(array($mobile), $smsMsgBodyStr);
        }
        return $smsSentStatus;
    }
    

    public static function handlingUserSignUpSentOtpcode($paramDataArr){
        $rspDetails = array();
        $rspDetails['msgStr'] = 'Invalid One Time Password has been entered !!!';
        $rspDetails['isOtpCodeSent'] = 'Y';
        $rspDetails['isOtpCodeValidated'] = 'N';
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            // checking otp code active or not
            $dataArr1 = UsersDao :: checkOtpCodeActiveForUserSignUpAuth(
                $paramDataArr['user_sessionid'], $paramDataArr['name'],
                $paramDataArr['email'], $paramDataArr['mobile'], $paramDataArr['otpcode']);
            if(count($dataArr1)==1 && $dataArr1!=false){
                $rtOtpcodeStatusUpdated = UsersDao :: updateOtpCodeStatus($dataArr1[0]['otpcodeId']);
                if($rtOtpcodeStatusUpdated=='TRUE'){
                    $rspDetails['msgStr'] = 'Entered One Time Password has been matched !!!';
                    $rspDetails['isOtpCodeValidated'] = 'Y';
                    $rspDetails['usedOtpcodeId'] = $dataArr1[0]['otpcodeId'];
                }
            }
        } 
        return $rspDetails;
    }
    
    
    public static function handlingUserForgotPwdEmailAndOtpRequest($paramDataArr){
        $rspDetails = array();
        $rspDetails['userDetails']['isUserAccountActive'] = 'N';
        $rspDetails['userDetails']['isOtpCodeSent'] = 'N';
        $rspDetails['userDetails']['isOtpCodeValidated'] = 'N';
        $rspDetails['userDetails']['msgStr'] = 'Invalid account details !!!';
        $isSendOtpCode = 'N';
        $userDataObj = false;
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            $userEmailParamData = array();
            $userEmailParamData['email'] = $paramDataArr['email'];
            $userEmailParamData['status'] = "'A','Z'";
            $dataArr1 = UsersDao :: getUserDetails($userEmailParamData);
            if(count($dataArr1)>0 && $dataArr1!=false){
                // sorting on status based
                $sortedOnStatusDataArr = utils::arraySort($dataArr1, array("userStatus"));
                if(array_key_exists('A', $sortedOnStatusDataArr)==true){
                    $rspDetails['userDetails']['msgStr'] = 'Email is verfied by us !!!';
                    $isSendOtpCode = 'Y';
                    $userDataObj = $sortedOnStatusDataArr['A'][0];
                }else if(array_key_exists('Z', $sortedOnStatusDataArr)==true){
                    if(count($sortedOnStatusDataArr['Z'])==1){
                        $rspDetails['userDetails']['msgStr'] = 'Email is already associated with us but your account is inactive, please call customer care no.s to make account active !!!';
                    }
                }
            }
            // sending otp code and storing purpose
            if($isSendOtpCode=='Y'){
                $otpCode = '123456';
                $mobileStr = "XXXXXX".substr($userDataObj['userMobile'], -4);
                $paramDataArr['user_id'] = $userDataObj['unmd5UserId'];
                $paramDataArr['name'] = $userDataObj['userName'];
                $paramDataArr['email'] = $paramDataArr['email'];
                $paramDataArr['mobile'] = $userDataObj['userMobile'];
                $paramDataArr['otpcode'] = $otpCode;
                $paramDataArr['sent_onmedium'] = 'mobile';
                $paramDataArr['purposetype'] = 'frgtPwd';
                // storing otp code
                $lastInsertedStoredOtpcodeId = UsersDao :: addUserOtpcodeDetails($paramDataArr);
                // sending otp code
                // $smsSentStatus = commonfunction :: preparedOtpcodeDataSendingToSignUpUserMobile($mobile, $otpCode);
                $rspDetails['userDetails']['isUserAccountActive'] = 'Y';
                $rspDetails['userDetails']['isOtpCodeSent'] = "Y";
                $rspDetails['userDetails']['tokenId'] = $userDataObj['unmd5UserId'];
                $rspDetails['userDetails']['msgStr'] = "Enter One Time Password (OTP) sent to your mobile number $mobileStr and it will take 15 sec approx to reach at your message box & use temporary $otpCode otp code now !!!";
            }
        } 
        return $rspDetails;
    }
    
    
    public static function handlingUserForgotPwdSentOtpcode($paramDataArr){
        $rspDetails = array();
        $rspDetails['userDetails']['isUserAccountActive'] = 'Y';
        $rspDetails['userDetails']['isOtpCodeSent'] = 'Y';
        $rspDetails['userDetails']['isOtpCodeValidated'] = 'N';
        $rspDetails['userDetails']['msgStr'] = 'Invalid One Time Password has been entered !!!';
        if(count($paramDataArr)>0 && $paramDataArr!=false){
            $userId = $paramDataArr['tokenId'];
            $dataArr1 = UsersDao :: checkOtpCodeActiveForUserFrgtPwdAuth(
                $paramDataArr['user_sessionid'], $userId,
                $paramDataArr['email'], $paramDataArr['otpcode']);
            if(count($dataArr1)==1 && $dataArr1!=false){
                $rtOtpcodeStatusUpdated = UsersDao :: updateOtpCodeStatus($dataArr1[0]['otpcodeId']);
                if($rtOtpcodeStatusUpdated=='TRUE'){
                    $rspDetails['userDetails']['isOtpCodeValidated'] = 'Y';
                    $rspDetails['userDetails']['tokenId'] = $userId;
                    $rspDetails['userDetails']['usedOtpcodeId'] = $dataArr1[0]['otpcodeId'];
                    $rspDetails['userDetails']['msgStr'] = 'Entered One Time Password has been matched !!!';
                }
            }
        } 
        return $rspDetails;
    }
    
    
    public static function addUserRatingReviewProduct($paramJsonData){
        $retStatus = 'FALSE';
        // checking param data length
        if(count($paramJsonData)>0 && $paramJsonData!=false){
            $counterSuccess = 0;
            // fetch user session data 
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($paramJsonData);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                $unmd5UserId = $userSessionDetailsData['unmd5UserId'];
                // store one by one rating/review question answer details 
                $ratingReviewedProductArr = $paramJsonData['ratingReviewedProductArr'];
                if(count($ratingReviewedProductArr)==4){
                    // fetch max groupno
                    $userGrpNo = RatingReviewDao :: getMaxUserGrpNoFromRatingReviewedProduct();
                    if($userGrpNo<=0){
                        $userGrpNo = rand(0, 10000);
                    }
                    // iterate each data
                    for($eachIndex = 0; $eachIndex<count($ratingReviewedProductArr); $eachIndex++){
                        $ratingReviewedProductArr[$eachIndex]['user_id'] = $unmd5UserId;
                        $ratingReviewedProductArr[$eachIndex]['created_by'] = $unmd5UserId;
                        $ratingReviewedProductArr[$eachIndex]['group_no'] = $userGrpNo;
                        $lastInsertedId = RatingReviewDao :: addUserRatingReviewProduct($ratingReviewedProductArr[$eachIndex]);
                        if($lastInsertedId>0 && $lastInsertedId!=false){
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
    
    
    public static function prepareProductDataAndAddInOrderCart($paramJsonData){
        $isProductAddedInOrdercart = 'FALSE';
        if(count($paramJsonData)>0 && $paramJsonData!=false){
            
            $lastRequestedOrdercartId = 0;
            $lastRequestedOrdercartStoreId = 0;
            $storeMinOrderAmt = $paramJsonData['minorderamt'];
            $storeOrderDeliveryFee = $paramJsonData['deliveryfee'];
            $userTotalOrderAmt = $paramJsonData['totalamount'];
            
            // fetch user session data details
            $userSessionDetailsData = commonfunction :: getUserSessionDetails($paramJsonData);
            if(count($userSessionDetailsData)>0 && $userSessionDetailsData!=false){
                
                $requestedUserSessionId = $userSessionDetailsData['user_sessionid'];
                $unmd5UserId = $userSessionDetailsData['unmd5UserId'];
                
                // checking for order cart related
                $ordercartDataArr = OrderCartDao :: getRequestedOrdercartIdUsingUserId($unmd5UserId);
                if($ordercartDataArr==false || count($ordercartDataArr)==0){
                    // generate human readable order cart id
                    $humanReadableNewOrdercartId = commonfunction :: generateHumanReadableOrdercartId();
                    // add entry in ordercart
                    $addOrdercartData = array();
                    $addOrdercartData['order_cartid'] = $humanReadableNewOrdercartId;
                    $addOrdercartData['user_id'] = $unmd5UserId;
                    $addOrdercartData['user_sessionid'] = $requestedUserSessionId;
                    $addOrdercartData['created_by'] = $unmd5UserId;
                    $addOrdercartData['created_datedtime'] = date('Y-m-d H:i:s');
                    $lastRequestedOrdercartId = OrderCartDao :: addEntryInOrdercart($addOrdercartData);
                }else if(count($ordercartDataArr)>0 && $ordercartDataArr!=false){
                    $lastRequestedOrdercartId = $ordercartDataArr['ordercartId'];
                    // update order cart data
                    if($ordercartDataArr['userSessionId']!=$requestedUserSessionId){
                        $updateOrdercartDataObj = array(
                            "id"=>$lastRequestedOrdercartId, 
                            "user_sessionid"=>$requestedUserSessionId,
                            "updated_by"=>$unmd5UserId
                        );
                        $updatedStatusOrdercart = OrderCartDao :: updateEntryInOrdercart($updateOrdercartDataObj);
                    }
                }
                
                // checking for order cart store related
                if($lastRequestedOrdercartId>0 && $lastRequestedOrdercartId!=false){
                    $ccaId = $paramJsonData['ccaId'];
                    $storeId = $paramJsonData['store_id'];
                    // checking order cart store id is already requested or not
                    $ordercartStoreDataArr = OrderCartDao :: getRequestedOrdercartStoreSummary($unmd5UserId, $storeId, $ccaId, $lastRequestedOrdercartId);
                    if($ordercartStoreDataArr>0 && $ordercartStoreDataArr!=false){
                        $lastRequestedOrdercartStoreId = $ordercartStoreDataArr['ordercartStoreId'];
                        $userTotalOrderAmt = $userTotalOrderAmt + $ordercartStoreDataArr['subtotalOrderAmtNotIncludingDeliveryFee'];
                        $storeOdrTotalAmt = $userTotalOrderAmt;
                        $updateStoreOrderDeliveryFee = $storeOrderDeliveryFee;
                        if($userTotalOrderAmt>0 && $storeMinOrderAmt>0 
                            && $userTotalOrderAmt>=$storeMinOrderAmt){
                            $updateStoreOrderDeliveryFee = '0';
                        }else if($userTotalOrderAmt>0 && $storeMinOrderAmt>0 
                            && $userTotalOrderAmt<$storeMinOrderAmt){
                            $storeOdrTotalAmt = $userTotalOrderAmt + $updateStoreOrderDeliveryFee;
                        }else if($userTotalOrderAmt>0 && $storeMinOrderAmt<=0){
                            $storeOdrTotalAmt = $userTotalOrderAmt + $updateStoreOrderDeliveryFee;
                        }
                        $updateOrdercartStoreDataObj = array(
                            "apply_deliveryfee"=>$updateStoreOrderDeliveryFee, 
                            "subtotalamount"=>$userTotalOrderAmt,
                            "totalamount"=>$storeOdrTotalAmt, 
                            "updated_by"=>$unmd5UserId,
                            "id"=>$lastRequestedOrdercartStoreId
                        );
                        $updatedStatusOrdrcartStore = OrderCartDao :: updateEntryInOrdercartStore($updateOrdercartStoreDataObj);
                    }else{
                        // add entry in order cart store
                        $storeOdrTotalAmt = $userTotalOrderAmt;
                        $addStoreOrderDeliveryFee = $storeOrderDeliveryFee;
                        if($userTotalOrderAmt>0 && $storeMinOrderAmt>0 
                            && $userTotalOrderAmt>=$storeMinOrderAmt){
                            $addStoreOrderDeliveryFee = '0';
                        }else if($userTotalOrderAmt>0 && $storeMinOrderAmt>0 
                            && $userTotalOrderAmt<$storeMinOrderAmt){
                            $storeOdrTotalAmt = $storeOdrTotalAmt + $addStoreOrderDeliveryFee;
                        }else if($userTotalOrderAmt>0 && $storeMinOrderAmt<=0){
                            $storeOdrTotalAmt = $storeOdrTotalAmt + $addStoreOrderDeliveryFee;
                        }
                        
                        $addOrdercartStoreData = array();
                        $addOrdercartStoreData['ordercart_id'] = $lastRequestedOrdercartId;
                        $addOrdercartStoreData['store_id'] = $storeId;
                        $addOrdercartStoreData['ccaId'] = $ccaId;
                        $addOrdercartStoreData['delivery_areaname'] = $paramJsonData['areaname'];
                        $addOrdercartStoreData['min_orderamt'] = $storeMinOrderAmt;
                        $addOrdercartStoreData['deliveryfee'] = $addStoreOrderDeliveryFee;
                        $addOrdercartStoreData['apply_deliveryfee'] = $addStoreOrderDeliveryFee;
                        $addOrdercartStoreData['subtotalamount'] = $userTotalOrderAmt;
                        $addOrdercartStoreData['totalamount'] = $storeOdrTotalAmt;
                        $addOrdercartStoreData['created_by'] = $unmd5UserId;
                        $addOrdercartStoreData['created_datedtime'] = date('Y-m-d H:i:s');
                        $lastRequestedOrdercartStoreId = OrderCartDao :: addEntryInOrdercartStore($addOrdercartStoreData);
                    }
                } 
                
                // finally storing item details
                if($lastRequestedOrdercartId>0 && $lastRequestedOrdercartId!=false 
                    && $lastRequestedOrdercartStoreId>0 && $lastRequestedOrdercartStoreId!=false){
                    $paramJsonData['ordercart_storeid'] = $lastRequestedOrdercartStoreId;
                    $paramJsonData['created_by'] = $unmd5UserId;
                    $paramJsonData['created_datedtime'] = date('Y-m-d H:i:s');
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

    
    public static function getRequestedOrdercartItemDetails($userId){
        $allStorewiseDataArr = array();
        $ordercartSummaryDataArr = array();
        $ordercartSummaryDataArr['totalStores'] = 0;
        $ordercartSummaryDataArr['subtotalAmount'] = 0;
        $ordercartSummaryDataArr['totalDeliveryFee'] = 0;
        $ordercartSummaryDataArr['totalAmount'] = 0;
        if($userId!=false && $userId>0){
            // fetching requested order cart all items for given user
            $dataArr1 = OrderCartDao :: getRequestedOrdercartItemDetails($userId);
            if(count($dataArr1)>0 && $dataArr1!=false){
                
                // sorted on ordercartId, order cart storeid, deliverycountrycityareaId
                $sortedDataArr1 = utils::arraySort($dataArr1, array("storeId"), array("storeId"=>"deliveryCountryCityAreaId"));
                if(count($sortedDataArr1)>0 && $sortedDataArr1!=false){
                    
                    // iterating order store wise with delivery location data
                    foreach($sortedDataArr1 as $odrStoreIdDeliveryAreaId=>$storeAllItemsDataArr){
                        
                        $eachOrdercartStoresDataArr = array();
                        $eachOrdercartStoresDataArr['shopStoreTitle'] = $storeAllItemsDataArr[0]['shopStoreTitle'];
                        $eachOrdercartStoresDataArr['storeLocatedAreaName'] = $storeAllItemsDataArr[0]['storeLocatedAreaName'];
                        $eachOrdercartStoresDataArr['deliveryAreaname'] = $storeAllItemsDataArr[0]['delivery_areaname'];
                        $eachOrdercartStoresDataArr['subtotalamount'] = $storeAllItemsDataArr[0]['subtotalamount'];
                        $eachOrdercartStoresDataArr['apply_deliveryFee'] = $storeAllItemsDataArr[0]['apply_deliveryFee'];
                        $eachOrdercartStoresDataArr['discountamount'] = $storeAllItemsDataArr[0]['discountamount'];
                        $eachOrdercartStoresDataArr['totalamount'] = $storeAllItemsDataArr[0]['totalamount'];
                        $eachOrdercartStoresDataArr['totalItems'] = count($storeAllItemsDataArr);
                        $eachOrdercartStoresDataArr['applicableStoreDeliveryFeeMsg'] = '';
                        $storeMinOrderAmt = $storeAllItemsDataArr[0]['storeMinOrderAmt'];
                        $storeDeliveryFee = $storeAllItemsDataArr[0]['deliveryfee'];
                        $storeAppliedDeliveryFeeOnOdrAmt = $storeAllItemsDataArr[0]['apply_deliveryFee'];
                        $eachOrdercartStoresDataArr['isShowItemList'] = false;
                        $eachOrdercartStoresDataArr['allItemsData'] = array();
                        
                        // iterate each item details
                        for($eachIndx = 0; $eachIndx<count($storeAllItemsDataArr); $eachIndx++){
                            array_push($eachOrdercartStoresDataArr['allItemsData'], 
                                array(
                                    "ordercartId"=>$storeAllItemsDataArr[$eachIndx]['ordercartId'],
                                    "ordercartStoreId"=>$storeAllItemsDataArr[$eachIndx]['ordercartStoreId'],
                                    "store_id"=>$storeAllItemsDataArr[$eachIndx]['storeId'],
                                    "ccaId"=>$storeAllItemsDataArr[$eachIndx]['deliveryCountryCityAreaId'],
                                    "minorderamt"=>$storeMinOrderAmt,
                                    "deliveryfee"=>$storeDeliveryFee,
                                    "storeSubtotalAmt"=>$eachOrdercartStoresDataArr['subtotalamount'],
                                    "orderStoreItemId"=>$storeAllItemsDataArr[$eachIndx]['orderStoreItemId'],
                                    "productListTitle"=>$storeAllItemsDataArr[$eachIndx]['productListTitle'],
                                    "size"=>$storeAllItemsDataArr[$eachIndx]['productSize'],
                                    "price"=>$storeAllItemsDataArr[$eachIndx]['productPrice'],
                                    "qty"=>$storeAllItemsDataArr[$eachIndx]['productQty'],
                                    "totalamount"=>$storeAllItemsDataArr[$eachIndx]['productTotalAmt'],
                                    "description"=>$storeAllItemsDataArr[$eachIndx]['description'],
                                    "productFeatureBasePrice"=>$storeAllItemsDataArr[$eachIndx]['productFeatureBasePrice'],
                                    "productFeatureDiscount"=>$storeAllItemsDataArr[$eachIndx]['productFeatureDiscount'],
                                    "productImageFilePath"=>$storeAllItemsDataArr[$eachIndx]['productImageFilePath']
                                )
                            );
                        }
                        
                        // checking for delivery fee msg 
                        if($storeAppliedDeliveryFeeOnOdrAmt<=0 && $storeAppliedDeliveryFeeOnOdrAmt!=''){
                            $msgStr = "Your eligible for free home delivery to your door step, bcoz you have added ".count($storeAllItemsDataArr). " items in cart";
                            $msgStr.=" (Rs: ".$eachOrdercartStoresDataArr['subtotalamount'].")  of this seller !!!";
                            $eachOrdercartStoresDataArr['applicableStoreDeliveryFeeMsg'] = $msgStr;
                        }else if($storeAppliedDeliveryFeeOnOdrAmt>0 && $storeMinOrderAmt>0){
                            $eachOrdercartStoresDataArr['applicableStoreDeliveryFeeMsg'] = "Shipping charges Rs $storeDeliveryFee will be apply, if order amount less than Rs $storeMinOrderAmt for this seller !!!";
                        }else if($storeAppliedDeliveryFeeOnOdrAmt>0 && $storeMinOrderAmt<=0){
                            $eachOrdercartStoresDataArr['applicableStoreDeliveryFeeMsg'] = "Shipping charges Rs $storeDeliveryFee will be apply by this seller on any order amount !!!";
                        }
                        
                        $ordercartSummaryDataArr['totalStores'] = $ordercartSummaryDataArr['totalStores'] + 1;
                        $ordercartSummaryDataArr['subtotalAmount'] = $ordercartSummaryDataArr['subtotalAmount'] + $eachOrdercartStoresDataArr['subtotalamount'];
                        $ordercartSummaryDataArr['totalDeliveryFee'] = $ordercartSummaryDataArr['totalDeliveryFee'] + $storeAppliedDeliveryFeeOnOdrAmt;
                        $ordercartSummaryDataArr['totalAmount'] = $ordercartSummaryDataArr['totalAmount'] + $eachOrdercartStoresDataArr['totalamount'];
                        array_push($allStorewiseDataArr, $eachOrdercartStoresDataArr);
                    }
                }
            }
        }
        if(count($allStorewiseDataArr)>0 && $allStorewiseDataArr!=false){
            $orderCartDataArr = array();
            $orderCartDataArr['ordercartAllStoreWiseData'] = $allStorewiseDataArr;
            // $orderCartDataArr['ordercartSummaryData'] = $ordercartSummaryDataArr;
            return $orderCartDataArr;
        }else{
            return false;
        }
    }
    
    public static function getCancelledOrdercartItemDetails($userId){
        $allOrdercartWiseDataArr = array();
        if($userId>0 && $userId!=false){
            // fetching all cancelled order cart with all items by end user or admin members
            $dataArr1 = OrderCartDao :: getCancelledOrdercartItemDetails($userId);
            if(count($dataArr1)>0 && $dataArr1!=false){
                // sorted on ordercartId
                $sortedDataArr1 = utils::arraySort($dataArr1, array("ordercartId"));
                if(count($sortedDataArr1)>0 && $sortedDataArr1!=false){
                    // iterating order cart wise data
                    foreach($sortedDataArr1 as $ordercartIdKey=>$allItemsDataArr){
                        array_push($allOrdercartWiseDataArr, 
                            array(
                                "humanReadableOrdercartId"=>$allItemsDataArr[0]['humanReadableOrdercartId'],
                                "totalItems"=>count($allItemsDataArr),
                                "isShowItemList"=>false,
                                "allItemsData"=>$allItemsDataArr
                            )
                        );
                    }
                }
            }
        }
        if(count($allOrdercartWiseDataArr)>0 && $allOrdercartWiseDataArr!=false){
            return $allOrdercartWiseDataArr;
        }else{
            return false;
        }
    }
    

    public static function getAllOrderedOrdercartItemDetails($userId){
        $allOrdercartWiseDataArr = array();
        if($userId>0 && $userId!=false){
            // fetching all order cart with all ordered items by end user
            $dataArr1 = OrderCartDao :: getAllOrderedOrdercartItemDetails($userId);
            if(count($dataArr1)>0 && $dataArr1!=false){
                // sorted on ordercartId
                $sortedOrdercartDataArr = utils::arraySort($dataArr1, array("humanReadableOrdercartId", "storeId"), array("storeId"=>"deliveryCountryCityAreaId"));
                if(count($sortedOrdercartDataArr)>0 && $sortedOrdercartDataArr!=false){
                    // iterate order cart wise data
                    foreach($sortedOrdercartDataArr as $humanReadableOrdercartId=>$allSortedStoreDataArr){
                        $eachOrdercartWiseDataArr = array();
                        $eachOrdercartWiseDataArr['humanReadableOrdercartId'] = $humanReadableOrdercartId;
                        $eachOrdercartWiseDataArr['totalStores'] = count($allSortedStoreDataArr);
                        $eachOrdercartWiseDataArr['allStoresData'] = array();
                        // iterate each store wise data
                        foreach($allSortedStoreDataArr as $odrStoreIdDeliveryAreaId=>$storeAllItemsDataArr){
                            $deliveryFromToAreaName = "from ". $storeAllItemsDataArr[0]['storeLocatedAreaName']." to ".$storeAllItemsDataArr[0]['delivery_areaname'];
                            array_push($eachOrdercartWiseDataArr['allStoresData'], 
                                array(
                                    "shopStoreTitle"=>$storeAllItemsDataArr[0]['shopStoreTitle'],
                                    "storeLocatedAreaName"=>$storeAllItemsDataArr[0]['storeLocatedAreaName'],
                                    "deliveryAreaname>"=>$storeAllItemsDataArr[0]['delivery_areaname'],
                                    "deliveryFromToAreaName"=>$deliveryFromToAreaName,
                                    "subtotalamount"=>$storeAllItemsDataArr[0]['subtotalamount'],
                                    "apply_deliveryFee"=>$storeAllItemsDataArr[0]['apply_deliveryFee'],
                                    "discountamount"=>$storeAllItemsDataArr[0]['discountamount'],
                                    "totalamount"=>$storeAllItemsDataArr[0]['totalamount'],
                                    "allItemsData"=>$storeAllItemsDataArr,
                                    "isShowItemList"=>false
                                )
                            );
                        }
                        array_push($allOrdercartWiseDataArr, $eachOrdercartWiseDataArr);
                    }
                }
            }
        }
        if(count($allOrdercartWiseDataArr)>0 && $allOrdercartWiseDataArr!=false){
            return $allOrdercartWiseDataArr;
        }else{
            return false;
        }
    }
    
    
    public static function getStorewiseOrderSummaryDataForCheckoutProcess($userId){
        $allStorewiseOrderSummaryDataArr = array();
        if($userId!=false && $userId>0){
            // fetching requested order cart all items for given user
            $dataArr1 = OrderCartDao :: getRequestedOrdercartItemDetails($userId);
            if(count($dataArr1)>0 && $dataArr1!=false){
                // sorted on ordercartId, order cart storeid, deliverycountrycityareaId
                $sortedDataArr1 = utils::arraySort($dataArr1, array("storeId"), array("storeId"=>"deliveryCountryCityAreaId"));
                if(count($sortedDataArr1)>0 && $sortedDataArr1!=false){
                    // iterating order store wise with delivery location data
                    foreach($sortedDataArr1 as $odrStoreIdDeliveryAreaId=>$storeAllItemsDataArr){
                        $eachOrdercartStoresDataArr = array();
                        $eachOrdercartStoresDataArr['ordercartStoreId'] = $storeAllItemsDataArr[0]['ordercartStoreId'];
                        $eachOrdercartStoresDataArr['shopStoreTitle'] = $storeAllItemsDataArr[0]['shopStoreTitle'];
                        $eachOrdercartStoresDataArr['storeLocatedAreaName'] = $storeAllItemsDataArr[0]['storeLocatedAreaName'];
                        $eachOrdercartStoresDataArr['deliveryAreaname'] = $storeAllItemsDataArr[0]['delivery_areaname'];
                        $eachOrdercartStoresDataArr['deliveryaddress'] = $storeAllItemsDataArr[0]['deliveryAddress'];
                        $eachOrdercartStoresDataArr['deliverydate'] = $storeAllItemsDataArr[0]['deliverydate'];
                        $eachOrdercartStoresDataArr['subtotalamount'] = $storeAllItemsDataArr[0]['subtotalamount'];
                        $eachOrdercartStoresDataArr['apply_deliveryFee'] = $storeAllItemsDataArr[0]['apply_deliveryFee'];
                        $eachOrdercartStoresDataArr['discountamount'] = $storeAllItemsDataArr[0]['discountamount'];
                        $eachOrdercartStoresDataArr['totalamount'] = $storeAllItemsDataArr[0]['totalamount'];
                        $eachOrdercartStoresDataArr['totalItems'] = count($storeAllItemsDataArr);
                        array_push($allStorewiseOrderSummaryDataArr, $eachOrdercartStoresDataArr);
                    }
                }
            }
        }
        if(count($allStorewiseOrderSummaryDataArr)>0 
            && $allStorewiseOrderSummaryDataArr!=false){
            return $allStorewiseOrderSummaryDataArr;
        }else{
            return false;
        }
    }
    
    
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
    
    
    public static function getPartyOrderList($userId){
        $partyOrderDataArr = false;
        if($userId!='' && $userId>0){
            // fetching party order list data
            $dataArr1 = PartyOrdersDao::getPartyOrderList($userId);
            if(count($dataArr1)>0 && $dataArr1!=false){
                // iterate each party order data details
                for($eachIndex = 0; $eachIndex<count($dataArr1); $eachIndex++){
                    $poId = $dataArr1[$eachIndex]['partyOrderId'];
                    $poStatus = $dataArr1[$eachIndex]['porShortStatus'];
                    
                    // fetch each partyOrderId further consveration/log details
                    $dataArr1[$eachIndex]['poLogCount'] = '0';
                    $dataArr1[$eachIndex]['poLogDetails'] = false;
                    $dataArr1[$eachIndex]['isPoShowLogList'] = false;
                    $dataArr2 = PartyOrdersDao :: getPartyOrderLogDetails($userId, $poId);
                    if(count($dataArr2)>0 && $dataArr2!=false){
                        $dataArr1[$eachIndex]['poLogCount'] = count($dataArr2);
                        $dataArr1[$eachIndex]['poLogDetails'] = $dataArr2;
                    }
                    
                    // deciding payment btn to show or not
                    $dataArr1[$eachIndex]['isShowPoPaymentBtn'] = ($poStatus=='PP'?true:false);
                    
                    // fetch each partyOrderId payment log details 
                    $dataArr1[$eachIndex]['poPaymentInstallment'] = '0';
                    $dataArr1[$eachIndex]['poPaymentLogDetails'] = false;
                    $dataArr1[$eachIndex]['isShowPoPaymentLogList'] = false;
                    $dataArr3 = PartyOrdersDao :: getPaymentDetailsForPartyOrder($userId, $poId);
                    if(count($dataArr3)>0 && $dataArr3!=false){
                        $dataArr1[$eachIndex]['poPaymentInstallment'] = count($dataArr3);
                        $dataArr1[$eachIndex]['poPaymentLogDetails'] = $dataArr3;
                    }

                    // deciding how much need to pay or balance also
                    $dataArr1[$eachIndex]['poGeneratedTotalAmt'] = '0';
                    $dataArr1[$eachIndex]['payingamount'] = '0';
                    $dataArr1[$eachIndex]['balanceamount'] = '0';
                    $dataArr4 = PartyOrdersDao :: getPaymentDetailsForPartyOrder($userId, $poId, 'Y');
                    if(count($dataArr4)==1 && $dataArr4!=false){
                        $dataArr1[$eachIndex]['poGeneratedTotalAmt'] = $dataArr4[0]['poGeneratedTotalAmt'];
                        $dataArr1[$eachIndex]['payingamount'] = $dataArr4[0]['payingamount'];
                        $dataArr1[$eachIndex]['balanceamount'] = $dataArr4[0]['balanceamount'];
                    }
                    
                }
                $partyOrderDataArr = $dataArr1;
            }
        }
        return $partyOrderDataArr;
    }
    
    
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
    
    
    public static function getCustomizeOrderList($userId){
        $customizeOrderDataArr = false;
        if($userId!='' && $userId>0){
            // fetching customize order list data
            $dataArr1 = CustomizeOrdersDao::getCustomizeOrderList($userId);
            if(count($dataArr1)>0 && $dataArr1!=false){
                // iterate each customize order data details
                for($eachIndex = 0; $eachIndex<count($dataArr1); $eachIndex++){
                    $coId = $dataArr1[$eachIndex]['customizeOrderId'];
                    $coStatus = $dataArr1[$eachIndex]['corShortStatus'];
                    
                    // fetch each customizeOrderId further consveration/log details
                    $dataArr1[$eachIndex]['coLogCount'] = '0';
                    $dataArr1[$eachIndex]['coLogDetails'] = false;
                    $dataArr1[$eachIndex]['isCoShowLogList'] = false;
                    $dataArr2 = CustomizeOrdersDao :: getCustomizeOrderLogDetails($userId, $coId);
                    if(count($dataArr2)>0 && $dataArr2!=false){
                        $dataArr1[$eachIndex]['coLogCount'] = count($dataArr2);
                        $dataArr1[$eachIndex]['coLogDetails'] = $dataArr2;
                    }
                    
                    // deciding payment btn to show or not
                    $dataArr1[$eachIndex]['isShowCoPaymentBtn'] = ($coStatus=='PP'?true:false);
                    
                    // fetch each customizeOrderId payment log details 
                    $dataArr1[$eachIndex]['coPaymentInstallment'] = '0';
                    $dataArr1[$eachIndex]['coPaymentLogDetails'] = false;
                    $dataArr1[$eachIndex]['isShowCoPaymentLogList'] = false;
                    $dataArr3 = CustomizeOrdersDao :: getPaymentDetailsForCustomizeOrder($userId, $coId);
                    if(count($dataArr3)>0 && $dataArr3!=false){
                        $dataArr1[$eachIndex]['coPaymentInstallment'] = count($dataArr3);
                        $dataArr1[$eachIndex]['coPaymentLogDetails'] = $dataArr3;
                    }

                    // deciding how much need to pay or balance also
                    $dataArr1[$eachIndex]['coGeneratedTotalAmt'] = '0';
                    $dataArr1[$eachIndex]['payingamount'] = '0';
                    $dataArr1[$eachIndex]['balanceamount'] = '0';
                    $dataArr4 = CustomizeOrdersDao :: getPaymentDetailsForCustomizeOrder($userId, $coId, 'Y');
                    if(count($dataArr4)==1 && $dataArr4!=false){
                        $dataArr1[$eachIndex]['coGeneratedTotalAmt'] = $dataArr4[0]['coGeneratedTotalAmt'];
                        $dataArr1[$eachIndex]['payingamount'] = $dataArr4[0]['payingamount'];
                        $dataArr1[$eachIndex]['balanceamount'] = $dataArr4[0]['balanceamount'];
                    }
                    
                }
                $customizeOrderDataArr = $dataArr1;
            }
        }
        return $customizeOrderDataArr;
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

    
    
    
}
