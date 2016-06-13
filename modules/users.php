<?php
//********************************************************************************************
//Author: Sergey Stoyan, CliverSoft.com
//        http://cliversoft.com
//        stoyan@cliversoft.com
//        sergey.stoyan@gmail.com
//        27 February 2007
//Copyright: (C) 2007, Sergey Stoyan
//********************************************************************************************
include_once("../server/api.php");

//Logger::Write($_GET);
//Logger::Write($_POST);

$action = isset($_GET['action']) ? $_GET['action'] : null;
switch ($action) 
{
	case 'GetTableData':
	  	Respond(DataTable::FetchData(
	  		[
	  			['Name'=>'id', 'Searchable' => false, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'name', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
	  			['Name'=>'type', 'Searchable' => true, 'Order' => null, 'Expression'=>null],
	  		],
	  		'FROM users'
	  		)
	  	);
    return;
  	case 'Add':
  		Respond(DataTable::Insert('users', $_POST));
    return;
  	case 'GetByKeys':
  		Respond(DataTable::GetByKeys('users', $_POST));
    return;
  	case 'Save':
  		Respond(DataTable::Save('users', $_POST));
    return;
  	case 'Delete':
  		Respond(DataTable::Delete('users', $_POST));
    return;
	default:
		throw new Exception("Unhandled action: $action");
}

?>