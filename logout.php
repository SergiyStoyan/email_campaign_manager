<?php
//********************************************************************************************
//Author: Sergey Stoyan, CliverSoft.com
//        http://cliversoft.com
//        stoyan@cliversoft.com
//        sergey.stoyan@gmail.com
//        27 February 2007
//Copyright: (C) 2007, Sergey Stoyan
//********************************************************************************************

session_destroy();
session_unset();
setcookie("permanent_session_id", "", 1, "/");        		
setcookie("user_type", "", 1, "/");
header("Location: ./");

?>