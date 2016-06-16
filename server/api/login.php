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
  	
$action = isset($_GET['action']) ? $_GET['action'] : null;
switch ($action) 
{
  	case 'GetCurrentUser':
  		Respond(Login::GetCurrentUser());
    return;
	default:
		if($user = Login::Identify())
			Respond($user);
		else
  			Respond(null, 'The user could not be identified. Please try again.');
	return;
}
?>