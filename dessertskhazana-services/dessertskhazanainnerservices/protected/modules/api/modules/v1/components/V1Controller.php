<?php

class V1Controller extends ApiController{
    
    /**
    * @var mixed input Dto array
    */
    
    protected $_inDtoArray;
    protected $_inDtoArrayWithDataPresent = false;
    
    protected function beforeAction($action){
        if(ComponentsHttp::VerifySecurityHeader()){
            if(ComponentsHttp::httpMethod()=='POST'){
                $this->_inDtoArray = ComponentsHttp::PrepareIncommingPostData();
                $this->_inDtoArrayWithDataPresent = true;
            }else if (ComponentsHttp::httpMethod()=='GET'){
                $this->_inDtoArray = ComponentsHttp::prepareInCommingGetData();
                if($this->_inDtoArray!=false){
                    $this->_inDtoArrayWithDataPresent = true;
                }
            }else if(ComponentsHttp::httpMethod()=='PUT'){
                $this->_inDtoArray = ComponentsHttp::prepareInCommingPostData();
                $this->_inDtoArrayWithDataPresent = true;
            }else if(ComponentsHttp::httpMethod()=='DELETE'){
                $this->_inDtoArray = ComponentsHttp::prepareInCommingPostData();
                $this->_inDtoArrayWithDataPresent = true;
            }
            if($this->_inDtoArrayWithDataPresent==true){
                return true;
            }else{
                ComponentsHttp::GenerateInvalidAccess();
                return false;
            }
        }else{
            ComponentsHttp::GenerateInvalidAccess();
            return false;
        }
    }

}
