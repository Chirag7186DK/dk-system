<?php

/**
* @author CJ defined this function 2016-07-24
*/

interface IUsersServicesV1{
    public function addTrackUserInfoAccessingWebsitesDetails($dkInDtoArray);
    public function generateUserSessionId($dkInDtoArray);
    public function userSignUpAuthentication($dkInDtoArray);
    public function checkUserAuthentication($dkInDtoArray);
    public function getUserDashboardSummaryDataDetails($dkInDtoArray);
    public function getUserPersonalInfoData($dkInDtoArray);
    public function updateUserPersonalInfoData($dkInDtoArray);
    public function updateUserPasswordInfoData($dkInDtoArray);
    public function userLogoutFromWebsites($dkInDtoArray);
}
