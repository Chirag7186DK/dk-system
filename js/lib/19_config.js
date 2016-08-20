
isHeaderExecutingOnServerLevel = 'Y';
apiUrlAccessHashValue = 'trr36pdthb9xbhcppyqkgbpkq';
globalBaseSitePath = 'http://localhost/dk-system/';
//globalBaseSitePath = 'http://192.168.1.103/dk-system/';
product_versionyear = '2016';
isProductInMaintainanceMode = 'N';
isDisableDocumentRightClick = 'Y';

// web-app loaded on devices type detect here
var isWindowResize = 'N';
var deviceWidth = parseInt($(window).width());
var deviceHeight = parseInt($(window).height());
console.log("on load deviceWidth=>"+deviceWidth+", deviceHeight=>"+deviceHeight);
//alert("on laod deviceWidth=>"+deviceWidth+", deviceHeight=>"+deviceHeight);

// web-app module defined here 
var app = angular.module('DESSERTSKHAZANAAPP', []);