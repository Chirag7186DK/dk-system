<?php

/**
* @author CJ defined this function 2016-07-24
*/

interface IUsersServicesV1{
    public function addTrackUserInfoAccessingWebsitesDetails($InDtoArr);
    public function generateUserSessionId($InDtoArr);
    public function userSignUpAuthentication($InDtoArr);
    public function userSignInAuthentication($InDtoArr);
    public function getUserDashboardSummaryDataDetails($InDtoArr);
    public function getUserPersonalInfoData($InDtoArr);
    public function updateUserPersonalInfoData($InDtoArr);
    public function updateUserPasswordInfoData($InDtoArr);
    public function userLogoutFromWebsites($InDtoArr);
}
