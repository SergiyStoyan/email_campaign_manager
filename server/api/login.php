<?php
//********************************************************************************************
//Author: Sergey Stoyan, CliverSoft.com
//        http://cliversoft.com
//        stoyan@cliversoft.com
//        sergey.stoyan@gmail.com
//        27 February 2007
//Copyright: (C) 2007, Sergey Stoyan
//********************************************************************************************

include_once("../api.php");

if(Login::GetCurrentUser())
	Respond(Login::GetCurrentUser());
else
  	Respond(null, 'The user is not identified. Please provide correct login info.');
?>