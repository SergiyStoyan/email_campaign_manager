<?php
//********************************************************************************************
//Author: Sergey Stoyan, CliverSoft.com
//        http://cliversoft.com
//        stoyan@cliversoft.com
//        sergey.stoyan@gmail.com
//        27 February 2007
//Copyright: (C) 2007, Sergey Stoyan
//********************************************************************************************

include_once("common/logger.php");

if(isset($_COOKIE[session_name()]))
	setcookie(session_name(), '', 1, '/' );
//clear session from globals
$_SESSION = [];
//clear session from disk
if(session_id())
	session_destroy();
//Logger::Write(444);Logger::Write();
setcookie("permanent_session_id", "", 1, "/");        		
setcookie("user_type", "", 1, "/");
header("Location: ../");

?>