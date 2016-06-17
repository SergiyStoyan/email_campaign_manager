<?php
//********************************************************************************************
//Author: Sergey Stoyan, CliverSoft.com
//        http://cliversoft.com
//        stoyan@cliversoft.com
//        sergey.stoyan@gmail.com
//        27 February 2007
//Copyright: (C) 2007, Sergey Stoyan
//********************************************************************************************

include_once("../core.php");
  	
if(!Login::UserType())
	Respond(null, "User of type '".Login::UserType()."' cannot do this operation.");
	
$action = isset($_GET['action']) ? $_GET['action'] : null;
switch ($action) 
{
	default:
		throw new Exception("Unhandled action: $action");
}
?>