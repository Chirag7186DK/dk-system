<?php 
    
    //header("Cache-Control: no-store, no-cache"); 
    clearstatcache();
    
    // CJ define this function to sort files in numberically order
    function sortFilesNumberically($fileString1, $fileString2){
        $substrFileStr1 = substr($fileString1, 0, strpos($fileString1, "_", 0));
        $substrFileStr2 = substr($fileString2, 0, strpos($fileString2, "_", 0));
        return ($substrFileStr1 < $substrFileStr2) ? -1 : 1;
    }
    
    // CJ defined this function to collect files in array
    function collectJsCssFiles($givenDirname, $filetype){
        $dirname = rtrim($givenDirname, '\\/');
        $outputFileList = array();
        $ffs = scandir($dirname);
        foreach($ffs as $ff) {
            if($ff!='.' && $ff!= '..' && $ff!='.git'){
                if(is_dir($dirname."/".$ff)){
                }else{
                    if(strrpos($ff, '.'.$filetype)==(strlen($ff) - strlen('.' . $filetype))){
                        array_push($outputFileList, $dirname."/".$ff);
                    }
                }
            }
        }
        return $outputFileList;
    }
    
    // collect all css files 
    $css_filelist = collectJsCssFiles("css", "css");
    if(count($css_filelist)>0 && $css_filelist!=false && $css_filelist!=null){
        $retStatusSortedFiles = usort($css_filelist , 'sortFilesNumberically');
        // iterate each css files to load in dom
        for($count = 0; $count<count($css_filelist); $count++){
            $filename = $css_filelist[$count];
            if(($filename!=".") && ($filename!="..") && ($filename!="")){
                $curTimeStamp = md5(mt_rand());
                echo "<link rel='stylesheet' type='text/css' href='css/$filename?reload=$curTimeStamp'>";
            }
        }
    }
    
    // collect all js lib files
    $allJsFileList = array();
    $allLibJsFileList = collectJsCssFiles("js/1_lib", "js");
    if(count($allLibJsFileList)>0 && $allLibJsFileList!=false){
        $allJsFileList = array_merge($allJsFileList, $allLibJsFileList);
    }
    $allServicesJsFileList = collectJsCssFiles("js/2_services", "js");
    if(count($allServicesJsFileList)>0 && $allServicesJsFileList!=false){
        $allJsFileList = array_merge($allJsFileList, $allServicesJsFileList);
    }
    $allControllerJsFileList = collectJsCssFiles("js/3_controller", "js");
    if(count($allControllerJsFileList)>0 && $allControllerJsFileList!=false){
        $allJsFileList = array_merge($allJsFileList, $allControllerJsFileList);
    }
    $allDirectiveJsFileList = collectJsCssFiles("js/4_directive", "js");
    if(count($allDirectiveJsFileList)>0 && $allDirectiveJsFileList!=false){
        $allJsFileList = array_merge($allJsFileList, $allDirectiveJsFileList);
    }
    if(count($allJsFileList)>0 && $allJsFileList!=false && $allJsFileList!=null){
        $retStatusSortedFiles = usort($allJsFileList , 'sortFilesNumberically');
        for($count = 0; $count<count($allJsFileList); $count++){
            $filename = $allJsFileList[$count];
            if(($filename!=".") && ($filename!="..") && ($filename!="")){
                $curTimeStamp = md5(mt_rand());
                echo "<script src='$filename?reload=$curTimeStamp'></script>";
            }
        } 
    }
    
        
?>  
